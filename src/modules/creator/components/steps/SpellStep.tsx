import {
  useState,
} from "react";

import {
  abilityLabels,
  getAbilityModifier,
} from "../../../../compendium/core";

import {
  getClassSpellcasting,
  getSpellsForClass,
} from "../../../../compendium/spells";

import type {
  AbilityScores,
} from "../../../../compendium/core";

import type {
  CharacterSpellcasting,
  CharacterSpellSelection,
  SpellDefinition,
} from "../../../../compendium/spells";

import {
  getSpellDisplayValues,
} from "../../../sheet/utils/getSpellDisplayValues";

import {
  getSpellSelectionRules,
} from "../../utils/getSpellSelectionRules";

const spellSchoolLabels = {
  abjuration: "Bannmagie",
  conjuration: "Beschwörung",
  divination: "Erkenntnismagie",
  enchantment: "Verzauberung",
  evocation: "Hervorrufung",
  illusion: "Illusion",
  necromancy: "Nekromantie",
  transmutation: "Verwandlung",
} as const;

type SpellSchoolFilter =
  | "all"
  | keyof typeof spellSchoolLabels;

interface SpellsStepProps {
  classId: string;
  level: number;

  abilityScores: AbilityScores;

  value: CharacterSpellcasting;

  onChange: (
    spellcasting:
      CharacterSpellcasting,
  ) => void;
}

