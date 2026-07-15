import {
  getAbilityModifier,
  getProficiencyBonus,
} from "../../../compendium/core";

import {
  getClassSpellcasting,
  getPactSpellSlotsForClassLevel,
  getSpellSlotsForClassLevel,
} from "../../../compendium/spells";

import type {
  AbilityId,
} from "../../../compendium/core";

import type {
  PactSpellSlots,
  SpellSlots,
} from "../../../compendium/spells";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

export interface SpellcastingStats {
  enabled: boolean;

  abilityId?: AbilityId;

  abilityModifier?: number;

  spellAttackBonus?: number;

  spellSaveDifficultyClass?: number;

  spellSlots: SpellSlots;

  pactSlots?: PactSpellSlots;

  ritualCasting: boolean;

  focusLabel?: string;
}

export function getSpellcastingStats(
  character: CharacterArchiveEntry,
): SpellcastingStats {
  const classId =
    character.classId;

  if (!classId) {
    return createEmptySpellcastingStats();
  }

  const definition =
    getClassSpellcasting(
      classId,
    );

  if (!definition) {
    return createEmptySpellcastingStats();
  }

  const abilityScore =
    character.abilityScores?.[
      definition.abilityId
    ] ?? 10;

  const abilityModifier =
    getAbilityModifier(
      abilityScore,
    );

  const proficiencyBonus =
    getProficiencyBonus(
      character.level,
    );

  const spellAttackBonus =
    abilityModifier +
    proficiencyBonus;

  const spellSaveDifficultyClass =
    8 +
    abilityModifier +
    proficiencyBonus;

  return {
    enabled: true,

    abilityId:
      definition.abilityId,

    abilityModifier,

    spellAttackBonus,

    spellSaveDifficultyClass,

    spellSlots:
      getSpellSlotsForClassLevel(
        classId,
        character.level,
      ),

    pactSlots:
      getPactSpellSlotsForClassLevel(
        classId,
        character.level,
      ) ?? undefined,

    ritualCasting:
      definition.ritualCasting,

    focusLabel:
      definition.focusLabel,
  };
}

function createEmptySpellcastingStats():
  SpellcastingStats {
  return {
    enabled: false,

    spellSlots: {},

    ritualCasting: false,
  };
}