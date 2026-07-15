import {
  getActiveTransformationStages,
  getTransformationById,
  getTransformationStageAutomaticFeatures,
  getTransformationStageBoons,
  getTransformationStageFeatures,
  getTransformationStageFlaws,
} from "../../../compendium/transformations";

import type {
  TransformationFeature,
  TransformationFeatureKind,
} from "../../../compendium/transformations";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface TransformationPanelProps {
  character: CharacterArchiveEntry;
}

const featureKindLabels: Record<
  TransformationFeatureKind,
  string
> = {
  benefit: "Vorteil",
  drawback: "Makel",
  passive: "Passiv",
  action: "Aktion",
  reaction: "Reaktion",
};

interface ResolvedTransformationFeature
  extends TransformationFeature {
  stage: number;
}

export function TransformationPanel({
  character,
}: TransformationPanelProps) {
  const transformation =
    getTransformationById(
      character.transformationId ?? "",
    );

  const currentStage =
    Math.max(
      0,
      Math.min(
        4,
        character.transformationStage ?? 0,
      ),
    );

  if (
    !transformation ||
    currentStage === 0
  ) {
    return (
      <section className="transformation-sheet transformation-sheet--empty">
        <header className="transformation-sheet__header">
          <div>
            <p>Wandlung</p>

            <h3>
              Keine Transformation
            </h3>

            <span>
              Dieser Charakter trägt
              aktuell keine aktive
              übernatürliche Wandlung.
            </span>
          </div>

          <strong>
            Stufe 0
          </strong>
        </header>

        <div className="transformation-sheet__empty-state">
          <strong>
            Sterbliche Gestalt
          </strong>

          <span>
            Eine Transformation kann
            später beim Bearbeiten des
            Charakters hinzugefügt werden.
          </span>
        </div>
      </section>
    );
  }

  const activeStages =
    getActiveTransformationStages(
      transformation.id,
      currentStage,
    );

  const currentStageDefinition =
    transformation.stages.find(
      (stage) =>
        stage.stage === currentStage,
    );

  const nextStage =
    transformation.stages.find(
      (stage) =>
        stage.stage ===
        currentStage + 1,
    );

  const selectedFeatureIds =
    new Set(
      character
        .transformationFeatureIds ?? [],
    );

  const automaticFeatures:
    ResolvedTransformationFeature[] =
    activeStages.flatMap(
      (stage) =>
        getTransformationStageAutomaticFeatures(
          stage,
        ).map(
          (feature) => ({
            ...feature,
            stage: stage.stage,
          }),
        ),
    );

  const selectedBoons:
    ResolvedTransformationFeature[] =
    activeStages.flatMap(
      (stage) =>
        getTransformationStageBoons(
          stage,
        )
          .filter(
            (feature) =>
              selectedFeatureIds.has(
                feature.id,
              ),
          )
          .map(
            (feature) => ({
              ...feature,
              stage: stage.stage,
            }),
          ),
    );

  const selectedFlaws:
    ResolvedTransformationFeature[] =
    activeStages.flatMap(
      (stage) =>
        getTransformationStageFlaws(
          stage,
        )
          .filter(
            (feature) =>
              selectedFeatureIds.has(
                feature.id,
              ),
          )
          .map(
            (feature) => ({
              ...feature,
              stage: stage.stage,
            }),
          ),
    );

  const activeFeatures = [
    ...automaticFeatures,
    ...selectedBoons,
    ...selectedFlaws,
  ];

  const benefits = [
    ...automaticFeatures,
    ...selectedBoons,
  ];

  const drawbacks =
    selectedFlaws;

  return (
    <section className="transformation-sheet">
      <header className="transformation-sheet__header">
        <div>
          <p>Aktive Wandlung</p>

          <h3>
            {transformation.name}
          </h3>

          <span>
            {transformation.description}
          </span>
        </div>

        <strong>
          Stufe {currentStage}
        </strong>
      </header>

      <dl className="transformation-sheet__summary">
        <SummaryValue
          label="Thema"
          value={transformation.theme}
        />

        <SummaryValue
          label="Aktueller Zustand"
          value={
            currentStageDefinition
              ?.title ??
            `Stufe ${currentStage}`
          }
        />

        <SummaryValue
          label="Aktive Stufen"
          value={`${activeStages.length} von 4`}
        />

        <SummaryValue
          label="Aktive Merkmale"
          value={String(
            activeFeatures.length,
          )}
        />
      </dl>

      <section className="transformation-sheet__origin">
        <span>Ursprung</span>

        <p>
          {transformation.origin}
        </p>
      </section>

      <section className="transformation-progression">
        <header className="transformation-section-heading">
          <div>
            <p>Entwicklung</p>

            <h4>
              Stufen der Wandlung
            </h4>
          </div>

          <span>
            Alle bisher erreichten
            Stufen sind aktiv.
          </span>
        </header>

        <div className="transformation-progression__grid">
          {transformation.stages.map(
            (stage) => {
              const active =
                stage.stage <=
                currentStage;

              const current =
                stage.stage ===
                currentStage;

              const featureCount =
                getTransformationStageFeatures(
                  stage,
                ).length;

              return (
                <article
                  key={stage.stage}
                  className={[
                    "transformation-stage-record",

                    active
                      ? "transformation-stage-record--active"
                      : "",

                    current
                      ? "transformation-stage-record--current"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <header>
                    <span>
                      Stufe {stage.stage}
                    </span>

                    {current && (
                      <strong>
                        Aktuell
                      </strong>
                    )}
                  </header>

                  <h5>
                    {stage.title}
                  </h5>

                  <p>
                    {stage.description}
                  </p>

                  <small>
                    {featureCount}{" "}
                    {featureCount === 1
                      ? "Merkmal"
                      : "Merkmale"}
                  </small>
                </article>
              );
            },
          )}
        </div>
      </section>

      <TransformationFeatureSection
        title="Aktive Fähigkeiten"
        eyebrow="Macht der Wandlung"
        features={benefits}
        emptyText="Für diese Stufe wurden noch keine Fähigkeiten hinterlegt."
      />

      {drawbacks.length > 0 && (
        <TransformationFeatureSection
          title="Nachteile und Belastungen"
          eyebrow="Preis der Wandlung"
          features={drawbacks}
          danger
          emptyText=""
        />
      )}

      {nextStage ? (
        <section className="transformation-next-stage">
          <div>
            <span>
              Nächste Entwicklung
            </span>

            <strong>
              Stufe {nextStage.stage} ·{" "}
              {nextStage.title}
            </strong>

            <p>
              {nextStage.description}
            </p>
          </div>

          <small>
            Noch nicht aktiv
          </small>
        </section>
      ) : (
        <section className="transformation-next-stage transformation-next-stage--complete">
          <div>
            <span>Vollendung</span>

            <strong>
              Höchste Stufe erreicht
            </strong>

            <p>
              Diese Transformation hat
              ihre vollständige
              Entwicklung erreicht.
            </p>
          </div>
        </section>
      )}
    </section>
  );
}

function SummaryValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt>{label}</dt>

      <dd>{value}</dd>
    </div>
  );
}

