import { ancestries } from "../../../../compendium/ancestries";
import {
  abilityLabels,
  type AbilityId,
} from "../../../../compendium/core";

import { CodexCard } from "../../../../components/ui/CodexCard";

interface AncestryStepProps {
  selectedId: string;
  selectedVariantId: string;
  selectedBonusChoices: AbilityId[];

  onSelect: (ancestryId: string) => void;
  onSelectVariant: (variantId: string) => void;
  onBonusChoicesChange: (
    abilityIds: AbilityId[],
  ) => void;
}

export function AncestryStep({
  selectedId,
  selectedVariantId,
  selectedBonusChoices,
  onSelect,
  onSelectVariant,
  onBonusChoicesChange,
}: AncestryStepProps) {
  const selectedAncestry = ancestries.find(
    (entry) => entry.id === selectedId,
  );

  function toggleBonusChoice(
    abilityId: AbilityId,
  ) {
    const choiceRule =
      selectedAncestry?.abilityBonusChoice;

    if (!choiceRule) {
      return;
    }

    const isSelected =
      selectedBonusChoices.includes(abilityId);

    if (isSelected) {
      onBonusChoicesChange(
        selectedBonusChoices.filter(
          (entry) => entry !== abilityId,
        ),
      );

      return;
    }

    if (
      selectedBonusChoices.length >=
      choiceRule.choose
    ) {
      return;
    }

    onBonusChoicesChange([
      ...selectedBonusChoices,
      abilityId,
    ]);
  }

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel II
        </p>

        <h2>Abstammung</h2>

        <p>
          Wähle die Herkunft und Blutlinie deines
          Charakters.
        </p>
      </header>

      <div className="creator-card-grid">
        {ancestries.map((ancestry) => {
          const selected =
            selectedId === ancestry.id;

          const fixedBonuses =
            formatAbilityBonuses(
              ancestry.abilityBonuses,
            );

          return (
            <CodexCard
              key={ancestry.id}
              eyebrow={
                ancestry.size === "medium"
                  ? "Mittlere Gestalt"
                  : "Kleine Gestalt"
              }
              title={ancestry.name}
              description={ancestry.description}
              selected={selected}
              onClick={() =>
                onSelect(ancestry.id)
              }
              metadata={[
                `${ancestry.speed} m Bewegung`,
                ancestry.darkvision
                  ? `${ancestry.darkvision} m Dunkelsicht`
                  : "Keine Dunkelsicht",
                fixedBonuses ||
                  "Freie Attributswahl",
              ]}
            >
              <dl className="creator-ancestry-facts">
                <div>
                  <dt>Sprachen</dt>

                  <dd>
                    {ancestry.languages.join(", ")}
                  </dd>
                </div>

                <div>
                  <dt>Merkmale</dt>

                  <dd>
                    {ancestry.traits.length > 0
                      ? ancestry.traits.join(", ")
                      : "Keine Merkmale eingetragen"}
                  </dd>
                </div>

                <div>
                  <dt>Varianten</dt>

                  <dd>
                    {ancestry.variants.length}
                  </dd>
                </div>
              </dl>
            </CodexCard>
          );
        })}
      </div>

      {selectedAncestry &&
        selectedAncestry.variants.length > 0 && (
          <section className="creator-variant-section">
            <header className="creator-variant-section__header">
              <p className="creator-section__chapter">
                Herkunftslinie
              </p>

              <h3>
                Varianten von {selectedAncestry.name}
              </h3>

              <p>
                Wähle eine genauere Herkunft für die
                entstehende Akte.
              </p>
            </header>

            <div className="creator-variant-grid">
              {selectedAncestry.variants.map(
                (variant) => {
                  const selected =
                    selectedVariantId ===
                    variant.id;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      className={[
                        "creator-variant-card",
                        selected
                          ? "creator-variant-card--selected"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() =>
                        onSelectVariant(
                          variant.id,
                        )
                      }
                    >
                      <strong>
                        {variant.name}
                      </strong>

                      <span>
                        {variant.description}
                      </span>

                      <small>
                        {variant.traits.length > 0
                          ? variant.traits.join(
                              " · ",
                            )
                          : "Keine zusätzlichen Merkmale"}
                      </small>
                    </button>
                  );
                },
              )}
            </div>
          </section>
        )}

      {selectedAncestry?.abilityBonusChoice && (
        <section className="creator-bonus-section">
          <header className="creator-variant-section__header">
            <p className="creator-section__chapter">
              Freie Attributsboni
            </p>

            <h3>
              {selectedBonusChoices.length} von{" "}
              {
                selectedAncestry
                  .abilityBonusChoice.choose
              }{" "}
              gewählt
            </h3>

            <p>
              Jede gewählte Fähigkeit erhält einen
              Bonus von +
              {
                selectedAncestry
                  .abilityBonusChoice.bonus
              }
              .
            </p>
          </header>

          <div className="creator-bonus-grid">
            {getAvailableAbilities(
              selectedAncestry
                .abilityBonusChoice.exclude,
            ).map((abilityId) => {
              const selected =
                selectedBonusChoices.includes(
                  abilityId,
                );

              const selectionFull =
                selectedBonusChoices.length >=
                selectedAncestry
                  .abilityBonusChoice!.choose;

              return (
                <button
                  key={abilityId}
                  type="button"
                  className={[
                    "creator-bonus-card",
                    selected
                      ? "creator-bonus-card--selected"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={
                    !selected && selectionFull
                  }
                  onClick={() =>
                    toggleBonusChoice(abilityId)
                  }
                >
                  {abilityLabels[abilityId]}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}

function formatAbilityBonuses(
  bonuses: Partial<Record<AbilityId, number>>,
): string {
  return Object.entries(bonuses)
    .map(([abilityId, bonus]) => {
      const typedAbilityId =
        abilityId as AbilityId;

      return `${abilityLabels[typedAbilityId]} +${bonus}`;
    })
    .join(" · ");
}

function getAvailableAbilities(
  excludedAbilities: AbilityId[] = [],
): AbilityId[] {
  const allAbilities: AbilityId[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  return allAbilities.filter(
    (abilityId) =>
      !excludedAbilities.includes(abilityId),
  );
}