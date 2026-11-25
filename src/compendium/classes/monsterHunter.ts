import type { CharacterSubclass, ClassFeature } from "./classes";

// Grim Hollow Player's Guide (2025), Monster Hunter, pp. 51–59.
export const monsterHunterFeatures: ClassFeature[] = [
  { id: "monster-hunter-grimoire", name: "Monstergrimoire", level: 1, kind: "passive",
    description: "Wähle zwei Kreaturentypen und eine zugehörige Sprache. Für passende IN- und WE-Proben gilt dein Übungsbonus. Bei bestehender Fertigkeitsübung gilt stattdessen der doppelte Bonus." },
  { id: "monster-hunter-weapon-mastery", name: "Waffenmeisterschaften", level: 1, kind: "passive",
    description: "Wähle zwei Waffenarten, mit denen du geübt bist. Nach einer langen Rast darfst du eine Wahl ändern." },
  { id: "monster-hunter-fighting-style", name: "Kampfstil", level: 2, kind: "passive",
    description: "Wähle ein Kampfstiltalent." },
  { id: "monster-hunter-studied-response", name: "Studierte Reaktion", level: 2, kind: "reaction",
    description: "Wenn eine sichtbare Kreatur innerhalb von 18 m ein Ziel für einen Angriff bestimmt, kannst du ihr mit deiner Reaktion zuvorkommen. Dein eigener Waffenangriff oder waffenloser Angriff muss aus deiner aktuellen Position möglich sein. Bei einem Fehlschlag erhältst du die Reaktion zurück." },
  { id: "monster-hunter-expert-strike", name: "Gezielter Meisterschlag", level: 5, kind: "passive",
    description: "Du darfst deinen IN-Modifikator zusätzlich auf Angriffs- und Schadenswürfe mit Waffen und waffenlosen Angriffen anwenden. Du erhältst außerdem eine dritte Waffenmeisterschaft." },
  { id: "monster-hunter-knowledgeable-defense", name: "Sachkundige Verteidigung", level: 9, kind: "passive",
    description: "Zwingt dich ein Kreaturentyp aus deinem Monstergrimoire zu einem Rettungswurf, kannst du stattdessen einen IN-Rettungswurf ablegen." },
];

