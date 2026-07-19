import { useMemo } from "react";
import { getProjectHealthReport } from "../../dev/projectHealth";

export function ProjectHealthPanel() {
  const report = useMemo(() => getProjectHealthReport(), []);
  const allGood = report.failed === 0;

  return (
    <section className="project-health" aria-labelledby="project-health-title">
      <div className="project-health__header">
        <div>
          <p className="archive-management-card__eyebrow">RC1 Health Check</p>
          <h2 id="project-health-title">Projektzustand</h2>
        </div>
        <span className={`project-health__badge${allGood ? " project-health__badge--ok" : ""}`}>
          {allGood ? "Bereit" : `${report.failed} Hinweise`}
        </span>
      </div>

      <div className="project-health__grid">
        {report.rules.map((check) => (
          <article className="project-health__item" key={check.id}>
            <span aria-hidden="true">{check.ok ? "✓" : "!"}</span>
            <div>
              <strong>{check.label}</strong>
              <small>{check.details}</small>
            </div>
          </article>
        ))}
        <article className="project-health__item">
          <span aria-hidden="true">{report.migration.ok ? "✓" : "!"}</span>
          <div>
            <strong>Migrationstest</strong>
            <small>{report.migration.details}</small>
          </div>
        </article>
      </div>

      <details className="project-health__details">
        <summary>Content-Audit anzeigen</summary>
        <p>
          Bestand: {Object.entries(report.content.totals)
            .map(([key, value]) => `${key} ${value}`)
            .join(" · ")}
        </p>
        {report.content.issues.length === 0 ? (
          <p>Keine strukturellen Content-Probleme gefunden.</p>
        ) : (
          <ul>
            {report.content.issues.slice(0, 30).map((issue, index) => (
              <li key={`${issue.area}-${issue.message}-${index}`}>
                <strong>{issue.area}:</strong> {issue.message}
              </li>
            ))}
          </ul>
        )}
      </details>
    </section>
  );
}
