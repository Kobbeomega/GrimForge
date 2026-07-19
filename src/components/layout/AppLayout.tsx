import type { ReactNode } from "react";

import { BookNavigation } from "./BookNavigation";

import type { AppSectionId } from "../../types/navigation";

interface AppLayoutProps {
  children: ReactNode;
  activeSection: AppSectionId;
  onNavigate: (sectionId: AppSectionId) => void;
}

export function AppLayout({
  children,
  activeSection,
  onNavigate,
}: AppLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <main className="app-layout">
      <div
        className="app-layout__texture"
        aria-hidden="true"
      />

      <BookNavigation
        activeItemId={activeSection}
        onNavigate={onNavigate}
      />

      <div id="main-content" className="app-layout__content" tabIndex={-1}>
        {children}
      </div>
    </main>
    </>
  );
}