import { weapons } from "../equipment/equipment";
import { getWeaponMastery2024 } from "../equipment/weaponMasteries2024";

export type CharacterPathChoiceValue = string | string[];
export type CharacterPathChoices = Record<string, CharacterPathChoiceValue>;

export interface CharacterPathChoiceOption {
  id: string;
  name: string;
  description: string;
  minimumLevel?: number;
  requiredPact?: string;
}

export interface CharacterPathChoiceDefinition {
  id: string;
  classId: string;
  subclassId?: string;
  name: string;
  description: string;
  level: number;
  choose: number;
  options: CharacterPathChoiceOption[];
  requires?: { choiceId: string; optionId: string };
}

const monsterLanguages: ReadonlyArray<readonly [id: string, name: string, ...languages: string[]]> = [
  ["aberration", "Aberration", "Tiefensprache", "Untergemeinsprache"],
  ["beast", "Tier", "Sylvanisch"], ["celestial", "Celestisches Wesen", "Celestisch"],
  ["construct", "Konstrukt", "Drakonisch"], ["dragon", "Drache", "Drakonisch"],
  ["elemental", "Elementar", "Primordial"], ["fey", "Feenwesen", "Sylvanisch"],
  ["fiend", "Unhold", "Abyssisch", "Infernalisch"], ["giant", "Riese", "Riesisch"],
  ["monstrosity", "Monstrosität", "Tiefensprache"], ["ooze", "Schlick", "Tiefensprache", "Untergemeinsprache"],
  ["plant", "Pflanze", "Sylvanisch"], ["undead", "Untoter", "Abyssisch", "Infernalisch"],
] as const;

