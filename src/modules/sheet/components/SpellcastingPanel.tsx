import {
  abilityLabels,
  formatAbilityModifier,
} from "../../../compendium/core";

import {
  getSpellById,
} from "../../../compendium/spells";

import type {
  CharacterSpellcasting,
  SpellComponents,
  SpellSlots,
} from "../../../compendium/spells";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

import {
  getSpellDisplayValues,
} from "../utils/getSpellDisplayValues";

import type {
  SpellcastingStats,
} from "../utils/getSpellcastingStats";

interface SpellcastingPanelProps {
  character: CharacterArchiveEntry;
  stats: SpellcastingStats;

  onChange: (
    spellcasting: CharacterSpellcasting,
  ) => void;
}

const normalSpellLevels = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
] as const;

type NormalSpellLevel =
  (typeof normalSpellLevels)[number];

export function SpellcastingPanel({
  character,
  stats,
  onChange,
}: SpellcastingPanelProps) {
  const spellcasting =
    getCharacterSpellcasting(character);

  const selectedSpells =
    spellcasting.spellIds.flatMap(
      (selection) => {
        const spell =
          getSpellById(
            selection.spellId,
          );

        return spell
          ? [{ spell, selection }]
          : [];
      },
    );

  const cantrips =
    selectedSpells.filter(
      ({ spell }) =>
        spell.level === 0,
    );

  const levelledSpells =
    selectedSpells.filter(
      ({ spell }) =>
        spell.level > 0,
    );

  function changeNormalSlot(
    level: NormalSpellLevel,
    amount: number,
  ) {
    const maximum =
      stats.spellSlots[level] ?? 0;

    const current =
      spellcasting
        .slots
        .spentSlots[level] ?? 0;

    const next = Math.max(
      0,
      Math.min(
        maximum,
        current + amount,
      ),
    );

    onChange({
      ...spellcasting,

      slots: {
        ...spellcasting.slots,

        spentSlots: {
          ...spellcasting
            .slots
            .spentSlots,

          [level]: next,
        },
      },
    });
  }

  function changePactSlot(
    amount: number,
  ) {
    if (!stats.pactSlots) {
      return;
    }

    const next = Math.max(
      0,
      Math.min(
        stats.pactSlots.slots,

        spellcasting
          .slots
          .spentPactSlots +
          amount,
      ),
    );

    onChange({
      ...spellcasting,

      slots: {
        ...spellcasting.slots,

        spentPactSlots: next,
      },
    });
  }

  return (
    <section className="compact-spellcasting">
      <header className="compact-combat-section__header">
        <div>
          <p>Magie</p>

          <h3>Zauberwirken</h3>
        </div>
      </header>

      <dl className="compact-spellcasting__stats">
        <SpellcastingStat
          label="Attribut"
          value={
            stats.abilityId
              ? abilityLabels[
                  stats.abilityId
                ]
              : "—"
          }
        />

        <SpellcastingStat
          label="Angriff"
          value={
            typeof stats
              .spellAttackBonus ===
            "number"
              ? formatAbilityModifier(
                  stats.spellAttackBonus,
                )
              : "—"
          }
        />

        <SpellcastingStat
          label="Zauber-SG"
          value={String(
            stats
              .spellSaveDifficultyClass ??
              "—",
          )}
        />

        <SpellcastingStat
          label="Fokus"
          value={
            stats.focusLabel ??
            "Keiner"
          }
        />
      </dl>

      <CompactSlotSection
        slots={stats.spellSlots}
        spentSlots={
          spellcasting
            .slots
            .spentSlots
        }
        onChange={
          changeNormalSlot
        }
      />

      {stats.pactSlots && (
        <article className="compact-pact-row">
          <div>
            <span>
              Paktmagie
            </span>

            <strong>
              Grad{" "}
              {
                stats.pactSlots
                  .slotLevel
              }
            </strong>
          </div>

          <output>
            {Math.max(
              0,
              stats.pactSlots
                .slots -
                spellcasting
                  .slots
                  .spentPactSlots,
            )}{" "}
            /{" "}
            {
              stats.pactSlots
                .slots
            }
          </output>

          <div className="compact-slot-actions">
            <button
              type="button"
              disabled={
                spellcasting
                  .slots
                  .spentPactSlots <= 0
              }
              onClick={() =>
                changePactSlot(-1)
              }
            >
              +
            </button>

            <button
              type="button"
              disabled={
                spellcasting
                  .slots
                  .spentPactSlots >=
                stats.pactSlots.slots
              }
              onClick={() =>
                changePactSlot(1)
              }
            >
              −
            </button>
          </div>
        </article>
      )}

      <CompactSpellList
        title="Zaubertricks"
        spells={cantrips}
        character={character}
        stats={stats}
      />

      <CompactSpellList
        title="Zauber"
        spells={levelledSpells}
        character={character}
        stats={stats}
      />
    </section>
  );
}

