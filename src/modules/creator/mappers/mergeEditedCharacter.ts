import { resolveCharacterTransformation } from "../../../compendium/transformations/activeRecord";
import type { CharacterArchiveEntry } from "../../archives/types";
import { buildHitPointsPerLevel, calculateMaximumHitPoints } from "../../../rules/hitPoints";
import { getFeatById } from "../../../compendium/feats";
import { mapArchiveEntryToDraft } from "./mapArchiveEntryToDraft";
import { mapDraftToArchiveEntry } from "./mapDraftToArchiveEntry";

/**
 * Merges creator-owned character-definition changes with sheet/session state.
 * Editing identity/build choices must never silently heal a character, erase
 * notes, reset resources, or delete inventory acquired during play.
 */
export function mergeEditedCharacter(
  preview: CharacterArchiveEntry,
  original: CharacterArchiveEntry,
): CharacterArchiveEntry {
  const previewInventory = preview.inventory ?? {
    items: [],
    currency: { copper: 0, silver: 0, gold: 0 },
  };
  const originalInventory = original.inventory ?? {
    items: [],
    currency: { copper: 0, silver: 0, gold: 0 },
  };
  // The current pack is authoritative, even if the player consumed or sold
  // a starting item. Only a newly selected grant may add a missing item.
  const initialKit = mapDraftToArchiveEntry(mapArchiveEntryToDraft(original)).inventory;
  const retained = new Set([...originalInventory.items, ...(initialKit?.items ?? [])].map(i => i.id));
  const mergedItems = [...originalInventory.items, ...previewInventory.items.filter(i => !retained.has(i.id))];

  const oldMaximum =
    original.vitals?.maximumHitPoints ?? preview.vitals?.maximumHitPoints ?? 0;
  const oldCurrent = original.vitals?.currentHitPoints ?? oldMaximum;
  const damageTaken = Math.max(0, oldMaximum - oldCurrent);
  const originalCalculatedMaximum = calculateMaximumHitPoints({
    classId: original.classId ?? "", level: original.level,
    constitution: original.abilityScores?.constitution ?? 10,
    bonusPerLevel: buildHitPointsPerLevel(original),
  });
  const preserveRolledHitPoints = !!original.vitals && original.classId === preview.classId && original.level === preview.level;
  const featHp = (original.featIds ?? []).reduce((n,id) => n + (getFeatById(id)?.bonuses?.hitPointsPerLevel ?? 0), 0);
  const newMaximum = Math.max(1, (preview.vitals?.maximumHitPoints ?? oldMaximum) +
    (preserveRolledHitPoints ? oldMaximum - originalCalculatedMaximum : featHp * preview.level));

  const previousTransformation=resolveCharacterTransformation(original);
  const preserveUnknownTransformation=Boolean(previousTransformation.name && !previousTransformation.definition && !preview.transformationId);
  return {
    ...preview,
    conditionIds: original.conditionIds?.slice(),
    exhaustionLevel: original.exhaustionLevel,
    deathSaves: original.deathSaves && { ...original.deathSaves },
    migratedFromSchemaVersion: original.migratedFromSchemaVersion,
    sealId: original.sealId,
    ...(preserveUnknownTransformation ? { transformation: original.transformation, transformationId: original.transformationId, transformationStage: original.transformationStage, transformationFeatureIds: original.transformationFeatureIds } : {}),
    status: original.status,
    createdAt: original.createdAt ?? preview.createdAt,
    updatedAt: new Date().toISOString(),
    journal: original.journal,
    levelUpHistory: original.levelUpHistory,
    featIds: original.featIds,
    featChoices: original.featChoices,
    spellcasting: preview.spellcasting ? {
      ...preview.spellcasting,
      slots: structuredClone(original.spellcasting?.slots ?? { spentSlots: {}, spentPactSlots: 0 }),
    } : original.spellcasting,
    inspiration: original.inspiration ?? false,
    spentClassResources: { ...(original.spentClassResources ?? {}) },
    spentHitDice: Math.min(
      Math.max(0, original.spentHitDice ?? 0),
      Math.max(1, preview.level),
    ),
    inventory: {
      items: mergedItems,
      currency: { ...originalInventory.currency },
    },
    equipmentIds: Array.from(
      new Set([
        ...mergedItems.map((item) => item.id),
      ]),
    ),
    vitals: preview.vitals
      ? {
          ...preview.vitals,
          maximumHitPoints: newMaximum,
          currentHitPoints: Math.max(
            0,
            Math.min(newMaximum, newMaximum - damageTaken),
          ),
          temporaryHitPoints: original.vitals?.temporaryHitPoints ?? 0,
        }
      : original.vitals,
  };
}
