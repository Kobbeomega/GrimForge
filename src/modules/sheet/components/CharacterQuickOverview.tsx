import {
  formatAbilityModifier,
} from "../../../compendium/core";

import type {
  CharacterVitals,
} from "../../archives/types";

import type {
  CharacterDerivedStats,
} from "../utils/getCharacterDerivedStats";

interface CharacterQuickOverviewProps {
  vitals: CharacterVitals;

  derivedStats: CharacterDerivedStats;
}

export function CharacterQuickOverview({
  vitals,
  derivedStats,
}: CharacterQuickOverviewProps) {
  const hitPointPercentage =
    vitals.maximumHitPoints > 0
      ? Math.max(
          0,
          Math.min(
            100,
            (
              vitals.currentHitPoints /
              vitals.maximumHitPoints
            ) * 100,
          ),
        )
      : 0;

  const carryingState =
    getCarryingState(
      derivedStats.carryingPercentage,
    );

  return (
    <section className="quick-overview">
      <header className="quick-overview__header">
        <div>
          <p>Spielbereite Akte</p>

          <h3>Schnellübersicht</h3>

          <span>
            Die wichtigsten Werte für
            Erkundung und Kampf.
          </span>
        </div>
      </header>

      <div className="quick-overview__stats">
        <article className="quick-stat quick-stat--hit-points">
          <span>Trefferpunkte</span>

          <strong>
            {vitals.currentHitPoints}

            <small>
              {" "}
              / {vitals.maximumHitPoints}
            </small>
          </strong>

          {vitals.temporaryHitPoints > 0 && (
            <small className="quick-stat__temporary">
              +
              {
                vitals.temporaryHitPoints
              }{" "}
              temporär
            </small>
          )}

          <div
            className="quick-stat__meter"
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
        </article>

        <QuickStat
          label="Rüstungsklasse"
          value={String(
            derivedStats.armorClass,
          )}
          note="Aus Ausrüstung"
        />

        <QuickStat
          label="Initiative"
          value={formatAbilityModifier(
            vitals.initiativeModifier,
          )}
        />

        <QuickStat
          label="Bewegung"
          value={`${vitals.speed} m`}
        />

        <QuickStat
          label="Übungsbonus"
          value={formatAbilityModifier(
            derivedStats
              .proficiencyBonus,
          )}
        />

        <QuickStat
          label="Passive Wahrnehmung"
          value={String(
            derivedStats
              .passiveScores
              .perception,
          )}
        />

        <QuickStat
          label="Passive Nachforschungen"
          value={String(
            derivedStats
              .passiveScores
              .investigation,
          )}
        />

        <QuickStat
          label="Passives Motiv erkennen"
          value={String(
            derivedStats
              .passiveScores
              .insight,
          )}
        />
      </div>

      {derivedStats.spellcasting.enabled && (
        <SpellcastingQuickStats
          derivedStats={derivedStats}
        />
      )}

      <section className="quick-carrying">
        <header>
          <div>
            <span>Traglast</span>

            <strong>
              {formatWeight(
                derivedStats.totalWeight,
              )}{" "}
              /{" "}
              {formatWeight(
                derivedStats
                  .carryingCapacity,
              )}{" "}
              kg
            </strong>
          </div>

          <small>
            {carryingState}
          </small>
        </header>

        <div
          className="quick-carrying__meter"
          role="progressbar"
          aria-label="Traglast"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.min(
            100,
            Math.round(
              derivedStats
                .carryingPercentage,
            ),
          )}
        >
          <i
            style={{
              width: `${Math.min(
                100,
                derivedStats
                  .carryingPercentage,
              )}%`,
            }}
          />
        </div>
      </section>

      <EquippedWeapons
        weapons={
          derivedStats.equippedWeapons
        }
      />
    </section>
  );
}

interface QuickStatProps {
  label: string;
  value: string;
  note?: string;
}

