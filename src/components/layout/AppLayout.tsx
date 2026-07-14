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
    <main className="app-layout">
      <div
        className="app-layout__texture"
        aria-hidden="true"
      />

      <BookNavigation
        activeItemId={activeSection}
        onNavigate={onNavigate}
      />

      <div className="app-layout__content">
        {children}
      </div>
    </main>
  );
}