export function SpellsStep({
  classId,
  level,
  abilityScores,
  value,
  onChange,
}: SpellsStepProps) {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [schoolFilter, setSchoolFilter] =
    useState<SpellSchoolFilter>("all");

  const [selectedOnly, setSelectedOnly] =
    useState(false);

  const definition =
    getClassSpellcasting(
      classId,
    );

  const rules =
    getSpellSelectionRules({
      classId,
      level,
      abilityScores,
    });

  if (!definition) {
    return (
      <section className="creator-section">
        <header className="creator-section__header">
          <p className="creator-section__chapter">
            Kapitel VIII
          </p>

          <h2>Zauber</h2>

          <p>
            Diese Klasse besitzt keine
            Zauberausbildung.
          </p>
        </header>

        <div className="compact-empty-state">
          <strong>
            Keine Zauberauswahl
            notwendig
          </strong>

          <span>
            Fahre mit dem nächsten
            Kapitel fort.
          </span>
        </div>
      </section>
    );
  }

  const spellcastingAbilityModifier =
    getAbilityModifier(
      abilityScores[
        definition.abilityId
      ],
    );

  const availableSpells =
    getSpellsForClass(
      classId,
    ).filter(
      (spell) =>
        spell.level === 0 ||
        spell.level <=
          rules.maximumSpellLevel,
    );

  const normalizedSearch =
    searchQuery.trim().toLocaleLowerCase("de");

  const filteredSpells =
    availableSpells.filter((spell) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        spell.name
          .toLocaleLowerCase("de")
          .includes(normalizedSearch) ||
        spell.description
          .toLocaleLowerCase("de")
          .includes(normalizedSearch);

      const matchesSchool =
        schoolFilter === "all" ||
        spell.school === schoolFilter;

      const matchesSelection =
        !selectedOnly ||
        value.spellIds.some(
          (selection) =>
            selection.spellId === spell.id,
        );

      return (
        matchesSearch &&
        matchesSchool &&
        matchesSelection
      );
    });

  const cantrips =
    filteredSpells.filter(
      (spell) =>
        spell.level === 0,
    );

  const levelledSpells =
    filteredSpells.filter(
      (spell) =>
        spell.level > 0,
    );

  const selectedCantrips =
    countSelectedSpells(
      value,
      availableSpells,
      (spell) =>
        spell.level === 0,
    );

  const selectedLevelledSpells =
    countSelectedSpells(
      value,
      availableSpells,
      (spell) =>
        spell.level > 0,
    );

  const preparedSpells =
    value.spellIds.filter(
      (selection) => {
        const spell =
          availableSpells.find(
            (entry) =>
              entry.id ===
              selection.spellId,
          );

        return (
          Boolean(spell) &&
          spell!.level > 0 &&
          selection.prepared
        );
      },
    ).length;

  function isSelected(
    spellId: string,
  ): boolean {
    return value.spellIds.some(
      (selection) =>
        selection.spellId ===
        spellId,
    );
  }

  function isPrepared(
    spellId: string,
  ): boolean {
    return value.spellIds.some(
      (selection) =>
        selection.spellId ===
          spellId &&
        selection.prepared,
    );
  }

  function toggleSpell(
    spell: SpellDefinition,
  ) {
    if (isSelected(spell.id)) {
      onChange({
        ...value,

        spellIds:
          value.spellIds.filter(
            (selection) =>
              selection.spellId !==
              spell.id,
          ),
      });

      return;
    }

    if (
      spell.level === 0 &&
      selectedCantrips >=
        rules.cantripsRequired
    ) {
      return;
    }

    if (
      spell.level > 0 &&
      selectedLevelledSpells >=
        rules.levelledSpellsRequired
    ) {
      return;
    }

    const selection:
      CharacterSpellSelection = {
        spellId: spell.id,

        prepared:
          rules.mode !==
            "spellbook" ||
          preparedSpells <
            rules.preparedSpellsRequired,
      };

    onChange({
      ...value,

      spellIds: [
        ...value.spellIds,
        selection,
      ],
    });
  }

  function togglePrepared(
    spellId: string,
  ) {
    if (
      rules.mode !==
      "spellbook"
    ) {
      return;
    }

    const currentlyPrepared =
      isPrepared(spellId);

    if (
      !currentlyPrepared &&
      preparedSpells >=
        rules.preparedSpellsRequired
    ) {
      return;
    }

    onChange({
      ...value,

      spellIds:
        value.spellIds.map(
          (selection) =>
            selection.spellId ===
            spellId
              ? {
                  ...selection,

                  prepared:
                    !selection.prepared,
                }
              : selection,
        ),
    });
  }

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel VIII
        </p>

        <h2>Zauber</h2>

        <p>
          Wähle die magischen
          Fähigkeiten, mit denen dein
          Charakter seine Laufbahn
          beginnt.
        </p>
      </header>

      <dl className="compact-spell-summary">
        <SummaryValue
          label="Zauberattribut"
          value={
            abilityLabels[
              definition.abilityId
            ]
          }
        />

        <SummaryValue
          label="Zaubertricks"
          value={`${selectedCantrips} / ${rules.cantripsRequired}`}
        />

        <SummaryValue
          label={
            rules.mode ===
            "spellbook"
              ? "Zauberbuch"
              : "Zauber"
          }
          value={`${selectedLevelledSpells} / ${rules.levelledSpellsRequired}`}
        />

        {rules.mode ===
          "spellbook" && (
          <SummaryValue
            label="Vorbereitet"
            value={`${preparedSpells} / ${rules.preparedSpellsRequired}`}
          />
        )}
      </dl>

      <section className="creator-spell-toolbar" aria-label="Zauber filtern">
        <label className="creator-spell-toolbar__search">
          <span>Zauber durchsuchen</span>
          <input
            type="search"
            value={searchQuery}
            placeholder="Name oder Beschreibung …"
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />
        </label>

        <label>
          <span>Schule</span>
          <select
            value={schoolFilter}
            onChange={(event) =>
              setSchoolFilter(
                event.target.value as SpellSchoolFilter,
              )
            }
          >
            <option value="all">Alle Schulen</option>
            {Object.entries(spellSchoolLabels).map(
              ([school, label]) => (
                <option key={school} value={school}>
                  {label}
                </option>
              ),
            )}
          </select>
        </label>

        <button
          type="button"
          className={[
            "creator-spell-toolbar__toggle",
            selectedOnly
              ? "creator-spell-toolbar__toggle--active"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-pressed={selectedOnly}
          onClick={() =>
            setSelectedOnly((current) => !current)
          }
        >
          Nur gewählte
        </button>

        <span className="creator-spell-toolbar__result">
          {filteredSpells.length} von {availableSpells.length}
        </span>
      </section>

      <CompactSpellSection
        title="Zaubertricks"
        counter={`${selectedCantrips} von ${rules.cantripsRequired}`}
        spells={cantrips}
        characterLevel={level}
        spellcastingAbilityModifier={
          spellcastingAbilityModifier
        }
        isSelected={isSelected}
        isPrepared={isPrepared}
        onToggle={toggleSpell}
        onTogglePrepared={
          togglePrepared
        }
        showPreparedToggle={
          false
        }
      />

      {rules.maximumSpellLevel >
        0 && (
        <CompactSpellSection
          title="Zauber"
          counter={`${selectedLevelledSpells} von ${rules.levelledSpellsRequired}`}
          spells={levelledSpells}
          characterLevel={level}
          spellcastingAbilityModifier={
            spellcastingAbilityModifier
          }
          isSelected={
            isSelected
          }
          isPrepared={
            isPrepared
          }
          onToggle={
            toggleSpell
          }
          onTogglePrepared={
            togglePrepared
          }
          showPreparedToggle={
            rules.mode ===
            "spellbook"
          }
        />
      )}

      {rules.maximumSpellLevel ===
        0 && (
        <div className="compact-empty-state">
          <strong>
            Noch keine Zauberplätze
          </strong>

          <span>
            Diese Klasse erhält ihre
            ersten Zauber auf einer
            späteren Stufe.
          </span>
        </div>
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

interface CompactSpellSectionProps {
  title: string;
  counter: string;

  spells: SpellDefinition[];

  characterLevel: number;

  spellcastingAbilityModifier:
    number;

  isSelected: (
    spellId: string,
  ) => boolean;

  isPrepared: (
    spellId: string,
  ) => boolean;

  onToggle: (
    spell: SpellDefinition,
  ) => void;

  onTogglePrepared: (
    spellId: string,
  ) => void;

  showPreparedToggle: boolean;
}

function CompactSpellSection({
  title,
  counter,
  spells,
  characterLevel,
  spellcastingAbilityModifier,
  isSelected,
  isPrepared,
  onToggle,
  onTogglePrepared,
  showPreparedToggle,
}: CompactSpellSectionProps) {
  return (
    <section className="compact-spell-section">
      <header className="compact-spell-section__header">
        <div>
          <p>
            Magische Auswahl
          </p>

          <h3>{title}</h3>
        </div>

        <span>
          {counter} gewählt
        </span>
      </header>

      {spells.length === 0 ? (
        <div className="compact-empty-state">
          <strong>
            Keine Einträge
          </strong>

          <span>
            Für diese Klasse sind
            derzeit keine passenden
            Zauber hinterlegt.
          </span>
        </div>
      ) : (
        <div className="compact-spell-grid">
          {spells.map((spell) => {
            const selected =
              isSelected(
                spell.id,
              );

            const prepared =
              isPrepared(
                spell.id,
              );

            const displayValues =
              getSpellDisplayValues({
                spell,

                characterLevel,

                spellcastingAbilityModifier,
              });

            return (
              <article
                key={spell.id}
                className={[
                  "compact-spell-card",

                  selected
                    ? "compact-spell-card--selected"
                    : "",

                  prepared
                    ? "compact-spell-card--prepared"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  className="compact-spell-card__main"
                  aria-pressed={
                    selected
                  }
                  onClick={() =>
                    onToggle(spell)
                  }
                >
                  <header>
                    <div>
                      <span>
                        {spell.level === 0
                          ? "Zaubertrick"
                          : `Grad ${spell.level}`}
                        {" · "}
                        {spellSchoolLabels[spell.school]}
                      </span>

                      <h4>
                        {spell.name}
                      </h4>
                    </div>

                    <strong>
                      {selected
                        ? "Gewählt"
                        : "Wählen"}
                    </strong>
                  </header>

                  <div className="compact-spell-card__combat">
                    {displayValues
                      .damage && (
                      <SpellValue
                        label="Schaden"
                        value={`${displayValues.damage.dice} ${displayValues.damage.type}`}
                      />
                    )}

                    {displayValues
                      .healing && (
                      <SpellValue
                        label="Heilung"
                        value={
                          displayValues
                            .healing
                            .formatted
                        }
                      />
                    )}

                    {displayValues
                      .savingThrow && (
                      <SpellValue
                        label="Rettung"
                        value={
                          displayValues
                            .savingThrow
                            .abilityLabel
                        }
                      />
                    )}
                  </div>

                  <dl className="compact-spell-card__facts">
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
                  </dl>

                  <p className="compact-spell-card__description">
                    {
                      spell.description
                    }
                  </p>

                  {(spell.concentration ||
                    spell.ritual) && (
                    <footer>
                      {spell.concentration && (
                        <span>
                          Konzentration
                        </span>
                      )}

                      {spell.ritual && (
                        <span>
                          Ritual
                        </span>
                      )}
                    </footer>
                  )}
                </button>

                {showPreparedToggle &&
                  selected &&
                  spell.level > 0 && (
                  <button
                    type="button"
                    className="compact-spell-card__prepare"
                    aria-pressed={
                      prepared
                    }
                    onClick={() =>
                      onTogglePrepared(
                        spell.id,
                      )
                    }
                  >
                    {prepared
                      ? "Vorbereitet"
                      : "Vorbereiten"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function SpellValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <span>
      <small>{label}</small>
      <strong>{value}</strong>
    </span>
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

function countSelectedSpells(
  value: CharacterSpellcasting,
  spells: SpellDefinition[],
  predicate: (
    spell: SpellDefinition,
  ) => boolean,
): number {
  return value.spellIds.filter(
    (selection) => {
      const spell =
        spells.find(
          (entry) =>
            entry.id ===
            selection.spellId,
        );

      return (
        Boolean(spell) &&
        predicate(spell!)
      );
    },
  ).length;
}