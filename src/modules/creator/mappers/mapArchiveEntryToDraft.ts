import {
  defaultAbilityScores,
} from "../../../compendium/core";

import type { CharacterArchiveEntry } from "../../archives/types";
import type { CharacterCreatorDraft } from "../types";

export function mapArchiveEntryToDraft(
  character: CharacterArchiveEntry,
): CharacterCreatorDraft {
  const timestamp = new Date().toISOString();

  return {
    id: character.id,

    fileNumber: character.fileNumber,

    currentStep: "identity",

    identity: {
      name: character.name,
      title: character.title ?? "",
      pronouns: character.pronouns ?? "",
      alignment: character.alignment ?? "",
      summary: character.summary,
    },

    ancestryId:
      character.ancestryId ?? "",

    ancestryVariantId:
      character.ancestryVariantId ?? "",

    ancestryBonusChoices: [
      ...(character.ancestryBonusChoices ?? []),
    ],

    classId:
      character.classId ?? "",

    subclassId:
      character.subclassId ?? "",

    level: character.level,

    baseAbilities: {
      ...defaultAbilityScores,
      ...character.abilityScores,
    },

    equipmentIds: [
      ...(character.equipmentIds ?? []),
    ],

    transformationId:
      character.transformationId ?? "",

    transformationStage:
      character.transformationStage ?? 0,

    createdAt:
      character.createdAt ??
      character.updatedAt ??
      timestamp,

    updatedAt: timestamp,
  };
}