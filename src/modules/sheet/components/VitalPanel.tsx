import {
  useState,
} from "react";

import type {
  CharacterVitals,
} from "../../archives/types";

interface VitalPanelProps {
  vitals: CharacterVitals;

  onDamage: (
    amount: number,
  ) => void;

  onHeal: (
    amount: number,
  ) => void;

  onTemporaryHitPointsChange: (
    value: number,
  ) => void;

  onVitalsChange: (
    vitals: CharacterVitals,
  ) => void;

  onShortRest: () => void;
  onLongRest: () => void;
}

type VitalAction =
  | "damage"
  | "healing";

export function VitalPanel({
  vitals,
  onDamage,
  onHeal,
  onTemporaryHitPointsChange,
  onVitalsChange,
  onShortRest,
  onLongRest,
}: VitalPanelProps) {
  const [customAmount, setCustomAmount] =
    useState(1);

  const [activeAction, setActiveAction] =
    useState<VitalAction>("damage");

  const hitPointPercentage =
    getHitPointPercentage(
      vitals.currentHitPoints,
      vitals.maximumHitPoints,
    );

  const healthState =
    getHealthState(
      hitPointPercentage,
      vitals.currentHitPoints,
    );

  function applyCustomAmount() {
    const safeAmount =
      Math.max(
        0,
        Math.floor(
          Number.isFinite(customAmount)
            ? customAmount
            : 0,
        ),
      );

    if (safeAmount <= 0) {
      return;
    }

    if (
      activeAction ===
      "damage"
    ) {
      onDamage(safeAmount);
      return;
    }

    onHeal(safeAmount);
  }

  function changeMaximumHitPoints(
    amount: number,
  ) {
    const maximumHitPoints =
      Math.max(
        1,
        vitals.maximumHitPoints +
          amount,
      );

    onVitalsChange({
      ...vitals,

      maximumHitPoints,

      currentHitPoints:
        Math.min(
          vitals.currentHitPoints,
          maximumHitPoints,
        ),
    });
  }

  function changeArmorClass(
    amount: number,
  ) {
    onVitalsChange({
      ...vitals,

      armorClass:
        Math.max(
          0,
          vitals.armorClass +
            amount,
        ),
    });
  }

  function changeInitiative(
    amount: number,
  ) {
    onVitalsChange({
      ...vitals,

      initiativeModifier:
        vitals
          .initiativeModifier +
        amount,
    });
  }

  function changeSpeed(
    amount: number,
  ) {
    onVitalsChange({
      ...vitals,

      speed:
        Math.max(
          0,
          vitals.speed +
            amount,
        ),
    });
  }

  return (
    <section className="session-vitals">
      <header className="session-vitals__header">
        <div>
          <p>Live-Modus</p>

          <h3>Trefferpunkte</h3>

          <span>
            Schaden, Heilung und wichtige
            Kampfwerte direkt verwalten.
          </span>
        </div>

        <strong
          className={[
            "session-vitals__state",
            `session-vitals__state--${healthState.id}`,
          ].join(" ")}
        >
          {healthState.label}
        </strong>
      </header>

      <section
        className={[
          "session-health",
          `session-health--${healthState.id}`,
        ].join(" ")}
      >
        <header className="session-health__score">
          <div>
            <span>Aktuelle TP</span>

            <strong>
              {vitals.currentHitPoints}
            </strong>
          </div>

          <i aria-hidden="true">
            /
          </i>

          <div>
            <span>Maximum</span>

            <strong>
              {vitals.maximumHitPoints}
            </strong>
          </div>

          {vitals.temporaryHitPoints >
            0 && (
            <div className="session-health__temporary">
              <span>Temporär</span>

              <strong>
                +
                {
                  vitals
                    .temporaryHitPoints
                }
              </strong>
            </div>
          )}
        </header>

        <div
          className="session-health__meter"
          role="progressbar"
          aria-label="Trefferpunkte"
          aria-valuemin={0}
          aria-valuemax={
            vitals.maximumHitPoints
          }
          aria-valuenow={
            vitals.currentHitPoints
          }
        >
          <i
            style={{
              width:
                `${hitPointPercentage}%`,
            }}
          />
        </div>

        <div className="session-health__presets">
          <QuickVitalAction
            label="−1"
            ariaLabel="1 Schaden"
            onClick={() =>
              onDamage(1)
            }
          />

          <QuickVitalAction
            label="−5"
            ariaLabel="5 Schaden"
            onClick={() =>
              onDamage(5)
            }
          />

          <QuickVitalAction
            label="−10"
            ariaLabel="10 Schaden"
            onClick={() =>
              onDamage(10)
            }
          />

          <QuickVitalAction
            label="+1"
            ariaLabel="1 Trefferpunkt heilen"
            variant="healing"
            onClick={() =>
              onHeal(1)
            }
          />

          <QuickVitalAction
            label="+5"
            ariaLabel="5 Trefferpunkte heilen"
            variant="healing"
            onClick={() =>
              onHeal(5)
            }
          />

          <QuickVitalAction
            label="+10"
            ariaLabel="10 Trefferpunkte heilen"
            variant="healing"
            onClick={() =>
              onHeal(10)
            }
          />
        </div>

        <div className="session-health__custom">
          <div
            className="session-health__mode"
            role="group"
            aria-label="Art der Trefferpunktänderung"
          >
            <button
              type="button"
              className={
                activeAction ===
                "damage"
                  ? "session-health__mode-button session-health__mode-button--active"
                  : "session-health__mode-button"
              }
              aria-pressed={
                activeAction ===
                "damage"
              }
              onClick={() =>
                setActiveAction(
                  "damage",
                )
              }
            >
              Schaden
            </button>

            <button
              type="button"
              className={
                activeAction ===
                "healing"
                  ? "session-health__mode-button session-health__mode-button--active session-health__mode-button--healing"
                  : "session-health__mode-button session-health__mode-button--healing"
              }
              aria-pressed={
                activeAction ===
                "healing"
              }
              onClick={() =>
                setActiveAction(
                  "healing",
                )
              }
            >
              Heilung
            </button>
          </div>

          <label>
            <span>Menge</span>

            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={customAmount}
              onChange={(event) =>
                setCustomAmount(
                  Math.max(
                    1,
                    Number(
                      event
                        .target
                        .value,
                    ),
                  ),
                )
              }
            />
          </label>

          <button
            type="button"
            className={[
              "session-health__apply",

              activeAction ===
              "healing"
                ? "session-health__apply--healing"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={
              applyCustomAmount
            }
          >
            {activeAction ===
            "damage"
              ? "Schaden anwenden"
              : "Heilung anwenden"}
          </button>
        </div>
      </section>

      <section className="session-vital-grid">
        <EditableVital
          abbreviation="TEMP"
          label="Temporäre TP"
          value={
            vitals
              .temporaryHitPoints
          }
          minimum={0}
          onDecrease={() =>
            onTemporaryHitPointsChange(
              Math.max(
                0,
                vitals
                  .temporaryHitPoints -
                  1,
              ),
            )
          }
          onIncrease={() =>
            onTemporaryHitPointsChange(
              vitals
                .temporaryHitPoints +
                1,
            )
          }
          onChange={
            onTemporaryHitPointsChange
          }
        />

        <EditableVital
          abbreviation="MAX"
          label="Maximale TP"
          value={
            vitals.maximumHitPoints
          }
          minimum={1}
          onDecrease={() =>
            changeMaximumHitPoints(
              -1,
            )
          }
          onIncrease={() =>
            changeMaximumHitPoints(
              1,
            )
          }
          onChange={(value) => {
            const maximumHitPoints =
              Math.max(1, value);

            onVitalsChange({
              ...vitals,

              maximumHitPoints,

              currentHitPoints:
                Math.min(
                  vitals
                    .currentHitPoints,
                  maximumHitPoints,
                ),
            });
          }}
        />

        <EditableVital
          abbreviation="RK"
          label="Rüstungsklasse"
          value={vitals.armorClass}
          minimum={0}
          onDecrease={() =>
            changeArmorClass(-1)
          }
          onIncrease={() =>
            changeArmorClass(1)
          }
          onChange={(value) =>
            onVitalsChange({
              ...vitals,

              armorClass:
                Math.max(0, value),
            })
          }
        />

        <EditableVital
          abbreviation="INI"
          label="Initiative"
          value={
            vitals
              .initiativeModifier
          }
          onDecrease={() =>
            changeInitiative(-1)
          }
          onIncrease={() =>
            changeInitiative(1)
          }
          onChange={(value) =>
            onVitalsChange({
              ...vitals,

              initiativeModifier:
                value,
            })
          }
          signed
        />

        <EditableVital
          abbreviation="BEW"
          label="Bewegung"
          value={vitals.speed}
          suffix="m"
          minimum={0}
          onDecrease={() =>
            changeSpeed(-1)
          }
          onIncrease={() =>
            changeSpeed(1)
          }
          onChange={(value) =>
            onVitalsChange({
              ...vitals,

              speed:
                Math.max(0, value),
            })
          }
        />
      </section>

      <section className="session-rests">
        <div>
          <span>Erholung</span>

          <strong>
            Trefferpunkte und Reserven
          </strong>
        </div>

        <button
          type="button"
          onClick={onShortRest}
        >
          Kurze Rast
        </button>

        <button
          type="button"
          onClick={onLongRest}
        >
          Lange Rast
        </button>
      </section>
    </section>
  );
}

interface QuickVitalActionProps {
  label: string;
  ariaLabel: string;

  variant?: "damage" | "healing";

  onClick: () => void;
}

function QuickVitalAction({
  label,
  ariaLabel,
  variant = "damage",
  onClick,
}: QuickVitalActionProps) {
  return (
    <button
      type="button"
      className={[
        "session-health__preset",

        variant === "healing"
          ? "session-health__preset--healing"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

interface EditableVitalProps {
  abbreviation: string;
  label: string;

  value: number;

  minimum?: number;
  suffix?: string;

  signed?: boolean;

  onDecrease: () => void;
  onIncrease: () => void;

  onChange: (
    value: number,
  ) => void;
}

function EditableVital({
  abbreviation,
  label,
  value,
  minimum,
  suffix,
  signed = false,
  onDecrease,
  onIncrease,
  onChange,
}: EditableVitalProps) {
  const displayValue =
    signed && value >= 0
      ? `+${value}`
      : String(value);

  return (
    <article className="session-vital">
      <header>
        <span>{abbreviation}</span>

        <small>{label}</small>
      </header>

      <strong>
        {displayValue}

        {suffix && (
          <small>{suffix}</small>
        )}
      </strong>

      <div className="session-vital__controls">
        <button
          type="button"
          aria-label={`${label} verringern`}
          disabled={
            typeof minimum ===
              "number" &&
            value <= minimum
          }
          onClick={onDecrease}
        >
          −
        </button>

        <input
          type="number"
          value={value}
          min={minimum}
          aria-label={label}
          onChange={(event) =>
            onChange(
              Number(
                event.target.value,
              ),
            )
          }
        />

        <button
          type="button"
          aria-label={`${label} erhöhen`}
          onClick={onIncrease}
        >
          +
        </button>
      </div>
    </article>
  );
}

function getHitPointPercentage(
  currentHitPoints: number,
  maximumHitPoints: number,
): number {
  if (maximumHitPoints <= 0) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      (
        currentHitPoints /
        maximumHitPoints
      ) * 100,
    ),
  );
}

function getHealthState(
  percentage: number,
  currentHitPoints: number,
): {
  id:
    | "healthy"
    | "wounded"
    | "critical"
    | "down";

  label: string;
} {
  if (currentHitPoints <= 0) {
    return {
      id: "down",
      label: "Kampfunfähig",
    };
  }

  if (percentage <= 25) {
    return {
      id: "critical",
      label: "Kritisch",
    };
  }

  if (percentage <= 50) {
    return {
      id: "wounded",
      label: "Verwundet",
    };
  }

  return {
    id: "healthy",
    label: "Kampfbereit",
  };
}