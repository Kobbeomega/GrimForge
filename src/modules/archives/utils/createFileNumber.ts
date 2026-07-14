import type { CharacterArchiveEntry } from "../types";

/**
 * Ermittelt die nächste fortlaufende Aktennummer.
 *
 * Beispiele:
 * Keine Akten              → Akte 001
 * Akte 001, Akte 002       → Akte 003
 * Akte 001, Akte 004       → Akte 005
 */
export function createFileNumber(
  characters: CharacterArchiveEntry[],
): string {
  const highestFileNumber = characters.reduce(
    (highestNumber, character) => {
      const match = character.fileNumber.match(
        /(\d+)$/,
      );

      if (!match) {
        return highestNumber;
      }

      const currentNumber = Number(match[1]);

      if (!Number.isFinite(currentNumber)) {
        return highestNumber;
      }

      return Math.max(
        highestNumber,
        currentNumber,
      );
    },
    0,
  );

  const nextFileNumber = highestFileNumber + 1;

  return `Akte ${String(
    nextFileNumber,
  ).padStart(3, "0")}`;
}