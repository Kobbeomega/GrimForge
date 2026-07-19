# GrimForge 1.0.0 RC2 – Polish & Release Hardening

## UI & Accessibility
- Tastaturzugänglicher Sprunglink zum Hauptinhalt.
- Einheitliche sichtbare Fokusmarkierungen.
- Respektiert `prefers-reduced-motion`.
- Globaler Error Boundary mit sicherer Wiederherstellung ohne Verlust lokaler Charakterdaten.
- Konsistenter Ladezustand für nachgeladene Charakteransichten.

## Mobile
- Compendium-Werkzeugleiste wird auf kleinen Displays einspaltig.
- Detailansichten öffnen mobil als gut erreichbares Overlay oberhalb der Bottom-Navigation.
- Filterstatus und leere Suchergebnisse lassen sich direkt zurücksetzen.

## Compendium
- Verbesserte Suchrückmeldung mit `aria-live`.
- Direkte Reset-Aktionen für Suche und Favoritenfilter.
- Aussagekräftiger Leerzustand.

## Performance
- Charakterarchiv, Creator und Character Sheet werden innerhalb des Charakterbereichs separat nachgeladen.
- Bestehendes Route-Splitting aus RC1 bleibt erhalten.

## Release QA
- Neue Skripte `npm run typecheck` und `npm run check:release`.
- Version auf `1.0.0-rc.2` angehoben.
