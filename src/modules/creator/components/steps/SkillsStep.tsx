import {
  abilityLabels,
} from "../../../../compendium/core";

import {
  getBackgroundById,
} from "../../../../compendium/backgrounds";

import {
  getClassSkillChoice,
} from "../../../../compendium/classes/skillChoices";

import {
  skillsById,
  type SkillId,
} from "../../../../compendium/skills";

interface SkillsStepProps {
  classId: string;
  backgroundId: string;

  selectedSkillIds: SkillId[];

  onChange: (
    skillIds: SkillId[],
  ) => void;
}

export function SkillsStep({
  classId,
  backgroundId,
  selectedSkillIds,
  onChange,
}: SkillsStepProps) {
  const skillChoice =
    getClassSkillChoice(classId);

  const background =
    getBackgroundById(backgroundId);

  const backgroundSkills =
    background?.skillProficiencies ?? [];

  if (!classId) {
    return (
      <SkillsNotice
        title="Keine Klasse gewählt"
        description="Wähle zuerst eine Klasse, damit die verfügbaren Fertigkeiten bestimmt werden können."
      />
    );
  }

  if (!skillChoice) {
    return (
      <SkillsNotice
        title="Keine Fertigkeitsregel hinterlegt"
        description="Für diese Klasse wurde noch keine Fertigkeitsauswahl definiert."
      />
    );
  }
const classChoice = skillChoice;
  const validSelectedSkills =
    selectedSkillIds.filter(
      (skillId) =>
        skillChoice.options.includes(skillId) &&
        !backgroundSkills.includes(skillId),
    );

  const selectedCount =
    validSelectedSkills.length;

  const selectionComplete =
    selectedCount === skillChoice.choose;

  function toggleSkill(
    skillId: SkillId,
  ) {
    if (backgroundSkills.includes(skillId)) {
      return;
    }

    const alreadySelected =
      validSelectedSkills.includes(skillId);

    if (alreadySelected) {
      onChange(
        validSelectedSkills.filter(
          (entry) => entry !== skillId,
        ),
      );

      return;
    }

    if (
      validSelectedSkills.length >=
      classChoice.choose
    ) {
      return;
    }

    onChange([
      ...validSelectedSkills,
      skillId,
    ]);
  }

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel VI
        </p>

        <h2>Fertigkeiten</h2>

        <p>
          Dein Hintergrund verleiht feste
          Fertigkeiten. Ergänze sie durch die
          Auswahl deiner Klasse.
        </p>
      </header>

      <section className="creator-skills-summary">
        <div>
          <span>Klassenwahl</span>

          <strong>
            {selectedCount} von{" "}
            {skillChoice.choose}
          </strong>
        </div>

        <div>
          <span>Hintergrund</span>

          <strong>
            {backgroundSkills.length}
          </strong>
        </div>

        <div>
          <span>Gesamt</span>

          <strong>
            {
              new Set([
                ...backgroundSkills,
                ...validSelectedSkills,
              ]).size
            }
          </strong>
        </div>
      </section>

      {background && (
        <section className="creator-skill-source">
          <header className="creator-skill-source__header">
            <p className="creator-section__chapter">
              Durch Hintergrund
            </p>

            <h3>{background.name}</h3>
          </header>

          <div className="creator-skill-grid">
            {backgroundSkills.map(
              (skillId) => {
                const skill =
                  skillsById[skillId];

                return (
                  <article
                    key={skill.id}
                    className="creator-skill-card creator-skill-card--granted"
                  >
                    <span>
                      {
                        abilityLabels[
                          skill.abilityId
                        ]
                      }
                    </span>

                    <strong>
                      {skill.name}
                    </strong>

                    <p>
                      {skill.description}
                    </p>

                    <small>
                      Automatisch geübt
                    </small>
                  </article>
                );
              },
            )}
          </div>
        </section>
      )}

      <section className="creator-skill-source">
        <header className="creator-skill-source__header">
          <p className="creator-section__chapter">
            Durch Klasse
          </p>

          <h3>
            Wähle {skillChoice.choose}
          </h3>

          <p>
            Eine bereits durch den Hintergrund
            gewährte Fertigkeit kann nicht doppelt
            gewählt werden.
          </p>
        </header>

        <div className="creator-skill-grid">
          {skillChoice.options.map(
            (skillId) => {
              const skill =
                skillsById[skillId];

              const grantedByBackground =
                backgroundSkills.includes(
                  skillId,
                );

              const selected =
                validSelectedSkills.includes(
                  skillId,
                );

              const selectionLimitReached =
                !selected &&
                selectedCount >=
                  skillChoice.choose;

              const disabled =
                grantedByBackground ||
                selectionLimitReached;

              return (
                <button
                  key={skill.id}
                  type="button"
                  className={[
                    "creator-skill-card",
                    selected
                      ? "creator-skill-card--selected"
                      : "",
                    grantedByBackground
                      ? "creator-skill-card--granted"
                      : "",
                    disabled &&
                    !grantedByBackground
                      ? "creator-skill-card--disabled"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() =>
                    toggleSkill(skillId)
                  }
                >
                  <span>
                    {
                      abilityLabels[
                        skill.abilityId
                      ]
                    }
                  </span>

                  <strong>
                    {skill.name}
                  </strong>

                  <p>
                    {skill.description}
                  </p>

                  <small>
                    {grantedByBackground
                      ? "Bereits durch Hintergrund"
                      : selected
                        ? "Ausgewählt"
                        : "Auswählen"}
                  </small>
                </button>
              );
            },
          )}
        </div>
      </section>

      {!selectionComplete && (
        <p className="creator-skills-warning">
          Wähle noch{" "}
          {skillChoice.choose -
            selectedCount}{" "}
          {skillChoice.choose -
            selectedCount ===
          1
            ? "Fertigkeit"
            : "Fertigkeiten"}{" "}
          aus.
        </p>
      )}
    </section>
  );
}

function SkillsNotice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel VI
        </p>

        <h2>Fertigkeiten</h2>

        <p>{description}</p>
      </header>

      <div className="creator-equipment-notice">
        <strong>{title}</strong>

        <span>
          Kehre zum entsprechenden Kapitel
          zurück.
        </span>
      </div>
    </section>
  );
}