import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { ArtworkHero } from "../components/artwork";
import { ChapterHeader } from "../components/ui/ChapterHeader";
import { PaperPage } from "../components/ui/PaperPage";

import { ancestries, type CharacterAncestry } from "../compendium/ancestries";
import { classes, type CharacterClass } from "../compendium/classes";
import {
  armor,
  equipment,
  gear,
  weapons,
  type EquipmentDefinition,
  type WeaponItem,
} from "../compendium/equipment";
import { spells, type SpellDefinition } from "../compendium/spells";
import {
  transformations,
  type TransformationDefinition,
} from "../compendium/transformations";

import { CompendiumDetailPanel } from "../modules/compendium/components/CompendiumDetailPanel";
import { CompendiumCompareBar, CompendiumCompareDialog } from "../modules/compendium/components/CompendiumCompare";
import { CompendiumPrintView } from "../modules/compendium/components/CompendiumPrintView";
import { CompendiumStat } from "../modules/compendium/components/CompendiumStat";
import type { CompendiumCategoryId, CompendiumEntry } from "../modules/compendium/types";
import { useCompendiumFavorites } from "../modules/compendium/hooks/useCompendiumFavorites";
import { useCompendiumCompare } from "../modules/compendium/hooks/useCompendiumCompare";
import { useCompendiumHistory } from "../modules/compendium/hooks/useCompendiumHistory";
import { formatCompendiumEntryText } from "../modules/compendium/utils/entryText";
import { useCharacterContext } from "../store/CharacterContext";
import { getCharacterInventory } from "../modules/archives/utils/getCharacterInventory";
import type { CharacterArchiveEntry, InventoryItemCategory } from "../modules/archives/types";

import "../modules/compendium/styles/compendium.css";

interface CategoryDefinition {
  id: CompendiumCategoryId;
  title: string;
  subtitle: string;
  symbol: string;
  count: number;
}

const categoryLabels: Record<Exclude<CompendiumCategoryId, "overview">, string> = {
  ancestries: "Abstammungen",
  classes: "Klassen",
  transformations: "Verwandlungen",
  weapons: "Waffen",
  armor: "Rüstungen",
  gear: "Ausrüstung",
  spells: "Zauber",
};

const schoolLabels: Record<string, string> = {
  abjuration: "Bannmagie",
  conjuration: "Beschwörung",
  divination: "Erkenntnismagie",
  enchantment: "Verzauberung",
  evocation: "Hervorrufung",
  illusion: "Illusion",
  necromancy: "Nekromantie",
  transmutation: "Verwandlung",
};

const damageTypeLabels: Record<string, string> = {
  slashing: "Hieb",
  piercing: "Stich",
  bludgeoning: "Wucht",
};

const propertyLabels: Record<string, string> = {
  light: "Leicht",
  heavy: "Schwer",
  finesse: "Finesse",
  "two-handed": "Zweihändig",
  versatile: "Vielseitig",
  reach: "Reichweite",
  thrown: "Wurfwaffe",
  loading: "Laden",
  ammunition: "Munition",
};

const entriesByCategory: Record<Exclude<CompendiumCategoryId, "overview">, CompendiumEntry[]> = {
  ancestries,
  classes,
  transformations,
  weapons,
  armor,
  gear,
  spells,
};

function getEntryCategory(entry: CompendiumEntry): Exclude<CompendiumCategoryId, "overview"> {
  if ("hitDie" in entry) return "classes";
  if ("stages" in entry) return "transformations";
  if ("level" in entry && "school" in entry) return "spells";
  if ("category" in entry) {
    if (entry.category === "weapon") return "weapons";
    if (entry.category === "armor" || entry.category === "shield") return "armor";
    return "gear";
  }
  return "ancestries";
}

const allEntries = Object.values(entriesByCategory).flat();
const entryById = new Map(allEntries.map((entry) => [entry.id, entry]));

function normalize(value: string) {
  return value.toLocaleLowerCase("de-DE").trim();
}

