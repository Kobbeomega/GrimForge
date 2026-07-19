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


export type JournalGoalStatus =
  | "active"
  | "completed"
  | "abandoned";

export interface CharacterJournalGoal {
  id: string;
  title: string;
  details: string;
  status: JournalGoalStatus;
}

export interface CharacterJournalRelationship {
  id: string;
  name: string;
  type: string;
  notes: string;
}

export interface CharacterJournalFaction {
  id: string;
  name: string;
  rank: string;
  standing: string;
  notes: string;
}

export interface CharacterSessionNote {
  id: string;
  title: string;
  date: string;
  notes: string;
}

export interface CharacterJournal {
  background: string;
  motivations: string;
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  fears: string;
  secrets: string;
  goals: CharacterJournalGoal[];
  relationships: CharacterJournalRelationship[];
  factions: CharacterJournalFaction[];
  sessionNotes: CharacterSessionNote[];
}

export interface CharacterArchiveEntry {
  /** Version des persistierten Charakter-Datenmodells. */
  schemaVersion?: number;
  migratedFromSchemaVersion?: number;

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

  /** Point-Buy-/Basiswerte vor Abstammungsboni. */
  baseAbilityScores?: AbilityScores;

  /** Effektive Werte inklusive Abstammungsboni. */
  abilityScores?: AbilityScores;

  vitals?: CharacterVitals;

  inventory?: CharacterInventory;

  /**
   * Optional, damit ältere Akten ohne
   * Zauberdaten weiterhin geladen werden.
   */
  spellcasting?: CharacterSpellcasting;

  equipmentIds?: string[];

  /** Verbrauchte Klassenressourcen, nach Ressourcen-ID. */
  spentClassResources?: Record<string, number>;

  sealId?: string;

  /** Persönliche, regelunabhängige Charakteraufzeichnungen. */
  journal?: CharacterJournal;

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