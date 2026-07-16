import { useMemo, useState } from "react";

import type {
  CharacterJournal,
  CharacterJournalFaction,
  CharacterJournalGoal,
  CharacterJournalRelationship,
  CharacterSessionNote,
} from "../../archives/types";

interface CharacterJournalPanelProps {
  journal?: CharacterJournal;
  onChange: (journal: CharacterJournal) => void;
  savedAt?: string;
}

const emptyJournal: CharacterJournal = {
  background: "",
  motivations: "",
  personality: "",
  ideals: "",
  bonds: "",
  flaws: "",
  fears: "",
  secrets: "",
  goals: [],
  relationships: [],
  factions: [],
  sessionNotes: [],
};

type SessionSort = "newest" | "oldest";

function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function CharacterJournalPanel({
  journal,
  onChange,
  savedAt,
}: CharacterJournalPanelProps) {
  const [sessionSort, setSessionSort] = useState<SessionSort>("newest");
  const [collapsedSessions, setCollapsedSessions] = useState<Set<string>>(
    () => new Set(),
  );
  const [showEmptyFields, setShowEmptyFields] = useState(true);

  const value: CharacterJournal = {
    ...emptyJournal,
    ...journal,
    goals: journal?.goals ?? [],
    relationships: journal?.relationships ?? [],
    factions: journal?.factions ?? [],
    sessionNotes: journal?.sessionNotes ?? [],
  };

  const sortedSessionNotes = useMemo(() => {
    return [...value.sessionNotes].sort((left, right) => {
      const difference = Date.parse(right.date) - Date.parse(left.date);
      return sessionSort === "newest" ? difference : -difference;
    });
  }, [sessionSort, value.sessionNotes]);

  const visibleNarrativeFields = [
    { key: "background", label: "Hintergrund", placeholder: "Herkunft, prägende Erlebnisse und wichtige Wendepunkte …", wide: true },
    { key: "motivations", label: "Motivationen", placeholder: "Was treibt diesen Charakter an?" },
    { key: "personality", label: "Persönlichkeit", placeholder: "Auftreten, Gewohnheiten und Eigenheiten …" },
    { key: "ideals", label: "Ideale", placeholder: "Wofür steht die Figur ein?" },
    { key: "bonds", label: "Bindungen", placeholder: "Menschen, Orte oder Schwüre, die nicht loslassen …" },
    { key: "flaws", label: "Makel", placeholder: "Schwächen, Versuchungen und blinde Flecken …" },
    { key: "fears", label: "Ängste", placeholder: "Wovor fürchtet sich die Figur wirklich?" },
    { key: "secrets", label: "Geheimnisse", placeholder: "Was darf niemand erfahren?" },
  ] as const;

  function patch(changes: Partial<CharacterJournal>) {
    onChange({ ...value, ...changes });
  }

  function addGoal() {
    const goal: CharacterJournalGoal = {
      id: createId("goal"),
      title: "Neues Ziel",
      details: "",
      status: "active",
    };
    patch({ goals: [...value.goals, goal] });
  }

  function addRelationship() {
    const relationship: CharacterJournalRelationship = {
      id: createId("relationship"),
      name: "Neue Beziehung",
      type: "Kontakt",
      notes: "",
    };
    patch({ relationships: [...value.relationships, relationship] });
  }

  function addFaction() {
    const faction: CharacterJournalFaction = {
      id: createId("faction"),
      name: "Neue Fraktion",
      rank: "",
      standing: "Neutral",
      notes: "",
    };
    patch({ factions: [...value.factions, faction] });
  }

  function addSessionNote() {
    const note: CharacterSessionNote = {
      id: createId("session"),
      title: `Sitzung ${value.sessionNotes.length + 1}`,
      date: new Date().toISOString().slice(0, 10),
      notes: "",
    };
    patch({ sessionNotes: [note, ...value.sessionNotes] });
  }

  function toggleSession(id: string) {
    setCollapsedSessions((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section className="character-journal">
      <header className="character-journal__hero">
        <div>
          <p className="character-journal__eyebrow">Persönliche Aufzeichnungen</p>
          <h2>Charakterjournal</h2>
          <p>Geschichte, Antriebe und Erinnerungen bleiben direkt bei dieser Akte.</p>
        </div>
        <div className="character-journal__save-state" aria-live="polite">
          <span aria-hidden="true">✓</span>
          <strong>Automatisch gespeichert</strong>
          <small>{savedAt ? formatSavedAt(savedAt) : "lokal in dieser Akte"}</small>
        </div>
      </header>

      <div className="character-journal__toolbar">
        <button type="button" onClick={() => setShowEmptyFields((value) => !value)}>
          {showEmptyFields ? "Leere Felder ausblenden" : "Alle Felder anzeigen"}
        </button>
        <span>{value.goals.length} Ziele · {value.relationships.length} Beziehungen · {value.sessionNotes.length} Sitzungen</span>
      </div>

      <div className="character-journal__text-grid">
        {visibleNarrativeFields.map((field) => {
          const fieldValue = value[field.key];
          if (!showEmptyFields && fieldValue.trim().length === 0) return null;
          return (
            <JournalTextArea
              key={field.key}
              label={field.label}
              value={fieldValue}
              placeholder={field.placeholder}
              wide={"wide" in field && field.wide}
              onChange={(nextValue) => patch({ [field.key]: nextValue })}
            />
          );
        })}
      </div>

      <JournalCollection title="Ziele" subtitle="Aktive, vollendete oder aufgegebene Vorhaben." buttonLabel="Ziel hinzufügen" onAdd={addGoal}>
        {value.goals.length === 0 ? <JournalEmpty text="Noch keine Ziele festgehalten." /> : (
          <div className="character-journal__cards">
            {value.goals.map((goal) => (
              <article key={goal.id} className={`journal-record journal-record--goal journal-record--${goal.status}`}>
                <input aria-label="Ziel" value={goal.title} onChange={(event) => patch({ goals: value.goals.map((entry) => entry.id === goal.id ? { ...entry, title: event.target.value } : entry) })} />
                <select aria-label="Zielstatus" value={goal.status} onChange={(event) => patch({ goals: value.goals.map((entry) => entry.id === goal.id ? { ...entry, status: event.target.value as CharacterJournalGoal["status"] } : entry) })}>
                  <option value="active">Aktiv</option>
                  <option value="completed">Erfüllt</option>
                  <option value="abandoned">Aufgegeben</option>
                </select>
                <textarea aria-label="Zieldetails" value={goal.details} placeholder="Warum ist dieses Ziel wichtig?" onChange={(event) => patch({ goals: value.goals.map((entry) => entry.id === goal.id ? { ...entry, details: event.target.value } : entry) })} />
                <DeleteButton onClick={() => patch({ goals: value.goals.filter((entry) => entry.id !== goal.id) })} />
              </article>
            ))}
          </div>
        )}
      </JournalCollection>

      <JournalCollection title="Beziehungen" subtitle="Wichtige Personen, Kreaturen und persönliche Verbindungen." buttonLabel="Beziehung hinzufügen" onAdd={addRelationship}>
        {value.relationships.length === 0 ? <JournalEmpty text="Noch keine Beziehungen eingetragen." /> : (
          <div className="character-journal__cards">
            {value.relationships.map((relationship) => (
              <article key={relationship.id} className="journal-record">
                <input aria-label="Name" value={relationship.name} onChange={(event) => patch({ relationships: value.relationships.map((entry) => entry.id === relationship.id ? { ...entry, name: event.target.value } : entry) })} />
                <input aria-label="Beziehungstyp" value={relationship.type} placeholder="Mentor, Familie, Rivale …" onChange={(event) => patch({ relationships: value.relationships.map((entry) => entry.id === relationship.id ? { ...entry, type: event.target.value } : entry) })} />
                <textarea aria-label="Beziehungsnotizen" value={relationship.notes} placeholder="Was verbindet euch?" onChange={(event) => patch({ relationships: value.relationships.map((entry) => entry.id === relationship.id ? { ...entry, notes: event.target.value } : entry) })} />
                <DeleteButton onClick={() => patch({ relationships: value.relationships.filter((entry) => entry.id !== relationship.id) })} />
              </article>
            ))}
          </div>
        )}
      </JournalCollection>

      <JournalCollection title="Fraktionen" subtitle="Rang, Ansehen und persönliche Notizen zu Organisationen." buttonLabel="Fraktion hinzufügen" onAdd={addFaction}>
        {value.factions.length === 0 ? <JournalEmpty text="Noch keine Fraktionen eingetragen." /> : (
          <div className="character-journal__cards">
            {value.factions.map((faction) => (
              <article key={faction.id} className="journal-record journal-record--faction">
                <input aria-label="Fraktionsname" value={faction.name} onChange={(event) => patch({ factions: value.factions.map((entry) => entry.id === faction.id ? { ...entry, name: event.target.value } : entry) })} />
                <input aria-label="Rang" value={faction.rank} placeholder="Rang" onChange={(event) => patch({ factions: value.factions.map((entry) => entry.id === faction.id ? { ...entry, rank: event.target.value } : entry) })} />
                <input aria-label="Ansehen" value={faction.standing} placeholder="Ansehen" onChange={(event) => patch({ factions: value.factions.map((entry) => entry.id === faction.id ? { ...entry, standing: event.target.value } : entry) })} />
                <textarea aria-label="Fraktionsnotizen" value={faction.notes} placeholder="Verpflichtungen, Kontakte und offene Konflikte …" onChange={(event) => patch({ factions: value.factions.map((entry) => entry.id === faction.id ? { ...entry, notes: event.target.value } : entry) })} />
                <DeleteButton onClick={() => patch({ factions: value.factions.filter((entry) => entry.id !== faction.id) })} />
              </article>
            ))}
          </div>
        )}
      </JournalCollection>

      <JournalCollection title="Sitzungsnotizen" subtitle="Sortierbare und einklappbare Einträge pro Spielabend." buttonLabel="Neue Sitzung" onAdd={addSessionNote}>
        <div className="journal-session-controls">
          <label>
            Sortierung
            <select value={sessionSort} onChange={(event) => setSessionSort(event.target.value as SessionSort)}>
              <option value="newest">Neueste zuerst</option>
              <option value="oldest">Älteste zuerst</option>
            </select>
          </label>
          <button type="button" onClick={() => setCollapsedSessions(new Set(value.sessionNotes.map((note) => note.id)))}>Alle einklappen</button>
          <button type="button" onClick={() => setCollapsedSessions(new Set())}>Alle öffnen</button>
        </div>
        {value.sessionNotes.length === 0 ? <JournalEmpty text="Noch keine Sitzungsnotizen vorhanden." /> : (
          <div className="character-journal__sessions">
            {sortedSessionNotes.map((note) => {
              const collapsed = collapsedSessions.has(note.id);
              return (
                <article key={note.id} className={`journal-session${collapsed ? " journal-session--collapsed" : ""}`}>
                  <div className="journal-session__heading">
                    <button type="button" className="journal-session__toggle" onClick={() => toggleSession(note.id)} aria-expanded={!collapsed}>{collapsed ? "▸" : "▾"}</button>
                    <input aria-label="Sitzungstitel" value={note.title} onChange={(event) => patch({ sessionNotes: value.sessionNotes.map((entry) => entry.id === note.id ? { ...entry, title: event.target.value } : entry) })} />
                    <input type="date" aria-label="Sitzungsdatum" value={note.date} onChange={(event) => patch({ sessionNotes: value.sessionNotes.map((entry) => entry.id === note.id ? { ...entry, date: event.target.value } : entry) })} />
                  </div>
                  {!collapsed && (
                    <>
                      <textarea aria-label="Sitzungsnotizen" value={note.notes} placeholder="Ereignisse, Hinweise, Entscheidungen und offene Fragen …" onChange={(event) => patch({ sessionNotes: value.sessionNotes.map((entry) => entry.id === note.id ? { ...entry, notes: event.target.value } : entry) })} />
                      <DeleteButton onClick={() => patch({ sessionNotes: value.sessionNotes.filter((entry) => entry.id !== note.id) })} />
                    </>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </JournalCollection>
    </section>
  );
}

interface JournalTextAreaProps { label: string; value: string; placeholder: string; wide?: boolean; onChange: (value: string) => void; }
function JournalTextArea({ label, value, placeholder, wide = false, onChange }: JournalTextAreaProps) {
  return <label className={wide ? "journal-field journal-field--wide" : "journal-field"}><span>{label}</span><textarea value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

interface JournalCollectionProps { title: string; subtitle: string; buttonLabel: string; onAdd: () => void; children: React.ReactNode; }
function JournalCollection({ title, subtitle, buttonLabel, onAdd, children }: JournalCollectionProps) {
  return <section className="journal-collection"><header><div><h3>{title}</h3><p>{subtitle}</p></div><button type="button" onClick={onAdd}>{buttonLabel}</button></header>{children}</section>;
}
function JournalEmpty({ text }: { text: string }) { return <p className="journal-empty">{text}</p>; }
function DeleteButton({ onClick }: { onClick: () => void }) { return <button type="button" className="journal-delete" onClick={onClick} aria-label="Eintrag löschen">Entfernen</button>; }
function formatSavedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "lokal in dieser Akte";
  return `zuletzt ${date.toLocaleDateString("de-DE")} · ${date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}`;
}
