import {
  abilityIds,
  abilityLabels,
  abilityShortLabels,
  formatAbilityModifier,
  getAbilityModifier,
} from "../../../../compendium/core";

import { getClassById } from "../../../../compendium/classes";

import {
  getAncestryAbilityBonuses,
} from "../../../../compendium/ancestries";

import type {
  AbilityId,
  AbilityScores,
} from "../../../../compendium/core";

interface AbilitiesStepProps {
  values: AbilityScores;
  classId?: string;
  ancestryId?: string;
  ancestryVariantId?: string;
  ancestryBonusChoices?: AbilityId[];

  onChange: (
    values: AbilityScores,
  ) => void;
}

const pointBuyBudget = 27;

const pointBuyCosts: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

const standardArray: AbilityScores = {
  strength: 15,
  dexterity: 14,
  constitution: 13,
  intelligence: 12,
  wisdom: 10,
  charisma: 8,
};

const pointBuyStart: AbilityScores = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};

export function AbilitiesStep({
  values,
  classId,
  ancestryId,
  ancestryVariantId,
  ancestryBonusChoices = [],
  onChange,
}: AbilitiesStepProps) {
  const normalizedValues =
    normalizePointBuyScores(values);

  const classDefinition = classId ? getClassById(classId) : undefined;
  const ancestryBonuses = getAncestryAbilityBonuses({
    ancestryId,
    variantId: ancestryVariantId,
    choices: ancestryBonusChoices,
  }).total;
  const recommendedAbilities = new Set(classDefinition?.primaryAbilities ?? []);

  const spentPoints =
    calculateSpentPoints(
      normalizedValues,
    );

  const remainingPoints =
    pointBuyBudget - spentPoints;

  function changeAbility(
    abilityId: AbilityId,
    direction: -1 | 1,
  ) {
    const currentValue =
      normalizedValues[abilityId];

    const nextValue =
      currentValue + direction;

    if (
      nextValue < 8 ||
      nextValue > 15
    ) {
      return;
    }

    const nextValues: AbilityScores = {
      ...normalizedValues,
      [abilityId]: nextValue,
    };

    const nextCost =
      calculateSpentPoints(
        nextValues,
      );

    if (nextCost > pointBuyBudget) {
      return;
    }

    onChange(nextValues);
  }

  function canIncrease(
    abilityId: AbilityId,
  ): boolean {
    const currentValue =
      normalizedValues[abilityId];

    if (currentValue >= 15) {
      return false;
    }

    const nextValues: AbilityScores = {
      ...normalizedValues,
      [abilityId]:
        currentValue + 1,
    };

    return (
      calculateSpentPoints(
        nextValues,
      ) <= pointBuyBudget
    );
  }

  return (
    <section className="creator-section creator-dossier-step">
      <header className="creator-section__header creator-dossier-step__header">
        <p className="creator-section__chapter">
          Kapitel V
        </p>

        <h2>Attribute</h2>

        <p>
          Verteile 27 Punkte auf die sechs
          Grundattribute. Die Werte liegen vor
          Abstammungsboni zwischen 8 und 15.
        </p>
      </header>

      {classDefinition && (
        <aside className="ability-guidance">
          <div className="ability-guidance__sigil" aria-hidden="true">◆</div>
          <div>
            <span>Empfehlung für {classDefinition.name}</span>
            <strong>Priorisiere {classDefinition.primaryAbilities.map((id) => abilityLabels[id]).join(" und ")}</strong>
            <p>Diese Attribute unterstützen die wichtigsten Klassenmerkmale deines gewählten Pfades.</p>
          </div>
        </aside>
      )}

      <section className="point-buy-toolbar point-buy-toolbar--reforged">
        <div className="point-buy-budget">
          <span>
            Verbleibende Punkte
          </span>

          <strong
            className={
              remainingPoints === 0
                ? "point-buy-budget--complete"
                : ""
            }
          >
            {remainingPoints}
            <small>
              {" "}
              / {pointBuyBudget}
            </small>
          </strong>
        </div>

        <div className="point-buy-toolbar__actions">
          <button
            type="button"
            onClick={() =>
              onChange({
                ...pointBuyStart,
              })
            }
          >
            Zurücksetzen
          </button>

          <button
            type="button"
            onClick={() =>
              onChange({
                ...standardArray,
              })
            }
          >
            Standardwerte
          </button>
        </div>
      </section>

      <div className="point-buy-grid">
        {abilityIds.map(
          (abilityId) => {
            const value =
              normalizedValues[
                abilityId
              ];

            const ancestryBonus = ancestryBonuses[abilityId] ?? 0;
            const finalValue = value + ancestryBonus;
            const modifier =
              getAbilityModifier(
                finalValue,
              );

            const cost =
              pointBuyCosts[value];

            return (
              <article
                key={abilityId}
                className={["point-buy-card", recommendedAbilities.has(abilityId) ? "point-buy-card--recommended" : ""].filter(Boolean).join(" ")}
              >
                <header className="point-buy-card__header">
                  <div>
                    <span>
                      {abilityShortLabels[abilityId]}
                      {recommendedAbilities.has(abilityId) && <em>Empfohlen</em>}
                    </span>

                    <h3>
                      {
                        abilityLabels[
                          abilityId
                        ]
                      }
                    </h3>
                  </div>

                  <strong>
                    {formatAbilityModifier(
                      modifier,
                    )}
                  </strong>
                </header>

                <div className="point-buy-card__controls">
                  <button
                    type="button"
                    aria-label={`${abilityLabels[abilityId]} senken`}
                    disabled={value <= 8}
                    onClick={() =>
                      changeAbility(
                        abilityId,
                        -1,
                      )
                    }
                  >
                    −
                  </button>

                  <output>
                    {value}
                    {ancestryBonus > 0 && <small> +{ancestryBonus} = {finalValue}</small>}
                  </output>

                  <button
                    type="button"
                    aria-label={`${abilityLabels[abilityId]} erhöhen`}
                    disabled={
                      !canIncrease(
                        abilityId,
                      )
                    }
                    onClick={() =>
                      changeAbility(
                        abilityId,
                        1,
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <dl className="point-buy-card__facts">
                  <div>
                    <dt>Punktkosten</dt>

                    <dd>{cost}</dd>
                  </div>

                  <div>
                    <dt>Modifikator</dt>

                    <dd>
                      {formatAbilityModifier(
                        modifier,
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          },
        )}
      </div>

      <section className="point-buy-costs">
        <header>
          <span>Point-Buy-Tabelle</span>

          <strong>
            Werte vor Abstammungsboni
          </strong>
        </header>

        <div>
          {Object.entries(
            pointBuyCosts,
          ).map(([score, cost]) => (
            <span key={score}>
              <strong>{score}</strong>
              <small>
                {cost} Punkte
              </small>
            </span>
          ))}
        </div>
      </section>

      {remainingPoints > 0 && (
        <p className="point-buy-warning">
          Du kannst noch{" "}
          {remainingPoints}{" "}
          {remainingPoints === 1
            ? "Punkt"
            : "Punkte"}{" "}
          verteilen.
        </p>
      )}
    </section>
  );
}

function calculateSpentPoints(
  values: AbilityScores,
): number {
  return abilityIds.reduce(
    (total, abilityId) => {
      const value =
        normalizePointBuyValue(
          values[abilityId],
        );

      return (
        total +
        pointBuyCosts[value]
      );
    },
    0,
  );
}

function normalizePointBuyScores(
  values: AbilityScores,
): AbilityScores {
  return {
    strength:
      normalizePointBuyValue(
        values.strength,
      ),

    dexterity:
      normalizePointBuyValue(
        values.dexterity,
      ),

    constitution:
      normalizePointBuyValue(
        values.constitution,
      ),

    intelligence:
      normalizePointBuyValue(
        values.intelligence,
      ),

    wisdom:
      normalizePointBuyValue(
        values.wisdom,
      ),

    charisma:
      normalizePointBuyValue(
        values.charisma,
      ),
  };
}

function normalizePointBuyValue(
  value: number,
): number {
  if (!Number.isFinite(value)) {
    return 8;
  }

  return Math.max(
    8,
    Math.min(
      15,
      Math.floor(value),
    ),
  );
}