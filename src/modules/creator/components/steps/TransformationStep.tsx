import { useMemo, useState } from "react";

import { ArtworkHero } from "../../../../components/artwork";

import {
  canSelectTransformationFeature,
  getTransformationById,
  getTransformationFeatureGroup,
  getTransformationSelectionSummary,
  getTransformationStageAutomaticFeatures,
  getTransformationStageBoons,
  getTransformationStageFeatures,
  getTransformationStageFlaws,
  getTransformationStageSelectionState,
  sanitizeTransformationFeatureIds,
  transformations,
} from "../../../../compendium/transformations";

import type {
  TransformationDefinition,
  TransformationFeature,
  TransformationStage,
} from "../../../../compendium/transformations";

interface TransformationStepProps {
  selectedId: string;

  selectedStage: number;

  selectedFeatureIds: string[];

  onSelect: (
    transformationId: string,
  ) => void;

  onStageChange: (
    stage: number,
    validFeatureIds: string[],
  ) => void;

  onFeatureIdsChange: (
    featureIds: string[],
  ) => void;
}

const transformationSigils: Record<string, string> = {
  "aberrant-horror": "✦",
  fey: "❧",
  fiend: "♠",
  lich: "☠",
  lycanthrope: "☾",
  seraph: "✧",
  vampire: "◆",
};

const transformationStages = [
  1,
  2,
  3,
  4,
] as const;

