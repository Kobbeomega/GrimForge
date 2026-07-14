import {
  useMemo,
  useState,
} from "react";

import { ChapterHeader } from "../components/ui/ChapterHeader";
import { GrimButton } from "../components/ui/GrimButton";
import { PaperPage } from "../components/ui/PaperPage";

import { useCharacters } from "../hooks/useCharacters";

import { CharacterArchiveList } from "../modules/archives/components/CharacterArchiveList";
import { CharacterArchiveToolbar } from "../modules/archives/components/CharacterArchiveToolbar";

import type {
  CharacterArchiveEntry,
  CharacterStatus,
} from "../modules/archives/types";

interface CharacterArchivePageProps {
  onCreateRequest?: () => void;

  onOpenCharacter?: (
    characterId: string,
  ) => void;

  onEditCharacter?: (
    characterId: string,
  ) => void;
}

export function CharacterArchivePage({
  onCreateRequest,
  onOpenCharacter,
  onEditCharacter,
}: CharacterArchivePageProps) {
  const {
    characters,
    deleteCharacter,
  } = useCharacters();

  const [
    selectedCharacterId,
    setSelectedCharacterId,
  ] = useState<string | undefined>(
    characters[0]?.id,
  );

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    CharacterStatus | "all"
  >("all");

  const filteredCharacters = useMemo(
    () => {
      const normalizedSearchTerm =
        searchTerm
          .trim()
          .toLocaleLowerCase("de");

      return characters.filter(
        (character) => {
          const matchesStatus =
            statusFilter === "all" ||
            character.status ===
              statusFilter;

          if (!matchesStatus) {
            return false;
          }

          if (
            !normalizedSearchTerm
          ) {
            return true;
          }

          const searchableContent = [
            character.name,
            character.fileNumber,
            character.ancestry,
            character.className,
            character.subclass ?? "",
            character.transformation ??
              "",
            character.summary,
          ]
            .join(" ")
            .toLocaleLowerCase("de");

          return searchableContent.includes(
            normalizedSearchTerm,
          );
        },
      );
    },
    [
      characters,
      searchTerm,
      statusFilter,
    ],
  );

  function handleCreateCharacter() {
    onCreateRequest?.();
  }

  function handleOpenCharacter(
    characterId: string,
  ) {
    setSelectedCharacterId(
      characterId,
    );

    onOpenCharacter?.(
      characterId,
    );
  }

  function handleEditCharacter(
    characterId: string,
  ) {
    setSelectedCharacterId(
      characterId,
    );

    onEditCharacter?.(
      characterId,
    );
  }

  function handleDeleteCharacter(
    characterId: string,
  ) {
    const character =
      findCharacter(
        characters,
        characterId,
      );

    if (!character) {
      return;
    }

    const confirmed =
      window.confirm(
        `Soll die Akte „${character.name}“ wirklich gelöscht werden?`,
      );

    if (!confirmed) {
      return;
    }

    deleteCharacter(characterId);

    if (
      selectedCharacterId ===
      characterId
    ) {
      setSelectedCharacterId(
        undefined,
      );
    }
  }

  return (
    <PaperPage>
      <ChapterHeader
        chapter="Kapitel I · Die Akte"
        title="Charakter"
        subtitle="Erschaffe, verwalte und bewahre deine Spielfigur."
      />

      <div className="intro-copy">
        <p>
          Öffne eine bestehende
          Charakterakte oder beginne ein
          neues Schicksal. Alle Akten
          werden lokal auf deinem Gerät
          gespeichert.
        </p>
      </div>

      <div className="intro-actions">
        <GrimButton
          type="button"
          onClick={
            handleCreateCharacter
          }
        >
          Neue Akte anlegen
        </GrimButton>
      </div>

      <CharacterArchiveToolbar
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={
          setSearchTerm
        }
        onStatusFilterChange={
          setStatusFilter
        }
      />

      <div className="character-archive-results">
        <span>
          {filteredCharacters.length}{" "}
          {filteredCharacters.length ===
          1
            ? "Akte"
            : "Akten"}
        </span>

        {(searchTerm ||
          statusFilter !==
            "all") && (
          <button
            type="button"
            className="character-archive-results__reset"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      <CharacterArchiveList
        characters={
          filteredCharacters
        }
        selectedCharacterId={
          selectedCharacterId
        }
        actions={{
          onOpen:
            handleOpenCharacter,
          onEdit:
            handleEditCharacter,
          onDelete:
            handleDeleteCharacter,
        }}
      />
    </PaperPage>
  );
}

function findCharacter(
  characters:
    CharacterArchiveEntry[],
  characterId: string,
):
  | CharacterArchiveEntry
  | undefined {
  return characters.find(
    (character) =>
      character.id ===
      characterId,
  );
}