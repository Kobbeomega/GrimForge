import {
  getCharacterClassFeatures,
  getClassSpellcastingAbility,
  resolveClassResourceAmount,
} from "../compendium/classes";

import type {
  AbilityScores,
} from "../compendium/core";

import {
  calculateAbilityModifier,
} from "./abilities";

import {
  calculateProficiencyBonus,
} from "./proficiency";

export interface CharacterClassResource {
  id: string;
  name: string;
  maximum: number;
  spent: number;
  remaining: number;
  recharge: "turn" | "short-rest" | "long-rest";
  featureId: string;
}

export type CharacterClassResourceUsage =
  Record<string, number>;

export function resolveCharacterClassResources({
  classId,
  subclassId,
  level,
  abilityScores,
  spentByResourceId = {},
}: {
  classId: string;
  subclassId?: string;
  level: number;
  abilityScores: AbilityScores;
  spentByResourceId?: CharacterClassResourceUsage;
}): CharacterClassResource[] {
  const proficiencyBonus =
    calculateProficiencyBonus(level);

  const classAbilityId =
    getClassSpellcastingAbility(classId);

  const abilityModifier =
    classAbilityId
      ? calculateAbilityModifier(
          abilityScores[classAbilityId],
        )
      : 0;

  return getCharacterClassFeatures({
    classId,
    subclassId,
    level,
  })
    .filter((feature) => Boolean(feature.resource))
    .map((feature) => {
      const resource = feature.resource!;

      const maximum =
        resolveClassResourceAmount({
          amount: resource.amount,
          classLevel: level,
          proficiencyBonus,
          abilityModifier,
        });

      const spent = clampResourceUsage(
        spentByResourceId[resource.id] ?? 0,
        maximum,
      );

      return {
        id: resource.id,
        name: resource.name,
        maximum,
        spent,
        remaining: Math.max(0, maximum - spent),
        recharge: resource.recharge,
        featureId: feature.id,
      };
    });
}

export function spendClassResource({
  usage,
  resourceId,
  amount = 1,
  maximum,
}: {
  usage: CharacterClassResourceUsage;
  resourceId: string;
  amount?: number;
  maximum: number;
}): CharacterClassResourceUsage {
  return {
    ...usage,
    [resourceId]: clampResourceUsage(
      (usage[resourceId] ?? 0) + amount,
      maximum,
    ),
  };
}

export function restoreClassResource({
  usage,
  resourceId,
  amount = 1,
}: {
  usage: CharacterClassResourceUsage;
  resourceId: string;
  amount?: number;
}): CharacterClassResourceUsage {
  const next = Math.max(
    0,
    (usage[resourceId] ?? 0) - amount,
  );

  if (next === 0) {
    const {
      [resourceId]: _removed,
      ...remainingUsage
    } = usage;

    return remainingUsage;
  }

  return {
    ...usage,
    [resourceId]: next,
  };
}

export function restoreClassResourcesByRest({
  resources,
  rest,
}: {
  resources: CharacterClassResource[];
  rest: "turn" | "short-rest" | "long-rest";
}): CharacterClassResourceUsage {
  const usage: CharacterClassResourceUsage = {};

  for (const resource of resources) {
    const restored =
      rest === "long-rest" ||
      (rest === "short-rest" &&
        resource.recharge !== "long-rest") ||
      (rest === "turn" &&
        resource.recharge === "turn");

    if (!restored && resource.spent > 0) {
      usage[resource.id] = resource.spent;
    }
  }

  return usage;
}

function clampResourceUsage(
  spent: number,
  maximum: number,
): number {
  if (!Number.isFinite(spent)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(maximum, Math.floor(spent)),
  );
}
