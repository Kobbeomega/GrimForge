import { getAncestryAbilityBonuses, applyAbilityBonuses, getAncestryById } from "../compendium/ancestries";
import { getBackgroundById } from "../compendium/backgrounds";
import { getSubclassProficiencyPackage, getSubclassSkillProficiencies } from "../compendium/classes";
import { defaultAbilityScores, type AbilityScores } from "../compendium/core";
import { calculateMaximumHitPoints, buildHitPointsPerLevel } from "../rules/hitPoints";
import { getFeatById } from "../compendium/feats";
import { getEquipmentById, equipment } from "../compendium/equipment";
import type { CharacterArchiveEntry, CharacterInventoryItem, InventoryItemCategory } from "../modules/archives/types";

export const CURRENT_CHARACTER_SCHEMA_VERSION = 7;

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
  const subclassProficiencies = getSubclassProficiencyPackage(input.classId ?? "", input.subclassId, input.level);

  if (
    background?.feature &&
    (
      input.backgroundFeature?.name !== background.feature.name ||
      input.backgroundFeature?.description !== background.feature.description
    )
  ) {
    notes.push("Hintergrundsmerkmal aus dem aktuellen Kompendium aktualisiert.");
  }

  const skillProficiencies = Array.from(new Set([
    ...(input.skillProficiencies ?? []),
    ...(background?.skillProficiencies ?? []),
    ...getSubclassSkillProficiencies(input.classId ?? "", input.subclassId, input.level, input.pathChoices),
  ]));
  const toolProficiencies = Array.from(new Set([
    ...(input.toolProficiencies ?? []),
    ...(background?.toolProficiencies ?? []),
    ...(subclassProficiencies?.tools ?? []),
  ]));

  const inventory = {
    items: [...(input.inventory?.items ?? [])],
    currency: input.inventory?.currency ?? { copper: 0, silver: 0, gold: 0 },
  };
  const existingInventoryIds = new Set(inventory.items.map((item) => item.id));
  const existingInventoryNames = inventory.items.map((item) => normalizeLabel(item.name));
  const backgroundItems = previousVersion < CURRENT_CHARACTER_SCHEMA_VERSION
    ? resolveBackgroundInventory(background?.equipment ?? [], timestamp)
      .filter((item) => {
        if (existingInventoryIds.has(item.id)) return false;
        const candidate = normalizeLabel(item.name);
        return !existingInventoryNames.some((existing) =>
          existing === candidate || existing.includes(candidate) || candidate.includes(existing),
        );
      })
    : [];

  if (backgroundItems.length > 0) {
    inventory.items.push(...backgroundItems);
    notes.push(`${backgroundItems.length} Hintergrund-Ausrüstungseinträge ergänzt.`);
  }

  const ancestry = getAncestryById(input.ancestryId ?? "");
  const variant = ancestry?.variants.find((entry) => entry.id === input.ancestryVariantId);
  const ancestrySpeed = input.ancestryUsesReducedSpeed
    ? 7.5
    : (ancestry?.speed ?? 9) + (variant?.speedBonus ?? 0);
  const storedSpeed = input.vitals?.speed;
  const hasLegacyFastMovement = input.movementBaseVersion === undefined &&
    input.classId === "barbarian" && input.level >= 5 &&
    input.levelUpHistory?.some(({ toLevel }) => toLevel === 5) &&
    storedSpeed === ancestrySpeed + 3;
  const speed = hasLegacyFastMovement ? ancestrySpeed : storedSpeed ?? ancestrySpeed;
  if (hasLegacyFastMovement) notes.push("Gespeicherter Barbarenbonus wird jetzt aus der getragenen Rüstung berechnet.");

  const calculatedMaximumHitPoints = calculateMaximumHitPoints({
    classId: input.classId ?? "",
    level: input.level,
    constitution: abilityScores.constitution,
    bonusPerLevel: buildHitPointsPerLevel(input) + (input.featIds ?? []).reduce((n,id) => n + (getFeatById(id)?.bonuses?.hitPointsPerLevel ?? 0),0),
  });

  const previousMaximumHitPoints = input.vitals?.maximumHitPoints ?? 10;
  const previousCurrentHitPoints = input.vitals?.currentHitPoints ?? previousMaximumHitPoints;
  const missingHitPoints = Math.max(0, previousMaximumHitPoints - previousCurrentHitPoints);

  // A version number cannot tell us whether the campaign used rolled HP.
  const shouldRecalculateHitPoints =
    !(Number.isInteger(input.vitals?.maximumHitPoints) && previousMaximumHitPoints > 0) &&
    calculatedMaximumHitPoints > 0;

  const maximumHitPoints = shouldRecalculateHitPoints
    ? calculatedMaximumHitPoints
    : previousMaximumHitPoints;

  const currentHitPoints = shouldRecalculateHitPoints
    ? Math.max(0, maximumHitPoints - missingHitPoints)
    : Math.min(previousCurrentHitPoints, maximumHitPoints);

  if (shouldRecalculateHitPoints && maximumHitPoints !== previousMaximumHitPoints) {
    notes.push(
      `Maximale Trefferpunkte aus Klasse, Stufe und Konstitution neu berechnet (${previousMaximumHitPoints} → ${maximumHitPoints}).`,
    );
  }

  const migrated: CharacterArchiveEntry = {
    ...input,
    movementBaseVersion: 1,
    schemaVersion: CURRENT_CHARACTER_SCHEMA_VERSION,
    migratedFromSchemaVersion: previousVersion < CURRENT_CHARACTER_SCHEMA_VERSION
      ? previousVersion
      : input.migratedFromSchemaVersion,
    baseAbilityScores,
    abilityScores,
    skillProficiencies,
    toolProficiencies,
    languageChoices: Math.max(input.languageChoices ?? 0, background?.languageChoices ?? 0),
    // Background content is compendium-owned. Refresh stored snapshots whenever
    // the registry has a definition so older characters also receive corrected
    // descriptions and future editorial fixes.
    backgroundName: background?.name ?? input.backgroundName,
    backgroundFeature: background?.feature
      ? { ...background.feature }
      : input.backgroundFeature,
    inventory,
    equipmentIds: Array.from(new Set([
      ...(input.equipmentIds ?? []),
      ...inventory.items.map((item) => item.id),
    ])),
    spellcasting: input.spellcasting ? { ...input.spellcasting, spellIds: Array.from(input.spellcasting.spellIds.reduce((acc, entry) => {
      const id = entry.spellId === "hunters-mark" ? "hunter-s-mark" : entry.spellId;
      acc.set(id, { ...entry, spellId: id, prepared: !!(entry.prepared || acc.get(id)?.prepared) });
      return acc;
    }, new Map<string, (typeof input.spellcasting.spellIds)[number]>()).values()) } : {
      spellIds: [],
      slots: { spentSlots: {}, spentPactSlots: 0 },
    },
    spentClassResources: input.spentClassResources ?? {},
    spentHitDice: Math.min(Math.max(0, input.spentHitDice ?? 0), Math.max(1, input.level)),
    inspiration: input.inspiration ?? false,
    pathChoices: input.pathChoices ?? {},
    vitals: {
      maximumHitPoints,
      currentHitPoints,
      temporaryHitPoints: input.vitals?.temporaryHitPoints ?? 0,
      armorClass: input.vitals?.armorClass ?? 10,
      initiativeModifier:
        Math.floor((abilityScores.dexterity - 10) / 2) +
        (input.classId === "ranger" && input.subclassId === "gloom-stalker" && input.level >= 3
          ? Math.floor((abilityScores.wisdom - 10) / 2)
          : 0),
      speed,
    },
    // Reading a backup isn't a player edit. Keep conflict resolution chronological.
    updatedAt: input.updatedAt,
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

export function resolveBackgroundInventory(labels: string[], timestamp: string): CharacterInventoryItem[] {
  return labels.flatMap((rawLabel, index) => {
    if (/^\d+\s*(?:GM|GP)$/i.test(rawLabel.trim())) {
      return [];
    }
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
        notes: "Startausrüstung aus dem Hintergrund.",
        createdAt: timestamp,
        updatedAt: timestamp,
      }];
    }

    // Auch nicht normalisierte Hintergrundgegenstände bleiben sichtbar und exportierbar.
    return [{
      id: `background-${slugify(rawLabel)}-${index + 1}`,
      name: parsed.name,
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
  const alias: Record<string,string> = {reisekleidung:"travelers-clothes", reisekleider:"travelers-clothes", alltagskleidung:"common-clothes", gürtelbeutel:"pouch", beutel:"pouch", "set gewöhnlicher kleidung":"common-clothes", kräuterkundeaustattung:"herbalism-kit", kräuterkundeausstattung:"herbalism-kit"};
  return getEquipmentById(alias[normalized] ?? "") ?? equipment.find((entry) => {
    const candidate = normalizeLabel(entry.name);
    return candidate === normalized;
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
    case "ammunition": return "consumable";
    case "gear":
    case "focus": return "adventuring-gear";
    default: return "other";
  }
}
