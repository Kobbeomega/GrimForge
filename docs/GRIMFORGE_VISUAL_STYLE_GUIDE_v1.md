# GrimForge – Visual Style Guide v1

Historischer Stand (Bronze). Seit RC10 verwendet die Oberfläche Weinrot und helle Rosenholztöne; maßgeblich sind die aktuellen Theme-Tokens in `src/styles/theme.css`.

**Designrichtung:** Obsidian & Bronze · Dark Fantasy, ohne Stilbrüche.  
**Ausgangspunkt:** bereitgestellter Quellstand `grimforge@1.0.11`.  
**Umfang:** visuelle Vereinheitlichung der Bildschirmoberfläche. Spiellogik, Charakterdaten, Speicherung, Kampf-/Würfelmechanik und Druckstruktur bleiben unverändert.

## 1. Farbrollen

| Token | Hex | Verwendung |
| --- | --- | --- |
| `--color-background` | `#141111` | App-Hintergrund |
| `--color-surface` | `#211C1B` | Hauptpanels / Navigation |
| `--color-surface-light` | `#302724` | erhöhte Karten / interaktive Flächen |
| `--color-border` | `#604C3C` | Konturen / Trenner |
| `--color-primary` | `#A77B49` | Bronze als primärer Akzent |
| `--color-primary-light` | `#D2AC76` | aktiver Zustand, wichtige Akzente |
| `--color-text` | `#F0E8DD` | primärer Text |
| `--color-text-muted` | `#C6B7A6` | sekundäre Texte |
| `--color-danger` | `#AA4A4C` | Schaden / Warnung |
| `--color-success` | `#6C997B` | Heilung / Erfolg |
| `--color-warning` | `#CDA35C` | Warnhinweis |

*Regel:* Gold/Bronze ist die einzige generelle Interface-Akzentfamilie. Rot und Grün dürfen als semantische Zustandsfarben eingesetzt werden. Dramatische Artwork-Farben für einzelne Abstammungen/Klassen dürfen aus gestalterischen Gründen abweichen; sie sind keine allgemeinen Buttonfarben.

## 2. Materialien

- **Außenfläche:** warmes Dunkelschwarz, höchstens ein schwacher Verlauf.
- **Hauptkarten:** dunkle Braun-/Anthrazit-Flächen, dünne bronzene Kontur.
- **Interaktive Karten:** leicht angehobene dunkle Fläche, Hover durch Hintergrund- und Konturänderung.
- **Trefferpunkte:** dunkle Karte mit schmalem rotem Signal statt beigefarbenem Flächenwechsel.
- **Gold:** für Fokus, Auswahl, Icons und Trenner; kein flächiges Grellgold.
- **Pergament:** allenfalls Typografiemotiv/Handout, nicht als andersartiges Dashboard-Panel.

## 3. Komponenten

| Komponente | Verhalten |
| --- | --- |
| Primäre Aktion | bronzene Kontur/Füllakzent, deutliche Beschriftung |
| Sekundäre Aktion | dunkle Fläche, dünne Kontur |
| Schaden | gedämpft roter Button |
| Heilen | dunkler Button, grüner Text / Rahmen |
| Aktiver Navigationseintrag | leicht hellere Fläche, goldene Kante |
| Statistikfeld | gleiche dunkle Kartengrundlage, Zahl groß, Beschriftung kleiner |
| Formulare | dunkler Hintergrund, lesbarer Text, goldener Tastaturfokus |
| Statuschips | sparsamer Einsatz semantischer Farbe |
| Header | Serifenschrift und zurückhaltender symbolischer Akzent |

## 4. Typografie

- Georgia für Kapitel-/Fantasy-Überschriften und charakterbildende Bezeichnungen.
- System-UI für Eingabefelder, Zahlen, Statistiken, Aktionstexte und längere Absätze.
- Unterschiedliche Schriftgrößen müssen eine Hierarchie ausdrücken (Titel > Bereich > Label).
- Helle Haupttexte, gedämpfte Nebenlabels; keine winzigen kontrastarmen Pflichtinformationen.

## 5. Umsetzung im Code

1. `src/styles/theme.css`: semantische CSS-Tokens für alle Screen-Bereiche.
2. `src/theme/theme.ts`: identische Theme-Farben für programmatische Verbraucher.
3. `src/styles/workbench.css`: keine abweichenden lokalen Theme-Tokens mehr; konsistente Controls und aktive Navigation.
4. `src/modules/sheet/styles/session-dashboard.css`: beige Spieltischkarten entfernt; einheitliches dunkles Kartenmaterial und semantische Aktionsfarben.
5. Bildschirm-CSS-Dateien in `src/styles`, `src/modules/compendium`, `src/modules/sheet` und `src/modules/level-up`: fest codierte violette UI-Akzente auf Bronze/Gold vereinheitlicht.
6. `src/modules/print`: keine Änderungen an Druckbögen oder PDF-Export.

## 6. Regeln für künftige UI-Arbeit

- Neue Screen-Komponenten **immer mit Design-Tokens**, nicht mit individuellen Hexwerten versehen.
- Keine zusätzlichen Themes pro App-Bereich. Jeder Bereich erbt die zentralen Tokens.
- Auf dunklen Karten keine zufällig eingestreuten hellen Flächen als Hervorhebung.
- Status-/Gefahrenfarben haben semantische Bedeutung, nicht rein dekorative.
- Keyboard-Fokus muss deutlich sichtbar sein; die Farbgebung darf die Bedienbarkeit nicht beeinträchtigen.
- Jede größere Screen-Änderung auf Desktop, Tablet und Handy kontrollieren.

## 7. Funktionalität & Qualitätssicherung

- Nicht angefasst: React-Komponentenlogik, Datenmodelle, Creator-Regeln, Angriffe, Würfe, Zauber, Speichern, Druckmechanik.
- Technische Prüfung in dieser Umgebung: TypeScript-Typecheck erfolgreich, alle 17 CSS-Dateien syntaktisch über PostCSS geparst.
- Ein vollständiger Vite-Build und der automatisierte UI-Test konnten hier **nicht** ausgeführt werden: Die mitgelieferten `node_modules` stammen aus einer Windows-Installation, während die Testumgebung Linux verwendet und das native Linux-Rolldown-Paket fehlt. Eine Netzwerkinstallation war hier nicht möglich.
- Deswegen zusätzlich lokal mit frischen Abhängigkeiten prüfen:

```powershell
npm ci
npm run check:release
npm test
```

**Manuelle Prüfpunkte:** Archiv, Charaktererstellung inkl. Level-Up, Spieltisch/HP-Schaden-Heilung, Kampf, Zauber, Inventar, Zustände, Kurze/Lange Rast, Compendium, Export und Charakterdruck; jeweils Desktop und Mobilansicht.
