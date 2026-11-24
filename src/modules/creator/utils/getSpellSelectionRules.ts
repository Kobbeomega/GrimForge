import { getAbilityModifier } from "../../../compendium/core";
import {
  getCantripsKnown,
  getClassSpellcasting,
  getMaximumSpellLevel,
  getSpellById,
  getSpellsForClass,
  getSpellsKnown,
} from "../../../compendium/spells";
import {
  getBonusSelectableSubclassCantrips,
  getExpandedSubclassSpellIds,
  getGrantedSubclassSpellIds,
  getSubclassSpellcastingProfile,
  getThirdCasterSlots,
  type CharacterPathChoices,
} from "../../../compendium/classes";
import type { AbilityId, AbilityScores } from "../../../compendium/core";
import type {
  CharacterSpellcasting,
  SpellPreparationMode,
  SpellSchool,
} from "../../../compendium/spells";

export interface SpellSelectionRules {
  enabled: boolean;
  mode?: SpellPreparationMode;
  abilityId?: AbilityId;
  sourceClassId?: string;
  cantripsRequired: number;
  levelledSpellsRequired: number;
  preparedSpellsRequired: number;
  maximumSpellLevel: number;
  grantedSpellIds: string[];
  expandedSpellIds: string[];
  forcedCantripIds: string[];
  restrictedSchools?: SpellSchool[];
  restrictedSpellCount?: number;
  canReplaceCantrip?: boolean;
}

export interface SpellSelectionValidation {
  valid: boolean;
  message?: string;
}

