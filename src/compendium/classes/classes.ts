import type { AbilityId } from "../core";

export interface CharacterSubclass {
  id: string;
  name: string;
  description: string;
}

export interface CharacterClass {
  id: string;

  name: string;

  description: string;

  hitDie: 6 | 8 | 10 | 12;

  primaryAbilities: AbilityId[];

  savingThrows: AbilityId[];

  armorProficiencies: string[];

  weaponProficiencies: string[];

  toolProficiencies: string[];

  spellcasting: boolean;

  subclasses: CharacterSubclass[];

  startingEquipment: string[];
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

    subclasses: [
      {
        id: "berserker",
        name: "Berserker",
        description:
          "Ein Pfad der ungezügelten Gewalt und völligen Hingabe an den Kampfrausch.",
      },
      {
        id: "totem-warrior",
        name: "Totemkrieger",
        description:
          "Ein spiritueller Pfad, der tierische Vorbilder und Ahnenkräfte vereint.",
      },
      {
        id: "ancestral-guardian",
        name: "Ahnenwächter",
        description:
          "Ein Krieger, der im Kampf von den Geistern seiner Vorfahren begleitet wird.",
      },
      {
        id: "beast",
        name: "Bestie",
        description:
          "Ein Pfad, auf dem sich der eigene Körper in eine natürliche Waffe verwandelt.",
      },
      {
        id: "storm-herald",
        name: "Sturmbote",
        description:
          "Ein Barbar, dessen Zorn die Kraft extremer Landschaften entfesselt.",
      },
    ],

