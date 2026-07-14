import type { ReactNode } from "react";

import { GrimforgeSeal } from "../icons/GrimforgeSeal";

export interface ChapterHeaderProps {
  chapter?: string;
  title: string;
  subtitle?: string;
  symbol?: ReactNode;
  className?: string;
}

export function ChapterHeader({
  chapter,
  title,
  subtitle,
  symbol,
  className = "",
}: ChapterHeaderProps) {
  const classes = ["chapter-header", className]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div
        className="chapter-header__symbol"
        aria-hidden="true"
      >
        {symbol ?? (
          <GrimforgeSeal
            size={46}
            className="chapter-header__seal"
          />
        )}
      </div>

      <div className="chapter-header__content">
        {chapter && (
          <p className="chapter-header__chapter">
            {chapter}
          </p>
        )}

        <h2 className="chapter-header__title">
          {title}
        </h2>

        {subtitle && (
          <p className="chapter-header__subtitle">
            {subtitle}
          </p>
        )}
      </div>

      <div
        className="chapter-header__ornament"
        aria-hidden="true"
      >
        <span />
        <i>◆</i>
        <span />
      </div>
    </header>
  );
}