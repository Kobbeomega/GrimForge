import {
  getClassSpellcastingAbility,
  getClassSpellcastingRules,
} from "../compendium/classes";

import type {
  AbilityId,
  AbilityScores,
} from "../compendium/core";

import {
  calculateAbilityModifier,
} from "./abilities";

export interface SpellcastingRuleResult {
  abilityId: AbilityId;
  abilityModifier: number;
  saveDifficultyClass: number;
  attackBonus: number;
  ritualCasting: boolean;
  startsAtLevel: number;
}

export function calculateSpellSaveDifficultyClass({
  abilityScore,
  proficiencyBonus,
}: {
  abilityScore: number;
  proficiencyBonus: number;
}): number {
  return (
    8 +
    proficiencyBonus +
    calculateAbilityModifier(
      abilityScore,
    )
  );
}

export function calculateSpellAttackBonus({
  abilityScore,
  proficiencyBonus,
}: {
  abilityScore: number;
  proficiencyBonus: number;
}): number {
  return (
    proficiencyBonus +
    calculateAbilityModifier(
      abilityScore,
    )
  );
}

export function calculateClassSpellcasting({
  classId,
  level,
  abilityScores,
  proficiencyBonus,
}: {
  classId: string;
  level: number;
  abilityScores: AbilityScores;
  proficiencyBonus: number;
}): SpellcastingRuleResult | undefined {
  const rules =
    getClassSpellcastingRules(
      classId,
    );

  const abilityId =
    getClassSpellcastingAbility(
      classId,
    );

  if (
    !rules ||
    !abilityId ||
    level <
      rules.startsAtLevel
  ) {
    return undefined;
  }

  const abilityScore =
    abilityScores[abilityId];

  const abilityModifier =
    calculateAbilityModifier(
      abilityScore,
    );

  return {
    abilityId,
    abilityModifier,

    saveDifficultyClass:
      calculateSpellSaveDifficultyClass({
        abilityScore,
        proficiencyBonus,
      }),

    attackBonus:
      calculateSpellAttackBonus({
        abilityScore,
        proficiencyBonus,
      }),

    ritualCasting:
      rules.ritualCasting ??
      false,

    startsAtLevel:
      rules.startsAtLevel,
  };
}
