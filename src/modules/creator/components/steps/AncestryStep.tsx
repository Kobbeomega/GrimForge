import {
  ancestries,
  ancestryTraits,
} from "../../../../compendium/ancestries";

import type {
  AncestryTraitCategory,
  AncestryTraitDefinition,
  CharacterAncestry,
  CharacterSize,
} from "../../../../compendium/ancestries";

import { CodexCard } from "../../../../components/ui/CodexCard";

interface AncestryStepProps {
  selectedId: string;

  selectedSize: CharacterSize;

  selectedTraitIds: string[];

  usesReducedSpeed: boolean;

  onSelect: (
    ancestryId: string,
    defaultSize: CharacterSize,
    traditionalTraitIds: string[],
  ) => void;

  onSizeChange: (
    size: CharacterSize,
  ) => void;

  onTraitIdsChange: (
    traitIds: string[],
  ) => void;

  onReducedSpeedChange: (
    value: boolean,
  ) => void;
}

const categoryLabels: Record<
  AncestryTraitCategory,
  string
> = {
  combat: "Kampf",
  exploration: "Erkundung",
  roleplay: "Rollenspiel",
};

const categoryDescriptions: Record<
  AncestryTraitCategory,
  string
> = {
  combat:
    "Angriff, Verteidigung und Widerstandskraft.",

  exploration:
    "Bewegung, Wahrnehmung, Reisen und Umwelt.",

  roleplay:
    "Fertigkeiten, Werkzeuge, soziale Fähigkeiten und Magie.",
};

/**
 * Diese Herkünfte dürfen klein oder
 * mittelgroß gewählt werden.
 */
const flexibleSizeAncestryIds =
  new Set([
    "cursed",
    "awakened",
    "dhampir",
    "disembodied",
    "wulven",
  ]);

/**
 * Diese Herkünfte dürfen bei kleiner Größe
 * ihre Bewegung auf 7,5 m reduzieren und
 * erhalten dafür eine zusätzliche Eigenschaft.
 */
const reducedSpeedAncestryIds =
  new Set([
    "dwarf",
    "gnome",
    "halfling",
    "cursed",
    "awakened",
    "dhampir",
    "disembodied",
    "changeling",
    "wulven",
  ]);

const traitCategories:
  AncestryTraitCategory[] = [
    "combat",
    "exploration",
    "roleplay",
  ];

