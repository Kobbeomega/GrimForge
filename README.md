# GrimForge

GrimForge ist ein lokaler Dark-Fantasy-Charaktermanager mit Character Creator, Charakterbogen, Journal, Compendium, Import/Export und druckoptimierten Bögen.

## Funktionen

- geführte Charaktererschaffung
- Abstammungen, Klassen und Transformationen
- regelbasierte Werteberechnung
- Ausrüstung, Angriffe, Ressourcen und Zauber
- Character Journal und Sitzungsnotizen
- durchsuchbares Compendium mit Favoriten und Vergleichen
- JSON-Import und -Export
- druckoptimierte Charakter- und Statbögen
- installierbare PWA mit Offline-Cache

## Lokale Entwicklung

Voraussetzungen:

- Node.js 22
- npm

```powershell
npm ci
npm run dev
```

Die Entwicklungsseite läuft anschließend unter der von Vite angezeigten lokalen Adresse.

## Qualitätsprüfung

```powershell
npm run lint
npm run build
npm run preview
```

Der Produktions-Build wird in `dist/` erzeugt.

## Deployment

Das Repository ist für GitHub Actions und Vercel vorbereitet:

- `.github/workflows/ci.yml` prüft Lint und Build.
- `vercel.json` konfiguriert Vite, SPA-Rewrites und Cache-Header.
- `DEPLOYMENT.md` enthält die vollständige Schritt-für-Schritt-Anleitung.

Nach der einmaligen Verbindung des GitHub-Repositories mit Vercel löst jeder Push auf den Production-Branch automatisch ein neues Deployment aus.

## Datenspeicherung

Charaktere, Favoriten und Journalinformationen werden lokal im Browser gespeichert. Vor größeren Browser- oder Gerätewechseln sollte das Archiv über die integrierte Exportfunktion gesichert werden.

## Version

Aktueller Projektstand: **0.9.8**
