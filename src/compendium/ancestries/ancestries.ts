import type { AbilityId } from "../core";

export type CharacterSize = "small" | "medium";

export interface AbilityBonusChoice {
  choose: number;
  bonus: number;
  exclude?: AbilityId[];
}

export interface AncestryVariant {
  id: string;
  name: string;
  description: string;
  abilityBonuses?: Partial<Record<AbilityId, number>>;
  speedBonus?: number;
  darkvision?: number;
  traits: string[];
}

export interface CharacterAncestry {
  id: string;
  name: string;
  description: string;
  size: CharacterSize;
  speed: number;
  darkvision?: number;
  languages: string[];
  abilityBonuses: Partial<Record<AbilityId, number>>;
  abilityBonusChoice?: AbilityBonusChoice;
  traits: string[];
  variants: AncestryVariant[];
}

export const ancestries: CharacterAncestry[] = [
  {
    id: "human",
    name: "Mensch",
    description:
      "Anpassungsfähige Sterbliche, deren Kulturen, Überzeugungen und Lebenswege außerordentlich vielfältig sind.",
    size: "medium",
    speed: 9,
    languages: [
      "Gemeinsprache",
      "Eine zusätzliche Sprache",
    ],
    abilityBonuses: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },
    traits: [
      "Menschliche Vielseitigkeit",
    ],
    variants: [
      {
        id: "versatile-human",
        name: "Vielseitiger Mensch",
        description:
          "Eine besonders flexible Herkunft mit stärkerer individueller Ausbildung.",
        traits: [
          "Zusätzliche Ausbildung",
          "Freie Spezialisierung",
        ],
      },
      {
        id: "frontier-human",
        name: "Grenzlandmensch",
        description:
          "Aufgewachsen in einer rauen Region, in der Wachsamkeit und Ausdauer überlebenswichtig sind.",
        abilityBonuses: {
          constitution: 1,
        },
        traits: [
          "Grenzlandinstinkt",
        ],
      },
    ],
  },

  {
    id: "elf",
    name: "Elf",
    description:
      "Langlebige Wesen mit geschärften Sinnen, tiefer Erinnerung und einer natürlichen Nähe zur Magie.",
    size: "medium",
    speed: 9,
    darkvision: 18,
    languages: [
      "Gemeinsprache",
      "Elfisch",
    ],
    abilityBonuses: {
      dexterity: 2,
    },
    traits: [
      "Geschärfte Sinne",
      "Feenblut",
      "Trance",
    ],
    variants: [
      {
        id: "high-elf",
        name: "Hochelf",
        description:
          "Eine gelehrte elfische Linie, die arkane Traditionen und diszipliniertes Studium pflegt.",
        abilityBonuses: {
          intelligence: 1,
        },
        traits: [
          "Arkane Ausbildung",
        ],
      },
      {
        id: "wood-elf",
        name: "Waldelf",
        description:
          "Eine schnelle und naturverbundene Linie, die in Wäldern und ungezähmten Regionen heimisch ist.",
        abilityBonuses: {
          wisdom: 1,
        },
        speedBonus: 1.5,
        traits: [
          "Wildnisverbundenheit",
        ],
      },
      {
        id: "dark-elf",
        name: "Dunkelelf",
        description:
          "Eine elfische Linie aus lichtarmen und gefährlichen Regionen unterhalb der Oberfläche.",
        abilityBonuses: {
          charisma: 1,
        },
        darkvision: 36,
        traits: [
          "Überlegene Dunkelsicht",
          "Unterweltanpassung",
        ],
      },
      {
        id: "pale-elf",
        name: "Bleichelf",
        description:
          "Eine zurückgezogene Linie, deren Angehörige für ihre stille Wachsamkeit bekannt sind.",
        abilityBonuses: {
          wisdom: 1,
        },
        traits: [
          "Stille Wachsamkeit",
        ],
      },
    ],
  },

  {
    id: "dwarf",
    name: "Zwerg",
    description:
      "Robuste und traditionsbewusste Bewohner von Bergen, Festungen und uralten Hallen.",
    size: "medium",
    speed: 7.5,
    darkvision: 18,
    languages: [
      "Gemeinsprache",
      "Zwergisch",
    ],
    abilityBonuses: {
      constitution: 2,
    },
    traits: [
      "Zwergische Zähigkeit",
      "Steinwissen",
    ],
    variants: [
      {
        id: "hill-dwarf",
        name: "Hügelzwerg",
        description:
          "Eine besonders ausdauernde Linie mit starker Verbindung zu Gemeinschaft und Überlieferung.",
        abilityBonuses: {
          wisdom: 1,
        },
        traits: [
          "Robuste Gesundheit",
        ],
      },
      {
        id: "mountain-dwarf",
        name: "Bergzwerg",
        description:
          "Eine kräftige und kampferprobte Linie aus befestigten Bergreichen.",
        abilityBonuses: {
          strength: 2,
        },
        traits: [
          "Rüstungsausbildung",
        ],
      },
      {
        id: "deep-dwarf",
        name: "Tiefenzwerg",
        description:
          "Eine an unterirdische Isolation, Finsternis und feindliche Tiefen angepasste Linie.",
        abilityBonuses: {
          strength: 1,
        },
        darkvision: 36,
        traits: [
          "Tiefenanpassung",
        ],
      },
    ],
  },

  {
    id: "halfling",
    name: "Halbling",
    description:
      "Kleine und bemerkenswert mutige Leute, die Geschick, Gemeinschaft und ein ungewöhnliches Glück verbinden.",
    size: "small",
    speed: 7.5,
    languages: [
      "Gemeinsprache",
      "Halblingisch",
    ],
    abilityBonuses: {
      dexterity: 2,
    },
    traits: [
      "Glück",
      "Tapferkeit",
      "Halblingsgewandtheit",
    ],
    variants: [
      {
        id: "lightfoot-halfling",
        name: "Leichtfuß",
        description:
          "Eine gesellige und besonders unauffällige halblingische Linie.",
        abilityBonuses: {
          charisma: 1,
        },
        traits: [
          "Natürlich verstohlen",
        ],
      },
      {
        id: "stout-halfling",
        name: "Stämmiger Halbling",
        description:
          "Eine widerstandsfähige Linie, die körperliche Härte und gesunden Pragmatismus schätzt.",
        abilityBonuses: {
          constitution: 1,
        },
        traits: [
          "Zähe Natur",
        ],
      },
      {
        id: "ghostwise-halfling",
        name: "Geisterweiser Halbling",
        description:
          "Eine zurückgezogene Linie mit ungewöhnlich feiner Wahrnehmung und stiller Verständigung.",
        abilityBonuses: {
          wisdom: 1,
        },
        traits: [
          "Stille Verständigung",
        ],
      },
    ],
  },

  {
    id: "gnome",
    name: "Gnom",
    description:
      "Neugierige, erfinderische und geistig widerstandsfähige Wesen mit einer Vorliebe für Geheimnisse und Entdeckungen.",
    size: "small",
    speed: 7.5,
    darkvision: 18,
    languages: [
      "Gemeinsprache",
      "Gnomisch",
    ],
    abilityBonuses: {
      intelligence: 2,
    },
    traits: [
      "Gnomische Gerissenheit",
    ],
    variants: [
      {
        id: "forest-gnome",
        name: "Waldgnom",
        description:
          "Eine heimliche, naturverbundene Linie mit einem Gespür für kleine Illusionen.",
        abilityBonuses: {
          dexterity: 1,
        },
        traits: [
          "Natürlicher Illusionist",
        ],
      },
      {
        id: "rock-gnome",
        name: "Felsengnom",
        description:
          "Eine handwerklich begabte Linie, die Werkzeuge, Mechanik und Improvisation liebt.",
        abilityBonuses: {
          constitution: 1,
        },
        traits: [
          "Tüftlerwissen",
        ],
      },
      {
        id: "deep-gnome",
        name: "Tiefengnom",
        description:
          "Eine vorsichtige und unauffällige Linie aus den unterirdischen Reichen.",
        abilityBonuses: {
          dexterity: 1,
        },
        darkvision: 36,
        traits: [
          "Steintarnung",
        ],
      },
    ],
  },

  {
    id: "half-elf",
    name: "Halbelf",
    description:
      "Menschen mit elfischem Erbe, die häufig zwischen unterschiedlichen Kulturen, Erwartungen und Traditionen leben.",
    size: "medium",
    speed: 9,
    darkvision: 18,
    languages: [
      "Gemeinsprache",
      "Elfisch",
      "Eine zusätzliche Sprache",
    ],
    abilityBonuses: {
      charisma: 2,
    },
    abilityBonusChoice: {
      choose: 2,
      bonus: 1,
      exclude: [
        "charisma",
      ],
    },
    traits: [
      "Feenblut",
      "Vielseitige Begabung",
    ],
    variants: [
      {
        id: "urban-half-elf",
        name: "Städtischer Halbelf",
        description:
          "Zwischen vielen Kulturen, Sprachen und gesellschaftlichen Erwartungen aufgewachsen.",
        traits: [
          "Straßenkenntnis",
        ],
      },
      {
        id: "wild-half-elf",
        name: "Wildnis-Halbelf",
        description:
          "Zwischen Siedlung und ungezähmter Wildnis aufgewachsen.",
        traits: [
          "Grenzlandinstinkt",
        ],
      },
    ],
  },

  {
    id: "half-orc",
    name: "Halbork",
    description:
      "Kräftige und widerstandsfähige Menschen orkischer Abstammung, die oft zwischen mehreren Welten stehen.",
    size: "medium",
    speed: 9,
    darkvision: 18,
    languages: [
      "Gemeinsprache",
      "Orkisch",
    ],
    abilityBonuses: {
      strength: 2,
      constitution: 1,
    },
    traits: [
      "Bedrohliche Erscheinung",
      "Unerbittliche Ausdauer",
      "Wilde Angriffe",
    ],
    variants: [
      {
        id: "clan-raised-half-orc",
        name: "Im Clan aufgewachsen",
        description:
          "Eine Herkunft, die stärker von orkischer Gemeinschaft und Tradition geprägt wurde.",
        traits: [
          "Clanbindung",
        ],
      },
      {
        id: "city-raised-half-orc",
        name: "In der Stadt aufgewachsen",
        description:
          "Eine Herkunft zwischen Vorurteilen, urbaner Härte und menschlicher Anpassungsfähigkeit.",
        traits: [
          "Harte Schale",
        ],
      },
    ],
  },

  {
    id: "dragonborn",
    name: "Drachenblütiger",
    description:
      "Stolze Humanoide mit einem elementaren drachenartigen Erbe und einer mächtigen Odemwaffe.",
    size: "medium",
    speed: 9,
    languages: [
      "Gemeinsprache",
      "Drakonisch",
    ],
    abilityBonuses: {
      strength: 2,
      charisma: 1,
    },
    traits: [
      "Odemwaffe",
      "Elementare Resistenz",
    ],
    variants: [
      {
        id: "chromatic-dragonborn",
        name: "Chromatisches Erbe",
        description:
          "Eine Linie mit besonders zerstörerischer elementarer Prägung.",
        traits: [
          "Chromatische Widerstandskraft",
        ],
      },
      {
        id: "metallic-dragonborn",
        name: "Metallisches Erbe",
        description:
          "Eine widerstandsfähige und kontrollierte drachenartige Linie.",
        traits: [
          "Metallischer Odem",
        ],
      },
      {
        id: "gem-dragonborn",
        name: "Edelsteinerbe",
        description:
          "Eine seltene Linie mit fremdartiger mentaler oder psionischer Resonanz.",
        traits: [
          "Psionische Resonanz",
        ],
      },
    ],
  },

  {
    id: "tiefling",
    name: "Tiefling",
    description:
      "Sterbliche, deren Blutlinie von infernalischen, abyssalen oder anderweitig fremdartigen Mächten geprägt wurde.",
    size: "medium",
    speed: 9,
    darkvision: 18,
    languages: [
      "Gemeinsprache",
      "Infernalisch",
    ],
    abilityBonuses: {
      charisma: 2,
      intelligence: 1,
    },
    traits: [
      "Höllenresistenz",
      "Infernalisches Erbe",
    ],
    variants: [
      {
        id: "infernal-tiefling",
        name: "Infernalische Linie",
        description:
          "Eine Blutlinie mit deutlicher Verbindung zu geordneten höllischen Mächten.",
        traits: [
          "Höllische Zauberkraft",
        ],
      },
      {
        id: "abyssal-tiefling",
        name: "Abyssale Linie",
        description:
          "Eine chaotische und unberechenbare Linie aus den Abgründen.",
        abilityBonuses: {
          constitution: 1,
        },
        traits: [
          "Abyssale Widerstandskraft",
        ],
      },
      {
        id: "shadow-tiefling",
        name: "Schattenlinie",
        description:
          "Eine Blutlinie, die von Finsternis, Geheimnissen und verborgenen Pakten gezeichnet ist.",
        abilityBonuses: {
          dexterity: 1,
        },
        traits: [
          "Schattenzeichen",
        ],
      },
    ],
  },

  {
    id: "custom",
    name: "Eigene Abstammung",
    description:
      "Eine frei definierbare Abstammung ohne automatisch vorgegebene Regelwerte.",
    size: "medium",
    speed: 9,
    languages: [
      "Gemeinsprache",
    ],
    abilityBonuses: {},
    traits: [],
    variants: [],
  },
];