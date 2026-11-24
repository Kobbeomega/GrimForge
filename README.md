## Inventar und Homebrew (1.2.0 RC4)

Im Inventar unter **Gegenstand hinzufügen** entweder **Aus dem Ausrüstungskatalog** oder **Eigener Gegenstand** wählen. Waffen erhalten Würfel, Schadensart, Eigenschaften, Reichweite und Zusatzboni. Rüstungen und Schilde erhalten Basis-RK bzw. RK-Bonus. Werte greifen nach **Ausrüsten**; freie Effekte bleiben Notizen. Homebrew lässt sich später über **Werte bearbeiten** ändern und wird mit der Akte als JSON gespeichert. Der Katalog dient nicht als automatischer Kauf: GM ändern sich erst bei manueller Münzeingabe.

Die üblichen zusätzlichen Gegenstände verwenden die [2014-Ausrüstungswerte](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/equipment). Nicht eindeutig zuordenbare Hintergrundgegenstände bleiben Freitext; gespielte Inventare werden nicht nachträglich aufgefüllt. Das Projekt enthält verschiedene Regelstände, daher ist der Katalogabgleich keine Vollständigkeitsprüfung aller Grim-Hollow-Quellen.

# GrimForge 1.2.0-rc.2

Regelabgleich bis Stufe 5: Die Tests prüfen die Datenpakete, Startpakete, regulären Unterklassen und die Werte des Spielbogens. Für eine unabhängige Vollständigkeitsprüfung aller Grim-Hollow-Sonderregeln reichen gekürzte Buchauszüge nicht aus. Bestehende Inventare bleiben erhalten; korrigierte Startpakete werden nicht nachträglich in gespielte Akten eingebucht.

Der Spielbogen trennt schnelle Spielwerte von Merkmalen und bedingten Boni.
Nach einem Build erzeugt der Testlauf mit gesetzter Umgebungsvariable
`GRIMFORGE_PRINT_QA` im dort angegebenen Verzeichnis zwei HTML-Druckproben auf Stufe 5.

Die Kapitel **Charaktere**, **Spieltisch** und **Kodex** teilen sich eine kompakte Navigation. **Datensicherung** enthält weiterhin Import und Export. Das Journal gehört zur Figur. Über **Charakter drucken** erhältst du den hellen Spielbogen; **Grim-Hollow-PDF** verwendet weiterhin das separate Formular.

Der **Spieltisch** bündelt Trefferpunkte und Kampfwerte mit Schaden, Heilung, Rast und Zuständen. Ausgerüstete Angriffe, freie Zauberplätze (inklusive Paktmagie) und verfügbare Klassenressourcen stehen direkt daneben. Ausführliche Werte und Exportfunktionen lassen sich bei Bedarf aufklappen.

GrimForge ist ein deutschsprachiger Dark-Fantasy-Charaktermanager für D&D 5e auf Basis der 2014-Regeln mit Grim-Hollow-Erweiterungen. Die Anwendung ist als installierbare PWA ausgelegt und unterstützt Charaktererstellung, Charakterarchiv, Spielzustand, Journal, Kompendium sowie Druck- und PDF-Ausgabe.

## Neu in 1.2.0-rc.2: spielbare Werte ohne digitale Würfel

- Kein eingebauter Würfelgenerator mehr. Attribute, Proben, Rettungswürfe und Waffenschaden zeigen berechnete Boni und Werte zum Würfeln mit echten Würfeln.
- Todesrettungswürfe werden über Erfolge/Fehlschläge manuell markiert. Verbleibende Trefferwürfel werden weiterhin verwaltet, das echte Würfelergebnis wird eingegeben.
- Beibehalten: Erschöpfungsstufe 0–6, Konzentrationserinnerung nach Schaden, Rückgängig während der geöffneten Sitzung.
- Zauberauswahl in Erstellung und Level-up: Wirkung, Reichweite, Wirkzeit, Dauer, Schaden/Heilung und Regeltext direkt sichtbar. Suche und getrennte Auswahl-/Lesebedienung.
- Zauberplatzwahl bei Zauberwirken einschließlich höheren Graden und Paktmagie.
- Ruhigeres Dark-Fantasy-Theme mit neutralen Anthrazitflächen, gezielter Pergament-Hervorhebung für TP, Messingdetails und besser lesbaren Schriften.

**Kompatibilität:** Das Charakterschema bleibt Version 7. Bestehende Charakterdaten und Druckvorlagen bleiben bestehen. Vor dem Update empfehle ich unter „Datensicherung“ einen JSON-Export.

**Teststatus:** TypeScript und SSR-Smoke-Tests bestanden, CSS parsebar. Der vollständige Vite-Build und die vollständige Testsuite sind in der aktuellen Linux-Umgebung wegen fehlender nativer Abhängigkeiten nicht ausführbar. Unter Windows nach `npm ci` bitte `npm run check:release` und `npm test` ausführen.

## Charakteraufstieg

