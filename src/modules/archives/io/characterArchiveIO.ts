import type { CharacterArchiveEntry } from "../types";
import { migrateCharacterArchiveEntries } from "../../../migrations/characterSchema";

const FORMAT = "grimforge-character-archive";
const VERSION = 2;

interface CharacterArchiveEnvelope {
  format: typeof FORMAT;
  version: typeof VERSION;
  exportedAt: string;
  characters: CharacterArchiveEntry[];
}

export interface CharacterImportResult {
  characters: CharacterArchiveEntry[];
  warnings: string[];
}

export function exportCharacterArchive(
  characters: CharacterArchiveEntry[],
  fileName = createArchiveFileName(),
): void {
  const envelope: CharacterArchiveEnvelope = {
    format: FORMAT,
    version: VERSION,
    exportedAt: new Date().toISOString(),
    characters,
  };

  downloadJson(envelope, fileName);
}

export function exportSingleCharacter(
  character: CharacterArchiveEntry,
): void {
  const safeName = toSafeFileName(character.name || character.fileNumber || "charakter");
  exportCharacterArchive([character], `grimforge-${safeName}.json`);
}

export async function readCharacterArchiveFile(
  file: File,
): Promise<CharacterImportResult> {
  const raw = await file.text();
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Die gewählte Datei enthält kein gültiges JSON.");
  }

  const candidates = extractCharacters(parsed);
  const warnings: string[] = [];
  const characters = candidates.filter((candidate, index): candidate is CharacterArchiveEntry => {
    const valid = isCharacterArchiveEntry(candidate);
    if (!valid) {
      warnings.push(`Eintrag ${index + 1} wurde übersprungen, weil Pflichtfelder fehlen.`);
    }
    return valid;
  });

  if (characters.length === 0) {
    throw new Error("Die Datei enthält keine gültigen GrimForge-Charakterakten.");
  }

  const migration = migrateCharacterArchiveEntries(characters);
  warnings.push(...migration.warnings);
  return { characters: migration.characters, warnings };
}

export function mergeCharacterArchives(
  current: CharacterArchiveEntry[],
  incoming: CharacterArchiveEntry[],
): CharacterArchiveEntry[] {
  const migratedCurrent = migrateCharacterArchiveEntries(current).characters;
  const migratedIncoming = migrateCharacterArchiveEntries(incoming).characters;
  const merged = new Map(migratedCurrent.map((character) => [character.id, character]));

  migratedIncoming.forEach((character) => {
    const existing = merged.get(character.id);
    if (!existing || getTimestamp(character.updatedAt) >= getTimestamp(existing.updatedAt)) {
      merged.set(character.id, character);
    }
  });

  return Array.from(merged.values()).sort((left, right) =>
    left.name.localeCompare(right.name, "de"),
  );
}

function extractCharacters(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (!isRecord(value)) {
    return [];
  }

  if (value.format === FORMAT && Array.isArray(value.characters)) {
    return value.characters;
  }

  if (Array.isArray(value.characters)) {
    return value.characters;
  }

  return [];
}

function isCharacterArchiveEntry(value: unknown): value is CharacterArchiveEntry {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.fileNumber === "string" &&
    typeof value.name === "string" &&
    typeof value.ancestry === "string" &&
    typeof value.className === "string" &&
    typeof value.level === "number" &&
    Number.isFinite(value.level) &&
    typeof value.summary === "string" &&
    isCharacterStatus(value.status) &&
    typeof value.updatedAt === "string"
  );
}

function isCharacterStatus(value: unknown): boolean {
  return value === "active" || value === "draft" || value === "retired" || value === "deceased";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function downloadJson(value: unknown, fileName: string): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function createArchiveFileName(): string {
  return `grimforge-sicherung-${new Date().toISOString().slice(0, 10)}.json`;
}

function toSafeFileName(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("de")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "charakter";
}

function getTimestamp(value: string): number {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}
