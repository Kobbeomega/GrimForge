# GrimForge 1.0.1 – Print/Export Bugfix

GrimForge 1.0.1 behebt einen Fehler im Druck- und PDF-Export von Klassenmerkmalen.

## Behoben

- Aktive Klassenmerkmale werden im Browser-Druck auf Seite 1 unter **Klassenmerkmale & Ressourcen** ausgegeben.
- Der offizielle Grim-Hollow-PDF-Export befüllt das vorhandene Feld **Merkmale & Eigenschaften** nun mit den aktiven Klassen- und Unterklassenmerkmalen.
- Verknüpfte Klassenressourcen zeigen den aktuellen Stand und ihre Regeneration (kurze/lange Rast).
- Pfadentscheidungen, die von der Regelengine als Merkmale aufgelöst werden, werden über denselben Exportpfad berücksichtigt.
- Dadurch erscheinen unter anderem **Zweiter Wind**, **Tatendrang**, **Kampfrausch**, **Bardische Inspiration**, **Ki** und **Handauflegen** auf dem gedruckten Bogen, sobald sie für die aktuelle Stufe aktiv sind.

## Technischer Hinweis

Druckansicht und PDF-Export beziehen ihre Merkmale jetzt direkt aus `rules.classFeatures` und `rules.classResources`. Es existiert keine separat gepflegte Feature-Liste für den Export.

Der TypeScript-Projektcheck (`tsc -b`) läuft mit diesen Änderungen fehlerfrei durch.
