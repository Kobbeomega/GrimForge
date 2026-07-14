import {
  defaultAbilityScores,
} from "../../../compendium/core";

import {
  getBackgroundById,
} from "../../../compendium/backgrounds";

import type {
  SkillId,
} from "../../../compendium/skills";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

import type {
  CharacterCreatorDraft,
} from "../types";

export function mapArchiveEntryToDraft(
  character: CharacterArchiveEntry,
): CharacterCreatorDraft {
  const timestamp =
    new Date().toISOString();

  const background =
    getBackgroundById(
      character.backgroundId ?? "",
    );

  const backgroundSkills =
    background?.skillProficiencies ?? [];

  const classSkillProficiencies =
    (character.skillProficiencies ?? [])
      .filter(
        (skillId) =>
          !backgroundSkills.includes(
            skillId,
          ),
      ) as SkillId[];

  return {
    id: character.id,

    fileNumber:
      character.fileNumber,

    currentStep: "identity",

    identity: {
      name: character.name,
      title: character.title ?? "",
      pronouns:
        character.pronouns ?? "",
      alignment:
        character.alignment ?? "",
      summary: character.summary,
    },

    ancestryId:
      character.ancestryId ?? "",

    ancestryVariantId:
      character.ancestryVariantId ??
      "",

    ancestryBonusChoices: [
      ...(character
        .ancestryBonusChoices ?? []),
    ],

    backgroundId:
      character.backgroundId ?? "",

    classId:
      character.classId ?? "",

    subclassId:
      character.subclassId ?? "",

    level: character.level,

    baseAbilities: {
      ...defaultAbilityScores,
      ...character.abilityScores,
    },

    classSkillProficiencies,

    skillExpertise: [
      ...(character.skillExpertise ??
        []),
    ],

    equipmentIds: [
      ...(character.equipmentIds ??
        []),
    ],

    /*
     * Das fertige Inventar bleibt erhalten.
     * Die ursprünglichen Auswahlgruppen wurden
     * in älteren Akten jedoch noch nicht separat
     * gespeichert.
     */
    startingEquipmentSelections:
      [],

    transformationId:
      character.transformationId ??
      "",

    transformationStage:
      character.transformationStage ??
      0,

    createdAt:
      character.createdAt ??
      character.updatedAt ??
      timestamp,

    updatedAt: timestamp,
  };
}