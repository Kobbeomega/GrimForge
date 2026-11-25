import { useState } from "react";
import "./compact-choices.css";
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

const abilityLabels: Record<string, string> = {
  strength: "ST",
  dexterity: "GE",
  constitution: "KO",
  intelligence: "IN",
  wisdom: "WE",
  charisma: "CH",
};

export function BackgroundStep({
  selectedBackgroundId,
  onSelectBackground,
}: BackgroundStepProps) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLocaleLowerCase("de");
  const visible = backgrounds.filter(b => [b.name, sourceLabels[b.source], b.feature.name, ...b.skillProficiencies.map(id => skillsById[id].name)].join(" ").toLocaleLowerCase("de").includes(term));
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

      <label className="gf-spell-search">Hintergründe suchen<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Name, Quelle oder Fertigkeit …" /></label>
      <p aria-live="polite">{visible.length} von {backgrounds.length} Hintergründen{visible.length === 0 && " · Keine Treffer"}</p>
      <div className="creator-dossier-grid creator-dossier-grid--backgrounds">
        {visible.map(background => {
          const selected = background.id === selectedBackgroundId;
          const skillNames = background.skillProficiencies.map(
            (skillId) => skillsById[skillId].name,
          );
          const sourceLabel = sourceLabels[background.source] ?? "Hintergrund";

          return (
            <article className="gf-choice" key={background.id} data-selected={selected}>
              <button type="button" className="gf-choice__pick" aria-pressed={selected} onClick={() => onSelectBackground(background.id)}>
                <span className="gf-choice__copy"><strong>{background.name}</strong><small>{sourceLabel} · {skillNames.join(" · ")}</small></span>
                <span className="gf-choice__state">{selected ? "✓ Gewählt" : "Wählen"}</span>
              </button>
              <dl className="gf-choice__quickfacts" aria-label={`Wichtige Werte für ${background.name}`}>
                <div>
                  <dt>Merkmal</dt>
                  <dd>{background.feature.name}</dd>
                </div>
                <div>
                  <dt>Startausrüstung</dt>
                  <dd>{background.equipment.length > 0 ? background.equipment.join(" · ") : "Keine automatische"}</dd>
                </div>
                {(background.toolProficiencies.length > 0 || background.languageChoices > 0) && (
                  <div>
                    <dt>Weitere Übungen</dt>
                    <dd>{[
                      ...background.toolProficiencies,
                      background.languageChoices > 0 ? `${background.languageChoices} Sprache${background.languageChoices === 1 ? "" : "n"} nach Wahl` : "",
                    ].filter(Boolean).join(" · ")}</dd>
                  </div>
                )}
                {background.originFeat && (
                  <div>
                    <dt>Ursprungstalent</dt>
                    <dd>{background.originFeat}</dd>
                  </div>
                )}
              </dl>
              <details className="gf-choice__details">
                <summary>Beschreibung und vollständige Regeln</summary>
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
                  label="Ausrüstung"
                  values={background.equipment.length > 0 ? background.equipment : ["Keine automatische Startausrüstung"]}
                />
                <DossierReward
                  label="Sprachen"
                  values={[
                    background.languageChoices > 0
                      ? `${background.languageChoices} nach Wahl`
                      : "Keine zusätzlichen",
                  ]}
                />
                {background.abilityScoreOptions && (
                  <DossierReward
                    label="Attribute"
                    values={background.abilityScoreOptions.map(
                      (ability) => abilityLabels[ability] ?? ability,
                    )}
                  />
                )}
                {background.originFeat && (
                  <DossierReward
                    label="Ursprungstalent"
                    values={[background.originFeat]}
                  />
                )}
              </div>

              <section className="creator-dossier-card__feature">
                <span>Besonderes Merkmal</span>
                <strong>{background.feature.name}</strong>
                <p>{background.feature.description}</p>
              </section>
              </details>
            </article>
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
