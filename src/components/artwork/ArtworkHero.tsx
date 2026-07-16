import type { CSSProperties, ReactNode } from "react";

import type {
  ArtworkCategory,
} from "../../artwork";

import {
  getArtworkDefinition,
} from "../../artwork";

interface ArtworkHeroProps {
  category: ArtworkCategory;
  entryId: string;
  title: string;
  eyebrow: string;
  description?: string;
  subtitle?: string;
  badge?: ReactNode;
  compact?: boolean;
  className?: string;
}

export function ArtworkHero({
  category,
  entryId,
  title,
  eyebrow,
  description,
  subtitle,
  badge,
  compact = false,
  className = "",
}: ArtworkHeroProps) {
  const artwork = getArtworkDefinition({
    category,
    id: entryId,
    title,
    subtitle,
  });

  const style = artwork.image
    ? ({
        "--artwork-image": `url(${artwork.image})`,
        "--artwork-position": artwork.focalPosition,
      } as CSSProperties)
    : undefined;

  return (
    <header
      className={[
        "artwork-hero",
        `artwork-hero--${artwork.tone}`,
        compact ? "artwork-hero--compact" : "",
        artwork.image ? "artwork-hero--has-image" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <div className="artwork-hero__texture" aria-hidden="true" />
      <div className="artwork-hero__symbol" aria-hidden="true">
        <span>{artwork.symbol}</span>
      </div>

      <div className="artwork-hero__copy">
        <p>{eyebrow}</p>
        <h3>{title}</h3>
        {subtitle && <small>{subtitle}</small>}
        {description && <span>{description}</span>}
      </div>

      {badge && <div className="artwork-hero__badge">{badge}</div>}
    </header>
  );
}
