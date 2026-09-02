# GrimForge 1.0.0

GrimForge ist ein deutschsprachiger Dark-Fantasy-Charaktermanager für D&D 5e auf Basis der 2014-Regeln mit Grim-Hollow-Erweiterungen. Die Anwendung ist als installierbare PWA ausgelegt und unterstützt Charaktererstellung, Charakterarchiv, Spielzustand, Journal, Kompendium sowie Druck- und PDF-Ausgabe.

## Umfang von 1.0.0

Der Release-Schwerpunkt liegt auf Charakteren der Stufen 1–3:

- 12 D&D-2014-Kernklassen mit ihrer Progression auf Stufe 1–3
- 44 in GrimForge enthaltene D&D-Unterklassen
- zusätzliche Grim-Hollow-Inhalte und Transformationen
- Klassen- und Unterklassenentscheidungen mit persistenter Speicherung
- Ressourcen, Zauberwirken und relevante Sondermechaniken
- Hintergründe, Ausrüstung, Währung und Charakterinventar
- Archiv, Bearbeiten und Import/Export von Charakterakten
- Print-Ansicht und PDF-Export
- Offline-fähige PWA

## Voraussetzungen

- Node.js 22 oder neuer
- npm

## Entwicklung

```bash
npm install
npm run dev
```

## Release-Prüfung

```bash
npm run check:release
```

Alternativ einzeln:

```bash
npm run lint
npm run typecheck
npm run build
```

Der fertige Web-Build wird in `dist/` erzeugt.

## Daten & Kompatibilität

GrimForge migriert ältere gespeicherte Charakterakten auf das aktuelle Schema. Importierte Akten werden vor der Übernahme strukturell validiert. Charaktere, die bearbeitet und erneut gespeichert werden, behalten ihren laufenden Spielzustand wie Trefferpunkte, Ressourcen, Inspiration, Journal, Währung und Inventar.

## Regelumfang

GrimForge 1.0.0 konzentriert sich bewusst auf die implementierten D&D-2014- und Grim-Hollow-Inhalte der Anwendung. Nicht jede jemals für D&D 5e veröffentlichte Klasse, Unterklasse oder Zusatzregel ist Bestandteil dieses Releases.

## Version

**GrimForge 1.0.0**
