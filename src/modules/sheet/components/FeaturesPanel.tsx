import {
  classes,
} from "../../../compendium/classes";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface FeaturesPanelProps {
  character: CharacterArchiveEntry;
}

export function FeaturesPanel({
  character,
}: FeaturesPanelProps) {
  const classDefinition =
    classes.find(
      (entry) =>
        entry.id === character.classId,
    );

  const subclassDefinition =
    classDefinition?.subclasses.find(
      (entry) =>
        entry.id ===
        character.subclassId,
    );

  const toolProficiencies =
    character.toolProficiencies ?? [];

  const languageChoices =
    character.languageChoices ?? 0;

  const savingThrows =
    classDefinition?.savingThrows ?? [];

  return (
    <section className="features-panel">
      <header className="features-panel__header">
        <p>Kapitel IV</p>

        <h2>Merkmale</h2>

        <span>
          Abstammung, Hintergrund, Klasse und
          Wandlung deines Charakters.
        </span>
      </header>

      <div className="features-panel__grid">
        <FeatureRecord
          eyebrow="Blutlinie"
          title={character.ancestry}
          description={
            character.ancestryVariantId
              ? "Die gewählte Abstammung und ihre besondere Ausprägung."
              : "Die Abstammung und Herkunft des Charakters."
          }
        >
          {character.ancestryBonusChoices &&
            character.ancestryBonusChoices.length >
              0 && (
              <FeatureFacts
                entries={[
                  {
                    label:
                      "Gewählte Attributsboni",
                    value:
                      character
                        .ancestryBonusChoices
                        .join(", "),
                  },
                ]}
              />
            )}
        </FeatureRecord>

        <FeatureRecord
          eyebrow="Vergangenheit"
          title={
            character.backgroundName ??
            "Kein Hintergrund gespeichert"
          }
          description={
            character.backgroundFeature
              ?.description ??
            "Für diese Akte wurde noch kein Hintergrundsmerkmal gespeichert."
          }
          accent={
            Boolean(
              character.backgroundFeature,
            )
          }
        >
          <FeatureFacts
            entries={[
              {
                label: "Merkmal",
                value:
                  character.backgroundFeature
                    ?.name ??
                  "Nicht gespeichert",
              },
              {
                label: "Werkzeugübungen",
                value:
                  toolProficiencies.length > 0
                    ? toolProficiencies.join(
                        ", ",
                      )
                    : "Keine",
              },
              {
                label:
                  "Zusätzliche Sprachen",
                value:
                  languageChoices > 0
                    ? `${languageChoices} nach Wahl`
                    : "Keine",
              },
            ]}
          />
        </FeatureRecord>

        <FeatureRecord
          eyebrow="Klassenpfad"
          title={
            classDefinition?.name ??
            character.className
          }
          description={
            classDefinition?.description ??
            "Für diese Klasse liegt keine ausführliche Beschreibung vor."
          }
          accent
        >
          <FeatureFacts
            entries={[
              {
                label: "Unterklasse",
                value:
                  subclassDefinition?.name ??
                  character.subclass ??
                  "Keine gewählt",
              },
              {
                label: "Trefferwürfel",
                value: classDefinition
                  ? `W${classDefinition.hitDie}`
                  : "Nicht gespeichert",
              },
              {
                label: "Rettungswürfe",
                value:
                  savingThrows.length > 0
                    ? savingThrows.join(", ")
                    : "Keine",
              },
              {
                label: "Zauberwirker",
                value:
                  classDefinition?.spellcasting
                    ? "Ja"
                    : "Nein",
              },
            ]}
          />

          {subclassDefinition && (
            <div className="feature-record__subfeature">
              <span>Unterklasse</span>

              <strong>
                {subclassDefinition.name}
              </strong>

              <p>
                {
                  subclassDefinition
                    .description
                }
              </p>
            </div>
          )}
        </FeatureRecord>

      </div>

      {classDefinition && (
        <section className="features-proficiencies">
          <header>
            <p>Ausbildung</p>

            <h3>Klassenübungen</h3>
          </header>

          <div className="features-proficiencies__grid">
            <ProficiencyList
              title="Rüstungen"
              entries={
                classDefinition
                  .armorProficiencies
              }
            />

            <ProficiencyList
              title="Waffen"
              entries={
                classDefinition
                  .weaponProficiencies
              }
            />

            <ProficiencyList
              title="Werkzeuge"
              entries={
                classDefinition
                  .toolProficiencies
              }
            />
          </div>
        </section>
      )}
    </section>
  );
}

interface FeatureRecordProps {
  eyebrow: string;
  title: string;
  description: string;

  accent?: boolean;
  muted?: boolean;

  children?: React.ReactNode;
}

function FeatureRecord({
  eyebrow,
  title,
  description,
  accent = false,
  muted = false,
  children,
}: FeatureRecordProps) {
  return (
    <article
      className={[
        "feature-record",
        accent
          ? "feature-record--accent"
          : "",
        muted
          ? "feature-record--muted"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="feature-record__header">
        <p>{eyebrow}</p>

        <h3>{title}</h3>

        <span>{description}</span>
      </header>

      {children}
    </article>
  );
}

interface FeatureFact {
  label: string;
  value: string;
}

function FeatureFacts({
  entries,
}: {
  entries: FeatureFact[];
}) {
  return (
    <dl className="feature-record__facts">
      {entries.map((entry) => (
        <div key={entry.label}>
          <dt>{entry.label}</dt>

          <dd>{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProficiencyList({
  title,
  entries,
}: {
  title: string;
  entries: string[];
}) {
  return (
    <article className="proficiency-record">
      <h4>{title}</h4>

      {entries.length > 0 ? (
        <ul>
          {entries.map((entry) => (
            <li key={entry}>
              {entry}
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine</p>
      )}
    </article>
  );
}