# GrimForge 0.9.2 – Visual Identity · Paket A

## Neu

- Zentrale Artwork-Registry für Abstammungen, Klassen, Transformationen, Ausrüstung und Zauber.
- Wiederverwendbare `ArtworkHero`-Komponente mit sechs visuellen Farbstimmungen.
- Atmosphärische Hero-Banner für die gewählte Abstammung.
- Klassen-Dossiers besitzen jetzt eigene visuelle Banner, Sigillen und Trefferwürfel-Badges.
- Transformations-Dossiers verwenden ein großes Wandlungsbanner mit Stufenanzeige.
- Automatische, stilistisch passende Platzhalter, solange noch kein individuelles Bild hinterlegt ist.
- Bilder können später zentral über `src/artwork/registry.ts` ergänzt oder ausgetauscht werden.
- Responsive Darstellung für Desktop, Tablet und Mobile.

## Artwork ergänzen

In `src/artwork/registry.ts` kann ein Eintrag optional um `image` und `focalPosition` ergänzt werden:

```ts
elf: {
  symbol: "☾",
  tone: "azure",
  image: "/artwork/ancestries/elf.webp",
  focalPosition: "center 30%",
},
```

Die zugehörige Komponente übernimmt Bild, Verlauf, Kontrast und Fallback automatisch.
