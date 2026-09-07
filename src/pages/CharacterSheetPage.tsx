import { useState } from "react";
import { LevelUpPanel } from "../modules/level-up/LevelUpPanel";
import { MAX_LEVEL_UP_LEVEL } from "../modules/level-up/levelUp";
import { getClassById } from "../compendium/classes";

import { CharacterPrintView } from "../modules/print/CharacterPrintView";
import { downloadBlankGrimHollowSheet, exportGrimHollowSheet } from "../modules/print/exportGrimHollowSheet";

import { exportSingleCharacter } from "../modules/archives/io/characterArchiveIO";

import { GrimButton } from "../components/ui/GrimButton";

import {
  calculateCharacterRules,
  restoreClassResource,
  restoreClassResourcesByRest,
  spendClassResource,
} from "../rules";

import {
  createCharacterRuleInput,
} from "../modules/sheet/rules/createCharacterRuleInput";

import { PaperPage } from "../components/ui/PaperPage";

import {
  CharacterRulesSection,
} from "../modules/sheet/components/CharacterRulesSection";

import type {
  CharacterSpellcasting,
} from "../compendium/spells";
import "../modules/sheet/styles/character-rules.css";
import {
  getCharacterInventory,
} from "../modules/archives/utils/getCharacterInventory";

import {
  getCharacterVitals,
} from "../modules/archives/utils/getCharacterVitals";

import {
  AbilitySealGrid,
} from "../modules/sheet/components/AbilitySealGrid";

import {
  CharacterQuickOverview,
} from "../modules/sheet/components/CharacterQuickOverview";

import {
  CharacterSheetHeader,
} from "../modules/sheet/components/CharacterSheetHeader";

import {
  CombatPanel,
} from "../modules/sheet/components/CombatPanel";

import {
  FeaturesPanel,
} from "../modules/sheet/components/FeaturesPanel";

import {
  MagicPanel,
} from "../modules/sheet/components/MagicPanel";

import {
  TransformationPanel,
} from "../modules/sheet/components/TransformationPanel";

import {
  InventoryPanel,
} from "../modules/sheet/components/InventoryPanel";

import {
  RollsPanel,
} from "../modules/sheet/components/RollsPanel";

import {
  VitalPanel,
} from "../modules/sheet/components/VitalPanel";

import {
  CharacterJournalPanel,
} from "../modules/journal/components/CharacterJournalPanel";

import {
  getCharacterDerivedStats,
} from "../modules/sheet/utils/getCharacterDerivedStats";

import type {
  CharacterArchiveEntry,
  CharacterInventory,
  CharacterVitals,
} from "../modules/archives/types";

type CharacterSheetSection =
  | "overview"
  | "rolls"
  | "combat"
  | "inventory"
  | "features"
  | "magic"
  | "transformation"
  | "journal";

interface CharacterSheetPageProps {
  character: CharacterArchiveEntry;

  onBack: () => void;

  onUpdateCharacter: (
    character: CharacterArchiveEntry,
  ) => void;
}

const sheetSections: Array<{
  id: CharacterSheetSection;
  chapter: string;
  title: string;
}> = [
  {
    id: "overview",
    chapter: "I",
    title: "Übersicht",
  },
  {
    id: "rolls",
    chapter: "II",
    title: "Würfe",
  },
  {
    id: "combat",
    chapter: "III",
    title: "Kampf",
  },
  {
    id: "inventory",
    chapter: "IV",
    title: "Inventar",
  },
  {
    id: "features",
    chapter: "V",
    title: "Merkmale",
  },
  {
    id: "magic",
    chapter: "VI",
    title: "Grimoire",
  },
  {
    id: "transformation",
    chapter: "VII",
    title: "Wandlung",
  },
  {
    id: "journal",
    chapter: "VIII",
    title: "Journal",
  },
];

const statusLabels: Record<
  CharacterArchiveEntry["status"],
  string