export function AncestryStep({
  selectedId,
  selectedSize,
  selectedTraitIds,
  usesReducedSpeed,
  onSelect,
  onSizeChange,
  onTraitIdsChange,
  onReducedSpeedChange,
}: AncestryStepProps) {
  const selectedAncestry =
    ancestries.find(
      (entry) =>
        entry.id === selectedId,
    );

  const traditionalTraitIds =
    selectedAncestry
      ? getTraditionalTraitIds(
          selectedAncestry,
        )
      : [];

  const maximumTraitChoices =
    getMaximumTraitChoices({
      ancestry: selectedAncestry,
      size: selectedSize,
      usesReducedSpeed,
    });

  const selectedTraitCount =
    selectedTraitIds.length;

  const canChooseReducedSpeed =
    Boolean(
      selectedAncestry &&
        selectedSize === "small" &&
        reducedSpeedAncestryIds.has(
          selectedAncestry.id,
        ),
    );

  const usesTraditionalPackage =
    traditionalTraitIds.length > 0 &&
    areTraitSelectionsEqual(
      selectedTraitIds,
      traditionalTraitIds,
    );

  function handleSelectAncestry(
    ancestry: CharacterAncestry,
  ) {
    if (
      ancestry.id === selectedId
    ) {
      return;
    }

    const defaultSize =
      ancestry.size;

    onSelect(
      ancestry.id,
      defaultSize,
      getTraditionalTraitIds(
        ancestry,
      ),
    );
  }

  function handleSizeChange(
    size: CharacterSize,
  ) {
    if (size === selectedSize) {
      return;
    }

    onSizeChange(size);

    if (size !== "small") {
      onReducedSpeedChange(false);

      trimTraitSelections(
        8,
      );
    }
  }

  function handleReducedSpeedChange(
    enabled: boolean,
  ) {
    if (
      enabled ===
      usesReducedSpeed
    ) {
      return;
    }

    onReducedSpeedChange(enabled);

    if (!enabled) {
      trimTraitSelections(8);
    }
  }

  function trimTraitSelections(
    maximum: number,
  ) {
    if (
      selectedTraitIds.length <=
      maximum
    ) {
      return;
    }

    onTraitIdsChange(
      selectedTraitIds.slice(
        0,
        maximum,
      ),
    );
  }

  function applyTraditionalPackage() {
    if (!selectedAncestry) {
      return;
    }

    onTraitIdsChange(
      getTraditionalTraitIds(
        selectedAncestry,
      ).slice(
        0,
        maximumTraitChoices,
      ),
    );
  }

  function clearTraitSelection() {
    if (
      selectedTraitIds.length === 0
    ) {
      return;
    }

    onTraitIdsChange([]);
  }

  function toggleTrait(
    trait: AncestryTraitDefinition,
  ) {
    const selectionCount =
      countTraitSelections(
        selectedTraitIds,
        trait.id,
      );

    if (selectionCount > 0) {
      removeLastTraitSelection(
        trait.id,
      );

      return;
    }

    addTraitSelection(trait);
  }

  function addSecondTraitSelection(
    trait: AncestryTraitDefinition,
  ) {
    addTraitSelection(trait);
  }

  function addTraitSelection(
    trait: AncestryTraitDefinition,
  ) {
    const selectionCount =
      countTraitSelections(
        selectedTraitIds,
        trait.id,
      );

    if (
      selectionCount >=
      trait.maxSelections
    ) {
      return;
    }

    if (
      selectedTraitIds.length >=
      maximumTraitChoices
    ) {
      return;
    }

    onTraitIdsChange([
      ...selectedTraitIds,
      trait.id,
    ]);
  }

  function removeLastTraitSelection(
    traitId: string,
  ) {
    const lastIndex =
      selectedTraitIds.lastIndexOf(
        traitId,
      );

    if (lastIndex < 0) {
      return;
    }

    onTraitIdsChange(
      selectedTraitIds.filter(
        (_, index) =>
          index !== lastIndex,
      ),
    );
  }

  return (
    <section className="creator-section ancestry-builder">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel II
        </p>

        <h2>Herkunft</h2>

        <p>
          Wähle eine Herkunft und stelle
          anschließend acht passende
          Herkunftseigenschaften zusammen.
        </p>
      </header>

      <div className="creator-card-grid ancestry-builder__ancestries">
        {ancestries.map(
          (ancestry) => {
            const selected =
              selectedId ===
              ancestry.id;

            const packageTraitIds =
              getTraditionalTraitIds(
                ancestry,
              );

            return (
              <CodexCard
                key={ancestry.id}
                eyebrow={
                  getAncestryEyebrow(
                    ancestry,
                  )
                }
                title={ancestry.name}
                description={
                  ancestry.description
                }
                selected={selected}
                onClick={() =>
                  handleSelectAncestry(
                    ancestry,
                  )
                }
                metadata={[
                  `${formatSpeed(
                    ancestry.speed,
                  )} Bewegung`,

                  ancestry.darkvision
                    ? `${formatSpeed(
                        ancestry.darkvision,
                      )} Dunkelsicht`
                    : "Keine feste Dunkelsicht",

                  packageTraitIds.length >
                  0
                    ? `${packageTraitIds.length} traditionelle Eigenschaften`
                    : "Freie Eigenschaftsauswahl",
                ]}
              >
                <dl className="creator-ancestry-facts">
                  <div>
                    <dt>Größe</dt>

                    <dd>
                      {getAvailableSizes(
                        ancestry,
                      )
                        .map(
                          getSizeLabel,
                        )
                        .join(" oder ")}
                    </dd>
                  </div>

                  <div>
                    <dt>Standardpaket</dt>

                    <dd>
                      {packageTraitIds
                        .map(
                          (traitId) =>
                            getTraitName(
                              traitId,
                            ),
                        )
                        .join(", ") ||
                        "Keine traditionelle Vorgabe"}
                    </dd>
                  </div>
                </dl>
              </CodexCard>
            );
          },
        )}
      </div>

      {selectedAncestry && (
        <>
          <section className="ancestry-configuration">
            <header className="ancestry-configuration__header">
              <div>
                <p>
                  Herkunft konfigurieren
                </p>

                <h3>
                  {
                    selectedAncestry.name
                  }
                </h3>
              </div>

              <strong>
                {selectedTraitCount} /{" "}
                {maximumTraitChoices}
              </strong>
            </header>

            <div className="ancestry-configuration__controls">
              <section className="ancestry-size-choice">
                <header>
                  <span>Größe</span>

                  <small>
                    Die Größe beeinflusst
                    mögliche Bewegungsoptionen.
                  </small>
                </header>

                <div>
                  {getAvailableSizes(
                    selectedAncestry,
                  ).map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={
                        selectedSize ===
                        size
                          ? "ancestry-control-button ancestry-control-button--selected"
                          : "ancestry-control-button"
                      }
                      aria-pressed={
                        selectedSize ===
                        size
                      }
                      onClick={() =>
                        handleSizeChange(
                          size,
                        )
                      }
                    >
                      {getSizeLabel(size)}
                    </button>
                  ))}
                </div>
              </section>

              {canChooseReducedSpeed && (
                <section className="ancestry-speed-choice">
                  <header>
                    <span>
                      Zusätzliche Eigenschaft
                    </span>

                    <small>
                      Bewegung auf 7,5 m
                      reduzieren und eine
                      neunte Eigenschaft wählen.
                    </small>
                  </header>

                  <button
                    type="button"
                    className={
                      usesReducedSpeed
                        ? "ancestry-control-button ancestry-control-button--selected"
                        : "ancestry-control-button"
                    }
                    aria-pressed={
                      usesReducedSpeed
                    }
                    onClick={() =>
                      handleReducedSpeedChange(
                        !usesReducedSpeed,
                      )
                    }
                  >
                    {usesReducedSpeed
                      ? "7,5 m · Zusätzliche Auswahl aktiv"
                      : "9 m Bewegung behalten"}
                  </button>
                </section>
              )}
            </div>

            <div className="ancestry-package-actions">
              {traditionalTraitIds.length >
                0 && (
                <button
                  type="button"
                  className={
                    usesTraditionalPackage
                      ? "ancestry-package-button ancestry-package-button--active"
                      : "ancestry-package-button"
                  }
                  onClick={
                    applyTraditionalPackage
                  }
                >
                  Traditionelles Paket
                  übernehmen
                </button>
              )}

              <button
                type="button"
                className="ancestry-package-button"
                disabled={
                  selectedTraitIds.length ===
                  0
                }
                onClick={
                  clearTraitSelection
                }
              >
                Auswahl leeren
              </button>
            </div>
          </section>

          <section className="ancestry-trait-selection">
            {traitCategories.map(
              (category) => {
                const categoryTraits =
                  ancestryTraits.filter(
                    (trait) =>
                      trait.category ===
                      category,
                  );

                return (
                  <section
                    key={category}
                    className="ancestry-trait-category"
                  >
                    <header className="ancestry-trait-category__header">
                      <div>
                        <p>
                          Herkunftseigenschaften
                        </p>

                        <h3>
                          {
                            categoryLabels[
                              category
                            ]
                          }
                        </h3>

                        <span>
                          {
                            categoryDescriptions[
                              category
                            ]
                          }
                        </span>
                      </div>
                    </header>

                    <div className="ancestry-trait-grid">
                      {categoryTraits.map(
                        (trait) => {
                          const count =
                            countTraitSelections(
                              selectedTraitIds,
                              trait.id,
                            );

                          const selected =
                            count > 0;

                          const canAdd =
                            count <
                              trait.maxSelections &&
                            selectedTraitIds.length <
                              maximumTraitChoices;

                          return (
                            <article
                              key={
                                trait.id
                              }
                              className={[
                                "ancestry-trait-card",

                                selected
                                  ? "ancestry-trait-card--selected"
                                  : "",

                                count === 2
                                  ? "ancestry-trait-card--improved"
                                  : "",
                              ]
                                .filter(
                                  Boolean,
                                )
                                .join(
                                  " ",
                                )}
                            >
                              <button
                                type="button"
                                className="ancestry-trait-card__main"
                                aria-pressed={
                                  selected
                                }
                                onClick={() =>
                                  toggleTrait(
                                    trait,
                                  )
                                }
                              >
                                <header>
                                  <div>
                                    <span>
                                      {
                                        categoryLabels[
                                          trait
                                            .category
                                        ]
                                      }
                                    </span>

                                    <h4>
                                      {
                                        trait.name
                                      }
                                    </h4>
                                  </div>

                                  <strong>
                                    {count > 0
                                      ? `${count}×`
                                      : "Wählen"}
                                  </strong>
                                </header>

                                <p>
                                  {
                                    trait.description
                                  }
                                </p>
                              </button>

                              {trait.maxSelections ===
                                2 &&
                                selected && (
                                  <footer>
                                    <span>
                                      {count ===
                                      2
                                        ? trait.secondSelectionName ??
                                          "Verbessert"
                                        : "Zweitwahl möglich"}
                                    </span>

                                    <div>
                                      <button
                                        type="button"
                                        disabled={
                                          count <
                                          2
                                        }
                                        onClick={() =>
                                          removeLastTraitSelection(
                                            trait.id,
                                          )
                                        }
                                      >
                                        −
                                      </button>

                                      <button
                                        type="button"
                                        disabled={
                                          !canAdd
                                        }
                                        onClick={() =>
                                          addSecondTraitSelection(
                                            trait,
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </footer>
                                )}
                            </article>
                          );
                        },
                      )}
                    </div>
                  </section>
                );
              },
            )}
          </section>

          <footer className="ancestry-selection-summary">
            <div>
              <span>Auswahl</span>

              <strong>
                {selectedTraitCount} von{" "}
                {maximumTraitChoices}
              </strong>
            </div>

            <div>
              <span>Größe</span>

              <strong>
                {getSizeLabel(
                  selectedSize,
                )}
              </strong>
            </div>

            <div>
              <span>Bewegung</span>

              <strong>
                {usesReducedSpeed
                  ? "7,5 m"
                  : formatSpeed(
                      selectedAncestry.speed,
                    )}
              </strong>
            </div>

            <p>
              {selectedTraitCount ===
              maximumTraitChoices
                ? "Die Herkunft ist vollständig konfiguriert."
                : `Wähle noch ${
                    maximumTraitChoices -
                    selectedTraitCount
                  } ${
                    maximumTraitChoices -
                      selectedTraitCount ===
                    1
                      ? "Eigenschaft"
                      : "Eigenschaften"
                  }.`}
            </p>
          </footer>
        </>
      )}
    </section>
  );
}