function matchesSearch(entry: CompendiumEntry, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    entry.name,
    entry.description ?? "",
    "theme" in entry ? entry.theme : "",
    "origin" in entry ? entry.origin : "",
    "school" in entry ? entry.school : "",
    "category" in entry ? entry.category : "",
    "tags" in entry ? entry.tags?.join(" ") ?? "" : "",
  ]
    .join(" ")
    .toLocaleLowerCase("de-DE");

  return haystack.includes(query);
}

function formatPrice(price: number) {
  if (price >= 1) {
    return `${price} GM`;
  }

  const silver = price * 10;
  return Number.isInteger(silver)
    ? `${silver} SM`
    : `${Math.round(price * 100)} KM`;
}

function formatDice(damage: WeaponItem["damage"]) {
  return `${damage.dice}W${damage.die} ${damageTypeLabels[damage.type] ?? damage.type}`;
}

function getEntryMeta(entry: CompendiumEntry) {
  if ("hitDie" in entry) {
    return `Trefferwürfel W${entry.hitDie}`;
  }

  if ("stages" in entry) {
    return `${entry.stages.length} Wandlungsstufen`;
  }

  if ("level" in entry && "school" in entry) {
    return `${entry.level === 0 ? "Zaubertrick" : `Grad ${entry.level}`} · ${schoolLabels[entry.school] ?? entry.school}`;
  }

  if ("category" in entry) {
    if (entry.category === "weapon") {
      return formatDice(entry.damage);
    }

    if (entry.category === "armor" || entry.category === "shield") {
      return `RK ${entry.armorClass}`;
    }

    return `${entry.weight} lb · ${formatPrice(entry.price)}`;
  }

  if ("speed" in entry) {
    return `${entry.size === "small" ? "Klein" : "Mittel"} · ${entry.speed} m`;
  }

  return "Compendium-Eintrag";
}

