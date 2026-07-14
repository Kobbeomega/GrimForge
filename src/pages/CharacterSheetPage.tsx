import { useState } from "react";

import { GrimButton } from "../components/ui/GrimButton";
import { PaperPage } from "../components/ui/PaperPage";

import { getCharacterInventory } from "../modules/archives/utils/getCharacterInventory";
import { getCharacterVitals } from "../modules/archives/utils/getCharacterVitals";

import { AbilitySealGrid } from "../modules/sheet/components/AbilitySealGrid";
import { BackgroundPanel } from "../modules/sheet/components/BackgroundPanel";
import { CharacterQuickOverview } from "../modules/sheet/components/CharacterQuickOverview";
import { CharacterSheetHeader } from "../modules/sheet/components/CharacterSheetHeader";
import { InventoryPanel } from "../modules/sheet/components/InventoryPanel";
import { RollsPanel } from "../modules/sheet/components/RollsPanel";
import { VitalPanel } from "../modules/sheet/components/VitalPanel";

import { getCharacterDerivedStats } from "../modules/sheet/utils/getCharacterDerivedStats";

import type {
  CharacterArchiveEntry,
  CharacterInventory,
  CharacterVitals,
} from "../modules/archives/types";

type CharacterSheetSection =
  | "overview"
  | "abilities"
  | "rolls"
  | "inventory"
  | "transformation"
  | "chronicle";

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
    id: "abilities",
    chapter: "II",
    title: "Attribute",
  },
  {
    id: "rolls",
    chapter: "III",
    title: "Würfe",
  },
  {
    id: "inventory",
    chapter: "IV",
    title: "Inventar",
  },
  {
    id: "transformation",
    chapter: "V",
    title: "Transformation",
  },
  {
    id: "chronicle",
    chapter: "VI",
    title: "Chronik",
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
  const [activeSection, setActiveSection] =
    useState<CharacterSheetSection>(
      "overview",
    );

  const vitals =
    getCharacterVitals(character);

  const inventory =
    getCharacterInventory(character);

  const derivedStats =
    getCharacterDerivedStats(
      character,
      inventory,
    );

  function updateCharacter(
    changes: Partial<CharacterArchiveEntry>,
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
    nextInventory: CharacterInventory,
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
          nextDerivedStats.armorClass,
      },
    });
  }

  function handleDamage(
    amount: number,
  ) {
    const safeAmount = Math.max(
      0,
      Number.isFinite(amount)
        ? amount
        : 0,
    );

    const absorbedByTemporaryHitPoints =
      Math.min(
        vitals.temporaryHitPoints,
        safeAmount,
      );

    const remainingDamage =
      safeAmount -
      absorbedByTemporaryHitPoints;

    updateVitals({
      ...vitals,

      temporaryHitPoints:
        vitals.temporaryHitPoints -
        absorbedByTemporaryHitPoints,

      currentHitPoints: Math.max(
        0,
        vitals.currentHitPoints -
          remainingDamage,
      ),
    });
  }

  function handleHeal(
    amount: number,
  ) {
    const safeAmount = Math.max(
      0,
      Number.isFinite(amount)
        ? amount
        : 0,
    );

    updateVitals({
      ...vitals,

      currentHitPoints: Math.min(
        vitals.maximumHitPoints,
        vitals.currentHitPoints +
          safeAmount,
      ),
    });
  }

  function handleTemporaryHitPointsChange(
    value: number,
  ) {
    updateVitals({
      ...vitals,

      temporaryHitPoints: Math.max(
        0,
        value,
      ),
    });
  }

  function handleShortRest() {
    const recoveredHitPoints =
      Math.max(
        1,
        Math.floor(
          vitals.maximumHitPoints /
            4,
        ),
      );

    updateVitals({
      ...vitals,

      currentHitPoints: Math.min(
        vitals.maximumHitPoints,
        vitals.currentHitPoints +
          recoveredHitPoints,
      ),
    });
  }

  function handleLongRest() {
    updateVitals({
      ...vitals,

      currentHitPoints:
        vitals.maximumHitPoints,

      temporaryHitPoints: 0,
    });
  }

  return (
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

        <span className="sheet-toolbar__status">
          Status:{" "}
          {
            statusLabels[
              character.status
            ]
          }
        </span>
      </div>

      <div className="sheet-layout">
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
              onDamage={handleDamage}
              onHeal={handleHeal}
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
            />
          )}

          {activeSection ===
            "abilities" && (
            <CharacterAbilities
              character={character}
            />
          )}

          {activeSection ===
            "rolls" && (
            <RollsPanel
              character={character}
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
            "transformation" && (
            <SheetPlaceholder
              chapter="Kapitel V"
              title="Transformation"
              description="Die Transformationsstufen sowie positive und negative Effekte erscheinen hier."
            />
          )}

          {activeSection ===
            "chronicle" && (
            <SheetPlaceholder
              chapter="Kapitel VI"
              title="Chronik"
              description="Persönliche Notizen und Erinnerungen werden hier niedergeschrieben."
            />
          )}
        </main>
      </div>
    </PaperPage>
  );
}

interface CharacterOverviewProps {
  character: CharacterArchiveEntry;
  vitals: CharacterVitals;

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
            {character.backgroundName ??
              "Nicht gespeichert"}
          </dd>
        </div>

        <div>
          <dt>Klasse</dt>

          <dd>{classLabel}</dd>
        </div>

        <div>
          <dt>Stufe</dt>

          <dd>{character.level}</dd>
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
          <dt>Transformation</dt>

          <dd>
            {character.transformation ||
              "Keine Wandlung"}
          </dd>
        </div>

        <div>
          <dt>Geübte Fertigkeiten</dt>

          <dd>
            {
              character
                .skillProficiencies
                ?.length ?? 0
            }
          </dd>
        </div>

        <div>
          <dt>Zuletzt geändert</dt>

          <dd>
            {formatDate(
              character.updatedAt,
            )}
          </dd>
        </div>
      </dl>

      <BackgroundPanel
        character={character}
      />

      <VitalPanel
        vitals={vitals}
        onDamage={onDamage}
        onHeal={onHeal}
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
      />

      {character.abilityScores && (
        <section className="sheet-overview__abilities">
          <div className="sheet-overview__section-heading">
            <p>Grundwerte</p>

            <h3>Attribute</h3>
          </div>

          <AbilitySealGrid
            values={
              character.abilityScores
            }
          />
        </section>
      )}
    </section>
  );
}

function CharacterAbilities({
  character,
}: {
  character: CharacterArchiveEntry;
}) {
  if (!character.abilityScores) {
    return (
      <SheetPlaceholder
        chapter="Kapitel II"
        title="Attribute"
        description="Für diese ältere Akte wurden noch keine Attributswerte gespeichert."
      />
    );
  }

  return (
    <section className="sheet-abilities">
      <header className="sheet-overview__section-heading">
        <p>Kapitel II</p>

        <h2>Attribute</h2>

        <span>
          Die sechs Grundwerte und
          ihre Modifikatoren.
        </span>
      </header>

      <AbilitySealGrid
        values={
          character.abilityScores
        }
      />
    </section>
  );
}

interface SheetPlaceholderProps {
  chapter: string;
  title: string;
  description: string;
}

function SheetPlaceholder({
  chapter,
  title,
  description,
}: SheetPlaceholderProps) {
  return (
    <section className="sheet-placeholder">
      <p className="creator-section__chapter">
        {chapter}
      </p>

      <h2>{title}</h2>

      <p>{description}</p>
    </section>
  );
}

function formatDate(
  value: string,
): string {
  const date = new Date(value);

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