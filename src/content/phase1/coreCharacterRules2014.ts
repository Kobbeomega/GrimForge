// Automatisch aus dem bereitgestellten Spielerpaket übernommen.
// Phase 1 hält Quelldaten bewusst getrennt von der UI-Integration.

export const sourceCoreCharacterRules2014 = {
  "ability_generation": {
    "standard_array": [
      15,
      14,
      13,
      12,
      10,
      8
    ],
    "point_buy_points": 27,
    "point_buy_cost": {
      "8": 0,
      "9": 1,
      "10": 2,
      "11": 3,
      "12": 4,
      "13": 5,
      "14": 7,
      "15": 9
    },
    "rolling": "Sechsmal 4W6 würfeln und jeweils den niedrigsten Würfel streichen."
  },
  "modifier_formula": "floor((Attributswert - 10) / 2)",
  "proficiency_bonus_levels_1_3": 2,
  "level_1_hp": "Maximum des Trefferwürfels + KO-Modifikator",
  "later_hp": "Trefferwürfel würfeln oder festen Wert verwenden, dann KO-Modifikator addieren; mindestens 1 TP pro Stufe nach Gruppenregel.",
  "armor_class": "Ohne Rüstung 10 + GE-Modifikator, sofern kein Merkmal eine andere Formel liefert.",
  "initiative": "GE-Modifikator plus eventuelle Boni",
  "skill_check": "Attributsmodifikator + Übungsbonus bei Kenntnis; Expertise addiert den Übungsbonus doppelt.",
  "saving_throw": "Attributsmodifikator + Übungsbonus nur bei Rettungswurfkenntnis.",
  "passive_score": "10 + alle normalerweise anwendbaren Modifikatoren; Vorteil meist +5, Nachteil meist -5.",
  "attack_bonus": "ST + Übungsbonus für normale Nahkampfwaffen; GE + Übungsbonus für Fernkampf und wahlweise Finesse.",
  "weapon_damage": "Waffenschadenswürfel + verwendeter Attributsmodifikator; ohne besondere Regel kein Übungsbonus auf Schaden.",
  "spell_save_dc": "8 + Übungsbonus + Zauberattributsmodifikator",
  "spell_attack": "Übungsbonus + Zauberattributsmodifikator",
  "carrying_capacity_2014": "ST-Wert x 15 Pfund; Schieben/Ziehen/Heben ST x 30 Pfund.",
  "level_up_sequence": [
    "Klassenstufe erhöhen",
    "Trefferpunkte erhöhen",
    "neue Klassenmerkmale und Ressourcen anwenden",
    "Zauberplätze sowie bekannte/vorbereitete Zauber aktualisieren",
    "gegebenenfalls Unterklasse auf Stufe 3 wählen",
    "Angriffe, SG, RK, passive Werte und Ressourcenzähler neu berechnen",
    "Grim-Hollow-Optionen und Transformationsfortschritt separat prüfen"
  ]
} as const;
