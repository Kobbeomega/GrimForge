import type { AbilityId, AbilityScores } from "../core";

import type { CompendiumEntityBase, CompendiumSource } from "../shared";

export type ClassSource = Extract<
  CompendiumSource,
  "core" | "srd-2024" | "grim-hollow-2025"
>;

export type ClassFeatureKind =
  "passive" | "action" | "bonus-action" | "reaction" | "resource";

export type ClassResourceRecharge = "turn" | "short-rest" | "long-rest";

export type ClassResourceAmount =
  number | "proficiency-bonus" | "class-level" | "ability-modifier";

export type SpellcastingProgression = "full" | "half" | "third" | "pact";

export type SpellPreparationMode = "known" | "prepared" | "spellbook";

export interface ClassFeatureResource {
  id: string;
  name: string;
  amount: ClassResourceAmount;
  recharge: ClassResourceRecharge;
}

export interface ClassFeature {
  id: string;
  name: string;
  description: string;
  level: number;
  kind: ClassFeatureKind;
  resource?: ClassFeatureResource;
  prerequisites?: string[];
}

export interface ClassSpellcastingRules {
  ability: AbilityId;
  progression: SpellcastingProgression;
  preparation: SpellPreparationMode;
  ritualCasting?: boolean;
  startsAtLevel: number;
}

export interface CharacterSubclass extends Omit<
  CompendiumEntityBase,
  "source"
> {
  source?: ClassSource;
  features?: ClassFeature[];
}

export interface CharacterClass extends Omit<CompendiumEntityBase, "source"> {
  source?: ClassSource;
  hitDie: 6 | 8 | 10 | 12;
  primaryAbilities: AbilityId[];
  savingThrows: AbilityId[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  spellcasting: boolean;
  spellcastingRules?: ClassSpellcastingRules;
  features?: ClassFeature[];
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

    primaryAbilities: ["strength", "constitution"],

    savingThrows: ["strength", "constitution"],

    armorProficiencies: ["Leichte Rüstung", "Mittlere Rüstung", "Schilde"],

    weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],

    toolProficiencies: [],

    spellcasting: false,

