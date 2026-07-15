import type {
  SkillId,
} from "../skills";

import type {
  CompendiumEntityBase,
  CompendiumSource,
} from "../shared";

export type BackgroundSource =
  Extract<
    CompendiumSource,
    | "core"
    | "grim-hollow"
    | "grim-hollow-2025"
    | "custom"
  >;

export interface BackgroundFeature
  extends Omit<
    CompendiumEntityBase,
    "source"
  > {
  source: BackgroundSource;
}

export interface CharacterBackground
  extends Omit<
    CompendiumEntityBase,
    "source"
  > {
  source: BackgroundSource;

  skillProficiencies: SkillId[];

  toolProficiencies: string[];

  languageChoices: number;

  /**
   * Equipment-IDs aus dem
   * Ausrüstungskompendium.
   *
   * Die bestehenden Grundhintergründe besitzen
   * aktuell noch keine automatisch zugewiesene
   * Ausrüstung und verwenden deshalb leere Arrays.
   */
  equipment: string[];

  feature: BackgroundFeature;
}

export const backgrounds:
  CharacterBackground[] = [
    {
      id: "acolyte",

      name: "Akolyth",

      description:
        "Du hast einen bedeutenden Teil deines Lebens im Dienst eines Tempels, Ordens oder religiösen Bundes verbracht.",

      source: "core",

      skillProficiencies: [
        "insight",
        "religion",
      ],

      toolProficiencies: [],

      languageChoices: 2,

      equipment: [],

      feature: {
        id: "shelter-of-the-faithful",

        name: "Zuflucht des Glaubens",

        description:
          "Angehörige deiner Glaubensgemeinschaft erkennen deine Ausbildung an und können dir im Rahmen ihrer Möglichkeiten Unterkunft, Rat oder einfache Unterstützung gewähren.",

        source: "core",
      },
    },

    {
      id: "criminal",

      name: "Krimineller",

      description:
        "Du kennst die verborgenen Wege der Städte, den Wert eines guten Kontakts und die Regeln der Unterwelt.",

      source: "core",

      skillProficiencies: [
        "deception",
        "stealth",
      ],

      toolProficiencies: [
        "Diebeswerkzeug",
        "Ein Spielset nach Wahl",
      ],

      languageChoices: 0,

      equipment: [],

      feature: {
        id: "criminal-contact",

        name: "Kontakt zur Unterwelt",

        description:
          "Du kennst eine verlässliche Person oder ein Netzwerk, über das Nachrichten, Gerüchte oder kleinere Gefälligkeiten innerhalb krimineller Kreise vermittelt werden können.",

        source: "core",
      },
    },

    {
      id: "folk-hero",

      name: "Volksheld",

      description:
        "Deine Herkunft liegt unter gewöhnlichen Leuten, doch eine mutige Tat machte dich in deiner Heimat bekannt.",

      source: "core",

      skillProficiencies: [
        "animal-handling",
        "survival",
      ],

      toolProficiencies: [
        "Ein Handwerkszeug nach Wahl",
        "Landfahrzeuge",
      ],

      languageChoices: 0,

      equipment: [],

      feature: {
        id: "rustic-hospitality",

        name: "Freund des einfachen Volkes",

        description:
          "Gewöhnliche Leute neigen dazu, dir zu vertrauen, dir ein einfaches Versteck anzubieten oder dich vor unmittelbarer Gefahr zu warnen.",

        source: "core",
      },
    },

    {
      id: "noble",

      name: "Adliger",

      description:
        "Du entstammst einer angesehenen Familie oder wurdest in die Regeln von Hof, Rang und Einfluss eingeführt.",

      source: "core",

      skillProficiencies: [
        "history",
        "persuasion",
      ],

      toolProficiencies: [
        "Ein Spielset nach Wahl",
      ],

      languageChoices: 1,

      equipment: [],

      feature: {
        id: "position-of-privilege",

        name: "Stand und Ansehen",

        description:
          "Dein Name, dein Auftreten oder deine Verbindungen öffnen dir in vielen gehobenen Kreisen Türen, die anderen verschlossen bleiben.",

        source: "core",
      },
    },

    {
      id: "sage",

      name: "Gelehrter",

      description:
        "Jahre des Studiums haben dir einen breiten Wissensschatz und Erfahrung im Umgang mit Archiven und Lehrstätten vermittelt.",

      source: "core",

      skillProficiencies: [
        "arcana",
        "history",
      ],

      toolProficiencies: [],

      languageChoices: 2,

      equipment: [],

      feature: {
        id: "researcher",

        name: "Weg zum Wissen",

        description:
          "Wenn dir eine Information fehlt, kannst du häufig einschätzen, in welcher Bibliothek, Sammlung oder bei welcher Fachperson sie zu finden sein könnte.",

        source: "core",
      },
    },

    {
      id: "soldier",

      name: "Soldat",

      description:
        "Du wurdest für Krieg, Wachdienst oder den bewaffneten Schutz einer Gemeinschaft ausgebildet.",

      source: "core",

      skillProficiencies: [
        "athletics",
        "intimidation",
      ],

      toolProficiencies: [
        "Ein Spielset nach Wahl",
        "Landfahrzeuge",
      ],

      languageChoices: 0,

      equipment: [],

      feature: {
        id: "military-rank",

        name: "Militärischer Rang",

        description:
          "Veteranen und Angehörige organisierter Streitkräfte erkennen deine Erfahrung und deinen früheren Rang häufig an.",

        source: "core",
      },
    },
  ];

export function getBackgroundById(
  backgroundId: string,
): CharacterBackground | undefined {
  return backgrounds.find(
    (background) =>
      background.id === backgroundId,
  );
}