export const characterPathChoices: CharacterPathChoiceDefinition[] = [
  {
    id: "monster-hunter-grimoire-types", classId: "monster-hunter", name: "Monstergrimoire · Kreaturentypen",
    description: "Wähle zwei Kreaturentypen für dein Grimoire.", level: 1, choose: 2,
    options: monsterLanguages.map(([id, name]) => ({ id, name, description: "Dieser Typ erhält einen Eintrag in deinem Grimoire." })),
  },
  {
    id: "monster-hunter-grimoire-language", classId: "monster-hunter", name: "Monstergrimoire · Sprache",
    description: "Wähle eine Sprache, die zu einem der gewählten Kreaturentypen gehört.", level: 1, choose: 1,
    options: [...new Set(monsterLanguages.flatMap((entry) => entry.slice(2)))].map((name) => ({ id: name, name, description: "Du lernst diese Sprache." })),
  },
  {
    id: "monster-hunter-weapon-mastery", classId: "monster-hunter", name: "Waffenmeisterschaften",
    description: "Wähle vertraute Waffenarten, deren Meisterschaft du einsetzen kannst.", level: 1, choose: 2,
    options: weapons.flatMap((weapon) => {
      const mastery = getWeaponMastery2024(weapon.id);
      return mastery ? [{ id: weapon.id, name: `${weapon.name} · ${mastery}`, description: "Waffenmeisterschaft nach 2024er-Regeln." }] : [];
    }),
  },
  {
    id: "monster-hunter-fighting-style", classId: "monster-hunter", name: "Kampfstil",
    description: "Wähle ein Kampfstiltalent für deinen Monsterjäger.", level: 2, choose: 1,
    options: [
      ["archery", "Bogenschießen"], ["defense", "Verteidigung"], ["dueling", "Duellieren"],
      ["great-weapon-fighting", "Kampf mit großen Waffen"], ["interception", "Abfangen"],
      ["protection", "Schutz"], ["two-weapon-fighting", "Kampf mit zwei Waffen"],
      ["thrown-weapon-fighting", "Kampf mit Wurfwaffen"], ["unarmed-fighting", "Waffenloser Kampf"],
      ["blind-fighting", "Blindkampf"], ["opportunist", "Opportunist"],
    ].map(([id, name]) => ({ id, name, description: "Kampfstiltalent nach 2024er-Regeln und Kampagnenfreigabe." })),
  },

  {
    id: "fighter-fighting-style", classId: "fighter", name: "Kampfstil", description: "Wähle deinen Kampfstil.", level: 1, choose: 1,
    options: [
      { id: "archery", name: "Bogenschießen", description: "+2 auf Angriffswürfe mit Fernkampfwaffen." },
      { id: "defense", name: "Verteidigung", description: "+1 RK, solange du Rüstung trägst." },
      { id: "dueling", name: "Duellieren", description: "+2 Schaden mit einer einhändig geführten Nahkampfwaffe, wenn du keine andere Waffe führst." },
      { id: "great-weapon-fighting", name: "Kampf mit großen Waffen", description: "Bei 1 oder 2 auf einem Schadenswürfel einer zweihändig geführten Nahkampfwaffe darfst du den Würfel neu werfen." },
      { id: "protection", name: "Schutz", description: "Mit Schild kannst du als Reaktion einen Angriff gegen einen nahen Verbündeten erschweren." },
      { id: "two-weapon-fighting", name: "Kampf mit zwei Waffen", description: "Du addierst deinen Attributsmodifikator zum Schaden des zweiten Angriffs." },
    ],
  },
  {
    id: "paladin-fighting-style", classId: "paladin", name: "Kampfstil", description: "Wähle deinen Kampfstil.", level: 2, choose: 1,
    options: [
      { id: "defense", name: "Verteidigung", description: "+1 RK, solange du Rüstung trägst." },
      { id: "dueling", name: "Duellieren", description: "+2 Schaden mit einer einhändig geführten Nahkampfwaffe, wenn du keine andere Waffe führst." },
      { id: "great-weapon-fighting", name: "Kampf mit großen Waffen", description: "Bei 1 oder 2 auf einem Schadenswürfel einer zweihändig geführten Nahkampfwaffe darfst du den Würfel neu werfen." },
      { id: "protection", name: "Schutz", description: "Mit Schild kannst du als Reaktion einen Angriff gegen einen nahen Verbündeten erschweren." },
    ],
  },
  {
    id: "ranger-fighting-style", classId: "ranger", name: "Kampfstil", description: "Wähle deinen Kampfstil.", level: 2, choose: 1,
    options: [
      { id: "archery", name: "Bogenschießen", description: "+2 auf Angriffswürfe mit Fernkampfwaffen." },
      { id: "defense", name: "Verteidigung", description: "+1 RK, solange du Rüstung trägst." },
      { id: "dueling", name: "Duellieren", description: "+2 Schaden mit einer einhändig geführten Nahkampfwaffe, wenn du keine andere Waffe führst." },
      { id: "two-weapon-fighting", name: "Kampf mit zwei Waffen", description: "Du addierst deinen Attributsmodifikator zum Schaden des zweiten Angriffs." },
    ],
  },
  {
    id: "bard-expertise", classId: "bard", name: "Expertise", description: "Wähle zwei Fertigkeiten, in denen du bereits geübt bist.", level: 3, choose: 2,
    options: [
      ["acrobatics","Akrobatik"],["animal-handling","Mit Tieren umgehen"],["arcana","Arkane Kunde"],["athletics","Athletik"],["deception","Täuschen"],["history","Geschichte"],["insight","Motiv erkennen"],["intimidation","Einschüchtern"],["investigation","Nachforschungen"],["medicine","Heilkunde"],["nature","Naturkunde"],["perception","Wahrnehmung"],["performance","Auftreten"],["persuasion","Überzeugen"],["religion","Religion"],["sleight-of-hand","Fingerfertigkeit"],["stealth","Heimlichkeit"],["survival","Überlebenskunst"]
    ].map(([id,name]) => ({ id, name, description: "Dein Übungsbonus wird für diese Fertigkeit verdoppelt." })),
  },
  {
    id: "rogue-expertise", classId: "rogue", name: "Expertise", description: "Wähle zwei deiner Fertigkeitsübungen oder eine Fertigkeit und Diebeswerkzeug.", level: 1, choose: 2,
    options: [
      ["acrobatics","Akrobatik"],["athletics","Athletik"],["deception","Täuschen"],["insight","Motiv erkennen"],["intimidation","Einschüchtern"],["investigation","Nachforschungen"],["perception","Wahrnehmung"],["performance","Auftreten"],["persuasion","Überzeugen"],["sleight-of-hand","Fingerfertigkeit"],["stealth","Heimlichkeit"],["thieves-tools","Diebeswerkzeug"]
    ].map(([id,name]) => ({ id, name, description: "Dein Übungsbonus wird für diese Übung verdoppelt." })),
  },
  {
    id: "ranger-favored-enemy", classId: "ranger", name: "Erzfeind", description: "Wähle einen Kreaturentyp; bei Humanoiden wählst du nach 2014 zwei Völker derselben Kategorie am Spieltisch.", level: 1, choose: 1,
    options: ["Aberrationen","Bestien","Celestische","Konstrukte","Drachen","Elementare","Feenwesen","Unholde","Riesen","Monstrositäten","Schlicke","Pflanzen","Untote","Humanoide (zwei Völker)"].map((name) => ({ id: name.toLowerCase().replaceAll(" ","-").replaceAll("(","").replaceAll(")","").replaceAll("ö","oe"), name, description: "Bevorzugter Feind nach den D&D-2014-Regeln." })),
  },
  {
    id: "ranger-favored-terrain", classId: "ranger", name: "Bevorzugtes Gelände", description: "Wähle eine Geländeart für Natürlicher Entdecker.", level: 1, choose: 1,
    options: ["Arktis","Küste","Wüste","Wald","Grasland","Gebirge","Sumpf","Unterreich"].map((name) => ({ id: name.toLowerCase().replaceAll("ü","ue"), name, description: "In diesem Gelände gelten deine Vorteile von Natürlicher Entdecker." })),
  },
  {
    id: "sorcerer-metamagic", classId: "sorcerer", name: "Metamagie", description: "Wähle zwei Metamagie-Optionen.", level: 3, choose: 2,
    options: [
      { id:"careful", name:"Sorgfältiger Zauber", description:"Schütze ausgewählte Kreaturen vor dem vollen Effekt eigener Rettungswurf-Zauber." },
      { id:"distant", name:"Distanzierter Zauber", description:"Verdopple Reichweite oder mache Berührungszauber auf 9 m möglich." },
      { id:"empowered", name:"Mächtiger Zauber", description:"Würfle eine begrenzte Zahl von Schadenswürfeln neu." },
      { id:"extended", name:"Ausgedehnter Zauber", description:"Verdopple die Wirkungsdauer eines geeigneten Zaubers." },
      { id:"heightened", name:"Erhöhter Zauber", description:"Gib 3 Zaubereipunkte aus, damit ein Ziel beim ersten Rettungswurf Nachteil hat." },
      { id:"quickened", name:"Beschleunigter Zauber", description:"Wirke einen Zauber mit 1-Aktion-Zeit als Bonusaktion." },
      { id:"subtle", name:"Subtiler Zauber", description:"Wirke ohne verbale und somatische Komponenten." },
      { id:"twinned", name:"Zwillingszauber", description:"Ziele mit einem geeigneten Einzelzielzauber zusätzlich auf eine zweite Kreatur." },
    ],
  },
  {
    id: "warlock-invocations", classId: "warlock", name: "Unheimliche Anrufungen", description: "Wähle Anrufungen, deren Stufen- und Paktvoraussetzungen du erfüllst.", level: 2, choose: 2,
    options: [
      {id:"agonizing-blast",name:"Qualvoller Strahl",description:"Addiere deinen CH-Modifikator zum Schaden von Unheimlicher Strahl."},
      {id:"armor-of-shadows",name:"Rüstung der Schatten",description:"Du kannst Magierrüstung beliebig oft auf dich selbst wirken."},
      {id:"beast-speech",name:"Sprache der Tiere",description:"Du kannst Mit Tieren sprechen beliebig oft wirken."},
      {id:"beguiling-influence",name:"Betörender Einfluss",description:"Du erhältst Übung in Täuschen und Überzeugen."},
      {id:"devils-sight",name:"Teufelssicht",description:"Du siehst 36 m weit normal in magischer und nichtmagischer Dunkelheit."},
      {id:"eldritch-sight",name:"Unheimliche Sicht",description:"Du kannst Magie entdecken beliebig oft wirken."},
      {id:"eldritch-spear",name:"Unheimlicher Speer",description:"Unheimlicher Strahl erhält 90 m Reichweite."},
      {id:"eyes-rune-keeper",name:"Augen des Runenbewahrers",description:"Du kannst jede Schrift lesen."},
      {id:"fiendish-vigor",name:"Teuflische Vitalität",description:"Du kannst Falsches Leben als Zauber des 1. Grades beliebig oft auf dich wirken."},
      {id:"gaze-two-minds",name:"Blick zweier Geister",description:"Du kannst deine Sinne mit einem bereitwilligen Humanoiden verbinden."},
      {id:"mask-many-faces",name:"Maske der vielen Gesichter",description:"Du kannst Selbstverkleidung beliebig oft wirken."},
      {id:"misty-visions",name:"Neblige Visionen",description:"Du kannst Lautloses Trugbild beliebig oft wirken."},
      {id:"repelling-blast",name:"Abstoßender Strahl",description:"Treffer mit Unheimlicher Strahl können das Ziel 3 m wegstoßen."},
      {id:"thief-five-fates",name:"Dieb der fünf Schicksale",description:"Du kannst einmal pro langer Rast Verderben mit einem Paktplatz wirken."},
      {id:"book-of-ancient-secrets",name:"Buch der uralten Geheimnisse",description:"Dein Buch der Schatten kann Ritualzauber aufnehmen.",minimumLevel:3,requiredPact:"tome"},
      {id:"voice-of-the-chain-master",name:"Stimme des Kettenmeisters",description:"Du kannst auf derselben Ebene mit deinem Vertrauten kommunizieren und durch ihn sprechen.",minimumLevel:3,requiredPact:"chain"},
      {id:"one-with-shadows",name:"Eins mit den Schatten",description:"In dämmrigem Licht oder Dunkelheit kannst du dich als Aktion unsichtbar machen, bis du dich bewegst oder eine Aktion oder Reaktion einsetzt.",minimumLevel:5},
      {id:"sign-of-ill-omen",name:"Zeichen des schlechten Omens",description:"Du kannst einmal pro langer Rast Fluch mit einem Paktplatz wirken.",minimumLevel:5},
      {id:"mire-the-mind",name:"Den Geist lähmen",description:"Du kannst einmal pro langer Rast Verlangsamen mit einem Paktplatz wirken.",minimumLevel:5},
      {id:"thirsting-blade",name:"Dürstende Klinge",description:"Mit der Paktwaffe kannst du bei deiner Angriffsaktion zweimal angreifen.",minimumLevel:5,requiredPact:"blade"},
    ],
  },
  {
    id: "warlock-pact-boon", classId: "warlock", name: "Paktsegen", description: "Wähle den Paktsegen deines Schutzherrn.", level: 3, choose: 1,
    options: [
      {id:"chain",name:"Pakt der Kette",description:"Du lernst Vertrauten finden als Ritual und erhältst zusätzliche Vertrautenformen."},
      {id:"blade",name:"Pakt der Klinge",description:"Du kannst eine Paktwaffe erschaffen oder eine magische Waffe an dich binden."},
      {id:"tome",name:"Pakt des Buches",description:"Du erhältst ein Buch der Schatten mit drei Zaubertricks aus beliebigen Listen."},
    ],
  },

  {
    id: "warlock-tome-cantrips", classId: "warlock", name: "Buch der Schatten · Zaubertricks", description: "Wähle drei Zaubertricks aus beliebigen Klassenlisten. Sie gelten für dich als Hexenmeisterzaubertricks.", level: 3, choose: 3,
    requires: { choiceId: "warlock-pact-boon", optionId: "tome" },
    options: [
      ["acid-splash","Säurespritzer"],["chill-touch","Kalte Hand"],["eldritch-blast","Schauriger Strahl"],["fire-bolt","Feuerpfeil"],["guidance","Führung"],["light","Licht"],["mage-hand","Magierhand"],["minor-illusion","Einfache Illusion"],["poison-spray","Gift versprühen"],["produce-flame","Flammen erzeugen"],["ray-of-frost","Kältestrahl"],["sacred-flame","Heilige Flamme"],["shillelagh","Shillelagh"],["spare-the-dying","Verschonung der Sterbenden"],["thaumaturgy","Thaumaturgie"],["vicious-mockery","Bösartiger Spott"]
    ].map(([id,name]) => ({ id, name, description: "Zaubertrick im Buch der Schatten." })),
  },
  {
    id: "lore-bonus-skills",
    classId: "bard",
    subclassId: "college-of-lore",
    name: "Zusätzliche Übungen",
    description: "Wähle drei zusätzliche Fertigkeiten für das Kolleg des Wissens.",
    level: 3,
    choose: 3,
    options: [
      ["acrobatics", "Akrobatik"], ["animal-handling", "Mit Tieren umgehen"], ["arcana", "Arkane Kunde"],
      ["athletics", "Athletik"], ["deception", "Täuschen"], ["history", "Geschichte"],
      ["insight", "Motiv erkennen"], ["intimidation", "Einschüchtern"], ["investigation", "Nachforschungen"],
      ["medicine", "Heilkunde"], ["nature", "Naturkunde"], ["perception", "Wahrnehmung"],
      ["performance", "Auftreten"], ["persuasion", "Überzeugen"], ["religion", "Religion"],
      ["sleight-of-hand", "Fingerfertigkeit"], ["stealth", "Heimlichkeit"], ["survival", "Überlebenskunst"],
    ].map(([id, name]) => ({ id, name, description: "Du erhältst Übung in dieser Fertigkeit." })),
  },
  {
    id: "beast-master-companion",
    classId: "ranger",
    subclassId: "beast-master",
    name: "Tierischer Gefährte",
    description: "Wähle einen gängigen regelkonformen Gefährten (HG 1/4 oder niedriger, höchstens mittelgroß).",
    level: 3,
    choose: 1,
    options: [
      { id: "wolf", name: "Wolf", description: "Mittelgroßer Tiergefährte; klassischer Nahkampf- und Rudelpartner." },
      { id: "panther", name: "Panther", description: "Mittelgroßer, schneller und heimlicher Tiergefährte." },
      { id: "mastiff", name: "Mastiff", description: "Mittelgroßer, zuverlässiger Spür- und Kampfgefährte." },
      { id: "giant-badger", name: "Riesendachs", description: "Mittelgroßer grabender Tiergefährte." },
      { id: "giant-frog", name: "Riesenfrosch", description: "Mittelgroßer amphibischer Gefährte mit Greifbiss." },
      { id: "giant-poisonous-snake", name: "Riesengiftschlange", description: "Mittelgroßer Gefährte mit Giftbiss." },
      { id: "pteranodon", name: "Pteranodon", description: "Mittelgroßer fliegender Gefährte." },
    ],
  },
  {
    id: "battle-master-artisans-tool",
    classId: "fighter",
    subclassId: "battle-master",
    name: "Kriegsschüler · Handwerkszeug",
    description: "Wähle ein Handwerkszeug, in dem du durch Kriegsschüler Übung erhältst.",
    level: 3,
    choose: 1,
    options: [
      ["alchemist-supplies", "Alchemistenausrüstung"],
      ["brewer-supplies", "Brauerwerkzeug"],
      ["calligrapher-supplies", "Kalligrafenwerkzeug"],
      ["carpenter-tools", "Zimmermannswerkzeug"],
      ["cartographer-tools", "Kartografenwerkzeug"],
      ["cobbler-tools", "Schusterwerkzeug"],
      ["cook-utensils", "Kochutensilien"],
      ["glassblower-tools", "Glasbläserwerkzeug"],
      ["jeweler-tools", "Juwelierwerkzeug"],
      ["leatherworker-tools", "Ledererwerkzeug"],
      ["mason-tools", "Maurerwerkzeug"],
      ["painter-supplies", "Malerbedarf"],
      ["potter-tools", "Töpferwerkzeug"],
      ["smith-tools", "Schmiedewerkzeug"],
      ["tinker-tools", "Tüftlerwerkzeug"],
      ["weaver-tools", "Weberwerkzeug"],
      ["woodcarver-tools", "Holzschnitzerwerkzeug"],
    ].map(([id, name]) => ({ id, name, description: "Du erhältst Übung mit diesem Handwerkszeug." })),
  },
  {
    id: "samurai-bonus-proficiency",
    classId: "fighter",
    subclassId: "samurai",
    name: "Zusätzliche Übung",
    description: "Wähle Geschichte, Motiv erkennen, Auftreten oder Überzeugen; alternativ lernst du eine Sprache deiner Wahl.",
    level: 3,
    choose: 1,
    options: [
      { id: "history", name: "Geschichte", description: "Du erhältst Übung in Geschichte." },
      { id: "insight", name: "Motiv erkennen", description: "Du erhältst Übung in Motiv erkennen." },
      { id: "performance", name: "Auftreten", description: "Du erhältst Übung in Auftreten." },
      { id: "persuasion", name: "Überzeugen", description: "Du erhältst Übung in Überzeugen." },
      { id: "language", name: "Sprache nach Wahl", description: "Du lernst eine zusätzliche Sprache deiner Wahl." },
    ],
  },
  {
    id: "totem-spirit",
    classId: "barbarian",
    subclassId: "totem-warrior",
    name: "Totemgeist",
    description: "Wähle das Tier, dessen Geist deinen Kampfrausch auf Stufe 3 prägt.",
    level: 3,
    choose: 1,
    options: [
      { id: "bear", name: "Bär", description: "Im Kampfrausch erhältst du Resistenz gegen allen Schaden außer psychischem Schaden." },
      { id: "eagle", name: "Adler", description: "Im Kampfrausch provozieren Gelegenheitsangriffe gegen dich Nachteil; außerdem kannst du Sprinten als Bonusaktion nutzen." },
      { id: "wolf", name: "Wolf", description: "Im Kampfrausch haben Verbündete Vorteil auf Nahkampfangriffe gegen feindliche Kreaturen innerhalb von 1,5 m um dich." },
    ],
  },
  {
    id: "storm-aura-environment",
    classId: "barbarian",
    subclassId: "storm-herald",
    name: "Sturmumgebung",
    description: "Lege fest, welche Landschaft deine Sturmaura formt.",
    level: 3,
    choose: 1,
    options: [
      { id: "desert", name: "Wüste", description: "Deine Aura kann Kreaturen in ihr Feuerschaden zufügen." },
      { id: "sea", name: "Meer", description: "Deine Aura kann eine Kreatur in ihr mit Blitzschaden treffen." },
      { id: "tundra", name: "Tundra", description: "Deine Aura kann ausgewählten Kreaturen in ihr temporäre Trefferpunkte verleihen." },
    ],
  },
  {
    id: "circle-land",
    classId: "druid",
    subclassId: "circle-of-the-land",
    name: "Landkreis",
    description: "Deine mystische Verbindung zu einer Landschaft bestimmt deine Zirkelzauber.",
    level: 3,
    choose: 1,
    options: [
      { id: "arctic", name: "Arktis", description: "Zirkelzauber ab Stufe 3: Person festhalten, Stachelwuchs." },
      { id: "coast", name: "Küste", description: "Zirkelzauber ab Stufe 3: Spiegelbilder, Nebelschritt." },
      { id: "desert", name: "Wüste", description: "Zirkelzauber ab Stufe 3: Verschwimmen, Stille." },
      { id: "forest", name: "Wald", description: "Zirkelzauber ab Stufe 3: Rindenhaut, Spinnenklettern." },
      { id: "grassland", name: "Grasland", description: "Zirkelzauber ab Stufe 3: Unsichtbarkeit, Spurloses Gehen." },
      { id: "mountain", name: "Gebirge", description: "Zirkelzauber ab Stufe 3: Spinnenklettern, Stachelwuchs." },
      { id: "swamp", name: "Sumpf", description: "Zirkelzauber ab Stufe 3: Dunkelheit, Melfs Säurepfeil." },
      { id: "underdark", name: "Unterreich", description: "Zirkelzauber ab Stufe 3: Spinnenklettern, Spinnennetz." },
    ],
  },
  {
    id: "battle-master-maneuvers",
    classId: "fighter",
    subclassId: "battle-master",
    name: "Manöver",
    description: "Wähle drei Manöver für deine Kampfüberlegenheit.",
    level: 3,
    choose: 3,
    options: [
      { id: "commanders-strike", name: "Angriff des Kommandanten", description: "Verzichte auf einen Angriff und einen Überlegenheitswürfel, damit ein Verbündeter als Reaktion angreifen kann." },
      { id: "disarming-attack", name: "Entwaffnender Angriff", description: "Füge den Überlegenheitswürfel zum Schaden hinzu und zwinge das Ziel bei misslungenem ST-Rettungswurf, einen Gegenstand fallen zu lassen." },
      { id: "distracting-strike", name: "Ablenkender Schlag", description: "Füge den Überlegenheitswürfel zum Schaden hinzu; der nächste Angriff eines Verbündeten gegen das Ziel erhält Vorteil." },
      { id: "evasive-footwork", name: "Ausweichende Beinarbeit", description: "Addiere beim Bewegen den Überlegenheitswürfel vorübergehend auf deine RK." },
      { id: "feinting-attack", name: "Finte", description: "Nutze eine Bonusaktion und einen Überlegenheitswürfel für Vorteil auf deinen nächsten Angriff sowie zusätzlichen Schaden." },
      { id: "goading-attack", name: "Reizender Angriff", description: "Füge Zusatzschaden zu und erschwere dem Ziel Angriffe gegen andere Kreaturen." },
      { id: "lunging-attack", name: "Ausfallangriff", description: "Erhöhe für einen Nahkampfangriff deine Reichweite und füge den Überlegenheitswürfel zum Schaden hinzu." },
      { id: "maneuvering-attack", name: "Manövrierangriff", description: "Füge Zusatzschaden zu und ermögliche einem Verbündeten sichere Bewegung als Reaktion." },
      { id: "menacing-attack", name: "Bedrohlicher Angriff", description: "Füge Zusatzschaden zu und kann das Ziel bei misslungenem WE-Rettungswurf verängstigen." },
      { id: "parry", name: "Parade", description: "Reduziere als Reaktion erlittenen Nahkampfschaden um Überlegenheitswürfel + GE-Modifikator." },
      { id: "precision-attack", name: "Präzisionsangriff", description: "Addiere den Überlegenheitswürfel auf einen Angriffswurf." },
      { id: "pushing-attack", name: "Stoßangriff", description: "Füge Zusatzschaden zu und kann ein großes oder kleineres Ziel bis zu 4,5 m wegstoßen." },
      { id: "rally", name: "Sammeln", description: "Verleihe einem Verbündeten als Bonusaktion temporäre Trefferpunkte in Höhe von Überlegenheitswürfel + CH-Modifikator." },
      { id: "riposte", name: "Riposte", description: "Verfehlt dich eine Kreatur im Nahkampf, kannst du als Reaktion zurückschlagen und Zusatzschaden verursachen." },
      { id: "sweeping-attack", name: "Weitreichender Angriff", description: "Übertrage einen Teil deines Nahkampfschadens auf eine zweite Kreatur neben dem ursprünglichen Ziel." },
      { id: "trip-attack", name: "Zu-Fall-bringender Angriff", description: "Füge Zusatzschaden zu und kann ein großes oder kleineres Ziel bei misslungenem ST-Rettungswurf zu Boden werfen." },
    ],
  },
  {
    id: "hunter-prey",
    classId: "ranger",
    subclassId: "hunter",
    name: "Beute des Jägers",
    description: "Wähle eine offensive Spezialisierung für deinen Jäger.",
    level: 3,
    choose: 1,
    options: [
      { id: "colossus-slayer", name: "Koloss-Schlächter", description: "Einmal pro Zug verursachst du zusätzlich 1W8 Schaden, wenn das Ziel bereits Trefferpunkte verloren hat." },
      { id: "giant-killer", name: "Riesentöter", description: "Greift dich eine große oder größere Kreatur innerhalb von 1,5 m an, kannst du sie als Reaktion angreifen." },
      { id: "horde-breaker", name: "Hordenbrecher", description: "Einmal pro Zug kannst du einen zusätzlichen Angriff gegen eine zweite Kreatur nahe deinem ursprünglichen Ziel ausführen." },
    ],
  },
  {
    id: "draconic-ancestry",
    classId: "sorcerer",
    subclassId: "draconic-bloodline",
    name: "Drachenahne",
    description: "Wähle die Drachenart deiner Blutlinie. Sie legt den zugehörigen Schadenstyp für spätere Merkmale fest.",
    level: 1,
    choose: 1,
    options: [
      { id: "black", name: "Schwarz · Säure", description: "Schadensart: Säure." },
      { id: "blue", name: "Blau · Blitz", description: "Schadensart: Blitz." },
      { id: "brass", name: "Messing · Feuer", description: "Schadensart: Feuer." },
      { id: "bronze", name: "Bronze · Blitz", description: "Schadensart: Blitz." },
      { id: "copper", name: "Kupfer · Säure", description: "Schadensart: Säure." },
      { id: "gold", name: "Gold · Feuer", description: "Schadensart: Feuer." },
      { id: "green", name: "Grün · Gift", description: "Schadensart: Gift." },
      { id: "red", name: "Rot · Feuer", description: "Schadensart: Feuer." },
      { id: "silver", name: "Silber · Kälte", description: "Schadensart: Kälte." },
      { id: "white", name: "Weiß · Kälte", description: "Schadensart: Kälte." },
    ],
  },
];

