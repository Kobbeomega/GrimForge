import test from "node:test";
import assert from "node:assert/strict";
import { classes, getCharacterPathChoices, getClassSubclassUnlockLevel } from "../src/compendium/classes";
import { backgrounds } from "../src/compendium/backgrounds";
import { getSpellsForClass, getSpellById } from "../src/compendium/spells";
import { defaultAbilityScores } from "../src/compendium/core";
import { createLevelUpDraft, previewLevelUp, validateLevelUp, applyLevelUp, type LevelUpDraft } from "../src/modules/level-up/levelUp";
import { getSpellSelectionRules } from "../src/modules/creator/utils/getSpellSelectionRules";
import { migrateCharacterArchiveEntry } from "../src/migrations/characterSchema";
import { mergeEditedCharacter } from "../src/modules/creator/mappers/mergeEditedCharacter";
import { mapArchiveEntryToDraft } from "../src/modules/creator/mappers/mapArchiveEntryToDraft";
import { mapDraftToArchiveEntry } from "../src/modules/creator/mappers/mapDraftToArchiveEntry";
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

test("subclass required for 2→3; no duplicate or unsupported 3→4", () => {
  const character = fixture("fighter", 2);
  const draft = createLevelUpDraft(character);
  assert.throws(() => applyLevelUp(character, draft), /Unterklasse/);
  draft.subclassId = "champion";
  const next = applyLevelUp(character, draft);
  assert.equal(next.subclass, "Champion");
  assert.throws(() => applyLevelUp(next, draft), /bis Stufe 3/);
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
  for (const level of [1, 2]) test(`${cls.id} ${level}→${level + 1}: complete available progression`, () => {
    const character = fixture(cls.id, level);
    const draft = complete(character, createLevelUpDraft(character));
    assert.deepEqual(validateLevelUp(character, draft), []);
    const next = applyLevelUp(character, draft);
    assert.equal(next.level, level + 1);
    assert.ok(next.vitals!.maximumHitPoints > character.vitals!.maximumHitPoints);
  });
}

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
