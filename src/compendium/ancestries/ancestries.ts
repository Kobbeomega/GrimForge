import type {
  AbilityId,
} from "../core";

import type {
  CompendiumEntityBase,
  CompendiumSource,
} from "../shared";

export type CharacterSize =
  | "small"
  | "medium";

export type AncestrySource =
  Extract<
    CompendiumSource,
    | "core"
    | "srd-2024"
    | "grim-hollow"
    | "grim-hollow-2025"
    | "custom"
  >;

export interface AbilityBonusChoice {
  choose: number;
  bonus: number;
  exclude?: AbilityId[];
}

export interface AncestryVariant
  extends Omit<
    CompendiumEntityBase,
    "source"
  > {
  source?: AncestrySource;

  abilityBonuses?: Partial<
    Record<AbilityId, number>
  >;

  speedBonus?: number;

  darkvision?: number;

  traits: string[];
}

export interface CharacterAncestry
  extends Omit<
    CompendiumEntityBase,
    "source"
  > {
  /**
   * Vorübergehend optional, damit die bereits
   * vorhandenen Herkunftseinträge unverändert
   * weiterbauen.
   *
   * Im nächsten Daten-Cleanup setzen wir die
   * Quelle an jedem Eintrag ausdrücklich.
   */
  source?: AncestrySource;

  size: CharacterSize;

  speed: number;

  darkvision?: number;

  languages: string[];

  /**
   * Legacy-Felder für ältere Charaktere.
   *
   * Das neue Herkunftssystem verwendet keine
   * automatisch vergebenen Attributsboni.
   */
  abilityBonuses: Partial<
    Record<AbilityId, number>
  >;

  abilityBonusChoice?: AbilityBonusChoice;

  /**
   * Aktuell enthält dieses Feld das empfohlene
   * traditionelle Eigenschaftspaket als Namen.
   */
  traits: string[];

  variants: AncestryVariant[];
}

