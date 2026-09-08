import type { CharacterArchiveEntry } from "../../archives/types";
import { calculateMaximumHitPoints } from "../../../rules/hitPoints";
import { getFeatById } from "../../../compendium/feats";

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
  const originalItemsById = new Map(
    originalInventory.items.map((item) => [item.id, item]),
  );

  const mergedItems = previewInventory.items.map((item) => {
    const existing = originalItemsById.get(item.id);
    return existing
      ? {
          ...item,
          quantity: existing.quantity,
          weight: existing.weight,
          equipped: existing.equipped,
          notes: existing.notes,
          createdAt: existing.createdAt,
          updatedAt: existing.updatedAt,
        }
      : item;
  });

  const previewItemIds = new Set(mergedItems.map((item) => item.id));
  for (const item of originalInventory.items) {
    if (!previewItemIds.has(item.id)) mergedItems.push({ ...item });
  }

  const oldMaximum =
    original.vitals?.maximumHitPoints ?? preview.vitals?.maximumHitPoints ?? 0;
  const oldCurrent = original.vitals?.currentHitPoints ?? oldMaximum;
  const damageTaken = Math.max(0, oldMaximum - oldCurrent);
  const originalCalculatedMaximum = calculateMaximumHitPoints({
    classId: original.classId ?? "", level: original.level,
    constitution: original.abilityScores?.constitution ?? 10,
    bonusPerLevel:
      (original.classId === "sorcerer" && original.subclassId === "draconic-bloodline" ? 1 : 0) +
      (original.featIds ?? []).reduce((sum, featId) => sum + (getFeatById(featId)?.bonuses?.hitPointsPerLevel ?? 0), 0),
  });
  const preserveRolledHitPoints = Boolean(original.levelUpHistory?.length) && original.classId === preview.classId && original.level === preview.level;
  const newMaximum = Math.max(1, (preview.vitals?.maximumHitPoints ?? oldMaximum) +
    (preserveRolledHitPoints ? oldMaximum - originalCalculatedMaximum : 0));

  return {
    ...preview,
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
        ...(preview.equipmentIds ?? []),
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
