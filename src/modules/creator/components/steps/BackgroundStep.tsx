import { backgrounds } from "../../../../compendium/backgrounds";
import { skillsById } from "../../../../compendium/skills";

interface BackgroundStepProps {
  selectedBackgroundId: string;
  onSelectBackground: (backgroundId: string) => void;
}

const sourceLabels = {
  core: "Klassischer Hintergrund",
  "grim-hollow": "Grim Hollow",
  "grim-hollow-2025": "Grim Hollow 2025",
  custom: "Eigene Chronik",
} as const;

export function BackgroundStep({
  selectedBackgroundId,
  onSelectBackground,
}: BackgroundStepProps) {
  const selectedBackground = backgrounds.find(
    (background) => background.id === selectedBackgroundId,
  );

  return (
    <section className="creator-section creator-dossier-step">
      <header className="creator-section__header creator-dossier-step__header">
        <div>
          <p className="creator-section__chapter">Kapitel III</p>
          <h2>Hintergrund</h2>
          <p>
            Deine Vergangenheit bestimmt, welche Türen sich öffnen, welche Namen
            dir noch etwas schulden und welche Fähigkeiten du lange vor deinem
            ersten Abenteuer gelernt hast.
          </p>
        </div>

        <div className="creator-dossier-step__counter">
          <strong>{backgrounds.length}</strong>
          <span>Chroniken</span>
        </div>
      </header>

      <div className="creator-dossier-grid creator-dossier-grid--backgrounds">
        {backgrounds.map((background, index) => {
          const selected = background.id === selectedBackgroundId;
          const skillNames = background.skillProficiencies.map(
            (skillId) => skillsById[skillId].name,
          );
          const sourceLabel = sourceLabels[background.source] ?? "Hintergrund";

          return (
            <button
              key={background.id}
              type="button"
              className={[
                "creator-dossier-card",
                "creator-dossier-card--background",
                selected ? "creator-dossier-card--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={selected}
              onClick={() => onSelectBackground(background.id)}
            >
              <span className="creator-dossier-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <header className="creator-dossier-card__header">
                <div className="creator-dossier-card__sigil" aria-hidden="true">
                  {background.name.slice(0, 1)}
                </div>

                <div>
                  <span className="creator-dossier-card__eyebrow">{sourceLabel}</span>
                  <h3>{background.name}</h3>
                </div>

                <span className="creator-dossier-card__state">
                  {selected ? "Gewählt" : "Öffnen"}
                </span>
              </header>

              <p className="creator-dossier-card__description">
                {background.description}
              </p>

              <div className="creator-dossier-card__rewards">
                <DossierReward label="Fertigkeiten" values={skillNames} />
                <DossierReward
                  label="Werkzeuge"
                  values={
                    background.toolProficiencies.length > 0
                      ? background.toolProficiencies
                      : ["Keine"]
                  }
                />
                <DossierReward
                  label="Sprachen"
                  values={[
                    background.languageChoices > 0
                      ? `${background.languageChoices} nach Wahl`
                      : "Keine zusätzlichen",
                  ]}
                />
              </div>

              <section className="creator-dossier-card__feature">
                <span>Besonderes Merkmal</span>
                <strong>{background.feature.name}</strong>
                <p>{background.feature.description}</p>
              </section>
            </button>
          );
        })}
      </div>

      {selectedBackground && (
        <aside className="creator-selection-summary" aria-live="polite">
          <div className="creator-selection-summary__mark" aria-hidden="true">
            ◆
          </div>
          <div>
            <span>In die Akte übernommen</span>
            <strong>{selectedBackground.name}</strong>
            <p>{selectedBackground.feature.name}</p>
          </div>
        </aside>
      )}
    </section>
  );
}

interface DossierRewardProps {
  label: string;
  values: string[];
}

function DossierReward({ label, values }: DossierRewardProps) {
  return (
    <div className="creator-dossier-reward">
      <span>{label}</span>
      <strong>{values.join(" · ")}</strong>
    </div>
  );
}
