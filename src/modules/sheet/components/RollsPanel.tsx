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
          <div>
            <p>Kapitel II</p>

            <h2>Attribute & Fertigkeiten</h2>

            <span>
              Für diese ältere Akte wurden
              keine Attributswerte gespeichert.
            </span>
          </div>
        </header>
      </section>
    );
  }

  const classDefinition =
    classes.find(
      (entry) =>
        entry.id === character.classId,
    );

  const savingThrowProficiencies =
    new Set<AbilityId>(
      classDefinition?.savingThrows ?? [],
    );

  const skillProficiencies =
    new Set<SkillId>(
      character.skillProficiencies ?? [],
    );

  const skillExpertise =
    new Set<SkillId>(
      character.skillExpertise ?? [],
    );

  const proficiencyBonus =
    getProficiencyBonus(
      character.level,
    );

  const passivePerception =
    calculatePassiveSkill({
      character,
      skillId: "perception",
      proficiencyBonus,
      skillProficiencies,
      skillExpertise,
    });

  const passiveInvestigation =
    calculatePassiveSkill({
      character,
      skillId: "investigation",
      proficiencyBonus,
      skillProficiencies,
      skillExpertise,
    });

  const passiveInsight =
    calculatePassiveSkill({
      character,
      skillId: "insight",
      proficiencyBonus,
      skillProficiencies,
      skillExpertise,
    });

  return (
    <section className="rolls-panel compact-rolls-panel">
      <header className="rolls-panel__header compact-rolls-header">
        <div>
          <p>Kapitel II</p>

          <h2>Attribute & Fertigkeiten</h2>

          <span>
            Alle Attributsmodifikatoren,
            Rettungswürfe und Fertigkeitsboni
            nach ihrem Bezugsattribut gruppiert.
          </span>
        </div>

        <dl className="compact-rolls-summary">
          <SummaryValue
            label="Übungsbonus"
            value={formatAbilityModifier(
              proficiencyBonus,
            )}
          />

          <SummaryValue
            label="Passive Wahrnehmung"
            value={String(
              passivePerception,
            )}
          />

          <SummaryValue
            label="Passive Nachforschungen"
            value={String(
              passiveInvestigation,
            )}
          />

          <SummaryValue
            label="Passives Motiv erkennen"
            value={String(
              passiveInsight,
            )}
          />
        </dl>
      </header>

      <div className="ability-sheet-grid">
        {abilityIds.map(
          (abilityId) => {
            const score =
              abilityScores[abilityId];

            const modifier =
              getAbilityModifier(score);

            const savingThrowProficient =
              savingThrowProficiencies.has(
                abilityId,
              );

            const savingThrowBonus =
              modifier +
              (
                savingThrowProficient
                  ? proficiencyBonus
                  : 0
              );

            const abilitySkills =
              skills.filter(
                (skill) =>
                  skill.abilityId ===
                  abilityId,
              );

            return (
              <AbilitySheetCard
                key={abilityId}
                abilityId={abilityId}
                score={score}
                modifier={modifier}
                savingThrowBonus={
                  savingThrowBonus
                }
                savingThrowProficient={
                  savingThrowProficient
                }
                skills={abilitySkills}
                proficiencyBonus={
                  proficiencyBonus
                }
                skillProficiencies={
                  skillProficiencies
                }
                skillExpertise={
                  skillExpertise
                }
              />
            );
          },
        )}
      </div>

      <footer className="ability-sheet-legend">
        <span>
          <strong>★</strong>
          Expertise
        </span>

        <span>
          <strong>✓</strong>
          Geübt
        </span>

        <span>
          <strong>•</strong>
          Nicht geübt
        </span>
      </footer>
    </section>
  );
}

interface SummaryValueProps {
  label: string;
  value: string;
}

function SummaryValue({
  label,
  value,
}: SummaryValueProps) {
  return (
    <div>
      <dt>{label}</dt>

      <dd>{value}</dd>
    </div>
  );
}

interface AbilitySheetCardProps {
  abilityId: AbilityId;

  score: number;
  modifier: number;

  savingThrowBonus: number;
  savingThrowProficient: boolean;

  skills: typeof skills;

  proficiencyBonus: number;

  skillProficiencies:
    ReadonlySet<SkillId>;

