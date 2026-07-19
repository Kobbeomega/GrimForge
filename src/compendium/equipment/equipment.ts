import { sourceWeapons2014 } from "../../content/phase1/weapons2014";
import { sourceArmor2014 } from "../../content/phase1/armor2014";

import type {
  ArmorItem,
  EquipmentDefinition,
  GearItem,
  WeaponItem,
} from "./types";

const curatedWeapons: WeaponItem[] = [
  {
    id: "club",
    name: "Keule",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 4,
      type: "bludgeoning",
    },
    properties: ["light"],
    weight: 2,
    price: 0.1,
  },
  {
    id: "dagger",
    name: "Dolch",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 4,
      type: "piercing",
    },
    range: {
      normal: 20,
      long: 60,
    },
    properties: [
      "finesse",
      "light",
      "thrown",
    ],
    weight: 1,
    price: 2,
  },
  {
    id: "dart",
    name: "Wurfpfeil",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 4,
      type: "piercing",
    },
    range: {
      normal: 20,
      long: 60,
    },
    properties: [
      "finesse",
      "thrown",
    ],
    weight: 0.25,
    price: 0.05,
  },
  {
    id: "greatclub",
    name: "Zweihändige Keule",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 8,
      type: "bludgeoning",
    },
    properties: ["two-handed"],
    weight: 10,
    price: 0.2,
  },
  {
    id: "handaxe",
    name: "Handaxt",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 6,
      type: "slashing",
    },
    range: {
      normal: 20,
      long: 60,
    },
    properties: [
      "light",
      "thrown",
    ],
    weight: 2,
    price: 5,
  },
  {
    id: "javelin",
    name: "Wurfspeer",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 6,
      type: "piercing",
    },
    range: {
      normal: 30,
      long: 120,
    },
    properties: ["thrown"],
    weight: 2,
    price: 0.5,
  },
  {
    id: "mace",
    name: "Streitkolben",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 6,
      type: "bludgeoning",
    },
    properties: [],
    weight: 4,
    price: 5,
  },
  {
    id: "quarterstaff",
    name: "Kampfstab",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 6,
      type: "bludgeoning",
    },
    versatile: {
      dice: 1,
      die: 8,
      type: "bludgeoning",
    },
    properties: ["versatile"],
    weight: 4,
    price: 0.2,
  },
  {
    id: "spear",
    name: "Speer",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 6,
      type: "piercing",
    },
    versatile: {
      dice: 1,
      die: 8,
      type: "piercing",
    },
    range: {
      normal: 20,
      long: 60,
    },
    properties: [
      "thrown",
      "versatile",
    ],
    weight: 3,
    price: 1,
  },
  {
    id: "light-crossbow",
    name: "Leichte Armbrust",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 8,
      type: "piercing",
    },
    range: {
      normal: 80,
      long: 320,
    },
    properties: [
      "ammunition",
      "loading",
      "two-handed",
    ],
    weight: 5,
    price: 25,
  },
  {
    id: "shortbow",
    name: "Kurzbogen",
    category: "weapon",
    weaponCategory: "simple",
    damage: {
      dice: 1,
      die: 6,
      type: "piercing",
    },
    range: {
      normal: 80,
      long: 320,
    },
    properties: [
      "ammunition",
      "two-handed",
    ],
    weight: 2,
    price: 25,
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
    id: "greataxe",
    name: "Große Axt",
    category: "weapon",
    weaponCategory: "martial",
    damage: {
      dice: 1,
      die: 12,
      type: "slashing",
    },
    properties: [
      "heavy",
      "two-handed",
    ],
    weight: 7,
    price: 30,
  },
  {
    id: "greatsword",
    name: "Großschwert",
    category: "weapon",
    weaponCategory: "martial",
    damage: {
      dice: 2,
      die: 6,
      type: "slashing",
    },
    properties: [
      "heavy",
      "two-handed",
    ],
    weight: 6,
    price: 50,
  },
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
    id: "rapier",
    name: "Rapier",
    category: "weapon",
    weaponCategory: "martial",
    damage: {
      dice: 1,
      die: 8,
      type: "piercing",
    },
    properties: ["finesse"],
    weight: 2,
    price: 25,
  },
  {
    id: "scimitar",
    name: "Krummsäbel",
    category: "weapon",
    weaponCategory: "martial",
    damage: {
      dice: 1,
      die: 6,
      type: "slashing",
    },
    properties: [
      "finesse",
      "light",
    ],
    weight: 3,
    price: 25,
  },
  {
    id: "shortsword",
    name: "Kurzschwert",
    category: "weapon",
    weaponCategory: "martial",
    damage: {
      dice: 1,
      die: 6,
      type: "piercing",
    },
    properties: [
      "finesse",
      "light",
    ],
    weight: 2,
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
  {
    id: "longbow",
    name: "Langbogen",
    category: "weapon",
    weaponCategory: "martial",
    damage: {
      dice: 1,
      die: 8,
      type: "piercing",
    },
    range: {
      normal: 150,
      long: 600,
    },
    properties: [
      "ammunition",
      "heavy",
      "two-handed",
    ],
    weight: 2,
    price: 50,
  },
];

