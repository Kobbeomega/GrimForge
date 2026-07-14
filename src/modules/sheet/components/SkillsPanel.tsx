import {
  abilityShortLabels,
  formatAbilityModifier,
  getAbilityModifier,
  getProficiencyBonus,
  getSkillBonus,
} from "../../../compendium/core";

import {
  skills,
  type SkillId,
} from "../../../compendium/skills";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface SkillsPanelProps {
  character: CharacterArchiveEntry;
}

export function SkillsPanel({
  character,
}: SkillsPanelProps) {
  const abilityScores =
    character.abilityScores;

  const proficientSkills =
    new Set<SkillId>(
      character.skillProficiencies ?? [],
    );

  const expertiseSkills =
    new Set<SkillId>(
      character.skillExpertise ?? [],
    );

  const proficiencyBonus =
    getProficiencyBonus(character.level);

  const perceptionScore =
    abilityScores?.wisdom ?? 10;

  const perceptionModifier =
    getAbilityModifier(perceptionScore);

  const passivePerception =
    10 +
    getSkillBonus({
      abilityModifier:
        perceptionModifier,

      proficiencyBonus,

      proficient:
        proficientSkills.has(
          "perception",
        ),

      expertise:
        expertiseSkills.has(
          "perception",
        ),
    });

  if (!abilityScores) {
    return (
      <section className="skills-panel">
        <header className="skills-panel__header">
          <p>Kapitel III</p>

          <h2>Fertigkeiten</h2>

          <span>
            Für diese ältere Akte wurden noch
            keine Attributswerte gespeichert.
          </span>
        </header>
      </section>
    );
  }

  return (
    <section className="skills-panel">
      <header className="skills-panel__header">
        <div>
          <p>Kapitel III</p>

          <h2>Fertigkeiten</h2>

          <span>
            Alle Fertigkeitsboni werden aus
            Attributen, Übung und Expertise
            berechnet.
          </span>
        </div>

        <dl className="skills-panel__summary">
          <div>
            <dt>Übungsbonus</dt>

            <dd>
              {formatAbilityModifier(
                proficiencyBonus,
              )}
            </dd>
          </div>

          <div>
            <dt>Passive Wahrnehmung</dt>

            <dd>{passivePerception}</dd>
          </div>
        </dl>
      </header>

      <div className="skills-panel__legend">
        <span>
          <i className="skills-panel__marker skills-panel__marker--proficient" />
          Geübt
        </span>

        <span>
          <i className="skills-panel__marker skills-panel__marker--expertise" />
          Expertise
        </span>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => {
          const abilityScore =
            abilityScores[
              skill.abilityId
            ];

          const abilityModifier =
            getAbilityModifier(
              abilityScore,
            );

          const proficient =
            proficientSkills.has(
              skill.id,
            );

          const expertise =
            expertiseSkills.has(
              skill.id,
            );

          const totalBonus =
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
                "skill-card",
                proficient
                  ? "skill-card--proficient"
                  : "",
                expertise
                  ? "skill-card--expertise"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="skill-card__ability">
                <span>
                  {
                    abilityShortLabels[
                      skill.abilityId
                    ]
                  }
                </span>
              </div>

              <div className="skill-card__content">
                <header>
                  <h3>{skill.name}</h3>

                  <strong>
                    {formatAbilityModifier(
                      totalBonus,
                    )}
                  </strong>
                </header>

                <p>{skill.description}</p>

                <footer>
                  <span>
                    Attribut{" "}
                    {formatAbilityModifier(
                      abilityModifier,
                    )}
                  </span>

                  {expertise ? (
                    <span>
                      Expertise +
                      {proficiencyBonus * 2}
                    </span>
                  ) : proficient ? (
                    <span>
                      Übung +
                      {proficiencyBonus}
                    </span>
                  ) : (
                    <span>Nicht geübt</span>
                  )}
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}