export const ancestries:
  CharacterAncestry[] = [
    {
      id: "dragonborn",

      name: "Drachenblütiger",

      description:
        "Eine stolze humanoide Herkunft mit drakonischen Zügen, elementarer Macht und einschüchternder Präsenz.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: { strength: 2, charisma: 1 },

      traits: [
        "Atemwaffe",
        "Schadensresistenz",
        "Bedrohliches Brüllen",
        "Dunkelsicht",
        "Natürliche Bewegung",
        "Kräftiger Körperbau",
        "Fester Einfluss",
        "Vom Glauben bewegt",
      ],

      variants: [],
    },

    {
      id: "dwarf",

      name: "Zwerg",

      description:
        "Eine widerstandsfähige und traditionsbewusste Herkunft, geprägt von Handwerk, Standfestigkeit und uralten Gemeinschaften.",

      size: "medium",

      speed: 9,

      darkvision: 18,

      languages: [],

      abilityBonuses: { constitution: 2 },

      traits: [
        "Schwere Rüstung reduziert die Bewegung nicht",
        "Schadensresistenz: Gift",
        "Zähigkeit",
        "Waffenbegabung",
        "Dunkelsicht",
        "Giftzähigkeit",
        "Standfest",
        "Handwerklicher Schwerpunkt",
        "Auge des Handwerkers",
      ],

      variants: [
        { id: "hill-dwarf", name: "Hügelzwerg", description: "Zäh und weise.", abilityBonuses: { wisdom: 1 }, traits: ["Zwergische Zähigkeit"] },
        { id: "mountain-dwarf", name: "Gebirgszwerg", description: "Stark und rüstungsgeübt.", abilityBonuses: { strength: 2 }, traits: ["Rüstungstraining"] },
      ],
    },

    {
      id: "elf",

      name: "Elf",

      description:
        "Eine langlebige, wachsame und magisch begabte Herkunft mit tiefer Verbindung zu Erinnerung und Wildnis.",

      size: "medium",

      speed: 9,

      darkvision: 18,

      languages: [],

      abilityBonuses: { dexterity: 2 },

      traits: [
        "Erwachter Geist",
        "Fokussierter Geist",
        "Waffenbegabung",
        "Dunkelsicht",
        "Meditative Ruhe",
        "Schleier der Wildnis",
        "Angeborene Wahrnehmung",
        "Magische Gewandtheit",
      ],

      variants: [
        { id: "high-elf", name: "Hochelf", description: "Magisch geschult und gelehrt.", abilityBonuses: { intelligence: 1 }, traits: ["Elfisches Waffentraining", "Magier-Zaubertrick"] },
        { id: "wood-elf", name: "Waldelf", description: "Schnell und naturverbunden.", abilityBonuses: { wisdom: 1 }, speedBonus: 1.5, traits: ["Maske der Wildnis"] },
        { id: "drow", name: "Drow", description: "Von der Tiefe und ihrer Magie geprägt.", abilityBonuses: { charisma: 1 }, darkvision: 36, traits: ["Drow-Magie", "Sonnenlichtempfindlichkeit"] },
      ],
    },

    {
      id: "gnome",

      name: "Gnom",

      description:
        "Eine kleine, neugierige und erfinderische Herkunft mit ausgeprägter geistiger Widerstandskraft und magischer Begabung.",

      size: "small",

      speed: 9,

      darkvision: 18,

      languages: [],

      abilityBonuses: { intelligence: 2 },

      traits: [
        "Magische Befestigung",
        "Schnelles Entwischen",
        "Kunstfertigkeits-Expertise",
        "Dunkelsicht",
        "Verblassen",
        "Magische Gewandtheit",
        "Meisterhafte Begabung",
        "Stimme der Natur",
      ],

      variants: [
        { id: "forest-gnome", name: "Waldgnom", description: "Verbunden mit Illusion und kleinen Tieren.", abilityBonuses: { dexterity: 1 }, traits: ["Kleine Illusion", "Mit kleinen Tieren sprechen"] },
        { id: "rock-gnome", name: "Felsengnom", description: "Erfinderisch und widerstandsfähig.", abilityBonuses: { constitution: 1 }, traits: ["Handwerkerwissen", "Bastler"] },
      ],
    },

    {
      id: "halfling",

      name: "Halbling",

      description:
        "Eine kleine, mutige und gemeinschaftsorientierte Herkunft, deren Angehörige für Glück und Anpassungsfähigkeit bekannt sind.",

      size: "small",

      speed: 9,

      languages: [],

      abilityBonuses: { dexterity: 2 },

      traits: [
        "Tapfer",
        "Kreaturendeckung",
        "Glücklich",
        "Helfende Hand",
        "Hindurchschlüpfen",
        "Kraftschlaf",
        "Handwerklicher Schwerpunkt",
        "Die Vergangenheit annehmen",
      ],

      variants: [
        { id: "lightfoot-halfling", name: "Leichtfuß", description: "Unauffällig und gewinnend.", abilityBonuses: { charisma: 1 }, traits: ["Von Natur aus verstohlen"] },
        { id: "stout-halfling", name: "Stämmiger Halbling", description: "Robust und giftzäh.", abilityBonuses: { constitution: 1 }, traits: ["Stämmige Zähigkeit"] },
      ],
    },

    {
      id: "human",

      name: "Mensch",

      description:
        "Eine vielseitige und anpassungsfähige Herkunft, deren Stärke aus Ehrgeiz, Erfahrung und kultureller Vielfalt erwächst.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },

      traits: [
        "Beeindruckender kritischer Treffer",
        "Erstschlag",
        "Waffenbegabung",
        "Helfende Hand",
        "Angeborene Orientierung",
        "Handwerklicher Schwerpunkt",
        "Scharfsinniger Überlebender",
        "Fertigkeitskönnen",
      ],

      variants: [],
    },

    {
      id: "halfelf",
      name: "Halbelf",
      description: "Eine vielseitige Herkunft zwischen menschlichem Ehrgeiz und elfischem Erbe.",
      size: "medium",
      speed: 9,
      darkvision: 18,
      languages: ["Gemeinsprache", "Elfisch"],
      abilityBonuses: { charisma: 2 },
      abilityBonusChoice: { choose: 2, bonus: 1, exclude: ["charisma"] },
      traits: ["Feenblut", "Vielseitige Fertigkeit"],
      variants: [],
    },

    {
      id: "halforc",
      name: "Halbork",
      description: "Eine kraftvolle und unbeugsame Herkunft mit orkischem Erbe.",
      size: "medium",
      speed: 9,
      darkvision: 18,
      languages: ["Gemeinsprache", "Orkisch"],
      abilityBonuses: { strength: 2, constitution: 1 },
      traits: ["Bedrohlich", "Unerbittliche Ausdauer", "Wilde Angriffe"],
      variants: [],
    },

    {
      id: "tiefling",
      name: "Tiefling",
      description: "Eine infernalisch geprägte Herkunft mit angeborener Magie und Feuerresistenz.",
      size: "medium",
      speed: 9,
      darkvision: 18,
      languages: ["Gemeinsprache", "Infernalisch"],
      abilityBonuses: { intelligence: 1, charisma: 2 },
      traits: ["Höllische Resistenz", "Höllisches Vermächtnis"],
      variants: [],
    },

    {
      id: "dreamer",

      name: "Träumer",

      description:
        "Eine seltene Herkunft, deren Angehörige tief mit Schlaf, Träumen und verborgenen Wahrnehmungen verbunden sind.",

      size: "medium",

      speed: 9,

      darkvision: 18,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Schnelle Initiative",
        "Standhafte Reserven",
        "Dunkelsicht",
        "Helfende Hand",
        "Kraftschlaf",
        "Traumwandeln",
        "Improvisator",
        "Angeborene Wahrnehmung",
      ],

      variants: [],
    },

    {
      id: "grudgel",

      name: "Grudgel",

      description:
        "Eine seltene, kräftige und handwerklich geprägte Herkunft mit ausgeprägter Konzentration und Ausdauer.",

      size: "medium",

      speed: 9,

      darkvision: 18,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Schlachtfeldkontrolle",
        "Zentriert",
        "Dunkelsicht",
        "Kräftiger Körperbau",
        "Unermüdlich",
        "Handwerklicher Schwerpunkt",
        "Spontaner Handwerker",
        "Magische Gewandtheit",
      ],

      variants: [],
    },

    {
      id: "laneshi",

      name: "Laneshi",

      description:
        "Eine amphibische und geistig begabte Herkunft, die in Wasser ebenso sicher lebt wie an Land.",

      size: "medium",

      speed: 9,

      darkvision: 18,

      languages: [],

      abilityBonuses: {},

      traits: [
        "9 m Schwimmbewegung",
        "Erwachter Geist",
        "Psychischer Geist",
        "Amphibisch",
        "Dunkelsicht",
        "Schwimmer",
        "Tierfreund",
        "Magische Gewandtheit",
        "Stimme der Natur",
      ],

      variants: [],
    },

    {
      id: "ogresh",

      name: "Ogresh",

      description:
        "Eine seltene und kräftige Herkunft mit natürlicher Wachsamkeit, taktischer Einsicht und eindrucksvoller Präsenz.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Feind in Bewegung",
        "Fokussierter Geist",
        "Umgebungsbewusstsein",
        "Natürliche Bewegung",
        "Kräftiger Körperbau",
        "Berechnender Zuhörer",
        "Gebietende Einsicht",
        "Überzeugendes Talent",
      ],

      variants: [],
    },

    {
      id: "cursed",

      name: "Verfluchter",

      description:
        "Eine einzigartige, von einem Fluch geformte Herkunft, deren Eigenschaften vollständig individuell zusammengestellt werden.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Freie Auswahl von acht Herkunftseigenschaften",
      ],

      variants: [],
    },

    {
      id: "awakened",

      name: "Erweckter",

      description:
        "Eine künstlich erschaffene und kaum alternde Herkunft, deren Körper nicht den üblichen Grenzen sterblicher Wesen folgt.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Magische Befestigung",
        "Hartnäckig",
        "Zähigkeit",
        "Künstliche Gestalt",
        "An die Elemente gewöhnt",
        "Die Vergangenheit annehmen",
        "Magische Einsicht",
        "Unnatürlicher Heiler",
      ],

      variants: [],
    },

    {
      id: "dhampir",

      name: "Dhampir",

      description:
        "Eine vom Vampirismus berührte Herkunft mit unnatürlichem Hunger, körperlicher Kraft und zeitloser Erscheinung.",

      size: "medium",

      speed: 9,

      darkvision: 18,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Altert nicht",
        "Entziehender Angriff",
        "Natürlicher Angriff: Fänge",
        "Gut geschützt",
        "Kletterer",
        "Dunkelsicht",
        "Eifriger Täuscher",
        "Magisches Ausnahmetalent",
        "Magische Gewandtheit",
      ],

      variants: [],
    },

    {
      id: "disembodied",

      name: "Körperloser",

      description:
        "Eine teilweise aus der materiellen Welt gelöste Herkunft, die zwischen körperlicher und ätherischer Existenz schwankt.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Magische Befestigung",
        "Meister der Ablenkung",
        "Phasenverschoben",
        "Ätherisches Verblassen",
        "An die Elemente gewöhnt",
        "Magische Einsicht",
        "Magisches Ausnahmetalent",
        "Magische Gewandtheit",
      ],

      variants: [],
    },

    {
      id: "fallen",

      name: "Gefallener",

      description:
        "Eine langlebige, von himmlischer oder göttlicher Macht gezeichnete Herkunft zwischen Gnade, Pflicht und Verderbnis.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Sehr langlebig",
        "Göttliche Sangromantie",
        "Berührung des Lebens",
        "An die Elemente gewöhnt",
        "Meditative Ruhe",
        "Unermüdlich",
        "Magisches Ausnahmetalent",
        "Magische Gewandtheit",
        "Vom Glauben bewegt",
      ],

      variants: [],
    },

    {
      id: "changeling",

      name: "Wechselkind",

      description:
        "Eine kleine, künstliche und kaum alternde Herkunft mit ausgeprägter Begabung für Illusion, Täuschung und Anpassung.",

      size: "small",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Künstlicher Körper",
        "Altert kaum",
        "Kreaturendeckung",
        "Magische Befestigung",
        "Künstliche Gestalt",
        "Helfende Hand",
        "Hindurchschlüpfen",
        "Magisches Ausnahmetalent",
        "Magische Gewandtheit",
        "Intuitiver Akrobat",
      ],

      variants: [],
    },

    {
      id: "wulven",

      name: "Wulven",

      description:
        "Eine wolfsähnliche Herkunft mit scharfen Sinnen, natürlicher Bewaffnung und starkem Rudelinstinkt.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [
        "Jägerinstinkt",
        "Natürlicher Angriff: Klauen",
        "Rudeljäger",
        "Geschwindigkeitsschub",
        "Kletterer",
        "Athletengeist",
        "Angeborene Wahrnehmung",
        "Stimme der Natur",
      ],

      variants: [],
    },

    {
      id: "custom",

      name: "Eigene Abstammung",

      description:
        "Eine frei definierbare Abstammung ohne automatisch vorgegebene Regelwerte.",

      size: "medium",

      speed: 9,

      languages: [],

      abilityBonuses: {},

      traits: [],

      variants: [],
    },
  ];

export function getAncestryById(
  ancestryId: string,
): CharacterAncestry | undefined {
  return ancestries.find(
    (ancestry) =>
      ancestry.id === ancestryId,
  );
}