Im Charakterbogen können Charaktere bis Stufe 5 aufsteigen. Der Assistent zeigt die anstehenden Entscheidungen und speichert sie erst beim Abschließen des Aufstiegs.

Jeder Schritt zeigt, welche Angaben noch fehlen. Trefferwürfe, Attributspunkte und Zauber werden aus passenden Optionen ausgewählt. Bereits gelernte Zaubertricks und Zauberbucheinträge sind geschützt. Ohne Zauberausbildung entfällt der Zauberschritt.

Im Zauberschritt sind Wirkung, Reichweite, Wirkzeit, Dauer sowie verfügbare Schadens-, Heilungs- und Rettungswurfdaten schon in der durchsuchbaren Auswahl sichtbar. „Wählen“ übernimmt einen Zauber erst nach einer bewussten Aktion. Gelernte und automatisch gewährte Zauber lassen sich für dieselbe Vorschau aufklappen.

Spieltisch und Aufstiegsassistent verwenden dieselben dunklen, neutralen Flächen und Bedienelemente. Große Zahlen, gut lesbare Beschriftungen und Bronzeakzente heben Trefferpunkte, RK und Initiative hervor. Unter **Kampf** und den aufklappbaren Klassenmerkmalen stehen berechnete Unterklassenwerte und die sieben Tiergefährten-Profile der App. Permanente Werte fließen in den Bogen ein; bei Reaktionen, Zielzuständen, Tiergestalt und ähnlichen Effekten zeigt der Bogen Wert und Auslöser, führt den Kampf aber nicht selbst. Neue Unterklassen und Kreaturenprofile außerhalb des vorhandenen Katalogs sind nicht Teil dieser Version.

Regelgrundlagen für den Abgleich: [D&D Basic Rules 2014](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/classes), [Waldläufer (2014)](https://www.dndbeyond.com/classes/5-ranger) und das im Projekt referenzierte Grim-Hollow-Spielerhandbuch (2025) für die Monsterjäger-Gilden.

- 12 D&D-2014-Kernklassen mit Aufstiegen bis Stufe 5
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
npm run typecheck
npm run test:smoke
npm run check:release
npm test
```

Alternativ einzeln:

```bash
npm run lint
npm run typecheck
npm run build
```

Der fertige Web-Build wird in `dist/` erzeugt.

## Daten & Kompatibilität

Vor dem Wechsel aus der bisherigen App die Charakterakten als JSON exportieren. Die App in einem eigenen Ordner entpacken und starten. Falls das Archiv leer ist, die Sicherung importieren. Browserdaten gehören zur bisher verwendeten Adresse und zum Browserprofil.

GrimForge migriert ältere gespeicherte Charakterakten auf das aktuelle Schema. Importierte Akten werden vor der Übernahme strukturell validiert. Charaktere, die bearbeitet und erneut gespeichert werden, behalten ihren laufenden Spielzustand wie Trefferpunkte, Ressourcen, Inspiration, Journal, Währung und Inventar.

## Regelumfang

Der Zauberkatalog enthält 252 Einträge für Zaubergrade 0–3. Für 198 davon werden die Basisfelder gegen die mitgelieferte zweite Katalogtabelle geprüft. Karten mit Regelauszug leiten ausdrücklich genannte Würfel, Rettungswürfe und Angriffe aus dem gelieferten Kurztext ab. Mehrstufige und situationsabhängige Effekte sowie Hochstufung werden gegebenenfalls im Regeltext erläutert. D&D-Kernzauber folgen soweit geprüft den [Basisregeln 2014](https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spells). Für die Grim-Hollow-Zauber ist der [Player’s Guide](https://www.dndbeyond.com/sources/dnd/ghpg) die Referenz.

Die Grundklassen verwenden das Regelprofil von 2014. Der Monsterjäger verwendet die Progression aus dem [Grim Hollow Player’s Guide von 2025](https://www.dndbeyond.com/sources/dnd/ghpg). Das Update ergänzt die vier Gildenmerkmale auf Stufe 3, Occultist-Zauber, das Verzehrlimit der Devourer-Gilde, den SG der Trapper-Geräte und die Werte von Expert Strike auf Stufe 5. Situationsabhängige Gildeneffekte werden am Tisch angewendet. Alte Spezialisierungen bleiben in gespeicherten Akten erhalten und können über „Bearbeiten“ gewählt oder aktualisiert werden. Bereits abgeschlossene Aufstiege behalten ihr gespeichertes TP-Maximum und ihre Aufstiegshistorie. Bei der nächsten Stufe meldet der Assistent zu hochgradige Zauber aus alten Akten des Mystischen Ritters und Arkanen Trickbetrügers.

Die Abschlussübersicht zeigt die Änderungen bei Merkmalen, Attributen, Bewegung, Initiative, Entscheidungen, Zaubern, Zauberplätzen und Klassenressourcen. Die Grundbewegung bleibt separat editierbar. Der Barbarenbonus wird abhängig von der aktuell angelegten Rüstung angezeigt.

## Version

**GrimForge 1.2.0-rc.1**
