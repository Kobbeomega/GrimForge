export type EquipmentCategory =
  | "weapon"
  | "armor"
  | "shield"
  | "gear"
  | "tool"
  | "consumable"
  | "focus"
  | "ammunition";

export type WeaponCategory =
  | "simple"
  | "martial";

export type DamageType =
  | "slashing"
  | "piercing"
  | "bludgeoning";

export type WeaponProperty =
  | "light"
  | "heavy"
  | "finesse"
  | "two-handed"
  | "versatile"
  | "reach"
  | "thrown"
  | "loading"
  | "ammunition";

export interface DamageDice {
  dice: number;
  die: number;
  type: DamageType;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;

  /**
   * Gewicht in D&D-Pfund.
   */
  weight: number;

  /**
   * Preis in Goldmünzen.
   */
  price: number;

  description?: string;
}

export interface WeaponItem
  extends EquipmentItem {
  category: "weapon";

  weaponCategory: WeaponCategory;

  damage: DamageDice;

  versatile?: DamageDice;

  range?: {
    normal: number;
    long?: number;
  };

  properties: WeaponProperty[];
}

export interface ArmorItem
  extends EquipmentItem {
  category: "armor" | "shield";

  armorClass: number;

  dexterityModifier: boolean;

  maximumDexterityBonus?: number;

  strengthRequirement?: number;

  stealthDisadvantage?: boolean;
}

export interface GearItem
  extends EquipmentItem {
  category:
    | "gear"
    | "tool"
    | "consumable"
    | "focus"
    | "ammunition";
}

export interface EquipmentPackItem {
  equipmentId: string;
  quantity: number;
}

export interface EquipmentPack {
  id: string;
  name: string;
  description: string;
  items: EquipmentPackItem[];
}

export type EquipmentDefinition =
  | WeaponItem
  | ArmorItem
  | GearItem;