# GrimForge 1.0.0-rc.2-hpfix.1

## Trefferpunkte-Hotfix

- Neue Charaktere erhalten ihre maximalen Trefferpunkte jetzt aus Klasse, Stufe und effektivem Konstitutionswert statt aus dem bisherigen festen Wert 10.
- Die Berechnung verwendet die bestehende zentrale Rule Engine (`calculateMaximumHitPoints`).
- Abstammungs- und Variantenboni auf Konstitution wirken dadurch automatisch auf die Trefferpunkte.
- Das persistierte Charakterschema wurde auf Version 3 angehoben.
- Bereits gespeicherte Charaktere aus älteren Schemaversionen werden beim Laden neu berechnet.
- Bei bereits verletzten Charakteren wird der bisher fehlende TP-Betrag bei der Migration erhalten. Beispiel: 10/6 TP (4 Schaden) wird bei neuem Maximum 15 zu 15/11 TP.
- Fehlen bei sehr alten Charakteren die kompletten Vitalwerte, berechnet `getCharacterVitals` einen klassen- und konstitutionsabhängigen Fallback.

## Regel

Stufe 1:

`Trefferwürfel-Maximum + KON-Modifikator`

Weitere Stufen verwenden weiterhin den bereits vorhandenen festen Durchschnitt des Trefferwürfels plus KON-Modifikator.
