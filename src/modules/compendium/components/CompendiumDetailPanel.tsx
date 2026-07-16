import type { ReactNode } from "react";

interface CompendiumDetailPanelProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
}

export function CompendiumDetailPanel({
  eyebrow,
  title,
  description,
  children,
  actions,
  onClose,
}: CompendiumDetailPanelProps) {
  return (
    <aside className="compendium-detail" aria-label={`${title} Details`}>
      <button
        type="button"
        className="compendium-detail__close"
        onClick={onClose}
        aria-label="Detailansicht schließen"
      >
        ×
      </button>

      <span className="compendium-detail__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {actions ? <div className="compendium-detail__actions">{actions}</div> : null}

      <div className="compendium-detail__body">{children}</div>
    </aside>
  );
}
