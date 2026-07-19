import { getAncestryAbilityBonuses, applyAbilityBonuses, getAncestryById } from "../compendium/ancestries";
import { getBackgroundById } from "../compendium/backgrounds";
import { defaultAbilityScores, type AbilityScores } from "../compendium/core";
import { getEquipmentById, equipment } from "../compendium/equipment";
import type { CharacterArchiveEntry, CharacterInventoryItem, InventoryItemCategory } from "../modules/archives/types";

export const CURRENT_CHARACTER_SCHEMA_VERSION = 2;

export interface CharacterMigrationResult {
  character: CharacterArchiveEntry;
  changed: boolean;
  notes: string[];
}

export function migrateCharacterArchiveEntry(input: CharacterArchiveEntry): CharacterMigrationResult {
  const notes: string[] = [];
  const timestamp = new Date().toISOString();
  const previousVersion = input.schemaVersion ?? 0;
  const ancestryBonuses = getAncestryAbilityBonuses({
    ancestryId: input.ancestryId,
    variantId: input.ancestryVariantId,
    choices: input.ancestryBonusChoices,
  });

  // Charaktere vor alpha.4 speicherten ihre Point-Buy-Werte in abilityScores.
  // Sobald baseAbilityScores vorhanden ist, ist es immer die maßgebliche Quelle.
  const baseAbilityScores: AbilityScores = normalizeScores(
    input.baseAbilityScores ?? input.abilityScores ?? defaultAbilityScores,
  );
  const abilityScores = applyAbilityBonuses(baseAbilityScores, ancestryBonuses.total);

  if (!input.baseAbilityScores) {
    notes.push("Basisattribute aus dem alten Attributsblock rekonstruiert.");
  }

  if (!scoresEqual(input.abilityScores, abilityScores)) {
    notes.push("Effektive Attribute inklusive Abstammungsboni neu berechnet.");
  }

  const background = getBackgroundById(input.backgroundId ?? "");
  const skillProficiencies = Array.from(new Set([
    ...(input.skillProficiencies ?? []),
    ...(background?.skillProficiencies ?? []),
  ]));
  const toolProficiencies = Array.from(new Set([
    ...(input.toolProficiencies ?? []),
    ...(background?.toolProficiencies ?? []),
  ]));

  const inventory = {
    items: [...(input.inventory?.items ?? [])],
    currency: input.inventory?.currency ?? { copper: 0, silver: 0, gold: 0 },
  };
  const existingInventoryIds = new Set(inventory.items.map((item) => item.id));
  const backgroundItems = resolveBackgroundInventory(background?.equipment ?? [], timestamp)
    .filter((item) => !existingInventoryIds.has(item.id));

  if (backgroundItems.length > 0) {
    inventory.items.push(...backgroundItems);
    notes.push(`${backgroundItems.length} Hintergrund-Ausrüstungseinträge ergänzt.`);
  }

  const ancestry = getAncestryById(input.ancestryId ?? "");
  const variant = ancestry?.variants.find((entry) => entry.id === input.ancestryVariantId);
  const speed = input.ancestryUsesReducedSpeed
    ? 7.5
    : (ancestry?.speed ?? input.vitals?.speed ?? 9) + (variant?.speedBonus ?? 0);

  const migrated: CharacterArchiveEntry = {
    ...input,
    schemaVersion: CURRENT_CHARACTER_SCHEMA_VERSION,
    migratedFromSchemaVersion: previousVersion < CURRENT_CHARACTER_SCHEMA_VERSION
      ? previousVersion
      : input.migratedFromSchemaVersion,
    baseAbilityScores,
    abilityScores,
    skillProficiencies,
    toolProficiencies,
    languageChoices: Math.max(input.languageChoices ?? 0, background?.languageChoices ?? 0),
    backgroundName: input.backgroundName ?? background?.name,
    backgroundFeature: input.backgroundFeature ?? background?.feature,
    inventory,
    equipmentIds: Array.from(new Set([
      ...(input.equipmentIds ?? []),
      ...inventory.items.map((item) => item.id),
    ])),
    spellcasting: input.spellcasting ?? {
      spellIds: [],
      slots: { spentSlots: {}, spentPactSlots: 0 },
    },
    spentClassResources: input.spentClassResources ?? {},
    vitals: {
      maximumHitPoints: input.vitals?.maximumHitPoints ?? 10,
      currentHitPoints: input.vitals?.currentHitPoints ?? input.vitals?.maximumHitPoints ?? 10,
      temporaryHitPoints: input.vitals?.temporaryHitPoints ?? 0,
      armorClass: input.vitals?.armorClass ?? 10,
      initiativeModifier: Math.floor((abilityScores.dexterity - 10) / 2),
      speed,
    },
    updatedAt: notes.length > 0 ? timestamp : input.updatedAt,
  };

  return {
    character: migrated,
    changed: notes.length > 0 || previousVersion !== CURRENT_CHARACTER_SCHEMA_VERSION,
    notes,
  };
}

