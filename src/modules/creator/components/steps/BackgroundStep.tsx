import {
  backgrounds,
} from "../../../../compendium/backgrounds";

import {
  skillsById,
} from "../../../../compendium/skills";

import { CodexCard } from "../../../../components/ui/CodexCard";

interface BackgroundStepProps {
  selectedBackgroundId: string;

  onSelectBackground: (
    backgroundId: string,
  ) => void;
}

export function BackgroundStep({
  selectedBackgroundId,
  onSelectBackground,
}: BackgroundStepProps) {
  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel III
        </p>

        <h2>Hintergrund</h2>

        <p>
          Wähle die Herkunft, Ausbildung oder
          gesellschaftliche Stellung, die das
          bisherige Leben deines Charakters geprägt
          hat.
        </p>
      </header>

      <div className="creator-card-grid">
        {backgrounds.map((background) => {
          const selected =
            background.id ===
            selectedBackgroundId;

          const skillNames =
            background.skillProficiencies
              .map(
                (skillId) =>
                  skillsById[skillId].name,
              )
              .join(", ");

          const toolLabel =
            background.toolProficiencies.length >
            0
              ? background.toolProficiencies.join(
                  ", ",
                )
              : "Keine";

          const languageLabel =
            background.languageChoices > 0
              ? `${background.languageChoices} nach Wahl`
              : "Keine";

          return (
            <CodexCard
              key={background.id}
              eyebrow="Hintergrund"
              title={background.name}
              description={
                background.description
              }
              selected={selected}
              onClick={() =>
                onSelectBackground(
                  background.id,
                )
              }
              metadata={[
                `Fertigkeiten: ${skillNames}`,
                `Werkzeuge: ${toolLabel}`,
                `Sprachen: ${languageLabel}`,
              ]}
            >
              <dl className="creator-background-facts">
                <div>
                  <dt>Merkmal</dt>

                  <dd>
                    {
                      background.feature
                        .name
                    }
                  </dd>
                </div>

                <div>
                  <dt>Wirkung</dt>

                  <dd>
                    {
                      background.feature
                        .description
                    }
                  </dd>
                </div>
              </dl>
            </CodexCard>
          );
        })}
      </div>
    </section>
  );
}