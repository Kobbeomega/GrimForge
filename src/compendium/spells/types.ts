import type {
  AbilityId,
} from "../core";

export const spellLevels = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
] as const;

export type SpellLevel =
  (typeof spellLevels)[number];

export type SpellSchool =
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "evocation"
  | "illusion"
  | "necromancy"
  | "transmutation";

export type SpellDamageType =
  | "acid"
  | "bludgeoning"
  | "cold"
  | "fire"
  | "force"
  | "lightning"
  | "necrotic"
  | "piercing"
  | "poison"
  | "psychic"
  | "radiant"
  | "slashing"
  | "thunder";

export interface SpellComponents {
  verbal: boolean;
  somatic: boolean;
  material: boolean;

  materialDescription?: string;
}

export interface SpellDice {
  dice: number;
  die: number;

  /**
   * Optionales Attribut, dessen Modifikator
   * zum Ergebnis addiert wird.
   */
  modifierAbility?: AbilityId;
}

export interface SpellDamageDefinition {
  dice?: SpellDice;

  damageType: SpellDamageType;

  /**
   * Bei manchen Zaubern wird kein Angriffswurf,
   * sondern ein Rettungswurf verlangt.
   */
  savingThrowAbility?: AbilityId;

  /**
   * Schaden bei erfolgreichem Rettungswurf.
   */
  halfDamageOnSave?: boolean;
}

export interface SpellHealingDefinition {
  dice: SpellDice;
}

export interface SpellScalingEntry {
  characterLevel: number;

  dice: SpellDice;
}

export interface SpellDefinition {
  id: string;

  name: string;

  level: SpellLevel;

  school: SpellSchool;

  castingTime: string;

  range: string;

  components: SpellComponents;

  duration: string;

  concentration: boolean;

  ritual: boolean;

  description: string;

  higherLevels?: string;

  damage?: SpellDamageDefinition;

  healing?: SpellHealingDefinition;

  /**
   * Skalierung von Zaubertricks nach
   * Gesamtcharakterstufe.
   */
  scaling?: SpellScalingEntry[];

  /**
   * Klassen-IDs, die den Zauber grundsätzlich
   * lernen oder vorbereiten können.
   */
  classIds: string[];
}

export type SpellPreparationMode =
  | "known"
  | "prepared"
  | "spellbook"
  | "pact";

export type SpellSlotProgression =
  | "full"
  | "half"
  | "pact";

export interface SpellSlots {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
  7?: number;
  8?: number;
  9?: number;
}

export interface PactSpellSlots {
  slotLevel: Exclude<
    SpellLevel,
    0
  >;

  slots: number;
}

export interface CharacterSpellSlotState {
  /**
   * Bereits verbrauchte normale Zauberplätze.
   */
  spentSlots: SpellSlots;

  /**
   * Bereits verbrauchte Paktplätze.
   */
  spentPactSlots: number;
}

export interface CharacterSpellSelection {
  spellId: string;

  /**
   * Bei vorbereitenden Klassen kann ein
   * bekannter Zauber vorübergehend inaktiv sein.
   */
  prepared: boolean;
}

export interface CharacterSpellcasting {
  spellIds: CharacterSpellSelection[];

  slots: CharacterSpellSlotState;
}

export interface ClassSpellcastingDefinition {
  classId: string;

  abilityId: AbilityId;

  progression: SpellSlotProgression;

  preparationMode:
    SpellPreparationMode;

  ritualCasting: boolean;

  focusLabel: string;

  /**
   * Anzahl bekannter Zaubertricks nach
   * Klassenstufe.
   */
  cantripsKnownByLevel: number[];

  /**
   * Nur für Klassen mit fester Anzahl
   * bekannter Zauber.
   */
  spellsKnownByLevel?: number[];

  /**
   * Vorbereitete Zauber:
   *
   * Attributsmodifikator + Klassenstufe
   * oder Attributsmodifikator +
   * halbe Klassenstufe.
   */
  preparedSpellFormula?:
    | "ability-plus-level"
    | "ability-plus-half-level";

  minimumPreparedSpells?: number;
}