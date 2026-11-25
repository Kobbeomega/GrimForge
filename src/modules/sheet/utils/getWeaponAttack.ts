import {
  classes,
  getSubclassProficiencyPackage,
} from "../../../compendium/classes";

import {
  defaultAbilityScores,
  getAbilityModifier,
  getProficiencyBonus,
} from "../../../compendium/core";

import { resolveInventoryItem, homebrewWeaponBonus } from "../../archives/utils/resolveInventoryItem";

import type {
  AbilityId,
} from "../../../compendium/core";

import type {
  WeaponItem,
} from "../../../compendium/equipment";
import { getWeaponMastery2024 } from "../../../compendium/equipment/weaponMasteries2024";

import {
  calculateWeaponAttack,
  formatDamage,
} from "../../../rules/attacks";

import type {
  CharacterArchiveEntry,
  CharacterInventory,
} from "../../archives/types";

export interface WeaponAttackSummary {
  id: string;
  name: string;
  quantity: number;
  abilityId: AbilityId;
  abilityLabel: string;
  proficient: boolean;
  attackBonus: number;
  attackBonusLabel: string;
  criticalMinimum: number;
  damage: string;
  versatileDamage?: string;
  damageType: string;
  range?: string;
  properties: string[];
  details: string;
}

const abilityLabels: Record<AbilityId, string> = {
  strength: "Stärke",
  dexterity: "Geschicklichkeit",
  constitution: "Konstitution",
  intelligence: "Intelligenz",
  wisdom: "Weisheit",
  charisma: "Charisma",
};

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

const weaponProficiencyAliases: Record<string, string[]> = {
  handarmbrust: ["Handarmbrüste"],
  sichel: ["Sicheln"],
  schleuder: ["Schleudern"],
  club: ["Keulen", "Knüppel"],
  dagger: ["Dolche"],
  dart: ["Wurfpfeile"],
  greatclub: ["Zweihändige Keulen", "Einfache Waffen"],
  handaxe: ["Handäxte"],
  javelin: ["Wurfspeere"],
  mace: ["Streitkolben"],
  quarterstaff: ["Kampfstäbe"],
  spear: ["Speere"],
  "light-crossbow": ["Leichte Armbrüste"],
  shortbow: ["Kurzbögen"],
  battleaxe: ["Streitäxte"],
  greataxe: ["Große Äxte"],
  greatsword: ["Großschwerter"],
  longsword: ["Langschwerter"],
  rapier: ["Rapiere"],
  scimitar: ["Krummsäbel"],
  shortsword: ["Kurzschwerter"],
  warhammer: ["Kriegshämmer"],
  longbow: ["Langbögen"],
};

export function getEquippedWeaponAttacks(
  character: CharacterArchiveEntry,
  inventory: CharacterInventory,
): WeaponAttackSummary[] {
  return inventory.items.flatMap(
    (inventoryItem) => {
      if (
        !inventoryItem.equipped ||
        inventoryItem.quantity <= 0 ||
        inventoryItem.category !== "weapon"
      ) {
        return [];
      }

      const definition =
        resolveInventoryItem(inventoryItem);

      if (
        !definition ||
        definition.category !== "weapon"
      ) {
        return [];
      }

      return [
        createWeaponAttackSummary(
          character,
          definition,
          inventoryItem.quantity,
          inventory,
          inventoryItem,
        ),
      ];
    },
  );
}

/** Reference values for a printed arsenal, without applying loadout-dependent damage bonuses. */
export function getInventoryWeaponAttacks(character: CharacterArchiveEntry, inventory: CharacterInventory) {
  return inventory.items.filter(item=>item.category==="weapon" && item.quantity>0).map(item=>{
    const definition=resolveInventoryItem(item);
    const attack=definition?.category==="weapon"
      ? createWeaponAttackSummary(character,definition,item.quantity,inventory,item,true)
      : undefined;
    return {item,attack};
  });
}

