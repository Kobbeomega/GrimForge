import test from "node:test";
import assert from "node:assert/strict";
import { classes, getCharacterClassFeatures, getCharacterPathChoices, getClassSubclassUnlockLevel } from "../src/compendium/classes";
import { backgrounds } from "../src/compendium/backgrounds";
import { getSpellsForClass, getSpellById } from "../src/compendium/spells";
import { defaultAbilityScores } from "../src/compendium/core";
import { createLevelUpDraft, previewLevelUp, validateLevelUp, applyLevelUp, type LevelUpDraft } from "../src/modules/level-up/levelUp";
import { getSpellSelectionRules } from "../src/modules/creator/utils/getSpellSelectionRules";
import { migrateCharacterArchiveEntry } from "../src/migrations/characterSchema";
import { mergeEditedCharacter } from "../src/modules/creator/mappers/mergeEditedCharacter";
import { mapArchiveEntryToDraft } from "../src/modules/creator/mappers/mapArchiveEntryToDraft";
import { mapDraftToArchiveEntry } from "../src/modules/creator/mappers/mapDraftToArchiveEntry";
import { resolveCharacterClassResources } from "../src/rules/classResources";
import { calculateCharacterRules } from "../src/rules";
import type { CharacterArchiveEntry } from "../src/modules/archives/types";

function fixture(classId = "fighter", level = 1): CharacterArchiveEntry {
  return {
    schemaVersion: 7, id: "test", fileNumber: "Testakte", name: "Aufstiegstest", classId,
    className: classes.find((entry) => entry.id === classId)!.name, ancestry: "Test", level,
    status: "active", summary: "Test", updatedAt: "2026-09-01T12:00:00.000Z",
    baseAbilityScores: { ...defaultAbilityScores, constitution: 14 },
    abilityScores: { ...defaultAbilityScores, constitution: 14 },
    vitals: { maximumHitPoints: 12, currentHitPoints: 4, temporaryHitPoints: 3, armorClass: 16, initiativeModifier: 1, speed: 9 },
    pathChoices: classId === "fighter" ? { "fighter-fighting-style": "defense" } : {},
    skillProficiencies: ["athletics", "perception", "acrobatics", "arcana"],
    inventory: { items: [], currency: { copper: 5, silver: 9, gold: 42 } },
    spentHitDice: 1, spentClassResources: { "fighter-second-wind": 1 }, inspiration: true,
    spellcasting: { spellIds: [], slots: { spentSlots: { 1: 1 }, spentPactSlots: 1 } },
  };
}

function complete(character: CharacterArchiveEntry, draft: LevelUpDraft) {
  const level = character.level + 1;
  const classId = character.classId!;
  const cls = classes.find((entry) => entry.id === classId)!;
  if (!draft.subclassId && (getClassSubclassUnlockLevel(classId) ?? Infinity) <= level) draft.subclassId = cls.subclasses[0].id;
  if (level === 4 && draft.abilityScoreMode === "increase" && Object.keys(draft.abilityScoreIncreases).length === 0) {
    draft.abilityScoreIncreases = { strength: 2 };
  }
  // Iterate because a choice may unlock a dependent choice (e.g. Pact of the Tome).
  for (let pass = 0; pass < 3; pass++) {
    for (const choice of getCharacterPathChoices(classId, draft.subclassId, level, draft.pathChoices)) {
      if (draft.pathChoices[choice.id]) continue;
      const options = choice.options.filter((option) =>
        (!choice.id.endsWith("-expertise") || character.skillProficiencies?.includes(option.id as never)) &&
        (choice.id !== "lore-bonus-skills" || !character.skillProficiencies?.includes(option.id as never)));
      draft.pathChoices[choice.id] = choice.choose === 1 ? options[0].id : options.slice(0, choice.choose).map((option) => option.id);
    }
  }
  const rules = getSpellSelectionRules({ classId, subclassId: draft.subclassId, level, abilityScores: character.abilityScores!, pathChoices: draft.pathChoices });
  if (!rules.enabled) return draft;
  const spells = [...getSpellsForClass(rules.sourceClassId ?? classId), ...rules.expandedSpellIds.flatMap((id) => getSpellById(id) ?? [])].filter((spell) => !rules.grantedSpellIds.includes(spell.id));
  let cantrips = spells.filter((spell) => spell.level === 0);
  if (classId === "warlock") cantrips = [...cantrips].sort((a, b) => Number(b.id === "eldritch-blast") - Number(a.id === "eldritch-blast"));
  const levelled = spells.filter((spell) => spell.level > 0 && spell.level <= rules.maximumSpellLevel);
  draft.spellcasting.spellIds = [...cantrips.slice(0, rules.cantripsRequired), ...levelled.slice(0, rules.levelledSpellsRequired)].map((spell) => ({ spellId: spell.id, prepared: spell.level === 0 || rules.mode !== "spellbook" || levelled.indexOf(spell) < rules.preparedSpellsRequired }));
  return draft;
}

