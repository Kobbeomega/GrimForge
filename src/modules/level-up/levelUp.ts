import { getCharacterPathChoices, getClassById, getClassSubclassUnlockLevel, getSubclassUnlockLevel, isCharacterPathChoiceComplete, type CharacterPathChoices } from "../../compendium/classes";
import { defaultAbilityScores, getAbilityModifier, isAbilityId, type AbilityId, type AbilityScores } from "../../compendium/core";
import { getFeatAbilityChoices, getFeatById, type CharacterFeatChoices } from "../../compendium/feats";
import { getSpellById, type CharacterSpellcasting } from "../../compendium/spells";
import type { CharacterArchiveEntry } from "../archives/types";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import { ancestryHitPointsPerLevel } from "../../rules/hitPoints";
import { mapArchiveEntryToDraft } from "../creator/mappers/mapArchiveEntryToDraft";
import { mapDraftToArchiveEntry } from "../creator/mappers/mapDraftToArchiveEntry";
import { getSpellSelectionRules, validateSpellSelection } from "../creator/utils/getSpellSelectionRules";

const blastInvocations = ["agonizing-blast", "eldritch-spear", "repelling-blast"];

export const MAX_LEVEL_UP_LEVEL = 5;
export interface LevelUpDraft {
  fromLevel: number;
  subclassId: string;
  pathChoices: CharacterPathChoices;
  hitPointMode: "average" | "roll";
  hitDieRoll: number;
  abilityScoreMode: "none" | "increase" | "feat";
  abilityScoreIncreases: Partial<Record<AbilityId, number>>;
  featId: string;
  featChoices: CharacterFeatChoices;
  featNote: string;
  spellcasting: CharacterSpellcasting;
}