export function CompendiumPage() {
  const [category, setCategory] = useState<CompendiumCategoryId>("overview");
  const [query, setQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<CompendiumEntry | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [notice, setNotice] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { characters, updateCharacter } = useCharacterContext();
  const { favorites, favoriteCount, toggleFavorite } = useCompendiumFavorites();
  const history = useCompendiumHistory();
  const compare = useCompendiumCompare();

  const categories: CategoryDefinition[] = [
    {
      id: "ancestries",
      title: "Abstammungen",
      subtitle: "Herkunft, Merkmale und Varianten.",
      symbol: "◈",
      count: ancestries.length,
    },
    {
      id: "classes",
      title: "Klassen",
      subtitle: "Pfade, Merkmale und Ressourcen.",
      symbol: "⚔",
      count: classes.length,
    },
    {
      id: "transformations",
      title: "Verwandlungen",
      subtitle: "Gaben, Makel und Entwicklungsstufen.",
      symbol: "☾",
      count: transformations.length,
    },
    {
      id: "weapons",
      title: "Waffen",
      subtitle: "Schaden, Reichweite und Eigenschaften.",
      symbol: "†",
      count: weapons.length,
    },
    {
      id: "armor",
      title: "Rüstungen",
      subtitle: "Rüstungsklasse und Einschränkungen.",
      symbol: "⬟",
      count: armor.length,
    },
    {
      id: "gear",
      title: "Ausrüstung",
      subtitle: "Werkzeuge, Verbrauchsgüter und Reisebedarf.",
      symbol: "⌘",
      count: gear.length,
    },
    {
      id: "spells",
      title: "Zauber",
      subtitle: "Magieschulen, Komponenten und Wirkung.",
      symbol: "✦",
      count: spells.length,
    },
  ];

  const entries = useMemo<CompendiumEntry[]>(() => {
    const source: CompendiumEntry[] =
      category === "overview" ? equipment : entriesByCategory[category];

    const normalizedQuery = normalize(query);

    return source
      .filter((entry) => !showFavoritesOnly || favorites.has(entry.id))
      .filter((entry) => matchesSearch(entry, normalizedQuery))
      .sort((left, right) => left.name.localeCompare(right.name, "de"));
  }, [category, query, favorites, showFavoritesOnly]);

  const favoriteEntries = useMemo(
    () => allEntries.filter((entry) => favorites.has(entry.id)).slice(0, 8),
    [favorites],
  );

  const recentEntries = useMemo(
    () => history.historyIds
      .map((id) => entryById.get(id))
      .filter((entry): entry is CompendiumEntry => Boolean(entry))
      .slice(0, 8),
    [history.historyIds],
  );

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (event.key !== "/" || category === "overview") return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      searchInputRef.current?.focus();
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [category]);

  function openEntry(entry: CompendiumEntry) {
    const nextCategory = getEntryCategory(entry);
    setCategory(nextCategory);
    setQuery("");
    setShowFavoritesOnly(false);
    setSelectedEntry(entry);
    history.record(entry.id);
    compare.clear();
  }

  async function copyEntry(entry: CompendiumEntry) {
    try {
      await navigator.clipboard.writeText(formatCompendiumEntryText(entry));
      setNotice(`${entry.name} wurde als Statblock kopiert.`);
    } catch {
      setNotice("Der Statblock konnte nicht kopiert werden.");
    }
    window.setTimeout(() => setNotice(""), 3200);
  }

  function openCategory(nextCategory: CompendiumCategoryId) {
    setCategory(nextCategory);
    setQuery("");
    setSelectedEntry(null);
    setShowFavoritesOnly(false);
    compare.clear();
  }

  function addEquipmentToCharacter(entry: EquipmentDefinition, characterId: string) {
    const character = characters.find((candidate) => candidate.id === characterId);
    if (!character) return;

    const inventory = getCharacterInventory(character);
    const inventoryId = `compendium-${entry.id}`;
    const existingItem = inventory.items.find((item) => item.id === inventoryId);
    const categoryMap: Record<EquipmentDefinition["category"], InventoryItemCategory> = {
      weapon: "weapon",
      armor: "armor",
      shield: "armor",
      gear: "adventuring-gear",
      tool: "tool",
      consumable: "consumable",
      focus: "adventuring-gear",
      ammunition: "consumable",
    };
    const now = new Date().toISOString();

    const nextItems = existingItem
      ? inventory.items.map((item) =>
          item.id === inventoryId
            ? { ...item, quantity: item.quantity + 1, updatedAt: now }
            : item,
        )
      : [
          ...inventory.items,
          {
            id: inventoryId,
            name: entry.name,
            category: categoryMap[entry.category],
            quantity: 1,
            weight: entry.weight,
            equipped: false,
            notes: entry.description ?? "Aus dem GrimForge Compendium übernommen.",
            createdAt: now,
            updatedAt: now,
          },
        ];

    updateCharacter({
      ...character,
      inventory: { ...inventory, items: nextItems },
      updatedAt: now,
    });
    setNotice(`${entry.name} wurde ${character.name} hinzugefügt.`);
    window.setTimeout(() => setNotice(""), 3200);
  }

  return (
    <PaperPage>
      <div className="compendium-page">
        <ChapterHeader
          chapter="Kapitel V · Das Nachschlagewerk"
          title="Compendium"
          subtitle="Abstammungen, Klassen, Verwandlungen, Ausrüstung und Zauber aus einer gemeinsamen Quelle."
        />

        {category === "overview" ? (
          <>
            <ArtworkHero
              category="equipment"
              entryId="compendium"
              title="GrimForge Compendium"
              subtitle="Wissen bewahren. Regeln finden. Entscheidungen verstehen."
              eyebrow="Das Nachschlagewerk"
              description="Eine zentrale Bibliothek für alle Charakteroptionen"
              className="compendium-hero"
            />

            <section className="compendium-category-grid" aria-label="Compendium-Kategorien">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="compendium-category-card"
                  onClick={() => openCategory(item.id)}
                >
                  <span className="compendium-category-card__symbol" aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span className="compendium-category-card__count">{item.count} Einträge</span>
                  <strong>{item.title}</strong>
                  <p>{item.subtitle}</p>
                  <span className="compendium-category-card__action">Codex öffnen →</span>
                </button>
              ))}
            </section>

            {favoriteEntries.length ? (
              <CompendiumShelf
                title="Deine Favoriten"
                subtitle="Schneller Zugriff auf markierte Einträge."
                entries={favoriteEntries}
                onOpen={openEntry}
              />
            ) : null}

            {recentEntries.length ? (
              <CompendiumShelf
                title="Zuletzt geöffnet"
                subtitle="Die jüngsten Akten aus deinem Codex."
                entries={recentEntries}
                onOpen={openEntry}
                action={<button type="button" className="compendium-shelf__clear" onClick={history.clear}>Verlauf leeren</button>}
              />
            ) : null}
          </>
        ) : (
          <>
            <div className="compendium-toolbar">
              <button
                type="button"
                className="compendium-back"
                onClick={() => openCategory("overview")}
              >
                ← Übersicht
              </button>

              <label className="compendium-search">
                <span>Suche</span>
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`${categoryLabels[category]} durchsuchen ...`}
                />
                <small>Drücke / für die Schnellsuche</small>
              </label>

              <button
                type="button"
                className={`compendium-favorites-toggle ${showFavoritesOnly ? "is-active" : ""}`}
                onClick={() => setShowFavoritesOnly((current) => !current)}
                aria-pressed={showFavoritesOnly}
              >
                ★ Favoriten ({favoriteCount})
              </button>

              <span className="compendium-result-count">
                {entries.length} Treffer
              </span>
            </div>

            <div className={`compendium-browser ${selectedEntry ? "compendium-browser--detail" : ""}`}>
              <section className="compendium-entry-grid" aria-label={categoryLabels[category]}>
                {entries.map((entry) => (
                  <article key={entry.id} className="compendium-entry-card">
                    <button
                      type="button"
                      className={`compendium-entry-card__favorite ${favorites.has(entry.id) ? "is-active" : ""}`}
                      onClick={() => toggleFavorite(entry.id)}
                      aria-label={favorites.has(entry.id) ? `${entry.name} aus Favoriten entfernen` : `${entry.name} favorisieren`}
                      title={favorites.has(entry.id) ? "Favorit entfernen" : "Als Favorit markieren"}
                    >
                      {favorites.has(entry.id) ? "★" : "☆"}
                    </button>
                    <button
                      type="button"
                      className={`compendium-entry-card__compare ${compare.ids.has(entry.id) ? "is-active" : ""}`}
                      onClick={() => compare.toggle(entry)}
                      aria-pressed={compare.ids.has(entry.id)}
                      title={compare.ids.has(entry.id) ? "Aus Vergleich entfernen" : "Zum Vergleich hinzufügen"}
                    >
                      ⇄
                    </button>
                    <button
                      type="button"
                      className="compendium-entry-card__open"
                      onClick={() => openEntry(entry)}
                    >
                      <span className="compendium-entry-card__meta">{getEntryMeta(entry)}</span>
                      <strong>{entry.name}</strong>
                      <p>{entry.description || "Keine Beschreibung hinterlegt."}</p>
                      <span className="compendium-entry-card__action">Statblock öffnen</span>
                    </button>
                  </article>
                ))}

                {entries.length === 0 ? (
                  <div className="compendium-empty">
                    <strong>Kein Eintrag gefunden</strong>
                    <p>Versuche einen allgemeineren Suchbegriff.</p>
                  </div>
                ) : null}
              </section>

              {selectedEntry ? (
                <EntryDetail
                  entry={selectedEntry}
                  onClose={() => setSelectedEntry(null)}
                  isFavorite={favorites.has(selectedEntry.id)}
                  onToggleFavorite={() => toggleFavorite(selectedEntry.id)}
                  characters={characters}
                  onAddEquipment={addEquipmentToCharacter}
                  onPrint={() => window.print()}
                  onCopy={() => copyEntry(selectedEntry)}
                />
              ) : null}
            </div>
            <CompendiumCompareBar
              entries={compare.entries}
              maximumEntries={compare.maximumEntries}
              onOpen={compare.open}
              onRemove={compare.remove}
              onClear={compare.clear}
            />
            {compare.isOpen ? (
              <CompendiumCompareDialog entries={compare.entries} onClose={compare.close} />
            ) : null}
            {selectedEntry ? <CompendiumPrintView entry={selectedEntry} /> : null}
            {notice ? <div className="compendium-toast" role="status">{notice}</div> : null}
          </>
        )}
      </div>
    </PaperPage>
  );
}

