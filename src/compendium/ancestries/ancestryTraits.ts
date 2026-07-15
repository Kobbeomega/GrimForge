import type {
  CompendiumEntityBase,
  CompendiumSource,
} from "../shared";

export type AncestryTraitCategory =
  | "combat"
  | "exploration"
  | "roleplay";

export type AncestryTraitSource =
  Extract<
    CompendiumSource,
    | "grim-hollow"
    | "grim-hollow-2025"
    | "custom"
  >;

export interface AncestryTraitDefinition
  extends Omit<
    CompendiumEntityBase,
    "source"
  > {
  /**
   * Alle derzeit eingetragenen Eigenschaften
   * stammen aus dem Grim-Hollow-System.
   */
  source: AncestryTraitSource;

  category: AncestryTraitCategory;

  /**
   * Normalerweise kann eine Eigenschaft einmal
   * gewählt werden. Einige Eigenschaften besitzen
   * eine verbesserte Zweitwahl.
   */
  maxSelections: 1 | 2;

  secondSelectionName?: string;
}

type TraitSeed = readonly [
  id: string,
  name: string,
];

interface RepeatableTraitDefinition {
  maxSelections: 2;
  secondSelectionName: string;
}

const repeatableTraits: Record<
  string,
  RepeatableTraitDefinition
> = {
  "craft-focus": {
    maxSelections: 2,
    secondSelectionName:
      "Handwerkliche Expertise",
  },

  "breath-weapon": {
    maxSelections: 2,
    secondSelectionName:
      "Verbesserte Atemwaffe",
  },

  centered: {
    maxSelections: 2,
    secondSelectionName:
      "Fokussierter Vorteil",
  },

  climber: {
    maxSelections: 2,
    secondSelectionName:
      "Verbesserter Kletterer",
  },

  "damage-resistance": {
    maxSelections: 2,
    secondSelectionName:
      "Weitere Schadensresistenz",
  },

  "hunter-instinct": {
    maxSelections: 2,
    secondSelectionName:
      "Unnachgiebiger Instinkt",
  },

  "larger-target": {
    maxSelections: 2,
    secondSelectionName:
      "Noch größer",
  },

  "light-armor-training": {
    maxSelections: 2,
    secondSelectionName:
      "Leichte Rüstungsexpertise",
  },

  lucky: {
    maxSelections: 2,
    secondSelectionName:
      "Meister des Glücks",
  },

  "magical-fortification": {
    maxSelections: 2,
    secondSelectionName:
      "Erweiterte Befestigung",
  },

  "magical-aptitude": {
    maxSelections: 2,
    secondSelectionName:
      "Magisches Ausnahmetalent",
  },

  "master-of-distraction": {
    maxSelections: 2,
    secondSelectionName:
      "Behindernde Ablenkung",
  },

  "medium-armor-training": {
    maxSelections: 2,
    secondSelectionName:
      "Schwere Rüstungsausbildung",
  },

  "menacing-roar": {
    maxSelections: 2,
    secondSelectionName:
      "Unvergleichliches Brüllen",
  },

  "natural-attack": {
    maxSelections: 2,
    secondSelectionName:
      "Verbesserter natürlicher Angriff",
  },

  "powerful-build": {
    maxSelections: 2,
    secondSelectionName:
      "Verbesserter kräftiger Körperbau",
  },

  "supple-squeeze": {
    maxSelections: 2,
    secondSelectionName:
      "Zwängen mit voller Geschwindigkeit",
  },

  swimmer: {
    maxSelections: 2,
    secondSelectionName:
      "Beschleunigtes Schwimmen",
  },

  tenacious: {
    maxSelections: 2,
    secondSelectionName:
      "Schwer zu töten",
  },

  tireless: {
    maxSelections: 2,
    secondSelectionName:
      "Kraftvoll",
  },

  toughness: {
    maxSelections: 2,
    secondSelectionName:
      "Besonders zäh",
  },

  "well-protected": {
    maxSelections: 2,
    secondSelectionName:
      "Schützende Deckung",
  },
};

const traitDescriptions: Record<
  string,
  string
