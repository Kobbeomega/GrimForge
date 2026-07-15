export type CompendiumSource =
  | "core"
  | "srd-2024"
  | "grim-hollow"
  | "grim-hollow-2025"
  | "custom";

export interface CompendiumEntityBase {
  /**
   * Stabiler technischer Schlüssel.
   *
   * IDs dürfen nach Veröffentlichung nicht
   * geändert werden, weil Charaktere und
   * Entwürfe sie dauerhaft speichern.
   */
  id: string;

  /**
   * Anzeigename innerhalb der App.
   */
  name: string;

  /**
   * Kurze, eigenständig formulierte
   * Zusammenfassung für Auswahlkarten
   * und Übersichten.
   */
  description: string;

  /**
   * Quelle des Eintrags.
   */
  source: CompendiumSource;

  /**
   * Optionale Seitenreferenz für den
   * ausführlichen Regeltext.
   */
  sourcePage?: number;

  /**
   * Freie technische Schlagwörter für
   * Filter und spätere Suchfunktionen.
   */
  tags?: string[];
}

export type CompendiumFeatureKind =
  | "benefit"
  | "drawback"
  | "passive"
  | "action"
  | "bonus-action"
  | "reaction"
  | "special";

export interface CompendiumFeature
  extends CompendiumEntityBase {
  kind: CompendiumFeatureKind;

  /**
   * Optionaler Hinweis, ab welcher Stufe
   * oder welchem Rang das Merkmal gilt.
   */
  level?: number;

  /**
   * Freie Voraussetzungen, beispielsweise
   * andere Merkmale oder Mindeststufen.
   */
  prerequisites?: string[];
}

export interface CompendiumChoice<TValue = string> {
  id: string;

  title: string;

  description?: string;

  choose: number;

  options: Array<
    CompendiumChoiceOption<TValue>
  >;
}

export interface CompendiumChoiceOption<
  TValue = string,
> {
  id: string;

  title: string;

  description?: string;

  value: TValue;
}

export interface CompendiumProgressionStage<
  TFeature extends CompendiumFeature =
    CompendiumFeature,
> {
  stage: number;

  title: string;

  description: string;

  features: TFeature[];
}