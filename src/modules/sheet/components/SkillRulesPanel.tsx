import {
  abilityLabels,
} from "../../../compendium/core";

import {
  formatModifier,
} from "../../../rules";

import {
  useCharacterRules,
} from "../hooks/useCharacterRules";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface SkillRulesPanelProps {
  character: CharacterArchiveEntry;
}

export function SkillRulesPanel({
  character,
}: SkillRulesPanelProps) {
  const rules =
    useCharacterRules(character);

  return (
    <section className="skill-rules-panel">
      <header className="skill-rules-panel__header">
        <div>
          <p>Ausbildung</p>

          <h2>Fertigkeiten</h2>
        </div>

        <span>
          Passive Wahrnehmung{" "}
          {rules.passivePerception}
        </span>
      </header>

      <div className="skill-rules-panel__grid">
        {rules.skillBonuses.map(
          (skill) => (
            <article
              key={skill.id}
              className={[
                "skill-rule-record",

                skill.proficient
                  ? "skill-rule-record--proficient"
                  : "",

                skill.expertise
                  ? "skill-rule-record--expertise"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <header>
                <div>
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
                </div>

                <b>
                  {formatModifier(
                    skill.bonus,
                  )}
                </b>
              </header>

              <small>
                {skill.expertise
                  ? "Expertise"
                  : skill.proficient
                    ? "Geübt"
                    : "Ungeübt"}
              </small>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
