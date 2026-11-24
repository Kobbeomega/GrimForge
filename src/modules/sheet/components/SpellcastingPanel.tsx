import { useState } from "react";
import {
  abilityLabels,
  formatAbilityModifier,
} from "../../../compendium/core";

import {
  getSpellById,
} from "../../../compendium/spells";
import type { SpellDefinition } from "../../../compendium/spells";
import { spellFact } from "../../../compendium/spells/spellFact";

import { getGrantedSubclassSpellIds } from "../../../compendium/classes";

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
    notice?: string,
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

  const grantedIds = getGrantedSubclassSpellIds({
    classId: character.classId ?? "",
    subclassId: character.subclassId,
    level: character.level,
    pathChoices: character.pathChoices,
  });

  const selectedSpells = [
    ...spellcasting.spellIds,
    ...grantedIds
      .filter((spellId) => !spellcasting.spellIds.some((selection) => selection.spellId === spellId))
      .map((spellId) => ({ spellId, prepared: true })),
  ].flatMap((selection) => {
    const spell = getSpellById(selection.spellId);
    return spell ? [{ spell, selection }] : [];
  });

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

  function castSpell(spell: SpellDefinition, choice: string) {
    if (!spell || spell.level < 1) return;
    const [kind, rawLevel] = choice.split(":");
    const level = Number(rawLevel);
    if (!Number.isSafeInteger(level) || level < spell.level) return;
    const details = level > spell.level ? " · höherer Grad: Skalierung im Zaubertext prüfen." : "";
    const concentration = spell.concentration ? " · Konzentration beachten." : "";
    if (kind === "pact" && stats.pactSlots?.slotLevel === level &&
        spellcasting.slots.spentPactSlots < stats.pactSlots.slots) {
      onChange({ ...spellcasting, slots: { ...spellcasting.slots,
        spentPactSlots: spellcasting.slots.spentPactSlots + 1 } },
      `${spell.name}: Paktplatz Grad ${level} verbraucht${details}${concentration}`);
      return;
    }
    if (kind !== "normal" || !normalSpellLevels.some((entry) => entry === level) ||
        (stats.spellSlots[level as NormalSpellLevel] ?? 0) <= (spellcasting.slots.spentSlots[level as NormalSpellLevel] ?? 0)) return;
    const normalLevel = level as NormalSpellLevel;
    onChange({ ...spellcasting, slots: { ...spellcasting.slots, spentSlots: {
      ...spellcasting.slots.spentSlots,
      [normalLevel]: (spellcasting.slots.spentSlots[normalLevel] ?? 0) + 1,
    } } }, `${spell.name}: Zauberplatz Grad ${level} verbraucht${details}${concentration}`);
  }

  function availableSlots(spellLevel: number): Array<{ value: string; label: string }> {
    const normal = normalSpellLevels.flatMap((level) => level >= spellLevel &&
      (stats.spellSlots[level] ?? 0) > (spellcasting.slots.spentSlots[level] ?? 0)
      ? [{ value: `normal:${level}`, label: `Grad ${level} · ${(stats.spellSlots[level] ?? 0) - (spellcasting.slots.spentSlots[level] ?? 0)} frei` }] : []);
    if (stats.pactSlots && stats.pactSlots.slotLevel >= spellLevel &&
        stats.pactSlots.slots > spellcasting.slots.spentPactSlots) {
      normal.push({ value: `pact:${stats.pactSlots.slotLevel}`, label: `Pakt Grad ${stats.pactSlots.slotLevel} · ${stats.pactSlots.slots - spellcasting.slots.spentPactSlots} frei` });
    }
    return normal;
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
        onCast={castSpell}
        availableSlots={availableSlots}
      />

      <CompactSpellList
        title="Zauber"
        spells={levelledSpells}
        character={character}
        stats={stats}
        onCast={castSpell}
        availableSlots={availableSlots}
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
  onCast,
  availableSlots,
}: {
  title: string;
  spells: ResolvedSpell[];
  character: CharacterArchiveEntry;
  stats: SpellcastingStats;
  onCast: (spell: SpellDefinition, slot: string) => void;
  availableSlots: (spellLevel: number) => Array<{value: string; label: string}>;
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
                const pact = character.pathChoices?.["warlock-pact-boon"];
                const pactRitual = character.classId === "warlock" && character.level >= 3 &&
                  (pact === "chain" || (Array.isArray(pact) && pact.includes("chain"))) && spell.id === "find-familiar";
                const spiritRitual = character.classId === "barbarian" && character.subclassId === "totem-warrior" &&
                  character.level >= 3 && ["beast-sense", "speak-with-animals"].includes(spell.id);
                const shadowKi = character.classId === "monk" && character.subclassId === "way-of-shadow" &&
                  character.level >= 3 && ["darkness", "darkvision", "pass-without-trace", "silence"].includes(spell.id);
                const displayValues =
                  getSpellDisplayValues({
                    spell,
                    invocations: character.pathChoices?.["warlock-invocations"],
        lifeDomainHealing: character.classId === "cleric" && character.subclassId === "life-domain",

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
                            {displayValues.attackCount && displayValues.attackCount > 1 ? `${displayValues.attackCount} Angriffe` : "Angriff"}{" "}
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
                            {displayValues.damage.note ? ` · ${displayValues.damage.note}` : ""}
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
                            {displayValues.savingThrow.difficultyClass !== undefined ? ` · SG ${displayValues.savingThrow.difficultyClass}` : ""}
                          </span>
                        )}
                      </div>

                      {selection.prepared && (
                        <span className="compact-spell-row__prepared">
                          {pactRitual ? "Pakt-Ritual" : spiritRitual ? "Nur als Ritual" : shadowKi ? "2 Ki · keine Materialkomponenten" : "Vorbereitet"}
                        </span>
                      )}

                      {spell.level > 0 && selection.prepared && !pactRitual && !spiritRitual && !shadowKi && (
                        <SpellCastControl spell={spell} options={availableSlots(spell.level)} onCast={onCast} />
                      )}
                    </summary>

                    <div className="compact-spell-row__details">
                      {displayValues.savingThrow?.resultOnSuccess && <p>{displayValues.savingThrow.resultOnSuccess}</p>}
                      {spell.mechanicsReview === "source-excerpt" && <p><small>Regelauszug. Bei Sonderfällen gilt die verlinkte Regelquelle im Kompendium.</small></p>}
                      <dl>
                        <SpellFact
                          label="Zeit"
                          value={spellFact(spell.castingTime)}
                        />

                        <SpellFact
                          label="Reichweite"
                          value={spellFact(spell.range)}
                        />

                        <SpellFact
                          label="Dauer"
                          value={spellFact(spell.duration)}
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

function SpellCastControl({ spell, options, onCast }: {
  spell: SpellDefinition;
  options: Array<{ value: string; label: string }>;
  onCast: (spell: SpellDefinition, slot: string) => void;
}) {
  const [requested, setRequested] = useState("");
  const chosen = options.some((entry) => entry.value === requested) ? requested : (options[0]?.value ?? "");
  const selectedLevel = Number(chosen.split(":")[1] ?? 0);
  return <span className="gf-cast-control" onClick={(event) => event.stopPropagation()}>
    <label><span>Zauberplatz</span><select value={chosen} aria-label={`Zauberplatz für ${spell.name}`}
      disabled={!options.length} onClick={(event) => event.stopPropagation()}
      onChange={(event) => setRequested(event.target.value)}>
      {options.length ? options.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>) : <option value="">Keine Plätze</option>}
    </select></label>
    <button type="button" className="compact-spell-row__cast" disabled={!chosen}
      title={selectedLevel > spell.level ? "Höherer Grad: Skalierung in der Beschreibung beachten" : undefined}
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); onCast(spell, chosen); }}>Wirken</button>
  </span>;
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
