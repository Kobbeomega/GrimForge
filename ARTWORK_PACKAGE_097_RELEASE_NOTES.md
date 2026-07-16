# GrimForge 0.9.7 – Artwork Package

## Inhalt

- 39 eigenständige, lokal ausgelieferte Dark-Fantasy-SVG-Artworks
- individuelle Banner für 15 Abstammungen
- individuelle Banner für 12 Klassen
- individuelle Banner für 7 Verwandlungen
- generische Fallback-Banner für Abstammungen, Klassen, Verwandlungen, Ausrüstung und Zauber
- automatische Verknüpfung über die zentrale Artwork-Registry
- keine externen Bild-URLs, Tracking-Dienste oder Laufzeit-Abhängigkeiten
- skalierbare SVG-Dateien mit sehr kleiner Dateigröße

## Eigene Bilder ersetzen

Die Assets liegen unter `public/artwork/`. Ein Bild kann direkt ersetzt werden, solange Dateiname und Pfad gleich bleiben.

Alternativ kann in `src/artwork/registry.ts` für einen Eintrag ein eigener Pfad gesetzt werden:

```ts
elf: {
  symbol: "☾",
  tone: "azure",
  image: "/artwork/ancestries/elf.webp",
  focalPosition: "center 30%",
},
```

## Hinweise

Die Bilder sind bewusst textfrei, damit dieselben Assets im Creator, Codex und Charakterbogen funktionieren. Unbekannte oder später ergänzte Einträge erhalten automatisch ein Kategorie-Fallback.
