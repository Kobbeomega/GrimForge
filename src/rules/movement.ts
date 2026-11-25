export interface MovementInput {
  baseSpeed: number;

  usesReducedSpeed?: boolean;
  reducedSpeed?: number;

  flatBonus?: number;
  multiplier?: number;

  minimumSpeed?: number;
}

export function calculateMovementSpeed({
  baseSpeed,
  usesReducedSpeed = false,
  reducedSpeed = 7.5,
  flatBonus = 0,
  multiplier = 1,
  minimumSpeed = 0,
}: MovementInput): number {
  const effectiveBaseSpeed =
    usesReducedSpeed
      ? reducedSpeed
      : baseSpeed;

  const speed =
    (
      effectiveBaseSpeed +
      flatBonus
    ) *
    multiplier;

  return Math.max(
    minimumSpeed,
    Number(
      speed.toFixed(2),
    ),
  );
}

export function getClassMovementBonus(classId: string, level: number, armor: "none" | "shield" | "armor" | "heavy"): number {
  if (classId === "barbarian" && level >= 5 && armor !== "heavy") return 3;
  if (classId === "monk" && level >= 2 && armor === "none") return Math.min(9, 3 + 1.5 * Math.floor((level - 2) / 4));
  return 0;
}

export function feetToMeters(
  feet: number,
): number {
  return Number(
    (
      feet *
      0.3048
    ).toFixed(2),
  );
}

export function metersToFeet(
  meters: number,
): number {
  return Number(
    (
      meters /
      0.3048
    ).toFixed(0),
  );
}