export function TransformationStep({
  selectedId,
  selectedStage,
  selectedFeatureIds,
  onSelect,
  onStageChange,
  onFeatureIdsChange,
}: TransformationStepProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransformations = useMemo(() => {
    const normalized = searchTerm.trim().toLocaleLowerCase("de");

    if (!normalized) {
      return transformations;
    }

    return transformations.filter((transformation) =>
      [
        transformation.name,
        transformation.description,
        transformation.theme,
        transformation.origin,
        ...(transformation.tags ?? []),
      ]
        .join(" ")
        .toLocaleLowerCase("de")
        .includes(normalized),
    );
  }, [searchTerm]);

  const selectedTransformation =
    getTransformationById(
      selectedId,
    );

  const activeStage =
    selectedTransformation
      ? Math.max(
          1,
          Math.min(
            4,
            selectedStage || 1,
          ),
        )
      : 0;

  const activeStages =
    selectedTransformation
      ? selectedTransformation
          .stages
          .filter(
            (stage) =>
              stage.stage <=
              activeStage,
          )
      : [];

  const selectionSummary =
    selectedTransformation
      ? getTransformationSelectionSummary(
          selectedTransformation,
          activeStage,
          selectedFeatureIds,
        )
      : null;

  function handleSelect(
    transformationId: string,
  ) {
    if (
      transformationId ===
      selectedId
    ) {
      return;
    }

    onSelect(
      transformationId,
    );
  }

  function handleClear() {
    if (
      !selectedId &&
      selectedStage === 0 &&
      selectedFeatureIds.length === 0
    ) {
      return;
    }

    onSelect("");
  }

  function handleStageChange(
    stage: number,
  ) {
    if (!selectedTransformation) {
      return;
    }

    const safeStage =
      Math.max(
        1,
        Math.min(
          4,
          stage,
        ),
      );

    const validFeatureIds =
      sanitizeTransformationFeatureIds({
        transformation:
          selectedTransformation,

        currentStage:
          safeStage,

        selectedFeatureIds,
      });

    onStageChange(
      safeStage,
      validFeatureIds,
    );
  }

  function toggleFeature({
  stage,
  feature,
}: {
  stage: TransformationStage;

  feature: TransformationFeature;
}) {
  if (!selectedTransformation) {
    return;
  }

  const selected =
    selectedFeatureIds.includes(
      feature.id,
    );

  const nextFeatureIds =
    selected
      ? selectedFeatureIds.filter(
          (featureId) =>
            featureId !==
            feature.id,
        )
      : [
          ...selectedFeatureIds,
          feature.id,
        ];

  if (!selected) {
    const allowed =
      canSelectTransformationFeature({
        transformation:
          selectedTransformation,

        currentStage:
          activeStage,

        stage,
        feature,

        selectedFeatureIds,
      });

    if (!allowed) {
      return;
    }
  }

  onFeatureIdsChange(
    sanitizeTransformationFeatureIds({
      transformation:
        selectedTransformation,

      currentStage:
        activeStage,

      selectedFeatureIds:
        nextFeatureIds,
    }),
  );
}

  return (
    <section className="creator-section transformation-step">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel IX
        </p>

        <h2>Transformation</h2>

        <p>
          Wähle eine Wandlung, ihre
          aktuelle Stufe sowie die
          erforderlichen Gaben und Makel.
        </p>
      </header>

      <div className="transformation-codex-toolbar">
        <label className="transformation-codex-search">
          <span>Wandlungen durchsuchen</span>
          <input
            type="search"
            value={searchTerm}
            placeholder="Name, Thema oder Ursprung …"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className="transformation-codex-count" aria-live="polite">
          <strong>{filteredTransformations.length}</strong>
          <span>Wandlungen sichtbar</span>
        </div>
      </div>

      <button
        type="button"
        className={[
          "transformation-none-card",

          !selectedId
            ? "transformation-none-card--selected"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-pressed={!selectedId}
        onClick={handleClear}
      >
        <div>
          <span>Ohne Wandlung</span>

          <strong>
            Keine Transformation
          </strong>

          <p>
            Der Charakter besitzt keine
            aktive übernatürliche
            Veränderung.
          </p>
        </div>

        <small>
          {!selectedId
            ? "Gewählt"
            : "Wählen"}
        </small>
      </button>

      <div className="transformation-grid">
        {filteredTransformations.map(
          (transformation) => {
            const selected =
              transformation.id ===
              selectedId;

            const featureCount =
              transformation.stages
                .reduce(
                  (total, stage) =>
                    total +
                    getTransformationStageFeatures(
                      stage,
                    ).length,
                  0,
                );

            return (
              <button
                key={
                  transformation.id
                }
                type="button"
                className={[
                  "transformation-card",

                  selected
                    ? "transformation-card--selected"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={selected}
                onClick={() =>
                  handleSelect(
                    transformation.id,
                  )
                }
              >
                <div className="transformation-card__sigil" aria-hidden="true">
                  {transformationSigils[transformation.id] ?? "◇"}
                </div>

                <header>
                  <div>
                    <span>Wandlung</span>

                    <h3>
                      {
                        transformation.name
                      }
                    </h3>
                  </div>

                  <strong>
                    {selected
                      ? "Gewählt"
                      : "Wählen"}
                  </strong>
                </header>

                <p>
                  {
                    transformation.description
                  }
                </p>

                <dl>
                  <div>
                    <dt>Thema</dt>

                    <dd>
                      {
                        transformation.theme
                      }
                    </dd>
                  </div>

                  <div>
                    <dt>Merkmale</dt>

                    <dd>
                      {featureCount}
                    </dd>
                  </div>
                </dl>
              </button>
            );
          },
        )}
      </div>

      {filteredTransformations.length === 0 && (
        <div className="transformation-codex-empty">
          <strong>Keine Wandlung gefunden</strong>
          <span>Versuche einen anderen Suchbegriff.</span>
        </div>
      )}

      {selectedTransformation && (
        <>
          <section className="transformation-dossier transformation-dossier--artwork">
            <ArtworkHero
              category="transformation"
              entryId={selectedTransformation.id}
              eyebrow="Aktive Wandlung"
              title={selectedTransformation.name}
              subtitle={selectedTransformation.theme}
              description={selectedTransformation.description}
              className="transformation-dossier__artwork"
              badge={
                <span className="transformation-dossier__artwork-stage">
                  <small>Aktueller Stand</small>
                  <strong>{activeStage}</strong>
                  <span>von 4 Stufen</span>
                </span>
              }
            />

            <dl className="transformation-dossier__metadata">
              <div>
                <dt>Ursprung</dt>
                <dd>{selectedTransformation.origin}</dd>
              </div>
              <div>
                <dt>Quelle</dt>
                <dd>Grim Hollow · S. {selectedTransformation.sourcePage ?? "–"}</dd>
              </div>
              <div>
                <dt>Schlagworte</dt>
                <dd>{(selectedTransformation.tags ?? []).join(" · ") || "Keine"}</dd>
              </div>
            </dl>
          </section>

          <section className="transformation-stage-section">
            <header className="transformation-stage-section__header">
              <div>
                <p>
                  Entwicklungsstand
                </p>

                <h3>
                  {
                    selectedTransformation.name
                  }
                </h3>

                <span>
                  Alle Stufen bis zum
                  gewählten Stand gelten
                  als aktiv.
                </span>
              </div>

              <strong>
                Stufe {activeStage}
              </strong>
            </header>

            <div className="transformation-stage-grid">
              {transformationStages.map(
                (stageNumber) => {
                  const stage =
                    selectedTransformation
                      .stages
                      .find(
                        (entry) =>
                          entry.stage ===
                          stageNumber,
                      );

                  const selected =
                    activeStage ===
                    stageNumber;

                  const active =
                    stageNumber <=
                    activeStage;

                  return (
                    <button
                      key={stageNumber}
                      type="button"
                      className={[
                        "transformation-stage-card",

                        selected
                          ? "transformation-stage-card--selected"
                          : "",

                        active
                          ? "transformation-stage-card--active"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-pressed={
                        selected
                      }
                      onClick={() =>
                        handleStageChange(
                          stageNumber,
                        )
                      }
                    >
                      <span>
                        Stufe{" "}
                        {stageNumber}
                      </span>

                      <strong>
                        {stage?.title ??
                          `Stufe ${stageNumber}`}
                      </strong>

                      <p>
                        {stage?.description ??
                          "Keine Beschreibung vorhanden."}
                      </p>

                      <small>
                        {stage
                          ?.featureSelection
                          ? `${stage.featureSelection.boons} Gabe · ${stage.featureSelection.flaws} Makel`
                          : "Keine Auswahl erforderlich"}
                      </small>
                    </button>
                  );
                },
              )}
            </div>
          </section>

          <section className="transformation-feature-picker">
            <header className="transformation-stage-section__header">
              <div>
                <p>
                  Aktive Merkmale
                </p>

                <h3>
                  Gaben und Makel
                </h3>

                <span>
                  Automatische Merkmale
                  werden ohne Auswahl aktiv.
                </span>
              </div>

              <strong>
                {selectionSummary
                  ?.isComplete
                  ? "Vollständig"
                  : "Unvollständig"}
              </strong>
            </header>

            {activeStages.every(
              (stage) =>
                getTransformationStageFeatures(
                  stage,
                ).length === 0,
            ) ? (
              <div className="transformation-feature-picker__empty">
                <strong>
                  Noch keine Merkmale
                  hinterlegt
                </strong>

                <span>
                  Die Auswahlstruktur ist
                  vorbereitet.
                </span>
              </div>
            ) : (
              <div className="transformation-feature-stages">
                {activeStages.map(
                  (stage) => {
                    const state =
                      getTransformationStageSelectionState(
                        stage,
                        selectedFeatureIds,
                      );

                    const automaticFeatures =
                      getTransformationStageAutomaticFeatures(
                        stage,
                      );

                    const boons =
                      getTransformationStageBoons(
                        stage,
                      );

                    const flaws =
                      getTransformationStageFlaws(
                        stage,
                      );

                    return (
                      <section
                        key={
                          stage.stage
                        }
                        className="transformation-feature-stage"
                      >
                        <header className="transformation-feature-stage__header">
                          <div>
                            <span>
                              Stufe{" "}
                              {stage.stage}
                            </span>

                            <strong>
                              {stage.title}
                            </strong>
                          </div>

                          <small>
                            {state.isComplete
                              ? "Vollständig"
                              : `${state.remainingBoons} Gaben · ${state.remainingFlaws} Makel fehlen`}
                          </small>
                        </header>

                        {automaticFeatures.length >
                          0 && (
                          <FeatureGroup
                            title="Automatische Merkmale"
                            note="Immer aktiv"
                          >
                            {automaticFeatures.map(
                              (feature) => (
                                <article
                                  key={
                                    feature.id
                                  }
                                  className="transformation-feature-option transformation-feature-option--automatic"
                                >
                                  <FeatureHeader
                                    stage={
                                      stage.stage
                                    }
                                    name={
                                      feature.name
                                    }
                                    label="Automatisch"
                                  />

                                  <p>
                                    {
                                      feature.description
                                    }
                                  </p>
                                </article>
                              ),
                            )}
                          </FeatureGroup>
                        )}

                        {boons.length > 0 && (
                          <FeatureGroup
                            title="Gaben"
                            note={`${state.selectedBoons} / ${state.requiredBoons}`}
                          >
                            {boons.map(
                              (feature) => (
                                <SelectableFeature
                                  key={feature.id}
  transformation={
    selectedTransformation
  }
  currentStage={
    activeStage
  }
  stage={stage}
  feature={feature}
  selectedFeatureIds={
    selectedFeatureIds
  }
  onToggle={
    toggleFeature
  }
/>
                              ),
                            )}
                          </FeatureGroup>
                        )}

                        {flaws.length > 0 && (
                          <FeatureGroup
                            title="Makel"
                            note={`${state.selectedFlaws} / ${state.requiredFlaws}`}
                          >
                            {flaws.map(
                              (feature) => (
                                <SelectableFeature
                                  key={feature.id}
  transformation={
    selectedTransformation
  }
  currentStage={
    activeStage
  }
  stage={stage}
  feature={feature}
  selectedFeatureIds={
    selectedFeatureIds
  }
  onToggle={
    toggleFeature
  }
/>
                              ),
                            )}
                          </FeatureGroup>
                        )}
                      </section>
                    );
                  },
                )}
              </div>
            )}
          </section>
        </>
      )}
    </section>
  );
}

function FeatureGroup({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="transformation-feature-group">
      <header>
        <span>{title}</span>

        <strong>{note}</strong>
      </header>

      <div className="transformation-feature-picker__grid">
        {children}
      </div>
    </section>
  );
}

function FeatureHeader({
  stage,
  name,
  label,
}: {
  stage: number;
  name: string;
  label: string;
}) {
  return (
    <header>
      <div>
        <span>
          Stufe {stage}
        </span>

        <strong>{name}</strong>
      </div>

      <small>{label}</small>
    </header>
  );
}

function SelectableFeature({
  transformation,
  currentStage,
  stage,
  feature,
  selectedFeatureIds,
  onToggle,
}: {
  transformation:
    TransformationDefinition;

  currentStage: number;

  stage: TransformationStage;

  feature: TransformationFeature;

  selectedFeatureIds: string[];

  onToggle: (value: {
    stage: TransformationStage;
    feature: TransformationFeature;
  }) => void;
}) {
  const selected =
    selectedFeatureIds.includes(
      feature.id,
    );

  const group =
    getTransformationFeatureGroup(
      stage,
      feature.id,
    );

  const allowed =
    canSelectTransformationFeature({
      transformation,
      currentStage,
      stage,
      feature,
      selectedFeatureIds,
    });

  return (
    <button
      type="button"
      className={[
        "transformation-feature-option",

        selected
          ? "transformation-feature-option--selected"
          : "",

        group === "flaw"
          ? "transformation-feature-option--drawback"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={
        !selected &&
        !allowed
      }
      aria-pressed={selected}
      onClick={() =>
        onToggle({
          stage,
          feature,
        })
      }
    >
      <FeatureHeader
        stage={stage.stage}
        name={feature.name}
        label={
          group === "flaw"
            ? "Makel"
            : "Gabe"
        }
      />

      <p>
        {feature.description}
      </p>
    </button>
  );
}