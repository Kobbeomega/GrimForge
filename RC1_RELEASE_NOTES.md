# GrimForge 1.0.0 RC1

## Audit & Stabilisierung

- Zentraler RC1-Projekt-Health-Check für Content, Regeln und Migration.
- Sichtbares Entwickler-Dashboard im Archivbereich.
- Content-Audit um Hintergründe, leere Beschreibungen und unvollständige Merkmale erweitert.
- Idempotenztest für die Charakter-Migration: bereits migrierte Akten bleiben bei erneutem Laden stabil.
- Gemeinsamer Konsolenreport statt mehrerer verstreuter Audit-Ausgaben.

## Performance

- Charakter-, Archiv- und Compendium-Seiten werden per `React.lazy` geladen.
- Eigene Produktions-Chunks für die großen Hauptbereiche.
- Ladezustand über `Suspense` ergänzt.

## Release

- Version auf `1.0.0-rc.1` angehoben.
- Der Health-Check ist nur im Entwicklungsmodus sichtbar; Produktionsnutzer sehen keine Debug-Oberfläche.
