import type {
  SkillId,
} from "../skills";

import { sourceBackgrounds2014 } from "../../content/phase1/backgrounds2014";

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

  abilityScoreOptions?: string[];

  originFeat?: string;

  feature: BackgroundFeature;
}

const curatedBackgrounds:
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

const grimHollowBackgrounds: CharacterBackground[] = [
  ghBackground("augustine-trading-company-agent", "Agent der Augustine-Handelsgesellschaft", ["intelligence", "wisdom", "charisma"], "Scharfsinniger Sammler", ["history", "persuasion"], ["Fälscherwerkzeug"], ["Fälscherwerkzeug", "Geschichtsbuch", "Lupe", "10 Blatt Pergament", "Robe", "8 GM"]),
  ghBackground("antiquarian", "Antiquar", ["dexterity", "constitution", "intelligence"], "Begabt", ["arcana", "history"], ["Tüftlerwerkzeug"], ["Dolch", "Tüftlerwerkzeug", "Alte Karten", "10 Blatt Pergament", "Robe", "8 GM"]),
  ghBackground("beast-hunter", "Bestienjäger", ["strength", "dexterity", "intelligence"], "Bluthund", ["animal-handling", "survival"], ["Ledererwerkzeug"], ["Dolch", "Speer", "Ledererwerkzeug", "Jagdfalle", "Reisekleidung", "5 GM"]),
  ghBackground("beggar", "Bettler", ["strength", "dexterity", "wisdom"], "Überlebender", ["insight", "persuasion"], ["Verkleidungsset"], ["Dolch", "Verkleidungsset", "Robe", "12 GM"]),
  ghBackground("knight-of-the-order", "Ordensritter", ["strength", "wisdom", "charisma"], "Wilder Angreifer", ["animal-handling", "athletics"], ["Ein Musikinstrument"], ["Dolch", "Schild", "Instrument", "Reisekleidung", "6 GM"]),
  ghBackground("courtier", "Höfling", ["intelligence", "wisdom", "charisma"], "Begabt", ["insight", "persuasion"], ["Musikinstrument oder Handwerkszeug"], ["Gewähltes Werkzeug oder Instrument", "Familienerbstück", "Feine Kleidung", "15 GM"]),
  ghBackground("disgraced-raider", "Entehrter Plünderer", ["strength", "constitution", "wisdom"], "Wilder Angreifer", ["athletics", "nature"], ["Navigatorenwerkzeug"], ["Speer", "Navigatorenwerkzeug", "Baufälliges Ruderboot", "Reisekleidung", "8 GM"]),
  ghBackground("emissary", "Gesandter", ["strength", "constitution", "charisma"], "Begabt", ["insight", "persuasion"], ["Kalligraphenwerkzeug"], ["Dolch", "Kalligraphenwerkzeug", "Diplomatenpapiere", "Feine Kleidung", "Siegelring", "10 GM"]),
  ghBackground("executioner", "Henker", ["strength", "constitution", "intelligence"], "Todesgebunden", ["athletics", "medicine"], ["Schmiedewerkzeug"], ["Dolch", "Schmiedewerkzeug", "Fremdes Tagebuch", "Reisekleidung", "10 GM"]),
  ghBackground("explorer", "Entdecker", ["strength", "constitution", "wisdom"], "Wachsam", ["athletics", "survival"], ["Navigatorenwerkzeug"], ["Dolch", "Navigatorenwerkzeug", "Karten", "Reisekleidung", "8 GM"]),
  ghBackground("exterminator", "Schädlingsbekämpfer", ["dexterity", "constitution", "intelligence"], "Magie-Eingeweihter (Druide)", ["animal-handling", "medicine"], ["Giftmischerwerkzeug"], ["Dolch", "Giftmischerwerkzeug", "Jagdfalle", "Reisekleidung", "8 GM"]),
  ghBackground("fey-blessed", "Von Feen Gesegneter", ["dexterity", "constitution", "charisma"], "Magie-Eingeweihter (Magier)", ["arcana", "performance"], ["Ein Musikinstrument"], ["Dolch", "Instrument", "Reisekleidung", "8 GM"]),
  ghBackground("free-swords-mercenary", "Söldner der Freien Schwerter", ["strength", "dexterity", "constitution"], "Wille des Freischwert-Söldners", ["acrobatics", "athletics"], ["Ein Spielset"], ["Dolch", "Speer", "Spielset", "Robe", "10 GM"]),
  ghBackground("heretic", "Häretiker", ["strength", "dexterity", "wisdom"], "Magie-Eingeweihter (Kleriker)", ["deception", "religion"], ["Verkleidungsset"], ["Verkleidungsset", "Häretischer Text", "Heiliges Symbol", "Reisekleidung", "10 GM"]),
  ghBackground("inquisitor-of-the-faithful", "Inquisitor der Gläubigen", ["strength", "wisdom", "charisma"], "Überzeugender Inquisitor", ["intimidation", "religion"], ["Heilerausrüstung"], ["Keule", "Navigatorenwerkzeug", "Buch heiliger Riten", "Heiliges Symbol", "Verhörwerkzeug", "Handschellen", "Reisekleidung", "10 GM"]),
  ghBackground("former-inquisitor", "Ehemaliger Inquisitor", ["strength", "wisdom", "charisma"], "Überzeugender Inquisitor", ["persuasion", "religion"], ["Navigatorenwerkzeug"], ["Keule", "Navigatorenwerkzeug", "Verkleidungsset", "Reisekleidung", "8 GM"]),
  ghBackground("one-of-the-taken", "Einer der Fortgenommenen", ["dexterity", "wisdom", "charisma"], "Magie-Eingeweihter (Druide)", ["arcana", "nature"], ["Holzschnitzerwerkzeug"], ["Holzschnitzerwerkzeug", "Kräuterkundigenwerkzeug", "Reisekleidung", "8 GM"]),
  ghBackground("physician", "Arzt", ["dexterity", "intelligence", "wisdom"], "Triage-Experte", ["medicine", "nature"], ["Kräuterkundigenwerkzeug"], ["Dolch oder Skalpell", "Heilerausrüstung", "Kräuterkundigenwerkzeug", "Bandagen", "Heilmittelbuch", "Blutegelglas", "Robe", "10 GM"]),
  ghBackground("pioneer", "Pionier", ["strength", "constitution", "wisdom"], "Überlebender", ["athletics", "survival"], ["Zimmermanns- oder Maurerwerkzeug"], ["Dolch", "Gewähltes Werkzeug", "Maultier und Karren", "Reisekleidung", "8 GM"]),
  ghBackground("pit-fighter", "Arenakämpfer", ["strength", "dexterity", "charisma"], "Wilder Angreifer", ["athletics", "performance"], ["Ein Spielset"], ["Dolch", "Speer", "Spielset", "Robe", "10 GM"]),
  ghBackground("plague-marked", "Von der Seuche Gezeichneter", ["constitution", "intelligence", "wisdom"], "Triage-Experte", ["intimidation", "medicine"], ["Kräuterkundigenwerkzeug"], ["Kräuterkundigenwerkzeug", "Reisekleidung", "8 GM"]),
  ghBackground("prisoner", "Gefangener", ["dexterity", "constitution", "charisma"], "Wachsam", ["deception", "sleight-of-hand"], ["Diebeswerkzeug"], ["Dolch oder Behelfsmesser", "Diebeswerkzeug", "Reisekleidung", "8 GM"]),
  ghBackground("released-serf", "Freigelassener Leibeigener", ["constitution", "intelligence", "wisdom"], "Überlebender", ["perception", "stealth"], ["Beliebiges Handwerkszeug"], ["Dolch", "Gewähltes Handwerkszeug", "Beutel mit Reiseandenken", "Reisekleidung", "8 GM"]),
  ghBackground("thaumaturges-servant", "Diener des Thaumaturgen", ["intelligence", "wisdom", "charisma"], "Gunst des Thaumaturgen", ["arcana", "insight"], ["Kartographenwerkzeug"], ["Kartographenwerkzeug", "Tinte und Feder", "Pergament", "Robe", "8 GM"]),
  ghBackground("ebon-syndicate-smuggler", "Schmuggler des Ebon-Syndikats", ["dexterity", "intelligence", "charisma"], "Entschlossenheit des Syndikats", ["history", "stealth"], ["Fälscherwerkzeug"], ["Fälscherwerkzeug", "Truhe mit falschem Boden", "Pergament", "Kostüm", "8 GM"]),
];

