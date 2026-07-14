import type {
  AbilityId,
  AbilityScores,
} from "../../compendium/core";

export const creatorStepIds = [
  "identity",
  "ancestry",
  "class",
  "abilities",
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
    id: "class",
    chapter: "III",
    title: "Klasse",
    shortTitle: "Pfad",
  },
  {
    id: "abilities",
    chapter: "IV",
    title: "Attribute",
    shortTitle: "Attribute",
  },
  {
    id: "equipment",
    chapter: "V",
    title: "Ausrüstung",
    shortTitle: "Ausrüstung",
  },
  {
    id: "transformation",
    chapter: "VI",
    title: "Transformation",
    shortTitle: "Wandlung",
  },
  {
    id: "summary",
    chapter: "VII",
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

export interface CharacterCreatorDraft {
  id: string;
  fileNumber: string;

  currentStep: CreatorStepId;

  identity: CharacterIdentityDraft;

  ancestryId: string;
  ancestryVariantId: string;
  ancestryBonusChoices: AbilityId[];

  classId: string;
  subclassId: string;

  level: number;

  baseAbilities: AbilityScores;

  equipmentIds: string[];

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
  const timestamp = new Date().toISOString();

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

    equipmentIds: [],

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
  const currentIndex = getCreatorStepIndex(stepId);
  const nextStep = creatorSteps[currentIndex + 1];

  return nextStep?.id ?? null;
}

export function getPreviousCreatorStep(
  stepId: CreatorStepId,
): CreatorStepId | null {
  const currentIndex = getCreatorStepIndex(stepId);
  const previousStep = creatorSteps[currentIndex - 1];

  return previousStep?.id ?? null;
}