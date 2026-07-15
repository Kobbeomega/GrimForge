import {
  classes,
} from "../../../compendium/classes";

import {
  formatAbilityModifier,
  getAbilityModifier,
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
}

const abilityLabels: Record<
  AbilityId,
  string
> = {
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

/**
 * Zuordnung der Compendium-IDs zu den in
 * classes.ts verwendeten deutschen Namen.
 */
const weaponProficiencyAliases: Record<
  string,
  string[]
> = {
  club: ["Keulen", "Knüppel"],
  dagger: ["Dolche"],
  dart: ["Wurfpfeile"],
  greatclub: [
    "Zweihändige Keulen",
    "Einfache Waffen",
  ],
  handaxe: ["Handäxte"],
  javelin: ["Wurfspeere"],
  mace: ["Streitkolben"],
  quarterstaff: ["Kampfstäbe"],
  spear: ["Speere"],
  "light-crossbow": [
    "Leichte Armbrüste",
  ],
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
        createWeaponAttackSummary(
          character,
          definition,
          inventoryItem.quantity,
        ),
      ];
    },
  );
}

function createWeaponAttackSummary(
  character: CharacterArchiveEntry,
  weapon: WeaponItem,
  quantity: number,
): WeaponAttackSummary {
  const abilityId =
    getWeaponAbility(
      character,
      weapon,
    );

  const abilityScore =
    character.abilityScores?.[
      abilityId
    ] ?? 10;

  const abilityModifier =
    getAbilityModifier(
      abilityScore,
    );

  const proficient =
    isProficientWithWeapon(
      character,
      weapon,
    );

  const proficiencyBonus =
    getProficiencyBonus(
      character.level,
    );

  const attackBonus =
    abilityModifier +
    (proficient
      ? proficiencyBonus
      : 0);

  return {
    id: weapon.id,
    name: weapon.name,
    quantity,

    abilityId,
    abilityLabel:
      abilityLabels[abilityId],

    proficient,

    attackBonus,

    attackBonusLabel:
      formatAbilityModifier(
        attackBonus,
      ),

    damage:
      formatDamage(
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

    damageType:
      damageTypeLabels[
        weapon.damage.type
      ],

    range: weapon.range
      ? weapon.range.long
        ? `${weapon.range.normal}/${weapon.range.long} ft`
        : `${weapon.range.normal} ft`
      : undefined,

    properties:
      weapon.properties.map(
        (property) =>
          weaponPropertyLabels[
            property
          ],
      ),
  };
}

function getWeaponAbility(
  character: CharacterArchiveEntry,
  weapon: WeaponItem,
): AbilityId {
  const strength =
    character.abilityScores
      ?.strength ?? 10;

  const dexterity =
    character.abilityScores
      ?.dexterity ?? 10;

  const usesAmmunition =
    weapon.properties.includes(
      "ammunition",
    );

  if (usesAmmunition) {
    return "dexterity";
  }

  if (
    weapon.properties.includes(
      "finesse",
    )
  ) {
    return dexterity > strength
      ? "dexterity"
      : "strength";
  }

  return "strength";
}

function isProficientWithWeapon(
  character: CharacterArchiveEntry,
  weapon: WeaponItem,
): boolean {
  const classDefinition =
    classes.find(
      (entry) =>
        entry.id ===
        character.classId,
    );

  if (!classDefinition) {
    return false;
  }

  const proficiencies =
    classDefinition
      .weaponProficiencies;

  if (
    weapon.weaponCategory ===
      "simple" &&
    proficiencies.includes(
      "Einfache Waffen",
    )
  ) {
    return true;
  }

  if (
    weapon.weaponCategory ===
      "martial" &&
    proficiencies.includes(
      "Kriegswaffen",
    )
  ) {
    return true;
  }

  const aliases =
    weaponProficiencyAliases[
      weapon.id
    ] ?? [];

  return aliases.some(
    (alias) =>
      proficiencies.includes(alias),
  );
}

function formatDamage(
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