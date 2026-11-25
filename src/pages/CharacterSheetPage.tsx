import { useState } from "react";
import { DeathSavesPanel } from "../modules/sheet/components/DeathSavesPanel";
import { LevelUpPanel } from "../modules/level-up/LevelUpPanel";
import { MAX_LEVEL_UP_LEVEL } from "../modules/level-up/levelUp";
import { getClassById } from "../compendium/classes";

import { CharacterPrintView } from "../modules/print/CharacterPrintView";
import { downloadBlankGrimHollowSheet, exportGrimforgePlayPdf, exportGrimHollowSheet } from "../modules/print/exportGrimHollowSheet";

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

import { SessionDashboard } from "../modules/sheet/components/SessionDashboard";
import { SubclassStats } from "../modules/sheet/components/SubclassStats";
import { tableConditions } from "../modules/sheet/tableConditions";

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
  DeathSaves,
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
    title: "Spieltisch",
  },
  {
    id: "rolls",
    chapter: "II",
    title: "Proben",
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
    title: "Zauber",
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


export function CharacterSheetPage({
  character,
  onBack,
  onUpdateCharacter,
}: CharacterSheetPageProps) {
  const [levelUpOpen, setLevelUpOpen] = useState(false);
  const [levelUpNotice, setLevelUpNotice] = useState("");
  const [undoStack, setUndoStack] = useState<Array<{ id: string; before: CharacterArchiveEntry; note: string }>>([]);
  const currentUndo = undoStack.length && undoStack[undoStack.length - 1]?.id === character.id
    ? undoStack[undoStack.length - 1] : undefined;
  const deathSaves: DeathSaves = { successes: Math.max(0, Math.min(3, character.deathSaves?.successes ?? 0)),
    failures: Math.max(0, Math.min(3, character.deathSaves?.failures ?? 0)) };
  const exhaustionLevel = Math.max(0, Math.min(6, character.exhaustionLevel ?? (character.conditionIds?.includes("exhaustion") ? 1 : 0)));
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
    changes: Partial<CharacterArchiveEntry>,
    note = "Änderung an der Akte",
  ) {
    setUndoStack((old) => [...old.filter((entry) => entry.id === character.id),
      { id: character.id, before: character, note }].slice(-8));
    onUpdateCharacter({
      ...character,
      ...changes,

      updatedAt:
        new Date().toISOString(),
    });
  }

  function updateVitals(nextVitals: CharacterVitals) {
    updateCharacter({ vitals: nextVitals }, "Trefferpunkte / Spielwerte");
  }

  function handleUndo() {
    if (!currentUndo) return;
    onUpdateCharacter({ ...currentUndo.before, updatedAt: new Date().toISOString() });
    setUndoStack((old) => old.slice(0, -1));
    setLevelUpNotice(`Rückgängig: ${currentUndo.note}.`);
  }

  function updateDeathSaves(successes: number, failures: number, note: string) {
    updateCharacter({ deathSaves: {
      successes: Math.max(0, Math.min(3, successes)),
      failures: Math.max(0, Math.min(3, failures)),
    } }, note);
    setLevelUpNotice(note);
  }

  function handleMarkDeathSave(type: "success" | "failure") {
    if (vitals.currentHitPoints !== 0 || deathSaves.successes >= 3 || deathSaves.failures >= 3) return;
    updateDeathSaves(deathSaves.successes + (type === "success" ? 1 : 0),
      deathSaves.failures + (type === "failure" ? 1 : 0),
      type === "success" ? "Todesrettungswurf: Erfolg markiert." : "Todesrettungswurf: Fehlschlag markiert.");
  }

  function handleResetDeathSaves() {
    updateDeathSaves(0, 0, "Todesrettungswürfe zurückgesetzt.");
  }

  function handleExhaustion(level: number) {
    const safe = Math.max(0, Math.min(6, Math.floor(level)));
    updateCharacter({ exhaustionLevel: safe, conditionIds: safe > 0
      ? [...new Set([...(character.conditionIds ?? []), "exhaustion"])]
      : (character.conditionIds ?? []).filter((id) => id !== "exhaustion") }, "Erschöpfung angepasst");
    setLevelUpNotice(`Erschöpfung: Stufe ${safe}.`);
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
    if (conditionId === "exhaustion") { handleExhaustion(exhaustionLevel > 0 ? 0 : 1); return; }
    const conditionIds = new Set(character.conditionIds ?? []);
    const conditionLabel = tableConditions.find((condition) => condition.id === conditionId)?.label ?? "Status";
    if (conditionIds.has(conditionId)) {
      conditionIds.delete(conditionId);
      setLevelUpNotice(`${conditionLabel} entfernt.`);
    } else {
      conditionIds.add(conditionId);
      setLevelUpNotice(`${conditionLabel} markiert.`);
    }
    updateCharacter({ conditionIds: [...conditionIds] }, "Zustand geändert");
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
    const concentration = (character.conditionIds ?? []).includes("concentrating") && safeAmount > 0
      ? ` Konzentration: KO-Rettungswurf gegen SG ${Math.max(10, Math.floor(safeAmount / 2))} erforderlich.` : "";
    setLevelUpNotice(`${safeAmount} Schaden angewendet.${concentration}`);
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

    const healed = Math.min(vitals.maximumHitPoints, vitals.currentHitPoints + safeAmount);
    updateCharacter({
      ...(healed > 0 ? { deathSaves: { successes: 0, failures: 0 },
        conditionIds: (character.conditionIds ?? []).filter((id) => id !== "unconscious") } : {}),
      vitals: {
      ...vitals,

      currentHitPoints:
        Math.min(
          vitals
            .maximumHitPoints,

          vitals
            .currentHitPoints +
            safeAmount,
        ),
      },
    }, "Heilung");
    setLevelUpNotice(`${healed - vitals.currentHitPoints} Trefferpunkte geheilt (${healed}/${vitals.maximumHitPoints}).`);
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

  function handleUseHitDie(rolled: number) {
    const hitDie = getClassById(character.classId ?? "")?.hitDie;
    const totalHitDice = Math.max(1, character.level);
    const spentHitDice = Math.min(character.spentHitDice ?? 0, totalHitDice);
    if (!hitDie || spentHitDice >= totalHitDice) return;

    const constitutionModifier = Math.floor(((character.abilityScores?.constitution ?? 10) - 10) / 2);
    // The player rolls physical dice and enters the result; no RNG in GrimForge.
    if (!Number.isInteger(rolled) || rolled < 1 || rolled > hitDie) return;
    const roll = rolled;
    const recoveredHitPoints = Math.max(0, roll + constitutionModifier);

    updateCharacter({
      spentHitDice: spentHitDice + 1,
      ...(vitals.currentHitPoints === 0 && recoveredHitPoints > 0 ? {
        deathSaves: { successes: 0, failures: 0 },
        conditionIds: (character.conditionIds ?? []).filter((id) => id !== "unconscious"),
      } : {}),
      vitals: {
        ...vitals,
        currentHitPoints: Math.min(vitals.maximumHitPoints, vitals.currentHitPoints + recoveredHitPoints),
      },
    });
    setLevelUpNotice(`Trefferwürfel: W${hitDie} zeigt ${roll}, ${Math.min(recoveredHitPoints, vitals.maximumHitPoints - vitals.currentHitPoints)} TP geheilt.`);
  }

  function handleToggleInspiration() {
    updateCharacter({ inspiration: !(character.inspiration ?? false) });
    setLevelUpNotice((character.inspiration ?? false) ? "Inspiration verbraucht." : "Inspiration markiert.");
  }

  function handleShortRest() {
    const rules = calculateCharacterRules(createCharacterRuleInput(character));
    updateCharacter({
      ...(derivedStats.spellcasting.pactSlots && character.spellcasting ? { spellcasting: { ...character.spellcasting, slots: { ...character.spellcasting.slots, spentPactSlots: 0 } } } : {}),
      spentClassResources: restoreClassResourcesByRest({
        resources: rules.classResources,
        rest: "short-rest",
      }),
    });
    setLevelUpNotice(derivedStats.spellcasting.pactSlots ? "Kurze Rast: Paktplätze und passende Klassenressourcen erneuert." : "Kurze Rast: passende Klassenressourcen erneuert.");
  }

  function handleLongRest() {
    const rules =
      calculateCharacterRules(
        createCharacterRuleInput(
          character,
        ),
      );

    updateCharacter({
      deathSaves: { successes: 0, failures: 0 },
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
    setLevelUpNotice("Lange Rast: TP, Zauberplätze und passende Ressourcen erneuert. Erschöpfung ggf. nach Regelbedingungen reduzieren.");
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
            title={character.level >= MAX_LEVEL_UP_LEVEL ? `Der aktuelle Regelumfang reicht bis Stufe ${MAX_LEVEL_UP_LEVEL}.` : "Nächste Charakterstufe vorbereiten"}
            onClick={() => { setLevelUpNotice(""); setLevelUpOpen(true); }}>
            {character.level >= MAX_LEVEL_UP_LEVEL ? `Stufe ${MAX_LEVEL_UP_LEVEL} erreicht` : "Level-up"}
          </GrimButton>
          <GrimButton type="button" onClick={() => exportGrimforgePlayPdf(character)}>
            Spielakte (A4)
          </GrimButton>
          <details className="sheet-export">
            <summary>Weitere Exporte</summary>
            <div className="sheet-export__actions">
              <GrimButton type="button" onClick={() => exportSingleCharacter(character)}>Akte exportieren</GrimButton>
              <small><strong>Datensicherung:</strong> Der Charakter wird im Browser gespeichert. Regelmäßig „Akte exportieren“ nutzen – besonders vor Updates oder Browserwechseln.</small>
              <GrimButton type="button" onClick={() => void exportGrimHollowSheet(character)}>Grim-Hollow-Original (PDF)</GrimButton>
              <GrimButton type="button" onClick={downloadBlankGrimHollowSheet}>Leerer Bogen</GrimButton>
              <GrimButton type="button" onClick={() => window.print()}>Charakter drucken</GrimButton>
            </div>
          </details>
        </div>
      </div>

      {(levelUpNotice || currentUndo) && <div className="gf-action-feedback" role="status">
        {levelUpNotice && <span>{levelUpNotice}</span>}
        {currentUndo && <button type="button" onClick={handleUndo} aria-label={`${currentUndo.note} rückgängig machen`}>↶ Rückgängig</button>}
      </div>}
      {levelUpOpen ? <LevelUpPanel key={`${character.id}-${character.level}`} character={character}
        onCancel={() => setLevelUpOpen(false)} onSave={(next) => {
          onUpdateCharacter(next);
          setUndoStack([]);
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
              onSpendClassResource={handleSpendClassResource}
              onRestoreClassResource={handleRestoreClassResource}
              deathSaves={deathSaves}
              exhaustionLevel={exhaustionLevel}
              onMarkDeathSave={handleMarkDeathSave}
              onResetDeathSaves={handleResetDeathSaves}
              onExhaustionChange={handleExhaustion}
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

  onUseHitDie: (rolled: number) => void;

  onToggleInspiration: () => void;

  rulesSection: React.ReactNode;

  onNavigate: (section: CharacterSheetSection) => void;

  onToggleCondition: (conditionId: string) => void;
  onSpendClassResource: (resourceId: string, maximum: number) => void;
  onRestoreClassResource: (resourceId: string) => void;
  deathSaves: DeathSaves;
  exhaustionLevel: number;
  onMarkDeathSave: (type: "success" | "failure") => void;
  onResetDeathSaves: () => void;
  onExhaustionChange: (level: number) => void;
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
  onSpendClassResource,
  onRestoreClassResource,
  deathSaves,
  exhaustionLevel,
  onMarkDeathSave,
  onResetDeathSaves,
  onExhaustionChange,
}: CharacterOverviewProps) {
  const weight = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 });

  return (
    <section className="sheet-overview">
      <SessionDashboard
        character={character}
        vitals={vitals}
        derivedStats={derivedStats}
        onDamage={onDamage}
        onHeal={onHeal}
        onShortRest={onShortRest}
        onLongRest={onLongRest}
        onNavigate={onNavigate}
        onToggleCondition={onToggleCondition}
        onSpendClassResource={onSpendClassResource}
        onRestoreClassResource={onRestoreClassResource}
      />

      {vitals.currentHitPoints === 0 ?
        <DeathSavesPanel vitals={vitals} saves={deathSaves} onMark={onMarkDeathSave}
          onReset={onResetDeathSaves} /> :
        <details className="gf-status-disclosure"><summary>Todesrettungswürfe (bei 0 TP)</summary>
          <DeathSavesPanel vitals={vitals} saves={deathSaves} onMark={onMarkDeathSave}
            onReset={onResetDeathSaves} />
        </details>}
      <section className="gf-exhaustion" aria-label="Erschöpfung verwalten">
        <div><h3>Erschöpfung</h3><p>Stufe 0–6 · die Folgen werden nicht automatisch auf Werte angewendet.</p></div>
        <label>Stufe <select value={exhaustionLevel} onChange={(event) => onExhaustionChange(Number(event.target.value))}>
          {[0,1,2,3,4,5,6].map((level) => <option key={level} value={level}>{level}</option>)}
        </select></label>
        {exhaustionLevel > 0 && <p className="gf-exhaustion__effect">{[
          "", "Nachteil auf Attributsproben", "Bewegung halbiert", "Nachteil auf Angriffe und Rettungswürfe",
          "TP-Maximum halbiert", "Bewegung 0", "Tod (SL entscheidet)",
        ][exhaustionLevel]}{exhaustionLevel > 1 ? " · Alle niedrigeren Stufen gelten ebenfalls." : ""}</p>}
      </section>
      {character.abilityScores && (
        <section className="sheet-overview__abilities">
          <h3>Attribute</h3>
          <AbilitySealGrid values={character.abilityScores} />
        </section>
      )}

      <details className="table-board-disclosure">
        <summary>Trefferwürfel, Inspiration und Spielwerte bearbeiten</summary>
        <VitalPanel
          vitals={vitals}
          effectiveSpeed={derivedStats.speed}
          onDamage={onDamage}
          onHeal={onHeal}
          onTemporaryHitPointsChange={onTemporaryHitPointsChange}
          onVitalsChange={onVitalsChange}
          onShortRest={onShortRest}
          onLongRest={onLongRest}
          hitDie={getClassById(character.classId ?? "")?.hitDie}
          totalHitDice={Math.max(1, character.level)}
          spentHitDice={character.spentHitDice ?? 0}
          onUseHitDie={onUseHitDie}
          inspiration={character.inspiration ?? false}
          onToggleInspiration={onToggleInspiration}
        />
      </details>

      <details className="table-board-disclosure">
        <summary>Klassenmerkmale und Ressourcen verwalten</summary>
        <SubclassStats character={character} />
        {rulesSection}
      </details>

      <details className="table-board-disclosure">
        <summary>Hintergrund und weitere Werte</summary>
        <dl className="table-board__more">
          <div><dt>Hintergrund</dt><dd>{character.backgroundName || "Nicht gespeichert"}</dd></div>
          <div><dt>Passive Nachforschungen</dt><dd>{derivedStats.passiveScores.investigation}</dd></div>
          <div><dt>Passives Motiv erkennen</dt><dd>{derivedStats.passiveScores.insight}</dd></div>
          <div><dt>Traglast</dt><dd>{weight.format(derivedStats.totalWeight)} / {weight.format(derivedStats.carryingCapacity)} kg</dd></div>
          <div><dt>Geübte Fertigkeiten</dt><dd>{character.skillProficiencies?.length ?? 0}</dd></div>
          {derivedStats.spellcasting.enabled && <>
            <div><dt>Zauberfokus</dt><dd>{derivedStats.spellcasting.focusLabel ?? "Keiner"}</dd></div>
            <div><dt>Ritualmagie</dt><dd>{derivedStats.spellcasting.ritualCasting ? "Ja" : "Nein"}</dd></div>
          </>}
        </dl>
      </details>
    </section>
  );
}

