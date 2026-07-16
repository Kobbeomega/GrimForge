export interface CarryingCapacityResult {
  capacity: number;
  carriedWeight: number;
  remaining: number;
  percentage: number;
  encumbered: boolean;
}

export function calculateCarryingCapacity({
  strength,
  carriedWeight,
}: {
  strength: number;
  carriedWeight: number;
}): CarryingCapacityResult {
  const capacity =
    Math.max(1, strength) * 15 * 0.45359237;

  return {
    capacity,
    carriedWeight,
    remaining: Math.max(0, capacity - carriedWeight),
    percentage: capacity > 0
      ? (carriedWeight / capacity) * 100
      : 0,
    encumbered: carriedWeight > capacity,
  };
}