export function getSpellSelectionRules({
  classId,
  subclassId,
  level,
  abilityScores,
  pathChoices,
}: {
  classId: string;
  subclassId?: string;
  level: number;
  abilityScores: AbilityScores;
  pathChoices?: CharacterPathChoices;
}): SpellSelectionRules {
  const subclassProfile = getSubclassSpellcastingProfile(classId, subclassId);
  const grantedSpellIds = getGrantedSubclassSpellIds({ classId, subclassId, level, pathChoices });
  const expandedSpellIds = getExpandedSubclassSpellIds(classId, subclassId, level);

  if (subclassProfile && level >= subclassProfile.startsAtLevel) {
    const cantripsKnown = getLatestLevelValue(subclassProfile.cantripsKnown, level);
    const spellsKnown = getLatestLevelValue(subclassProfile.spellsKnown, level);
    const forcedCantripIds = subclassProfile.forcedCantripIds ?? [];

    return {
      enabled: true,
      mode: "known",
      abilityId: subclassProfile.abilityId,
      sourceClassId: subclassProfile.sourceClassId,
      cantripsRequired: Math.max(0, cantripsKnown - forcedCantripIds.length),
      levelledSpellsRequired: spellsKnown,
      preparedSpellsRequired: 0,
      maximumSpellLevel: Math.max(0, ...Object.keys(getThirdCasterSlots(level)).map(Number)),
      grantedSpellIds: [...new Set([...grantedSpellIds, ...forcedCantripIds])],
      expandedSpellIds,
      forcedCantripIds,
      restrictedSchools: subclassProfile.restrictedSchools,
      restrictedSpellCount: Math.max(0, spellsKnown - (subclassProfile.unrestrictedSpellCount ?? spellsKnown) - [8, 14, 20].filter((unlock) => level >= unlock).length),
      canReplaceCantrip: subclassProfile.canReplaceCantrip,
    };
  }

  const definition = getClassSpellcasting(classId);
  if (!definition) {
    return {
      enabled: false,
      cantripsRequired: 0,
      levelledSpellsRequired: 0,
      preparedSpellsRequired: 0,
      maximumSpellLevel: 0,
      grantedSpellIds,
      expandedSpellIds,
      forcedCantripIds: [],
    };
  }

  const maximumSpellLevel = getMaximumSpellLevel(classId, level);
  const cantripsRequired = getCantripsKnown(classId, level) +
    getBonusSelectableSubclassCantrips(classId, subclassId, level);

  if (maximumSpellLevel <= 0 && cantripsRequired === 0 && grantedSpellIds.length === 0) {
    return {
      enabled: false,
      mode: definition.preparationMode,
      abilityId: definition.abilityId,
      sourceClassId: classId,
      cantripsRequired: 0,
      levelledSpellsRequired: 0,
      preparedSpellsRequired: 0,
      maximumSpellLevel: 0,
      grantedSpellIds,
      expandedSpellIds,
      forcedCantripIds: [],
    };
  }

  if (maximumSpellLevel <= 0) {
    return {
      enabled: true,
      mode: definition.preparationMode,
      abilityId: definition.abilityId,
      sourceClassId: classId,
      cantripsRequired,
      levelledSpellsRequired: 0,
      preparedSpellsRequired: 0,
      maximumSpellLevel: 0,
      grantedSpellIds,
      expandedSpellIds,
      forcedCantripIds: [],
    };
  }

  const abilityModifier = getAbilityModifier(abilityScores[definition.abilityId]);
  const preparedLimit = calculatePreparedSpellLimit({
    mode: definition.preparationMode,
    formula: definition.preparedSpellFormula,
    minimum: definition.minimumPreparedSpells ?? 0,
    abilityModifier,
    level,
  });

  switch (definition.preparationMode) {
    case "known":
    case "pact":
      return {
        enabled: true,
        mode: definition.preparationMode,
        abilityId: definition.abilityId,
        sourceClassId: classId,
        cantripsRequired,
        levelledSpellsRequired: getSpellsKnown(classId, level) ?? 0,
        preparedSpellsRequired: 0,
        maximumSpellLevel,
        grantedSpellIds,
        expandedSpellIds,
        forcedCantripIds: [],
      };
    case "prepared":
      return {
        enabled: true,
        mode: definition.preparationMode,
        abilityId: definition.abilityId,
        sourceClassId: classId,
        cantripsRequired,
        levelledSpellsRequired: preparedLimit,
        preparedSpellsRequired: preparedLimit,
        maximumSpellLevel,
        grantedSpellIds,
        expandedSpellIds,
        forcedCantripIds: [],
      };
    case "spellbook": {
      const spellbookSpellCount = getWizardSpellbookSpellCount(level);
      return {
        enabled: true,
        mode: definition.preparationMode,
        abilityId: definition.abilityId,
        sourceClassId: classId,
        cantripsRequired,
        levelledSpellsRequired: spellbookSpellCount,
        preparedSpellsRequired: Math.min(preparedLimit, spellbookSpellCount),
        maximumSpellLevel,
        grantedSpellIds,
        expandedSpellIds,
        forcedCantripIds: [],
      };
    }
  }
}