export const monsterHunterGuilds: CharacterSubclass[] = [
  {
    id: "monster-hunter-carver-guild", name: "Carver-Gilde", source: "grim-hollow-2025", unlockLevel: 3,
    description: "Ein Nahkampfjäger mit Ausbildung in schwerer Rüstung.",
    features: [
      { id: "monster-hunter-carver-guild-armor", name: "Schwere Rüstung", level: 3, kind: "passive", description: "Du erhältst Übung mit schwerer Rüstung." },
      { id: "monster-hunter-carver-guild-close-quarters", name: "Nahkampfdruck", level: 3, kind: "reaction",
        description: "Nach einem Treffer mit einer Nahkampfwaffe kannst du deine Reaktion für +1W6 Schaden derselben Art einsetzen. Der nächste Angriffswurf des Ziels hat Nachteil, falls er vor Beginn deines nächsten Zuges erfolgt." },
      { id: "monster-hunter-carver-guild-true-grit", name: "Wahrer Schneid", level: 7, kind: "passive",
        description: "Du hast Vorteil auf Rettungswürfe, um den Zustand Verängstigt zu vermeiden oder zu beenden, und bist gegen Furcht durch Kreaturentypen deines Monstergrimoires immun. Triffst du als Reaktion, kannst du außerdem den Zustand Verängstigt bei einer sichtbaren Kreatur in 18 m beenden." },
      { id: "monster-hunter-carver-guild-terrorize", name: "Die Schrecken terrorisieren", level: 10, kind: "passive",
        description: "Triffst du eine Kreatur mit einem Angriff als Teil einer Reaktion, kannst du sie zu einem WE-Rettungswurf gegen deinen Monsterjäger-SG zwingen. Bei Misserfolg ist sie bis zum Beginn deines nächsten Zugs vor dir verängstigt." },
    ],
  },
  {
    id: "monster-hunter-devourer-guild", name: "Devourer-Gilde", source: "grim-hollow-2025", unlockLevel: 3,
    description: "Verarbeitet Monsterreste und setzt deren Eigenschaften als vorübergehende Mutationen ein.",
    features: [
      { id: "monster-hunter-devourer-guild-tools", name: "Alchemistische Küche", level: 3, kind: "passive",
        description: "Du erhältst Übung mit Alchemistenausrüstung und Kochutensilien." },
      { id: "monster-hunter-devourer-guild-metabolism", name: "Verwandelnder Stoffwechsel", level: 3, kind: "bonus-action",
        description: "Gewinne höchstens eine Portion pro Kreatur. Die Portion verdirbt bei der nächsten langen Rast. Verzehr kostet eine Bonusaktion und verleiht eine zum Kreaturentyp passende Mutation. Dieselbe Mutation kann nicht gleichzeitig doppelt wirken.",
        resource: { id: "monster-hunter-devourer-portions", name: "Verzehrbare Portionen", amount: "ability-modifier-plus-one", abilityId: "intelligence", recharge: "long-rest" } },
      { id: "monster-hunter-devourer-guild-synchronized-response", name: "Synchronisierte Reaktion", level: 7, kind: "passive",
        description: "Solange eine Mutation aus Verwandelnder Stoffwechsel wirkt, verursacht ein Angriff als Teil deiner Reaktion zusätzlich 1W6 Schaden derselben Art." },
      { id: "monster-hunter-devourer-guild-gnawing-hunger", name: "Nagender Hunger", level: 10, kind: "passive",
        description: "Verursachst du mit einer Nahkampfwaffe oder einem waffenlosen Angriff Schaden, erhältst du temporäre TP in Höhe des halben Schadens; gegen Typen deines Monstergrimoires in Höhe des ganzen Schadens. Anwendungen = IN-Modifikator (mindestens 1), Rückkehr nach kurzer oder langer Rast.",
        resource: { id: "monster-hunter-devourer-gnawing-hunger-uses", name: "Nagender Hunger", amount: "ability-modifier", abilityId: "intelligence", recharge: "short-rest" } },
    ],
  },
  {
    id: "monster-hunter-occultist-guild", name: "Occultist-Gilde", source: "grim-hollow-2025", unlockLevel: 3,
    description: "Verbindet die Monsterjagd mit Magierzaubern auf Basis von Intelligenz.",
    features: [
      { id: "monster-hunter-occultist-guild-arcana", name: "Okkulte Ausbildung", level: 3, kind: "passive", description: "Du erhältst Übung in Arkane Kunde." },
      { id: "monster-hunter-occultist-guild-spellcasting", name: "Zauberwirken", level: 3, kind: "passive",
        description: "Bereite Magierzauber vor. Auf Stufe 3 erhältst du zwei Zaubertricks, drei Zauber und zwei Plätze des 1. Grades." },
      { id: "monster-hunter-occultist-guild-interference", name: "Arkane Störung", level: 3, kind: "reaction",
        description: "Du hast Vorteil bei Rettungswürfen gegen Zauber von Kreaturentypen in deinem Grimoire. Deine Studierte Reaktion kann einem Zauber einer sichtbaren Kreatur in 18 m Reichweite zuvorkommen." },
      { id: "monster-hunter-occultist-guild-mage-hunter", name: "Magierjäger", level: 7, kind: "passive",
        description: "Zauberwirkende Humanoide gelten für dich als Kreaturentyp deines Monstergrimoires. Verletzt du einen passenden Gegner, hat er Nachteil auf den Rettungswurf zur Aufrechterhaltung seiner Konzentration." },
      { id: "monster-hunter-occultist-guild-occult-knowledge", name: "Okkultes Wissen", level: 10, kind: "passive",
        description: "Du kannst vorbereitete Zauber mit Ritualkennzeichnung als Ritual wirken und lernst zwei Ritualzauber deiner Wahl von der Kleriker-, Druiden- oder Magierliste." },
    ],
  },
  {
    id: "monster-hunter-trapper-guild", name: "Trapper-Gilde", source: "grim-hollow-2025", unlockLevel: 3,
    description: "Bereitet die Jagd mit selbstgebauten Fallen und Spezialmunition vor.",
    features: [
      { id: "monster-hunter-trapper-guild-training", name: "Heimlichkeit und Handwerk", level: 3, kind: "passive", description: "Du erhältst Übung in Heimlichkeit und mit Tüftlerwerkzeug." },
      { id: "monster-hunter-trapper-guild-gadgets", name: "Fallengeräte", level: 3, kind: "passive",
        description: "Mit Material und Tüftlerwerkzeug baust du bei einer langen Rast zwei Geräte. Ein zusätzliches Gerät kostet eine Stunde und Material im Wert von 20 GM. Der Geräte-SG beträgt 8 + IN-Modifikator + Übungsbonus. Elementarmunition verursacht bei einem Treffer 2W6 Zusatzschaden der gewählten Art. Die ausgelöste Werfalle verursacht 3W10 Wuchtschaden und wirft das Ziel bei misslungenem GE-Rettungswurf zu Boden. Bei Erfolg verursacht sie halben Schaden." },
      { id: "monster-hunter-trapper-guild-ambusher", name: "Vorteil des Hinterhalts", level: 7, kind: "passive",
        description: "Addiere deinen IN-Modifikator auf Initiativewürfe. Gegner mit einem Kreaturentyp aus deinem Monstergrimoire können dich nicht überraschen." },
      { id: "monster-hunter-trapper-guild-agile-response", name: "Behände Reaktion", level: 10, kind: "reaction",
        description: "Bei einem Nahkampfangriff gegen dich kannst du als Reaktion Nachteil auferlegen und zugleich Studierte Reaktion einsetzen. Danach darfst du dich unabhängig vom Treffer bis zur halben Bewegungsrate bewegen, ohne Gelegenheitsangriffe zu provozieren." },
    ],
  },
];
