import {
  formatModifier,
} from "../../../rules";

import {
  useCharacterRules,
} from "../hooks/useCharacterRules";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface ClassRulesPanelProps {
  character: CharacterArchiveEntry;

  onSpendResource: (
    resourceId: string,
    maximum: number,
  ) => void;

  onRestoreResource: (
    resourceId: string,
  ) => void;
}

const featureKindLabels = {
  passive: "Passiv",
  action: "Aktion",
  "bonus-action": "Bonusaktion",
  reaction: "Reaktion",
  resource: "Ressource",
} as const;

const rechargeLabels = {
  turn: "Pro Zug",
  "short-rest": "Kurze Rast",
  "long-rest": "Lange Rast",
} as const;

export function ClassRulesPanel({
  character,
  onSpendResource,
  onRestoreResource,
}: ClassRulesPanelProps) {
  const rules =
    useCharacterRules(character);

  return (
    <section className="class-rules-panel">
      <header className="class-rules-panel__header">
        <div>
          <p>Klassenregeln</p>
          <h2>Merkmale und Ressourcen</h2>
        </div>

        <span>
          Übungsbonus{" "}
          {formatModifier(
            rules.proficiencyBonus,
          )}
        </span>
      </header>

      <section className="class-rules-panel__features">
        <header>
          <p>Aktive Merkmale</p>
          <h3>Stufe {rules.level}</h3>
        </header>

        {rules.classFeatures.length > 0 ? (
          <div className="class-feature-list">
            {rules.classFeatures.map(
              (feature) => (
                <article
                  key={feature.id}
                  className="class-feature-record"
                >
                  <header>
                    <div>
                      <span>Stufe {feature.level}</span>
                      <strong>{feature.name}</strong>
                    </div>
                    <small>
                      {featureKindLabels[feature.kind]}
                    </small>
                  </header>
                  <p>{feature.description}</p>
                </article>
              ),
            )}
          </div>
        ) : (
          <p className="class-rules-panel__empty">
            Für diese Klasse sind noch keine Merkmale hinterlegt.
          </p>
        )}
      </section>

      <section className="class-rules-panel__resources">
        <header>
          <p>Verfügbare Kräfte</p>
          <h3>Ressourcen</h3>
        </header>

        {rules.classResources.length > 0 ? (
          <div className="class-resource-list">
            {rules.classResources.map(
              (resource) => (
                <article
                  key={resource.id}
                  className="class-resource-record"
                >
                  <header>
                    <div>
                      <span>
                        {rechargeLabels[resource.recharge]}
                      </span>
                      <strong>{resource.name}</strong>
                    </div>
                    <b>
                      {resource.remaining} / {resource.maximum}
                    </b>
                  </header>

                  <div
                    className="class-resource-meter"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={resource.maximum}
                    aria-valuenow={resource.remaining}
                  >
                    <span
                      style={{
                        width: `${resource.maximum > 0 ? (resource.remaining / resource.maximum) * 100 : 0}%`,
                      }}
                    />
                  </div>

                  <div
                    className="class-resource-pips"
                    aria-label={`${resource.remaining} von ${resource.maximum} verfügbar`}
                  >
                    {Array.from({
                      length: resource.maximum,
                    }).map((_, index) => {
                      const available =
                        index < resource.remaining;

                      return (
                        <button
                          key={index}
                          type="button"
                          className={
                            available
                              ? "class-resource-pip class-resource-pip--available"
                              : "class-resource-pip"
                          }
                          aria-label={
                            available
                              ? `${resource.name} verwenden`
                              : `${resource.name} wiederherstellen`
                          }
                          onClick={() =>
                            available
                              ? onSpendResource(
                                  resource.id,
                                  resource.maximum,
                                )
                              : onRestoreResource(
                                  resource.id,
                                )
                          }
                        />
                      );
                    })}
                  </div>

                  <div className="class-resource-record__actions">
                    <button
                      type="button"
                      disabled={resource.remaining === 0}
                      onClick={() =>
                        onSpendResource(
                          resource.id,
                          resource.maximum,
                        )
                      }
                    >
                      Verwenden
                    </button>

                    <button
                      type="button"
                      disabled={resource.spent === 0}
                      onClick={() =>
                        onRestoreResource(
                          resource.id,
                        )
                      }
                    >
                      Zurückgeben
                    </button>
                  </div>
                </article>
              ),
            )}
          </div>
        ) : (
          <p className="class-rules-panel__empty">
            Diese Klasse besitzt auf der aktuellen Stufe keine verwalteten Ressourcen.
          </p>
        )}
      </section>
    </section>
  );
}
