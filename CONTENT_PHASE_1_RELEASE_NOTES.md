# GrimForge 1.0.0-alpha.1 – Content Completion Phase 1

## Übernommen

- 198 Zaubereinträge der Grade 0–3
- 13 PHB-2014-Hintergründe
- 37 Waffen
- 13 Rüstungs- und Schilddatensätze
- 18 Fertigkeiten
- 75 Klassenprogressionszeilen für Stufe 1–3
- zentrale Kernregeln für Charakterwerte und Stufenaufstieg

## Architektur

Alle Quelldaten liegen unter `src/content/phase1` und besitzen normalisierte `app_id`- bzw. Klassen- und Schulreferenzen. Sie sind bewusst von der sichtbaren Compendium-Integration getrennt, damit Phase 2 bestehende GrimForge-Daten kontrolliert zusammenführen kann.

## Audit

Im Entwicklungsmodus erscheint ein Phase-1-Content-Audit in der Browser-Konsole. Es zeigt Quellmengen, bereits passende Editor-Einträge, offene Integrationen und doppelte Quell-IDs.

## Wichtige Grenze

Das strukturierte Zauberpaket enthält Metadaten, aber keine vollständigen Zauberbeschreibungen. Phase 1 erfindet deshalb keine Regeltexte.
