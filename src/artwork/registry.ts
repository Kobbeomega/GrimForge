export type ArtworkCategory =
  | "ancestry"
  | "class"
  | "transformation"
  | "equipment"
  | "spell";

export interface ArtworkDefinition {
  category: ArtworkCategory;
  id: string;
  title: string;
  subtitle?: string;
  symbol: string;
  tone: "violet" | "crimson" | "gold" | "verdant" | "ashen" | "azure";
  image?: string;
  focalPosition?: string;
}

const ancestryArtwork: Record<string, Partial<ArtworkDefinition>> = {
  dragonborn: { symbol: "✦", tone: "crimson" },
  dwarf: { symbol: "◆", tone: "gold" },
  elf: { symbol: "☾", tone: "azure" },
  gnome: { symbol: "✧", tone: "verdant" },
  halfling: { symbol: "❦", tone: "gold" },
  human: { symbol: "◇", tone: "ashen" },
  halfelf: { symbol: "◐", tone: "azure" },
  halforc: { symbol: "⚔", tone: "verdant" },
  tiefling: { symbol: "♜", tone: "crimson" },
  cursed: { symbol: "☠", tone: "violet" },
  awakened: { symbol: "✺", tone: "gold" },
  dhampir: { symbol: "♢", tone: "crimson" },
  disembodied: { symbol: "◌", tone: "ashen" },
  changeling: { symbol: "◈", tone: "violet" },
  wulven: { symbol: "♠", tone: "verdant" },
};

const classArtwork: Record<string, Partial<ArtworkDefinition>> = {
  barbarian: { symbol: "⚒", tone: "crimson" },
  bard: { symbol: "♫", tone: "violet" },
  cleric: { symbol: "✚", tone: "gold" },
  druid: { symbol: "❧", tone: "verdant" },
  fighter: { symbol: "⚔", tone: "ashen" },
  monk: { symbol: "◉", tone: "gold" },
  "monster-hunter": { symbol: "⌖", tone: "crimson" },
  paladin: { symbol: "✦", tone: "gold" },
  ranger: { symbol: "➶", tone: "verdant" },
  rogue: { symbol: "◆", tone: "ashen" },
  sorcerer: { symbol: "✺", tone: "crimson" },
  warlock: { symbol: "☿", tone: "violet" },
  wizard: { symbol: "✧", tone: "azure" },
};

const transformationArtwork: Record<string, Partial<ArtworkDefinition>> = {
  "aberrant-horror": { symbol: "✦", tone: "violet" },
  fey: { symbol: "❧", tone: "verdant" },
  fiend: { symbol: "♠", tone: "crimson" },
  lich: { symbol: "☠", tone: "ashen" },
  lycanthrope: { symbol: "☾", tone: "azure" },
  seraph: { symbol: "✧", tone: "gold" },
  vampire: { symbol: "◆", tone: "crimson" },
};

const categoryDefaults: Record<ArtworkCategory, Pick<ArtworkDefinition, "symbol" | "tone">> = {
  ancestry: { symbol: "◇", tone: "violet" },
  class: { symbol: "⚔", tone: "gold" },
  transformation: { symbol: "☾", tone: "crimson" },
  equipment: { symbol: "◆", tone: "ashen" },
  spell: { symbol: "✧", tone: "azure" },
};

export const artworkRegistries: Partial<Record<ArtworkCategory, Record<string, Partial<ArtworkDefinition>>>> = {
  ancestry: ancestryArtwork,
  class: classArtwork,
  transformation: transformationArtwork,
};

const artworkFolders: Record<ArtworkCategory, string> = {
  ancestry: "ancestries",
  class: "classes",
  transformation: "transformations",
  equipment: "equipment",
  spell: "spells",
};

function resolveArtworkImage(
  category: ArtworkCategory,
  id: string,
  explicitImage?: string,
): string {
  if (explicitImage) {
    return explicitImage;
  }

  const hasDedicatedArtwork = Boolean(artworkRegistries[category]?.[id]);

  if (hasDedicatedArtwork) {
    return `/artwork/${artworkFolders[category]}/${id}.svg`;
  }

  return `/artwork/categories/${category}.svg`;
}

export function getArtworkDefinition({
  category,
  id,
  title,
  subtitle,
}: {
  category: ArtworkCategory;
  id: string;
  title: string;
  subtitle?: string;
}): ArtworkDefinition {
  const fallback = categoryDefaults[category];
  const specific = artworkRegistries[category]?.[id] ?? {};

  return {
    category,
    id,
    title,
    subtitle,
    symbol: specific.symbol ?? fallback.symbol,
    tone: specific.tone ?? fallback.tone,
    image: resolveArtworkImage(category, id, specific.image),
    focalPosition: specific.focalPosition ?? "center",
  };
}

export function hasDedicatedArtwork(
  category: ArtworkCategory,
  id: string,
): boolean {
  return Boolean(artworkRegistries[category]?.[id]);
}
