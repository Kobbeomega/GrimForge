import type {
  CharacterSpellcasting,
} from "../../../compendium/spells";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

import {
  getSpellcastingStats,
} from "../utils/getSpellcastingStats";

import {
  SpellcastingPanel,
} from "./SpellcastingPanel";

interface MagicPanelProps {
  character: CharacterArchiveEntry;

  onSpellcastingChange: (
    spellcasting: CharacterSpellcasting,
  ) => void;
}

export function MagicPanel({
  character,
  onSpellcastingChange,
}: MagicPanelProps) {
  const stats =
    getSpellcastingStats(character);

  return (
    <section className="magic-sheet">
      <header className="magic-sheet__hero">
        <div>
          <p>Kapitel VI</p>
          <h2>Grimoire</h2>
          <span>
            Zauberwerte, verfügbare Plätze und
            bekannte Formeln in einer eigenen Akte.
          </span>
        </div>

        <div className="magic-sheet__sigil" aria-hidden="true">
          ✦
        </div>
      </header>

      {stats.enabled ? (
        <SpellcastingPanel
          character={character}
          stats={stats}
          onChange={onSpellcastingChange}
        />
      ) : (
        <div className="magic-sheet__empty">
          <strong>Keine Zauberausbildung</strong>
          <span>
            Diese Klasse besitzt auf der aktuellen
            Stufe keine Zauberwirker-Konfiguration.
          </span>
        </div>
      )}
    </section>
  );
}
