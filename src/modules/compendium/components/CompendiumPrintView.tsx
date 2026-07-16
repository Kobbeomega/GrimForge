import { createPortal } from "react-dom";

import type { CompendiumEntry } from "../types";
import { getComparisonRows } from "../utils/comparison";

interface CompendiumPrintViewProps {
  entry: CompendiumEntry;
}

export function CompendiumPrintView({ entry }: CompendiumPrintViewProps) {
  const rows = getComparisonRows([entry]);

  return createPortal(
    <section className="compendium-print-root" aria-hidden="true">
      <header className="compendium-print-header">
        <span>GRIMFORGE · COMPENDIUM-AKTE</span>
        <h1>{entry.name}</h1>
        <p>{entry.description || "Keine Beschreibung hinterlegt."}</p>
      </header>

      <div className="compendium-print-sigil" aria-hidden="true">◈</div>

      <table className="compendium-print-table">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th>{row.label}</th>
              <td>{row.values[0] || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {"stages" in entry ? (
        <section className="compendium-print-section">
          <h2>Wandlungsstufen</h2>
          {entry.stages.map((stage) => (
            <article key={stage.stage}>
              <strong>Stufe {stage.stage} · {stage.title}</strong>
              <p>{stage.description}</p>
            </article>
          ))}
        </section>
      ) : null}

      {"features" in entry && entry.features?.length ? (
        <section className="compendium-print-section">
          <h2>Merkmale</h2>
          {entry.features.map((feature) => (
            <article key={feature.id}>
              <strong>Stufe {feature.level} · {feature.name}</strong>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>
      ) : null}
    </section>,
    document.body,
  );
}
