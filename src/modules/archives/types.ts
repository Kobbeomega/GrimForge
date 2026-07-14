import type {
  AbilityId,
  AbilityScores,
} from "../../compendium/core";

export type CharacterStatus =
  | "active"
  | "retired"
  | "deceased"
  | "draft";

export interface CharacterVitals {
  maximumHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  armorClass: number;
  initiativeModifier: number;
  speed: number;
}

export type InventoryItemCategory =
  | "weapon"
  | "armor"
  | "consumable"
  | "adventuring-gear"
  | "tool"
  | "treasure"
  | "other";

export interface CharacterInventoryItem {
  id: string;

  name: string;

  category: InventoryItemCategory;

  quantity: number;

  /**
   * Gewicht eines einzelnen Gegenstandes.
   */
  weight: number;

  equipped: boolean;

  notes: string;

  createdAt: string;
  updatedAt: string;
}

export interface CharacterCurrency {
  copper: number;
  silver: number;
  gold: number;
}

export interface CharacterInventory {
  items: CharacterInventoryItem[];

  currency: CharacterCurrency;
}

export interface CharacterArchiveEntry {
  id: string;
  fileNumber: string;

  name: string;
  title?: string;
  pronouns?: string;
  alignment?: string;

  ancestry: string;
  ancestryId?: string;
  ancestryVariantId?: string;
  ancestryBonusChoices?: AbilityId[];

  className: string;
  classId?: string;

  subclass?: string;
  subclassId?: string;

  level: number;

  summary: string;

  status: CharacterStatus;

  createdAt?: string;
  updatedAt: string;

  abilityScores?: AbilityScores;

  vitals?: CharacterVitals;

  /**
   * Neue Inventarstruktur.
   *
   * Optional, damit ältere gespeicherte Akten
   * weiterhin geladen werden können.
   */
  inventory?: CharacterInventory;

  /**
   * Altes Feld aus dem Creator.
   * Bleibt vorerst aus Kompatibilitätsgründen erhalten.
   */
  equipmentIds?: string[];

  sealId?: string;

  transformation?: string;
  transformationId?: string;
  transformationStage?: number;
}

export interface CharacterArchiveActions {
  onOpen: (characterId: string) => void;
  onEdit: (characterId: string) => void;
  onDelete: (characterId: string) => void;
}