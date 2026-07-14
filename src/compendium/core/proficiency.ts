/**
 * Berechnet den Übungsbonus eines Charakters.
 *
 * Stufe 1–4:   +2
 * Stufe 5–8:   +3
 * Stufe 9–12:  +4
 * Stufe 13–16: +5
 * Stufe 17–20: +6
 */
export function getProficiencyBonus(
  level: number,
): number {
  const normalizedLevel = Math.max(
    1,
    Math.min(
      20,
      Math.floor(
        Number.isFinite(level)
          ? level
          : 1,
      ),
    ),
  );

  return (
    2 +
    Math.floor(
      (normalizedLevel - 1) / 4,
    )
  );
}

/**
 * Berechnet einen vollständigen Fertigkeitsbonus.
 *
 * Ohne Übung:
 * Attributsmodifikator
 *
 * Mit Übung:
 * Attributsmodifikator + Übungsbonus
 *
 * Mit Expertise:
 * Attributsmodifikator + doppelter Übungsbonus
 */
export function getSkillBonus({
  abilityModifier,
  proficiencyBonus,
  proficient,
  expertise = false,
}: {
  abilityModifier: number;
  proficiencyBonus: number;
  proficient: boolean;
  expertise?: boolean;
}): number {
  if (!proficient) {
    return abilityModifier;
  }

  return (
    abilityModifier +
    proficiencyBonus *
      (expertise ? 2 : 1)
  );
}