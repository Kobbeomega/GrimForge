import { getBackgroundById } from "../../../compendium/backgrounds";
import {
  classes,
  getCharacterPathChoiceSummary,
} from "../../../compendium/classes";

import {
  getFeatById,
} from "../../../compendium/feats";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

const abilityLabels: Record<string, string> = {
  strength: "ST",
  dexterity: "GE",
  constitution: "KO",
  intelligence: "IN",
  wisdom: "WE",
  charisma: "CH",
};

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

  const backgroundDefinition =
    getBackgroundById(character.backgroundId ?? "");

  const currentBackgroundFeature =
    backgroundDefinition?.feature ??
    character.backgroundFeature;

  const toolProficiencies =
    character.toolProficiencies ?? [];

  const languageChoices =
    character.languageChoices ?? 0;

  const savingThrows =
    classDefinition?.savingThrows ?? [];

  const pathChoiceSummary = getCharacterPathChoiceSummary(character.pathChoices);
  const chosenFeats =
    (character.featIds ?? [])
      .map((featId) => getFeatById(featId))
      .filter((feat): feat is NonNullable<typeof feat> => Boolean(feat));

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

      {Boolean(character.levelUpHistory?.length) && <section className="level-up__card">
        <h3>Deine Aufstiege</h3>
        <ul>{character.levelUpHistory?.map((entry, index) => <li key={`${entry.date}-${index}`}>
          Stufe {entry.fromLevel} → {entry.toLevel} · +{entry.hitPointGain} maximale TP
          {entry.hitPointMode === "roll" ? ` (Wurf: ${entry.hitDieRoll})` : " (fester Wert)"}
          {entry.abilityScoreMode === "increase" && entry.abilityScoreIncreases
            ? ` · Attribute: ${Object.entries(entry.abilityScoreIncreases).map(([abilityId, value]) => `${abilityLabels[abilityId] ?? abilityId} +${value}`).join(", ")}`
            : ""}
          {entry.abilityScoreMode === "feat" && entry.featId
            ? ` · Talent: ${getFeatById(entry.featId)?.name ?? entry.featId}`
            : ""}
          {" · "}{new Date(entry.date).toLocaleDateString("de-DE")}
        </li>)}</ul>
      </section>}

      {chosenFeats.length > 0 && (
        <section className="level-up__card">
          <h3>Talente</h3>
          <ul>
            {chosenFeats.map((feat) => (
              <li key={feat.id}>
                <strong>{feat.name}</strong>
                {" — "}
                {feat.description}
              </li>
            ))}
          </ul>
        </section>
      )}

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
            backgroundDefinition?.name ??
            character.backgroundName ??
            "Kein Hintergrund gespeichert"
          }
          description={
            currentBackgroundFeature
              ?.description ??
            "Für diese Akte wurde noch kein Hintergrundsmerkmal gespeichert."
          }
          accent={
            Boolean(
              currentBackgroundFeature,
            )
          }
        >
          <FeatureFacts
            entries={[
              {
                label: "Merkmal",
                value:
                  currentBackgroundFeature
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
              ...(backgroundDefinition?.abilityScoreOptions
                ? [
                    {
                      label: "Attributsoptionen",
                      value:
                        backgroundDefinition.abilityScoreOptions
                          .map(
                            (ability) =>
                              abilityLabels[
                                ability
                              ] ?? ability,
                          )
                          .join(", "),
                    },
                  ]
                : []),
              ...(backgroundDefinition?.originFeat
                ? [
                    {
                      label: "Ursprungstalent",
                      value:
                        backgroundDefinition.originFeat,
                    },
                  ]
                : []),
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

          {pathChoiceSummary.map((choice) => (
            <div key={choice.id} className="feature-record__subfeature">
              <span>{choice.name}</span>
              <strong>{choice.selections.map((selection) => selection.name).join(" · ")}</strong>
              <p>{choice.selections.map((selection) => selection.description).join(" ")}</p>
            </div>
          ))}
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
