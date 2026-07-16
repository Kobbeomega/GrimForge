import type { CompendiumEntry } from "../types";
import { getComparisonRows } from "../utils/comparison";

interface CompendiumCompareBarProps {
  entries: CompendiumEntry[];
  maximumEntries: number;
  onOpen: () => void;
  onRemove: (entryId: string) => void;
  onClear: () => void;
}

export function CompendiumCompareBar({
  entries,
  maximumEntries,
  onOpen,
  onRemove,
  onClear,
}: CompendiumCompareBarProps) {
  if (entries.length === 0) return null;

  return (
    <aside className="compendium-compare-bar" aria-label="Vergleichsauswahl">
      <div>
        <span>Vergleich</span>
        <strong>{entries.length}/{maximumEntries} Akten gewählt</strong>
      </div>
      <div className="compendium-compare-bar__entries">
        {entries.map((entry) => (
          <button type="button" key={entry.id} onClick={() => onRemove(entry.id)} title="Aus Vergleich entfernen">
            {entry.name} ×
          </button>
        ))}
      </div>
      <div className="compendium-compare-bar__actions">
        <button type="button" onClick={onClear}>Leeren</button>
        <button type="button" className="is-primary" onClick={onOpen} disabled={entries.length < 2}>
          Vergleichen
        </button>
      </div>
    </aside>
  );
}

interface CompendiumCompareDialogProps {
  entries: CompendiumEntry[];
  onClose: () => void;
}

export function CompendiumCompareDialog({ entries, onClose }: CompendiumCompareDialogProps) {
  const rows = getComparisonRows(entries);

  return (
    <div className="compendium-compare-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="compendium-compare-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Compendium-Einträge vergleichen"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>Aktenvergleich</span>
            <h2>Werte gegenüberstellen</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Vergleich schließen">×</button>
        </header>

        <div className="compendium-compare-table-wrap">
          <table className="compendium-compare-table">
            <thead>
              <tr>
                <th>Merkmal</th>
                {entries.map((entry) => <th key={entry.id}>{entry.name}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="compendium-compare-table__description">
                <th>Beschreibung</th>
                {entries.map((entry) => <td key={entry.id}>{entry.description || "—"}</td>)}
              </tr>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {row.values.map((value, index) => <td key={`${row.label}-${entries[index]?.id ?? index}`}>{value || "—"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
