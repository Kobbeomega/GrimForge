import type {
  SpellDefinition,
} from "./types";

const verbalSomatic = {
  verbal: true,
  somatic: true,
  material: false,
} as const;

const verbalOnly = {
  verbal: true,
  somatic: false,
  material: false,
} as const;

export const spells: SpellDefinition[] = [
  {
    id: "acid-splash",
    name: "Säurespritzer",
    level: 0,
    school: "conjuration",
    castingTime: "1 Aktion",
    range: "18 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Du schleuderst eine Blase aus Säure auf ein Ziel. Das Ziel führt einen Geschicklichkeitsrettungswurf aus und erleidet bei einem Fehlschlag Säureschaden.",
    damage: {
      dice: {
        dice: 1,
        die: 6,
      },
      damageType: "acid",
      savingThrowAbility:
        "dexterity",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 6,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 6,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 6,
        },
      },
    ],
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "chill-touch",
    name: "Kalte Hand",
    level: 0,
    school: "necromancy",
    castingTime: "1 Aktion",
    range: "36 m",
    components: verbalSomatic,
    duration: "1 Runde",
    concentration: false,
    ritual: false,
    description:
      "Eine geisterhafte Hand greift ein Ziel an. Bei einem Treffer erleidet es nekrotischen Schaden und kann bis zum Beginn deines nächsten Zuges keine Trefferpunkte zurückerhalten.",
    damage: {
      dice: {
        dice: 1,
        die: 8,
      },
      damageType: "necrotic",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 8,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 8,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 8,
        },
      },
    ],
    classIds: [
      "sorcerer",
      "warlock",
      "wizard",
    ],
  },

  {
    id: "eldritch-blast",
    name: "Schauriger Strahl",
    level: 0,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "36 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Ein Strahl knisternder Energie schießt auf eine Kreatur. Führe einen Fernkampf-Zauberangriff aus.",
    damage: {
      dice: {
        dice: 1,
        die: 10,
      },
      damageType: "force",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 10,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 10,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 10,
        },
      },
    ],
    classIds: [
      "warlock",
    ],
  },

  {
    id: "fire-bolt",
    name: "Feuerpfeil",
    level: 0,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "36 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Du schleuderst einen Funken aus Feuer. Führe einen Fernkampf-Zauberangriff aus.",
    damage: {
      dice: {
        dice: 1,
        die: 10,
      },
      damageType: "fire",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 10,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 10,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 10,
        },
      },
    ],
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "guidance",
    name: "Führung",
    level: 0,
    school: "divination",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: verbalSomatic,
    duration: "Konzentration, bis zu 1 Minute",
    concentration: true,
    ritual: false,
    description:
      "Das berührte Ziel kann einmal 1W4 auf eine Attributsprobe addieren.",
    classIds: [
      "cleric",
      "druid",
    ],
  },

  {
    id: "light",
    name: "Licht",
    level: 0,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: {
      verbal: true,
      somatic: false,
      material: true,
      materialDescription:
        "Ein Glühwürmchen oder phosphoreszierendes Moos",
    },
    duration: "1 Stunde",
    concentration: false,
    ritual: false,
    description:
      "Ein berührter Gegenstand spendet helles und dämmriges Licht.",
    classIds: [
      "bard",
      "cleric",
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "mage-hand",
    name: "Magierhand",
    level: 0,
    school: "conjuration",
    castingTime: "1 Aktion",
    range: "9 m",
    components: verbalSomatic,
    duration: "1 Minute",
    concentration: false,
    ritual: false,
    description:
      "Eine schwebende geisterhafte Hand erscheint und kann einfache Gegenstände bewegen oder bedienen.",
    classIds: [
      "bard",
      "sorcerer",
      "warlock",
      "wizard",
    ],
  },

  {
    id: "minor-illusion",
    name: "Einfache Illusion",
    level: 0,
    school: "illusion",
    castingTime: "1 Aktion",
    range: "9 m",
    components: {
      verbal: false,
      somatic: true,
      material: true,
      materialDescription:
        "Ein Stück Vlies",
    },
    duration: "1 Minute",
    concentration: false,
    ritual: false,
    description:
      "Du erschaffst ein Geräusch oder ein unbewegliches Bild eines Gegenstands.",
    classIds: [
      "bard",
      "sorcerer",
      "warlock",
      "wizard",
    ],
  },

  {
    id: "poison-spray",
    name: "Gift versprühen",
    level: 0,
    school: "conjuration",
    castingTime: "1 Aktion",
    range: "3 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Du erzeugst eine Wolke aus giftigem Gas. Das Ziel führt einen Konstitutionsrettungswurf aus.",
    damage: {
      dice: {
        dice: 1,
        die: 12,
      },
      damageType: "poison",
      savingThrowAbility:
        "constitution",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 12,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 12,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 12,
        },
      },
    ],
    classIds: [
      "druid",
      "sorcerer",
      "warlock",
      "wizard",
    ],
  },

  {
    id: "produce-flame",
    name: "Flammen erzeugen",
    level: 0,
    school: "conjuration",
    castingTime: "1 Aktion",
    range: "Selbst",
    components: verbalSomatic,
    duration: "10 Minuten",
    concentration: false,
    ritual: false,
    description:
      "Eine Flamme erscheint in deiner Hand. Du kannst sie als Lichtquelle verwenden oder auf ein Ziel schleudern.",
    damage: {
      dice: {
        dice: 1,
        die: 8,
      },
      damageType: "fire",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 8,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 8,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 8,
        },
      },
    ],
    classIds: [
      "druid",
    ],
  },

  {
    id: "ray-of-frost",
    name: "Kältestrahl",
    level: 0,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "18 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Ein eisiger Strahl verursacht Kälteschaden und reduziert die Bewegung des Ziels bis zum Beginn deines nächsten Zuges.",
    damage: {
      dice: {
        dice: 1,
        die: 8,
      },
      damageType: "cold",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 8,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 8,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 8,
        },
      },
    ],
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "sacred-flame",
    name: "Heilige Flamme",
    level: 0,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "18 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Strahlendes Feuer fährt auf ein Ziel herab. Das Ziel führt einen Geschicklichkeitsrettungswurf aus.",
    damage: {
      dice: {
        dice: 1,
        die: 8,
      },
      damageType: "radiant",
      savingThrowAbility:
        "dexterity",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 8,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 8,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 8,
        },
      },
    ],
    classIds: [
      "cleric",
    ],
  },

  {
    id: "shillelagh",
    name: "Shillelagh",
    level: 0,
    school: "transmutation",
    castingTime: "1 Bonusaktion",
    range: "Berührung",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Mistelzweig, Kleeblatt und Kampfstab oder Knüppel",
    },
    duration: "1 Minute",
    concentration: false,
    ritual: false,
    description:
      "Ein Kampfstab oder Knüppel wird magisch. Du kannst Weisheit für Angriff und Schaden verwenden.",
    classIds: [
      "druid",
    ],
  },

  {
    id: "spare-the-dying",
    name: "Verschonung der Sterbenden",
    level: 0,
    school: "necromancy",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Du stabilisierst eine lebende Kreatur mit 0 Trefferpunkten.",
    classIds: [
      "cleric",
    ],
  },

  {
    id: "thaumaturgy",
    name: "Thaumaturgie",
    level: 0,
    school: "transmutation",
    castingTime: "1 Aktion",
    range: "9 m",
    components: verbalOnly,
    duration: "Bis zu 1 Minute",
    concentration: false,
    ritual: false,
    description:
      "Du erzeugst eine kleine übernatürliche Manifestation, beispielsweise eine verstärkte Stimme oder flackernde Flammen.",
    classIds: [
      "cleric",
    ],
  },

  {
    id: "vicious-mockery",
    name: "Bösartiger Spott",
    level: 0,
    school: "enchantment",
    castingTime: "1 Aktion",
    range: "18 m",
    components: verbalOnly,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Du überschüttest ein Ziel mit magisch verstärktem Spott. Es führt einen Weisheitsrettungswurf aus.",
    damage: {
      dice: {
        dice: 1,
        die: 4,
      },
      damageType: "psychic",
      savingThrowAbility: "wisdom",
    },
    scaling: [
      {
        characterLevel: 5,
        dice: {
          dice: 2,
          die: 4,
        },
      },
      {
        characterLevel: 11,
        dice: {
          dice: 3,
          die: 4,
        },
      },
      {
        characterLevel: 17,
        dice: {
          dice: 4,
          die: 4,
        },
      },
    ],
    classIds: [
      "bard",
    ],
  },

  {
    id: "bane",
    name: "Verderben",
    level: 1,
    school: "enchantment",
    castingTime: "1 Aktion",
    range: "9 m",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Ein Tropfen Blut",
    },
    duration:
      "Konzentration, bis zu 1 Minute",
    concentration: true,
    ritual: false,
    description:
      "Bis zu drei Kreaturen müssen Charismarettungswürfe bestehen. Betroffene Ziele ziehen 1W4 von Angriffs- und Rettungswürfen ab.",
    higherLevels:
      "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
    classIds: [
      "bard",
      "cleric",
    ],
  },

  {
    id: "bless",
    name: "Segnen",
    level: 1,
    school: "enchantment",
    castingTime: "1 Aktion",
    range: "9 m",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Ein Spritzer Weihwasser",
    },
    duration:
      "Konzentration, bis zu 1 Minute",
    concentration: true,
    ritual: false,
    description:
      "Bis zu drei Kreaturen addieren 1W4 auf Angriffs- und Rettungswürfe.",
    higherLevels:
      "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
    classIds: [
      "cleric",
      "paladin",
    ],
  },

  {
    id: "burning-hands",
    name: "Brennende Hände",
    level: 1,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "Selbst, Kegel von 4,5 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Flammen schießen aus deinen Händen. Kreaturen im Bereich führen Geschicklichkeitsrettungswürfe aus.",
    damage: {
      dice: {
        dice: 3,
        die: 6,
      },
      damageType: "fire",
      savingThrowAbility:
        "dexterity",
      halfDamageOnSave: true,
    },
    higherLevels:
      "Der Schaden steigt für jeden höheren Zauberplatz um 1W6.",
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "charm-person",
    name: "Person bezaubern",
    level: 1,
    school: "enchantment",
    castingTime: "1 Aktion",
    range: "9 m",
    components: verbalSomatic,
    duration: "1 Stunde",
    concentration: false,
    ritual: false,
    description:
      "Ein Humanoider führt einen Weisheitsrettungswurf aus. Bei einem Fehlschlag ist er von dir bezaubert.",
    higherLevels:
      "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
    classIds: [
      "bard",
      "druid",
      "sorcerer",
      "warlock",
      "wizard",
    ],
  },

  {
    id: "command",
    name: "Befehl",
    level: 1,
    school: "enchantment",
    castingTime: "1 Aktion",
    range: "18 m",
    components: verbalOnly,
    duration: "1 Runde",
    concentration: false,
    ritual: false,
    description:
      "Du sprichst einen einwortigen Befehl. Das Ziel führt einen Weisheitsrettungswurf aus.",
    higherLevels:
      "Für jeden höheren Zauberplatz kann ein zusätzliches Ziel betroffen werden.",
    classIds: [
      "cleric",
      "paladin",
    ],
  },

  {
    id: "cure-wounds",
    name: "Wunden heilen",
    level: 1,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Eine berührte Kreatur erhält Trefferpunkte zurück.",
    healing: {
      dice: {
        dice: 1,
        die: 8,
      },
    },
    higherLevels:
      "Die Heilung steigt für jeden höheren Zauberplatz um 1W8.",
    classIds: [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
    ],
  },

  {
    id: "detect-magic",
    name: "Magie entdecken",
    level: 1,
    school: "divination",
    castingTime: "1 Aktion",
    range: "Selbst",
    components: verbalSomatic,
    duration:
      "Konzentration, bis zu 10 Minuten",
    concentration: true,
    ritual: true,
    description:
      "Du spürst Magie in einem Umkreis von 9 Metern und kannst ihre Schule erkennen.",
    classIds: [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "disguise-self",
    name: "Selbstverkleidung",
    level: 1,
    school: "illusion",
    castingTime: "1 Aktion",
    range: "Selbst",
    components: verbalSomatic,
    duration: "1 Stunde",
    concentration: false,
    ritual: false,
    description:
      "Du veränderst das Aussehen deiner Person und deiner getragenen Ausrüstung.",
    classIds: [
      "bard",
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "entangle",
    name: "Verstricken",
    level: 1,
    school: "conjuration",
    castingTime: "1 Aktion",
    range: "27 m",
    components: verbalSomatic,
    duration:
      "Konzentration, bis zu 1 Minute",
    concentration: true,
    ritual: false,
    description:
      "Ranken wachsen in einem Bereich. Kreaturen können durch einen Stärkerettungswurf festgesetzt werden.",
    classIds: [
      "druid",
    ],
  },

  {
    id: "faerie-fire",
    name: "Feenfeuer",
    level: 1,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "18 m",
    components: verbalOnly,
    duration:
      "Konzentration, bis zu 1 Minute",
    concentration: true,
    ritual: false,
    description:
      "Kreaturen und Gegenstände in einem Würfel werden von Licht umgeben. Angriffe gegen betroffene Ziele können Vorteil erhalten.",
    classIds: [
      "bard",
      "druid",
    ],
  },

  {
    id: "false-life",
    name: "Falsches Leben",
    level: 1,
    school: "necromancy",
    castingTime: "1 Aktion",
    range: "Selbst",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Eine kleine Menge Alkohol oder destillierter Geist",
    },
    duration: "1 Stunde",
    concentration: false,
    ritual: false,
    description:
      "Du erhältst 1W4 + 4 temporäre Trefferpunkte.",
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "find-familiar",
    name: "Vertrauten finden",
    level: 1,
    school: "conjuration",
    castingTime: "1 Stunde",
    range: "3 m",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Kohle, Weihrauch und Kräuter im Wert von 10 GM",
    },
    duration: "Sofort",
    concentration: false,
    ritual: true,
    description:
      "Du beschwörst einen tierischen Geist, der die Gestalt eines vertrauten Wesens annimmt.",
    classIds: [
      "wizard",
    ],
  },

  {
    id: "fog-cloud",
    name: "Nebelwolke",
    level: 1,
    school: "conjuration",
    castingTime: "1 Aktion",
    range: "36 m",
    components: verbalSomatic,
    duration:
      "Konzentration, bis zu 1 Stunde",
    concentration: true,
    ritual: false,
    description:
      "Eine stark verschleiernde Nebelwolke entsteht.",
    higherLevels:
      "Der Radius steigt für jeden höheren Zauberplatz.",
    classIds: [
      "druid",
      "ranger",
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "goodberry",
    name: "Gute Beeren",
    level: 1,
    school: "transmutation",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Ein Mistelzweig",
    },
    duration: "24 Stunden",
    concentration: false,
    ritual: false,
    description:
      "Bis zu zehn magische Beeren erscheinen. Jede Beere stellt 1 Trefferpunkt wieder her und nährt eine Kreatur.",
    classIds: [
      "druid",
      "ranger",
    ],
  },

  {
    id: "guiding-bolt",
    name: "Lenkendes Geschoss",
    level: 1,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "36 m",
    components: verbalSomatic,
    duration: "1 Runde",
    concentration: false,
    ritual: false,
    description:
      "Ein Lichtblitz trifft ein Ziel. Führe einen Fernkampf-Zauberangriff aus.",
    damage: {
      dice: {
        dice: 4,
        die: 6,
      },
      damageType: "radiant",
    },
    higherLevels:
      "Der Schaden steigt für jeden höheren Zauberplatz um 1W6.",
    classIds: [
      "cleric",
    ],
  },

  {
    id: "healing-word",
    name: "Heilendes Wort",
    level: 1,
    school: "evocation",
    castingTime: "1 Bonusaktion",
    range: "18 m",
    components: verbalOnly,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Eine Kreatur in Reichweite erhält Trefferpunkte zurück.",
    healing: {
      dice: {
        dice: 1,
        die: 4,
      },
    },
    higherLevels:
      "Die Heilung steigt für jeden höheren Zauberplatz um 1W4.",
    classIds: [
      "bard",
      "cleric",
      "druid",
    ],
  },

  {
    id: "hellish-rebuke",
    name: "Höllischer Tadel",
    level: 1,
    school: "evocation",
    castingTime: "1 Reaktion",
    range: "18 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Als Reaktion auf erlittenen Schaden lässt du Flammen um den Angreifer auflodern.",
    damage: {
      dice: {
        dice: 2,
        die: 10,
      },
      damageType: "fire",
      savingThrowAbility:
        "dexterity",
      halfDamageOnSave: true,
    },
    higherLevels:
      "Der Schaden steigt für jeden höheren Zauberplatz um 1W10.",
    classIds: [
      "warlock",
    ],
  },

  {
    id: "heroism",
    name: "Heldenmut",
    level: 1,
    school: "enchantment",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: verbalSomatic,
    duration:
      "Konzentration, bis zu 1 Minute",
    concentration: true,
    ritual: false,
    description:
      "Eine Kreatur wird immun gegen den Zustand Verängstigt und erhält in jedem Zug temporäre Trefferpunkte.",
    classIds: [
      "bard",
      "paladin",
    ],
  },

  {
    id: "hex",
    name: "Verhexen",
    level: 1,
    school: "enchantment",
    castingTime: "1 Bonusaktion",
    range: "27 m",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Das versteinerte Auge eines Molchs",
    },
    duration:
      "Konzentration, bis zu 1 Stunde",
    concentration: true,
    ritual: false,
    description:
      "Du verfluchst ein Ziel. Deine Treffer verursachen zusätzlich 1W6 nekrotischen Schaden.",
    classIds: [
      "warlock",
    ],
  },

  {
    id: "hunters-mark",
    name: "Mal des Jägers",
    level: 1,
    school: "divination",
    castingTime: "1 Bonusaktion",
    range: "27 m",
    components: verbalOnly,
    duration:
      "Konzentration, bis zu 1 Stunde",
    concentration: true,
    ritual: false,
    description:
      "Du markierst ein Ziel. Deine Waffentreffer verursachen zusätzlich 1W6 Schaden.",
    classIds: [
      "ranger",
    ],
  },

  {
    id: "mage-armor",
    name: "Magierrüstung",
    level: 1,
    school: "abjuration",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Ein Stück gehärtetes Leder",
    },
    duration: "8 Stunden",
    concentration: false,
    ritual: false,
    description:
      "Die Rüstungsklasse eines ungerüsteten Ziels beträgt 13 plus Geschicklichkeitsmodifikator.",
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "magic-missile",
    name: "Magisches Geschoss",
    level: 1,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "36 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Drei magische Geschosse treffen automatisch und verursachen jeweils 1W4 + 1 Energieschaden.",
    damage: {
      dice: {
        dice: 1,
        die: 4,
      },
      damageType: "force",
    },
    higherLevels:
      "Für jeden höheren Zauberplatz entsteht ein zusätzliches Geschoss.",
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "protection-from-evil-and-good",
    name: "Schutz vor Gut und Böse",
    level: 1,
    school: "abjuration",
    castingTime: "1 Aktion",
    range: "Berührung",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Weihwasser oder pulverisiertes Silber und Eisen",
    },
    duration:
      "Konzentration, bis zu 10 Minuten",
    concentration: true,
    ritual: false,
    description:
      "Das Ziel wird gegen bestimmte übernatürliche Kreaturentypen geschützt.",
    classIds: [
      "cleric",
      "paladin",
      "warlock",
      "wizard",
    ],
  },

  {
    id: "shield",
    name: "Schild",
    level: 1,
    school: "abjuration",
    castingTime: "1 Reaktion",
    range: "Selbst",
    components: verbalSomatic,
    duration: "1 Runde",
    concentration: false,
    ritual: false,
    description:
      "Eine unsichtbare Barriere gewährt bis zum Beginn deines nächsten Zuges +5 auf die Rüstungsklasse.",
    classIds: [
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "shield-of-faith",
    name: "Schild des Glaubens",
    level: 1,
    school: "abjuration",
    castingTime: "1 Bonusaktion",
    range: "18 m",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Ein kleines Pergament mit heiligem Text",
    },
    duration:
      "Konzentration, bis zu 10 Minuten",
    concentration: true,
    ritual: false,
    description:
      "Ein Ziel erhält für die Dauer +2 auf die Rüstungsklasse.",
    classIds: [
      "cleric",
      "paladin",
    ],
  },

  {
    id: "sleep",
    name: "Schlaf",
    level: 1,
    school: "enchantment",
    castingTime: "1 Aktion",
    range: "27 m",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription:
        "Sand, Rosenblüten oder eine Grille",
    },
    duration: "1 Minute",
    concentration: false,
    ritual: false,
    description:
      "Kreaturen in einem Bereich fallen abhängig von ihren Trefferpunkten in magischen Schlaf.",
    classIds: [
      "bard",
      "sorcerer",
      "wizard",
    ],
  },

  {
    id: "speak-with-animals",
    name: "Mit Tieren sprechen",
    level: 1,
    school: "divination",
    castingTime: "1 Aktion",
    range: "Selbst",
    components: verbalSomatic,
    duration: "10 Minuten",
    concentration: false,
    ritual: true,
    description:
      "Du kannst Tiere verstehen und verbal mit ihnen kommunizieren.",
    classIds: [
      "bard",
      "druid",
      "ranger",
    ],
  },

  {
    id: "thunderwave",
    name: "Donnerwoge",
    level: 1,
    school: "evocation",
    castingTime: "1 Aktion",
    range: "Selbst, Würfel von 4,5 m",
    components: verbalSomatic,
    duration: "Sofort",
    concentration: false,
    ritual: false,
    description:
      "Eine Welle aus Donnerkraft trifft Kreaturen in einem Bereich.",
    damage: {
      dice: {
        dice: 2,
        die: 8,
      },
      damageType: "thunder",
      savingThrowAbility:
        "constitution",
      halfDamageOnSave: true,
    },
    higherLevels:
      "Der Schaden steigt für jeden höheren Zauberplatz um 1W8.",
    classIds: [
      "bard",
      "druid",
      "sorcerer",
      "wizard",
    ],
  },
];

export function getSpellById(
  spellId: string,
): SpellDefinition | undefined {
  return spells.find(
    (spell) =>
      spell.id === spellId,
  );
}

export function getSpellsForClass(
  classId: string,
): SpellDefinition[] {
  return spells.filter(
    (spell) =>
      spell.classIds.includes(classId),
  );
}

export function getSpellsForClassAndLevel(
  classId: string,
  spellLevel: number,
): SpellDefinition[] {
  return spells.filter(
    (spell) =>
      spell.level === spellLevel &&
      spell.classIds.includes(classId),
  );
}