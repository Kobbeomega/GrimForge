# GrimForge RC10 · Audit für den Spieltisch

**Geprüfte Grundlage:** mitgelieferter Quellstand RC9; Einzelklasse, Erstellung auf Stufe 1–3 und Aufstieg bis Stufe 5. Der Datenbestand umfasst 13 Klassen, 48 reguläre Unterklassen plus drei Alteinträge, 21 Abstammungen, 38 Hintergründe, 251 Zauber, 124 Gegenstände und zwölf Transformationen. Bestand, strukturelle Konsistenz und Tests der hinterlegten Regeln sind keine unabhängige Prüfung jedes Buchwerts.

| Sicht | Fund | Änderung |
| --- | --- | --- |
| Laufende Kampagne | Verbrauchte Klassenressourcen wurden als Zahlen gespeichert, aber beim Einlesen wie Text geprüft. | Numerische Ressourcen werden akzeptiert. Bei teilweise unlesbarem lokalem Archiv wird das Original nicht automatisch überschrieben; die Rohdaten lassen sich sichern. |
| DM beim Zusammenführen | Eine reine Migration konnte einer älteren Akte ein neueres Änderungsdatum geben. | Einlesen bewahrt den Zeitstempel. Bei unvollständigem Dateiimport ist das Ersetzen des gesamten Archivs gesperrt. |
| Spielende nach mehreren Sitzungen | Bearbeiten einer älteren Akte konnte gewürfelte TP umrechnen, Startausrüstung erneut vergeben oder Entscheidungen zurücksetzen. | Manuelle TP, gespieltes Inventar und laufender Zustand bleiben beim unveränderten Build erhalten; erneut angeklickte bestehende Entscheidungen werden nicht neu angewandt. |
| Charaktererstellung | Vorschau und Bogen konnten unterschiedliche Werte für Waffen zeigen. | Die Vorschau verwendet die Angriffsberechnung des Bogens. Navigations- und Auswahlangaben machen deutlicher, was zu tun ist und was automatisch berechnet wurde. |
| Regel: Hügelzwerg | Der zusätzliche Trefferpunkt pro Stufe fehlte. | Erstellung und Aufstieg berücksichtigen den Bonus. Bereits gespeicherte Kampagnen-Maxima werden nicht pauschal rückwirkend umgeschrieben. Quelle: [Basic Rules 2014 – Dwarf, Dwarven Toughness](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/races#Dwarf). |
| Am Spieltisch | Beim Wechsel auf Papier waren gespeicherte Todesrettungen und Erschöpfung nicht unmittelbar erkennbar. | Die Spielakte und HTML-Druckansicht geben den gespeicherten Zustand wieder. Das Druckdesign nutzt dunkle Schrift auf hellem Papier und sparsame weinrote Linien. Das separate Originalformular bleibt unverändert. |

## Verifikation

- 126 automatisierte Tests, darunter acht neue Regressionstests; unter anderem Import, Bestandswerte, Ausrüstung und Stufenaufstieg.
- TypeScript und Vite-Produktionsbuild erfolgreich. Lint ohne Fehler, mit sechs Warnungen (fünf zu React Fast Refresh, eine überflüssige Escape-Sequenz).
- Serverseitige Oberflächentests für Creator, Zauberwahl, Werte und Sitzungszustand. Kein interaktiver Browserdurchlauf; Installation und PWA-Update auf einem echten Gerät nicht getestet.
- Zwei A4-Spielakten (Kämpfer und Magier) als PDF erzeugt, mit Poppler gerendert und gesichtet: drei bzw. fünf Seiten. Kein physischer Probedruck.

## Was vor einer Kampagne offen bleibt

- Für 9 von 21 Abstammungen sind automatische Grund- oder Wahlboni hinterlegt. Bei den übrigen zwölf nicht stillschweigend zusätzliche Punkte annehmen: Edition und Kampagnenregel mit der Spielleitung abgleichen. Der Creator weist bei fehlendem Automatismus darauf hin.
- Elf Einträge verwenden Kategorienbilder statt einzelner Illustrationen. Einige Zaubertexte liegen nur in der Sprache der hinterlegten Quelle vor. Situative Merkmale, Transformationseffekte und Homebrew-Freitext bleiben teilweise Tischentscheidungen.
- Eine alte Akte kann korrekt importieren, obwohl eine damals nicht erfasste Entscheidung fehlt. Gerade auf Stufe 3 Unterklasse, Merkmale der Stufen 2/3, bekannte/gewählte Zauber und maximale TP mit dem Papierbogen vergleichen. Nicht aus der Stufe auf frühere Würfelergebnisse schließen.
- Vor dem Update eine JSON-Sicherung exportieren. Zur Abnahme vor der Runde eine Kopie der gespielten Akte laden, eine Ressource verbrauchen, neu laden und den A4-Bogen mit der bisherigen Kampagnenakte vergleichen.