    features: [
      {
        id: "barbarian-rage",
        name: "Kampfrausch",
        description:
          "Du verfällst in einen Kampfrausch, der deine körperliche Kampfkraft und Widerstandsfähigkeit erhöht.",
        level: 1,
        kind: "bonus-action",
        resource: {
          id: "barbarian-rage-uses",
          name: "Kampfrausch",
          amount: 2,
          recharge: "long-rest",
        },
      },
      {
        id: "barbarian-unarmored-defense",
        name: "Ungepanzerte Verteidigung",
        description:
          "Ohne Rüstung berechnet sich deine Rüstungsklasse aus Geschicklichkeit und Konstitution.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["charisma"],

    savingThrows: ["dexterity", "charisma"],

    armorProficiencies: ["Leichte Rüstung"],

    weaponProficiencies: [
      "Einfache Waffen",
      "Handarmbrüste",
      "Langschwerter",
      "Rapiere",
      "Kurzschwerter",
    ],

    toolProficiencies: ["Drei Musikinstrumente nach Wahl"],

    spellcasting: true,

    spellcastingRules: {
      ability: "charisma",
      progression: "full",
      preparation: "prepared",
      ritualCasting: true,
      startsAtLevel: 1,
    },

    features: [
      {
        id: "bard-bardic-inspiration",
        name: "Bardische Inspiration",
        description:
          "Du inspirierst eine Kreatur mit Worten oder Musik und verleihst ihr einen Inspirationswürfel.",
        level: 1,
        kind: "bonus-action",
        resource: {
          id: "bard-bardic-inspiration-uses",
          name: "Bardische Inspiration",
          amount: "ability-modifier",
          recharge: "long-rest",
        },
      },
      {
        id: "bard-spellcasting",
        name: "Zauberwirken",
        description: "Du wirkst Bardenzauber mit Charisma als Zauberattribut.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["wisdom"],

    savingThrows: ["wisdom", "charisma"],

    armorProficiencies: ["Leichte Rüstung", "Mittlere Rüstung", "Schilde"],

    weaponProficiencies: ["Einfache Waffen"],

    toolProficiencies: [],

    spellcasting: true,

    spellcastingRules: {
      ability: "wisdom",
      progression: "full",
      preparation: "prepared",
      ritualCasting: true,
      startsAtLevel: 1,
    },

    features: [
      {
        id: "cleric-spellcasting",
        name: "Zauberwirken",
        description:
          "Du bereitest Klerikerzauber vor und wirkst sie mit Weisheit.",
        level: 1,
        kind: "passive",
      },
      {
        id: "cleric-divine-order",
        name: "Göttliche Ordnung",
        description:
          "Du wählst eine göttliche Ausrichtung, die deine Ausbildung und Rolle prägt.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["wisdom"],

    savingThrows: ["intelligence", "wisdom"],

    armorProficiencies: ["Leichte Rüstung", "Mittlere Rüstung", "Schilde"],

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

    toolProficiencies: ["Kräuterkundeausrüstung"],

    spellcasting: true,

    spellcastingRules: {
      ability: "wisdom",
      progression: "full",
      preparation: "prepared",
      ritualCasting: true,
      startsAtLevel: 1,
    },

    features: [
      {
        id: "druid-druidic",
        name: "Druidisch",
        description: "Du beherrschst die geheime Sprache der Druiden.",
        level: 1,
        kind: "passive",
      },
      {
        id: "druid-primal-order",
        name: "Ursprüngliche Ordnung",
        description:
          "Du wählst eine Ausrichtung deiner druidischen Ausbildung.",
        level: 1,
        kind: "passive",
      },
      {
        id: "druid-spellcasting",
        name: "Zauberwirken",
        description:
          "Du bereitest Druidenzauber vor und wirkst sie mit Weisheit.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["strength", "dexterity"],

    savingThrows: ["strength", "constitution"],

    armorProficiencies: ["Alle Rüstungen", "Schilde"],

    weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],

    toolProficiencies: [],

    spellcasting: false,

    features: [
      {
        id: "fighter-fighting-style",
        name: "Kampfstil",
        description:
          "Du wählst eine besondere Ausbildung im bewaffneten Kampf.",
        level: 1,
        kind: "passive",
      },
      {
        id: "fighter-second-wind",
        name: "Zweiter Wind",
        description:
          "Du sammelst deine Kräfte und stellst eigene Trefferpunkte wieder her.",
        level: 1,
        kind: "bonus-action",
        resource: {
          id: "fighter-second-wind-uses",
          name: "Zweiter Wind",
          amount: 2,
          recharge: "short-rest",
        },
      },
      {
        id: "fighter-weapon-mastery",
        name: "Waffenmeisterschaft",
        description:
          "Du kannst die Meisterschaftseigenschaften ausgewählter Waffen einsetzen.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["dexterity", "wisdom"],

    savingThrows: ["strength", "dexterity"],

    armorProficiencies: [],

    weaponProficiencies: ["Einfache Waffen", "Kurzschwerter"],

    toolProficiencies: ["Ein Handwerkszeug oder Musikinstrument nach Wahl"],

    spellcasting: false,

    features: [
      {
        id: "monk-martial-arts",
        name: "Kampfkünste",
        description:
          "Deine Ausbildung verbessert waffenlose Angriffe und geeignete Mönchswaffen.",
        level: 1,
        kind: "passive",
      },
      {
        id: "monk-unarmored-defense",
        name: "Ungepanzerte Verteidigung",
        description:
          "Ohne Rüstung berechnet sich deine Rüstungsklasse aus Geschicklichkeit und Weisheit.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["strength", "charisma"],

    savingThrows: ["wisdom", "charisma"],

    armorProficiencies: ["Alle Rüstungen", "Schilde"],

    weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],

    toolProficiencies: [],

    spellcasting: true,

    spellcastingRules: {
      ability: "charisma",
      progression: "half",
      preparation: "prepared",
      startsAtLevel: 1,
    },

    features: [
      {
        id: "paladin-lay-on-hands",
        name: "Handauflegen",
        description:
          "Du besitzt einen Vorrat heilender Macht, mit dem du Trefferpunkte wiederherstellen kannst.",
        level: 1,
        kind: "action",
        resource: {
          id: "paladin-lay-on-hands-pool",
          name: "Handauflegen",
          amount: "class-level",
          recharge: "long-rest",
        },
      },
      {
        id: "paladin-spellcasting",
        name: "Zauberwirken",
        description:
          "Du bereitest Paladinzauber vor und wirkst sie mit Charisma.",
        level: 1,
        kind: "passive",
      },
      {
        id: "paladin-weapon-mastery",
        name: "Waffenmeisterschaft",
        description:
          "Du kannst die Meisterschaftseigenschaften ausgewählter Waffen einsetzen.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["dexterity", "wisdom"],

    savingThrows: ["strength", "dexterity"],

    armorProficiencies: ["Leichte Rüstung", "Mittlere Rüstung", "Schilde"],

    weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],

    toolProficiencies: [],

    spellcasting: true,

    spellcastingRules: {
      ability: "wisdom",
      progression: "half",
      preparation: "prepared",
      startsAtLevel: 1,
    },

    features: [
      {
        id: "ranger-favored-enemy",
        name: "Erzfeind",
        description:
          "Du kannst eine ausgewählte Beute mit besonderer Jagdmagie verfolgen.",
        level: 1,
        kind: "passive",
      },
      {
        id: "ranger-spellcasting",
        name: "Zauberwirken",
        description:
          "Du bereitest Waldläuferzauber vor und wirkst sie mit Weisheit.",
        level: 1,
        kind: "passive",
      },
      {
        id: "ranger-weapon-mastery",
        name: "Waffenmeisterschaft",
        description:
          "Du kannst die Meisterschaftseigenschaften ausgewählter Waffen einsetzen.",
        level: 1,
        kind: "passive",
      },
    ],

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
    id: "monster-hunter",

    name: "Monsterjäger",

    description:
      "Ein gehärteter Spezialist, der übernatürliche Beute studiert, vorbereitet und mit Wissen, Werkzeugen und kompromissloser Präzision zur Strecke bringt.",

    source: "grim-hollow-2025",

    hitDie: 10,

    primaryAbilities: ["dexterity", "wisdom"],

    savingThrows: ["dexterity", "wisdom"],

    armorProficiencies: ["Leichte Rüstung", "Mittlere Rüstung", "Schilde"],

    weaponProficiencies: ["Einfache Waffen", "Kriegswaffen"],

    toolProficiencies: ["Alchemistenbedarf"],

    spellcasting: false,

    features: [
      {
        id: "monster-hunter-quarry",
        name: "Gezeichnete Beute",
        description:
          "Als Bonusaktion erklärst du eine sichtbare Kreatur zu deiner Beute. Deine Ausbildung hilft dir, ihre Schwächen zu erkennen und sie unerbittlich zu verfolgen.",
        level: 1,
        kind: "bonus-action",
        resource: {
          id: "monster-hunter-quarry-uses",
          name: "Gezeichnete Beute",
          amount: "proficiency-bonus",
          recharge: "long-rest",
        },
      },
      {
        id: "monster-hunter-lore",
        name: "Monsterkunde",
        description:
          "Du bist im Erkennen übernatürlicher Kreaturen, ihrer Spuren und typischen Verwundbarkeiten ausgebildet.",
        level: 1,
        kind: "passive",
      },
      {
        id: "monster-hunter-prepared-hunter",
        name: "Vorbereiteter Jäger",
        description:
          "Du beherrschst den sicheren Umgang mit Jagdwerkzeugen, Tinkturen und spezialisierten Waffen gegen gefährliche Beute.",
        level: 1,
        kind: "passive",
      },
    ],

    subclasses: [
      {
        id: "monster-hunter-beast-slayer",
        name: "Bestienschlächter",
        description:
          "Ein Pfad für Jäger, die körperlich überlegene Ungeheuer durch Ausdauer, Fallen und präzise Gewalt bezwingen.",
        source: "grim-hollow-2025",
      },
      {
        id: "monster-hunter-occult-warden",
        name: "Okkulter Wächter",
        description:
          "Ein Pfad gegen Flüche, Geister und fremdartige Mächte, der Wissen mit schützenden Ritualen verbindet.",
        source: "grim-hollow-2025",
      },
      {
        id: "monster-hunter-trophy-bearer",
        name: "Trophäenträger",
        description:
          "Ein Pfad, auf dem die Überreste besiegter Monster zu Werkzeugen, Warnzeichen und Quellen neuer Stärke werden.",
        source: "grim-hollow-2025",
      },
    ],

    startingEquipment: [
      "Schuppenpanzer oder Lederrüstung",
      "Langschwert, Rapier oder Großschwert",
      "Schild, leichte Armbrust oder zwei Handäxte",
      "Gewölbeforscherpaket oder Entdeckerpaket",
      "Dolch",
    ],
  },

  {
    id: "rogue",

    name: "Schurke",

    description:
      "Ein geschickter Spezialist für Heimlichkeit, Präzision, Tricks und das Ausnutzen gegnerischer Fehler.",

    hitDie: 8,

    primaryAbilities: ["dexterity"],

    savingThrows: ["dexterity", "intelligence"],

    armorProficiencies: ["Leichte Rüstung"],

    weaponProficiencies: [
      "Einfache Waffen",
      "Handarmbrüste",
      "Langschwerter",
      "Rapiere",
      "Kurzschwerter",
    ],

    toolProficiencies: ["Diebeswerkzeug"],

    spellcasting: false,

    features: [
      {
        id: "rogue-expertise",
        name: "Expertise",
        description:
          "Dein Übungsbonus wird bei ausgewählten Fertigkeiten oder Werkzeugen verdoppelt.",
        level: 1,
        kind: "passive",
      },
      {
        id: "rogue-sneak-attack",
        name: "Hinterhältiger Angriff",
        description:
          "Einmal pro Zug kannst du unter passenden Umständen zusätzlichen Präzisionsschaden verursachen.",
        level: 1,
        kind: "passive",
      },
      {
        id: "rogue-thieves-cant",
        name: "Diebessprache",
        description:
          "Du beherrschst geheime Zeichen und Redewendungen krimineller Kreise.",
        level: 1,
        kind: "passive",
      },
      {
        id: "rogue-weapon-mastery",
        name: "Waffenmeisterschaft",
        description:
          "Du kannst die Meisterschaftseigenschaften ausgewählter Waffen einsetzen.",
        level: 1,
        kind: "passive",
      },
    ],

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

    primaryAbilities: ["charisma"],

    savingThrows: ["constitution", "charisma"],

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

    spellcastingRules: {
      ability: "charisma",
      progression: "full",
      preparation: "prepared",
      startsAtLevel: 1,
    },

    features: [
      {
        id: "sorcerer-spellcasting",
        name: "Zauberwirken",
        description:
          "Du wirkst Zauber durch deine angeborene Magie und verwendest Charisma.",
        level: 1,
        kind: "passive",
      },
      {
        id: "sorcerer-innate-sorcery",
        name: "Angeborene Zauberei",
        description:
          "Du entfesselst deine innere Magie, um deine Zauber vorübergehend zu verstärken.",
        level: 1,
        kind: "bonus-action",
        resource: {
          id: "sorcerer-innate-sorcery-uses",
          name: "Angeborene Zauberei",
          amount: 2,
          recharge: "long-rest",
        },
      },
    ],

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

    primaryAbilities: ["charisma"],

    savingThrows: ["wisdom", "charisma"],

    armorProficiencies: ["Leichte Rüstung"],

    weaponProficiencies: ["Einfache Waffen"],

    toolProficiencies: [],

    spellcasting: true,

    spellcastingRules: {
      ability: "charisma",
      progression: "pact",
      preparation: "prepared",
      startsAtLevel: 1,
    },

    features: [
      {
        id: "warlock-eldritch-invocations",
        name: "Unheimliche Anrufungen",
        description:
          "Du erhältst besondere übernatürliche Fähigkeiten aus deinem Pakt.",
        level: 1,
        kind: "passive",
      },
      {
        id: "warlock-pact-magic",
        name: "Paktmagie",
        description:
          "Du wirkst Hexenmeisterzauber mit Charisma und regenerierst deine Paktplätze schneller als gewöhnliche Zauberplätze.",
        level: 1,
        kind: "passive",
      },
    ],

    subclasses: [
      {
        id: "the-fiend",
        name: "Der Unhold",
        description: "Ein Pakt mit infernalischen oder abyssalen Mächten.",
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

    primaryAbilities: ["intelligence"],

    savingThrows: ["intelligence", "wisdom"],

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

    spellcastingRules: {
      ability: "intelligence",
      progression: "full",
      preparation: "spellbook",
      ritualCasting: true,
      startsAtLevel: 1,
    },

    features: [
      {
        id: "wizard-spellcasting",
        name: "Zauberwirken",
        description:
          "Du bereitest Zauber aus deinem Zauberbuch vor und wirkst sie mit Intelligenz.",
        level: 1,
        kind: "passive",
      },
      {
        id: "wizard-ritual-adept",
        name: "Ritualkundiger",
        description:
          "Du kannst geeignete Magierzauber als Rituale direkt aus deinem Zauberbuch wirken.",
        level: 1,
        kind: "passive",
      },
      {
        id: "wizard-arcane-recovery",
        name: "Arkane Erholung",
        description:
          "Während einer kurzen Rast kannst du einen Teil deiner verbrauchten Zauberplätze zurückerlangen.",
        level: 1,
        kind: "resource",
        resource: {
          id: "wizard-arcane-recovery-uses",
          name: "Arkane Erholung",
          amount: 1,
          recharge: "long-rest",
        },
      },
    ],

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

export function getClassById(classId: string): CharacterClass | undefined {
  return classes.find((entry) => entry.id === classId);
}

export function getSubclassById(
  classId: string,
  subclassId: string,
): CharacterSubclass | undefined {
  return getClassById(classId)?.subclasses.find(
    (entry) => entry.id === subclassId,
  );
}

export function getClassFeatures(
  classId: string,
  level: number,
): ClassFeature[] {
  return (
    getClassById(classId)?.features?.filter(
      (feature) => feature.level <= level,
    ) ?? []
  );
}

export function getSubclassFeatures(
  classId: string,
  subclassId: string,
  level: number,
): ClassFeature[] {
  return (
    getSubclassById(classId, subclassId)?.features?.filter(
      (feature) => feature.level <= level,
    ) ?? []
  );
}

export function getCharacterClassFeatures({
  classId,
  subclassId,
  level,
}: {
  classId: string;
  subclassId?: string;
  level: number;
}): ClassFeature[] {
  return [
    ...getClassFeatures(classId, level),

    ...(subclassId ? getSubclassFeatures(classId, subclassId, level) : []),
  ];
}

export function getClassSpellcastingRules(
  classId: string,
): ClassSpellcastingRules | undefined {
  return getClassById(classId)?.spellcastingRules;
}

export function getClassSpellcastingAbility(
  classId: string,
): AbilityId | undefined {
  return getClassSpellcastingRules(classId)?.ability;
}

export function calculateClassMaximumHitPoints({
  classId,
  level,
  constitution,
}: {
  classId: string;
  level: number;
  constitution: number;
}): number {
  const classDefinition = getClassById(classId);

  if (!classDefinition) {
    return 0;
  }

  const safeLevel = Math.max(1, Math.floor(level));

  const constitutionModifier = Math.floor((constitution - 10) / 2);

  const firstLevelHitPoints = classDefinition.hitDie + constitutionModifier;

  const averageHitPointsPerLevel =
    Math.floor(classDefinition.hitDie / 2) + 1 + constitutionModifier;

  return Math.max(
    safeLevel,

    firstLevelHitPoints +
      (safeLevel - 1) * Math.max(1, averageHitPointsPerLevel),
  );
}

export function calculateSpellSaveDifficultyClass({
  classId,
  proficiencyBonus,
  abilityScores,
}: {
  classId: string;
  proficiencyBonus: number;
  abilityScores: AbilityScores;
}): number | undefined {
  const ability = getClassSpellcastingAbility(classId);

  if (!ability) {
    return undefined;
  }

  const abilityModifier = Math.floor((abilityScores[ability] - 10) / 2);

  return 8 + proficiencyBonus + abilityModifier;
}

export function calculateSpellAttackBonus({
  classId,
  proficiencyBonus,
  abilityScores,
}: {
  classId: string;
  proficiencyBonus: number;
  abilityScores: AbilityScores;
}): number | undefined {
  const ability = getClassSpellcastingAbility(classId);

  if (!ability) {
    return undefined;
  }

  return proficiencyBonus + Math.floor((abilityScores[ability] - 10) / 2);
}

export function resolveClassResourceAmount({
  amount,
  classLevel,
  proficiencyBonus,
  abilityModifier,
}: {
  amount: ClassResourceAmount;
  classLevel: number;
  proficiencyBonus: number;
  abilityModifier: number;
}): number {
  if (typeof amount === "number") {
    return amount;
  }

  switch (amount) {
    case "class-level":
      return Math.max(1, classLevel);

    case "proficiency-bonus":
      return Math.max(1, proficiencyBonus);

    case "ability-modifier":
      return Math.max(1, abilityModifier);
  }
}
