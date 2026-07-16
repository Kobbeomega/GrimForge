import { useRef, useState, type ChangeEvent } from "react";

import { ChapterHeader } from "../components/ui/ChapterHeader";
import { GrimButton } from "../components/ui/GrimButton";
import { PaperPage } from "../components/ui/PaperPage";
import { useCharacters } from "../hooks/useCharacters";
import {
  exportCharacterArchive,
  mergeCharacterArchives,
  readCharacterArchiveFile,
} from "../modules/archives/io/characterArchiveIO";

export function ArchiveManagementPage() {
  const { characters, replaceCharacters, resetCharacters } = useCharacters();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState(false);

  function handleExport() {
    if (characters.length === 0) {
      setIsError(true);
      setMessage("Es gibt noch keine Charakterakten zum Exportieren.");
      return;
    }

    exportCharacterArchive(characters);
    setIsError(false);
    setMessage(`${characters.length} Akte${characters.length === 1 ? "" : "n"} wurden exportiert.`);
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const result = await readCharacterArchiveFile(file);
      const replace = window.confirm(
        "OK ersetzt das aktuelle Archiv vollständig. Abbrechen führt die importierten Akten mit dem bestehenden Archiv zusammen.",
      );
      const nextCharacters = replace
        ? result.characters
        : mergeCharacterArchives(characters, result.characters);

      replaceCharacters(nextCharacters);
      setIsError(false);
      setMessage(
        `${result.characters.length} Akte${result.characters.length === 1 ? "" : "n"} importiert.` +
          (result.warnings.length > 0 ? ` ${result.warnings.join(" ")}` : ""),
      );
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Der Import ist fehlgeschlagen.");
    }
  }

  function handleReset() {
    if (!characters.length) return;
    const confirmed = window.confirm(
      "Soll das gesamte lokale Archiv wirklich gelöscht werden? Exportiere vorher eine Sicherung.",
    );
    if (!confirmed) return;
    resetCharacters();
    setIsError(false);
    setMessage("Das lokale Archiv wurde geleert.");
  }

  return (
    <PaperPage>
      <ChapterHeader
        chapter="Kapitel IV · Das Archiv"
        title="Sicherung & Übertragung"
        subtitle="Exportiere, importiere und verwalte deine lokalen Charakterdaten."
      />

      <div className="intro-copy">
        <p>
          GrimForge speichert deine Akten lokal im Browser. Eine JSON-Sicherung lässt sich aufbewahren,
          auf ein anderes Gerät übertragen und später wieder einlesen.
        </p>
      </div>

      <section className="archive-management-grid">
        <article className="archive-management-card">
          <p className="archive-management-card__eyebrow">Sicherung</p>
          <h2>Gesamtes Archiv exportieren</h2>
          <p>Erstellt eine versionierte GrimForge-Datei mit allen {characters.length} gespeicherten Akten.</p>
          <GrimButton type="button" onClick={handleExport}>Sicherung exportieren</GrimButton>
        </article>

        <article className="archive-management-card">
          <p className="archive-management-card__eyebrow">Wiederherstellung</p>
          <h2>Archiv importieren</h2>
          <p>Importierte Akten können bestehende Daten ersetzen oder anhand ihrer ID zusammengeführt werden.</p>
          <GrimButton type="button" onClick={() => fileInputRef.current?.click()}>Daten importieren</GrimButton>
          <input
            ref={fileInputRef}
            className="visually-hidden"
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
          />
        </article>

        <article className="archive-management-card archive-management-card--danger">
          <p className="archive-management-card__eyebrow">Gefahrenzone</p>
          <h2>Lokales Archiv leeren</h2>
          <p>Entfernt alle Charakterakten aus diesem Browser. Dieser Schritt kann nicht rückgängig gemacht werden.</p>
          <GrimButton type="button" onClick={handleReset} disabled={!characters.length}>Archiv leeren</GrimButton>
        </article>
      </section>

      {message && (
        <p className={`archive-management-message${isError ? " archive-management-message--error" : ""}`} role="status">
          {message}
        </p>
      )}
    </PaperPage>
  );
}
