import { useCallback, useMemo, useState } from "react";

import type { CompendiumEntry } from "../types";

const maximumEntries = 3;

export function useCompendiumCompare() {
  const [entries, setEntries] = useState<CompendiumEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const ids = useMemo(() => new Set(entries.map((entry) => entry.id)), [entries]);

  const toggle = useCallback((entry: CompendiumEntry) => {
    setEntries((current) => {
      if (current.some((candidate) => candidate.id === entry.id)) {
        return current.filter((candidate) => candidate.id !== entry.id);
      }

      if (current.length >= maximumEntries) {
        return [...current.slice(1), entry];
      }

      return [...current, entry];
    });
  }, []);

  const clear = useCallback(() => {
    setEntries([]);
    setIsOpen(false);
  }, []);

  const remove = useCallback((entryId: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== entryId));
  }, []);

  return {
    entries,
    ids,
    isOpen,
    maximumEntries,
    toggle,
    remove,
    clear,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
