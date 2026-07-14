import { GrimforgeSeal } from "../../../components/icons/GrimforgeSeal";
import { CodexCard } from "../../../components/ui/CodexCard";
import { GrimButton } from "../../../components/ui/GrimButton";

import type {
  CharacterArchiveActions,
  CharacterArchiveEntry,
} from "../types";

interface CharacterArchiveCardProps {
  character: CharacterArchiveEntry;
  actions: CharacterArchiveActions;
  selected?: boolean;
}

const statusLabels: Record<
  CharacterArchiveEntry["status"],
  string
> = {
  active: "Aktiv",
  retired: "Im Ruhestand",
  deceased: "Verstorben",
  draft: "Entwurf",
};

function formatUpdatedAt(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unbekannt";
  }

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function CharacterArchiveCard({
  character,
  actions,
  selected = false,
}: CharacterArchiveCardProps) {
  const classDescription = character.subclass
    ? `${character.className} · ${character.subclass}`
    : character.className;

  const metadata = [
    character.ancestry,
    classDescription,
    `Stufe ${character.level}`,
    statusLabels[character.status],
  ];

  if (character.transformation) {
    metadata.push(character.transformation);
  }

  return (
    <CodexCard
      eyebrow={character.fileNumber}
      title={character.name}
      description={character.summary}
      selected={selected}
      symbol={
        <GrimforgeSeal
          size={42}
          title={`Siegel von ${character.name}`}
        />
      }
      metadata={metadata}
      actions={
        <>
          <GrimButton
            type="button"
            onClick={() => actions.onOpen(character.id)}
          >
            Akte öffnen
          </GrimButton>

          <GrimButton
            type="button"
            onClick={() => actions.onEdit(character.id)}
          >
            Bearbeiten
          </GrimButton>

          <GrimButton
            type="button"
            onClick={() => actions.onDelete(character.id)}
          >
            Löschen
          </GrimButton>
        </>
      }
    >
      <dl className="character-archive-card__facts">
        <div>
          <dt>Zuletzt geändert</dt>
          <dd>{formatUpdatedAt(character.updatedAt)}</dd>
        </div>

        <div>
          <dt>Klasse</dt>
          <dd>{classDescription}</dd>
        </div>

        <div>
          <dt>Status</dt>
          <dd>{statusLabels[character.status]}</dd>
        </div>
      </dl>
    </CodexCard>
  );
}