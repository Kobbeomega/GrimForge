// Automatisch aus dem bereitgestellten Spielerpaket übernommen.
// Phase 1 hält Quelldaten bewusst getrennt von der UI-Integration.

export const phase1Coverage = {
  "phase": "data-import",
  "source": {
    "spellsLevel0To3": 198,
    "backgrounds": 13,
    "weapons": 37,
    "armor": 13,
    "skills": 18,
    "classProgressionRows": 75,
    "classesInProgression": 13
  },
  "alreadyIntegrated": {
    "spellsMatchingSource": 43,
    "backgroundsMatchingSource": 5,
    "equipmentMatchingSource": 1
  },
  "pendingForPhase2": {
    "spells": 155,
    "backgrounds": 8,
    "weaponsAndArmor": 49
  },
  "notes": [
    "Quelldaten sind normalisiert und zentral exportiert.",
    "Zauberbeschreibungen sind im strukturierten Paket nicht enthalten; Phase 2 darf keine erfundenen Regeltexte erzeugen.",
    "Dubletten werden in Phase 2 anhand der app_id zusammengeführt."
  ]
} as const;
