import {
  getEquipmentById,
} from "../compendium/equipment";

import type {
  ArmorItem,
  EquipmentDefinition,
  WeaponItem,
} from "../compendium/equipment";

import type {
  CharacterInventory,
} from "../modules/archives/types";

export interface ResolvedEquipment {
  armor?: ArmorItem;
  shield?: ArmorItem;
  weapons: WeaponItem[];
  definitions: EquipmentDefinition[];
  totalWeight: number;
}

export function resolveCharacterEquipment(
  inventory: CharacterInventory,
): ResolvedEquipment {
  const equippedDefinitions =
    inventory.items.flatMap((item) => {
      if (!item.equipped || item.quantity <= 0) {
        return [];
      }

      const definition =
        getEquipmentById(item.id);

      return definition
        ? [definition]
        : [];
    });

  return {
    armor: equippedDefinitions.find(
      (item): item is ArmorItem =>
        item.category === "armor",
    ),
    shield: equippedDefinitions.find(
      (item): item is ArmorItem =>
        item.category === "shield",
    ),
    weapons: equippedDefinitions.filter(
      (item): item is WeaponItem =>
        item.category === "weapon",
    ),
    definitions: equippedDefinitions,
    totalWeight: inventory.items.reduce(
      (sum, item) =>
        sum + item.weight * Math.max(0, item.quantity),
      0,
    ),
  };
}
