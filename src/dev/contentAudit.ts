import { ancestries } from "../compendium/ancestries";
import { classes } from "../compendium/classes";
import { backgrounds } from "../compendium/backgrounds";
import { classSkillChoices } from "../compendium/classes/skillChoices";
import { armor, equipment, weapons } from "../compendium/equipment";
import { startingEquipment } from "../compendium/equipment/startingEquipment";
import { spells } from "../compendium/spells";
import { transformations } from "../compendium/transformations";
import { hasDedicatedArtwork, type ArtworkCategory } from "../artwork";

export interface AuditIssue {
  area: string;
  message: string;
}

export interface AuditResult {
  issues: AuditIssue[];
  totals: Record<string, number>;
}

function findDuplicateIds<T extends { id: string }>(area: string, entries: T[]): AuditIssue[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const entry of entries) {
    if (seen.has(entry.id)) duplicates.add(entry.id);
    seen.add(entry.id);
  }

  return [...duplicates].map((id) => ({ area, message: `Doppelte ID: ${id}` }));
}

function findMissingArtwork<T extends { id: string }>(
  area: string,
  category: ArtworkCategory,
  entries: T[],
): AuditIssue[] {
  return entries
    .filter((entry) => !hasDedicatedArtwork(category, entry.id))
    .map((entry) => ({ area, message: `Kein individuelles Artwork: ${entry.id}` }));
}

export function auditContent(): AuditResult {
  const issues: AuditIssue[] = [
    ...findDuplicateIds("Abstammungen", ancestries),
    ...findDuplicateIds("Klassen", classes),
    ...findDuplicateIds("Hintergründe", backgrounds),
    ...findDuplicateIds("Verwandlungen", transformations),
    ...findDuplicateIds("Ausrüstung", equipment),
    ...findDuplicateIds("Zauber", spells),
    ...backgrounds.filter((entry) => !entry.description.trim()).map((entry) => ({ area: "Hintergründe", message: `Leere Beschreibung: ${entry.id}` })),
    ...backgrounds.filter((entry) => !entry.feature?.name.trim() || !entry.feature?.description.trim()).map((entry) => ({ area: "Hintergründe", message: `Unvollständiges Merkmal: ${entry.id}` })),
    ...spells.filter((entry) => !entry.name.trim()).map((entry) => ({ area: "Zauber", message: `Leerer Name: ${entry.id}` })),
    ...findMissingArtwork("Abstammungen", "ancestry", ancestries),
    ...findMissingArtwork("Klassen", "class", classes),
    ...findMissingArtwork("Verwandlungen", "transformation", transformations),
  ];

  const classIds = new Set(classes.map((entry) => entry.id));

  for (const definition of classSkillChoices) {
    if (!classIds.has(definition.classId)) {
      issues.push({
        area: "Fertigkeiten",
        message: `Klassenreferenz ohne Klasse: ${definition.classId}`,
      });
    }
  }

  for (const definition of startingEquipment) {
    if (!classIds.has(definition.classId)) {
      issues.push({
        area: "Startausrüstung",
        message: `Klassenreferenz ohne Klasse: ${definition.classId}`,
      });
    }
  }

  for (const entry of classes) {
    if (!classSkillChoices.some((definition) => definition.classId === entry.id)) {
      issues.push({ area: "Fertigkeiten", message: `Keine Fertigkeitsauswahl: ${entry.id}` });
    }

    if (!startingEquipment.some((definition) => definition.classId === entry.id)) {
      issues.push({ area: "Startausrüstung", message: `Keine Startausrüstung: ${entry.id}` });
    }
  }

  return {
    issues,
    totals: {
      ancestries: ancestries.length,
      classes: classes.length,
      transformations: transformations.length,
      backgrounds: backgrounds.length,
      weapons: weapons.length,
      armor: armor.length,
      equipment: equipment.length,
      spells: spells.length,
    },
  };
}

export function runContentAudit(): void {
  const result = auditContent();
  const title = `[GrimForge Content Audit] ${result.issues.length === 0 ? "OK" : `${result.issues.length} Hinweise`}`;

  if (result.issues.length === 0) {
    console.info(title, result.totals);
    return;
  }

  console.groupCollapsed(title);
  console.table(result.issues);
  console.info("Bestand", result.totals);
  console.groupEnd();
}
