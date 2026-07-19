import {
  defaultAbilityScores,
} from "../../../compendium/core";

import {
  getAncestryById,
} from "../../../compendium/ancestries";

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

  const ancestry =
    getAncestryById(
      character.ancestryId ?? "",
    );

  const background =
    getBackgroundById(
      character.backgroundId ?? "",
    );

  const backgroundSkills =
    background?.skillProficiencies ?? [];

  const classSkillProficiencies =
    (
      character.skillProficiencies ?? []
    ).filter(
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
      name:
        character.name,

      title:
        character.title ?? "",

      pronouns:
        character.pronouns ?? "",

      alignment:
        character.alignment ?? "",

      summary:
        character.summary,
    },

    /*
     * Herkunft
     */

    ancestryId:
      character.ancestryId ?? "",

    ancestryVariantId:
      character.ancestryVariantId ?? "",

    ancestryBonusChoices: [
      ...(
        character
          .ancestryBonusChoices ?? []
      ),
    ],

    ancestrySize:
      character.ancestrySize ??
      ancestry?.size ??
      "medium",

    ancestryTraitIds: [
      ...(
        character
          .ancestryTraitIds ?? []
      ),
    ],

    ancestryUsesReducedSpeed:
      character
        .ancestryUsesReducedSpeed ??
      false,

    /*
     * Hintergrund
     */

    backgroundId:
      character.backgroundId ?? "",

    /*
     * Klasse
     */

    classId:
      character.classId ?? "",

    subclassId:
      character.subclassId ?? "",

    level:
      character.level,

    /*
     * Attribute
     */

    baseAbilities: {
      ...defaultAbilityScores,
      ...(character.baseAbilityScores ?? character.abilityScores),
    },

    /*
     * Fertigkeiten
     */

    classSkillProficiencies,

    skillExpertise: [
      ...(
        character
          .skillExpertise ?? []
      ),
    ],

    /*
     * Ausrüstung
     */

    equipmentIds: [
      ...(
        character.equipmentIds ?? []
      ),
    ],

    startingEquipmentSelections: [],

    /*
     * Zauber
     */

    spellcasting:
      character.spellcasting
        ? {
            spellIds:
              character
                .spellcasting
                .spellIds
                .map(
                  (selection) => ({
                    ...selection,
                  }),
                ),

            slots: {
              spentSlots: {
                ...character
                  .spellcasting
                  .slots
                  .spentSlots,
              },

              spentPactSlots:
                character
                  .spellcasting
                  .slots
                  .spentPactSlots,
            },
          }
        : {
            spellIds: [],

            slots: {
              spentSlots: {},
              spentPactSlots: 0,
            },
          },

    /*
     * Transformation
     */

    transformationId:
      character.transformationId ?? "",

    transformationStage:
      character.transformationStage ?? 0,

    transformationFeatureIds: [
      ...(
        character
          .transformationFeatureIds ?? []
      ),
    ],

    /*
     * Zeitstempel
     */

    createdAt:
      character.createdAt ??
      character.updatedAt ??
      timestamp,

    updatedAt:
      timestamp,
  };
}