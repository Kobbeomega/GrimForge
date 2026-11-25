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
import type { CharacterPathChoices } from "../../compendium/classes";
import type { CharacterFeatChoices } from "../../compendium/feats";

export type CharacterStatus =
  | "active"
  | "retired"
  | "deceased"
  | "draft";

export interface DeathSaves {
  successes: number;
  failures: number;
}

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

export type HomebrewEquipment = { price: number } & (
  | { kind: "gear" }
  | { kind: "weapon"; dice: number; die: number; damageType: "slashing" | "piercing" | "bludgeoning"; martial: boolean; finesse: boolean; ranged: boolean; thrown?: boolean; rangeNormal?: number; rangeLong?: number; twoHanded: boolean; attackBonus: number; damageBonus: number }
  | { kind: "armor" | "shield"; armorClass: number; dexterity: "none" | "limited" | "full" }
);
export interface CharacterInventoryItem {
  homebrew?: HomebrewEquipment;
  catalogId?: string;
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
  /** Persistente Klassen-/Unterklassenentscheidungen wie Totem, Land oder Manöver. */
  pathChoices?: CharacterPathChoices;

  level: number;

  /** Abgeschlossene Aufstiege; ältere Akten benötigen keine Migration. */
  levelUpHistory?: Array<{
    fromLevel: number;
    toLevel: number;
    date: string;
    hitPointGain: number;
    hitPointMode: "average" | "roll";
    hitDieRoll?: number;
    abilityScoreMode?: "none" | "increase" | "feat";
    abilityScoreIncreases?: Partial<Record<AbilityId, number>>;
    featId?: string;
    featChoices?: CharacterFeatChoices;
    featNote?: string;
    subclassId?: string;
    pathChoices: CharacterPathChoices;
    spellIds: string[];
  }>;

  skillProficiencies?: SkillId[];
  skillExpertise?: SkillId[];
  featIds?: string[];
  featChoices?: CharacterFeatChoices;

  summary: string;

  status: CharacterStatus;

  createdAt?: string;
  updatedAt: string;

  /** Point-Buy-/Basiswerte vor Abstammungsboni. */
  baseAbilityScores?: AbilityScores;

  /** Effektive Werte inklusive Abstammungsboni. */
  abilityScores?: AbilityScores;

  vitals?: CharacterVitals;
  /** Stored movement excludes equipment-dependent class bonuses. */
  movementBaseVersion?: 1;

  inventory?: CharacterInventory;

  /**
   * Optional, damit ältere Akten ohne
   * Zauberdaten weiterhin geladen werden.
   */
  spellcasting?: CharacterSpellcasting;

  equipmentIds?: string[];

  /** Persistiert die ursprünglichen Startausrüstungs-Entscheidungen für sichere Creator-Roundtrips. */
  startingEquipmentSelections?: Array<{ choiceId: string; optionId: string }>;

  /** Verbrauchte Klassenressourcen, nach Ressourcen-ID. */
  spentClassResources?: Record<string, number>;

  /** Bereits verbrauchte Trefferwürfel. Gesamtzahl entspricht der Charakterstufe. */
  spentHitDice?: number;

  /** D&D-5e-Inspiration: maximal ein Inspirationspunkt gleichzeitig. */
  inspiration?: boolean;

  /** Schnelle Spieltisch-Marker wie vergiftet, konzentriert oder erschöpft. */
  conditionIds?: string[];

  /** Optional, permanent tracker for death saving throws. */
  deathSaves?: DeathSaves;

  /** 2014 rules: exhaustion level 0–6; not the same as a boolean condition. */
  exhaustionLevel?: number;

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