> = {
  active: "Aktiv",
  draft: "Entwurf",
  retired: "Im Ruhestand",
  deceased: "Verstorben",
};

export function CharacterSheetPage({
  character,
  onBack,
  onUpdateCharacter,
}: CharacterSheetPageProps) {
  const [levelUpOpen, setLevelUpOpen] = useState(false);
  const [levelUpNotice, setLevelUpNotice] = useState("");
  const [
    activeSection,
    setActiveSection,
  ] =
    useState<CharacterSheetSection>(
      "overview",
    );

  const vitals =
    getCharacterVitals(
      character,
    );

  const inventory =
    getCharacterInventory(
      character,
    );

  const derivedStats =
    getCharacterDerivedStats(
      character,
      inventory,
    );

  function updateCharacter(
    changes:
      Partial<CharacterArchiveEntry>,
  ) {
    onUpdateCharacter({
      ...character,
      ...changes,

      updatedAt:
        new Date().toISOString(),
    });
  }

  function updateVitals(
    nextVitals: CharacterVitals,
  ) {
    updateCharacter({
      vitals: nextVitals,
    });
  }

  function updateInventory(
    nextInventory:
      CharacterInventory,
  ) {
    const nextDerivedStats =
      getCharacterDerivedStats(
        {
          ...character,
          inventory: nextInventory,
        },
        nextInventory,
      );

    updateCharacter({
      inventory: nextInventory,

      vitals: {
        ...vitals,

        armorClass:
          nextDerivedStats
            .armorClass,
      },
    });
  }

  function updateSpellcasting(
    spellcasting:
      CharacterSpellcasting,
    notice?: string,
  ) {
    updateCharacter({
      spellcasting,
    });
    if (notice) setLevelUpNotice(notice);
  }

  function toggleCondition(conditionId: string) {
    const conditionIds = new Set(character.conditionIds ?? []);
    const conditionLabel = tableConditions.find((condition) => condition.id === conditionId)?.label ?? "Status";
    if (conditionIds.has(conditionId)) {
      conditionIds.delete(conditionId);
      setLevelUpNotice(`${conditionLabel} entfernt.`);
    } else {
      conditionIds.add(conditionId);
      setLevelUpNotice(`${conditionLabel} markiert.`);
    }
    updateCharacter({ conditionIds: [...conditionIds] });
  }

  function handleDamage(
    amount: number,
  ) {
    const safeAmount =
      Math.max(
        0,

        Number.isFinite(amount)
          ? amount
          : 0,
      );

    const absorbedByTemporaryHitPoints =
      Math.min(
        vitals
          .temporaryHitPoints,

        safeAmount,
      );

    const remainingDamage =
      safeAmount -
      absorbedByTemporaryHitPoints;

    updateVitals({
      ...vitals,

      temporaryHitPoints:
        vitals
          .temporaryHitPoints -
        absorbedByTemporaryHitPoints,

      currentHitPoints:
        Math.max(
          0,

          vitals
            .currentHitPoints -
            remainingDamage,
        ),
    });
    setLevelUpNotice(`${safeAmount} Schaden angewendet.`);
  }

  function handleHeal(
    amount: number,
  ) {
    const safeAmount =
      Math.max(
        0,

        Number.isFinite(amount)
          ? amount
          : 0,
      );

    updateVitals({
      ...vitals,

      currentHitPoints:
        Math.min(
          vitals
            .maximumHitPoints,

          vitals
            .currentHitPoints +
            safeAmount,
        ),
    });
    setLevelUpNotice(`${safeAmount} Trefferpunkte geheilt.`);
  }

  function handleTemporaryHitPointsChange(
    value: number,
  ) {
    updateVitals({
      ...vitals,

      temporaryHitPoints:
        Math.max(
          0,
          value,
        ),
    });
    setLevelUpNotice(`Temporäre TP auf ${Math.max(0, value)} gesetzt.`);
  }

  function handleSpendClassResource(
    resourceId: string,
    maximum: number,
  ) {
    updateCharacter({
      spentClassResources:
        spendClassResource({
          usage:
            character
              .spentClassResources ??
            {},
          resourceId,
          maximum,
        }),
    });
    setLevelUpNotice("Ressource verbraucht.");
  }

  function handleRestoreClassResource(
    resourceId: string,
  ) {
    updateCharacter({
      spentClassResources:
        restoreClassResource({
          usage:
            character
              .spentClassResources ??
            {},
          resourceId,
        }),
    });
    setLevelUpNotice("Ressource wiederhergestellt.");
  }

  function handleUseHitDie() {
    const hitDie = getClassById(character.classId ?? "")?.hitDie;
    const totalHitDice = Math.max(1, character.level);
    const spentHitDice = Math.min(character.spentHitDice ?? 0, totalHitDice);
    if (!hitDie || spentHitDice >= totalHitDice) return;

    const constitutionModifier = Math.floor(((character.abilityScores?.constitution ?? 10) - 10) / 2);
    const roll = Math.floor(Math.random() * hitDie) + 1;
    const recoveredHitPoints = Math.max(0, roll + constitutionModifier);

    updateCharacter({
      spentHitDice: spentHitDice + 1,
      vitals: {
        ...vitals,
        currentHitPoints: Math.min(vitals.maximumHitPoints, vitals.currentHitPoints + recoveredHitPoints),
      },
    });
    setLevelUpNotice(`Trefferwürfel: W${hitDie} zeigt ${roll}, ${recoveredHitPoints} TP geheilt.`);
  }

  function handleToggleInspiration() {
    updateCharacter({ inspiration: !(character.inspiration ?? false) });
    setLevelUpNotice((character.inspiration ?? false) ? "Inspiration verbraucht." : "Inspiration markiert.");
  }

  function handleShortRest() {
    const rules = calculateCharacterRules(createCharacterRuleInput(character));
    updateCharacter({
      spentClassResources: restoreClassResourcesByRest({
        resources: rules.classResources,
        rest: "short-rest",
      }),
    });
    setLevelUpNotice("Kurze Rast: passende Klassenressourcen erneuert.");
  }

  function handleLongRest() {
    const rules =
      calculateCharacterRules(
        createCharacterRuleInput(
          character,
        ),
      );

    updateCharacter({
      vitals: {
        ...vitals,
        currentHitPoints:
          vitals.maximumHitPoints,
        temporaryHitPoints: 0,
      },
      spentClassResources:
        restoreClassResourcesByRest({
          resources:
            rules.classResources,
          rest: "long-rest",
        }),
      spentHitDice: Math.max(
        0,
        (character.spentHitDice ?? 0) - Math.max(1, Math.floor(character.level / 2)),
      ),
      spellcasting: {
        spellIds:
          (
            character
              .spellcasting
              ?.spellIds ??
            []
          ).map(
            (selection) => ({
              ...selection,
            }),
          ),
        slots: {
          spentSlots: {},
          spentPactSlots: 0,
        },
      },
    });
    setLevelUpNotice("Lange Rast: TP, Zauberplätze und passende Ressourcen erneuert.");
  }

  return (
    <>
      <PaperPage>
      <CharacterSheetHeader
        character={character}
      />
      <div className="sheet-toolbar">
        <GrimButton
          type="button"
          onClick={onBack}
        >
          Zurück zum Archiv
        </GrimButton>

        <div className="sheet-toolbar__actions">
          <GrimButton type="button" disabled={levelUpOpen || character.level >= MAX_LEVEL_UP_LEVEL || !getClassById(character.classId ?? "")}
            title={character.level >= MAX_LEVEL_UP_LEVEL ? "Der aktuelle Regelumfang reicht bis Stufe 3." : "Nächste Charakterstufe vorbereiten"}
            onClick={() => { setLevelUpNotice(""); setLevelUpOpen(true); }}>
            {character.level >= MAX_LEVEL_UP_LEVEL ? "Stufe 3 erreicht" : "Level-up"}
          </GrimButton>
          <GrimButton
            type="button"
            onClick={() => exportSingleCharacter(character)}
          >
            Akte exportieren
          </GrimButton>

          <GrimButton
            type="button"
            onClick={() => void exportGrimHollowSheet(character)}
          >
            Grim-Hollow-PDF
          </GrimButton>

          <GrimButton
            type="button"
            onClick={downloadBlankGrimHollowSheet}
          >
            Leerer Bogen
          </GrimButton>

          <GrimButton
            type="button"
            onClick={() => window.print()}
          >
            Charakter drucken
          </GrimButton>
        </div>

        <span className="sheet-toolbar__status">
          Status:{" "}
          {
            statusLabels[
              character.status
            ]
          }
        </span>
      </div>

      {levelUpNotice && <p className="sheet-session-notice" role="status">{levelUpNotice}</p>}
      {levelUpOpen ? <LevelUpPanel key={`${character.id}-${character.level}`} character={character}
        onCancel={() => setLevelUpOpen(false)} onSave={(next) => {
          onUpdateCharacter(next);
          setLevelUpOpen(false);
          setLevelUpNotice(`Aufstieg gespeichert: ${next.name} ist jetzt Stufe ${next.level}.`);
        }} /> : <div className="sheet-layout">
        <aside
          className="sheet-navigation"
          aria-label="Kapitel der Charakterakte"
        >
          {sheetSections.map(
            (section) => {
              const selected =
                activeSection ===
                section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  className={[
                    "sheet-navigation__button",

                    selected
                      ? "sheet-navigation__button--active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={
                    selected
                      ? "page"
                      : undefined
                  }
                  onClick={() =>
                    setActiveSection(
                      section.id,
                    )
                  }
                >
                  <span>
                    {section.chapter}
                  </span>

                  <strong>
                    {section.title}
                  </strong>
                </button>
              );
            },
          )}
        </aside>

        <main className="sheet-content">
          {activeSection ===
            "overview" && (
            <CharacterOverview
              character={character}
              vitals={vitals}
              derivedStats={
                derivedStats
              }
              onDamage={
                handleDamage
              }
              onHeal={
                handleHeal
              }
              onTemporaryHitPointsChange={
                handleTemporaryHitPointsChange
              }
              onVitalsChange={
                updateVitals
              }
              onShortRest={
                handleShortRest
              }
              onLongRest={
                handleLongRest
              }
              onUseHitDie={handleUseHitDie}
              onToggleInspiration={handleToggleInspiration}
              rulesSection={
                <CharacterRulesSection
                  character={character}
                  onSpendClassResource={handleSpendClassResource}
                  onRestoreClassResource={handleRestoreClassResource}
                />
              }
              onNavigate={setActiveSection}
              onToggleCondition={toggleCondition}
            />
          )}

          {activeSection ===
            "rolls" && (
            <RollsPanel
              character={character}
            />
          )}

          {activeSection ===
            "combat" && (
            <CombatPanel
              character={character}
              inventory={inventory}
              onSpellcastingChange={
                updateSpellcasting
              }
              includeSpellcasting={false}
            />
          )}

          {activeSection ===
            "inventory" && (
            <InventoryPanel
              inventory={inventory}
              onChange={
                updateInventory
              }
            />
          )}

          {activeSection ===
            "features" && (
            <FeaturesPanel
              character={character}
            />
          )}

          {activeSection ===
            "magic" && (
            <MagicPanel
              character={character}
              onSpellcastingChange={updateSpellcasting}
            />
          )}

          {activeSection ===
            "transformation" && (
            <TransformationPanel
              character={character}
            />
          )}

          {activeSection ===
            "journal" && (
            <CharacterJournalPanel
              journal={character.journal}
              savedAt={character.updatedAt}
              onChange={(journal) =>
                updateCharacter({ journal })
              }
            />
          )}
        </main>
      </div>}
      </PaperPage>

      <CharacterPrintView character={character} />
    </>
  );
}