export function validateSpellSelection({
  classId,
  subclassId,
  level,
  abilityScores,
  spellcasting,
  pathChoices,
}: {
  classId: string;
  subclassId?: string;
  level: number;
  abilityScores: AbilityScores;
  spellcasting: CharacterSpellcasting;
  pathChoices?: CharacterPathChoices;
}): SpellSelectionValidation {
  const rules = getSpellSelectionRules({ classId, subclassId, level, abilityScores, pathChoices });
  if (!rules.enabled) return { valid: true };

  const selectedIds = spellcasting.spellIds.map((selection) => selection.spellId);
  if (new Set(selectedIds).size !== selectedIds.length) {
    return { valid: false, message: "Jeder Zauber darf nur einmal gewählt werden." };
  }

  const unknownSpellId = selectedIds.find((spellId) => !getSpellById(spellId));
  if (unknownSpellId) {
    return { valid: false, message: "Die Zauberauswahl enthält einen unbekannten Zauber." };
  }

  const grantedIds = new Set(rules.grantedSpellIds);
  const selectableIds = new Set([
    ...getSpellsForClass(rules.sourceClassId ?? classId).map((spell) => spell.id),
    ...rules.expandedSpellIds,
  ]);
  const invalidSelection = spellcasting.spellIds.find((selection) => {
    const spell = getSpellById(selection.spellId);
    return !spell || grantedIds.has(selection.spellId) || !selectableIds.has(selection.spellId) ||
      (spell.level > 0 && spell.level > rules.maximumSpellLevel);
  });
  if (invalidSelection) {
    return { valid: false, message: "Die Zauberauswahl enthält einen Zauber, der für diese Klasse oder Stufe nicht verfügbar ist." };
  }

  const selectedSpells = spellcasting.spellIds.flatMap((selection) => {
    const spell = getSpellById(selection.spellId);
    return spell ? [{ spell, selection }] : [];
  });

  const cantripCount = selectedSpells.filter(({ spell }) => spell.level === 0).length;
  const levelled = selectedSpells.filter(({ spell }) => spell.level > 0);
  const levelledCount = levelled.length;
  const preparedCount = levelled.filter(({ selection }) => selection.prepared).length;

  if (cantripCount !== rules.cantripsRequired) {
    return { valid: false, message: rules.cantripsRequired === 1 ? "Wähle genau einen Zaubertrick." : `Wähle genau ${rules.cantripsRequired} Zaubertricks.` };
  }
  if (levelledCount !== rules.levelledSpellsRequired) {
    return { valid: false, message: rules.levelledSpellsRequired === 1 ? "Wähle genau einen Zauber." : `Wähle genau ${rules.levelledSpellsRequired} Zauber.` };
  }
  if (rules.mode === "spellbook" && preparedCount !== rules.preparedSpellsRequired) {
    return { valid: false, message: `Bereite genau ${rules.preparedSpellsRequired} Zauber vor.` };
  }

  if (rules.restrictedSchools?.length && rules.restrictedSpellCount) {
    const restrictedCount = levelled.filter(({ spell }) => rules.restrictedSchools!.includes(spell.school)).length;
    if (restrictedCount < rules.restrictedSpellCount) {
      const schoolNames = rules.restrictedSchools.map(formatSchool).join(" oder ");
      return {
        valid: false,
        message: `Mindestens ${rules.restrictedSpellCount} deiner Zauber müssen aus ${schoolNames} stammen.`,
      };
    }
  }

  return { valid: true };
}

function calculatePreparedSpellLimit({
  mode,
  formula,
  minimum,
  abilityModifier,
  level,
}: {
  mode: SpellPreparationMode;
  formula?: "ability-plus-level" | "ability-plus-half-level";
  minimum: number;
  abilityModifier: number;
  level: number;
}): number {
  if (mode !== "prepared" && mode !== "spellbook") return 0;
  let calculated = 0;
  switch (formula) {
    case "ability-plus-level":
      calculated = abilityModifier + level;
      break;
    case "ability-plus-half-level":
      calculated = abilityModifier + Math.floor(level / 2);
      break;
    default:
      calculated = 0;
  }
  return Math.max(minimum, calculated);
}

function getWizardSpellbookSpellCount(level: number): number {
  return 6 + Math.max(0, level - 1) * 2;
}

function getLatestLevelValue(table: Record<number, number>, level: number): number {
  return Object.entries(table)
    .filter(([required]) => Number(required) <= level)
    .sort(([left], [right]) => Number(right) - Number(left))[0]?.[1] ?? 0;
}

function formatSchool(school: SpellSchool): string {
  const labels: Record<SpellSchool, string> = {
    abjuration: "Bannmagie",
    conjuration: "Beschwörung",
    divination: "Erkenntnismagie",
    enchantment: "Verzauberung",
    evocation: "Hervorrufung",
    illusion: "Illusion",
    necromancy: "Nekromantie",
    transmutation: "Verwandlung",
  };
  return labels[school];
}

