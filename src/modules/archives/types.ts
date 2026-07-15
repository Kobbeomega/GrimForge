import type {
  AbilityId,
  AbilityScores,
} from "../../compendium/core";

import type {
  SkillId,
} from "../../compendium/skills";
import type {
  CharacterSize,
} from "../../compendium/ancestries";
import type {
  BackgroundFeature,
} from "../../compendium/backgrounds";

import type {
  CharacterSpellcasting,
} from "../../compendium/spells";

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
  ancestrySize?: CharacterSize;

  ancestryTraitIds?: string[];

  ancestryUsesReducedSpeed?: boolean;

  backgroundId?: string;
  backgroundName?: string;
  backgroundFeature?: BackgroundFeature;

  toolProficiencies?: string[];
  languageChoices?: number;

  className: string;
  classId?: string;

  subclass?: string;
  subclassId?: string;

  level: number;

  skillProficiencies?: SkillId[];
  skillExpertise?: SkillId[];

  summary: string;

  status: CharacterStatus;

  createdAt?: string;
  updatedAt: string;

  abilityScores?: AbilityScores;

  vitals?: CharacterVitals;

  inventory?: CharacterInventory;

  /**
   * Optional, damit ältere Akten ohne
   * Zauberdaten weiterhin geladen werden.
   */
  spellcasting?: CharacterSpellcasting;

  equipmentIds?: string[];

  sealId?: string;

  transformation?: string;
transformationId?: string;
transformationStage?: number;
transformationFeatureIds?: string[];
}

export interface CharacterArchiveActions {
  onOpen: (
    characterId: string,
  ) => void;

  onEdit: (
    characterId: string,
  ) => void;

  onDelete: (
    characterId: string,
  ) => void;
}