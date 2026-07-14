import type {
  ArmorItem,
  EquipmentDefinition,
  GearItem,
  WeaponItem,
} from "./types";

export const weapons: WeaponItem[] = [
  {
    id: "longsword",
    name: "Langschwert",
    category: "weapon",
    weaponCategory: "martial",

    damage: {
      dice: 1,
      die: 8,
      type: "slashing",
    },

    versatile: {
      dice: 1,
      die: 10,
      type: "slashing",
    },

    properties: ["versatile"],

    weight: 3,
    price: 15,
  },

  {
    id: "battleaxe",
    name: "Streitaxt",
    category: "weapon",
    weaponCategory: "martial",

    damage: {
      dice: 1,
      die: 8,
      type: "slashing",
    },

    versatile: {
      dice: 1,
      die: 10,
      type: "slashing",
    },

    properties: ["versatile"],

    weight: 4,
    price: 10,
  },

  {
    id: "warhammer",
    name: "Kriegshammer",
    category: "weapon",
    weaponCategory: "martial",

    damage: {
      dice: 1,
      die: 8,
      type: "bludgeoning",
    },

    versatile: {
      dice: 1,
      die: 10,
      type: "bludgeoning",
    },

    properties: ["versatile"],

    weight: 2,
    price: 15,
  },
];

export const armor: ArmorItem[] = [
  {
    id: "shield",
    name: "Schild",

    category: "shield",

    armorClass: 2,

    dexterityModifier: false,

    weight: 6,

    price: 10,
  },

  {
    id: "chain-mail",
    name: "Kettenhemd",

    category: "armor",

    armorClass: 16,

    dexterityModifier: false,

    strengthRequirement: 13,

    weight: 55,

    price: 75,
  },

  {
    id: "leather",

    name: "Lederrüstung",

    category: "armor",

    armorClass: 11,

    dexterityModifier: true,

    weight: 10,

    price: 10,
  },
];

export const gear: GearItem[] = [
  {
    id: "backpack",

    name: "Rucksack",

    category: "gear",

    weight: 5,

    price: 2,
  },

  {
    id: "bedroll",

    name: "Schlafsack",

    category: "gear",

    weight: 7,

    price: 1,
  },

  {
    id: "rope",

    name: "Hanfseil (50 ft)",

    category: "gear",

    weight: 10,

    price: 1,
  },

  {
    id: "torch",

    name: "Fackel",

    category: "consumable",

    weight: 1,

    price: 0.01,
  },

  {
    id: "ration",

    name: "Rationen",

    category: "consumable",

    weight: 2,

    price: 0.5,
  },

  {
    id: "waterskin",

    name: "Wasserschlauch",

    category: "gear",

    weight: 5,

    price: 0.2,
  },
];

export const equipment: EquipmentDefinition[] = [
  ...weapons,
  ...armor,
  ...gear,
];

export function getEquipmentById(id: string) {
  return equipment.find(
    (entry) => entry.id === id,
  );
}