  skillExpertise:
    ReadonlySet<SkillId>;
}

function AbilitySheetCard({
  abilityId,
  score,
  modifier,
  savingThrowBonus,
  savingThrowProficient,
  skills: abilitySkills,
  proficiencyBonus,
  skillProficiencies,
  skillExpertise,
}: AbilitySheetCardProps) {
  return (
    <article
      className={[
        "ability-sheet-card",

        savingThrowProficient
          ? "ability-sheet-card--save-proficient"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="ability-sheet-card__header">
        <div className="ability-sheet-card__identity">
          <span>
            {abilityShortLabels[abilityId]}
          </span>

          <h3>
            {abilityLabels[abilityId]}
          </h3>
        </div>

        <div className="ability-sheet-card__values">
          <strong>{score}</strong>

          <output>
            {formatAbilityModifier(
              modifier,
            )}
          </output>
        </div>
      </header>

      <section className="ability-sheet-card__skills">
        <header>
          <span>Fertigkeiten</span>

          <strong>
            {abilitySkills.length}
          </strong>
        </header>

        {abilitySkills.length === 0 ? (
          <p className="ability-sheet-card__empty">
            Keine Fertigkeiten an dieses
            Attribut gebunden.
          </p>
        ) : (
          <div className="ability-skill-list">
            {abilitySkills.map(
              (skill) => {
                const expertise =
                  skillExpertise.has(
                    skill.id,
                  );

                const proficient =
                  expertise ||
                  skillProficiencies.has(
                    skill.id,
                  );

                const bonus =
                  getSkillBonus({
                    abilityModifier:
                      modifier,

                    proficiencyBonus,

                    proficient,

                    expertise,
                  });

                return (
                  <SkillValueRow
                    key={skill.id}
                    name={skill.name}
                    bonus={bonus}
                    proficient={
                      proficient
                    }
                    expertise={
                      expertise
                    }
                  />
                );
              },
            )}
          </div>
        )}
      </section>

      <footer className="ability-sheet-card__save">
        <div>
          <span>
            {savingThrowProficient
              ? "✓"
              : "•"}
          </span>

          <div>
            <small>Rettungswurf</small>

            <strong>
              {savingThrowProficient
                ? "Geübt"
                : "Nicht geübt"}
            </strong>
          </div>
        </div>

        <output>
          {formatAbilityModifier(
            savingThrowBonus,
          )}
        </output>
      </footer>
    </article>
  );
}

interface SkillValueRowProps {
  name: string;
  bonus: number;

  proficient: boolean;
  expertise: boolean;
}

function SkillValueRow({
  name,
  bonus,
  proficient,
  expertise,
}: SkillValueRowProps) {
  return (
    <div
      className={[
        "ability-skill-row",

        proficient
          ? "ability-skill-row--proficient"
          : "",

        expertise
          ? "ability-skill-row--expertise"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className="ability-skill-row__marker"
        aria-label={
          expertise
            ? "Expertise"
            : proficient
              ? "Geübt"
              : "Nicht geübt"
        }
      >
        {expertise
          ? "★"
          : proficient
            ? "✓"
            : "•"}
      </span>

      <strong>{name}</strong>

      <output>
        {formatAbilityModifier(
          bonus,
        )}
      </output>
    </div>
  );
}

function calculatePassiveSkill({
  character,
  skillId,
  proficiencyBonus,
  skillProficiencies,
  skillExpertise,
}: {
  character: CharacterArchiveEntry;

  skillId: SkillId;

  proficiencyBonus: number;

  skillProficiencies:
    ReadonlySet<SkillId>;

  skillExpertise:
    ReadonlySet<SkillId>;
}): number {
  const skill =
    skills.find(
      (entry) =>
        entry.id === skillId,
    );

  if (
    !skill ||
    !character.abilityScores
  ) {
    return 10;
  }

  const expertise =
    skillExpertise.has(skillId);

  const proficient =
    expertise ||
    skillProficiencies.has(
      skillId,
    );

  return (
    10 +
    getSkillBonus({
      abilityModifier:
        getAbilityModifier(
          character.abilityScores[
            skill.abilityId
          ],
        ),

      proficiencyBonus,
      proficient,
      expertise,
    })
  );
}