function createWeaponAttackSummary(
  character: CharacterArchiveEntry,
  catalogWeapon: WeaponItem,
  quantity: number,
  inventory: CharacterInventory,
  inventoryItem: CharacterInventory["items"][number],
  printReference = false,
): WeaponAttackSummary {
  const weapon = !inventoryItem.homebrew && character.classId === "monster-hunter" ? get2024WeaponDamage(catalogWeapon) : catalogWeapon;
  const proficient =
    isProficientWithWeapon(
      character,
      weapon,
    );

  const isRanged = weapon.properties.includes("ammunition") || ["dart","netz"].includes(weapon.id);
  const unarmored = !inventory.items.some(i => i.equipped && i.quantity > 0 && (i.category === "armor" || i.id === "shield"));
  const martialArts = character.classId === "monk" && unarmored && !isRanged &&
    (weapon.weaponCategory === "simple" || weapon.id === "shortsword") && !weapon.properties.some(p => p === "heavy" || p === "two-handed");
  const attackWeapon = martialArts ? { ...weapon, properties: [...weapon.properties, "finesse" as const] } : weapon;
  const calculation =
    calculateWeaponAttack({
      weapon: attackWeapon,
      abilityScores: {
        ...defaultAbilityScores,
        ...character.abilityScores,
      },
      proficiencyBonus:
        getProficiencyBonus(
          character.level,
        ),
      proficient,
    });

  const fightingStyle = character.pathChoices?.[`${character.classId}-fighting-style`];

  const otherEquippedWeapon = inventory.items.some((item) => item.equipped && item.quantity > 0 && item.category === "weapon" && item.id !== inventoryItem.id);
  const isOneHandedMelee = !isRanged && !weapon.properties.includes("two-handed");
  const attackStyleBonus = fightingStyle === "archery" && isRanged ? 2 : 0;
  const qualifiesForDueling = fightingStyle === "dueling" && isOneHandedMelee;
  const damageStyleBonus = qualifiesForDueling && !otherEquippedWeapon && !printReference ? 2 : 0;
  const expertStrike = character.classId === "monster-hunter" && character.level >= 5
    ? Math.max(0, getAbilityModifier(character.abilityScores?.intelligence ?? 10)) : 0;

  const damageType =
    damageTypeLabels[
      weapon.damage.type
    ];

  const range = weapon.range
    ? weapon.range.long
      ? `${weapon.range.normal}/${weapon.range.long} ft`
      : `${weapon.range.normal} ft`
    : undefined;

  const properties: string[] =
    weapon.properties.map(
      (property) =>
        weaponPropertyLabels[property],
    );
  const masteries = character.pathChoices?.["monster-hunter-weapon-mastery"];
  const mastery = character.classId === "monster-hunter" && Array.isArray(masteries) && masteries.includes(catalogWeapon.id)
    ? getWeaponMastery2024(weapon.id) : undefined;
  if (mastery) properties.push(`Meisterschaft: ${mastery}`);
  const versatileDamage = weapon.versatile
    ? formatDamage(weapon.versatile.dice, weapon.versatile.die, calculation.abilityModifier + expertStrike + homebrewWeaponBonus(inventoryItem,"damageBonus")) : undefined;

  const details = [
    printReference && qualifiesForDueling ? "Duellieren: +2 Schaden, wenn einhändig geführt und keine andere Waffe geführt wird" : undefined,
    printReference && martialArts ? "Kampfkunst: Werte gelten ohne Rüstung und Schild" : undefined,
    expertStrike ? `Meisterschlag +${expertStrike} Angriff und Schaden` : undefined,
    versatileDamage
      ? `Vielseitig ${versatileDamage}`
      : undefined,
    range
      ? `Reichweite ${range}`
      : undefined,
    ...properties.filter(
      (property) =>
        property !== "Vielseitig",
    ),
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    id: inventoryItem.id,
    name: inventoryItem.name,
    quantity,
    abilityId: calculation.abilityId,
    abilityLabel:
      abilityLabels[
        calculation.abilityId
      ],
    proficient,
    attackBonus:
      calculation.attackBonus + attackStyleBonus + expertStrike + homebrewWeaponBonus(inventoryItem,"attackBonus"),
    attackBonusLabel:
      formatSigned(calculation.attackBonus + attackStyleBonus + expertStrike + homebrewWeaponBonus(inventoryItem,"attackBonus")),
    criticalMinimum: character.classId === "fighter" && character.subclassId === "champion" && character.level >= 3
      ? (character.level >= 15 ? 18 : 19)
      : 20,
    damage: formatDamage(weapon.damage.dice, martialArts ? Math.max(weapon.damage.die, character.level >= 5 ? 6 : 4) : weapon.damage.die, calculation.abilityModifier + damageStyleBonus + expertStrike + homebrewWeaponBonus(inventoryItem,"damageBonus")),
    versatileDamage,
    damageType: weapon.damage.dice ? damageType : "",
    range,
    properties,
    details,
  };
}

function isProficientWithWeapon(
  character: CharacterArchiveEntry,
  weapon: WeaponItem,
): boolean {
  const classDefinition =
    classes.find(
      (entry) =>
        entry.id === character.classId,
    );

  if (!classDefinition) {
    return false;
  }

  if (character.ancestryId === "dwarf" && ["battleaxe","handaxe","leichter-hammer","warhammer"].includes(weapon.id)) return true;
  const subclassProficiencies = getSubclassProficiencyPackage(character.classId ?? "", character.subclassId, character.level);
  const proficiencies = [
    ...classDefinition.weaponProficiencies,
    ...(subclassProficiencies?.weapons ?? []),
  ];

  if (
    weapon.weaponCategory === "simple" &&
    proficiencies.includes("Einfache Waffen")
  ) {
    return true;
  }

  if (
    weapon.weaponCategory === "martial" &&
    proficiencies.includes("Kriegswaffen")
  ) {
    return true;
  }

  const aliases =
    weaponProficiencyAliases[weapon.id] ?? [];

  return aliases.some((alias) =>
    proficiencies.includes(alias),
  );
}

function formatSigned(value: number): string { return value >= 0 ? `+${value}` : `${value}`; }
function get2024WeaponDamage(weapon: WeaponItem): WeaponItem {
  if (weapon.id === "lanze") return { ...weapon, damage: { ...weapon.damage, die: 10 } };
  if (weapon.id !== "dreizack" && weapon.id !== "kriegspicke") return weapon;
  return {
    ...weapon,
    damage: { ...weapon.damage, die: 8 },
    versatile: { ...weapon.damage, die: 10 },
    properties: [...new Set([...weapon.properties, "versatile" as const])],
  };
}
