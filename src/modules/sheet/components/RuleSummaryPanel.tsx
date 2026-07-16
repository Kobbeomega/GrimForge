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

interface RuleSummaryPanelProps {
  character: CharacterArchiveEntry;
}

export function RuleSummaryPanel({
  character,
}: RuleSummaryPanelProps) {
  const rules =
    useCharacterRules(character);

  const storedArmorClass =
    character.vitals?.armorClass;

  const armorClass =
    storedArmorClass ??
    rules.armorClass.armorClass;

  return (
    <section className="rule-summary-panel">
      <header className="rule-summary-panel__header">
        <div>
          <p>Regelprofil</p>

          <h2>
            Berechnete Werte
          </h2>
        </div>

        <span>
          Stufe {rules.level}
        </span>
      </header>

      <div className="rule-summary-panel__vitals">
        <RuleMetric
          label="Übungsbonus"
          value={formatModifier(
            rules.proficiencyBonus,
          )}
        />

        <RuleMetric
          label="Rüstungsklasse"
          value={String(
            armorClass,
          )}
        />

        <RuleMetric
          label="Initiative"
          value={formatModifier(
            rules.initiativeModifier,
          )}
        />

        <RuleMetric
          label="Passive Wahrnehmung"
          value={String(
            rules.passivePerception,
          )}
        />

        <RuleMetric
          label="Trefferpunkte"
          value={String(
            rules.maximumHitPoints,
          )}
        />

        <RuleMetric
          label="Bewegung"
          value={`${rules.speed} m`}
        />
      </div>

      <section className="rule-summary-panel__saves">
        <header>
          <p>Rettungswürfe</p>

          <h3>
            Widerstände
          </h3>
        </header>

        <dl>
          {Object.entries(
            rules.savingThrows,
          ).map(
            (
              [
                abilityId,
                bonus,
              ],
            ) => (
              <div key={abilityId}>
                <dt>
                  {
                    abilityLabels[
                      abilityId as keyof typeof abilityLabels
                    ]
                  }
                </dt>

                <dd>
                  {formatModifier(
                    bonus,
                  )}
                </dd>
              </div>
            ),
          )}
        </dl>
      </section>

      {rules.spellcasting && (
        <section className="rule-summary-panel__spellcasting">
          <header>
            <p>Zauberwirken</p>

            <h3>
              Magische Werte
            </h3>
          </header>

          <dl>
            <div>
              <dt>Zauberattribut</dt>

              <dd>
                {
                  abilityLabels[
                    rules
                      .spellcasting
                      .abilityId
                  ]
                }
              </dd>
            </div>

            <div>
              <dt>Zauber-SG</dt>

              <dd>
                {
                  rules
                    .spellcasting
                    .saveDifficultyClass
                }
              </dd>
            </div>

            <div>
              <dt>Zauberangriff</dt>

              <dd>
                {formatModifier(
                  rules
                    .spellcasting
                    .attackBonus,
                )}
              </dd>
            </div>

            <div>
              <dt>Rituale</dt>

              <dd>
                {rules
                  .spellcasting
                  .ritualCasting
                  ? "Ja"
                  : "Nein"}
              </dd>
            </div>
          </dl>
        </section>
      )}
    </section>
  );
}

function RuleMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <article className="rule-metric">
      <span>{label}</span>

      <strong>{value}</strong>
    </article>
  );
}