const curatedArmor: ArmorItem[] = [
  {
    id: "leather",
    name: "Lederrüstung",
    category: "armor",
    armorClass: 11,
    dexterityModifier: true,
    weight: 10,
    price: 10,
  },
  {
    id: "scale-mail",
    name: "Schuppenpanzer",
    category: "armor",
    armorClass: 14,
    dexterityModifier: true,
    maximumDexterityBonus: 2,
    stealthDisadvantage: true,
    weight: 45,
    price: 50,
  },
  {
    id: "chain-mail",
    name: "Kettenrüstung",
    category: "armor",
    armorClass: 16,
    dexterityModifier: false,
    strengthRequirement: 13,
    stealthDisadvantage: true,
    weight: 55,
    price: 75,
  },
  {
    id: "shield",
    name: "Schild",
    category: "shield",
    armorClass: 2,
    dexterityModifier: false,
    weight: 6,
    price: 10,
  },
];


function normalizeEquipmentName(value: string): string {
  return value.toLocaleLowerCase("de").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}
function parseDamage(value: string) {
  const match = value.match(/(\d+)W(\d+)\s+(Hieb|Stich|Wucht)/);
  return { dice: Number(match?.[1] ?? 1), die: Number(match?.[2] ?? 4), type: ({ Hieb: "slashing", Stich: "piercing", Wucht: "bludgeoning" } as const)[match?.[3] as "Hieb"|"Stich"|"Wucht"] ?? "bludgeoning" };
}
function parseWeaponProperties(value: string): WeaponItem["properties"] {
  const map: Array<[RegExp, WeaponItem["properties"][number]]> = [[/Leicht/i,"light"],[/Schwer/i,"heavy"],[/Finesse/i,"finesse"],[/Zweihändig/i,"two-handed"],[/Vielseitig/i,"versatile"],[/Reichweite/i,"reach"],[/Wurf/i,"thrown"],[/Laden/i,"loading"],[/Munition/i,"ammunition"]];
  return map.filter(([pattern]) => pattern.test(value)).map(([, property]) => property);
}
function parseRange(value: string): WeaponItem["range"] | undefined {
  const match = value.match(/(?:Wurf|Munition)\s+(\d+)\/(\d+)/i);
  return match ? { normal: Number(match[1]), long: Number(match[2]) } : undefined;
}
const curatedWeaponNames = new Set(curatedWeapons.map((item) => normalizeEquipmentName(item.name)));
const importedWeapons: WeaponItem[] = sourceWeapons2014.filter((source) => !curatedWeaponNames.has(normalizeEquipmentName(source.name_de))).map((source) => ({
  id: source.app_id, name: source.name_de, category: "weapon", weaponCategory: source.category.startsWith("Kriegswaffe") ? "martial" : "simple",
  damage: parseDamage(source.damage), properties: parseWeaponProperties(source.properties), range: parseRange(source.properties), weight: source.weight_lb, price: source.cost_gp,
  description: `2014-Referenz: ${source.properties === "-" ? "keine besonderen Eigenschaften" : source.properties}.`,
}));
export const weapons: WeaponItem[] = [...curatedWeapons, ...importedWeapons].sort((a,b)=>a.name.localeCompare(b.name,"de"));

