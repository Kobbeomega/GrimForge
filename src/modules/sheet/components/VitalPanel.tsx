import { useState } from "react";

import { GrimButton } from "../../../components/ui/GrimButton";
import {
  formatAbilityModifier,
} from "../../../compendium/core";

import type {
  CharacterVitals,
} from "../../archives/types";

interface VitalPanelProps {
  vitals: CharacterVitals;

  onDamage: (amount: number) => void;
  onHeal: (amount: number) => void;

  onTemporaryHitPointsChange: (
    value: number,
  ) => void;

  onVitalsChange: (
    vitals: CharacterVitals,
  ) => void;

  onShortRest: () => void;
  onLongRest: () => void;
}

export function VitalPanel({
  vitals,
  onDamage,
  onHeal,
  onTemporaryHitPointsChange,
  onVitalsChange,
  onShortRest,
  onLongRest,
}: VitalPanelProps) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [damageAmount, setDamageAmount] =
    useState(1);

  const [healingAmount, setHealingAmount] =
    useState(1);

  const hitPointPercentage =
    vitals.maximumHitPoints > 0
      ? Math.max(
          0,
          Math.min(
            100,
            (vitals.currentHitPoints /
              vitals.maximumHitPoints) *
              100,
          ),
        )
      : 0;

  function updateVitalField(
    field: keyof CharacterVitals,
    value: number,
  ) {
    const normalizedValue =
      Number.isFinite(value)
        ? value
        : 0;

    const nextVitals: CharacterVitals = {
      ...vitals,
      [field]: normalizedValue,
    };

    switch (field) {
      case "maximumHitPoints":
        nextVitals.maximumHitPoints =
          Math.max(1, normalizedValue);

        nextVitals.currentHitPoints =
          Math.min(
            nextVitals.currentHitPoints,
            nextVitals.maximumHitPoints,
          );
        break;

      case "currentHitPoints":
        nextVitals.currentHitPoints =
          Math.max(
            0,
            Math.min(
              nextVitals.maximumHitPoints,
              normalizedValue,
            ),
          );
        break;

      case "temporaryHitPoints":
        nextVitals.temporaryHitPoints =
          Math.max(0, normalizedValue);
        break;

      case "armorClass":
        nextVitals.armorClass =
          Math.max(0, normalizedValue);
        break;

      case "speed":
        nextVitals.speed =
          Math.max(0, normalizedValue);
        break;

      case "initiativeModifier":
        nextVitals.initiativeModifier =
          normalizedValue;
        break;
    }

    onVitalsChange(nextVitals);
  }

  return (
    <section className="vital-panel">
      <header className="vital-panel__header">
        <div className="vital-panel__header-copy">
          <p>Spielzustand</p>

          <h3>Vitalwerte</h3>

          <span>
            Verwalte die wichtigsten Werte während
            der laufenden Sitzung.
          </span>
        </div>

        <GrimButton
          type="button"
          onClick={() =>
            setIsEditing((current) => !current)
          }
        >
          {isEditing
            ? "Bearbeitung schließen"
            : "Werte bearbeiten"}
        </GrimButton>
      </header>

      {isEditing && (
        <VitalEditor
          vitals={vitals}
          onFieldChange={updateVitalField}
        />
      )}

      <div className="vital-panel__grid">
        <article className="vital-card vital-card--hit-points">
          <div className="vital-card__heading">
            <small>Trefferpunkte</small>

            <strong>
              {vitals.currentHitPoints}

              <span>
                {" "}
                / {vitals.maximumHitPoints}
              </span>
            </strong>
          </div>

          <div
            className="vital-card__meter"
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
            <span
              style={{
                width: `${hitPointPercentage}%`,
              }}
            />
          </div>

          <div className="vital-card__amount-row">
            <label>
              <span>Schaden</span>

              <input
                type="number"
                min={0}
                value={damageAmount}
                onChange={(event) => {
                  const value = Number(
                    event.target.value,
                  );

                  setDamageAmount(
                    Number.isFinite(value)
                      ? Math.max(0, value)
                      : 0,
                  );
                }}
              />
            </label>

            <GrimButton
              type="button"
              onClick={() =>
                onDamage(damageAmount)
              }
            >
              Schaden anwenden
            </GrimButton>
          </div>

          <div className="vital-card__amount-row">
            <label>
              <span>Heilung</span>

              <input
                type="number"
                min={0}
                value={healingAmount}
                onChange={(event) => {
                  const value = Number(
                    event.target.value,
                  );

                  setHealingAmount(
                    Number.isFinite(value)
                      ? Math.max(0, value)
                      : 0,
                  );
                }}
              />
            </label>

            <GrimButton
              type="button"
              onClick={() =>
                onHeal(healingAmount)
              }
            >
              Heilung anwenden
            </GrimButton>
          </div>

          <div className="vital-card__controls">
            <button
              type="button"
              onClick={() => onDamage(1)}
            >
              −1
            </button>

            <button
              type="button"
              onClick={() => onDamage(5)}
            >
              −5
            </button>

            <button
              type="button"
              onClick={() => onHeal(1)}
            >
              +1
            </button>

            <button
              type="button"
              onClick={() => onHeal(5)}
            >
              +5
            </button>
          </div>
        </article>

        <article className="vital-card">
          <small>
            Temporäre Trefferpunkte
          </small>

          <div className="vital-card__editable-value">
            <button
              type="button"
              aria-label="Temporäre Trefferpunkte verringern"
              onClick={() =>
                onTemporaryHitPointsChange(
                  Math.max(
                    0,
                    vitals.temporaryHitPoints - 1,
                  ),
                )
              }
            >
              −
            </button>

            <strong>
              {vitals.temporaryHitPoints}
            </strong>

            <button
              type="button"
              aria-label="Temporäre Trefferpunkte erhöhen"
              onClick={() =>
                onTemporaryHitPointsChange(
                  vitals.temporaryHitPoints + 1,
                )
              }
            >
              +
            </button>
          </div>
        </article>

        <article className="vital-card">
          <small>Rüstungsklasse</small>

          <strong className="vital-card__large-value">
            {vitals.armorClass}
          </strong>
        </article>

        <article className="vital-card">
          <small>Initiative</small>

          <strong className="vital-card__large-value">
            {formatAbilityModifier(
              vitals.initiativeModifier,
            )}
          </strong>
        </article>

        <article className="vital-card">
          <small>Bewegung</small>

          <strong className="vital-card__large-value">
            {vitals.speed}
            <span> m</span>
          </strong>
        </article>
      </div>

      <footer className="vital-panel__rest-actions">
        <GrimButton
          type="button"
          onClick={onShortRest}
        >
          Kurzrast
        </GrimButton>

        <GrimButton
          type="button"
          onClick={onLongRest}
        >
          Langrast
        </GrimButton>
      </footer>
    </section>
  );
}

