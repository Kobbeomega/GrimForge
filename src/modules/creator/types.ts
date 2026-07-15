import type {
  AbilityId,
  AbilityScores,
} from "../../compendium/core";

import type {
  CharacterSize,
} from "../../compendium/ancestries";

import type {
  SkillId,
} from "../../compendium/skills";

import type {
  CharacterSpellcasting,
} from "../../compendium/spells";

export const creatorStepIds = [
  "identity",
  "ancestry",
  "background",
  "class",
  "abilities",
  "skills",
  "equipment",
  "spells",
  "transformation",
  "summary",
] as const;

export type CreatorStepId =
  (typeof creatorStepIds)[number];

export interface CreatorStepDefinition {
  id: CreatorStepId;
  chapter: string;
  title: string;
  shortTitle: string;
}

export const creatorSteps:
  CreatorStepDefinition[] = [
    {
      id: "identity",
      chapter: "I",
      title: "Identität",
      shortTitle: "Identität",
    },
    {
      id: "ancestry",
      chapter: "II",
      title: "Abstammung",
      shortTitle: "Blutlinie",
    },
    {
      id: "background",
      chapter: "III",
      title: "Hintergrund",
      shortTitle: "Herkunft",
    },
    {
      id: "class",
      chapter: "IV",
      title: "Klasse",
      shortTitle: "Pfad",
    },
    {
      id: "abilities",
      chapter: "V",
      title: "Attribute",
      shortTitle: "Attribute",
    },
    {
      id: "skills",
      chapter: "VI",
      title: "Fertigkeiten",
      shortTitle: "Fertigkeiten",
    },
    {
      id: "equipment",
      chapter: "VII",
      title: "Startausrüstung",
      shortTitle: "Ausrüstung",
    },
    {
      id: "spells",
      chapter: "VIII",
      title: "Zauber",
      shortTitle: "Magie",
    },
    {
      id: "transformation",
      chapter: "IX",
      title: "Transformation",
      shortTitle: "Wandlung",
    },
    {
      id: "summary",
      chapter: "X",
      title: "Zusammenfassung",
      shortTitle: "Abschluss",
    },
  ];

export interface CharacterIdentityDraft {
  name: string;
  title: string;
  pronouns: string;
  alignment: string;
  summary: string;
}

export interface StartingEquipmentSelection {
  choiceId: string;
  optionId: string;
}

export interface CharacterCreatorDraft {
  id: string;
  fileNumber: string;

  currentStep: CreatorStepId;

  identity: CharacterIdentityDraft;

  ancestryId: string;
  ancestryVariantId: string;
  ancestryBonusChoices: AbilityId[];

  ancestrySize: CharacterSize;
  ancestryTraitIds: string[];
  ancestryUsesReducedSpeed: boolean;

  backgroundId: string;

  classId: string;
  subclassId: string;

  level: number;

  baseAbilities: AbilityScores;

  classSkillProficiencies: SkillId[];
  skillExpertise: SkillId[];

  equipmentIds: string[];

  startingEquipmentSelections:
    StartingEquipmentSelection[];

  spellcasting: CharacterSpellcasting;

  transformationId: string;
  transformationStage: number;
  transformationFeatureIds: string[];

  createdAt: string;
  updatedAt: string;
}

export interface CharacterCreatorState {
  draft: CharacterCreatorDraft;
  completedSteps: CreatorStepId[];
}

export function createEmptyCharacterDraft(
  fileNumber: string,
): CharacterCreatorDraft  {
  const timestamp =
    new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    fileNumber,

    currentStep: "identity",

    identity: {
      name: "",
      title: "",
      pronouns: "",
      alignment: "",
      summary: "",
    },

    ancestryId: "",

    ancestryVariantId: "",

    ancestryBonusChoices: [],

    ancestrySize: "medium",

    ancestryTraitIds: [],

    ancestryUsesReducedSpeed: false,

    backgroundId: "",

    classId: "",
    subclassId: "",

    level: 1,

    baseAbilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },

    classSkillProficiencies: [],

    skillExpertise: [],

    equipmentIds: [],

    startingEquipmentSelections: [],

    spellcasting: {
      spellIds: [],

      slots: {
        spentSlots: {},
        spentPactSlots: 0,
      },
    },

    transformationId: "",
transformationStage: 0,
transformationFeatureIds: [],

createdAt: timestamp,
updatedAt: timestamp,
  };
}

export function getCreatorStepIndex(
  stepId: CreatorStepId,
): number {
  return creatorSteps.findIndex(
    (step) =>
      step.id === stepId,
  );
}

export function getNextCreatorStep(
  stepId: CreatorStepId,
): CreatorStepId | null {
  const currentIndex =
    getCreatorStepIndex(stepId);

  return (
    creatorSteps[
      currentIndex + 1
    ]?.id ?? null
  );
}

export function getPreviousCreatorStep(
  stepId: CreatorStepId,
): CreatorStepId | null {
  const currentIndex =
    getCreatorStepIndex(stepId);

  return (
    creatorSteps[
      currentIndex - 1
    ]?.id ?? null
  );
}