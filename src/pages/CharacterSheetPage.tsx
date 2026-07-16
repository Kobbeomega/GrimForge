import { useState } from "react";

import { CharacterPrintView } from "../modules/print/CharacterPrintView";

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
  ) {
    updateCharacter({
      spellcasting,
    });
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
  }

  function handleShortRest() {
    const recoveredHitPoints =
      Math.max(
        1,
        Math.floor(
          vitals.maximumHitPoints / 4,
        ),
      );

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
          Math.min(
            vitals.maximumHitPoints,
            vitals.currentHitPoints +
              recoveredHitPoints,
          ),
      },
      spentClassResources:
        restoreClassResourcesByRest({
          resources:
            rules.classResources,
          rest: "short-rest",
        }),
    });
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
          <GrimButton
            type="button"
            onClick={() => exportSingleCharacter(character)}
          >
            Akte exportieren
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
              rulesSection={
                <CharacterRulesSection
                  character={character}
                  onSpendClassResource={handleSpendClassResource}
                  onRestoreClassResource={handleRestoreClassResource}
                />
              }
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
      </div>
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

  rulesSection: React.ReactNode;
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
  rulesSection,
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