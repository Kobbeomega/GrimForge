import { lazy, Suspense, useState } from "react";
import { runProjectHealthAudit } from "./dev/projectHealth";

import "./styles/base.css";

import { AppLayout } from "./components/layout/AppLayout";
import { CodexPageTransition } from "./components/layout/CodexPageTransition";

import { GrimButton } from "./components/ui/GrimButton";
import { ChapterHeader } from "./components/ui/ChapterHeader";
import { PaperPage } from "./components/ui/PaperPage";

const CharacterPage = lazy(() => import("./pages/CharacterPage").then((module) => ({ default: module.CharacterPage })));
const ArchiveManagementPage = lazy(() => import("./pages/ArchiveManagementPage").then((module) => ({ default: module.ArchiveManagementPage })));
const CompendiumPage = lazy(() => import("./pages/CompendiumPage").then((module) => ({ default: module.CompendiumPage })));

import type { AppSectionId } from "./types/navigation";

interface SectionContent {
  chapter: string;
  title: string;
  subtitle: string;
  introduction: string;
}

const sectionContent: Record<AppSectionId, SectionContent> = {
  character: {
    chapter: "Kapitel I · Die Akte",
    title: "Charakter",
    subtitle: "Erschaffe, verwalte und bewahre deine Spielfigur.",
    introduction:
      "Hier entsteht später der vollständige Charakterbogen mit Abstammung, Klasse, Attributen, Fähigkeiten und Ausrüstung.",
  },

  session: {
    chapter: "Kapitel II · Der Einsatz",
    title: "Session",
    subtitle: "Alle wichtigen Werte für den Spieltisch.",
    introduction:
      "Dieser Bereich wird Trefferpunkte, Zustände, Angriffe, Ressourcen, Verbrauchsgüter und den Würfelaltar enthalten.",
  },

  journal: {
    chapter: "Kapitel III · Die Chronik",
    title: "Journal",
    subtitle: "Halte Namen, Orte, Gerüchte und Erinnerungen fest.",
    introduction:
      "Das Journal wird freie Sitzungsnotizen, wichtige Kontakte, offene Aufgaben und persönliche Aufzeichnungen aufnehmen.",
  },

  compendium: {
    chapter: "Kapitel IV · Das Nachschlagewerk",
    title: "Compendium",
    subtitle: "Regeln, Optionen und Ausrüstung auf einen Blick.",
    introduction:
      "Das Compendium bündelt Abstammungen, Klassen, Verwandlungen, Ausrüstung und Zauber in einer durchsuchbaren Bibliothek.",
  },

  archive: {
    chapter: "Kapitel V · Das Archiv",
    title: "Archiv",
    subtitle: "Gespeicherte Charaktere, Exporte und Einstellungen.",
    introduction:
      "Im Archiv werden später Charakterakten verwaltet, Sicherungen erstellt und lokale Daten importiert oder exportiert.",
  },
};

if (import.meta.env.DEV) {
  runProjectHealthAudit();
}

function App() {
  const [activeSection, setActiveSection] =
    useState<AppSectionId>("character");

  const currentSection = sectionContent[activeSection];

  return (
    <AppLayout
      activeSection={activeSection}
      onNavigate={setActiveSection}
    >
      <CodexPageTransition pageKey={activeSection}>
        <Suspense fallback={<PaperPage><p className="intro-copy">Kapitel wird geladen …</p></PaperPage>}>
        {activeSection === "character" ? (
          <CharacterPage />
        ) : activeSection === "archive" ? (
          <ArchiveManagementPage />
        ) : activeSection === "compendium" ? (
          <CompendiumPage />
        ) : (
          <PaperPage>
            <ChapterHeader
              chapter={currentSection.chapter}
              title={currentSection.title}
              subtitle={currentSection.subtitle}
            />

            <div className="intro-copy">
              <p>{currentSection.introduction}</p>
            </div>

            <div className="intro-actions">
              {activeSection === "session" && (
                <GrimButton>
                  Session beginnen
                </GrimButton>
              )}

              {activeSection === "journal" && (
                <GrimButton>
                  Eintrag verfassen
                </GrimButton>
              )}

            </div>
          </PaperPage>
        )}
        </Suspense>
      </CodexPageTransition>
    </AppLayout>
  );
}

export default App;