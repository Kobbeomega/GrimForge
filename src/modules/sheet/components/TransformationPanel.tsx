import { getTransformationStageFeatures } from "../../../compendium/transformations";
import { resolveCharacterTransformation, transformationApplicationLabels, transformationGroupLabels, type ActiveTransformationFeature } from "../../../compendium/transformations/activeRecord";

import type {
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


export function TransformationPanel({
  character,
}: TransformationPanelProps) {
  const record=resolveCharacterTransformation(character);
  const {definition:transformation,stage:currentStage,activeStages,features:activeFeatures,warning}=record;

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
              {record.name || "Keine Transformation"}
            </h3>

            <span>
              {warning ?? "Dieser Charakter trägt aktuell keine aktive übernatürliche Wandlung."}
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

  const benefits=activeFeatures.filter(f=>f.group!=="flaw");
  const drawbacks=activeFeatures.filter(f=>f.group==="flaw");

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

      {warning && <p role="status">{warning}</p>}
      <p>Automatisch erhaltene Merkmale stehen hier bereits in der Liste. Ihre Effekte sind nicht in die Grundwerte eingerechnet.</p>
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
    ActiveTransformationFeature[];

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
                      Stufe {feature.stage} · {transformationGroupLabels[feature.group]}
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
                  <strong>{transformationApplicationLabels[feature.application]}:</strong> {feature.description}
                </p>
              </article>
            ),
          )}
        </div>
      )}
    </section>
  );
}
