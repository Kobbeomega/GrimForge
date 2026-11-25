# GrimForge 1.2.0-rc.1 — Lesbarkeit und Spieltisch

## Neu

1. Spielbare W20-Würfe auf dem Charakterbogen: Attribute, Fertigkeiten, Rettungswürfe, Waffenangriffe. Vorteil und Nachteil zeigen beide Würfel und das gewertete Ergebnis.
2. Waffenschadenwürfe inklusive Krit-Regel (doppelte Würfel, einfacher Modifikator). Kein automatischer Trefferentscheid.
3. Todesrettungswürfe und manuelle Einträge (0 TP), natürliche 1 / natürliche 20, gespeicherter Zustand; bei Heilung und langer Rast zurückgesetzt.
4. Erschöpfungsstufen 0–6 gespeichert; Wirkungsbeschreibung nach 2014, keine automatische Veränderung des Charakterbogens.
5. Konzentrationserinnerung nach erlittenem Schaden; manuelle Entscheidung bleibt beim Spieler bzw. SL.
6. Rückgängig für letzte Charakteränderungen während dieser Sitzung (bis acht Schritte, nicht über Browser-Neustart hinaus).
7. Zauberplätze bewusst wählen, inklusive Hochstufung und Paktmagie. Regeltext bleibt maßgeblich bei Skalierung.
8. Direkte Zauber-Kurzinfos in Erstellung und Level-up; übersichtliche Suchkarten und getrennte Details-/Auswahlbedienung.
9. Deutlich verbesserte Lesbarkeit von Inventar, Charakterwerten, Navigation, Zaubern, Klassenwahl und Buttons; Druckbogen-Styles nicht verändert.

## Rückwärtskompatibilität

- Es gibt keine notwendige Schema-Migration. Optionale neue Felder: `deathSaves`, `exhaustionLevel`.
- Bestehende Charaktere, Inventare, Zauberwahl, Ressourcen, Druckfunktionen und Kompendium bleiben bestehen.
- Die bestehende Charakterstufen-Grenze (Stufe 5) wurde nicht verändert.
- Aktive Würfelergebnisse werden nicht gespeichert. Rückgängig-Historie ist nur im aktuellen geöffneten Bildschirm verfügbar.

## Installation / Tests (Windows)

```powershell
npm ci
npm run typecheck
npm run test:smoke
npm run check:release
npm test
npm run dev
```

## QA

- `npm run typecheck`: erfolgreich.
- `node tests/smoke.cjs`: erfolgreich (SSR von Zauberauswahl, Zaubervorschau, Grimoire, Würfe und Todesrettungen).
- Deterministische Würfeltests: erfolgreich.
- PostCSS-Syntaxprüfung: erfolgreich.
- `npm run build`, `npm run lint` und `npm test`: hier nicht vollständig ausführbar, da das aus Windows stammende ursprüngliche `node_modules` nicht alle nativen Linux-Abhängigkeiten enthält. Bitte unter Windows nach `npm ci` ausführen.

## Regeln und Grenzen

- Zauberwirkungen werden ausschließlich aus gespeicherten Katalogdaten angezeigt; bei unstrukturierten Spezialeffekten und Hochstufung bleibt der Zaubertext maßgeblich.
- Todesrettungswürfe markieren 3 Fehlschläge, nehmen aber keine automatische Entscheidung über den Charakterstatus vor.
- Rückgängig funktioniert nur innerhalb der aktuell geöffneten Charakteransicht und wird nicht als langzeitiges Aktionsprotokoll gespeichert.
