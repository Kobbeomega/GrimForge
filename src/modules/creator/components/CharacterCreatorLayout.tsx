import type { ReactNode } from "react";

interface CharacterCreatorLayoutProps {
  navigation: ReactNode;
  editor: ReactNode;
  preview: ReactNode;
}

export function CharacterCreatorLayout({
  navigation,
  editor,
  preview,
}: CharacterCreatorLayoutProps) {
  return (
    <div className="character-creator-layout">
      <aside
        className="character-creator-layout__navigation"
        aria-label="Kapitel der Charaktererstellung"
      >
        {navigation}
      </aside>

      <section className="character-creator-layout__editor">
        {editor}
      </section>

      <aside
        className="character-creator-layout__preview"
        aria-label="Live-Vorschau der Charakterakte"
      >
        {preview}
      </aside>
    </div>
  );
}