> = {
  amphibious:
    "Die Figur kann sowohl in Luft als auch unter Wasser atmen.",

  "artificial-form":
    "Der Körper besitzt Vorteile einer künstlich erschaffenen Gestalt.",

  "craft-focus":
    "Gewährt Kenntnisse und Spezialisierung in einem gewählten Handwerk.",

  "awakened-mind":
    "Verleiht eine geistig oder telepathisch geprägte Fähigkeit.",

  "breath-weapon":
    "Gewährt einen skalierenden Flächenangriff mit einer gewählten Schadensart.",

  climber:
    "Verbessert das Klettern oder gewährt eine Kletterbewegung.",

  "creature-cover":
    "Eine kleine Figur kann größere Kreaturen taktisch als Deckung nutzen.",

  "damage-resistance":
    "Gewährt Resistenz gegen eine bei der Auswahl festgelegte Schadensart.",

  darkvision:
    "Ermöglicht das Sehen in Dunkelheit.",

  "draining-attack":
    "Ein Angriff kann Lebenskraft entziehen und die eigene Figur stärken.",

  "helping-hand":
    "Verbessert Unterstützung und Zusammenarbeit mit anderen.",

  "elemental-acclimation":
    "Erhöht die Widerstandskraft gegen Umwelt- und Wettergefahren.",

  lucky:
    "Kann besonders schlechte oder misslungene Würfe situationsabhängig abfangen.",

  "magical-fortification":
    "Verbessert die Verteidigung gegen Magie.",

  "magical-aptitude":
    "Gewährt einen ausgewählten Zaubertrick.",

  "magical-prodigy":
    "Gewährt begrenzten Zugang zu einem Zauber des 1. Grades.",

  "meditative-rest":
    "Ersetzt normalen Schlaf teilweise durch meditative Erholung.",

  "natural-attack":
    "Gewährt eine natürliche Waffe wie Klauen oder Fänge.",

  "natural-movement":
    "Gewährt oder verbessert eine besondere natürliche Bewegungsart.",

  "powerful-build":
    "Die Figur gilt für Traglast und bewegbares Gewicht als größer.",

  swimmer:
    "Verbessert Bewegung und Handlungsfähigkeit unter Wasser.",

  tenacious:
    "Verbessert Todesrettungswürfe und die Widerstandskraft an der Schwelle des Todes.",

  tireless:
    "Verbessert Erholung und den Umgang mit Erschöpfung.",

  toughness:
    "Erhöht das Trefferpunktmaximum und skaliert mit der Charakterstufe.",

  "weapon-aptitude":
    "Gewährt oder verbessert den Umgang mit ausgewählten Waffen.",

  "well-protected":
    "Gewährt eine alternative ungerüstete Rüstungsklasse.",
};

const combatTraitSeeds = [
  ["animal-friend", "Tierfreund"],
  [
    "impressive-critical-hit",
    "Beeindruckender kritischer Treffer",
  ],
  ["awakened-mind", "Erwachter Geist"],
  [
    "battlefield-control",
    "Schlachtfeldkontrolle",
  ],
  ["brave", "Tapfer"],
  ["breath-weapon", "Atemwaffe"],
  ["centered", "Zentriert"],
  ["charging-assault", "Sturmangriff"],
  ["creature-cover", "Kreaturendeckung"],
  [
    "damage-resistance",
    "Schadensresistenz",
  ],
  [
    "divine-sangromancy",
    "Göttliche Sangromantie",
  ],
  ["draining-attack", "Entziehender Angriff"],
  ["moving-enemy", "Feind in Bewegung"],
  ["first-strike", "Erstschlag"],
  ["focused-mind", "Fokussierter Geist"],
  ["hunter-instinct", "Jägerinstinkt"],
  ["larger-target", "Größeres Ziel"],
  [
    "light-armor-training",
    "Leichte Rüstungsausbildung",
  ],
  ["lucky", "Glücklich"],
  [
    "magical-fortification",
    "Magische Befestigung",
  ],
  [
    "master-of-distraction",
    "Meister der Ablenkung",
  ],
  [
    "medium-armor-training",
    "Mittlere Rüstungsausbildung",
  ],
  ["menacing-roar", "Bedrohliches Brüllen"],
  ["natural-attack", "Natürlicher Angriff"],
  ["phase-shifted", "Phasenverschoben"],
  ["pack-hunter", "Rudeljäger"],
  ["pack-tactics", "Rudeltaktik"],
  ["personal-bastion", "Persönliche Bastion"],
  ["psychic-mind", "Psychischer Geist"],
  ["quick-initiative", "Schnelle Initiative"],
  ["quick-escape", "Schnelles Entwischen"],
  [
    "reckless-reaction",
    "Rücksichtslose Reaktion",
  ],
  ["skirmish-tactics", "Plänkeltaktik"],
  ["slippery", "Schlüpfrig"],
  ["steadfast-reserves", "Standhafte Reserven"],
  ["tenacious", "Hartnäckig"],
  ["touch-of-life", "Berührung des Lebens"],
  ["toughness", "Zähigkeit"],
  ["unrestrained", "Ungehemmt"],
  ["weapon-aptitude", "Waffenbegabung"],
  ["well-protected", "Gut geschützt"],
] as const satisfies readonly TraitSeed[];