function ghBackground(
  id: string,
  name: string,
  abilityScoreOptions: string[],
  originFeat: string,
  skillProficiencies: CharacterBackground["skillProficiencies"],
  toolProficiencies: string[],
  equipment: string[],
): CharacterBackground {
  return {
    id,
    name,
    description:
      "Ein Grim-Hollow-Hintergrund aus Etharis mit festen Fertigkeiten, Werkzeugen, Startausrüstung und einem Ursprungstalent.",
    source: "grim-hollow-2025",
    skillProficiencies,
    toolProficiencies,
    languageChoices: 0,
    equipment,
    abilityScoreOptions,
    originFeat,
    feature: {
      id: `${id}-origin-feat`,
      name: originFeat,
      description:
        "Dieses Ursprungstalent gehört zu diesem Grim-Hollow-Hintergrund und sollte im Spiel als Starttalent der Figur berücksichtigt werden.",
      source: "grim-hollow-2025",
    },
  };
}


const skillNameToId: Record<string, SkillId> = {
  "Akrobatik": "acrobatics", "Tierkunde": "animal-handling", "Arkane Kunde": "arcana",
  "Athletik": "athletics", "Täuschen": "deception", "Geschichte": "history",
  "Motiv erkennen": "insight", "Einschüchtern": "intimidation", "Nachforschungen": "investigation",
  "Heilkunde": "medicine", "Naturkunde": "nature", "Wahrnehmung": "perception",
  "Auftreten": "performance", "Überzeugen": "persuasion", "Religion": "religion",
  "Fingerfertigkeit": "sleight-of-hand", "Heimlichkeit": "stealth", "Überleben": "survival",
};

function parseList(value: string): string[] {
  return value === "-" ? [] : value.split(",").map((entry) => entry.trim()).filter(Boolean);
}

