import type {
  AbilityId,
  AbilityScores,
} from "../compendium/core";

export const abilityIds: AbilityId[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export function normalizeAbilityScore(
  score: number,
): number {
  if (!Number.isFinite(score)) {
    return 10;
  }

  return Math.max(
    1,
    Math.floor(score),
  );
}

export function calculateAbilityModifier(
  score: number,
): number {
  return Math.floor(
    (
      normalizeAbilityScore(score) -
      10
    ) / 2,
  );
}

export function calculateAbilityModifiers(
  abilityScores: AbilityScores,
): Record<AbilityId, number> {
  return abilityIds.reduce(
    (
      modifiers,
      abilityId,
    ) => ({
      ...modifiers,

      [abilityId]:
        calculateAbilityModifier(
          abilityScores[abilityId],
        ),
    }),

    {} as Record<
      AbilityId,
      number
    >,
  );
}

export function calculateSavingThrowBonus({
  abilityScore,
  proficiencyBonus,
  proficient,
}: {
  abilityScore: number;
  proficiencyBonus: number;
  proficient: boolean;
}): number {
  return (
    calculateAbilityModifier(
      abilityScore,
    ) +
    (
      proficient
        ? proficiencyBonus
        : 0
    )
  );
}

export function calculateInitiativeModifier(
  dexterity: number,
): number {
  return calculateAbilityModifier(
    dexterity,
  );
}

export function formatModifier(
  modifier: number,
): string {
  return modifier >= 0
    ? `+${modifier}`
    : String(modifier);
}
