import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "grimforge.compendium.favorites.v1";

function loadFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function useCompendiumFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(loadFavorites);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Favoriten bleiben für die laufende Sitzung verfügbar.
    }
  }, [favoriteIds]);

  const favorites = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  function toggleFavorite(entryId: string) {
    setFavoriteIds((current) =>
      current.includes(entryId)
        ? current.filter((id) => id !== entryId)
        : [...current, entryId],
    );
  }

  return {
    favorites,
    favoriteCount: favoriteIds.length,
    toggleFavorite,
  };
}
