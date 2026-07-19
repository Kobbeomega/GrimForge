import {
  abilityIds,
  type AbilityId,
  type AbilityScores,
} from "../core";

import {
  getAncestryById,
  type CharacterAncestry,
} from "./ancestries";

export type AbilityBonusMap = Partial<Record<AbilityId, number>>;

export interface ResolvedAncestryAbilityBonuses {
  fixed: AbilityBonusMap;
  chosen: AbilityBonusMap;
  total: AbilityBonusMap;
}

export function getAncestryAbilityBonuses({
  ancestryId,
  variantId,
  choices = [],
}: {
  ancestryId?: string;
  variantId?: string;
  choices?: readonly AbilityId[];
}): ResolvedAncestryAbilityBonuses {
  const ancestry = getAncestryById(ancestryId ?? "");

  if (!ancestry) {
    return { fixed: {}, chosen: {}, total: {} };
  }

  const variant = ancestry.variants.find((entry) => entry.id === variantId);
  const fixed = mergeAbilityBonusMaps(
    ancestry.abilityBonuses,
    variant?.abilityBonuses,
  );
  const chosen = resolveAbilityChoices(ancestry, choices, fixed);

  return {
    fixed,
    chosen,
    total: mergeAbilityBonusMaps(fixed, chosen),
  };
}

export function applyAbilityBonuses(
  baseScores: AbilityScores,
  bonuses: AbilityBonusMap,
): AbilityScores {
  return abilityIds.reduce(
    (result, abilityId) => {
      result[abilityId] = baseScores[abilityId] + (bonuses[abilityId] ?? 0);
      return result;
    },
    { ...baseScores },
  );
}

export function mergeAbilityBonusMaps(
  ...maps: Array<AbilityBonusMap | undefined>
): AbilityBonusMap {
  return maps.reduce<AbilityBonusMap>((result, map) => {
    abilityIds.forEach((abilityId) => {
      const value = map?.[abilityId] ?? 0;
      if (value !== 0) {
        result[abilityId] = (result[abilityId] ?? 0) + value;
      }
    });
    return result;
  }, {});
}

function resolveAbilityChoices(
  ancestry: CharacterAncestry,
  choices: readonly AbilityId[],
  fixed: AbilityBonusMap,
): AbilityBonusMap {
  const choiceRule = ancestry.abilityBonusChoice;

  if (!choiceRule) {
    return {};
  }

  const excluded = new Set(choiceRule.exclude ?? []);
  const valid = Array.from(new Set(choices)).filter(
    (abilityId) =>
      abilityIds.includes(abilityId) &&
      !excluded.has(abilityId) &&
      (fixed[abilityId] ?? 0) === 0,
  );

  return valid.slice(0, choiceRule.choose).reduce<AbilityBonusMap>(
    (result, abilityId) => {
      result[abilityId] = choiceRule.bonus;
      return result;
    },
    {},
  );
}