export function getCharacterPathChoices(classId: string, subclassId?: string, level = 20, selectedChoices?: CharacterPathChoices) {
  return characterPathChoices.filter((choice) => {
    if (choice.classId !== classId || (choice.subclassId && choice.subclassId !== subclassId) || choice.level > level) return false;
    if (!choice.requires) return true;
    const raw = selectedChoices?.[choice.requires.choiceId];
    const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
    return values.includes(choice.requires.optionId);
  }).map((choice) => {
    if (choice.id === "monster-hunter-weapon-mastery") return { ...choice, choose: level >= 17 ? 5 : level >= 11 ? 4 : level >= 5 ? 3 : 2 };
    if (choice.id === "monster-hunter-grimoire-language") {
      const rawTypes = selectedChoices?.["monster-hunter-grimoire-types"];
      const types = Array.isArray(rawTypes) ? rawTypes : rawTypes ? [rawTypes] : [];
      const languages = new Set(monsterLanguages.filter(([id]) => types.includes(id)).flatMap((entry) => entry.slice(2)));
      return { ...choice, options: choice.options.filter((option) => languages.has(option.id)) };
    }
    if (choice.id !== "warlock-invocations") return choice;
    const pact = selectedChoices?.["warlock-pact-boon"];
    return {
      ...choice,
      choose: level >= 5 ? 3 : 2,
      options: choice.options.filter((option) =>
        (option.minimumLevel ?? 2) <= level && (!option.requiredPact || option.requiredPact === pact)),
    };
  });
}

export function isCharacterPathChoiceComplete(
  definition: CharacterPathChoiceDefinition,
  value: CharacterPathChoiceValue | undefined,
): boolean {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const allowed = new Set(definition.options.map((option) => option.id));
  return values.length === definition.choose && new Set(values).size === values.length && values.every((entry) => allowed.has(entry));
}

export function getCharacterPathChoiceSummary(
  choices: CharacterPathChoices | undefined,
): Array<{ id: string; name: string; selections: CharacterPathChoiceOption[] }> {
  if (!choices) return [];

  return characterPathChoices.flatMap((definition) => {
    const raw = choices[definition.id];
    const ids = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const selections = ids
      .map((id) => definition.options.find((option) => option.id === id))
      .filter((option): option is CharacterPathChoiceOption => Boolean(option));

    return selections.length > 0 ? [{ id: definition.id, name: definition.name, selections }] : [];
  });
}
