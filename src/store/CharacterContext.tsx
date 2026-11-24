import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";


import type { CharacterArchiveEntry } from "../modules/archives/types";
import { downloadArchiveText } from "../modules/archives/io/characterArchiveIO";
import { readStoredArchive } from "./readStoredArchive";
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
    explicitlyReplace?: boolean,
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
  const [loaded] = useState(() => {
    try { return { ...readStoredArchive(window.localStorage.getItem(STORAGE_KEY)), unavailable: false }; }
    catch { return { ...readStoredArchive(null), unavailable: true }; }
  });
  const [characters, setCharacters] = useState(loaded.characters);
  const [protectedRaw, setProtectedRaw] = useState(loaded.protectedRaw);
  const [writeFailed, setWriteFailed] = useState(false);

  useEffect(() => {
    if (protectedRaw !== null || loaded.unavailable) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(characters)); setWriteFailed(false); }
    catch { setWriteFailed(true); }
  }, [characters, protectedRaw, loaded]);

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
    explicitlyReplace = false,
  ) {
    if (explicitlyReplace) setProtectedRaw(null);
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
      {protectedRaw !== null ? <aside role="alert" className="archive-recovery">
        <strong>Archiv geschützt · Nicht alle Akten konnten gelesen werden.</strong>
        <p>Der Originalspeicher bleibt unverändert. Änderungen in dieser Sitzung sind nur vorläufig. Sichere zuerst die Rohdaten. Unter „Datensicherung“ kannst du anschließend eine geprüfte Datei mit „Archiv ersetzen“ wiederherstellen.</p>
        <button type="button" onClick={() => downloadArchiveText(protectedRaw, "grimforge-originalspeicher.json")}>Originaldaten herunterladen</button>
      </aside> : (writeFailed || loaded.unavailable) && <p role="alert" className="archive-recovery">Der Browser kann dein Archiv nicht speichern. Exportiere deine Akten unter „Datensicherung“, bevor du die Seite schließt.</p>}
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