interface CharacterOverviewProps {
  character:
    CharacterArchiveEntry;

  vitals:
    CharacterVitals;

  derivedStats:
    ReturnType<
      typeof getCharacterDerivedStats
    >;

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

  onUseHitDie: () => void;

  onToggleInspiration: () => void;

  rulesSection: React.ReactNode;

  onNavigate: (section: CharacterSheetSection) => void;

  onToggleCondition: (conditionId: string) => void;
}

function CharacterOverview({
  character,
  vitals,
  derivedStats,
  onDamage,
  onHeal,
  onTemporaryHitPointsChange,
  onVitalsChange,
  onShortRest,
  onLongRest,
  onUseHitDie,
  onToggleInspiration,
  rulesSection,
  onNavigate,
  onToggleCondition,
}: CharacterOverviewProps) {
  const classLabel = [
    character.className,
    character.subclass,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="sheet-overview">
      <header className="sheet-overview__header">
        <p>
          {character.fileNumber}
        </p>

        <h2>
          {character.name}
        </h2>

        <span>
          {character.summary}
        </span>
      </header>

      <CharacterQuickOverview
        vitals={vitals}
        derivedStats={
          derivedStats
        }
      />

      <SessionDashboard
        character={character}
        vitals={vitals}
        derivedStats={derivedStats}
        onNavigate={onNavigate}
        onToggleCondition={onToggleCondition}
      />

      <dl className="sheet-overview__facts">
        <div>
          <dt>Abstammung</dt>

          <dd>
            {character.ancestry}
          </dd>
        </div>

        <div>
          <dt>Hintergrund</dt>

          <dd>
            {character
              .backgroundName ??
              "Nicht gespeichert"}
          </dd>
        </div>

        <div>
          <dt>Klasse</dt>

          <dd>
            {classLabel}
          </dd>
        </div>

        <div>
          <dt>Stufe</dt>

          <dd>
            {character.level}
          </dd>
        </div>

        <div>
          <dt>Status</dt>

          <dd>
            {
              statusLabels[
                character.status
              ]
            }
          </dd>
        </div>

        <div>
          <dt>Wandlung</dt>

          <dd>
            {character
              .transformation ||
              "Keine Wandlung"}
          </dd>
        </div>

        <div>
          <dt>
            Geübte Fertigkeiten
          </dt>

          <dd>
            {
              character
                .skillProficiencies
                ?.length ?? 0
            }
          </dd>
        </div>

        <div>
          <dt>
            Zuletzt geändert
          </dt>

          <dd>
            {formatDate(
              character.updatedAt,
            )}
          </dd>
        </div>
      </dl>

      <VitalPanel
        vitals={vitals}
        onDamage={
          onDamage
        }
        onHeal={
          onHeal
        }
        onTemporaryHitPointsChange={
          onTemporaryHitPointsChange
        }
        onVitalsChange={
          onVitalsChange
        }
        onShortRest={
          onShortRest
        }
        onLongRest={
          onLongRest
        }
        hitDie={getClassById(character.classId ?? "")?.hitDie}
        totalHitDice={Math.max(1, character.level)}
        spentHitDice={character.spentHitDice ?? 0}
        onUseHitDie={onUseHitDie}
        inspiration={character.inspiration ?? false}
        onToggleInspiration={onToggleInspiration}
      />

      {rulesSection}

      {character
        .abilityScores && (
        <section className="sheet-overview__abilities">
          <div className="sheet-overview__section-heading">
            <p>
              Grundwerte
            </p>

            <h3>
              Attribute
            </h3>

            <span>
              Die vollständigen
              Würfwerte findest du
              im Kapitel „Würfe“.
            </span>
          </div>

          <AbilitySealGrid
            values={
              character
                .abilityScores
            }
          />
        </section>
      )}
    </section>
  );
}

