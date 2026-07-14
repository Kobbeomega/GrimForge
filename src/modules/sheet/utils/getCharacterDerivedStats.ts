import {
  getAbilityModifier,
  getProficiencyBonus,
  getSkillBonus,
} from "../../../compendium/core";

import {
  getEquipmentById,
} from "../../../compendium/equipment";

import type {
  ArmorItem,
  WeaponItem,
} from "../../../compendium/equipment";

import type {
  CharacterArchiveEntry,
  CharacterInventory,
} from "../../archives/types";

export interface EquippedWeaponSummary {
  id: string;
  name: string;

  damage: string;
  damageType: string;

  versatileDamage?: string;

  properties: string[];

  quantity: number;
}

export interface CharacterDerivedStats {
  armorClass: number;

  passivePerception: number;

  proficiencyBonus: number;

  totalWeight: number;
  carryingCapacity: number;
  carryingPercentage: number;

  equippedWeapons: EquippedWeaponSummary[];
}

const damageTypeLabels = {
  slashing: "Hieb",
  piercing: "Stich",
  bludgeoning: "Wucht",
} as const;

const weaponPropertyLabels = {
  light: "Leicht",
  heavy: "Schwer",
  finesse: "Finesse",
  "two-handed": "Zweihändig",
  versatile: "Vielseitig",
  reach: "Reichweite",
  thrown: "Geworfen",
  loading: "Laden",
  ammunition: "Munition",
} as const;

export function getCharacterDerivedStats(
  character: CharacterArchiveEntry,
  inventory: CharacterInventory,
): CharacterDerivedStats {
  const strength =
    character.abilityScores?.strength ?? 10;

  const dexterity =
    character.abilityScores?.dexterity ?? 10;

  const wisdom =
    character.abilityScores?.wisdom ?? 10;

  const dexterityModifier =
    getAbilityModifier(dexterity);

  const wisdomModifier =
    getAbilityModifier(wisdom);

  const proficiencyBonus =
    getProficiencyBonus(character.level);

  const perceptionProficient =
    character.skillProficiencies?.includes(
      "perception",
    ) ?? false;

  const perceptionExpertise =
    character.skillExpertise?.includes(
      "perception",
    ) ?? false;

  const passivePerception =
    10 +
    getSkillBonus({
      abilityModifier: wisdomModifier,
      proficiencyBonus,
      proficient: perceptionProficient,
      expertise: perceptionExpertise,
    });

  const armorClass =
    calculateArmorClass(
      inventory,
      dexterityModifier,
    );

  const totalWeight =
    inventory.items.reduce(
      (sum, item) =>
        sum +
        item.weight *
          Math.max(0, item.quantity),
      0,
    );

  /*
   * D&D-Traglast:
   * Stärke × 15 lb.
   *
   * Dein Inventar speichert Gewicht in kg,
   * daher erfolgt hier die Umrechnung.
   */
  const carryingCapacity =
    poundsToKilograms(
      Math.max(1, strength) * 15,
    );

  const carryingPercentage =
    carryingCapacity > 0
      ? Math.min(
          999,
          (totalWeight /
            carryingCapacity) *
            100,
        )
      : 0;

  const equippedWeapons =
    inventory.items.flatMap(
      (inventoryItem) => {
        if (
          !inventoryItem.equipped ||
          inventoryItem.category !==
            "weapon"
        ) {
          return [];
        }

        const definition =
          getEquipmentById(
            inventoryItem.id,
          );

        if (
          !definition ||
          definition.category !==
            "weapon"
        ) {
          return [];
        }

        return [
          createWeaponSummary(
            definition,
            inventoryItem.quantity,
          ),
        ];
      },
    );

  return {
    armorClass,
    passivePerception,
    proficiencyBonus,
    totalWeight,
    carryingCapacity,
    carryingPercentage,
    equippedWeapons,
  };
}

function calculateArmorClass(
  inventory: CharacterInventory,
  dexterityModifier: number,
): number {
  const equippedDefinitions =
    inventory.items.flatMap(
      (inventoryItem) => {
        if (
          !inventoryItem.equipped ||
          inventoryItem.category !==
            "armor"
        ) {
          return [];
        }

        const definition =
          getEquipmentById(
            inventoryItem.id,
          );

        if (
          !definition ||
          (
            definition.category !==
              "armor" &&
            definition.category !==
              "shield"
          )
        ) {
          return [];
        }

        return [definition];
      },
    );

  const equippedArmor =
    equippedDefinitions.find(
      (definition) =>
        definition.category === "armor",
    );

  const equippedShields =
    equippedDefinitions.filter(
      (definition) =>
        definition.category === "shield",
    );

  const baseArmorClass =
    equippedArmor
      ? getArmorClassFromArmor(
          equippedArmor,
          dexterityModifier,
        )
      : 10 + dexterityModifier;

  const shieldBonus =
    equippedShields.reduce(
      (sum, shield) =>
        sum + shield.armorClass,
      0,
    );

  return Math.max(
    0,
    baseArmorClass + shieldBonus,
  );
}

function getArmorClassFromArmor(
  armor: ArmorItem,
  dexterityModifier: number,
): number {
  if (!armor.dexterityModifier) {
    return armor.armorClass;
  }

  const dexterityBonus =
    typeof armor.maximumDexterityBonus ===
    "number"
      ? Math.min(
          dexterityModifier,
          armor.maximumDexterityBonus,
        )
      : dexterityModifier;

  return (
    armor.armorClass +
    dexterityBonus
  );
}

function createWeaponSummary(
  weapon: WeaponItem,
  quantity: number,
): EquippedWeaponSummary {
  return {
    id: weapon.id,
    name: weapon.name,

    damage:
      `${weapon.damage.dice}W` +
      `${weapon.damage.die}`,

    damageType:
      damageTypeLabels[
        weapon.damage.type
      ],

    versatileDamage:
      weapon.versatile
        ? `${weapon.versatile.dice}W${weapon.versatile.die}`
        : undefined,

    properties:
      weapon.properties.map(
        (property) =>
          weaponPropertyLabels[
            property
          ],
      ),

    quantity,
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