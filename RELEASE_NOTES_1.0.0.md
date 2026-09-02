# GrimForge 1.0.0 – Release Notes

## Erster stabiler Release

GrimForge 1.0.0 markiert den ersten stabilen Release nach den Rules-, Subclass-, Integration-, Release- und Paranoia-Audits.

### Charaktererstellung

- Charaktererstellung für Stufe 1–3
- regelgerechte Freischaltung von Klassen- und Unterklassenmerkmalen
- persistente Klassen-, Unterklassen- und Pfadentscheidungen
- Kampfstile, Expertise, Metamagie, Unheimliche Anrufungen, Paktsegen und weitere Kernentscheidungen
- Drittelzauberwirker für Arkaner Ritter und Arkaner Betrüger
- automatische Unterklassenzauber und passende Sonderregeln
- 2014-Regelprogression wird explizit von späteren Rulesets getrennt

### Charakterakte & Spielbetrieb

- Ressourcen und verbrauchte Anwendungen werden verfolgt
- Trefferpunkte, temporäre Trefferpunkte, Trefferwürfel und Inspiration
- Journal und Inventar
- Währung und Startausrüstung
- Bearbeiten vorhandener Charaktere ohne Verlust laufender Sessiondaten

### Inhalte

- 12 D&D-2014-Kernklassen
- 44 in GrimForge enthaltene D&D-Unterklassen
- Grim-Hollow-Inhalte und Transformationen
- 13 PHB-2014-Hintergründe mit Startausrüstung
- Ausrüstungs- und Zauberkompendium

### Stabilität & Datenqualität

- verschärfte Validierung für Zauberauswahlen
- robuste Importvalidierung für beschädigte Charakterdateien
- isolierte Behandlung defekter LocalStorage-Einträge
- Migrationslogik für ältere Charakterakten
- Roundtrip-Prüfungen für Creator → Charakterakte → Bearbeiten → Speichern
- Referenz- und Integritätsprüfungen über Klassen, Unterklassen, Ressourcen, Transformationen, Hintergründe und Zauber

### Ausgabe

- Charakterbogen-/Print-Ansichten
- PDF-Export
- installierbare Offline-PWA

## Release-Freeze

1.0.0 ist feature-frozen. Neue Inhalte und zusätzliche Regeloptionen gehören in nachfolgende Versionen; Änderungen an 1.0.0 sollten sich auf kritische Fehlerkorrekturen beschränken.