test("fighter 1→2: preserve session state, record HP and survive migration/export", () => {
  const original = fixture();
  const frozen = structuredClone(original);
  const draft = createLevelUpDraft(original);
  const next = applyLevelUp(original, draft);
  assert.equal(next.level, 2);
  assert.equal(next.vitals!.maximumHitPoints, 20);
  assert.equal(next.vitals!.currentHitPoints, 4);
  assert.equal(next.vitals!.temporaryHitPoints, 3);
  assert.deepEqual(next.inventory, original.inventory);
  assert.deepEqual(next.spentClassResources, original.spentClassResources);
  assert.deepEqual(next.spellcasting!.slots, original.spellcasting!.slots);
  assert.equal(next.spentHitDice, 1);
  assert.equal(next.inspiration, true);
  assert.equal(next.levelUpHistory![0].hitPointGain, 8);
  assert.deepEqual(migrateCharacterArchiveEntry(JSON.parse(JSON.stringify(next))).character.levelUpHistory, JSON.parse(JSON.stringify(next.levelUpHistory)));
  assert.deepEqual(original, frozen);
});

test("draft and preview do not mutate saved state", () => {
  const character = fixture();
  const original = structuredClone(character);
  const draft = createLevelUpDraft(character);
  draft.pathChoices["fighter-fighting-style"] = "archery";
  draft.spellcasting.slots.spentPactSlots = 0;
  previewLevelUp(character, draft);
  assert.deepEqual(character, original);
  assert.throws(() => applyLevelUp(character, draft), /bisherige Entscheidung/);
});

test("early saved subclass does not block level-up before its feature level", () => {
  const character = {
    ...fixture("fighter", 1),
    subclassId: "champion",
    subclass: "Champion",
  };
  const next = applyLevelUp(character, createLevelUpDraft(character));
  assert.equal(next.level, 2);
  assert.equal(next.subclassId, "champion");
  assert.ok(!getCharacterClassFeatures({ classId: "fighter", subclassId: next.subclassId, level: next.level }).some((feature) => feature.id === "champion-1"));
});

test("roll boundaries, fractional and empty inputs, minimum HP", () => {
  const character = fixture();
  const draft = createLevelUpDraft(character);
  draft.hitPointMode = "roll";
  for (const roll of [NaN, 0, -1, 11, 1.5, Infinity]) {
    draft.hitDieRoll = roll;
    assert.throws(() => applyLevelUp(character, draft), /Würfelergebnis/);
  }
  character.abilityScores!.constitution = 1;
  draft.hitDieRoll = 1;
  assert.equal(applyLevelUp(character, draft).vitals!.maximumHitPoints, 13);
});

test("subclass required for 2→3; level 5 is final for now", () => {
  const character = fixture("fighter", 2);
  const draft = createLevelUpDraft(character);
  assert.throws(() => applyLevelUp(character, draft), /Unterklasse/);
  draft.subclassId = "champion";
  const next = applyLevelUp(character, draft);
  assert.equal(next.subclass, "Champion");
  const levelFour = applyLevelUp(next, complete(next, createLevelUpDraft(next)));
  const levelFive = applyLevelUp(levelFour, complete(levelFour, createLevelUpDraft(levelFour)));
  assert.equal(levelFive.level, 5);
  assert.throws(() => applyLevelUp(levelFive, createLevelUpDraft(levelFive)), /bis Stufe 5/);
  assert.throws(() => applyLevelUp({ ...character, level: 1 }, draft), /geändert/);
});