function CompendiumShelf({
  title,
  subtitle,
  entries,
  onOpen,
  action,
}: {
  title: string;
  subtitle: string;
  entries: CompendiumEntry[];
  onOpen: (entry: CompendiumEntry) => void;
  action?: ReactNode;
}) {
  return (
    <section className="compendium-shelf">
      <div className="compendium-shelf__header">
        <div>
          <span>Persönlicher Codex</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {action}
      </div>
      <div className="compendium-shelf__grid">
        {entries.map((entry) => (
          <button key={entry.id} type="button" onClick={() => onOpen(entry)}>
            <span>{categoryLabels[getEntryCategory(entry)]}</span>
            <strong>{entry.name}</strong>
            <small>{getEntryMeta(entry)}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function EntryDetail({
  entry,
  onClose,
  isFavorite,
  onToggleFavorite,
  characters,
  onAddEquipment,
  onPrint,
  onCopy,
}: {
  entry: CompendiumEntry;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  characters: CharacterArchiveEntry[];
  onAddEquipment: (entry: EquipmentDefinition, characterId: string) => void;
  onPrint: () => void;
  onCopy: () => void;
}) {
  const common = { isFavorite, onToggleFavorite, onPrint, onCopy };

  if ("hitDie" in entry) {
    return <ClassDetail entry={entry} onClose={onClose} {...common} />;
  }
  if ("stages" in entry) {
    return <TransformationDetail entry={entry} onClose={onClose} {...common} />;
  }
  if ("level" in entry && "school" in entry) {
    return <SpellDetail entry={entry} onClose={onClose} {...common} />;
  }
  if ("category" in entry) {
    return (
      <EquipmentDetail
        entry={entry}
        onClose={onClose}
        characters={characters}
        onAddEquipment={onAddEquipment}
        {...common}
      />
    );
  }
  return <AncestryDetail entry={entry} onClose={onClose} {...common} />;
}

interface DetailFavoriteProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPrint: () => void;
  onCopy: () => void;
}

function DetailActions({ isFavorite, onToggleFavorite, onPrint, onCopy }: DetailFavoriteProps) {
  return (
    <>
      <button type="button" className={`compendium-action-button ${isFavorite ? "is-active" : ""}`} onClick={onToggleFavorite}>
        {isFavorite ? "★ Favorit" : "☆ Favorisieren"}
      </button>
      {onCopy ? (
        <button type="button" className="compendium-action-button" onClick={onCopy}>
          ⧉ Statblock kopieren
        </button>
      ) : null}
      <button type="button" className="compendium-action-button" onClick={onPrint}>
        ⎙ Statblock drucken
      </button>
    </>
  );
}

function AncestryDetail({ entry, onClose, isFavorite, onToggleFavorite, onPrint, onCopy }: { entry: CharacterAncestry; onClose: () => void } & DetailFavoriteProps) {
  return (
    <CompendiumDetailPanel eyebrow="Abstammungsakte" title={entry.name} description={entry.description} actions={<DetailActions isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} onPrint={onPrint} onCopy={onCopy} />} onClose={onClose}>
      <div className="compendium-stat-grid">
        <CompendiumStat label="Größe" value={entry.size === "small" ? "Klein" : "Mittel"} />
        <CompendiumStat label="Bewegung" value={`${entry.speed} m`} />
        <CompendiumStat label="Dunkelsicht" value={entry.darkvision ? `${entry.darkvision} m` : "—"} />
        <CompendiumStat label="Varianten" value={entry.variants.length} />
      </div>
      <DetailList title="Standardmerkmale" items={entry.traits} />
      <DetailList title="Sprachen" items={entry.languages.length ? entry.languages : ["Durch Herkunft oder Hintergrund festgelegt"]} />
    </CompendiumDetailPanel>
  );
}

function ClassDetail({ entry, onClose, isFavorite, onToggleFavorite, onPrint, onCopy }: { entry: CharacterClass; onClose: () => void } & DetailFavoriteProps) {
  return (
    <CompendiumDetailPanel eyebrow="Klassenakte" title={entry.name} description={entry.description} actions={<DetailActions isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} onPrint={onPrint} onCopy={onCopy} />} onClose={onClose}>
      <div className="compendium-stat-grid">
        <CompendiumStat label="Trefferwürfel" value={`W${entry.hitDie}`} />
        <CompendiumStat label="Zauberwirken" value={entry.spellcasting ? "Ja" : "Nein"} />
        <CompendiumStat label="Unterklassen" value={entry.subclasses.length} />
        <CompendiumStat label="Merkmale" value={entry.features?.length ?? 0} />
      </div>
      <DetailList title="Primärattribute" items={entry.primaryAbilities} />
      <DetailList title="Rettungswürfe" items={entry.savingThrows} />
      <DetailList title="Rüstungsübung" items={entry.armorProficiencies} />
      <DetailList title="Waffenübung" items={entry.weaponProficiencies} />
      <DetailFeatureList title="Merkmale" items={entry.features ?? []} />
    </CompendiumDetailPanel>
  );
}

function TransformationDetail({ entry, onClose, isFavorite, onToggleFavorite, onPrint, onCopy }: { entry: TransformationDefinition; onClose: () => void } & DetailFavoriteProps) {
  return (
    <CompendiumDetailPanel eyebrow="Wandlungsakte" title={entry.name} description={entry.description} actions={<DetailActions isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} onPrint={onPrint} onCopy={onCopy} />} onClose={onClose}>
      <div className="compendium-lore-block">
        <span>Thema</span>
        <p>{entry.theme}</p>
      </div>
      <div className="compendium-lore-block">
        <span>Ursprung</span>
        <p>{entry.origin}</p>
      </div>
      <div className="compendium-stage-list">
        {entry.stages.map((stage) => (
          <article key={stage.stage}>
            <span>Stufe {stage.stage}</span>
            <strong>{stage.title}</strong>
            <p>{stage.description}</p>
            <small>
              {(stage.automaticFeatures?.length ?? 0) + (stage.boons?.length ?? 0)} Gaben · {stage.flaws?.length ?? 0} Makel
            </small>
          </article>
        ))}
      </div>
    </CompendiumDetailPanel>
  );
}

function EquipmentDetail({
  entry,
  onClose,
  isFavorite,
  onToggleFavorite,
  onPrint,
  onCopy,
  characters,
  onAddEquipment,
}: {
  entry: EquipmentDefinition;
  onClose: () => void;
  characters: CharacterArchiveEntry[];
  onAddEquipment: (entry: EquipmentDefinition, characterId: string) => void;
} & DetailFavoriteProps) {
  const [characterId, setCharacterId] = useState(characters[0]?.id ?? "");
  const isWeapon = entry.category === "weapon";
  const isArmor = entry.category === "armor" || entry.category === "shield";

  return (
    <CompendiumDetailPanel
      eyebrow="Ausrüstungsakte"
      title={entry.name}
      description={entry.description}
      onClose={onClose}
      actions={
        <>
          <DetailActions isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} onPrint={onPrint} onCopy={onCopy} />
          {characters.length ? (
            <div className="compendium-inventory-action">
              <select value={characterId} onChange={(event) => setCharacterId(event.target.value)} aria-label="Zielcharakter">
                {characters.map((character) => <option key={character.id} value={character.id}>{character.name}</option>)}
              </select>
              <button type="button" className="compendium-action-button compendium-action-button--primary" onClick={() => onAddEquipment(entry, characterId)} disabled={!characterId}>
                + Ins Inventar
              </button>
            </div>
          ) : (
            <small className="compendium-action-hint">Erstelle zuerst einen Charakter, um Gegenstände zu übernehmen.</small>
          )}
        </>
      }
    >
      <ArtworkHero category="equipment" entryId={entry.id} title={entry.name} eyebrow="Gegenstandsillustration" subtitle={getEntryMeta(entry)} compact />
      <div className="compendium-stat-grid">
        <CompendiumStat label="Kategorie" value={entry.category} />
        <CompendiumStat label="Gewicht" value={`${entry.weight} lb`} />
        <CompendiumStat label="Preis" value={formatPrice(entry.price)} />
        {isWeapon ? <CompendiumStat label="Schaden" value={formatDice(entry.damage)} /> : null}
        {isArmor ? <CompendiumStat label="Rüstungsklasse" value={entry.armorClass} /> : null}
      </div>

      {isWeapon ? (
        <>
          <DetailList title="Eigenschaften" items={entry.properties.length ? entry.properties.map((property) => propertyLabels[property] ?? property) : ["Keine besonderen Eigenschaften"]} />
          {entry.range ? <DetailList title="Reichweite" items={[entry.range.long ? `${entry.range.normal}/${entry.range.long} ft` : `${entry.range.normal} ft`]} /> : null}
          {entry.versatile ? <DetailList title="Vielseitiger Schaden" items={[formatDice(entry.versatile)]} /> : null}
        </>
      ) : null}

      {isArmor ? (
        <DetailList title="Rüstungsregeln" items={[
          entry.dexterityModifier ? `Geschicklichkeitsbonus${entry.maximumDexterityBonus !== undefined ? ` (max. +${entry.maximumDexterityBonus})` : ""}` : "Kein Geschicklichkeitsbonus",
          entry.strengthRequirement ? `Stärke ${entry.strengthRequirement} erforderlich` : "Keine Mindeststärke",
          entry.stealthDisadvantage ? "Nachteil auf Heimlichkeit" : "Kein Heimlichkeitsnachteil",
        ]} />
      ) : null}
    </CompendiumDetailPanel>
  );
}

