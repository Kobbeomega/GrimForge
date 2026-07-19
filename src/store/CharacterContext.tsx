import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";


import type { CharacterArchiveEntry } from "../modules/archives/types";
import { migrateCharacterArchiveEntries, migrateCharacterArchiveEntry } from "../migrations/characterSchema";

interface CharacterContextValue {
  characters: CharacterArchiveEntry[];

  createCharacter: (
    character: CharacterArchiveEntry,
  ) => void;

  updateCharacter: (
    character: CharacterArchiveEntry,
  ) => void;

  deleteCharacter: (
    characterId: string,
  ) => void;

  replaceCharacters: (
    characters: CharacterArchiveEntry[],
  ) => void;

  resetCharacters: () => void;
}

const STORAGE_KEY =
  "grimforge.characters.v1";

const CharacterContext =
  createContext<CharacterContextValue | null>(null);

interface CharacterProviderProps {
  children: ReactNode;
}

export function CharacterProvider({
  children,
}: CharacterProviderProps) {
  const [characters, setCharacters] = useState<
    CharacterArchiveEntry[]
  >(() => loadCharacters());

  useEffect(() => {
    saveCharacters(characters);
  }, [characters]);

  function createCharacter(
    character: CharacterArchiveEntry,
  ) {
    const migratedCharacter = migrateCharacterArchiveEntry(character).character;
    setCharacters((currentCharacters) => {
      const alreadyExists =
        currentCharacters.some(
          (entry) => entry.id === migratedCharacter.id,
        );

      if (alreadyExists) {
        return currentCharacters.map((entry) =>
          entry.id === migratedCharacter.id
            ? migratedCharacter
            : entry,
        );
      }

      return [
        ...currentCharacters,
        migratedCharacter,
      ];
    });
  }

  function updateCharacter(
    character: CharacterArchiveEntry,
  ) {
    const migratedCharacter = migrateCharacterArchiveEntry(character).character;
    setCharacters((currentCharacters) =>
      currentCharacters.map((entry) =>
        entry.id === migratedCharacter.id
          ? migratedCharacter
          : entry,
      ),
    );
  }

  function deleteCharacter(
    characterId: string,
  ) {
    setCharacters((currentCharacters) =>
      currentCharacters.filter(
        (entry) =>
          entry.id !== characterId,
      ),
    );
  }

  function replaceCharacters(
    nextCharacters: CharacterArchiveEntry[],
  ) {
    setCharacters(migrateCharacterArchiveEntries(nextCharacters).characters);
  }

  function resetCharacters() {
  setCharacters([]);
}

  const value = useMemo<CharacterContextValue>(
    () => ({
      characters,
      createCharacter,
      updateCharacter,
      deleteCharacter,
      replaceCharacters,
      resetCharacters,
    }),
    [characters],
  );

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacterContext() {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error(
      "useCharacterContext muss innerhalb eines CharacterProvider verwendet werden.",
    );
  }

  return context;
}

function loadCharacters(): CharacterArchiveEntry[] {
  try {
    const storedValue =
      window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
  return [];
}

    const parsedValue: unknown =
      JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
  return [];
}

    return migrateCharacterArchiveEntries(parsedValue as CharacterArchiveEntry[]).characters;
  } catch {
  return [];
}
  }


function saveCharacters(
  characters: CharacterArchiveEntry[],
) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(characters),
    );
  } catch {
    // Die App bleibt benutzbar, auch wenn der Browser
    // lokalen Speicher blockiert oder das Limit erreicht ist.
  }
}