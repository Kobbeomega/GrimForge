import {
  getClassById,
  getSubclassSkillProficiencies,
} from "../compendium/classes";
import {
  getFeatAbilityChoices,
  getFeatById,
  type CharacterFeatChoices,
} from "../compendium/feats";

import type {
  AbilityId,
  AbilityScores,
} from "../compendium/core";

import type {
  SkillId,
} from "../compendium/skills";

import type { CharacterPathChoices } from "../compendium/classes";

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
  pathChoices?: CharacterPathChoices;
  level: number;
  abilityScores: AbilityScores;
  proficientSkillIds?: readonly SkillId[];
  expertiseSkillIds?: readonly SkillId[];
  baseSpeed: number;
  classMovementBonus?: number;
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
  featIds?: readonly string[];
  featChoices?: CharacterFeatChoices;
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

  for (const featId of input.featIds ?? []) {
    const feat = getFeatById(featId);
    if (feat?.grantsSavingThrowProficiency === "chosen-ability") {
      for (const abilityId of getFeatAbilityChoices(feat, input.featChoices)) {
        savingThrowProficiencies.add(abilityId);
      }
    }
  }

  const featBonuses = (input.featIds ?? [])
    .map((featId) => getFeatById(featId)?.bonuses)
    .filter(Boolean);
  const featInitiativeBonus = featBonuses.reduce((sum, bonus) => sum + (bonus?.initiative ?? 0), 0);
  const featPassivePerceptionBonus = featBonuses.reduce((sum, bonus) => sum + (bonus?.passivePerception ?? 0), 0);
  const featSpeedBonus = featBonuses.reduce((sum, bonus) => sum + (bonus?.speed ?? 0), 0);
  const featHitPointBonusPerLevel = featBonuses.reduce((sum, bonus) => sum + (bonus?.hitPointsPerLevel ?? 0), 0);

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

  const subclassSkillIds = getSubclassSkillProficiencies(input.classId, input.subclassId, level, input.pathChoices);

  const resolvedProficientSkillIds = [...new Set([
    ...(input.proficientSkillIds ?? []),
    ...subclassSkillIds,
  ])];

  const skillBonuses =
    calculateSkillBonuses({
      abilityScores:
        input.abilityScores,
      proficiencyBonus,
      proficientSkillIds:
        resolvedProficientSkillIds,
      expertiseSkillIds:
        input.expertiseSkillIds,
    });

  let armorClass =
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

  if (input.classId === "sorcerer" && input.subclassId === "draconic-bloodline" && level >= 1 && !input.armorClass?.armor) {
    const draconicArmorClass = 13 + abilityModifiers.dexterity + (input.armorClass?.shieldBonus ?? 0) + (input.armorClass?.flatBonus ?? 0);
    if (draconicArmorClass > armorClass.armorClass) {
      armorClass = {
        armorClass: draconicArmorClass,
        baseArmorClass: 13,
        dexterityContribution: abilityModifiers.dexterity,
        shieldContribution: input.armorClass?.shieldBonus ?? 0,
        flatContribution: input.armorClass?.flatBonus ?? 0,
        formula: "13 + GE (Drachenzähigkeit)",
      };
    }
  }

  const classFeatures =
    resolveCharacterClassFeatures({
      classId:
        input.classId,
      subclassId:
        input.subclassId,
      level,
      pathChoices: input.pathChoices,
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
          resolvedProficientSkillIds,
        expertiseSkillIds:
          input.expertiseSkillIds,
      }) + featPassivePerceptionBonus,
    initiativeModifier:
      calculateInitiativeModifier(input.abilityScores.dexterity) +
      featInitiativeBonus +
      (input.classId === "ranger" && input.subclassId === "gloom-stalker" && level >= 3
        ? abilityModifiers.wisdom
        : 0),
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
          (input.hitPointBonusPerLevel ?? 0) +
          featHitPointBonusPerLevel +
          (input.classId === "sorcerer" && input.subclassId === "draconic-bloodline" && level >= 1 ? 1 : 0),
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
        flatBonus:
          featSpeedBonus + (input.classMovementBonus ?? 0),
      }),
    spellcasting:
      calculateClassSpellcasting({
        classId:
          input.classId,
        subclassId:
          input.subclassId,
        level,
        abilityScores:
          input.abilityScores,
        proficiencyBonus,
      }),
    classFeatures,
    classResources,
  };
}