const tableConditions = [
  { id: "concentrating", label: "Konzentration", hint: "Bei Schaden Konzentrationswurf prüfen." },
  { id: "blessed", label: "Gesegnet", hint: "+1W4 auf Angriffe und Rettungswürfe." },
  { id: "frightened", label: "Verängstigt", hint: "Nachteil, solange die Quelle sichtbar ist." },
  { id: "poisoned", label: "Vergiftet", hint: "Nachteil auf Angriffe und Attributswürfe." },
  { id: "restrained", label: "Festgesetzt", hint: "Bewegung 0, Angriffe gegen dich mit Vorteil." },
  { id: "exhaustion", label: "Erschöpfung", hint: "Stufe im Notizfeld festhalten." },
  { id: "unconscious", label: "Bewusstlos", hint: "Kampfunfähig, am Boden, automatische kritische Nahkampftreffer." },
];

function SessionDashboard({
  character,
  vitals,
  derivedStats,
  onNavigate,
  onToggleCondition,
}: {
  character: CharacterArchiveEntry;
  vitals: CharacterVitals;
  derivedStats: ReturnType<typeof getCharacterDerivedStats>;
  onNavigate: (section: CharacterSheetSection) => void;
  onToggleCondition: (conditionId: string) => void;
}) {
  const activeConditions = new Set(character.conditionIds ?? []);
  const activeConditionList = tableConditions.filter((condition) => activeConditions.has(condition.id));
  const spellcasting = character.spellcasting;
  const spentSlots = Object.values(spellcasting?.slots.spentSlots ?? {}).reduce((sum, value) => sum + value, 0);
  const resourceCount = Object.keys(character.spentClassResources ?? {}).length;

  return (
    <section className="session-dashboard" aria-label="Spieltisch">
      <header className="session-dashboard__header">
        <div>
          <p>Spieltisch</p>
          <h3>Schnellzugriff</h3>
        </div>
        <div className="session-dashboard__nav">
          <button type="button" onClick={() => onNavigate("combat")}>Kampf</button>
          <button type="button" onClick={() => onNavigate("magic")}>Zauber</button>
          <button type="button" onClick={() => onNavigate("journal")}>Notizen</button>
        </div>
      </header>

      <dl className="session-dashboard__metrics">
        <div><dt>TP</dt><dd>{vitals.currentHitPoints}/{vitals.maximumHitPoints}</dd></div>
        <div><dt>Temp</dt><dd>{vitals.temporaryHitPoints}</dd></div>
        <div><dt>RK</dt><dd>{derivedStats.armorClass}</dd></div>
        <div><dt>INI</dt><dd>{vitals.initiativeModifier >= 0 ? "+" : ""}{vitals.initiativeModifier}</dd></div>
        <div><dt>Passive Wahrnehmung</dt><dd>{derivedStats.passivePerception}</dd></div>
        <div><dt>Slots verbraucht</dt><dd>{spentSlots}</dd></div>
        <div><dt>Ressourcen</dt><dd>{resourceCount}</dd></div>
      </dl>

      <div className="session-dashboard__conditions">
        {tableConditions.map((condition) => {
          const selected = activeConditions.has(condition.id);
          return (
            <button
              key={condition.id}
              type="button"
              className={selected ? "session-condition session-condition--active" : "session-condition"}
              aria-pressed={selected}
              onClick={() => onToggleCondition(condition.id)}
            >
              {condition.label}
            </button>
          );
        })}
      </div>

      {activeConditionList.length > 0 && (
        <div className="session-dashboard__active">
          <span>Aktiv</span>
          {activeConditionList.map((condition) => (
            <strong key={condition.id} title={condition.hint}>
              {condition.label}
            </strong>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDate(
  value: string,
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Unbekannt";
  }

  return new Intl.DateTimeFormat(
    "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(date);
}