function parseLanguageChoices(value: string): number {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

const importedBackgroundFeatureDescriptions: Record<string, string> = {
  charlatan:
    "Du hast eine zweite Identität mit passender Verkleidung, Dokumenten und einer glaubwürdigen Hintergrundgeschichte aufgebaut. Du kannst diese Identität nutzen, um dich als die entsprechende Person auszugeben, und passende Schriftstücke oder persönliche Unterlagen fälschen, sofern du ein vergleichbares Beispiel zur Hand hast.",
  entertainer:
    "Du findest gewöhnlich einen Ort zum Auftreten, etwa in einem Gasthaus, Zirkus, Theater oder bei einem Fest. Im Gegenzug für deine Darbietung erhältst du in der Regel einfache Unterkunft und Verpflegung; dein Ruf kann außerdem dazu führen, dass Fremde dich wiedererkennen.",
  "guild-artisan":
    "Als anerkanntes Mitglied deiner Gilde kannst du auf die Unterstützung deiner Zunft zählen. Gildenmitglieder gewähren dir nach Möglichkeit Unterkunft und Verpflegung und helfen dir, andere Mitglieder oder einflussreiche Kontakte zu erreichen. In Städten kann ein Gildenhaus als Treffpunkt, Informationsquelle und Anlaufstelle dienen. Für die Mitgliedschaft fallen regelmäßig Beiträge an.",
  hermit:
    "Während deiner Abgeschiedenheit bist du auf eine bedeutende Entdeckung gestoßen. Ihre genaue Natur hängt von deinem Charakter und der Kampagne ab: ein verborgenes Wissen, eine vergessene Wahrheit, ein ungewöhnlicher Ort oder eine Erkenntnis, deren Bedeutung sich erst im Abenteuer vollständig zeigt.",
  outlander:
    "Du besitzt ein ausgezeichnetes Gedächtnis für Karten und Gelände und kannst dich an die grobe Lage wichtiger Landschaftsmerkmale erinnern. In geeigneter Wildnis findest du außerdem Nahrung und frisches Wasser für dich und mehrere weitere Personen, sofern die Umgebung solche Ressourcen überhaupt bietet.",
  sailor:
    "Wenn nötig, kannst du für dich und deine Gefährten eine kostenlose Passage auf einem Segelschiff organisieren, auf dem du früher gedient hast oder zu dessen Besatzung du gute Beziehungen unterhältst. Fahrplan und Route liegen beim Kapitän; als Gegenleistung wird möglicherweise Mithilfe an Bord erwartet.",
  urchin:
    "Du kennst die verborgenen Wege, Durchgänge und Abkürzungen einer Stadt. Außerhalb eines Kampfes kannst du dich mit deiner Gruppe zwischen zwei Orten in derselben Stadt deutlich schneller bewegen, wenn du diese Schleichwege nutzen kannst.",
};

const curatedBackgroundIds = new Set(curatedBackgrounds.map((entry) => entry.id));
const importedBackgrounds: CharacterBackground[] = sourceBackgrounds2014
  .map((source) => ({ ...source, normalizedId: source.app_id.replaceAll("_", "-") }))
  .filter((source) => !curatedBackgroundIds.has(source.normalizedId))
  .map((source) => ({
    id: source.normalizedId,
    name: source.name_de,
    description: `Klassischer Hintergrund mit dem Merkmal „${source.feature}“.`,
    source: "core" as const,
    skillProficiencies: parseList(source.skills).map((name) => skillNameToId[name]).filter((id): id is SkillId => Boolean(id)),
    toolProficiencies: parseList(source.tools),
    languageChoices: parseLanguageChoices(source.languages),
    equipment: source.equipment.split(";").map((entry) => entry.trim()).filter(Boolean),
    feature: {
      id: `${source.normalizedId}-feature`,
      name: source.feature,
      description:
        importedBackgroundFeatureDescriptions[source.normalizedId] ??
        `Das Merkmal „${source.feature}“ ist für diesen Hintergrund noch nicht redaktionell beschrieben.`,
      source: "core" as const,
    },
  }));

const sourceBackgroundEquipment = new Map(
  sourceBackgrounds2014.map((source) => [
    source.app_id.replaceAll("_", "-"),
    source.equipment.split(";").map((entry) => entry.trim()).filter(Boolean),
  ]),
);

/** Zentrale Hintergrund-Registry; kuratierte Texte haben Vorrang, die 2014-Startausrüstung stammt einheitlich aus der Quelldatei. */
export const backgrounds: CharacterBackground[] = [
  ...curatedBackgrounds.map((entry) => ({
    ...entry,
    equipment: sourceBackgroundEquipment.get(entry.id) ?? entry.equipment,
  })),
  ...importedBackgrounds,
  ...grimHollowBackgrounds,
]
  .sort((a, b) => a.name.localeCompare(b.name, "de"));
export const backgroundRegistry = new Map(backgrounds.map((entry) => [entry.id, entry]));

export function getBackgroundById(
  backgroundId: string,
): CharacterBackground | undefined {
  return backgroundRegistry.get(backgroundId);
}
