import { useState } from "react";

import "./styles/base.css";

import { AppLayout } from "./components/layout/AppLayout";
import { CodexPageTransition } from "./components/layout/CodexPageTransition";

import { GrimButton } from "./components/ui/GrimButton";
import { ChapterHeader } from "./components/ui/ChapterHeader";
import { PaperPage } from "./components/ui/PaperPage";

import { CharacterPage } from "./pages/CharacterPage";

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

  archive: {
    chapter: "Kapitel IV · Das Archiv",
    title: "Archiv",
    subtitle: "Gespeicherte Charaktere, Exporte und Einstellungen.",
    introduction:
      "Im Archiv werden später Charakterakten verwaltet, Sicherungen erstellt und lokale Daten importiert oder exportiert.",
  },
};

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
        {activeSection === "character" ? (
          <CharacterPage />
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

              {activeSection === "archive" && (
                <>
                  <GrimButton>
                    Daten importieren
                  </GrimButton>

                  <GrimButton>
                    Sicherung exportieren
                  </GrimButton>
                </>
              )}
            </div>
          </PaperPage>
        )}
      </CodexPageTransition>
    </AppLayout>
  );
}

export default App;