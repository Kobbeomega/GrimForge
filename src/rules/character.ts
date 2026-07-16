import {
  getClassById,
} from "../compendium/classes";

import type {
  AbilityId,
  AbilityScores,
} from "../compendium/core";

import type {
  SkillId,
} from "../compendium/skills";

import {
  calculateAbilityModifiers,
  calculateInitiativeModifier,
  calculateSavingThrowBonus,
} from "./abilities";

import {
  calculateArmorClass,
} from "./armorClass";

import type {
  ArmorClassInput,
  ArmorClassResult,
} from "./armorClass";

import {
  resolveCharacterClassFeatures,
} from "./classFeatures";

import type {
  ResolvedClassFeature,
} from "./classFeatures";

import {
  resolveCharacterClassResources,
} from "./classResources";

import type {
  CharacterClassResource,
  CharacterClassResourceUsage,
} from "./classResources";

import {
  calculateMaximumHitPoints,
} from "./hitPoints";

import {
  calculateMovementSpeed,
} from "./movement";

import {
  calculateProficiencyBonus,
  normalizeCharacterLevel,
} from "./proficiency";

import {
  calculatePassivePerception,
  calculateSkillBonuses,
} from "./skills";

import type {
  SkillBonusEntry,
} from "./skills";

import {
  calculateClassSpellcasting,
} from "./spellcasting";

import type {
  SpellcastingRuleResult,
} from "./spellcasting";

export interface CharacterRuleInput {
  classId: string;
  subclassId?: string;
  level: number;
  abilityScores: AbilityScores;
  proficientSkillIds?: readonly SkillId[];
  expertiseSkillIds?: readonly SkillId[];
  baseSpeed: number;
  usesReducedSpeed?: boolean;
  armorClass?: Omit<
    ArmorClassInput,
    | "dexterity"
    | "constitution"
    | "wisdom"
    | "classId"
  >;
  hitPointFlatBonus?: number;
  hitPointBonusPerLevel?: number;
  spentClassResources?: CharacterClassResourceUsage;
}

export interface CalculatedCharacterRules {
  level: number;
  proficiencyBonus: number;
  abilityModifiers: Record<AbilityId, number>;
  savingThrows: Record<AbilityId, number>;
  skillBonuses: SkillBonusEntry[];
  passivePerception: number;
  initiativeModifier: number;
  maximumHitPoints: number;
  armorClass: ArmorClassResult;
  speed: number;
  spellcasting?: SpellcastingRuleResult;
  classFeatures: ResolvedClassFeature[];
  classResources: CharacterClassResource[];
}

export function calculateCharacterRules(
  input: CharacterRuleInput,
): CalculatedCharacterRules {
  const level =
    normalizeCharacterLevel(
      input.level,
    );

  const proficiencyBonus =
    calculateProficiencyBonus(
      level,
    );

  const abilityModifiers =
    calculateAbilityModifiers(
      input.abilityScores,
    );

  const classDefinition =
    getClassById(
      input.classId,
    );

  const savingThrowProficiencies =
    new Set<AbilityId>(
      classDefinition
        ?.savingThrows ??
        [],
    );

  const savingThrows =
    (
      Object.keys(
        input.abilityScores,
      ) as AbilityId[]
    ).reduce(
      (
        result,
        abilityId,
      ) => {
        result[abilityId] =
          calculateSavingThrowBonus({
            abilityScore:
              input
                .abilityScores[
                abilityId
              ],
            proficiencyBonus,
            proficient:
              savingThrowProficiencies
                .has(
                  abilityId,
                ),
          });

        return result;
      },
      {} as Record<
        AbilityId,
        number
      >,
    );

  const skillBonuses =
    calculateSkillBonuses({
      abilityScores:
        input.abilityScores,
      proficiencyBonus,
      proficientSkillIds:
        input.proficientSkillIds,
      expertiseSkillIds:
        input.expertiseSkillIds,
    });

  const armorClass =
    calculateArmorClass({
      dexterity:
        input.abilityScores
          .dexterity,
      constitution:
        input.abilityScores
          .constitution,
      wisdom:
        input.abilityScores
          .wisdom,
      classId:
        input.classId,
      ...input.armorClass,
    });

  const classFeatures =
    resolveCharacterClassFeatures({
      classId:
        input.classId,
      subclassId:
        input.subclassId,
      level,
    });

  const classResources =
    resolveCharacterClassResources({
      classId:
        input.classId,
      subclassId:
        input.subclassId,
      level,
      abilityScores:
        input.abilityScores,
      spentByResourceId:
        input
          .spentClassResources ??
        {},
    });

  return {
    level,
    proficiencyBonus,
    abilityModifiers,
    savingThrows,
    skillBonuses,
    passivePerception:
      calculatePassivePerception({
        abilityScores:
          input.abilityScores,
        proficiencyBonus,
        proficientSkillIds:
          input.proficientSkillIds,
        expertiseSkillIds:
          input.expertiseSkillIds,
      }),
    initiativeModifier:
      calculateInitiativeModifier(
        input.abilityScores
          .dexterity,
      ),
    maximumHitPoints:
      calculateMaximumHitPoints({
        classId:
          input.classId,
        level,
        constitution:
          input.abilityScores
            .constitution,
        flatBonus:
          input
            .hitPointFlatBonus ??
          0,
        bonusPerLevel:
          input
            .hitPointBonusPerLevel ??
          0,
      }),
    armorClass,
    speed:
      calculateMovementSpeed({
        baseSpeed:
          input.baseSpeed,
        usesReducedSpeed:
          input
            .usesReducedSpeed ??
          false,
      }),
    spellcasting:
      calculateClassSpellcasting({
        classId:
          input.classId,
        level,
        abilityScores:
          input.abilityScores,
        proficiencyBonus,
      }),
    classFeatures,
    classResources,
  };
}
