import type {
  AbilityId,
} from "../core";

import type {
  CompendiumEntityBase,
  CompendiumSource,
} from "../shared";

export type ClassSource =
  Extract<
    CompendiumSource,
    | "core"
    | "srd-2024"
    | "grim-hollow-2025"
  >;

export interface CharacterSubclass
  extends Omit<
    CompendiumEntityBase,
    "source"
  > {
  source: ClassSource;
}

export interface CharacterClass
  extends Omit<
    CompendiumEntityBase,
    "source"
  > {
  source: ClassSource;

  hitDie: 6 | 8 | 10 | 12;

  primaryAbilities: AbilityId[];

  savingThrows: AbilityId[];

  armorProficiencies: string[];

  weaponProficiencies: string[];

  toolProficiencies: string[];

  spellcasting: boolean;

  subclasses: CharacterSubclass[];
}

export const classes: CharacterClass[] = [
  {
    id: "barbarian",

    name: "Barbar",

    description:
      "Ein kompromissloser Frontkämpfer, der rohe Kraft und ungezähmten Zorn in den Kampf trägt.",

    hitDie: 12,

    primaryAbilities: [
      "strength",
      "constitution",
    ],

    savingThrows: [
      "strength",
      "constitution",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
      "Mittlere Rüstung",
      "Schilde",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
      "Kriegswaffen",
    ],

    toolProficiencies: [],

    spellcasting: false,

    source: "core",

    subclasses: [
      {
        id: "berserker",

        name: "Berserker",

        description:
          "Ein Pfad der ungezügelten Gewalt und völligen Hingabe an den Kampfrausch.",

        source: "core",
      },
      {
        id: "totem-warrior",

        name: "Totemkrieger",

        description:
          "Ein spiritueller Pfad, der tierische Vorbilder und Ahnenkräfte vereint.",

        source: "core",
      },
      {
        id: "ancestral-guardian",

        name: "Ahnenwächter",

        description:
          "Ein Krieger, der im Kampf von den Geistern seiner Vorfahren begleitet wird.",

        source: "core",
      },
      {
        id: "beast",

        name: "Bestie",

        description:
          "Ein Pfad, auf dem sich der eigene Körper in eine natürliche Waffe verwandelt.",

        source: "core",
      },
      {
        id: "storm-herald",

        name: "Sturmbote",

        description:
          "Ein Barbar, dessen Zorn die Kraft extremer Landschaften entfesselt.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "path-of-the-fractured",

        name: "Pfad des Zersplitterten",

        description:
          "Ein Barbar mit gespaltener Persönlichkeit und wechselnden Kampfaspekten.",

        source: "grim-hollow-2025",
      },
      {
        id: "path-of-the-primal-spirit",

        name: "Pfad des Urgeistes",

        description:
          "Ein Barbar, der einen spektralen Verbündeten beschwört und gemeinsam mit ihm kämpft.",

        source: "grim-hollow-2025",
      },
      {
        id: "path-of-the-wrathful-dead",

        name: "Pfad der zornigen Toten",

        description:
          "Ein Barbar, der die Macht ruheloser Toter durch seinen Kampfrausch kanalisiert.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "bard",

    name: "Barde",

    description:
      "Ein vielseitiger Künstler, dessen Worte, Musik und Geschichten selbst Magie formen können.",

    hitDie: 8,

    primaryAbilities: [
      "charisma",
    ],

    savingThrows: [
      "dexterity",
      "charisma",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
      "Handarmbrüste",
      "Langschwerter",
      "Rapiere",
      "Kurzschwerter",
    ],

    toolProficiencies: [
      "Drei Musikinstrumente nach Wahl",
    ],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "college-of-lore",

        name: "Kolleg des Wissens",

        description:
          "Ein Pfad für Gelehrte, Redner und Sammler vergessener Geheimnisse.",

        source: "core",
      },
      {
        id: "college-of-valor",

        name: "Kolleg der Tapferkeit",

        description:
          "Ein kriegerischer Barde, der Verbündete mit Taten und Liedern antreibt.",

        source: "core",
      },
      {
        id: "college-of-whispers",

        name: "Kolleg des Flüsterns",

        description:
          "Ein düsterer Pfad aus Geheimnissen, Furcht und gezielter Manipulation.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "college-of-adventurers",

        name: "Kolleg der Abenteurer",

        description:
          "Ein vielseitiges Kolleg, das praktisches Abenteuerwissen und Anpassungsfähigkeit lehrt.",

        source: "grim-hollow-2025",
      },
      {
        id: "college-of-fools",

        name: "Kolleg der Narren",

        description:
          "Ein Kolleg für Spott, Ablenkung und tödliches Gelächter.",

        source: "grim-hollow-2025",
      },
      {
        id: "college-of-dirges",

        name: "Kolleg der Totenklagen",

        description:
          "Ein düsteres Kolleg der Totenlieder und der Verbindung zu Verstorbenen.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "cleric",

    name: "Kleriker",

    description:
      "Ein geweihter Diener höherer Mächte, der Glauben, Schutz und göttliche Magie verbindet.",

    hitDie: 8,

    primaryAbilities: [
      "wisdom",
    ],

    savingThrows: [
      "wisdom",
      "charisma",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
      "Mittlere Rüstung",
      "Schilde",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
    ],

    toolProficiencies: [],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "life-domain",

        name: "Domäne des Lebens",

        description:
          "Eine göttliche Ausrichtung auf Heilung, Schutz und die Bewahrung des Lebens.",

        source: "core",
      },
      {
        id: "light-domain",

        name: "Domäne des Lichts",

        description:
          "Eine strahlende Tradition, die Dunkelheit und Verderbnis bekämpft.",

        source: "core",
      },
      {
        id: "war-domain",

        name: "Domäne des Krieges",

        description:
          "Eine kämpferische Ausrichtung für Priester, die ihren Glauben mit Waffen verteidigen.",

        source: "core",
      },
      {
        id: "grave-domain",

        name: "Domäne des Grabes",

        description:
          "Eine düstere Lehre über Tod, Übergang und das Gleichgewicht zwischen Leben und Sterben.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "eldritch-domain",

        name: "Unheimliche Domäne",

        description:
          "Eine Domäne unheimlicher und gottestötender Mächte.",

        source: "grim-hollow-2025",
      },
      {
        id: "inquisition-domain",

        name: "Domäne der Inquisition",

        description:
          "Eine Domäne für das Aufspüren und Vernichten von Magie und Häresie.",

        source: "grim-hollow-2025",
      },
      {
        id: "purification-domain",

        name: "Domäne der Läuterung",

        description:
          "Eine Domäne der Heilung und Läuterung durch Schmerz.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "druid",

    name: "Druide",

    description:
      "Ein Hüter der Wildnis, der uralte Naturkräfte, Tiere und Wandel miteinander verbindet.",

    hitDie: 8,

    primaryAbilities: [
      "wisdom",
    ],

    savingThrows: [
      "intelligence",
      "wisdom",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
      "Mittlere Rüstung",
      "Schilde",
    ],

    weaponProficiencies: [
      "Knüppel",
      "Dolche",
      "Wurfpfeile",
      "Wurfspeere",
      "Streitkolben",
      "Kampfstäbe",
      "Krummsäbel",
      "Sicheln",
      "Schleudern",
      "Speere",
    ],

    toolProficiencies: [
      "Kräuterkundeausrüstung",
    ],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "circle-of-the-land",

        name: "Zirkel des Landes",

        description:
          "Ein naturverbundener Pfad mit starker Bindung an eine bestimmte Region.",

        source: "core",
      },
      {
        id: "circle-of-the-moon",

        name: "Zirkel des Mondes",

        description:
          "Ein kämpferischer Zirkel, der die Tiergestalt in den Mittelpunkt stellt.",

        source: "core",
      },
      {
        id: "circle-of-spores",

        name: "Zirkel der Sporen",

        description:
          "Eine düstere Tradition über Verfall, Pilze und den Kreislauf des Lebens.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "circle-of-blood",

        name: "Zirkel des Blutes",

        description:
          "Ein Druidenzirkel, der Blut als Quelle naturmagischer Macht verwendet.",

        source: "grim-hollow-2025",
      },
      {
        id: "circle-of-entropy",

        name: "Zirkel der Entropie",

        description:
          "Ein Zirkel, der Verfall, Auflösung und Entropie kontrolliert.",

        source: "grim-hollow-2025",
      },
      {
        id: "circle-of-mutation",

        name: "Zirkel der Mutation",

        description:
          "Ein Zirkel kontrollierter körperlicher Veränderungen und Anpassungen.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "fighter",

    name: "Kämpfer",

    description:
      "Ein disziplinierter Waffenmeister, der durch Ausbildung, Ausdauer und Erfahrung jede Kampfsituation beherrscht.",

    hitDie: 10,

    primaryAbilities: [
      "strength",
      "dexterity",
    ],

    savingThrows: [
      "strength",
      "constitution",
    ],

    armorProficiencies: [
      "Alle Rüstungen",
      "Schilde",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
      "Kriegswaffen",
    ],

    toolProficiencies: [],

    spellcasting: false,

    source: "core",

    subclasses: [
      {
        id: "champion",

        name: "Champion",

        description:
          "Ein körperlich überragender Kämpfer mit direktem und zuverlässigem Spielstil.",

        source: "core",
      },
      {
        id: "battle-master",

        name: "Kampfmeister",

        description:
          "Ein taktischer Krieger, der Manöver und Kontrolle über rohe Gewalt stellt.",

        source: "core",
      },
      {
        id: "eldritch-knight",

        name: "Arkaner Ritter",

        description:
          "Ein Kämpfer, der Waffenführung mit begrenzter arkaner Magie verbindet.",

        source: "core",
      },
      {
        id: "samurai",

        name: "Samurai",

        description:
          "Ein entschlossener Duellant, der Disziplin und mentale Stärke verkörpert.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "bulwark-warrior",

        name: "Bollwerk-Krieger",

        description:
          "Ein defensiver Kämpfer, der als Schutzwall dient und das Schlachtfeld kontrolliert.",

        source: "grim-hollow-2025",
      },
      {
        id: "living-crucible",

        name: "Lebender Schmelztiegel",

        description:
          "Ein Kämpfer, der seinen Körper durch alchemistische Mittel verbessert.",

        source: "grim-hollow-2025",
      },
      {
        id: "night-watchman",

        name: "Nachtwächter",

        description:
          "Ein spezialisierter Jäger von Kreaturen der Nacht.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "monk",

    name: "Mönch",

    description:
      "Ein disziplinierter Kämpfer, der Körper, Geist und innere Energie zu einer einzigen Waffe formt.",

    hitDie: 8,

    primaryAbilities: [
      "dexterity",
      "wisdom",
    ],

    savingThrows: [
      "strength",
      "dexterity",
    ],

    armorProficiencies: [],

    weaponProficiencies: [
      "Einfache Waffen",
      "Kurzschwerter",
    ],

    toolProficiencies: [
      "Ein Handwerkszeug oder Musikinstrument nach Wahl",
    ],

    spellcasting: false,

    source: "core",

    subclasses: [
      {
        id: "way-of-the-open-hand",

        name: "Weg der offenen Hand",

        description:
          "Ein klassischer Pfad für Kontrolle, Bewegung und waffenlosen Kampf.",

        source: "core",
      },
      {
        id: "way-of-shadow",

        name: "Weg des Schattens",

        description:
          "Ein heimlicher Pfad aus Dunkelheit, Täuschung und lautloser Bewegung.",

        source: "core",
      },
      {
        id: "way-of-the-long-death",

        name: "Weg des langen Todes",

        description:
          "Eine düstere Schule über Furcht, Sterblichkeit und die Grenzen des Körpers.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "way-of-the-leaden-crown",

        name: "Krieger der bleiernen Krone",

        description:
          "Ein Mönch, der Beherrschung und Tyrannei mit eiserner Willenskraft bekämpft.",

        source: "grim-hollow-2025",
      },
      {
        id: "way-of-pride",

        name: "Krieger des Stolzes",

        description:
          "Ein Mönch, dessen Weg auf kompromissloser Selbstvervollkommnung beruht.",

        source: "grim-hollow-2025",
      },
      {
        id: "way-of-remorse",

        name: "Krieger der Reue",

        description:
          "Ein Mönch auf einem Weg der Sühne und Wiedergutmachung.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "paladin",

    name: "Paladin",

    description:
      "Ein geweihter Krieger, dessen Eid, Überzeugung und Wille übernatürliche Macht verleihen.",

    hitDie: 10,

    primaryAbilities: [
      "strength",
      "charisma",
    ],

    savingThrows: [
      "wisdom",
      "charisma",
    ],

    armorProficiencies: [
      "Alle Rüstungen",
      "Schilde",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
      "Kriegswaffen",
    ],

    toolProficiencies: [],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "oath-of-devotion",

        name: "Eid der Hingabe",

        description:
          "Ein klassischer Eid über Ehre, Schutz und den Kampf gegen das Böse.",

        source: "core",
      },
      {
        id: "oath-of-vengeance",

        name: "Eid der Vergeltung",

        description:
          "Ein unerbittlicher Schwur, Schuldige zu verfolgen und Unrecht zu vergelten.",

        source: "core",
      },
      {
        id: "oath-of-the-ancients",

        name: "Eid der Uralten",

        description:
          "Ein Eid zum Schutz von Hoffnung, Natur und dem Licht des Lebens.",

        source: "core",
      },
      {
        id: "oath-of-the-crown",

        name: "Eid der Krone",

        description:
          "Ein Schwur an Ordnung, Pflicht, Gemeinschaft und Herrschaft.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "oath-of-pestilence",

        name: "Eid der Pestilenz",

        description:
          "Ein Paladin, der Macht aus Krankheit und Leiden gewinnt.",

        source: "grim-hollow-2025",
      },
      {
        id: "oath-of-slaughter",

        name: "Eid des Schlachtens",

        description:
          "Ein Eid extremer Gewalt und kompromissloser Offensivkraft.",

        source: "grim-hollow-2025",
      },
      {
        id: "oath-of-zeal",

        name: "Eid des Eifers",

        description:
          "Ein fanatischer Eid ideologischer Reinheit und unerschütterlicher Überzeugung.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "ranger",

    name: "Waldläufer",

    description:
      "Ein erfahrener Jäger, Kundschafter und Grenzgänger, der seine Feinde mit Geduld und Präzision verfolgt.",

    hitDie: 10,

    primaryAbilities: [
      "dexterity",
      "wisdom",
    ],

    savingThrows: [
      "strength",
      "dexterity",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
      "Mittlere Rüstung",
      "Schilde",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
      "Kriegswaffen",
    ],

    toolProficiencies: [],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "hunter",

        name: "Jäger",

        description:
          "Ein vielseitiger Spezialist im Kampf gegen besonders gefährliche Beute.",

        source: "core",
      },
      {
        id: "beast-master",

        name: "Tiermeister",

        description:
          "Ein Waldläufer, der an der Seite eines treuen Tiergefährten kämpft.",

        source: "core",
      },
      {
        id: "gloom-stalker",

        name: "Düsterpirscher",

        description:
          "Ein Jäger der Finsternis, der in Höhlen, Ruinen und Schatten besonders gefährlich ist.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "green-reaper",

        name: "Grüner Schnitter",

        description:
          "Ein Waldläufer, der Gifte und natürliche Toxine meisterhaft einsetzt.",

        source: "grim-hollow-2025",
      },
      {
        id: "primal-archer",

        name: "Ursprünglicher Bogenschütze",

        description:
          "Ein Bogenschütze, der seine Geschosse mit elementarer Kraft verstärkt.",

        source: "grim-hollow-2025",
      },
      {
        id: "vermin-lord",

        name: "Herr des Ungeziefers",

        description:
          "Ein Waldläufer, der Schwärme und Ungeziefer kontrolliert.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "rogue",

    name: "Schurke",

    description:
      "Ein geschickter Spezialist für Heimlichkeit, Präzision, Tricks und das Ausnutzen gegnerischer Fehler.",

    hitDie: 8,

    primaryAbilities: [
      "dexterity",
    ],

    savingThrows: [
      "dexterity",
      "intelligence",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
      "Handarmbrüste",
      "Langschwerter",
      "Rapiere",
      "Kurzschwerter",
    ],

    toolProficiencies: [
      "Diebeswerkzeug",
    ],

    spellcasting: false,

    source: "core",

    subclasses: [
      {
        id: "thief",

        name: "Dieb",

        description:
          "Ein klassischer Spezialist für Einbruch, Bewegung und den Einsatz von Gegenständen.",

        source: "core",
      },
      {
        id: "assassin",

        name: "Assassine",

        description:
          "Ein tödlicher Pfad aus Tarnung, Vorbereitung und gezielten Angriffen.",

        source: "core",
      },
      {
        id: "arcane-trickster",

        name: "Arkaner Betrüger",

        description:
          "Ein Schurke, der Täuschung und Heimlichkeit mit begrenzter Magie verbindet.",

        source: "core",
      },
      {
        id: "inquisitive",

        name: "Inquisitiv",

        description:
          "Ein Beobachter und Ermittler, der Lügen, Schwächen und verborgene Wahrheiten erkennt.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "highway-rider",

        name: "Straßenreiter",

        description:
          "Ein berittener Bandit, der Geschwindigkeit und Überraschung nutzt.",

        source: "grim-hollow-2025",
      },
      {
        id: "misfortune-bringer",

        name: "Unglücksbringer",

        description:
          "Ein Schurke, der Flüche und gezieltes Unglück gegen seine Feinde richtet.",

        source: "grim-hollow-2025",
      },
      {
        id: "blood-thief",

        name: "Blutdieb",

        description:
          "Ein Schurke, der Sangromantie und Lebensraub mit Präzisionsangriffen verbindet.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "sorcerer",

    name: "Zauberer",

    description:
      "Ein angeborener Magiewirker, dessen Macht aus Blutlinie, Schicksal oder einer fremdartigen Quelle stammt.",

    hitDie: 6,

    primaryAbilities: [
      "charisma",
    ],

    savingThrows: [
      "constitution",
      "charisma",
    ],

    armorProficiencies: [],

    weaponProficiencies: [
      "Dolche",
      "Wurfpfeile",
      "Schleudern",
      "Kampfstäbe",
      "Leichte Armbrüste",
    ],

    toolProficiencies: [],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "draconic-bloodline",

        name: "Drachenblutlinie",

        description:
          "Eine magische Herkunft, die auf drakonische Abstammung oder Einfluss zurückgeht.",

        source: "core",
      },
      {
        id: "wild-magic",

        name: "Wilde Magie",

        description:
          "Eine unberechenbare Quelle, deren Kraft sich nicht vollständig kontrollieren lässt.",

        source: "core",
      },
      {
        id: "shadow-magic",

        name: "Schattenmagie",

        description:
          "Eine düstere Verbindung zu Finsternis, Tod oder der Schattenwelt.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "apocalypse-sorcery",

        name: "Apokalypse-Zauberei",

        description:
          "Eine magische Herkunft, die Kräfte apokalyptischer Katastrophen entfesselt.",

        source: "grim-hollow-2025",
      },
      {
        id: "haunted-sorcery",

        name: "Heimgesuchte Zauberei",

        description:
          "Eine Herkunft, die den Zauberer mit Toten und rastlosen Geistern verbindet.",

        source: "grim-hollow-2025",
      },
      {
        id: "cursed-bloodline",

        name: "Verfluchte Blutlinie",

        description:
          "Eine Blutlinie, deren ererbter Fluch zur Quelle arkaner Macht wurde.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "warlock",

    name: "Hexenmeister",

    description:
      "Ein Paktmagier, der seine Kräfte durch eine Bindung an eine mächtige und oft gefährliche Entität erhält.",

    hitDie: 8,

    primaryAbilities: [
      "charisma",
    ],

    savingThrows: [
      "wisdom",
      "charisma",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
    ],

    toolProficiencies: [],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "the-fiend",

        name: "Der Unhold",

        description:
          "Ein Pakt mit infernalischen oder abyssalen Mächten.",

        source: "core",
      },
      {
        id: "the-archfey",

        name: "Der Erzfee",

        description:
          "Ein Pakt mit einer uralten und unberechenbaren Feenmacht.",

        source: "core",
      },
      {
        id: "the-great-old-one",

        name: "Der Große Alte",

        description:
          "Ein Pakt mit einer fremdartigen Entität jenseits gewöhnlicher Vernunft.",

        source: "core",
      },
      {
        id: "the-undead",

        name: "Der Untote",

        description:
          "Eine Bindung an eine mächtige untote oder todlose Wesenheit.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "the-coven",

        name: "Der Hexenzirkel",

        description:
          "Ein Pakt, dessen Macht von einem Hexenzirkel und dessen gemeinsamer Magie stammt.",

        source: "grim-hollow-2025",
      },
      {
        id: "the-first-vampire",

        name: "Der Erste Vampir",

        description:
          "Ein Pakt mit einer uralten vampirischen Macht.",

        source: "grim-hollow-2025",
      },
      {
        id: "the-parasite",

        name: "Der Parasit",

        description:
          "Ein kosmischer Parasit lebt im Wirt und verleiht ihm fremdartige Kräfte.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "wizard",

    name: "Magier",

    description:
      "Ein gelehrter Zauberkundiger, der arkane Kräfte durch Studium, Disziplin und ein eigenes Zauberbuch beherrscht.",

    hitDie: 6,

    primaryAbilities: [
      "intelligence",
    ],

    savingThrows: [
      "intelligence",
      "wisdom",
    ],

    armorProficiencies: [],

    weaponProficiencies: [
      "Dolche",
      "Wurfpfeile",
      "Schleudern",
      "Kampfstäbe",
      "Leichte Armbrüste",
    ],

    toolProficiencies: [],

    spellcasting: true,

    source: "core",

    subclasses: [
      {
        id: "school-of-abjuration",

        name: "Schule der Bannmagie",

        description:
          "Eine Schule für Schutz, Gegenzauber und die Kontrolle magischer Gefahren.",

        source: "core",
      },
      {
        id: "school-of-evocation",

        name: "Schule der Hervorrufung",

        description:
          "Eine Schule für direkte, zerstörerische und elementare Magie.",

        source: "core",
      },
      {
        id: "school-of-necromancy",

        name: "Schule der Nekromantie",

        description:
          "Eine dunkle Schule über Tod, Lebensenergie und untote Wesen.",

        source: "core",
      },
      {
        id: "school-of-illusion",

        name: "Schule der Illusion",

        description:
          "Eine Schule für Täuschung, Sinnesbilder und die Manipulation von Wahrnehmung.",

        source: "core",
      },

      // Grim Hollow

      {
        id: "demonologist",

        name: "Dämonologe",

        description:
          "Ein Magier, der Macht von Dämonen und Seraphen stiehlt.",

        source: "grim-hollow-2025",
      },
      {
        id: "plague-doctor",

        name: "Pestarzt",

        description:
          "Ein Magier, der Krankheit, Medizin und Seuchenmagie miteinander verbindet.",

        source: "grim-hollow-2025",
      },
      {
        id: "sangromancer",

        name: "Sangromant",

        description:
          "Ein Magier, der Blut und körperliche Reserven als magische Ressource verwendet.",

        source: "grim-hollow-2025",
      },
    ],
  },

  {
    id: "monster-hunter",

    name: "Monsterjäger",

    description:
      "Ein gelehrter Jäger übernatürlicher Kreaturen, der Waffenbeherrschung, Monsterwissen und taktische Reaktionen verbindet.",

    hitDie: 10,

    /**
     * Die Klasse verwendet Stärke oder
     * Geschicklichkeit sowie Intelligenz.
     */
    primaryAbilities: [
      "strength",
      "dexterity",
      "intelligence",
    ],

    savingThrows: [
      "dexterity",
      "intelligence",
    ],

    armorProficiencies: [
      "Leichte Rüstung",
      "Mittlere Rüstung",
      "Schilde",
    ],

    weaponProficiencies: [
      "Einfache Waffen",
      "Kriegswaffen",
    ],

    toolProficiencies: [],

    spellcasting: false,

    source: "grim-hollow-2025",

    subclasses: [
      {
        id: "slayers-guild",

        name: "Schlächtergilde",

        description:
          "Eine Gilde widerstandsfähiger Nahkämpfer, die auf Reaktionen, Umlenkung und den Kampf auf engstem Raum spezialisiert ist.",

        source: "grim-hollow-2025",
      },
      {
        id: "devourers-guild",

        name: "Verschlingergilde",

        description:
          "Eine Gilde, deren Mitglieder Monsterteile verzehren und daraus Mutationen sowie temporäre Trefferpunkte gewinnen.",

        source: "grim-hollow-2025",
      },
      {
        id: "occultists-guild",

        name: "Okkultistengilde",

        description:
          "Eine Gilde mit begrenzter Magierzauberei, arkanem Wissen und Fähigkeiten gegen Magie.",

        source: "grim-hollow-2025",
      },
      {
        id: "trappers-guild",

        name: "Fallenstellergilde",

        description:
          "Eine Gilde für Fallen, Hinterhalte und hergestellte Spezialausrüstung.",

        source: "grim-hollow-2025",
      },
    ],
  },
];