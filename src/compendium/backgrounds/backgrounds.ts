import type {
  BackgroundDefinition,
} from "./types";

export const backgrounds: BackgroundDefinition[] = [
  {
    id: "acolyte",

    name: "Akolyth",

    description:
      "Du hast einen bedeutenden Teil deines Lebens im Dienst eines Tempels, Ordens oder religiösen Bundes verbracht.",

    skillProficiencies: [
      "insight",
      "religion",
    ],

    toolProficiencies: [],

    languageChoices: 2,

    feature: {
      name: "Zuflucht des Glaubens",

      description:
        "Angehörige deiner Glaubensgemeinschaft erkennen deine Ausbildung an und können dir im Rahmen ihrer Möglichkeiten Unterkunft, Rat oder einfache Unterstützung gewähren.",
    },
  },

  {
    id: "criminal",

    name: "Krimineller",

    description:
      "Du kennst die verborgenen Wege der Städte, den Wert eines guten Kontakts und die Regeln der Unterwelt.",

    skillProficiencies: [
      "deception",
      "stealth",
    ],

    toolProficiencies: [
      "Diebeswerkzeug",
      "Ein Spielset nach Wahl",
    ],

    languageChoices: 0,

    feature: {
      name: "Kontakt zur Unterwelt",

      description:
        "Du kennst eine verlässliche Person oder ein Netzwerk, über das Nachrichten, Gerüchte oder kleinere Gefälligkeiten innerhalb krimineller Kreise vermittelt werden können.",
    },
  },

  {
    id: "folk-hero",

    name: "Volksheld",

    description:
      "Deine Herkunft liegt unter gewöhnlichen Leuten, doch eine mutige Tat machte dich in deiner Heimat bekannt.",

    skillProficiencies: [
      "animal-handling",
      "survival",
    ],

    toolProficiencies: [
      "Ein Handwerkszeug nach Wahl",
      "Landfahrzeuge",
    ],

    languageChoices: 0,

    feature: {
      name: "Freund des einfachen Volkes",

      description:
        "Gewöhnliche Leute neigen dazu, dir zu vertrauen, dir ein einfaches Versteck anzubieten oder dich vor unmittelbarer Gefahr zu warnen.",
    },
  },

  {
    id: "noble",

    name: "Adliger",

    description:
      "Du entstammst einer angesehenen Familie oder wurdest in die Regeln von Hof, Rang und Einfluss eingeführt.",

    skillProficiencies: [
      "history",
      "persuasion",
    ],

    toolProficiencies: [
      "Ein Spielset nach Wahl",
    ],

    languageChoices: 1,

    feature: {
      name: "Stand und Ansehen",

      description:
        "Dein Name, dein Auftreten oder deine Verbindungen öffnen dir in vielen gehobenen Kreisen Türen, die anderen verschlossen bleiben.",
    },
  },

  {
    id: "sage",

    name: "Gelehrter",

    description:
      "Jahre des Studiums haben dir einen breiten Wissensschatz und Erfahrung im Umgang mit Archiven und Lehrstätten vermittelt.",

    skillProficiencies: [
      "arcana",
      "history",
    ],

    toolProficiencies: [],

    languageChoices: 2,

    feature: {
      name: "Weg zum Wissen",

      description:
        "Wenn dir eine Information fehlt, kannst du häufig einschätzen, in welcher Bibliothek, Sammlung oder bei welcher Fachperson sie zu finden sein könnte.",
    },
  },

  {
    id: "soldier",

    name: "Soldat",

    description:
      "Du wurdest für Krieg, Wachdienst oder den bewaffneten Schutz einer Gemeinschaft ausgebildet.",

    skillProficiencies: [
      "athletics",
      "intimidation",
    ],

    toolProficiencies: [
      "Ein Spielset nach Wahl",
      "Landfahrzeuge",
    ],

    languageChoices: 0,

    feature: {
      name: "Militärischer Rang",

      description:
        "Veteranen und Angehörige organisierter Streitkräfte erkennen deine Erfahrung und deinen früheren Rang häufig an.",
    },
  },
];

export function getBackgroundById(
  backgroundId: string,
): BackgroundDefinition | undefined {
  return backgrounds.find(
    (background) =>
      background.id === backgroundId,
  );
}