export function choiceValues(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function createLevelUpDraft(character: CharacterArchiveEntry): LevelUpDraft {
  const creatorDraft = mapArchiveEntryToDraft(character);
  const rules = getSpellSelectionRules({
    classId: character.classId ?? "",
    subclassId: character.subclassId,
    level: character.level + 1,
    abilityScores: character.abilityScores ?? defaultAbilityScores,
    pathChoices: creatorDraft.pathChoices,
  });
  const spellcasting = creatorDraft.spellcasting;
  if (rules.restrictedSchools) {
    spellcasting.spellIds = spellcasting.spellIds.filter(({ spellId }) => (getSpellById(spellId)?.level ?? 0) <= rules.maximumSpellLevel);
  }
  return {
    fromLevel: character.level,
    subclassId: character.subclassId ?? "",
    pathChoices: structuredClone(creatorDraft.pathChoices),
    hitPointMode: "average",
    hitDieRoll: Math.floor((getClassById(character.classId ?? "")?.hitDie ?? 8) / 2) + 1,
    abilityScoreMode: character.level + 1 === 4 ? "increase" : "none",
    abilityScoreIncreases: {},
    featId: "",
    featChoices: structuredClone(character.featChoices ?? {}),
    featNote: "",
    spellcasting,
  };
}

function applyAbilityScoreIncrease(scores: AbilityScores, draft: LevelUpDraft): AbilityScores {
  const next = { ...scores };
  const increases = draft.abilityScoreMode === "feat"
    ? getFeatAbilityIncreases(draft)
    : draft.abilityScoreIncreases;
  if (draft.abilityScoreMode === "none") return next;
  for (const [abilityId, rawIncrease] of Object.entries(increases)) {
    if (!isAbilityId(abilityId)) continue;
    const increase = Number.isFinite(rawIncrease) ? Math.floor(rawIncrease ?? 0) : 0;
    next[abilityId] = Math.min(20, next[abilityId] + Math.max(0, increase));
  }
  return next;
}

function getFeatAbilityIncreases(draft: LevelUpDraft): Partial<Record<AbilityId, number>> {
  const feat = getFeatById(draft.featId);
  const increases: Partial<Record<AbilityId, number>> = { ...(feat?.abilityIncreases ?? {}) };
  for (const abilityId of getFeatAbilityChoices(feat, draft.featChoices)) {
    increases[abilityId] = (increases[abilityId] ?? 0) + 1;
  }
  return increases;
}

function getLevelUpHitPointGain(character: CharacterArchiveEntry, draft: LevelUpDraft, newConstitution: number): number {
  const hitDie = getClassById(character.classId ?? "")?.hitDie ?? 8;
  const roll = draft.hitPointMode === "average" ? Math.floor(hitDie / 2) + 1 : draft.hitDieRoll;
  const oldModifier = getAbilityModifier(character.abilityScores?.constitution ?? 10);
  const newModifier = getAbilityModifier(newConstitution);
  const existingFeatBonus = (character.featIds ?? []).reduce((sum, id) => sum + (getFeatById(id)?.bonuses?.hitPointsPerLevel ?? 0), 0);
  const newFeatBonus = draft.abilityScoreMode === "feat" && !character.featIds?.includes(draft.featId)
    ? getFeatById(draft.featId)?.bonuses?.hitPointsPerLevel ?? 0
    : 0;
  const draconic = character.classId === "sorcerer" && draft.subclassId === "draconic-bloodline";
  const draconicBonus = draconic ? (character.subclassId === draft.subclassId ? 1 : character.level + 1) : 0;
  return Math.max(1, roll + newModifier) + (newModifier - oldModifier) * character.level
    + existingFeatBonus + newFeatBonus * (character.level + 1) + draconicBonus + ancestryHitPointsPerLevel(character);
}

export function previewLevelUp(character: CharacterArchiveEntry, draft: LevelUpDraft): CharacterArchiveEntry {
  const level = character.level + 1;
  const baseAbilityScores = applyAbilityScoreIncrease({ ...defaultAbilityScores, ...(character.baseAbilityScores ?? character.abilityScores) }, draft);
  // Reuse existing choice resolution, but copy only progression-owned fields.
  const mapped = mapDraftToArchiveEntry({ ...mapArchiveEntryToDraft(character), level, subclassId: draft.subclassId, pathChoices: draft.pathChoices, baseAbilities: baseAbilityScores });
  const vitals = getCharacterVitals(character);
  const constitution = draft.abilityScoreMode === "none"
    ? character.abilityScores?.constitution ?? 10
    : mapped.abilityScores?.constitution ?? 10;
  const maximumHitPoints = vitals.maximumHitPoints + getLevelUpHitPointGain(character, draft, constitution);
  const oldInitiative = getAbilityModifier(character.abilityScores?.dexterity ?? 10) +
    (character.classId === "ranger" && character.subclassId === "gloom-stalker" && character.level >= 3
      ? getAbilityModifier(character.abilityScores?.wisdom ?? 10) : 0);
  const initiativeModifier = vitals.initiativeModifier + (mapped.vitals?.initiativeModifier ?? oldInitiative) - oldInitiative;
  const spellRules = getSpellSelectionRules({ classId: character.classId ?? "", subclassId: draft.subclassId, level, abilityScores: mapped.abilityScores ?? defaultAbilityScores, pathChoices: draft.pathChoices });
  const spellcasting = structuredClone(draft.spellcasting);
  if (spellRules.mode === "prepared") {
    spellcasting.spellIds = spellcasting.spellIds.filter(({ spellId }) => !spellRules.grantedSpellIds.includes(spellId));
  }
  const dropsBeguilingInfluence = character.classId === "warlock"
    && choiceValues(character.pathChoices?.["warlock-invocations"]).includes("beguiling-influence")
    && !choiceValues(draft.pathChoices["warlock-invocations"]).includes("beguiling-influence");
  const retainedSkills = (character.skillProficiencies ?? []).filter((id) => !dropsBeguilingInfluence || (id !== "deception" && id !== "persuasion"));
  return {
    ...character,
    movementBaseVersion: 1,
    level,
    subclassId: mapped.subclassId,
    subclass: mapped.subclass,
    pathChoices: structuredClone(draft.pathChoices),
    skillProficiencies: [...new Set([...retainedSkills, ...(mapped.skillProficiencies ?? [])])],
    skillExpertise: [...new Set([...(character.skillExpertise ?? []), ...(mapped.skillExpertise ?? [])])],
    toolProficiencies: [...new Set([...(character.toolProficiencies ?? []), ...(mapped.toolProficiencies ?? [])])],
    languageChoices: Math.max(character.languageChoices ?? 0, mapped.languageChoices ?? 0),
    baseAbilityScores: mapped.baseAbilityScores,
    abilityScores: mapped.abilityScores,
    featIds: draft.abilityScoreMode === "feat" && draft.featId
      ? [...new Set([...(character.featIds ?? []), draft.featId])]
      : character.featIds,
    featChoices: draft.abilityScoreMode === "feat" && draft.featId
      ? structuredClone(draft.featChoices)
      : character.featChoices,
    spellcasting: { ...spellcasting, slots: structuredClone(character.spellcasting?.slots ?? { spentSlots: {}, spentPactSlots: 0 }) },
    vitals: { ...vitals, maximumHitPoints, currentHitPoints: Math.min(vitals.currentHitPoints, maximumHitPoints), initiativeModifier },
  };
}

export function validateLevelUp(character: CharacterArchiveEntry, draft: LevelUpDraft, phase: "all" | "choices" | "spells" = "all"): string[] {
  const errors: string[] = [];
  const classId = character.classId ?? "";
  const definition = getClassById(classId);
  const level = character.level + 1;
  if (!definition) return ["Dieser Akte fehlt eine gültige Klasse. Ergänze sie zuerst über Bearbeiten."];
  if (!Number.isInteger(character.level) || character.level < 1 || level > MAX_LEVEL_UP_LEVEL) return [`Der aktuelle Regelumfang unterstützt Aufstiege bis Stufe ${MAX_LEVEL_UP_LEVEL}.`];
  if (draft.fromLevel !== character.level) errors.push("Die Charakterstufe hat sich geändert. Öffne den Aufstieg erneut.");
  if (draft.hitPointMode === "roll" && (!Number.isInteger(draft.hitDieRoll) || draft.hitDieRoll < 1 || draft.hitDieRoll > definition.hitDie)) errors.push(`Trage ein Würfelergebnis von 1 bis ${definition.hitDie} ein.`);
  if (level === 4) {
    if (draft.abilityScoreMode === "none") errors.push("Stufe 4 benötigt eine Attributswerterhöhung oder ein Talent.");
    if (draft.abilityScoreMode === "increase") {
      const baseScores = { ...defaultAbilityScores, ...character.abilityScores };
      const entries = Object.entries(draft.abilityScoreIncreases)
        .filter(([abilityId, increase]) => isAbilityId(abilityId) && Number.isFinite(increase) && Math.floor(increase ?? 0) > 0)
        .map(([abilityId, increase]) => [abilityId as AbilityId, Math.floor(increase ?? 0)] as const);
      const total = entries.reduce((sum, [, increase]) => sum + increase, 0);
      if (total !== 2) errors.push("Verteile auf Stufe 4 genau 2 Attributspunkte.");
      if (entries.some(([, increase]) => increase > 2)) errors.push("Ein Attribut kann durch diesen Aufstieg höchstens um 2 steigen.");
      if (entries.some(([abilityId, increase]) => baseScores[abilityId] + increase > 20)) errors.push("Attributswerte dürfen durch den Aufstieg nicht über 20 steigen.");
    }
    if (draft.abilityScoreMode === "feat") {
      const feat = getFeatById(draft.featId);
      if (!feat) errors.push("Wähle ein Talent.");
      if (feat && character.featIds?.includes(feat.id)) errors.push("Dieses Talent ist bereits gewählt.");
      if (feat?.id === "war-caster" && !canChooseWarCaster(character, draft)) errors.push("Kriegszauberer setzt voraus, dass du mindestens einen Zauber wirken kannst.");
      if (feat?.abilityChoice) {
        const selected = getFeatAbilityChoices(feat, draft.featChoices);
        if (selected.length !== feat.abilityChoice.choose) errors.push(`${feat.name}: Wähle ${feat.abilityChoice.choose} Attribut${feat.abilityChoice.choose === 1 ? "" : "e"}.`);
      }
      const featIncreases = getFeatAbilityIncreases(draft);
      const baseScores = { ...defaultAbilityScores, ...character.abilityScores };
      if (Object.entries(featIncreases).some(([abilityId, increase]) => isAbilityId(abilityId) && baseScores[abilityId] + (increase ?? 0) > 20)) errors.push("Talent-Attributsboni dürfen Werte nicht über 20 steigern.");
    }
  } else if (draft.abilityScoreMode !== "none") {
    errors.push("Attributswerterhöhung oder Talent ist in diesem Aufstieg nicht vorgesehen.");
  }
  const unlock = getClassSubclassUnlockLevel(classId);
  if (unlock && level >= unlock && !draft.subclassId) errors.push("Wähle eine Unterklasse.");
  const legacySubclass = definition.subclasses.some((subclass) => subclass.id === character.subclassId && subclass.legacy);
  if (character.subclassId && draft.subclassId !== character.subclassId && !legacySubclass) errors.push("Eine bestehende Unterklasse kann beim Aufstieg nicht gewechselt werden.");
  if (draft.subclassId) {
    const required = getSubclassUnlockLevel(classId, draft.subclassId);
    const keepsExistingEarlySubclass = character.subclassId === draft.subclassId && Boolean(required);
    const isLegacy = definition.subclasses.some((subclass) => subclass.id === draft.subclassId && subclass.legacy);
    if (!required || ((isLegacy || required > level) && !keepsExistingEarlySubclass)) errors.push("Diese Unterklasse ist auf der neuen Stufe nicht verfügbar.");
  }
  const preview = previewLevelUp(character, draft);
  const definitions = getCharacterPathChoices(classId, draft.subclassId, level, draft.pathChoices);
  for (const choice of definitions) {
    const values = choiceValues(draft.pathChoices[choice.id]);
    const originalValues = choiceValues(character.pathChoices?.[choice.id]);
    if (choice.id === "warlock-invocations") {
      if (originalValues.length && originalValues.filter((id) => !values.includes(id)).length > 1) errors.push("Beim Aufstieg darfst du höchstens eine bisherige Anrufung ersetzen.");
    } else if (choice.id === "monster-hunter-weapon-mastery") {
      const eligibleOriginal = originalValues.filter((id) => choice.options.some((option) => option.id === id));
      if (eligibleOriginal.some((id) => !values.includes(id))) errors.push("Vorhandene Waffenmeisterschaften bleiben beim Aufstieg erhalten.");
    } else if (choice.level <= character.level && isCharacterPathChoiceComplete(choice, character.pathChoices?.[choice.id]) && (values.length !== originalValues.length || originalValues.some((id) => !values.includes(id)))) {
      errors.push(`${choice.name}: Die bisherige Entscheidung bleibt beim Aufstieg erhalten.`);
    }
    if (!isCharacterPathChoiceComplete(choice, draft.pathChoices[choice.id])) errors.push(`${choice.name}: Wähle genau ${choice.choose} Option${choice.choose === 1 ? "" : "en"}.`);
    if (choice.id.endsWith("-expertise") && values.some((id) => id !== "thieves-tools" && !preview.skillProficiencies?.includes(id as never))) errors.push("Expertise benötigt eine bereits geübte Fertigkeit.");
    if (choice.id === "lore-bonus-skills" && values.some((id) => character.skillProficiencies?.includes(id as never) && !choiceValues(character.pathChoices?.[choice.id]).includes(id))) errors.push("Wähle für zusätzliche Übungen bisher ungeübte Fertigkeiten.");
    if (choice.id === "warlock-tome-cantrips" && values.some((id) => draft.spellcasting.spellIds.some((spell) => spell.spellId === id))) errors.push("Wähle für das Buch der Schatten Zaubertricks, die du noch nicht kennst.");
  }
  if (phase === "choices") return errors;
  if (phase === "spells") errors.length = 0;
  const spellArgs = { classId, subclassId: draft.subclassId, level, abilityScores: preview.abilityScores ?? defaultAbilityScores, pathChoices: draft.pathChoices };
  const spellRules = getSpellSelectionRules(spellArgs);
  const spellValidation = validateSpellSelection({ ...spellArgs, spellcasting: preview.spellcasting ?? draft.spellcasting });
  if (!spellValidation.valid) errors.push(spellValidation.message!);
  const newIds = new Set(draft.spellcasting.spellIds.map((selection) => selection.spellId));
  const removed = mapArchiveEntryToDraft(character).spellcasting.spellIds.filter((selection) => !newIds.has(selection.spellId) && !spellRules.grantedSpellIds.includes(selection.spellId));
  const removedCantrips = removed.filter((selection) => getSpellById(selection.spellId)?.level === 0).length;
  if (removedCantrips > (spellRules.canReplaceCantrip ? 1 : 0)) errors.push(spellRules.canReplaceCantrip
    ? "Beim Aufstieg darfst du höchstens einen Zaubertrick ersetzen."
    : "Bereits gelernte Zaubertricks bleiben beim Aufstieg erhalten.");
  const removedLevelled = removed.filter((selection) => {
    const spellLevel = getSpellById(selection.spellId)?.level ?? 0;
    return spellLevel > 0 && (!spellRules.restrictedSchools || spellLevel <= spellRules.maximumSpellLevel);
  });
  if (spellRules.mode === "spellbook" && removedLevelled.length) errors.push("Bereits eingetragene Zauber bleiben im Zauberbuch.");
  if ((spellRules.mode === "known" || spellRules.mode === "pact") && removedLevelled.length > 1) errors.push("Beim Aufstieg darfst du höchstens einen bekannten Zauber ersetzen.");
  if (needsEldritchBlast(draft, spellRules.grantedSpellIds)) errors.push("Die gewählte Anrufung benötigt Schauriger Strahl.");
  return errors;
}

export function needsEldritchBlast(draft: LevelUpDraft, grantedSpellIds: string[]): boolean {
  return choiceValues(draft.pathChoices["warlock-invocations"]).some((id) => blastInvocations.includes(id))
    && !draft.spellcasting.spellIds.some(({ spellId }) => spellId === "eldritch-blast")
    && !grantedSpellIds.includes("eldritch-blast");
}

export function invocationRequiresEldritchBlast(id: string): boolean {
  return blastInvocations.includes(id);
}

export function canChooseWarCaster(character: CharacterArchiveEntry, draft: LevelUpDraft): boolean {
  const innateMagic = character.ancestryTraitIds?.some((id) => id === "magical-aptitude" || id === "magical-prodigy");
  if (innateMagic) return true;
  if (!character.ancestryTraitIds && (
    character.ancestryId === "tiefling" ||
    ["high-elf", "drow", "forest-gnome"].includes(character.ancestryVariantId ?? "")
  )) return true;
  return getSpellSelectionRules({
    classId: character.classId ?? "",
    subclassId: draft.subclassId,
    level: character.level + 1,
    abilityScores: character.abilityScores ?? defaultAbilityScores,
    pathChoices: draft.pathChoices,
  }).enabled;
}

export function applyLevelUp(character: CharacterArchiveEntry, draft: LevelUpDraft): CharacterArchiveEntry {
  const errors = validateLevelUp(character, draft);
  if (errors.length) throw new Error(errors.join(" "));
  const next = previewLevelUp(character, draft);
  const timestamp = new Date().toISOString();
  return {
    ...next,
    updatedAt: timestamp,
    levelUpHistory: [...(character.levelUpHistory ?? []), {
      fromLevel: character.level, toLevel: next.level, date: timestamp,
      hitPointGain: getCharacterVitals(next).maximumHitPoints - getCharacterVitals(character).maximumHitPoints,
      hitPointMode: draft.hitPointMode,
      hitDieRoll: draft.hitPointMode === "roll" ? draft.hitDieRoll : undefined,
      abilityScoreMode: draft.abilityScoreMode,
      abilityScoreIncreases: structuredClone(draft.abilityScoreIncreases),
      featId: draft.abilityScoreMode === "feat" ? draft.featId : undefined,
      featChoices: draft.abilityScoreMode === "feat" ? structuredClone(draft.featChoices) : undefined,
      featNote: draft.abilityScoreMode === "feat" ? draft.featNote.trim() : undefined,
      subclassId: next.subclassId, pathChoices: structuredClone(next.pathChoices ?? {}),
      spellIds: next.spellcasting?.spellIds.map((selection) => selection.spellId) ?? [],
    }],
  };
}
