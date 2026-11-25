export type D20Mode = "normal" | "vorteil" | "nachteil";

export interface D20Result {
  label: string;
  dice: number[];
  kept: number;
  bonus: number;
  total: number;
  mode: D20Mode;
}

export function rollDie(sides: number, random: () => number = Math.random): number {
  if (!Number.isSafeInteger(sides) || sides < 1) throw new Error("Ungültiger Würfel.");
  return 1 + Math.floor(Math.max(0, Math.min(1 - Number.EPSILON, random())) * sides);
}

export function rollD20(label: string, bonus: number, mode: D20Mode = "normal", random: () => number = Math.random): D20Result {
  const dice = mode === "normal" ? [rollDie(20, random)] : [rollDie(20, random), rollDie(20, random)];
  const kept = mode === "vorteil" ? Math.max(...dice) : mode === "nachteil" ? Math.min(...dice) : dice[0];
  return { label, dice, kept, bonus, total: kept + bonus, mode };
}

/** The weapon catalog uses expressions such as `1W8 +2`; extra dice are doubled on a critical hit. */
export function rollWeaponDamage(expression: string, critical = false, random: () => number = Math.random) {
  const match = /^(\d+)\s*[WwDd]\s*(\d+)(?:\s*([+-])\s*(\d+))?$/.exec(expression.trim());
  if (!match) return null;
  const count = Number(match[1]) * (critical ? 2 : 1);
  const sides = Number(match[2]);
  if (!Number.isSafeInteger(count) || count > 30 || sides > 1000 || sides < 1) return null;
  const rolls = Array.from({ length: count }, () => rollDie(sides, random));
  const modifier = (match[3] === "-" ? -1 : 1) * Number(match[4] ?? 0);
  const total = Math.max(0, rolls.reduce((sum, value) => sum + value, 0) + modifier);
  return { rolls, modifier, total, critical };
}
