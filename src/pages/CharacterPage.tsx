import { useMemo, useState } from "react";

import { useCharacters } from "../hooks/useCharacters";

import { createFileNumber } from "../modules/archives/utils/createFileNumber";
import { CharacterCreator } from "../modules/creator/CharacterCreator";
import { mapArchiveEntryToDraft } from "../modules/creator/mappers/mapArchiveEntryToDraft";

import { CharacterArchivePage } from "./CharacterArchivePage";
import { CharacterSheetPage } from "./CharacterSheetPage";

import type { CharacterArchiveEntry } from "../modules/archives/types";
import type { CharacterCreatorDraft } from "../modules/creator/types";

export type CharacterView =
  | "archive"
  | "creator"
  | "sheet";

export function CharacterPage() {
  const [view, setView] =
    useState<CharacterView>("archive");

  const [
    selectedCharacterId,
    setSelectedCharacterId,
  ] = useState<string | null>(null);

  const [
    editingDraft,
    setEditingDraft,
  ] = useState<
    CharacterCreatorDraft | undefined
  >(undefined);

  const {
    characters,
    createCharacter,
    updateCharacter,
  } = useCharacters();

  const nextFileNumber = useMemo(
    () => createFileNumber(characters),
    [characters],
  );

  const selectedCharacter =
    characters.find(
      (character) =>
        character.id ===
        selectedCharacterId,
    ) ?? null;

  function handleCreateRequest() {
    setEditingDraft(undefined);
    setSelectedCharacterId(null);
    setView("creator");
  }

  function handleOpenCharacter(
    characterId: string,
  ) {
    setSelectedCharacterId(characterId);
    setView("sheet");
  }

  function handleEditCharacter(
    characterId: string,
  ) {
    const character = characters.find(
      (entry) =>
        entry.id === characterId,
    );

    if (!character) {
      return;
    }

    setSelectedCharacterId(character.id);

    setEditingDraft(
      mapArchiveEntryToDraft(character),
    );

    setView("creator");
  }

  function handleCharacterFinished(
    character: CharacterArchiveEntry,
  ) {
    const alreadyExists =
      characters.some(
        (entry) =>
          entry.id === character.id,
      );

    if (alreadyExists) {
      updateCharacter(character);
    } else {
      createCharacter(character);
    }

    setEditingDraft(undefined);
    setSelectedCharacterId(
      character.id,
    );
    setView("sheet");
  }

  function handleCancelCreator() {
    setEditingDraft(undefined);
    setView("archive");
  }

  function handleBackToArchive() {
    setSelectedCharacterId(null);
    setView("archive");
  }

  if (view === "creator") {
    return (
      <CharacterCreator
        fileNumber={
          editingDraft?.fileNumber ??
          nextFileNumber
        }
        initialDraft={editingDraft}
        onCancel={handleCancelCreator}
        onFinished={
          handleCharacterFinished
        }
      />
    );
  }

  if (
    view === "sheet" &&
    selectedCharacter
  ) {
    return (
      <CharacterSheetPage
        character={selectedCharacter}
        onBack={handleBackToArchive}
        onUpdateCharacter={
          updateCharacter
        }
      />
    );
  }

  return (
    <CharacterArchivePage
      onCreateRequest={
        handleCreateRequest
      }
      onOpenCharacter={
        handleOpenCharacter
      }
      onEditCharacter={
        handleEditCharacter
      }
    />
  );
}