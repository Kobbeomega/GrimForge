import {
  defaultAbilityScores,
} from "../../../compendium/core";

import {
  getAncestryById,
} from "../../../compendium/ancestries";

import {
  getBackgroundById,
} from "../../../compendium/backgrounds";

import {
  equipmentPacks,
  startingEquipment,
} from "../../../compendium/equipment";

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

  const loreBonusSkills =
    character.classId === "bard" && character.subclassId === "college-of-lore" && character.level >= 3
      ? normalizeSkillChoice(character.pathChoices?.["lore-bonus-skills"])
      : [];

  const samuraiBonusSkills =
    character.classId === "fighter" && character.subclassId === "samurai" && character.level >= 3
      ? normalizeSkillChoice(character.pathChoices?.["samurai-bonus-proficiency"])
      : [];

  const invocationBonusSkills =
    character.classId === "warlock" &&
    character.level >= 2 &&
    normalizeRawChoice(character.pathChoices?.["warlock-invocations"]).includes("beguiling-influence")
      ? (["deception", "persuasion"] as SkillId[])
      : [];

  const classSkillProficiencies =
    (
      character.skillProficiencies ?? []
    ).filter(
      (skillId) =>
        !backgroundSkills.includes(skillId) &&
        !loreBonusSkills.includes(skillId) &&
        !samuraiBonusSkills.includes(skillId) &&
        !invocationBonusSkills.includes(skillId),
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

    pathChoices: {
      ...(character.pathChoices ?? {}),
      ...(character.classId === "bard" && character.level >= 3 && !character.pathChoices?.["bard-expertise"] && character.skillExpertise?.length
        ? { "bard-expertise": character.skillExpertise.slice(0, 2) }
        : {}),
      ...(character.classId === "rogue" && !character.pathChoices?.["rogue-expertise"] && character.skillExpertise?.length
        ? { "rogue-expertise": character.skillExpertise.slice(0, 2) }
        : {}),
    },

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

    startingEquipmentSelections:
      character.startingEquipmentSelections?.map((selection) => ({ ...selection })) ??
      inferStartingEquipmentSelections(character),

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
                .filter((selection) => {
                  const rawTome = character.pathChoices?.["warlock-tome-cantrips"];
                  const tomeIds = Array.isArray(rawTome) ? rawTome : rawTome ? [rawTome] : [];
                  return !tomeIds.includes(selection.spellId);
                })
                .map((selection) => ({ ...selection })),

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
function normalizeSkillChoice(value: import("../../../compendium/classes").CharacterPathChoiceValue | undefined): SkillId[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values as SkillId[];
}


function normalizeRawChoice(value: import("../../../compendium/classes").CharacterPathChoiceValue | undefined): string[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function inferStartingEquipmentSelections(character: CharacterArchiveEntry) {
  const configuration = startingEquipment.find((entry) => entry.classId === character.classId);
  if (!configuration || !character.inventory) return [];

  const inventoryQuantities = new Map<string, number>();
  for (const item of character.inventory.items) {
    inventoryQuantities.set(item.id, (inventoryQuantities.get(item.id) ?? 0) + Math.max(0, item.quantity));
  }

  return configuration.choices.flatMap((choice) => {
    const match = choice.options.find((option) => {
      const required = new Map<string, number>();
      for (const item of option.equipment ?? []) {
        required.set(item.equipmentId, (required.get(item.equipmentId) ?? 0) + item.quantity);
      }
      for (const packId of option.packIds ?? []) {
        const pack = equipmentPacks.find((entry) => entry.id === packId);
        for (const item of pack?.items ?? []) {
          required.set(item.equipmentId, (required.get(item.equipmentId) ?? 0) + item.quantity);
        }
      }
      return [...required.entries()].every(([equipmentId, quantity]) =>
        (inventoryQuantities.get(equipmentId) ?? 0) >= quantity,
      );
    });

    return match ? [{ choiceId: choice.id, optionId: match.id }] : [];
  });
}