interface VitalEditorProps {
  vitals: CharacterVitals;

  onFieldChange: (
    field: keyof CharacterVitals,
    value: number,
  ) => void;
}

function VitalEditor({
  vitals,
  onFieldChange,
}: VitalEditorProps) {
  return (
    <section className="vital-editor">
      <header className="vital-editor__header">
        <p>Aktenkorrektur</p>

        <h4>Grundwerte bearbeiten</h4>
      </header>

      <div className="vital-editor__grid">
        <VitalEditorField
          label="Maximale Trefferpunkte"
          value={vitals.maximumHitPoints}
          min={1}
          onChange={(value) =>
            onFieldChange(
              "maximumHitPoints",
              value,
            )
          }
        />

        <VitalEditorField
          label="Aktuelle Trefferpunkte"
          value={vitals.currentHitPoints}
          min={0}
          max={vitals.maximumHitPoints}
          onChange={(value) =>
            onFieldChange(
              "currentHitPoints",
              value,
            )
          }
        />

        <VitalEditorField
          label="Temporäre Trefferpunkte"
          value={vitals.temporaryHitPoints}
          min={0}
          onChange={(value) =>
            onFieldChange(
              "temporaryHitPoints",
              value,
            )
          }
        />

        <VitalEditorField
          label="Rüstungsklasse"
          value={vitals.armorClass}
          min={0}
          onChange={(value) =>
            onFieldChange(
              "armorClass",
              value,
            )
          }
        />

        <VitalEditorField
          label="Initiative"
          value={vitals.initiativeModifier}
          onChange={(value) =>
            onFieldChange(
              "initiativeModifier",
              value,
            )
          }
        />

        <VitalEditorField
          label="Bewegung in Metern"
          value={vitals.speed}
          min={0}
          step={0.5}
          onChange={(value) =>
            onFieldChange(
              "speed",
              value,
            )
          }
        />
      </div>
    </section>
  );
}

interface VitalEditorFieldProps {
  label: string;
  value: number;

  min?: number;
  max?: number;
  step?: number;

  onChange: (value: number) => void;
}

function VitalEditorField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: VitalEditorFieldProps) {
  return (
    <label className="vital-editor__field">
      <span>{label}</span>

      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => {
          const nextValue = Number(
            event.target.value,
          );

          onChange(
            Number.isFinite(nextValue)
              ? nextValue
              : 0,
          );
        }}
      />
    </label>
  );
}