test("rolled HP, history, damage and spell slot usage survive creator edit", () => {
  const character = fixture();
  const draft = createLevelUpDraft(character);
  draft.hitPointMode = "roll";
  draft.hitDieRoll = 10;
  const next = applyLevelUp(character, draft);
  const edited = mergeEditedCharacter(mapDraftToArchiveEntry(mapArchiveEntryToDraft(next)), next);
  assert.deepEqual(edited.levelUpHistory, next.levelUpHistory);
  assert.equal(edited.vitals!.maximumHitPoints, 24);
  assert.equal(edited.vitals!.currentHitPoints, 4);
  assert.deepEqual(edited.spellcasting!.slots, next.spellcasting!.slots);
  assert.equal(migrateCharacterArchiveEntry(edited).character.vitals!.maximumHitPoints, 24);
});

test("bard expertise must use proficient skills; metamagic count is enforced", () => {
  const bard = fixture("bard", 2);
  const draft = complete(bard, createLevelUpDraft(bard));
  draft.pathChoices["bard-expertise"] = ["athletics", "survival"];
  assert.ok(validateLevelUp(bard, draft).some((error) => error.includes("Expertise benötigt")));
  const sorcerer = fixture("sorcerer", 2);
  const magic = complete(sorcerer, createLevelUpDraft(sorcerer));
  magic.pathChoices["sorcerer-metamagic"] = ["careful"];
  assert.ok(validateLevelUp(sorcerer, magic).some((error) => error.includes("Metamagie")));
});

for (const cls of classes) {
  for (const level of [1, 2, 3, 4]) test(`${cls.id} ${level}→${level + 1}: complete available progression`, () => {
    const character = fixture(cls.id, level);
    const draft = complete(character, createLevelUpDraft(character));
    assert.deepEqual(validateLevelUp(character, draft), []);
    const next = applyLevelUp(character, draft);
    assert.equal(next.level, level + 1);
    assert.ok(next.vitals!.maximumHitPoints > character.vitals!.maximumHitPoints);
  });
}

test("level 4 and 5 milestones are visible and apply lightweight mechanics", () => {
  const barbarianFour = fixture("barbarian", 4);
  const barbarianFive = applyLevelUp(barbarianFour, complete(barbarianFour, createLevelUpDraft(barbarianFour)));
  assert.equal(barbarianFive.vitals!.speed, 12);
  assert.ok(getCharacterClassFeatures({ classId: "barbarian", level: 5 }).some((feature) => feature.id === "barbarian-extra-attack"));
  assert.ok(getCharacterClassFeatures({ classId: "wizard", level: 4 }).some((feature) => feature.id === "wizard-asi-4"));

  const bardResources = resolveCharacterClassResources({
    classId: "bard",
    level: 5,
    abilityScores: { ...defaultAbilityScores, charisma: 16 },
  });
  assert.equal(bardResources.find((resource) => resource.id === "bard-bardic-inspiration-uses")?.recharge, "short-rest");
});

