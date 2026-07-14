import { CharacterArchiveCard } from "./CharacterArchiveCard";

import type {
  CharacterArchiveActions,
  CharacterArchiveEntry,
} from "../types";

interface CharacterArchiveListProps {
  characters: CharacterArchiveEntry[];
  actions: CharacterArchiveActions;
  selectedCharacterId?: string;
}

export function CharacterArchiveList({
  characters,
  actions,
  selectedCharacterId,
}: CharacterArchiveListProps) {
  if (characters.length === 0) {
    return (
      <div className="character-archive-list__empty">
        <p>Im Archiv befinden sich noch keine Charakterakten.</p>
      </div>
    );
  }

  return (
    <div className="character-archive-list">
      {characters.map((character) => (
        <CharacterArchiveCard
          key={character.id}
          character={character}
          actions={actions}
          selected={character.id === selectedCharacterId}
        />
      ))}
    </div>
  );
}