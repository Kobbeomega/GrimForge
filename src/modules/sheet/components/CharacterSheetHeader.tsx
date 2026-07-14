import { GrimforgeSeal } from "../../../components/icons/GrimforgeSeal";

import type { CharacterArchiveEntry } from "../../archives/types";

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

  return (
    <header className="character-sheet-header">
      <div
        className="character-sheet-header__ornament"
        aria-hidden="true"
      >
        <span />
        <GrimforgeSeal
          size={54}
          className="character-sheet-header__seal"
          title="Grimforge-Siegel"
        />
        <span />
      </div>

      <p className="character-sheet-header__file-number">
        {character.fileNumber}
      </p>

      <h1 className="character-sheet-header__name">
        {character.name}
      </h1>

      <p className="character-sheet-header__summary">
        {character.summary ||
          "Über dieses Schicksal wurde noch kein Vermerk niedergeschrieben."}
      </p>

      <div className="character-sheet-header__identity">
        <section>
          <small>Abstammung</small>
          <strong>{character.ancestry}</strong>
        </section>

        <div
          className="character-sheet-header__divider"
          aria-hidden="true"
        >
          ◆
        </div>

        <section>
          <small>Klasse</small>
          <strong>{classLabel}</strong>
        </section>
      </div>

      <dl className="character-sheet-header__metadata">
        <div>
          <dt>Stufe</dt>
          <dd>{character.level}</dd>
        </div>

        <div>
          <dt>Status</dt>
          <dd>{statusLabels[character.status]}</dd>
        </div>

        <div>
          <dt>Wandlung</dt>
          <dd>
            {character.transformation
              ? [
                  character.transformation,
                  character.transformationStage
                    ? `Stufe ${character.transformationStage}`
                    : "",
                ]
                  .filter(Boolean)
                  .join(" · ")
              : "Keine"}
          </dd>
        </div>
      </dl>
    </header>
  );
}