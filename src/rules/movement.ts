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
