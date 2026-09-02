import {
  classes,
  getSubclassProficiencyPackage,
} from "../../../compendium/classes";

import {
  defaultAbilityScores,
  getProficiencyBonus,
} from "../../../compendium/core";

import {
  getEquipmentById,
} from "../../../compendium/equipment";

import type {
  AbilityId,
} from "../../../compendium/core";

import type {
  WeaponItem,
} from "../../../compendium/equipment";

import {
  calculateWeaponAttack,
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
        getEquipmentById(inventoryItem.id);

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
        ),
      ];
    },
  );
}

function createWeaponAttackSummary(
  character: CharacterArchiveEntry,
  weapon: WeaponItem,
  quantity: number,
  inventory: CharacterInventory,
): WeaponAttackSummary {
  const proficient =
    isProficientWithWeapon(
      character,
      weapon,
    );

  const calculation =
    calculateWeaponAttack({
      weapon,
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
  const isRanged = weapon.properties.includes("ammunition");
  const otherEquippedWeapon = inventory.items.some((item) => item.equipped && item.quantity > 0 && item.category === "weapon" && item.id !== weapon.id);
  const isOneHandedMelee = !isRanged && !weapon.properties.includes("two-handed");
  const attackStyleBonus = fightingStyle === "archery" && isRanged ? 2 : 0;
  const damageStyleBonus = fightingStyle === "dueling" && isOneHandedMelee && !otherEquippedWeapon ? 2 : 0;

  const damageType =
    damageTypeLabels[
      weapon.damage.type
    ];

  const range = weapon.range
    ? weapon.range.long
      ? `${weapon.range.normal}/${weapon.range.long} ft`
      : `${weapon.range.normal} ft`
    : undefined;

  const properties =
    weapon.properties.map(
      (property) =>
        weaponPropertyLabels[property],
    );

  const details = [
    calculation.versatileDamage
      ? `Vielseitig ${calculation.versatileDamage}`
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
    id: weapon.id,
    name: weapon.name,
    quantity,
    abilityId: calculation.abilityId,
    abilityLabel:
      abilityLabels[
        calculation.abilityId
      ],
    proficient,
    attackBonus:
      calculation.attackBonus + attackStyleBonus,
    attackBonusLabel:
      formatSigned(calculation.attackBonus + attackStyleBonus),
    damage: addFlatDamage(calculation.damage, damageStyleBonus),
    versatileDamage:
      calculation.versatileDamage,
    damageType,
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

  const subclassProficiencies = getSubclassProficiencyPackage(character.classId ?? "", character.subclassId);
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
function addFlatDamage(damage: string, bonus: number): string { return bonus > 0 ? `${damage} +${bonus}` : damage; }
