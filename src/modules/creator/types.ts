import type {
  AbilityId,
  AbilityScores,
} from "../../compendium/core";

import type {
  SkillId,
} from "../../compendium/skills";

export const creatorStepIds = [
  "identity",
  "ancestry",
  "background",
  "class",
  "abilities",
  "skills",
  "equipment",
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

export const creatorSteps: CreatorStepDefinition[] = [
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
    id: "transformation",
    chapter: "VIII",
    title: "Transformation",
    shortTitle: "Wandlung",
  },
  {
    id: "summary",
    chapter: "IX",
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

  transformationId: string;
  transformationStage: number;

  createdAt: string;
  updatedAt: string;
}

export interface CharacterCreatorState {
  draft: CharacterCreatorDraft;
  completedSteps: CreatorStepId[];
}

export function createEmptyCharacterDraft(
  fileNumber: string,
): CharacterCreatorDraft {
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

    transformationId: "",
    transformationStage: 0,

    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function getCreatorStepIndex(
  stepId: CreatorStepId,
): number {
  return creatorSteps.findIndex(
    (step) => step.id === stepId,
  );
}

export function getNextCreatorStep(
  stepId: CreatorStepId,
): CreatorStepId | null {
  const currentIndex =
    getCreatorStepIndex(stepId);

  return (
    creatorSteps[currentIndex + 1]
      ?.id ?? null
  );
}

export function getPreviousCreatorStep(
  stepId: CreatorStepId,
): CreatorStepId | null {
  const currentIndex =
    getCreatorStepIndex(stepId);

  return (
    creatorSteps[currentIndex - 1]
      ?.id ?? null
  );
}