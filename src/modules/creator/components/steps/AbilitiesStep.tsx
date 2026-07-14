import {
  abilityIds,
  abilityLabels,
  abilityShortLabels,
  formatAbilityModifier,
  getAbilityModifier,
  type AbilityId,
  type AbilityScores,
} from "../../../../compendium/core";

interface AbilitiesStepProps {
  values: AbilityScores;
  onChange: (values: AbilityScores) => void;
}

export function AbilitiesStep({
  values,
  onChange,
}: AbilitiesStepProps) {
  function updateAbility(
    abilityId: AbilityId,
    nextValue: number,
  ) {
    const safeValue = Math.min(
      20,
      Math.max(1, nextValue),
    );

    onChange({
      ...values,
      [abilityId]: safeValue,
    });
  }

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel IV
        </p>

        <h2>Attribute</h2>

        <p>
          Verteile die sechs Grundwerte. Die Boni aus
          Abstammung und Variante werden später separat
          auf den endgültigen Wert angerechnet.
        </p>
      </header>

      <div className="creator-ability-grid">
        {abilityIds.map((abilityId) => {
          const score = values[abilityId];
          const modifier =
            getAbilityModifier(score);

          return (
            <article
              key={abilityId}
              className="creator-ability-card"
            >
              <header className="creator-ability-card__header">
                <span>
                  {abilityShortLabels[abilityId]}
                </span>

                <strong>
                  {abilityLabels[abilityId]}
                </strong>
              </header>

              <div className="creator-ability-card__score">
                <button
                  type="button"
                  aria-label={`${abilityLabels[abilityId]} verringern`}
                  onClick={() =>
                    updateAbility(
                      abilityId,
                      score - 1,
                    )
                  }
                >
                  −
                </button>

                <input
                  type="number"
                  min={1}
                  max={20}
                  value={score}
                  aria-label={
                    abilityLabels[abilityId]
                  }
                  onChange={(event) =>
                    updateAbility(
                      abilityId,
                      Number(event.target.value),
                    )
                  }
                />

                <button
                  type="button"
                  aria-label={`${abilityLabels[abilityId]} erhöhen`}
                  onClick={() =>
                    updateAbility(
                      abilityId,
                      score + 1,
                    )
                  }
                >
                  +
                </button>
              </div>

              <div className="creator-ability-card__modifier">
                <small>Modifikator</small>

                <strong>
                  {formatAbilityModifier(modifier)}
                </strong>
              </div>
            </article>
          );
        })}
      </div>

      <div className="creator-ability-note">
        <strong>Hinweis</strong>

        <p>
          Aktuell ist die freie Eingabe von 1 bis 20
          möglich. Punktkauf, Standardwerte und Würfeln
          ergänzen wir anschließend als auswählbare
          Methoden.
        </p>
      </div>
    </section>
  );
}