import type {
  CharacterSpellcasting,
} from "../../../compendium/spells";

import type {
  CharacterArchiveEntry,
  CharacterInventory,
} from "../../archives/types";

import {
  getPassiveScores,
} from "../utils/getPassiveScores";

import {
  getEquippedWeaponAttacks,
} from "../utils/getWeaponAttack";

import {
  getSpellcastingStats,
} from "../utils/getSpellcastingStats";

import {
  SpellcastingPanel,
} from "./SpellcastingPanel";

interface CombatPanelProps {
  character: CharacterArchiveEntry;
  inventory: CharacterInventory;

  onSpellcastingChange: (
    spellcasting: CharacterSpellcasting,
  ) => void;
}

export function CombatPanel({
  character,
  inventory,
  onSpellcastingChange,
}: CombatPanelProps) {
  const weapons =
    getEquippedWeaponAttacks(
      character,
      inventory,
    );

  const passiveScores =
    getPassiveScores(character);

  const spellcastingStats =
    getSpellcastingStats(
      character,
    );

  return (
    <section className="compact-combat">
      <header className="compact-combat__header">
        <div>
          <p>Kapitel III</p>

          <h2>Kampf</h2>

          <span>
            Waffen, passive Werte und Magie
            für die laufende Sitzung.
          </span>
        </div>
      </header>

      <section className="compact-passives">
        <PassiveScoreRow
          abbreviation="WE"
          label="Passive Wahrnehmung"
          value={passiveScores.perception}
        />

        <PassiveScoreRow
          abbreviation="IN"
          label="Passive Nachforschungen"
          value={passiveScores.investigation}
        />

        <PassiveScoreRow
          abbreviation="WE"
          label="Passives Motiv erkennen"
          value={passiveScores.insight}
        />
      </section>

      <section className="compact-combat-section">
        <header className="compact-combat-section__header">
          <div>
            <p>Bewaffnung</p>

            <h3>Ausgerüstete Waffen</h3>
          </div>

          <span>
            {weapons.length}
          </span>
        </header>

        {weapons.length === 0 ? (
          <div className="compact-combat-empty">
            <strong>
              Keine Waffe ausgerüstet
            </strong>

            <span>
              Rüste im Inventar eine Waffe aus.
            </span>
          </div>
        ) : (
          <div className="compact-weapon-list">
            {weapons.map((weapon) => (
              <article
                key={weapon.id}
                className="compact-weapon-row"
              >
                <header className="compact-weapon-row__identity">
                  <div>
                    <span>
                      {weapon.proficient
                        ? "Geübt"
                        : "Nicht geübt"}
                    </span>

                    <h4>{weapon.name}</h4>
                  </div>

                  {weapon.quantity > 1 && (
                    <strong>
                      ×{weapon.quantity}
                    </strong>
                  )}
                </header>

                <div className="compact-weapon-row__primary">
                  <WeaponValue
                    label="Angriff"
                    value={
                      weapon.attackBonusLabel
                    }
                  />

                  <WeaponValue
                    label="Schaden"
                    value={`${weapon.damage} ${weapon.damageType}`}
                  />

                  {weapon.versatileDamage && (
                    <WeaponValue
                      label="Vielseitig"
                      value={`${weapon.versatileDamage} ${weapon.damageType}`}
                    />
                  )}

                  {weapon.range && (
                    <WeaponValue
                      label="Reichweite"
                      value={weapon.range}
                    />
                  )}
                </div>

                <div className="compact-weapon-row__secondary">
                  <span>
                    Attribut:{" "}
                    <strong>
                      {weapon.abilityLabel}
                    </strong>
                  </span>

                  {weapon.properties.map(
                    (property) => (
                      <span key={property}>
                        {property}
                      </span>
                    ),
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {spellcastingStats.enabled ? (
        <SpellcastingPanel
          character={character}
          stats={spellcastingStats}
          onChange={
            onSpellcastingChange
          }
        />
      ) : (
        <div className="compact-combat-empty">
          <strong>
            Keine Zauberausbildung
          </strong>

          <span>
            Diese Klasse besitzt keine
            Zauberwirker-Konfiguration.
          </span>
        </div>
      )}
    </section>
  );
}

function PassiveScoreRow({
  abbreviation,
  label,
  value,
}: {
  abbreviation: string;
  label: string;
  value: number;
}) {
  return (
    <article className="compact-passive-row">
      <span>{abbreviation}</span>

      <strong>{label}</strong>

      <output>{value}</output>
    </article>
  );
}

function WeaponValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <small>{label}</small>

      <strong>{value}</strong>
    </div>
  );
}