const explorationTraitSeeds = [
  ["amphibious", "Amphibisch"],
  [
    "artifice-expertise",
    "Kunstfertigkeits-Expertise",
  ],
  ["artificial-form", "Künstliche Gestalt"],
  [
    "speed-burst",
    "Geschwindigkeitsschub",
  ],
  ["climber", "Kletterer"],
  ["darkvision", "Dunkelsicht"],
  ["driver", "Fahrer"],
  [
    "environmental-awareness",
    "Umgebungsbewusstsein",
  ],
  [
    "ethereal-fading",
    "Ätherisches Verblassen",
  ],
  ["fading", "Verblassen"],
  ["fleet-footed", "Flinkfüßig"],
  ["helping-hand", "Helfende Hand"],
  ["hold-breath", "Luft anhalten"],
  [
    "innate-orientation",
    "Angeborene Orientierung",
  ],
  [
    "elemental-acclimation",
    "An die Elemente gewöhnt",
  ],
  ["indomitable-sight", "Unbezwingbare Sicht"],
  ["meditative-rest", "Meditative Ruhe"],
  ["natural-camouflage", "Natürliche Tarnung"],
  ["natural-movement", "Natürliche Bewegung"],
  ["slip-through", "Hindurchschlüpfen"],
  ["poison-resilience", "Giftzähigkeit"],
  ["power-sleep", "Kraftschlaf"],
  ["powerful-build", "Kräftiger Körperbau"],
  ["resilient-ears", "Widerstandsfähige Ohren"],
  [
    "veil-of-the-wild",
    "Schleier der Wildnis",
  ],
  [
    "standing-jump",
    "Sprung aus dem Stand",
  ],
  ["steadfast", "Standfest"],
  ["supple-squeeze", "Geschmeidiges Zwängen"],
  ["swimmer", "Schwimmer"],
  ["tireless", "Unermüdlich"],
] as const satisfies readonly TraitSeed[];

const roleplayTraitSeeds = [
  ["craft-focus", "Handwerklicher Schwerpunkt"],
  ["athletic-spirit", "Athletengeist"],
  [
    "calculating-listener",
    "Berechnender Zuhörer",
  ],
  ["commanding-insight", "Gebietende Einsicht"],
  [
    "connection-to-nature",
    "Verbindung zur Natur",
  ],
  ["craftsmans-eye", "Auge des Handwerkers"],
  ["dreamwalking", "Traumwandeln"],
  ["eager-deceiver", "Eifriger Täuscher"],
  [
    "embrace-the-past",
    "Die Vergangenheit annehmen",
  ],
  ["firm-influence", "Fester Einfluss"],
  ["gifted-artist", "Begabter Künstler"],
  [
    "spontaneous-craftsman",
    "Spontaner Handwerker",
  ],
  ["improviser", "Improvisator"],
  [
    "innate-perception",
    "Angeborene Wahrnehmung",
  ],
  ["instrumentalist", "Instrumentalist"],
  [
    "intuitive-acrobat",
    "Intuitiver Akrobat",
  ],
  [
    "astute-survivor",
    "Scharfsinniger Überlebender",
  ],
  ["magical-insight", "Magische Einsicht"],
  [
    "magical-prodigy",
    "Magisches Ausnahmetalent",
  ],
  ["magical-aptitude", "Magische Gewandtheit"],
  [
    "masterful-aptitude",
    "Meisterhafte Begabung",
  ],
  [
    "mindful-investigator",
    "Achtsamer Ermittler",
  ],
  ["moved-by-faith", "Vom Glauben bewegt"],
  ["voice-of-nature", "Stimme der Natur"],
  ["nimble-movements", "Flinke Bewegungen"],
  ["persuasive-talent", "Überzeugendes Talent"],
  ["skill-prowess", "Fertigkeitskönnen"],
  ["unnatural-healer", "Unnatürlicher Heiler"],
] as const satisfies readonly TraitSeed[];

export const ancestryTraits:
  AncestryTraitDefinition[] = [
    ...createTraitDefinitions(
      "combat",
      combatTraitSeeds,
    ),

    ...createTraitDefinitions(
      "exploration",
      explorationTraitSeeds,
    ),

    ...createTraitDefinitions(
      "roleplay",
      roleplayTraitSeeds,
    ),
  ];

export function getAncestryTraitById(
  traitId: string,
): AncestryTraitDefinition | undefined {
  return ancestryTraits.find(
    (trait) =>
      trait.id === traitId,
  );
}

export function getAncestryTraitsByCategory(
  category: AncestryTraitCategory,
): AncestryTraitDefinition[] {
  return ancestryTraits.filter(
    (trait) =>
      trait.category === category,
  );
}

export function getMaximumTraitSelections(
  traitId: string,
): number {
  return (
    getAncestryTraitById(
      traitId,
    )?.maxSelections ?? 0
  );
}

function createTraitDefinitions(
  category: AncestryTraitCategory,
  seeds: readonly TraitSeed[],
): AncestryTraitDefinition[] {
  return seeds.map(
    ([id, name]) => {
      const repeatable =
        repeatableTraits[id];

      return {
  id,
  name,

  description:
    traitDescriptions[id] ??
    getDefaultDescription(
      category,
    ),

  source: "grim-hollow",

  sourcePage: 30,

  category,

  maxSelections:
    repeatable
      ?.maxSelections ?? 1,

  secondSelectionName:
    repeatable
      ?.secondSelectionName,
};
    },
  );
}

function getDefaultDescription(
  category: AncestryTraitCategory,
): string {
  switch (category) {
    case "combat":
      return "Eine Herkunftseigenschaft für Angriff, Verteidigung oder Widerstandskraft.";

    case "exploration":
      return "Eine Herkunftseigenschaft für Bewegung, Wahrnehmung, Reisen oder Umweltinteraktion.";

    case "roleplay":
      return "Eine Herkunftseigenschaft für Fertigkeiten, Werkzeuge, soziale Interaktion oder Magie.";
  }
}