function SpellDetail({ entry, onClose, isFavorite, onToggleFavorite, onPrint, onCopy }: { entry: SpellDefinition; onClose: () => void } & DetailFavoriteProps) {
  const components = [
    entry.components.verbal ? "V" : null,
    entry.components.somatic ? "G" : null,
    entry.components.material ? `M${typeof entry.components.material === "string" ? ` (${entry.components.material})` : ""}` : null,
  ].filter(Boolean) as string[];

  return (
    <CompendiumDetailPanel eyebrow="Zauberakte" title={entry.name} description={entry.description} actions={<DetailActions isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} onPrint={onPrint} onCopy={onCopy} />} onClose={onClose}>
      <ArtworkHero category="spell" entryId={entry.id} title={entry.name} eyebrow="Arkanes Siegel" subtitle={getEntryMeta(entry)} compact />
      <div className="compendium-stat-grid">
        <CompendiumStat label="Grad" value={entry.level === 0 ? "Zaubertrick" : entry.level} />
        <CompendiumStat label="Schule" value={schoolLabels[entry.school] ?? entry.school} />
        <CompendiumStat label="Wirkzeit" value={entry.castingTime} />
        <CompendiumStat label="Reichweite" value={entry.range} />
        <CompendiumStat label="Dauer" value={entry.duration} />
        <CompendiumStat label="Komponenten" value={components.join(", ") || "—"} />
      </div>
      <DetailList title="Besonderheiten" items={[entry.concentration ? "Konzentration" : "Keine Konzentration", entry.ritual ? "Ritual" : "Kein Ritual"]} />
      <DetailList title="Klassen" items={entry.classIds} />
    </CompendiumDetailPanel>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="compendium-detail-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function DetailFeatureList({ title, items }: { title: string; items: Array<{ id: string; name: string; description: string; level: number }> }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="compendium-detail-section">
      <h3>{title}</h3>
      <div className="compendium-feature-list">
        {items.map((item) => (
          <article key={item.id}>
            <span>Stufe {item.level}</span>
            <strong>{item.name}</strong>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
