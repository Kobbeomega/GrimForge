# GrimForge 1.0.0-alpha.5 – Rule Engine Consolidation

## Neu

- Versioniertes Charakter-Schema (`schemaVersion: 2`)
- Automatische Migration alter lokaler Charaktere beim Laden
- Automatische Migration importierter Archive
- Rekonstruktion von `baseAbilityScores` bei alten Datensätzen
- Erneute Berechnung effektiver Attribute mit Abstammungs- und Variantenboni
- Schutz vor doppelter Anwendung von Abstammungsboni
- Hintergrund-Fertigkeiten, Werkzeuge, Sprachanzahl, Merkmal und Ausrüstung werden bei Migration ergänzt
- Nicht normalisierte Hintergrundgegenstände bleiben als sichtbare Inventareinträge erhalten
- Zauberstatus und Klassenressourcen werden für alte Charaktere sicher initialisiert
- Abstammungsgeschwindigkeit und Initiative werden nach der Migration aktualisiert
- Exportformat auf Version 2 angehoben; ältere Archive bleiben importierbar
- Developer Rule Coverage Audit für Migration, Abstammungen, Hintergründe, Klassen, Zauber und Ausrüstung

## Bereits vorhandene Engines, jetzt gemeinsam abgesichert

- Klassenmerkmale und Klassenressourcen nach Stufe
- Zauberplätze, Paktmagie, bekannte/vorbereitete Zauber, Ritualregeln, Zauber-SG und Zauberangriff
- RK aus Rüstung, Geschicklichkeit und Schild
- Waffenangriffe einschließlich Finesse, vielseitig, Reichweite und Waffenübungen
- Traglast und Inventargewicht

## Migrationshinweis

Bei Charakteren ohne `baseAbilityScores` werden die früher gespeicherten `abilityScores` als damalige Basiswerte interpretiert. Das entspricht dem Datenmodell vor Einführung der Ability Engine. Individuell außerhalb des Editors manuell veränderte Altdateien können nicht immer eindeutig rekonstruiert werden.

## Prüfung

- `npm run build`: erfolgreich
- `npm run lint`: 0 Fehler, 1 bestehende Fast-Refresh-Warnung
- bekannte Vite-Warnung für einen Chunk über 500 kB bleibt bestehen
