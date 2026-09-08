import { getCharacterPathChoices, getClassById, getClassSubclassUnlockLevel, getSubclassUnlockLevel, isCharacterPathChoiceComplete, type CharacterPathChoices } from "../../compendium/classes";
import { defaultAbilityScores, getAbilityModifier, isAbilityId, type AbilityId, type AbilityScores } from "../../compendium/core";
import { getFeatAbilityChoices, getFeatById, type CharacterFeatChoices } from "../../compendium/feats";
import { getSpellById, type CharacterSpellcasting } from "../../compendium/spells";
import type { CharacterArchiveEntry } from "../archives/types";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import { mapArchiveEntryToDraft } from "../creator/mappers/mapArchiveEntryToDraft";
import { mapDraftToArchiveEntry } from "../creator/mappers/mapDraftToArchiveEntry";
import { getSpellSelectionRules, validateSpellSelection } from "../creator/utils/getSpellSelectionRules";

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
  return {
    fromLevel: character.level,
    subclassId: character.subclassId ?? "",
    pathChoices: structuredClone(mapArchiveEntryToDraft(character).pathChoices),
    hitPointMode: "average",
    hitDieRoll: Math.floor((getClassById(character.classId ?? "")?.hitDie ?? 8) / 2) + 1,
    abilityScoreMode: character.level + 1 === 4 ? "increase" : "none",
    abilityScoreIncreases: {},
    featId: "",
    featChoices: structuredClone(character.featChoices ?? {}),
    featNote: "",
    spellcasting: structuredClone(character.spellcasting ?? { spellIds: [], slots: { spentSlots: {}, spentPactSlots: 0 } }),
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

export function getLevelUpHitPointGain(character: CharacterArchiveEntry, draft: LevelUpDraft): number {
  const hitDie = getClassById(character.classId ?? "")?.hitDie ?? 8;
  const roll = draft.hitPointMode === "average" ? Math.floor(hitDie / 2) + 1 : draft.hitDieRoll;
  const modifier = getAbilityModifier(character.abilityScores?.constitution ?? 10);
  const bonus = character.classId === "sorcerer" && draft.subclassId === "draconic-bloodline" ? 1 : 0;
  return Math.max(1, roll + modifier) + bonus;
}

export function previewLevelUp(character: CharacterArchiveEntry, draft: LevelUpDraft): CharacterArchiveEntry {
  const level = character.level + 1;
  const baseAbilityScores = applyAbilityScoreIncrease({ ...defaultAbilityScores, ...(character.baseAbilityScores ?? character.abilityScores) }, draft);
  // Reuse existing choice resolution, but copy only progression-owned fields.
  const mapped = mapDraftToArchiveEntry({ ...mapArchiveEntryToDraft(character), level, subclassId: draft.subclassId, pathChoices: draft.pathChoices, baseAbilities: baseAbilityScores });
  const vitals = getCharacterVitals(character);
  const maximumHitPoints = vitals.maximumHitPoints + getLevelUpHitPointGain(character, draft);
  const speed = character.classId === "barbarian" && character.level < 5 && level >= 5
    ? vitals.speed + 3
    : vitals.speed;
  return {
    ...character,
    level,
    subclassId: mapped.subclassId,
    subclass: mapped.subclass,
    pathChoices: structuredClone(draft.pathChoices),
    skillProficiencies: [...new Set([...(character.skillProficiencies ?? []), ...(mapped.skillProficiencies ?? [])])],
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
    spellcasting: { ...structuredClone(draft.spellcasting), slots: structuredClone(character.spellcasting?.slots ?? { spentSlots: {}, spentPactSlots: 0 }) },
    vitals: { ...vitals, maximumHitPoints, currentHitPoints: Math.min(vitals.currentHitPoints, maximumHitPoints), speed },
  };
}

export function validateLevelUp(character: CharacterArchiveEntry, draft: LevelUpDraft): string[] {
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
      if (feat?.abilityChoice) {
        const selected = getFeatAbilityChoices(feat, draft.featChoices);
        if (selected.length !== feat.abilityChoice.choose) errors.push(`${feat.name}: Wähle ${feat.abilityChoice.choose} Attribut${feat.abilityChoice.choose === 1 ? "" : "e"}.`);
      }
      const featIncreases = getFeatAbilityIncreases(draft);
      const baseScores = { ...defaultAbilityScores, ...(character.baseAbilityScores ?? character.abilityScores) };
      if (Object.entries(featIncreases).some(([abilityId, increase]) => isAbilityId(abilityId) && baseScores[abilityId] + (increase ?? 0) > 20)) errors.push("Talent-Attributsboni dürfen Werte nicht über 20 steigern.");
    }
  } else if (draft.abilityScoreMode !== "none") {
    errors.push("Attributswerterhöhung oder Talent ist in diesem Aufstieg nicht vorgesehen.");
  }
  const unlock = getClassSubclassUnlockLevel(classId);
  if (unlock && level >= unlock && !draft.subclassId) errors.push("Wähle eine Unterklasse.");
  if (character.subclassId && draft.subclassId !== character.subclassId) errors.push("Eine bestehende Unterklasse kann beim Aufstieg nicht gewechselt werden.");
  if (draft.subclassId) {
    const required = getSubclassUnlockLevel(classId, draft.subclassId);
    const keepsExistingEarlySubclass = character.subclassId === draft.subclassId && Boolean(required);
    if (!required || (required > level && !keepsExistingEarlySubclass)) errors.push("Diese Unterklasse ist auf der neuen Stufe nicht verfügbar.");
  }
  const preview = previewLevelUp(character, draft);
  const definitions = getCharacterPathChoices(classId, draft.subclassId, level, draft.pathChoices);
  for (const choice of definitions) {
    const values = choiceValues(draft.pathChoices[choice.id]);
    const originalValues = choiceValues(character.pathChoices?.[choice.id]);
    if (choice.level <= character.level && originalValues.length === choice.choose && (values.length !== originalValues.length || originalValues.some((id) => !values.includes(id)))) errors.push(`${choice.name}: Die bisherige Entscheidung bleibt beim Aufstieg erhalten.`);
    if (!isCharacterPathChoiceComplete(choice, draft.pathChoices[choice.id])) errors.push(`${choice.name}: Wähle genau ${choice.choose} Option${choice.choose === 1 ? "" : "en"}.`);
    if (choice.id.endsWith("-expertise") && values.some((id) => id !== "thieves-tools" && !preview.skillProficiencies?.includes(id as never))) errors.push("Expertise benötigt eine bereits geübte Fertigkeit.");
    if (choice.id === "lore-bonus-skills" && values.some((id) => character.skillProficiencies?.includes(id as never) && !choiceValues(character.pathChoices?.[choice.id]).includes(id))) errors.push("Wähle für zusätzliche Übungen bisher ungeübte Fertigkeiten.");
  }
  const spellArgs = { classId, subclassId: draft.subclassId, level, abilityScores: character.abilityScores ?? defaultAbilityScores, pathChoices: draft.pathChoices };
  const spellRules = getSpellSelectionRules(spellArgs);
  const spellValidation = validateSpellSelection({ ...spellArgs, spellcasting: draft.spellcasting });
  if (!spellValidation.valid) errors.push(spellValidation.message!);
  const newIds = new Set(draft.spellcasting.spellIds.map((selection) => selection.spellId));
  const removed = (character.spellcasting?.spellIds ?? []).filter((selection) => !newIds.has(selection.spellId) && !spellRules.grantedSpellIds.includes(selection.spellId));
  if (removed.some((selection) => getSpellById(selection.spellId)?.level === 0)) errors.push("Bereits gelernte Zaubertricks bleiben beim Aufstieg erhalten.");
  const removedLevelled = removed.filter((selection) => (getSpellById(selection.spellId)?.level ?? 0) > 0);
  if (spellRules.mode === "spellbook" && removedLevelled.length) errors.push("Bereits eingetragene Zauber bleiben im Zauberbuch.");
  if ((spellRules.mode === "known" || spellRules.mode === "pact") && removedLevelled.length > 1) errors.push("Beim Aufstieg darfst du höchstens einen bekannten Zauber ersetzen.");
  const blastInvocations = ["agonizing-blast", "eldritch-spear", "repelling-blast"];
  if (choiceValues(draft.pathChoices["warlock-invocations"]).some((id) => blastInvocations.includes(id)) && !newIds.has("eldritch-blast")) errors.push("Die gewählte Anrufung benötigt Schauriger Strahl.");
  return errors;
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
      hitPointGain: getLevelUpHitPointGain(character, draft), hitPointMode: draft.hitPointMode,
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
