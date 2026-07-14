/**
 * Die sechs grundlegenden Attribute eines Charakters.
 *
 * Im Code werden ausschließlich diese stabilen englischen IDs verwendet.
 * Die sichtbaren deutschen Bezeichnungen kommen aus abilityLabels.
 */
export const abilityIds = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

/**
 * Erzeugt den Typ:
 *
 * "strength"
 * | "dexterity"
 * | "constitution"
 * | "intelligence"
 * | "wisdom"
 * | "charisma"
 */
export type AbilityId = (typeof abilityIds)[number];

/**
 * Deutsche Anzeigenamen.
 */
export const abilityLabels: Record<AbilityId, string> = {
  strength: "Stärke",
  dexterity: "Geschicklichkeit",
  constitution: "Konstitution",
  intelligence: "Intelligenz",
  wisdom: "Weisheit",
  charisma: "Charisma",
};

/**
 * Kurze deutsche Bezeichnungen für kompakte Charakterbögen.
 */
export const abilityShortLabels: Record<AbilityId, string> = {
  strength: "ST",
  dexterity: "GE",
  constitution: "KO",
  intelligence: "IN",
  wisdom: "WE",
  charisma: "CH",
};

/**
 * Vollständiger Attributswerteblock eines Charakters.
 */
export type AbilityScores = Record<AbilityId, number>;

/**
 * Sinnvolle leere Standardwerte.
 *
 * Diese Werte sind noch keine endgültige Attributsverteilung,
 * sondern ein sicherer Ausgangspunkt für neue Charaktere.
 */
export const defaultAbilityScores: AbilityScores = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

/**
 * Berechnet den klassischen Attributsmodifikator.
 *
 * Beispiele:
 * 10 → 0
 * 12 → +1
 * 8  → -1
 * 18 → +4
 */
export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Formatiert einen Modifikator mit Vorzeichen.
 *
 * 3  → "+3"
 * 0  → "+0"
 * -1 → "-1"
 */
export function formatAbilityModifier(modifier: number): string {
  return modifier >= 0
    ? `+${modifier}`
    : String(modifier);
}

/**
 * Prüft zur Laufzeit, ob ein unbekannter Wert eine gültige AbilityId ist.
 * Das wird später beim JSON-Import nützlich.
 */
export function isAbilityId(value: unknown): value is AbilityId {
  return (
    typeof value === "string" &&
    abilityIds.includes(value as AbilityId)
  );
}