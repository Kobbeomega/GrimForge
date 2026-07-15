import { GrimforgeSeal } from "../../../components/icons/GrimforgeSeal";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface CharacterSheetHeaderProps {
  character: CharacterArchiveEntry;
}

const statusLabels: Record<
  CharacterArchiveEntry["status"],
  string
> = {
  active: "Aktiv",
  draft: "Entwurf",
  retired: "Im Ruhestand",
  deceased: "Verstorben",
};

export function CharacterSheetHeader({
  character,
}: CharacterSheetHeaderProps) {
  const classLabel = [
    character.className,
    character.subclass,
  ]
    .filter(Boolean)
    .join(" · ");

  const transformationLabel =
    character.transformation
      ? [
          character.transformation,
          character.transformationStage
            ? `Stufe ${character.transformationStage}`
            : "",
        ]
          .filter(Boolean)
          .join(" · ")
      : "Keine";

  return (
    <header className="compact-sheet-header">
      <div
        className="compact-sheet-header__seal"
        aria-hidden="true"
      >
        <GrimforgeSeal
          size={46}
          title="Grimforge-Siegel"
        />
      </div>

      <section className="compact-sheet-header__main">
        <div className="compact-sheet-header__eyebrow">
          <span>
            {character.fileNumber}
          </span>

          <strong>
            {statusLabels[character.status]}
          </strong>
        </div>

        <h1>
          {character.name}
        </h1>

        <p>
          {character.summary ||
            "Über dieses Schicksal wurde noch kein Vermerk niedergeschrieben."}
        </p>
      </section>

      <dl className="compact-sheet-header__identity">
        <IdentityValue
          label="Abstammung"
          value={character.ancestry}
        />

        <IdentityValue
          label="Klasse"
          value={classLabel}
        />

        <IdentityValue
          label="Stufe"
          value={String(character.level)}
        />

        <IdentityValue
          label="Wandlung"
          value={transformationLabel}
        />
      </dl>
    </header>
  );
}

interface IdentityValueProps {
  label: string;
  value: string;
}

function IdentityValue({
  label,
  value,
}: IdentityValueProps) {
  return (
    <div>
      <dt>{label}</dt>

      <dd>{value}</dd>
    </div>
  );
}