function QuickStat({
  label,
  value,
  note,
}: QuickStatProps) {
  return (
    <article className="quick-stat">
      <span>{label}</span>

      <strong>{value}</strong>

      {note && (
        <small>{note}</small>
      )}
    </article>
  );
}

interface SpellcastingQuickStatsProps {
  derivedStats:
    CharacterDerivedStats;
}

function SpellcastingQuickStats({
  derivedStats,
}: SpellcastingQuickStatsProps) {
  const spellcasting =
    derivedStats.spellcasting;

  return (
    <section className="quick-spellcasting">
      <header className="quick-spellcasting__header">
        <div>
          <p>Magische Ausbildung</p>

          <h4>Zauberwerte</h4>
        </div>
      </header>

      <div className="quick-spellcasting__grid">
        <QuickStat
          label="Zauberangriff"
          value={
            typeof spellcasting
              .spellAttackBonus ===
            "number"
              ? formatAbilityModifier(
                  spellcasting
                    .spellAttackBonus,
                )
              : "—"
          }
        />

        <QuickStat
          label="Zauber-SG"
          value={
            typeof spellcasting
              .spellSaveDifficultyClass ===
            "number"
              ? String(
                  spellcasting
                    .spellSaveDifficultyClass,
                )
              : "—"
          }
        />

        <QuickStat
          label="Zauberfokus"
          value={
            spellcasting.focusLabel ??
            "Keiner"
          }
        />

        <QuickStat
          label="Ritualmagie"
          value={
            spellcasting.ritualCasting
              ? "Ja"
              : "Nein"
          }
        />
      </div>
    </section>
  );
}

interface EquippedWeaponsProps {
  weapons:
    CharacterDerivedStats["equippedWeapons"];
}

function EquippedWeapons({
  weapons,
}: EquippedWeaponsProps) {
  return (
    <section className="quick-weapons">
      <header className="quick-weapons__header">
        <div>
          <p>Kampfbereitschaft</p>

          <h4>Ausgerüstete Waffen</h4>
        </div>

        <span>
          {weapons.length}{" "}
          {weapons.length === 1
            ? "Waffe"
            : "Waffen"}
        </span>
      </header>

      {weapons.length === 0 ? (
        <div className="quick-weapons__empty">
          <strong>
            Keine Waffe ausgerüstet
          </strong>

          <span>
            Öffne das Inventar und
            rüste eine Waffe aus.
          </span>
        </div>
      ) : (
        <div className="quick-weapons__grid">
          {weapons.map((weapon) => (
            <article
              key={weapon.id}
              className="quick-weapon-card"
            >
              <header>
                <div>
                  <span>Waffe</span>

                  <h5>
                    {weapon.name}
                  </h5>
                </div>

                {weapon.quantity > 1 && (
                  <strong>
                    ×{weapon.quantity}
                  </strong>
                )}
              </header>

              <dl>
                <div>
                  <dt>Schaden</dt>

                  <dd>
                    {weapon.damage}{" "}
                    {weapon.damageType}
                  </dd>
                </div>

                {weapon.versatileDamage && (
                  <div>
                    <dt>Vielseitig</dt>

                    <dd>
                      {
                        weapon
                          .versatileDamage
                      }{" "}
                      {weapon.damageType}
                    </dd>
                  </div>
                )}
              </dl>

              {weapon.properties.length >
                0 && (
                <footer>
                  {weapon.properties.map(
                    (property) => (
                      <span
                        key={property}
                      >
                        {property}
                      </span>
                    ),
                  )}
                </footer>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function getCarryingState(
  percentage: number,
): string {
  if (percentage >= 100) {
    return "Überladen";
  }

  if (percentage >= 75) {
    return "Schwer beladen";
  }

  if (percentage >= 50) {
    return "Beladen";
  }

  return "Leichtes Gepäck";
}

function formatWeight(
  value: number,
): string {
  return new Intl.NumberFormat(
    "de-DE",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  ).format(value);
}