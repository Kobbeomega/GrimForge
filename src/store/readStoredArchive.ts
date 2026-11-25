import { migrateCharacterArchiveEntry } from "../migrations/characterSchema";
import { isCharacterArchiveEntry } from "../modules/archives/io/characterArchiveIO";
import type { CharacterArchiveEntry } from "../modules/archives/types";

export function readStoredArchive(raw: string | null) {
  const characters: CharacterArchiveEntry[] = [];
  if (raw === null) return { characters, protectedRaw: null };
  try {
    const entries: unknown = JSON.parse(raw);
    if (Array.isArray(entries)) {
      for (const entry of entries) {
        if (!isCharacterArchiveEntry(entry)) continue;
        try { characters.push(migrateCharacterArchiveEntry(entry).character); }
        catch { /* Keep the original bytes available for recovery. */ }
      }
      if (characters.length === entries.length) return { characters, protectedRaw: null };
    }
  } catch { /* Invalid JSON must not be overwritten with an empty list. */ }
  return { characters, protectedRaw: raw };
}
