export function normalizeCharacterLevel(
  level: number,
): number {
  if (!Number.isFinite(level)) {
    return 1;
  }

  return Math.max(
    1,
    Math.min(
      20,
      Math.floor(level),
    ),
  );
}

export function calculateProficiencyBonus(
  level: number,
): number {
  const safeLevel =
    normalizeCharacterLevel(level);

  return (
    2 +
    Math.floor(
      (
        safeLevel -
        1
      ) / 4,
    )
  );
}

export function applyProficiency({
  baseModifier,
  proficiencyBonus,
  proficient = false,
  expertise = false,
}: {
  baseModifier: number;
  proficiencyBonus: number;
  proficient?: boolean;
  expertise?: boolean;
}): number {
  if (expertise) {
    return (
      baseModifier +
      proficiencyBonus * 2
    );
  }

  if (proficient) {
    return (
      baseModifier +
      proficiencyBonus
    );
  }

  return baseModifier;
}