export function migrateCharacterArchiveEntries(characters: CharacterArchiveEntry[]): {
  characters: CharacterArchiveEntry[];
  migratedCount: number;
  warnings: string[];
} {
  let migratedCount = 0;
  const warnings: string[] = [];
  const migrated = characters.map((character) => {
    const result = migrateCharacterArchiveEntry(character);
    if (result.changed) {
      migratedCount += 1;
      if (result.notes.length > 0) {
        warnings.push(`${character.name}: ${result.notes.join(" ")}`);
      }
    }
    return result.character;
  });
  return { characters: migrated, migratedCount, warnings };
}

function normalizeScores(value: Partial<AbilityScores>): AbilityScores {
  return {
    strength: normalizeScore(value.strength),
    dexterity: normalizeScore(value.dexterity),
    constitution: normalizeScore(value.constitution),
    intelligence: normalizeScore(value.intelligence),
    wisdom: normalizeScore(value.wisdom),
    charisma: normalizeScore(value.charisma),
  };
}

function normalizeScore(value: number | undefined): number {
  return Number.isFinite(value) ? Math.max(1, Math.min(30, Math.round(value ?? 10))) : 10;
}

function scoresEqual(left: AbilityScores | undefined, right: AbilityScores): boolean {
  return Boolean(left) && Object.keys(right).every((key) =>
    left?.[key as keyof AbilityScores] === right[key as keyof AbilityScores],
  );
}

function resolveBackgroundInventory(labels: string[], timestamp: string): CharacterInventoryItem[] {
  return labels.flatMap((rawLabel, index) => {
    const parsed = parseEquipmentLabel(rawLabel);
    const definition = findEquipmentDefinition(parsed.name);
    if (definition) {
      return [{
        id: definition.id,
        name: definition.name,
        category: mapInventoryCategory(definition.category),
        quantity: parsed.quantity,
        weight: definition.weight * 0.45359237,
        equipped: false,
        notes: "Automatisch aus dem Hintergrund ergänzt.",
        createdAt: timestamp,
        updatedAt: timestamp,
      }];
    }

    // Auch nicht normalisierte Hintergrundgegenstände bleiben sichtbar und exportierbar.
    return [{
      id: `background-${slugify(rawLabel)}-${index + 1}`,
      name: rawLabel,
      category: "other" as const,
      quantity: parsed.quantity,
      weight: 0,
      equipped: false,
      notes: "Hintergrundgegenstand ohne passenden Kompendiumseintrag.",
      createdAt: timestamp,
      updatedAt: timestamp,
    }];
  });
}

function parseEquipmentLabel(value: string): { name: string; quantity: number } {
  const match = value.trim().match(/^(\d+)\s*[x×]?\s+(.+)$/i);
  return match
    ? { quantity: Math.max(1, Number(match[1])), name: match[2] }
    : { quantity: 1, name: value.trim() };
}

function findEquipmentDefinition(name: string) {
  const normalized = normalizeLabel(name);
  return equipment.find((entry) => {
    const candidate = normalizeLabel(entry.name);
    return candidate === normalized || normalized.includes(candidate) || candidate.includes(normalized);
  }) ?? getEquipmentById(slugify(name));
}

function normalizeLabel(value: string): string {
  return value.toLocaleLowerCase("de")
    .replace(/\([^)]*\)/g, "")
    .replace(/\b(ein|eine|einen|einem|einer|nach wahl|set|stück)\b/g, "")
    .replace(/[^a-z0-9äöüß]+/g, " ")
    .trim();
}

function slugify(value: string): string {
  return value.toLocaleLowerCase("de")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item";
}

function mapInventoryCategory(category: string): InventoryItemCategory {
  switch (category) {
    case "weapon": return "weapon";
    case "armor":
    case "shield": return "armor";
    case "consumable": return "consumable";
    case "tool": return "tool";
    case "gear":
    case "focus":
    case "ammunition": return "adventuring-gear";
    default: return "other";
  }
}
