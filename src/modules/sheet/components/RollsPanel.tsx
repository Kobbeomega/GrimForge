import {
  abilityIds,
  abilityLabels,
  abilityShortLabels,
  formatAbilityModifier,
  getAbilityModifier,
  getProficiencyBonus,
  getSkillBonus,
} from "../../../compendium/core";

import {
  classes,
} from "../../../compendium/classes";

import {
  skills,
  type SkillId,
} from "../../../compendium/skills";

import type {
  AbilityId,
} from "../../../compendium/core";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface RollsPanelProps {
  character: CharacterArchiveEntry;
}

export function RollsPanel({
  character,
}: RollsPanelProps) {
  const abilityScores =
    character.abilityScores;

  if (!abilityScores) {
    return (
      <section className="rolls-panel">
        <header className="rolls-panel__header">
          <p>Kapitel III</p>

          <h2>Würfe</h2>

          <span>
            Für diese ältere Akte
            wurden keine Attribute
            gespeichert.
          </span>
        </header>
      </section>
    );
  }

  const classDefinition =
    classes.find(
      (entry) =>
        entry.id ===
        character.classId,
    );

  const savingThrowProficiencies =
    new Set<AbilityId>(
      classDefinition
        ?.savingThrows ?? [],
    );

  const skillProficiencies =
    new Set<SkillId>(
      character.skillProficiencies ??
        [],
    );

  const skillExpertise =
    new Set<SkillId>(
      character.skillExpertise ??
        [],
    );

  const proficiencyBonus =
    getProficiencyBonus(
      character.level,
    );

  const passivePerception =
    calculatePassivePerception({
      wisdom:
        abilityScores.wisdom,

      proficiencyBonus,

      proficient:
        skillProficiencies.has(
          "perception",
        ),

      expertise:
        skillExpertise.has(
          "perception",
        ),
    });

  return (
    <section className="rolls-panel">
      <header className="rolls-panel__header">
        <div>
          <p>Kapitel III</p>

          <h2>Würfe</h2>

          <span>
            Alle Boni für Attributsproben,
            Rettungswürfe und Fertigkeiten
            auf einen Blick.
          </span>
        </div>

        <dl className="rolls-panel__summary">
          <div>
            <dt>Übungsbonus</dt>

            <dd>
              {formatAbilityModifier(
                proficiencyBonus,
              )}
            </dd>
          </div>

          <div>
            <dt>
              Passive Wahrnehmung
            </dt>

            <dd>
              {passivePerception}
            </dd>
          </div>
        </dl>
      </header>

      <section className="rolls-section">
        <header className="rolls-section__header">
          <p>Grundproben</p>

          <h3>Attributswürfe</h3>

          <span>
            Diese Boni gelten bei einer
            direkten Attributsprobe ohne
            Fertigkeit.
          </span>
        </header>

        <div className="ability-roll-grid">
          {abilityIds.map(
            (abilityId) => {
              const modifier =
                getAbilityModifier(
                  abilityScores[
                    abilityId
                  ],
                );

              return (
                <RollValueCard
                  key={abilityId}
                  shortLabel={
                    abilityShortLabels[
                      abilityId
                    ]
                  }
                  title={
                    abilityLabels[
                      abilityId
                    ]
                  }
                  score={
                    abilityScores[
                      abilityId
                    ]
                  }
                  bonus={modifier}
                  status="Attributsprobe"
                />
              );
            },
          )}
        </div>
      </section>

      <section className="rolls-section">
        <header className="rolls-section__header">
          <p>Widerstand</p>

          <h3>Rettungswürfe</h3>

          <span>
            Klassenübungen sind bereits in
            den angezeigten Boni enthalten.
          </span>
        </header>

        <div className="ability-roll-grid">
          {abilityIds.map(
            (abilityId) => {
              const modifier =
                getAbilityModifier(
                  abilityScores[
                    abilityId
                  ],
                );

              const proficient =
                savingThrowProficiencies.has(
                  abilityId,
                );

              const totalBonus =
                modifier +
                (proficient
                  ? proficiencyBonus
                  : 0);

              return (
                <RollValueCard
                  key={abilityId}
                  shortLabel={
                    abilityShortLabels[
                      abilityId
                    ]
                  }
                  title={
                    abilityLabels[
                      abilityId
                    ]
                  }
                  score={
                    abilityScores[
                      abilityId
                    ]
                  }
                  bonus={totalBonus}
                  proficient={
                    proficient
                  }
                  status={
                    proficient
                      ? "Geübter Rettungswurf"
                      : "Nicht geübt"
                  }
                />
              );
            },
          )}
        </div>
      </section>

      <section className="rolls-section">
        <header className="rolls-section__header">
          <p>Spezialisierte Proben</p>

          <h3>Fertigkeiten</h3>

          <span>
            Alle 18 Fertigkeiten inklusive
            Attribut, Übung und Expertise.
          </span>
        </header>

        <div className="roll-skill-list">
          {skills.map((skill) => {
            const abilityModifier =
              getAbilityModifier(
                abilityScores[
                  skill.abilityId
                ],
              );

            const proficient =
              skillProficiencies.has(
                skill.id,
              );

            const expertise =
              skillExpertise.has(
                skill.id,
              );

            const bonus =
              getSkillBonus({
                abilityModifier,
                proficiencyBonus,
                proficient,
                expertise,
              });

            return (
              <article
                key={skill.id}
                className={[
                  "roll-skill-row",

                  proficient
                    ? "roll-skill-row--proficient"
                    : "",

                  expertise
                    ? "roll-skill-row--expertise"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="roll-skill-row__marker">
                  <span>
                    {
                      abilityShortLabels[
                        skill.abilityId
                      ]
                    }
                  </span>
                </div>

                <div className="roll-skill-row__content">
                  <div>
                    <strong>
                      {skill.name}
                    </strong>

                    <small>
                      {
                        abilityLabels[
                          skill.abilityId
                        ]
                      }
                    </small>
                  </div>

                  <span>
                    {expertise
                      ? "Expertise"
                      : proficient
                        ? "Geübt"
                        : "Nicht geübt"}
                  </span>
                </div>

                <output>
                  {formatAbilityModifier(
                    bonus,
                  )}
                </output>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

interface RollValueCardProps {
  shortLabel: string;
  title: string;
  score: number;
  bonus: number;

  status: string;

  proficient?: boolean;
}

function RollValueCard({
  shortLabel,
  title,
  score,
  bonus,
  status,
  proficient = false,
}: RollValueCardProps) {
  return (
    <article
      className={[
        "roll-value-card",

        proficient
          ? "roll-value-card--proficient"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="roll-value-card__short">
        {shortLabel}
      </span>

      <div className="roll-value-card__content">
        <strong>{title}</strong>

        <small>
          Wert {score} · {status}
        </small>
      </div>

      <output>
        {formatAbilityModifier(
          bonus,
        )}
      </output>
    </article>
  );
}

function calculatePassivePerception({
  wisdom,
  proficiencyBonus,
  proficient,
  expertise,
}: {
  wisdom: number;
  proficiencyBonus: number;
  proficient: boolean;
  expertise: boolean;
}): number {
  return (
    10 +
    getSkillBonus({
      abilityModifier:
        getAbilityModifier(wisdom),

      proficiencyBonus,
      proficient,
      expertise,
    })
  );
}