function TransformationFeatureSection({
  eyebrow,
  title,
  features,
  emptyText,
  danger = false,
}: {
  eyebrow: string;
  title: string;

  features:
    ResolvedTransformationFeature[];

  emptyText: string;

  danger?: boolean;
}) {
  return (
    <section
      className={[
        "transformation-feature-section",

        danger
          ? "transformation-feature-section--danger"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="transformation-section-heading">
        <div>
          <p>{eyebrow}</p>

          <h4>{title}</h4>
        </div>

        <span>
          {features.length}{" "}
          {features.length === 1
            ? "Eintrag"
            : "Einträge"}
        </span>
      </header>

      {features.length === 0 ? (
        <div className="transformation-feature-section__empty">
          <span>{emptyText}</span>
        </div>
      ) : (
        <div className="transformation-feature-list">
          {features.map(
            (feature) => (
              <article
                key={`${feature.stage}-${feature.id}`}
                className="transformation-feature-record"
              >
                <header>
                  <div>
                    <span>
                      Stufe {feature.stage}
                    </span>

                    <h5>
                      {feature.name}
                    </h5>
                  </div>

                  <strong>
                    {
                      featureKindLabels[
                        feature.kind
                      ]
                    }
                  </strong>
                </header>

                <p>
                  {feature.description}
                </p>
              </article>
            ),
          )}
        </div>
      )}
    </section>
  );
}