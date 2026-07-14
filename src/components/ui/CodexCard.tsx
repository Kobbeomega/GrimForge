import type {
  HTMLAttributes,
  ReactNode,
} from "react";

interface CodexCardProps
  extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  symbol?: ReactNode;
  metadata?: string[];
  actions?: ReactNode;
  selected?: boolean;
}

export function CodexCard({
  eyebrow,
  title,
  description,
  symbol,
  metadata = [],
  actions,
  selected = false,
  className = "",
  children,
  ...props
}: CodexCardProps) {
  const classes = [
    "codex-card",
    selected ? "codex-card--selected" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={classes}
      {...props}
    >
      <div
        className="codex-card__corner"
        aria-hidden="true"
      />

      <header className="codex-card__header">
        {symbol && (
          <div className="codex-card__symbol">
            {symbol}
          </div>
        )}

        <div className="codex-card__heading">
          {eyebrow && (
            <p className="codex-card__eyebrow">
              {eyebrow}
            </p>
          )}

          <h3 className="codex-card__title">
            {title}
          </h3>
        </div>
      </header>

      {description && (
        <p className="codex-card__description">
          {description}
        </p>
      )}

      {metadata.length > 0 && (
        <ul className="codex-card__metadata">
          {metadata.map((entry) => (
            <li key={entry}>
              {entry}
            </li>
          ))}
        </ul>
      )}

      {children && (
        <div className="codex-card__content">
          {children}
        </div>
      )}

      {actions && (
        <footer className="codex-card__actions">
          {actions}
        </footer>
      )}
    </article>
  );
}