function parseArmorClass(value: string) { const match=value.match(/\d+/); return Number(match?.[0] ?? 10); }
const curatedArmorNames = new Set(curatedArmor.map((item) => normalizeEquipmentName(item.name)));
const importedArmor: ArmorItem[] = sourceArmor2014.filter((source) => !curatedArmorNames.has(normalizeEquipmentName(source.name_de))).map((source) => ({
  id: source.app_id, name: source.name_de, category: source.category === "Schild" ? "shield" : "armor", weight: source.weight_lb, price: source.cost_gp,
  armorClass: parseArmorClass(source.armor_class), dexterityModifier: source.armor_class.includes("GE"), maximumDexterityBonus: source.armor_class.includes("max. +2") ? 2 : undefined,
  strengthRequirement: source.strength === "-" ? undefined : Number(source.strength.match(/\d+/)?.[0]), stealthDisadvantage: source.stealth === "Nachteil",
  description: `Rüstungskategorie: ${source.category}.`,
}));
export const armor: ArmorItem[] = [...curatedArmor, ...importedArmor].sort((a,b)=>a.name.localeCompare(b.name,"de"));

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
    id: "blanket",
    name: "Decke",
    category: "gear",
    weight: 3,
    price: 0.5,
  },
  {
    id: "crowbar",
    name: "Brecheisen",
    category: "gear",
    weight: 5,
    price: 2,
  },
  {
    id: "hammer",
    name: "Hammer",
    category: "gear",
    weight: 3,
    price: 1,
  },
  {
    id: "piton",
    name: "Kletterhaken",
    category: "gear",
    weight: 0.25,
    price: 0.05,
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
    name: "Tagesration",
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
  {
    id: "tinderbox",
    name: "Zunderbüchse",
    category: "gear",
    weight: 1,
    price: 0.5,
  },
  {
    id: "mess-kit",
    name: "Essgeschirr",
    category: "gear",
    weight: 1,
    price: 0.2,
  },
  {
    id: "healers-kit",
    name: "Heilerausrüstung",
    category: "tool",
    weight: 3,
    price: 5,
  },
  {
    id: "thieves-tools",
    name: "Diebeswerkzeug",
    category: "tool",
    weight: 1,
    price: 25,
  },
  {
    id: "lute",
    name: "Laute",
    category: "tool",
    weight: 2,
    price: 35,
  },
  {
    id: "holy-symbol",
    name: "Heiliges Symbol",
    category: "focus",
    weight: 1,
    price: 5,
  },
  {
    id: "druidic-focus",
    name: "Druidischer Fokus",
    category: "focus",
    weight: 1,
    price: 1,
  },
  {
    id: "arcane-focus",
    name: "Arkaner Fokus",
    category: "focus",
    weight: 1,
    price: 10,
  },
  {
    id: "component-pouch",
    name: "Komponententasche",
    category: "focus",
    weight: 2,
    price: 25,
  },
  {
    id: "spellbook",
    name: "Zauberbuch",
    category: "gear",
    weight: 3,
    price: 50,
  },
  {
    id: "arrows",
    name: "Pfeile",
    category: "ammunition",
    weight: 0.05,
    price: 0.05,
  },
  {
    id: "crossbow-bolts",
    name: "Armbrustbolzen",
    category: "ammunition",
    weight: 0.075,
    price: 0.05,
  },
];

export const equipment: EquipmentDefinition[] = [
  ...weapons,
  ...armor,
  ...gear,
];

export const equipmentRegistry = new Map(equipment.map((entry) => [entry.id, entry]));

export function getEquipmentById(
  id: string,
): EquipmentDefinition | undefined {
  return equipmentRegistry.get(id);
}