import { lazy, Suspense, useState } from "react";
import { runProjectHealthAudit } from "./dev/projectHealth";

import "./styles/base.css";

import { AppLayout } from "./components/layout/AppLayout";
import { CodexPageTransition } from "./components/layout/CodexPageTransition";

import { PaperPage } from "./components/ui/PaperPage";

const CharacterPage = lazy(() => import("./pages/CharacterPage").then((module) => ({ default: module.CharacterPage })));
const ArchiveManagementPage = lazy(() => import("./pages/ArchiveManagementPage").then((module) => ({ default: module.ArchiveManagementPage })));
const CompendiumPage = lazy(() => import("./pages/CompendiumPage").then((module) => ({ default: module.CompendiumPage })));

import type { AppSectionId } from "./types/navigation";

if (import.meta.env.DEV) {
  runProjectHealthAudit();
}

function App() {
  const [activeSection, setActiveSection] =
    useState<AppSectionId>("character");


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
          <CharacterPage key="session" session />
        )}
        </Suspense>
      </CodexPageTransition>
    </AppLayout>
  );
}

export default App;
