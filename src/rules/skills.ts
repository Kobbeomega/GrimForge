import {
  skills,
} from "../compendium/skills";

import type {
  AbilityId,
  AbilityScores,
} from "../compendium/core";

import type {
  SkillId,
} from "../compendium/skills";

import {
  calculateAbilityModifier,
} from "./abilities";

import {
  applyProficiency,
} from "./proficiency";

export interface SkillBonusEntry {
  id: SkillId;
  name: string;
  abilityId: AbilityId;
  proficient: boolean;
  expertise: boolean;
  bonus: number;
}

export function calculateSkillBonus({
  abilityScore,
  proficiencyBonus,
  proficient = false,
  expertise = false,
}: {
  abilityScore: number;
  proficiencyBonus: number;
  proficient?: boolean;
  expertise?: boolean;
}): number {
  return applyProficiency({
    baseModifier:
      calculateAbilityModifier(
        abilityScore,
      ),

    proficiencyBonus,
    proficient,
    expertise,
  });
}

export function calculateSkillBonuses({
  abilityScores,
  proficiencyBonus,
  proficientSkillIds = [],
  expertiseSkillIds = [],
}: {
  abilityScores: AbilityScores;
  proficiencyBonus: number;
  proficientSkillIds?: readonly SkillId[];
  expertiseSkillIds?: readonly SkillId[];
}): SkillBonusEntry[] {
  const proficientIds =
    new Set(proficientSkillIds);

  const expertiseIds =
    new Set(expertiseSkillIds);

  return skills.map(
    (skill) => {
      const expertise =
        expertiseIds.has(
          skill.id,
        );

      const proficient =
        expertise ||
        proficientIds.has(
          skill.id,
        );

      return {
        id: skill.id,
        name: skill.name,
        abilityId:
          skill.abilityId,
        proficient,
        expertise,

        bonus:
          calculateSkillBonus({
            abilityScore:
              abilityScores[
                skill.abilityId
              ],

            proficiencyBonus,
            proficient,
            expertise,
          }),
      };
    },
  );
}

export function calculatePassiveScore(
  bonus: number,
): number {
  return 10 + bonus;
}

export function calculatePassivePerception({
  abilityScores,
  proficiencyBonus,
  proficientSkillIds = [],
  expertiseSkillIds = [],
}: {
  abilityScores: AbilityScores;
  proficiencyBonus: number;
  proficientSkillIds?: readonly SkillId[];
  expertiseSkillIds?: readonly SkillId[];
}): number {
  const perception =
    calculateSkillBonuses({
      abilityScores,
      proficiencyBonus,
      proficientSkillIds,
      expertiseSkillIds,
    }).find(
      (skill) =>
        skill.id ===
        "perception",
    );

  return calculatePassiveScore(
    perception?.bonus ?? 0,
  );
}
