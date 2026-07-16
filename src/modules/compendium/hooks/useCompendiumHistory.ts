import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "grimforge.compendium.history.v1";
const MAXIMUM_ENTRIES = 12;

function loadHistory(): string[] {
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

export function useCompendiumHistory() {
  const [historyIds, setHistoryIds] = useState<string[]>(loadHistory);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(historyIds));
    } catch {
      // Der Verlauf bleibt für die laufende Sitzung verfügbar.
    }
  }, [historyIds]);

  const ids = useMemo(() => new Set(historyIds), [historyIds]);

  function record(entryId: string) {
    setHistoryIds((current) => [
      entryId,
      ...current.filter((id) => id !== entryId),
    ].slice(0, MAXIMUM_ENTRIES));
  }

  function clear() {
    setHistoryIds([]);
  }

  return {
    historyIds,
    ids,
    record,
    clear,
  };
}
