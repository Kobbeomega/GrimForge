import { getCharacterPathChoices, getClassById, getClassSubclassUnlockLevel, getSubclassUnlockLevel, isCharacterPathChoiceComplete, type CharacterPathChoices } from "../../compendium/classes";
import { defaultAbilityScores, getAbilityModifier } from "../../compendium/core";
import { getSpellById, type CharacterSpellcasting } from "../../compendium/spells";
import type { CharacterArchiveEntry } from "../archives/types";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import { mapArchiveEntryToDraft } from "../creator/mappers/mapArchiveEntryToDraft";
import { mapDraftToArchiveEntry } from "../creator/mappers/mapDraftToArchiveEntry";
import { getSpellSelectionRules, validateSpellSelection } from "../creator/utils/getSpellSelectionRules";

export const MAX_LEVEL_UP_LEVEL = 3;
export interface LevelUpDraft {
  fromLevel: number;
  subclassId: string;
  pathChoices: CharacterPathChoices;
  hitPointMode: "average" | "roll";
  hitDieRoll: number;
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
    spellcasting: structuredClone(character.spellcasting ?? { spellIds: [], slots: { spentSlots: {}, spentPactSlots: 0 } }),
  };
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
  // Reuse existing choice resolution, but copy only progression-owned fields.
  const mapped = mapDraftToArchiveEntry({ ...mapArchiveEntryToDraft(character), level, subclassId: draft.subclassId, pathChoices: draft.pathChoices });
  const vitals = getCharacterVitals(character);
  const maximumHitPoints = vitals.maximumHitPoints + getLevelUpHitPointGain(character, draft);
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
    spellcasting: { ...structuredClone(draft.spellcasting), slots: structuredClone(character.spellcasting?.slots ?? { spentSlots: {}, spentPactSlots: 0 }) },
    vitals: { ...vitals, maximumHitPoints, currentHitPoints: Math.min(vitals.currentHitPoints, maximumHitPoints) },
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
  const unlock = getClassSubclassUnlockLevel(classId);
  if (unlock && level >= unlock && !draft.subclassId) errors.push("Wähle eine Unterklasse.");
  if (character.subclassId && draft.subclassId !== character.subclassId) errors.push("Eine bestehende Unterklasse kann beim Aufstieg nicht gewechselt werden.");
  if (draft.subclassId) {
    const required = getSubclassUnlockLevel(classId, draft.subclassId);
    if (!required || required > level) errors.push("Diese Unterklasse ist auf der neuen Stufe nicht verfügbar.");
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
      subclassId: next.subclassId, pathChoices: structuredClone(next.pathChoices ?? {}),
      spellIds: next.spellcasting?.spellIds.map((selection) => selection.spellId) ?? [],
    }],
  };
}
