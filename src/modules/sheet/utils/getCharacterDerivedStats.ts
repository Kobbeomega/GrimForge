import { getProficiencyBonus } from "../../../compendium/core";

import type {
  CharacterArchiveEntry,
  CharacterInventory,
} from "../../archives/types";
import { calculateCharacterRules } from "../../../rules";
import { createCharacterRuleInput } from "../rules/createCharacterRuleInput";

import {
  getPassiveScores,
} from "./getPassiveScores";

import {
  getSpellcastingStats,
} from "./getSpellcastingStats";

import {
  getEquippedWeaponAttacks,
} from "./getWeaponAttack";

import type {
  WeaponAttackSummary,
} from "./getWeaponAttack";

export interface CharacterDerivedStats {
  armorClass: number;
  speed: number;

  /**
   * Bleibt aus Kompatibilitätsgründen bestehen.
   * Der Wert entspricht passiveScores.perception.
   */
  passivePerception: number;

  passiveScores:
    ReturnType<
      typeof getPassiveScores
    >;

  proficiencyBonus: number;

  totalWeight: number;
  carryingCapacity: number;
  carryingPercentage: number;

  equippedWeapons:
    WeaponAttackSummary[];

  spellcasting:
    ReturnType<
      typeof getSpellcastingStats
    >;
}

export function getCharacterDerivedStats(
  character: CharacterArchiveEntry,
  inventory: CharacterInventory,
): CharacterDerivedStats {
  const strength =
    character.abilityScores
      ?.strength ?? 10;


  const proficiencyBonus =
    getProficiencyBonus(
      character.level,
    );

  const passiveScores =
    getPassiveScores(
      character,
    );

  /*
   * Dieser Einzelwert bleibt erhalten,
   * damit bestehende Komponenten weiterhin
   * derivedStats.passivePerception verwenden
   * können.
   */
  const passivePerception =
    passiveScores.perception;

  const rules = calculateCharacterRules(createCharacterRuleInput({ ...character, inventory }));

  const totalWeight =
    inventory.items.reduce(
      (
        sum,
        item,
      ) =>
        sum +
        item.weight *
          Math.max(
            0,
            item.quantity,
          ),
      0,
    );

  /*
   * Klassische D&D-Traglast:
   *
   * Stärke × 15 Pfund.
   *
   * Da das Inventar in Kilogramm arbeitet,
   * wird das Ergebnis anschließend umgerechnet.
   */
  const carryingCapacity =
    poundsToKilograms(
      Math.max(
        1,
        strength,
      ) * 15,
    );

  const carryingPercentage =
    carryingCapacity > 0
      ? Math.min(
          999,
          (
            totalWeight /
            carryingCapacity
          ) * 100,
        )
      : 0;

  const equippedWeapons =
    getEquippedWeaponAttacks(
      character,
      inventory,
    );

  const spellcasting =
    getSpellcastingStats(
      character,
    );

  return {
    armorClass: rules.armorClass.armorClass,
    speed: rules.speed,

    passivePerception,

    passiveScores,

    proficiencyBonus,

    totalWeight,
    carryingCapacity,
    carryingPercentage,

    equippedWeapons,

    spellcasting,
  };
}


function poundsToKilograms(
  pounds: number,
): number {
  return Number(
    (
      pounds *
      0.45359237
    ).toFixed(2),
  );
}
