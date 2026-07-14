import type {
  SkillId,
} from "../skills";

export interface BackgroundFeature {
  name: string;

  description: string;
}

export interface BackgroundDefinition {
  id: string;

  name: string;

  description: string;

  skillProficiencies: SkillId[];

  toolProficiencies: string[];

  /**
   * Anzahl zusätzlicher Sprachen,
   * die später frei gewählt werden können.
   */
  languageChoices: number;

  feature: BackgroundFeature;
}