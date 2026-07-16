import {
  getClassById,
} from "../compendium/classes";

import {
  calculateAbilityModifier,
} from "./abilities";

import {
  normalizeCharacterLevel,
} from "./proficiency";

export type HitPointProgressionMode =
  | "average"
  | "maximum";

export function calculateFirstLevelHitPoints({
  hitDie,
  constitution,
}: {
  hitDie: number;
  constitution: number;
}): number {
  return Math.max(
    1,
    hitDie +
      calculateAbilityModifier(
        constitution,
      ),
  );
}

export function calculateHitPointsPerAdditionalLevel({
  hitDie,
  constitution,
  mode = "average",
}: {
  hitDie: number;
  constitution: number;
  mode?: HitPointProgressionMode;
}): number {
  const dieContribution =
    mode === "maximum"
      ? hitDie
      : Math.floor(
          hitDie / 2,
        ) + 1;

  return Math.max(
    1,
    dieContribution +
      calculateAbilityModifier(
        constitution,
      ),
  );
}

export function calculateMaximumHitPoints({
  classId,
  level,
  constitution,
  mode = "average",
  flatBonus = 0,
  bonusPerLevel = 0,
}: {
  classId: string;
  level: number;
  constitution: number;
  mode?: HitPointProgressionMode;
  flatBonus?: number;
  bonusPerLevel?: number;
}): number {
  const classDefinition =
    getClassById(
      classId,
    );

  if (!classDefinition) {
    return 0;
  }

  const safeLevel =
    normalizeCharacterLevel(
      level,
    );

  const firstLevel =
    calculateFirstLevelHitPoints({
      hitDie:
        classDefinition.hitDie,

      constitution,
    });

  const laterLevels =
    Math.max(
      0,
      safeLevel - 1,
    ) *
    calculateHitPointsPerAdditionalLevel({
      hitDie:
        classDefinition.hitDie,

      constitution,
      mode,
    });

  return Math.max(
    1,

    firstLevel +
      laterLevels +
      flatBonus +
      bonusPerLevel *
        safeLevel,
  );
}
