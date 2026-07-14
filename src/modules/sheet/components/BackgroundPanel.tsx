import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface BackgroundPanelProps {
  character: CharacterArchiveEntry;
}

export function BackgroundPanel({
  character,
}: BackgroundPanelProps) {
  const backgroundName =
    character.backgroundName ??
    "Kein Hintergrund gespeichert";

  const feature =
    character.backgroundFeature;

  const toolProficiencies =
    character.toolProficiencies ?? [];

  const languageChoices =
    character.languageChoices ?? 0;

  return (
    <section className="background-panel">
      <header className="background-panel__header">
        <p>Herkunft und Vergangenheit</p>

        <h3>Hintergrund</h3>
      </header>

      <article className="background-panel__record">
        <div className="background-panel__identity">
          <span>Hintergrund</span>

          <strong>{backgroundName}</strong>
        </div>

        {feature ? (
          <div className="background-panel__feature">
            <span>Merkmal</span>

            <h4>{feature.name}</h4>

            <p>{feature.description}</p>
          </div>
        ) : (
          <p className="background-panel__empty">
            Für diese ältere Akte wurde noch kein
            Hintergrundsmerkmal gespeichert.
          </p>
        )}

        <dl className="background-panel__facts">
          <div>
            <dt>Werkzeugübungen</dt>

            <dd>
              {toolProficiencies.length > 0
                ? toolProficiencies.join(", ")
                : "Keine"}
            </dd>
          </div>

          <div>
            <dt>Zusätzliche Sprachen</dt>

            <dd>
              {languageChoices > 0
                ? `${languageChoices} nach Wahl`
                : "Keine"}
            </dd>
          </div>
        </dl>
      </article>
    </section>
  );
}