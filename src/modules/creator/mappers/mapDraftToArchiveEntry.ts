import { ancestries } from "../../../compendium/ancestries";
import { classes } from "../../../compendium/classes";

import type { CharacterArchiveEntry } from "../../archives/types";
import type { CharacterCreatorDraft } from "../types";

export function mapDraftToArchiveEntry(
  draft: CharacterCreatorDraft,
): CharacterArchiveEntry {
  const selectedAncestry = ancestries.find(
    (entry) => entry.id === draft.ancestryId,
  );

  const selectedVariant =
    selectedAncestry?.variants.find(
      (entry) =>
        entry.id === draft.ancestryVariantId,
    );

  const selectedClass = classes.find(
    (entry) => entry.id === draft.classId,
  );

  const selectedSubclass =
    selectedClass?.subclasses.find(
      (entry) => entry.id === draft.subclassId,
    );

  const ancestryLabel = selectedAncestry
    ? selectedVariant
      ? `${selectedAncestry.name} · ${selectedVariant.name}`
      : selectedAncestry.name
    : "Nicht festgelegt";

  return {
    id: draft.id,

    fileNumber: draft.fileNumber,

    name:
      draft.identity.name.trim() ||
      "Unbenannte Akte",

    title:
      draft.identity.title.trim() ||
      undefined,

    pronouns:
      draft.identity.pronouns.trim() ||
      undefined,

    alignment:
      draft.identity.alignment.trim() ||
      undefined,

    ancestry: ancestryLabel,

    ancestryId:
      draft.ancestryId || undefined,

    ancestryVariantId:
      draft.ancestryVariantId || undefined,

    ancestryBonusChoices: [
      ...draft.ancestryBonusChoices,
    ],

    className:
      selectedClass?.name ??
      "Nicht festgelegt",

    classId:
      draft.classId || undefined,

    subclass:
      selectedSubclass?.name,

    subclassId:
      draft.subclassId || undefined,

    level: draft.level,

    abilityScores: {
      ...draft.baseAbilities,
    },
vitals: {
  maximumHitPoints: 10,

  currentHitPoints: 10,

  temporaryHitPoints: 0,

  armorClass: 10,

  initiativeModifier: Math.floor(
    ((draft.baseAbilities.dexterity ?? 10) - 10) / 2,
  ),

  speed: 9,
},
    equipmentIds: [
      ...draft.equipmentIds,
    ],

    summary:
      draft.identity.summary.trim() ||
      "Noch keine Beschreibung vorhanden.",

    status: "draft",

    createdAt: draft.createdAt,

    updatedAt: draft.updatedAt,

    transformation:
      draft.transformationId || undefined,

    transformationId:
      draft.transformationId || undefined,

    transformationStage:
      draft.transformationStage || undefined,
  };
}