    startingEquipment: [
      "Große Axt",
      "Zwei Handäxte",
      "Entdeckerpaket",
      "Vier Wurfspeere",
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

    subclasses: [
      {
        id: "college-of-lore",
        name: "Kolleg des Wissens",
        description:
          "Ein Pfad für Gelehrte, Redner und Sammler vergessener Geheimnisse.",
      },
      {
        id: "college-of-valor",
        name: "Kolleg der Tapferkeit",
        description:
          "Ein kriegerischer Barde, der Verbündete mit Taten und Liedern antreibt.",
      },
      {
        id: "college-of-whispers",
        name: "Kolleg des Flüsterns",
        description:
          "Ein düsterer Pfad aus Geheimnissen, Furcht und gezielter Manipulation.",
      },
    ],

    startingEquipment: [
      "Rapier oder Langschwert",
      "Diplomatenpaket oder Unterhalterpaket",
      "Laute oder anderes Musikinstrument",
      "Lederrüstung",
      "Dolch",
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

    subclasses: [
      {
        id: "life-domain",
        name: "Domäne des Lebens",
        description:
          "Eine göttliche Ausrichtung auf Heilung, Schutz und die Bewahrung des Lebens.",
      },
      {
        id: "light-domain",
        name: "Domäne des Lichts",
        description:
          "Eine strahlende Tradition, die Dunkelheit und Verderbnis bekämpft.",
      },
      {
        id: "war-domain",
        name: "Domäne des Krieges",
        description:
          "Eine kämpferische Ausrichtung für Priester, die ihren Glauben mit Waffen verteidigen.",
      },
      {
        id: "grave-domain",
        name: "Domäne des Grabes",
        description:
          "Eine düstere Lehre über Tod, Übergang und das Gleichgewicht zwischen Leben und Sterben.",
      },
    ],

    startingEquipment: [
      "Streitkolben oder Kriegshammer",
      "Schuppenpanzer oder Lederrüstung",
      "Leichte Armbrust oder einfache Waffe",
      "Priesterpaket oder Entdeckerpaket",
      "Schild",
      "Heiliges Symbol",
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

    subclasses: [
      {
        id: "circle-of-the-land",
        name: "Zirkel des Landes",
        description:
          "Ein naturverbundener Pfad mit starker Bindung an eine bestimmte Region.",
      },
      {
        id: "circle-of-the-moon",
        name: "Zirkel des Mondes",
        description:
          "Ein kämpferischer Zirkel, der die Tiergestalt in den Mittelpunkt stellt.",
      },
      {
        id: "circle-of-spores",
        name: "Zirkel der Sporen",
        description:
          "Eine düstere Tradition über Verfall, Pilze und den Kreislauf des Lebens.",
      },
    ],

    startingEquipment: [
      "Holzschild oder einfache Waffe",
      "Krummsäbel oder einfache Nahkampfwaffe",
      "Lederrüstung",
      "Entdeckerpaket",
      "Druidischer Fokus",
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

    subclasses: [
      {
        id: "champion",
        name: "Champion",
        description:
          "Ein körperlich überragender Kämpfer mit direktem und zuverlässigem Spielstil.",
      },
      {
        id: "battle-master",
        name: "Kampfmeister",
        description:
          "Ein taktischer Krieger, der Manöver und Kontrolle über rohe Gewalt stellt.",
      },
      {
        id: "eldritch-knight",
        name: "Arkaner Ritter",
        description:
          "Ein Kämpfer, der Waffenführung mit begrenzter arkaner Magie verbindet.",
      },
      {
        id: "samurai",
        name: "Samurai",
        description:
          "Ein entschlossener Duellant, der Disziplin und mentale Stärke verkörpert.",
      },
    ],

    startingEquipment: [
      "Kettenrüstung oder Lederrüstung",
      "Kriegswaffe und Schild oder zwei Kriegswaffen",
      "Leichte Armbrust oder zwei Handäxte",
      "Gewölbeforscherpaket oder Entdeckerpaket",
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

    subclasses: [
      {
        id: "way-of-the-open-hand",
        name: "Weg der offenen Hand",
        description:
          "Ein klassischer Pfad für Kontrolle, Bewegung und waffenlosen Kampf.",
      },
      {
        id: "way-of-shadow",
        name: "Weg des Schattens",
        description:
          "Ein heimlicher Pfad aus Dunkelheit, Täuschung und lautloser Bewegung.",
      },
      {
        id: "way-of-the-long-death",
        name: "Weg des langen Todes",
        description:
          "Eine düstere Schule über Furcht, Sterblichkeit und die Grenzen des Körpers.",
      },
    ],

    startingEquipment: [
      "Kurzschwert oder einfache Waffe",
      "Gewölbeforscherpaket oder Entdeckerpaket",
      "Zehn Wurfpfeile",
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

    subclasses: [
      {
        id: "oath-of-devotion",
        name: "Eid der Hingabe",
        description:
          "Ein klassischer Eid über Ehre, Schutz und den Kampf gegen das Böse.",
      },
      {
        id: "oath-of-vengeance",
        name: "Eid der Vergeltung",
        description:
          "Ein unerbittlicher Schwur, Schuldige zu verfolgen und Unrecht zu vergelten.",
      },
      {
        id: "oath-of-the-ancients",
        name: "Eid der Uralten",
        description:
          "Ein Eid zum Schutz von Hoffnung, Natur und dem Licht des Lebens.",
      },
      {
        id: "oath-of-the-crown",
        name: "Eid der Krone",
        description:
          "Ein Schwur an Ordnung, Pflicht, Gemeinschaft und Herrschaft.",
      },
    ],

    startingEquipment: [
      "Kriegswaffe und Schild oder zwei Kriegswaffen",
      "Fünf Wurfspeere oder einfache Nahkampfwaffe",
      "Priesterpaket oder Entdeckerpaket",
      "Kettenrüstung",
      "Heiliges Symbol",
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

    subclasses: [
      {
        id: "hunter",
        name: "Jäger",
        description:
          "Ein vielseitiger Spezialist im Kampf gegen besonders gefährliche Beute.",
      },
      {
        id: "beast-master",
        name: "Tiermeister",
        description:
          "Ein Waldläufer, der an der Seite eines treuen Tiergefährten kämpft.",
      },
      {
        id: "gloom-stalker",
        name: "Düsterpirscher",
        description:
          "Ein Jäger der Finsternis, der in Höhlen, Ruinen und Schatten besonders gefährlich ist.",
      },
    ],

    startingEquipment: [
      "Schuppenpanzer oder Lederrüstung",
      "Zwei Kurzschwerter oder zwei einfache Nahkampfwaffen",
      "Gewölbeforscherpaket oder Entdeckerpaket",
      "Langbogen",
      "Zwanzig Pfeile",
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

    subclasses: [
      {
        id: "thief",
        name: "Dieb",
        description:
          "Ein klassischer Spezialist für Einbruch, Bewegung und den Einsatz von Gegenständen.",
      },
      {
        id: "assassin",
        name: "Assassine",
        description:
          "Ein tödlicher Pfad aus Tarnung, Vorbereitung und gezielten Angriffen.",
      },
      {
        id: "arcane-trickster",
        name: "Arkaner Betrüger",
        description:
          "Ein Schurke, der Täuschung und Heimlichkeit mit begrenzter Magie verbindet.",
      },
      {
        id: "inquisitive",
        name: "Inquisitiv",
        description:
          "Ein Beobachter und Ermittler, der Lügen, Schwächen und verborgene Wahrheiten erkennt.",
      },
    ],

    startingEquipment: [
      "Rapier oder Kurzschwert",
      "Kurzbogen oder Kurzschwert",
      "Einbrecherpaket oder Gewölbeforscherpaket",
      "Lederrüstung",
      "Zwei Dolche",
      "Diebeswerkzeug",
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

    subclasses: [
      {
        id: "draconic-bloodline",
        name: "Drachenblutlinie",
        description:
          "Eine magische Herkunft, die auf drakonische Abstammung oder Einfluss zurückgeht.",
      },
      {
        id: "wild-magic",
        name: "Wilde Magie",
        description:
          "Eine unberechenbare Quelle, deren Kraft sich nicht vollständig kontrollieren lässt.",
      },
      {
        id: "shadow-magic",
        name: "Schattenmagie",
        description:
          "Eine düstere Verbindung zu Finsternis, Tod oder der Schattenwelt.",
      },
    ],

    startingEquipment: [
      "Leichte Armbrust oder einfache Waffe",
      "Komponententasche oder arkaner Fokus",
      "Gewölbeforscherpaket oder Entdeckerpaket",
      "Zwei Dolche",
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

    subclasses: [
      {
        id: "the-fiend",
        name: "Der Unhold",
        description:
          "Ein Pakt mit infernalischen oder abyssalen Mächten.",
      },
      {
        id: "the-archfey",
        name: "Der Erzfee",
        description:
          "Ein Pakt mit einer uralten und unberechenbaren Feenmacht.",
      },
      {
        id: "the-great-old-one",
        name: "Der Große Alte",
        description:
          "Ein Pakt mit einer fremdartigen Entität jenseits gewöhnlicher Vernunft.",
      },
      {
        id: "the-undead",
        name: "Der Untote",
        description:
          "Eine Bindung an eine mächtige untote oder todlose Wesenheit.",
      },
    ],

    startingEquipment: [
      "Leichte Armbrust oder einfache Waffe",
      "Komponententasche oder arkaner Fokus",
      "Gelehrtenpaket oder Gewölbeforscherpaket",
      "Lederrüstung",
      "Einfache Waffe",
      "Zwei Dolche",
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

    subclasses: [
      {
        id: "school-of-abjuration",
        name: "Schule der Bannmagie",
        description:
          "Eine Schule für Schutz, Gegenzauber und die Kontrolle magischer Gefahren.",
      },
      {
        id: "school-of-evocation",
        name: "Schule der Hervorrufung",
        description:
          "Eine Schule für direkte, zerstörerische und elementare Magie.",
      },
      {
        id: "school-of-necromancy",
        name: "Schule der Nekromantie",
        description:
          "Eine dunkle Schule über Tod, Lebensenergie und untote Wesen.",
      },
      {
        id: "school-of-illusion",
        name: "Schule der Illusion",
        description:
          "Eine Schule für Täuschung, Sinnesbilder und die Manipulation von Wahrnehmung.",
      },
    ],

    startingEquipment: [
      "Kampfstab oder Dolch",
      "Komponententasche oder arkaner Fokus",
      "Gelehrtenpaket oder Entdeckerpaket",
      "Zauberbuch",
    ],
  },
];