function getAvailableSizes(
  ancestry: CharacterAncestry,
): CharacterSize[] {
  if (
    flexibleSizeAncestryIds.has(
      ancestry.id,
    )
  ) {
    return [
      "small",
      "medium",
    ];
  }

  return [ancestry.size];
}

function getMaximumTraitChoices({
  ancestry,
  size,
  usesReducedSpeed,
}: {
  ancestry:
    | CharacterAncestry
    | undefined;

  size: CharacterSize;

  usesReducedSpeed: boolean;
}): number {
  if (!ancestry) {
    return 8;
  }

  const receivesExtraTrait =
    size === "small" &&
    usesReducedSpeed &&
    reducedSpeedAncestryIds.has(
      ancestry.id,
    );

  return receivesExtraTrait
    ? 9
    : 8;
}

function getTraditionalTraitIds(
  ancestry: CharacterAncestry,
): string[] {
  return ancestry.traits.flatMap(
    (traitName) => {
      const trait =
        ancestryTraits.find(
          (entry) =>
            normalizeLabel(
              entry.name,
            ) ===
            normalizeLabel(
              removeTraitQualifier(
                traitName,
              ),
            ),
        );

      return trait
        ? [trait.id]
        : [];
    },
  );
}

function removeTraitQualifier(
  value: string,
): string {
  return value
    .split(":")[0]
    .trim();
}