function SpellcastingStat({
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

interface CompactSlotSectionProps {
  slots: SpellSlots;
  spentSlots: SpellSlots;

  onChange: (
    level: NormalSpellLevel,
    amount: number,
  ) => void;
}

function CompactSlotSection({
  slots,
  spentSlots,
  onChange,
}: CompactSlotSectionProps) {
  const availableLevels =
    normalSpellLevels.filter(
      (level) =>
        (slots[level] ?? 0) > 0,
    );

  if (
    availableLevels.length === 0
  ) {
    return null;
  }

  return (
    <section className="compact-slot-list">
      {availableLevels.map(
        (level) => {
          const maximum =
            slots[level] ?? 0;

          const spent =
            spentSlots[level] ?? 0;

          const remaining =
            Math.max(
              0,
              maximum - spent,
            );

          return (
            <article
              key={level}
              className="compact-slot-row"
            >
              <span>
                Grad {level}
              </span>

              <div className="compact-slot-pips">
                {Array.from({
                  length: maximum,
                }).map((_, index) => (
                  <i
                    key={index}
                    className={[
                      "compact-slot-pip",

                      index < remaining
                        ? "compact-slot-pip--available"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                ))}
              </div>

              <output>
                {remaining} / {maximum}
              </output>

              <div className="compact-slot-actions">
                <button
                  type="button"
                  disabled={spent <= 0}
                  onClick={() =>
                    onChange(
                      level,
                      -1,
                    )
                  }
                >
                  +
                </button>

                <button
                  type="button"
                  disabled={
                    spent >= maximum
                  }
                  onClick={() =>
                    onChange(
                      level,
                      1,
                    )
                  }
                >
                  −
                </button>
              </div>
            </article>
          );
        },
      )}
    </section>
  );
}

interface ResolvedSpell {
  selection:
    CharacterSpellcasting["spellIds"][number];

  spell: NonNullable<
    ReturnType<
      typeof getSpellById
    >
  >;
}

function CompactSpellList({
  title,
  spells,
  character,
  stats,
}: {
  title: string;
  spells: ResolvedSpell[];
  character: CharacterArchiveEntry;
  stats: SpellcastingStats;
}) {
  return (
    <section className="compact-character-spells">
      <header>
        <h4>{title}</h4>

        <span>
          {spells.length}
        </span>
      </header>

      {spells.length === 0 ? (
        <div className="compact-combat-empty">
          <span>
            Keine Einträge gespeichert.
          </span>
        </div>
      ) : (
        <div className="compact-spell-list">
          {spells
            .slice()
            .sort(
              (left, right) =>
                left.spell.level -
                  right.spell.level ||
                left.spell.name.localeCompare(
                  right.spell.name,
                  "de",
                ),
            )
            .map(
              ({
                spell,
                selection,
              }) => {
                const displayValues =
                  getSpellDisplayValues({
                    spell,

                    characterLevel:
                      character.level,

                    spellcastingAbilityModifier:
                      stats
                        .abilityModifier ??
                      0,

                    spellAttackBonus:
                      stats
                        .spellAttackBonus,

                    spellSaveDifficultyClass:
                      stats
                        .spellSaveDifficultyClass,
                  });

                return (
                  <details
                    key={spell.id}
                    className="compact-spell-row"
                  >
                    <summary>
                      <div className="compact-spell-row__identity">
                        <span>
                          {spell.level === 0
                            ? "Zaubertrick"
                            : `Grad ${spell.level}`}
                        </span>

                        <strong>
                          {spell.name}
                        </strong>
                      </div>

                      <div className="compact-spell-row__values">
                        {displayValues
                          .spellAttackLabel && (
                          <span>
                            Angriff{" "}
                            <strong>
                              {
                                displayValues
                                  .spellAttackLabel
                              }
                            </strong>
                          </span>
                        )}

                        {displayValues
                          .damage && (
                          <span>
                            <strong>
                              {
                                displayValues
                                  .damage
                                  .dice
                              }
                            </strong>{" "}
                            {
                              displayValues
                                .damage
                                .type
                            }
                          </span>
                        )}

                        {displayValues
                          .healing && (
                          <span>
                            Heilung{" "}
                            <strong>
                              {
                                displayValues
                                  .healing
                                  .formatted
                              }
                            </strong>
                          </span>
                        )}

                        {displayValues
                          .savingThrow && (
                          <span>
                            RW{" "}
                            <strong>
                              {
                                displayValues
                                  .savingThrow
                                  .abilityLabel
                              }
                            </strong>
                          </span>
                        )}
                      </div>

                      {selection.prepared && (
                        <span className="compact-spell-row__prepared">
                          Vorbereitet
                        </span>
                      )}
                    </summary>

                    <div className="compact-spell-row__details">
                      <dl>
                        <SpellFact
                          label="Zeit"
                          value={
                            spell.castingTime
                          }
                        />

                        <SpellFact
                          label="Reichweite"
                          value={
                            spell.range
                          }
                        />

                        <SpellFact
                          label="Dauer"
                          value={
                            spell.duration
                          }
                        />

                        <SpellFact
                          label="Komponenten"
                          value={
                            formatComponents(
                              spell.components,
                            )
                          }
                        />
                      </dl>

                      <p>
                        {
                          spell.description
                        }
                      </p>

                      {displayValues
                        .savingThrow && (
                        <small>
                          {
                            displayValues
                              .savingThrow
                              .resultOnSuccess
                          }
                        </small>
                      )}

                      {spell.higherLevels && (
                        <small>
                          Höhere Grade:{" "}
                          {
                            spell.higherLevels
                          }
                        </small>
                      )}
                    </div>
                  </details>
                );
              },
            )}
        </div>
      )}
    </section>
  );
}

function SpellFact({
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

function getCharacterSpellcasting(
  character: CharacterArchiveEntry,
): CharacterSpellcasting {
  return character.spellcasting ?? {
    spellIds: [],

    slots: {
      spentSlots: {},
      spentPactSlots: 0,
    },
  };
}

function formatComponents(
  components: SpellComponents,
): string {
  const values: string[] = [];

  if (components.verbal) {
    values.push("V");
  }

  if (components.somatic) {
    values.push("G");
  }

  if (components.material) {
    values.push("M");
  }

  return values.length > 0
    ? values.join(", ")
    : "Keine";
}