test("level 4 applies ability score increases or records a feat", () => {
  const fighter = applyLevelUp(fixture("fighter", 2), complete(fixture("fighter", 2), createLevelUpDraft(fixture("fighter", 2))));

  const plusTwoDraft = createLevelUpDraft(fighter);
  plusTwoDraft.abilityScoreIncreases = { strength: 2 };
  const plusTwo = applyLevelUp(fighter, plusTwoDraft);
  assert.equal(plusTwo.level, 4);
  assert.equal(plusTwo.abilityScores!.strength, 12);
  assert.equal(plusTwo.levelUpHistory!.at(-1)!.abilityScoreIncreases!.strength, 2);

  const splitDraft = createLevelUpDraft(fighter);
  splitDraft.abilityScoreIncreases = { dexterity: 1, constitution: 1 };
  const split = applyLevelUp(fighter, splitDraft);
  assert.equal(split.abilityScores!.dexterity, 11);
  assert.equal(split.abilityScores!.constitution, 15);

  const featDraft = createLevelUpDraft(fighter);
  featDraft.abilityScoreMode = "feat";
  featDraft.featId = "war-caster";
  const feat = applyLevelUp(fighter, featDraft);
  assert.equal(feat.abilityScores!.strength, 10);
  assert.deepEqual(feat.featIds, ["war-caster"]);
  assert.equal(feat.levelUpHistory!.at(-1)!.featId, "war-caster");

  const observantDraft = createLevelUpDraft(fighter);
  observantDraft.abilityScoreMode = "feat";
  observantDraft.featId = "observant";
  observantDraft.featChoices = { observant: { "observant-ability": ["wisdom"] } };
  const observant = applyLevelUp(fighter, observantDraft);
  assert.equal(observant.abilityScores!.wisdom, 11);

  const invalidDraft = createLevelUpDraft({ ...fighter, abilityScores: { ...fighter.abilityScores!, strength: 19 } });
  invalidDraft.abilityScoreIncreases = { strength: 2 };
  assert.ok(validateLevelUp({ ...fighter, abilityScores: { ...fighter.abilityScores!, strength: 19 } }, invalidDraft).some((error) => error.includes("nicht über 20")));
});

test("feat mechanics affect derived rules", () => {
  const base = { ...defaultAbilityScores, dexterity: 14, constitution: 14, wisdom: 12 };
  const tough = calculateCharacterRules({ classId: "fighter", level: 4, abilityScores: base, baseSpeed: 9, featIds: ["tough"] });
  assert.equal(tough.maximumHitPoints, 44);

  const alertMobile = calculateCharacterRules({ classId: "fighter", level: 4, abilityScores: base, baseSpeed: 9, featIds: ["alert", "mobile"] });
  assert.equal(alertMobile.initiativeModifier, 7);
  assert.equal(alertMobile.speed, 12);

  const observant = calculateCharacterRules({
    classId: "fighter",
    level: 4,
    abilityScores: { ...base, wisdom: 13 },
    baseSpeed: 9,
    featIds: ["observant"],
    featChoices: { observant: { "observant-ability": ["wisdom"] } },
  });
  assert.equal(observant.passivePerception, 16);

  const resilient = calculateCharacterRules({
    classId: "wizard",
    level: 4,
    abilityScores: { ...base, constitution: 15 },
    baseSpeed: 9,
    featIds: ["resilient"],
    featChoices: { resilient: { "resilient-ability": ["constitution"] } },
  });
  assert.equal(resilient.savingThrows.constitution, 4);
});

test("known cantrips and spellbook entries cannot be silently replaced", () => {
  const wizard = fixture("wizard", 1);
  const draft = complete(wizard, createLevelUpDraft(wizard));
  const unused = getSpellsForClass("wizard").filter((spell) => !draft.spellcasting.spellIds.some((selection) => selection.spellId === spell.id));
  wizard.spellcasting!.spellIds = [
    { spellId: unused.find((spell) => spell.level === 0)!.id, prepared: true },
    { spellId: unused.find((spell) => spell.level === 1)!.id, prepared: true },
  ];
  const errors = validateLevelUp(wizard, draft);
  assert.ok(errors.some((error) => error.includes("Zaubertricks bleiben")));
  assert.ok(errors.some((error) => error.includes("Zauberbuch")));
});

test("grim hollow backgrounds are available as creator vault data", () => {
  const grimHollowBackgrounds = backgrounds.filter((entry) => entry.source === "grim-hollow-2025");
  assert.equal(grimHollowBackgrounds.length, 25);
  assert.ok(grimHollowBackgrounds.every((entry) => entry.originFeat));
  assert.ok(grimHollowBackgrounds.every((entry) => entry.abilityScoreOptions?.length === 3));
  assert.ok(grimHollowBackgrounds.some((entry) => entry.id === "beast-hunter"));
  assert.ok(grimHollowBackgrounds.some((entry) => entry.id === "ebon-syndicate-smuggler"));
});


