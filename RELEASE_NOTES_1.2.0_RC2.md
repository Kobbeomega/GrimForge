# GrimForge 1.2.0 RC2 — weniger UI, bessere Lesbarkeit

## Änderungen gegenüber RC1

- Direkte digitale Würfe aus Attribute/Fertigkeiten/Rettungswürfen entfernt. Werte und Boni bleiben lesbar.
- Digitale Waffenangriffs- und Schadenswürfe entfernt. Angriffs- und Schadenswerte bleiben sichtbar.
- Digitale Todesrettungswürfe entfernt; 3 Erfolge und 3 Fehlschläge werden weiterhin manuell verwaltet.
- Trefferwürfel für die Rast werden wieder mit echten Würfeln geworfen: Das Ergebnis wird manuell eingetragen; TP, Verbrauch und Regeln werden weiterhin verwaltet.
- Würfelgenerator und entsprechende Tests entfernt. Tab „Würfe“ zur Verdeutlichung in „Proben“ umbenannt.
- Dark-Fantasy-Design beruhigt: neutrale Anthrazitflächen, sparsamere Messingakzente, weniger Rahmen/Glows, deutlichere Typohierarchie und größere Beschriftungen.
- CSS-Lesbarkeitsregeln werden jetzt tatsächlich geladen (in RC1 lag die Datei vor, war aber nicht importiert).

## Unverändert

- Ausführliche Zaubervorschau bei Charaktererstellung und Level-up (Reichweite, Wirkzeit, Dauer, Schaden/Heilung, Wirkung).
- Auswahl von Zauberplätzen, einschließlich höherer Grade und Paktplätze.
- Manuell verwaltete Todesrettungen und Erschöpfung, Konzentrationserinnerungen und Sitzungs-Rückgängig.
- Bestehende Charakterspeicherung, Export, Import, Klassen, Ausrüstung, Journal, PDF/Druckvorlagen.

## Hinweise / Prüfung

- RC2 ist ein Quellcode-Release-Candidate. Auf Windows nach `npm ci` die Befehle `npm run typecheck`, `npm run test:smoke`, `npm test`, `npm run build` ausführen.
- Alte Spielstände vor dem Test exportieren. Die Druckvorlagen wurden nicht bearbeitet.
