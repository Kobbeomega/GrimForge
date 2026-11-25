# GrimForge — Visual Design v2 (RC2)

Das bisherige braunlastige und überladene Design wurde für RC2 korrigiert.
Die neue Farbpalette liegt in `src/styles/theme.css` und `src/theme/theme.ts`.

- Zurückhaltendes Anthrazit statt flächigem Braun
- Warme, aber sparsame Messingakzente
- Genau eine helle Pergamentfläche für Trefferpunkte; andere Werte neutral dunkel
- Klare Schrift-Hierarchie, gut lesbare Zauberinformationen
- Kein digitaler Würfelgenerator und keine Würfelergebnisleisten

`src/styles/readability.css` wird nun tatsächlich importiert.
`src/styles/visual-refinement.css` enthält die visuelle Nachbearbeitung.
Die bestehenden Print-CSS-Dateien wurden nicht geändert.

**Bitte zuerst `RELEASE_NOTES_1.2.0_RC2.md` lesen.**