function normalizeLabel(
  value: string,
): string {
  return value
    .trim()
    .toLocaleLowerCase("de-DE");
}

function countTraitSelections(
  selectedTraitIds: string[],
  traitId: string,
): number {
  return selectedTraitIds.filter(
    (entry) =>
      entry === traitId,
  ).length;
}

function areTraitSelectionsEqual(
  left: string[],
  right: string[],
): boolean {
  if (
    left.length !== right.length
  ) {
    return false;
  }

  const sortedLeft =
    [...left].sort();

  const sortedRight =
    [...right].sort();

  return sortedLeft.every(
    (entry, index) =>
      entry === sortedRight[index],
  );
}

function getTraitName(
  traitId: string,
): string {
  return (
    ancestryTraits.find(
      (trait) =>
        trait.id === traitId,
    )?.name ?? traitId
  );
}

function getSizeLabel(
  size: CharacterSize,
): string {
  return size === "small"
    ? "Klein"
    : "Mittelgroß";
}

function getAncestryEyebrow(
  ancestry: CharacterAncestry,
): string {
  if (
    ancestry.id === "custom"
  ) {
    return "Freie Herkunft";
  }

  if (
    [
      "dreamer",
      "grudgel",
      "laneshi",
      "ogresh",
    ].includes(ancestry.id)
  ) {
    return "Seltene Herkunft";
  }

  if (
    [
      "cursed",
      "awakened",
      "dhampir",
      "disembodied",
      "fallen",
      "changeling",
      "wulven",
    ].includes(ancestry.id)
  ) {
    return "Unheimliche Herkunft";
  }

  return "Gewöhnliche Herkunft";
}

function formatSpeed(
  value: number,
): string {
  return Number.isInteger(value)
    ? `${value} m`
    : `${String(value).replace(
        ".",
        ",",
      )} m`;
}