import type {
  AbilityId,
  AbilityScores,
} from "../compendium/core";

import {
  formatAbilityModifier,
  getAbilityModifier,
} from "../compendium/core";

import type {
  WeaponItem,
} from "../compendium/equipment";

export interface WeaponAttackCalculationInput {
  weapon: WeaponItem;
  abilityScores: AbilityScores;
  proficiencyBonus: number;
  proficient: boolean;
}

export interface CalculatedWeaponAttack {
  abilityId: AbilityId;
  abilityModifier: number;
  attackBonus: number;
  attackBonusLabel: string;
  damage: string;
  versatileDamage?: string;
}

export function calculateWeaponAttack({
  weapon,
  abilityScores,
  proficiencyBonus,
  proficient,
}: WeaponAttackCalculationInput): CalculatedWeaponAttack {
  const abilityId = getWeaponAbility(
    weapon,
    abilityScores,
  );

  const abilityModifier =
    getAbilityModifier(
      abilityScores[abilityId],
    );

  const attackBonus =
    abilityModifier +
    (proficient
      ? proficiencyBonus
      : 0);

  return {
    abilityId,
    abilityModifier,
    attackBonus,
    attackBonusLabel:
      formatAbilityModifier(
        attackBonus,
      ),
    damage: formatDamage(
      weapon.damage.dice,
      weapon.damage.die,
      abilityModifier,
    ),
    versatileDamage:
      weapon.versatile
        ? formatDamage(
            weapon.versatile.dice,
            weapon.versatile.die,
            abilityModifier,
          )
        : undefined,
  };
}

export function getWeaponAbility(
  weapon: WeaponItem,
  abilityScores: AbilityScores,
): AbilityId {
  if (
    weapon.properties.includes(
      "ammunition",
    )
  ) {
    return "dexterity";
  }

  if (
    weapon.properties.includes(
      "finesse",
    )
  ) {
    return abilityScores.dexterity >
      abilityScores.strength
      ? "dexterity"
      : "strength";
  }

  return "strength";
}

export function formatDamage(
  dice: number,
  die: number,
  modifier: number,
): string {
  const base = `${dice}W${die}`;

  if (modifier === 0) {
    return base;
  }

  return modifier > 0
    ? `${base} +${modifier}`
    : `${base} ${modifier}`;
}
