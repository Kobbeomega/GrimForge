import type {
  CompendiumEntityBase,
  CompendiumFeature,
  CompendiumFeatureKind,
  CompendiumProgressionStage,
  CompendiumSource,
} from "../shared";

export type TransformationSource =
  Extract<CompendiumSource, "grim-hollow">;

export type TransformationFeatureKind =
  Extract<
    CompendiumFeatureKind,
    "benefit" | "drawback" | "passive" | "action" | "reaction"
  >;

export interface TransformationFeature
  extends Omit<CompendiumFeature, "source" | "kind"> {
  source: TransformationSource;
  kind: TransformationFeatureKind;
}

export interface TransformationFeatureSelection {
  boons: number;
  flaws: number;
}

export interface TransformationStage
  extends Omit<
    CompendiumProgressionStage<TransformationFeature>,
    "stage" | "features"
  > {
  stage: 1 | 2 | 3 | 4;
  automaticFeatures?: TransformationFeature[];
  boons?: TransformationFeature[];
  flaws?: TransformationFeature[];
  featureSelection?: TransformationFeatureSelection;
  features?: TransformationFeature[];
}

export interface TransformationDefinition
  extends Omit<CompendiumEntityBase, "source"> {
  source: TransformationSource;
  theme: string;
  origin: string;
  stages: TransformationStage[];
}

function feature(
  id: string,
  name: string,
  description: string,
  kind: TransformationFeatureKind,
  sourcePage?: number,
  prerequisites?: string[],
): TransformationFeature {
  return {
    id,
    name,
    description,
    source: "grim-hollow",
    sourcePage,
    kind,
    prerequisites,
  };
}

const aberrantHorror: TransformationDefinition = {
  id: "aberrant-horror",
  name: "Aberranter Schrecken",
  description: "Eine fremdartige Wandlung, bei der Körper und Geist durch unnatürliche Mutationen, Tentakel und instabile Existenz verändert werden.",
  source: "grim-hollow",
  sourcePage: 134,
  tags: [
    "aberration",
    "mutation",
    "tentacles",
  ],
  theme: "Mutation, Fremdartigkeit und körperliche Instabilität",
  origin: "Kontakt mit einer aberranten Macht, einem fremdartigen Parasiten oder einer entstellenden magischen Kraft.",
  stages: [
    {
      stage: 1,
      title: "Aberrantes Erwachen",
      description: "Die Figur wird zu einer teilweise aberranten Kreatur und entwickelt ihre erste körperliche Mutation.",
      automaticFeatures: [
        feature(
                    "aberrant-horror-aberrant-form",
                    "Aberrante Gestalt",
                    "Die Figur erhält Aberration als zusätzlichen Kreaturentyp und kann eine veränderliche, fremdartige Kampfgestalt offenbaren.",
                    "passive",
                    134,
                  ),
      ],
      boons: [
        feature(
                    "aberrant-horror-aberrant-mutation",
                    "Aberrante Mutation",
                    "Wähle eine körperliche Mutation, die Bewegung, natürliche Angriffe oder Verteidigung auf besondere Weise verbessert.",
                    "benefit",
                    134,
                  ),
      ],
      flaws: [
        feature(
                    "aberrant-horror-unstable-form",
                    "Instabile Gestalt",
                    "Nach besonders gefährlichen Abenteuertagen kann der Körper unkontrolliert mutieren und einen zufälligen Instabilitätseffekt entwickeln.",
                    "drawback",
                    135,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Tödliche Anpassung",
      description: "Die Mutation entwickelt sich zu einer effizienteren und kontrollierenden Kampfgestalt.",
      boons: [
        feature(
                    "aberrant-horror-efficient-killer",
                    "Effizienter Killer",
                    "Natürliche Waffen und Angriffe gegen verwundete Ziele werden gefährlicher.",
                    "passive",
                    135,
                  ),
        feature(
                    "aberrant-horror-writhing-tentacles",
                    "Sich windende Tentakel",
                    "Tentakel erweitern Reichweite und ermöglichen zusätzliche Kontrolle, Manipulation oder Greifmöglichkeiten.",
                    "action",
                    135,
                  ),
      ],
      flaws: [
        feature(
                    "aberrant-horror-hideous-appearance",
                    "Abscheuliches Aussehen",
                    "Die körperliche Veränderung ist kaum noch zu verbergen und erschwert viele soziale Begegnungen.",
                    "drawback",
                    135,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Instabile Existenz",
      description: "Die Figur ist kaum noch vollständig an ihre ursprüngliche Form oder die materielle Wirklichkeit gebunden.",
      boons: [
        feature(
                    "aberrant-horror-terrifying-visage",
                    "Furchterregendes Antlitz",
                    "Die aberrante Gestalt kann Gegner mit einem übernatürlich schrecklichen Anblick in Furcht versetzen.",
                    "action",
                    136,
                  ),
        feature(
                    "aberrant-horror-constricting-tentacles",
                    "Einengende Tentakel",
                    "Tentakel können Ziele stärker festsetzen, würgen und in ihrer Bewegung kontrollieren.",
                    "action",
                    136,
                  ),
      ],
      flaws: [
        feature(
                    "aberrant-horror-unstable-existence",
                    "Instabile Existenz",
                    "Die Realität hält den mutierten Körper nur noch unzuverlässig zusammen und verursacht zusätzliche Instabilitätseffekte.",
                    "drawback",
                    136,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Entropische Abscheulichkeit",
      description: "Die Wandlung erreicht eine mächtige, endgültige und kaum kontrollierbare aberrante Form.",
      boons: [
        feature(
                    "aberrant-horror-uncanny-aberration",
                    "Unheimliche Aberration",
                    "Die endgültige Aberrationsgestalt verleiht überragende körperliche und übernatürliche Fähigkeiten.",
                    "passive",
                    137,
                  ),
        feature(
                    "aberrant-horror-venomous-tentacles",
                    "Giftige Tentakel",
                    "Tentakelangriffe übertragen eine gefährliche Giftwirkung.",
                    "passive",
                    137,
                  ),
      ],
      flaws: [
        feature(
                    "aberrant-horror-entropic-abomination",
                    "Entropische Abscheulichkeit",
                    "Die bloße Existenz der Figur wird zerstörerisch, unnatürlich und schwer kontrollierbar.",
                    "drawback",
                    137,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const fey: TransformationDefinition = {
  id: "fey",
  name: "Feenwesen",
  description: "Eine Wandlung durch die Macht der Feenwelt, geprägt von Verzauberung, Illusion und der Bindung an einen der vier Höfe.",
  source: "grim-hollow",
  sourcePage: 138,
  tags: [
    "fey",
    "illusion",
    "enchantment",
  ],
  theme: "Feenmagie, Jahreszeiten und fremdartige Schönheit",
  origin: "Ein Feenpakt, ein Aufenthalt in der Feenwelt oder die Gunst beziehungsweise Forderung einer mächtigen Feenherrscherin.",
  stages: [
    {
      stage: 1,
      title: "Diener eines Feenhofes",
      description: "Die Figur erhält eine Feengestalt und bindet sich an den Frühlings-, Sommer-, Herbst- oder Winterhof.",
      automaticFeatures: [
        feature(
                    "fey-fey-form",
                    "Feengestalt",
                    "Die Figur erhält Feenwesen als zusätzlichen Kreaturentyp und entwickelt erkennbare übernatürliche Merkmale.",
                    "passive",
                    138,
                  ),
      ],
      boons: [
        feature(
                    "fey-spring-court-servant",
                    "Diener des Frühlingshofes",
                    "Die Wandlung wird durch Wachstum, Erneuerung und frühlingshafte Magie geprägt.",
                    "benefit",
                    138,
                  ),
        feature(
                    "fey-summer-court-servant",
                    "Diener des Sommerhofes",
                    "Die Wandlung wird durch Hitze, Leidenschaft und sommerliche Macht geprägt.",
                    "benefit",
                    138,
                  ),
        feature(
                    "fey-autumn-court-servant",
                    "Diener des Herbsthofes",
                    "Die Wandlung wird durch Wandel, Verfall und herbstliche Magie geprägt.",
                    "benefit",
                    138,
                  ),
        feature(
                    "fey-winter-court-servant",
                    "Diener des Winterhofes",
                    "Die Wandlung wird durch Kälte, Stille und winterliche Magie geprägt.",
                    "benefit",
                    138,
                  ),
      ],
      flaws: [
        feature(
                    "fey-planar-binding",
                    "Ebenenbindung",
                    "Die Figur ist an die Feenwelt gebunden; Bannung, Ebenenwechsel und bestimmte magische Orte können besondere Folgen haben.",
                    "drawback",
                    139,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Feenhafte Täuschung",
      description: "Die Verbindung zur Feenwelt stärkt Gestaltwandel, Täuschung und spontane Magie.",
      boons: [
        feature(
                    "fey-two-faced",
                    "Doppelgesichtig",
                    "Die Figur kann zwischen sterblichem und feenhaftem Auftreten wechseln und andere leichter über ihre wahre Natur täuschen.",
                    "passive",
                    139,
                  ),
        feature(
                    "fey-magical-tricks",
                    "Magische Tricks",
                    "Die Figur erhält zusätzliche feenhafte Zauber und magische Kunststücke.",
                    "action",
                    139,
                  ),
      ],
      flaws: [
        feature(
                    "fey-command-of-the-queen",
                    "Befehl der Königin",
                    "Die Herrscherin des gewählten Hofes kann Dienste, Aufgaben und Gehorsam verlangen.",
                    "drawback",
                    139,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Kind der Anderswelt",
      description: "Illusion, Traum und natürliche Wildheit prägen die weiterentwickelte Feengestalt.",
      boons: [
        feature(
                    "fey-cloak-of-illusion",
                    "Illusionsmantel",
                    "Eine starke Illusions- und Tarnwirkung verschleiert Gestalt und Position.",
                    "action",
                    140,
                  ),
        feature(
                    "fey-tooth-and-claw",
                    "Zahn und Klaue",
                    "Die feenhafte Gestalt entwickelt gefährlichere offensive Eigenschaften.",
                    "passive",
                    140,
                  ),
        feature(
                    "fey-dreams-and-nightmares",
                    "Träume und Albträume",
                    "Die Figur kann Schlaf, Träume und Furcht anderer Wesen beeinflussen.",
                    "action",
                    140,
                  ),
      ],
      flaws: [
        feature(
                    "fey-weakened-constitution",
                    "Geschwächte Konstitution",
                    "Die Feennatur macht den Körper gegenüber bestimmten sterblichen Belastungen und Einflüssen anfälliger.",
                    "drawback",
                    140,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Vollendetes Feenwesen",
      description: "Die Figur wird zu einer mächtigen Verkörperung ihres Hofes und der Feenwelt.",
      boons: [
        feature(
                    "fey-greater-magical-tricks",
                    "Größere magische Tricks",
                    "Die feenhafte Magie wird mächtiger und eröffnet stärkere übernatürliche Effekte.",
                    "action",
                    141,
                  ),
        feature(
                    "fey-twilight-enchantment",
                    "Zwielicht-Verzauberung",
                    "Die Figur erhält mächtige Glamour-, Schutz- und Täuschungsmagie.",
                    "action",
                    141,
                  ),
      ],
      flaws: [
        feature(
                    "fey-seasonally-influenced",
                    "Saisonal beeinflusst",
                    "Stimmung, Verhalten und Kräfte werden zunehmend vom gewählten Hof und seiner Jahreszeit bestimmt.",
                    "drawback",
                    141,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const fiend: TransformationDefinition = {
  id: "fiend",
  name: "Unhold",
  description: "Eine infernalische oder abyssale Wandlung, die Macht durch Verderbnis, Brandzeichen und bindende Verträge verleiht.",
  source: "grim-hollow",
  sourcePage: 142,
  tags: [
    "fiend",
    "infernal",
    "contracts",
  ],
  theme: "Verderbnis, Verträge und höllische Macht",
  origin: "Ein Pakt, eine verfluchte Blutlinie oder die direkte Bindung an eine infernalische beziehungsweise abyssale Macht.",
  stages: [
    {
      stage: 1,
      title: "Unholdseele",
      description: "Die Seele wird mit unheiligen Kräften verbunden und entwickelt ihre erste infernalische Spezialisierung.",
      automaticFeatures: [
        feature(
                    "fiend-fiendish-soul",
                    "Unholdseele",
                    "Die Figur erhält übernatürliche, unheilige Widerstandskraft.",
                    "passive",
                    142,
                  ),
      ],
      boons: [
        feature(
                    "fiend-infernal-strike",
                    "Infernalischer Schlag",
                    "Angriffe können durch infernalische oder abyssale Energie zusätzlichen Schaden verursachen.",
                    "action",
                    142,
                  ),
        feature(
                    "fiend-devilish-contract-partner",
                    "Teuflischer Vertragspartner",
                    "Die Figur kann bindende übernatürliche Verträge schließen.",
                    "action",
                    142,
                  ),
      ],
      flaws: [
        feature(
                    "fiend-bound-to-the-fiend",
                    "An den Unhold gebunden",
                    "Seele und Macht bleiben an eine infernalische Quelle, einen Meister oder eine Verpflichtung gekettet.",
                    "drawback",
                    143,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Zeichen der Verdammnis",
      description: "Brandzeichen und Verträge erhalten größere Macht und hinterlassen deutlichere körperliche Spuren.",
      boons: [
        feature(
                    "fiend-demonic-brand",
                    "Dämonisches Brandzeichen",
                    "Ein Ziel kann mit einem unheiligen Brandzeichen belegt werden, das zusätzliche Effekte ermöglicht.",
                    "action",
                    143,
                  ),
        feature(
                    "fiend-improved-contract",
                    "Verbesserter Vertrag",
                    "Übernatürliche Verträge werden mächtiger und schwerer zu umgehen.",
                    "passive",
                    143,
                  ),
      ],
      flaws: [
        feature(
                    "fiend-fiendish-form",
                    "Unholdgestalt",
                    "Offensichtliche körperliche Zeichen der Verderbnis erschweren den Umgang mit Sterblichen.",
                    "drawback",
                    143,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Sog der Unterwelt",
      description: "Die Figur verteilt infernalische Macht oder überwältigt gebrandmarkte Ziele.",
      boons: [
        feature(
                    "fiend-devilish-subcontractor",
                    "Teuflischer Untervertragspartner",
                    "Die Figur kann Macht über weitere Abmachungen verteilen oder für sich nutzen.",
                    "action",
                    144,
                  ),
        feature(
                    "fiend-overwhelming-brand",
                    "Überwältigendes Brandzeichen",
                    "Das Brandzeichen erhält stärkere Schadens- oder Kontrolleffekte.",
                    "passive",
                    144,
                  ),
      ],
      flaws: [
        feature(
                    "fiend-pull-of-the-underworld",
                    "Sog der Unterwelt",
                    "Die Unterwelt fordert die Figur immer stärker und beeinflusst Verhalten, Ziele oder Schicksal.",
                    "drawback",
                    144,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Vollendeter Unhold",
      description: "Die Figur erreicht eine nahezu vollständige infernalische oder abyssale Gestalt.",
      boons: [
        feature(
                    "fiend-abyssal-resistance",
                    "Abyssische Resistenz",
                    "Die Figur erhält mächtige Widerstandskraft gegen zerstörerische Einflüsse.",
                    "passive",
                    145,
                  ),
        feature(
                    "fiend-infernal-summoning",
                    "Infernalische Beschwörung",
                    "Die Figur kann infernalische oder abyssale Wesen beziehungsweise Kräfte herbeirufen.",
                    "action",
                    145,
                  ),
        feature(
                    "fiend-ultimate-brand",
                    "Ultimatives Brandzeichen",
                    "Das unheilige Brandzeichen erreicht seine mächtigste Form.",
                    "action",
                    145,
                  ),
      ],
      flaws: [
        feature(
                    "fiend-true-name",
                    "Wahrer Name",
                    "Wer den wahren Namen der Figur kennt, erhält gefährlichen Einfluss auf sie.",
                    "drawback",
                    145,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const hag: TransformationDefinition = {
  id: "hag",
  name: "Vettel",
  description: "Eine hexenhafte Wandlung, die Flüche, groteske Gestalt und die Magie einer Schwesternschaft verbindet.",
  source: "grim-hollow",
  sourcePage: 146,
  tags: [
    "hag",
    "curse",
    "witchcraft",
  ],
  theme: "Flüche, Schwesternschaften und grausame Hexenmagie",
  origin: "Ein Hexenfluch, ein Pakt mit einem Zirkel oder die schrittweise Übernahme durch eine uralte Vettel.",
  stages: [
    {
      stage: 1,
      title: "Schwesternschaft",
      description: "Die Figur entwickelt eine Vettelgestalt und bindet sich an eine grüne, rote oder maritime Schwesternschaft.",
      automaticFeatures: [
        feature(
                    "hag-hag-form",
                    "Vettelgestalt",
                    "Die Figur entwickelt eine groteske, übernatürlich hexenhafte Gestalt.",
                    "passive",
                    146,
                  ),
      ],
      boons: [
        feature(
                    "hag-green-sisterhood",
                    "Grüne Schwesternschaft",
                    "Die Wandlung konzentriert sich auf Gift, Natur und verderbte Wildnis.",
                    "benefit",
                    146,
                  ),
        feature(
                    "hag-red-sisterhood",
                    "Rote Schwesternschaft",
                    "Die Wandlung konzentriert sich auf Blut, Schmerz und Gewalt.",
                    "benefit",
                    146,
                  ),
        feature(
                    "hag-sea-sisterhood",
                    "Meerschwesternschaft",
                    "Die Wandlung konzentriert sich auf Wasser, Sturm und die Tiefe.",
                    "benefit",
                    146,
                  ),
      ],
      flaws: [
        feature(
                    "hag-hideous-appearance",
                    "Abscheuliches Aussehen",
                    "Die groteske körperliche Veränderung ist gesellschaftlich belastend und schwer zu verbergen.",
                    "drawback",
                    147,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Adeptin der Schwesternschaft",
      description: "Die gewählte Schwesternschaft verleiht eine fortgeschrittene Spezialisierung.",
      boons: [
        feature(
                    "hag-green-sisterhood-adept",
                    "Adeptin der grünen Schwesternschaft",
                    "Gift- und Naturkräfte der grünen Linie werden verstärkt.",
                    "benefit",
                    147,
                    [
                      "hag-green-sisterhood",
                    ],
                  ),
        feature(
                    "hag-red-sisterhood-adept",
                    "Adeptin der roten Schwesternschaft",
                    "Blut- und Gewaltkräfte der roten Linie werden verstärkt.",
                    "benefit",
                    147,
                    [
                      "hag-red-sisterhood",
                    ],
                  ),
        feature(
                    "hag-sea-sisterhood-adept",
                    "Adeptin der Meerschwesternschaft",
                    "Wasser- und Sturmkräfte der maritimen Linie werden verstärkt.",
                    "benefit",
                    147,
                    [
                      "hag-sea-sisterhood",
                    ],
                  ),
      ],
      flaws: [
        feature(
                    "hag-iron-sensitivity",
                    "Eisenempfindlichkeit",
                    "Eisen- und Stahlwaffen verursachen besondere Schmerzen oder zusätzliche Einschränkungen.",
                    "drawback",
                    147,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Meisterin der Schwesternschaft",
      description: "Die Figur erreicht die höchste Spezialisierung ihrer gewählten Schwesternschaft.",
      boons: [
        feature(
                    "hag-green-sisterhood-master",
                    "Meisterin der grünen Schwesternschaft",
                    "Die grüne Linie erreicht ihre höchste Spezialisierung.",
                    "benefit",
                    148,
                    [
                      "hag-green-sisterhood-adept",
                    ],
                  ),
        feature(
                    "hag-red-sisterhood-master",
                    "Meisterin der roten Schwesternschaft",
                    "Die rote Linie erreicht ihre höchste Spezialisierung.",
                    "benefit",
                    148,
                    [
                      "hag-red-sisterhood-adept",
                    ],
                  ),
        feature(
                    "hag-sea-sisterhood-master",
                    "Meisterin der Meerschwesternschaft",
                    "Die maritime Linie erreicht ihre höchste Spezialisierung.",
                    "benefit",
                    148,
                    [
                      "hag-sea-sisterhood-adept",
                    ],
                  ),
      ],
      flaws: [
        feature(
                    "hag-pain-of-purity",
                    "Schmerz der Reinheit",
                    "Aufrichtig gute, geweihte oder reinigende Einflüsse verursachen Schmerz und Einschränkungen.",
                    "drawback",
                    148,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Erzvettel",
      description: "Die Figur erhält mächtige Blick- und Großmutterflüche, muss jedoch einen grausamen Hunger stillen.",
      boons: [
        feature(
                    "hag-evil-eye",
                    "Böser Blick",
                    "Ein mächtiger Blickfluch schwächt oder kontrolliert ein Ziel.",
                    "action",
                    149,
                  ),
        feature(
                    "hag-grandmother-curse",
                    "Fluch der Großmutter",
                    "Die Figur kann einen weitreichenden und schwer zu brechenden Fluch wirken.",
                    "action",
                    149,
                  ),
      ],
      flaws: [
        feature(
                    "hag-archhag-hunger",
                    "Hunger der Erzvettel",
                    "Die wachsende Vettel verlangt nach bestimmten grausamen Handlungen, Opfern oder Nahrung.",
                    "drawback",
                    149,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const lich: TransformationDefinition = {
  id: "lich",
  name: "Lich",
  description: "Eine Wandlung in Richtung Untod, Seelenbindung und arkaner Unsterblichkeit.",
  source: "grim-hollow",
  sourcePage: 150,
  tags: [
    "undead",
    "necromancy",
    "soul-vessel",
  ],
  theme: "Untod, Seelenmagie und arkane Unsterblichkeit",
  origin: "Ein verbotenes Ritual, ein Seelengefäß oder die bewusste Abkehr vom natürlichen Tod.",
  stages: [
    {
      stage: 1,
      title: "Gebundene Seele",
      description: "Die Figur bindet ihre Existenz an ein Seelengefäß und wählt ihre Form des Lichdoms.",
      automaticFeatures: [
        feature(
                    "lich-undead-form",
                    "Untote Gestalt",
                    "Die Figur erhält untote Eigenschaften und entfernt sich zunehmend von einer sterblichen Existenz.",
                    "passive",
                    150,
                  ),
      ],
      boons: [
        feature(
                    "lich-memori-lichdom",
                    "Memori-Lichdom",
                    "Die Wandlung konzentriert sich auf Erinnerung, Wissen und geistige Bewahrung.",
                    "benefit",
                    150,
                  ),
        feature(
                    "lich-lich-magica",
                    "Lich Magica",
                    "Die Wandlung konzentriert sich auf Zaubermacht und arkane Vollendung.",
                    "benefit",
                    150,
                  ),
      ],
      flaws: [
        feature(
                    "lich-soul-vessel",
                    "Seelengefäß",
                    "Existenz und Wiederkehr sind an ein Gefäß gebunden; Verlust, Zerstörung oder Entladung haben gravierende Folgen.",
                    "drawback",
                    151,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Nekromantische Herrschaft",
      description: "Die Figur vertieft ihre Kontrolle über Untote, Flüche oder verderbende Magie.",
      boons: [
        feature(
                    "lich-acolyte-of-the-undead",
                    "Akolyth der Untoten",
                    "Die Verbindung zu Untoten und die Kontrolle über sie werden stärker.",
                    "passive",
                    151,
                  ),
        feature(
                    "lich-binding-curse",
                    "Bindender Fluch",
                    "Die Figur kann einen einschränkenden und schwer zu lösenden Fluch auferlegen.",
                    "action",
                    151,
                  ),
        feature(
                    "lich-corrupting-magic",
                    "Verderbende Magie",
                    "Zauber erhalten nekrotische oder korrumpierende Wirkung.",
                    "passive",
                    151,
                  ),
      ],
      flaws: [
        feature(
                    "lich-hideous-appearance",
                    "Abscheuliches Aussehen",
                    "Die leichenhafte Erscheinung wird zunehmend offensichtlich und schwer zu verbergen.",
                    "drawback",
                    151,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Meister des Untods",
      description: "Konzentration, Heilung durch unheilige Kraft und Kontrolle über Untote erreichen ein neues Niveau.",
      boons: [
        feature(
                    "lich-uncanny-concentration",
                    "Unheimliche Konzentration",
                    "Die Konzentration auf Zauber wird erheblich zuverlässiger.",
                    "passive",
                    152,
                  ),
        feature(
                    "lich-master-of-the-undead",
                    "Meister der Untoten",
                    "Die Figur kontrolliert und stärkt Untote mit größerer Macht.",
                    "passive",
                    152,
                  ),
        feature(
                    "lich-unholy-healing",
                    "Unheilige Heilung",
                    "Nekrotische oder unheilige Kraft kann zur eigenen Heilung genutzt werden.",
                    "action",
                    152,
                  ),
      ],
      flaws: [
        feature(
                    "lich-necromantic-dystrophy",
                    "Nekromantische Dystrophie",
                    "Der Körper zerfällt ohne regelmäßige Seelenenergie oder andere unnatürliche Nahrung.",
                    "drawback",
                    152,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Vollendeter Lich",
      description: "Die Figur überwindet ihre sterbliche Existenz und erreicht eine mächtige Form arkanen Untods.",
      boons: [
        feature(
                    "lich-soul-shattering-attack",
                    "Seelenerschütternder Angriff",
                    "Ein mächtiger Angriff erschüttert Körper und Seele des Ziels.",
                    "action",
                    153,
                  ),
        feature(
                    "lich-uncanny-omniscience",
                    "Unheimliche Allwissenheit",
                    "Die Figur erhält außergewöhnlichen Zugriff auf Wissen und Erinnerungen.",
                    "passive",
                    153,
                  ),
        feature(
                    "lich-lord-of-the-undead",
                    "Herr der Untoten",
                    "Die Figur erreicht die höchste Form der Herrschaft über Untote.",
                    "passive",
                    153,
                  ),
      ],
      flaws: [
        feature(
                    "lich-weight-of-the-ages",
                    "Gewicht der Zeitalter",
                    "Das hohe Alter zersetzt die Form und verstärkt die Abhängigkeit vom Seelengefäß.",
                    "drawback",
                    153,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const lycanthrope: TransformationDefinition = {
  id: "lycanthrope",
  name: "Lykanthrop",
  description: "Eine tierische Wandlung, die Instinkt, Jagd und den Kampf mit der inneren Bestie verbindet.",
  source: "grim-hollow",
  sourcePage: 154,
  tags: [
    "shapechanger",
    "beast",
    "hunt",
  ],
  theme: "Bestie, Jagd und Kontrollverlust",
  origin: "Ein Fluch, eine Verletzung oder eine geerbte Verbindung zu einer lykanthropischen Blutlinie.",
  stages: [
    {
      stage: 1,
      title: "Bestialisches Erwachen",
      description: "Die Figur entwickelt eine Hybridgestalt und bindet sich an die Natur einer Ratte, eines Wolfes oder eines Bären.",
      boons: [
        feature(
                    "lycanthrope-rat-hybrid",
                    "Hybridgestalt: Ratte",
                    "Die Hybridgestalt konzentriert sich auf Beweglichkeit, List und schwer fassbare Bewegung.",
                    "benefit",
                    154,
                  ),
        feature(
                    "lycanthrope-wolf-hybrid",
                    "Hybridgestalt: Wolf",
                    "Die Hybridgestalt konzentriert sich auf Rudeljagd, Sinne und Verfolgung.",
                    "benefit",
                    154,
                  ),
        feature(
                    "lycanthrope-bear-hybrid",
                    "Hybridgestalt: Bär",
                    "Die Hybridgestalt konzentriert sich auf Kraft, Zähigkeit und rohe Gewalt.",
                    "benefit",
                    154,
                  ),
      ],
      flaws: [
        feature(
                    "lycanthrope-lust-for-the-hunt",
                    "Lust auf die Jagd",
                    "Blut, verwundete Beute und Jagdsituationen können Kontrollverlust auslösen.",
                    "drawback",
                    155,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Jägergestalt",
      description: "Verfolgung, natürliche Verteidigung oder zusätzliche Gestalten verbessern die Jagdfähigkeit.",
      boons: [
        feature(
                    "lycanthrope-hunters-focus",
                    "Jägerfokus",
                    "Die Figur kann Beute besser verfolgen und an ein Ziel gebunden bleiben.",
                    "passive",
                    155,
                  ),
        feature(
                    "lycanthrope-iron-hide",
                    "Eisenfell",
                    "Die natürliche Verteidigung der Hybridgestalt wird erhöht.",
                    "passive",
                    155,
                  ),
        feature(
                    "lycanthrope-kindred-form",
                    "Verwandte Gestalt",
                    "Die Figur erhält eine zusätzliche tierische oder humanoide Form.",
                    "action",
                    155,
                  ),
      ],
      flaws: [
        feature(
                    "lycanthrope-silver-sensitivity",
                    "Silberempfindlichkeit",
                    "Silber umgeht Teile des übernatürlichen Schutzes und verursacht zusätzliche Nachteile.",
                    "drawback",
                    155,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Herrschaft der Bestie",
      description: "Die Hybridgestalt entwickelt stärkere Lebenskraft und gefährlichere natürliche Angriffe.",
      boons: [
        feature(
                    "lycanthrope-bestial-vitality",
                    "Bestialische Lebenskraft",
                    "Die Figur erhält erhöhte Zähigkeit und Regenerationsfähigkeit.",
                    "passive",
                    156,
                  ),
        feature(
                    "lycanthrope-shapeshifters-ferocity",
                    "Wildheit des Gestaltwandlers",
                    "Natürliche Angriffe und Verwandlungsfähigkeiten werden stärker.",
                    "passive",
                    156,
                  ),
      ],
      flaws: [
        feature(
                    "lycanthrope-frayed-thoughts",
                    "Ausgefranste Gedanken",
                    "Tierische Instinkte stören Konzentration, Vernunft und soziale Kontrolle.",
                    "drawback",
                    156,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Ultimativer Räuber",
      description: "Die Bestie erreicht ihre höchste Form und wird nahezu dauerhaft beherrschbar – bis der Räuber übernimmt.",
      boons: [
        feature(
                    "lycanthrope-hybrid-form-affinity",
                    "Affinität zur Hybridgestalt",
                    "Die Hybridgestalt kann leichter, länger oder zuverlässiger genutzt werden.",
                    "passive",
                    157,
                  ),
        feature(
                    "lycanthrope-wild-instincts",
                    "Wilde Instinkte",
                    "Die Figur erhält überragende Sinne und Jagdfähigkeiten.",
                    "passive",
                    157,
                  ),
      ],
      flaws: [
        feature(
                    "lycanthrope-ultimate-predator",
                    "Ultimativer Räuber",
                    "Bei Kontrollverlust übernimmt das Raubtier vollständig und gefährdet auch Verbündete.",
                    "drawback",
                    157,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const ooze: TransformationDefinition = {
  id: "ooze",
  name: "Schleimwesen",
  description: "Eine formlose Wandlung, die den Körper verflüssigt und ungewöhnliche Anpassung, Reichweite und Widerstandskraft ermöglicht.",
  source: "grim-hollow",
  sourcePage: 158,
  tags: [
    "ooze",
    "acid",
    "shapeshifting",
  ],
  theme: "Formlosigkeit, Anpassung und körperlicher Verfall",
  origin: "Kontakt mit einem alchemistischen Experiment, einem lebenden Schleim oder einer körperauflösenden Magie.",
  stages: [
    {
      stage: 1,
      title: "Instabile Gestalt",
      description: "Die Figur entwickelt eine formlose Schleimgestalt und erste funktionale Anpassungen.",
      automaticFeatures: [
        feature(
                    "ooze-ooze-form",
                    "Schleimgestalt",
                    "Die Figur erhält Schleimwesen als zusätzlichen Kreaturentyp und entwickelt formlose Eigenschaften.",
                    "passive",
                    158,
                  ),
      ],
      boons: [
        feature(
                    "ooze-slimy-presence",
                    "Schleimiges Auftreten",
                    "Die formlose Gestalt erleichtert Entkommen, Rutschen und defensive Bewegung.",
                    "passive",
                    158,
                  ),
        feature(
                    "ooze-mutable-body",
                    "Veränderlicher Körper",
                    "Die Figur kann ihre Körperform für unterschiedliche Funktionen anpassen.",
                    "action",
                    158,
                  ),
      ],
      flaws: [
        feature(
                    "ooze-sluggish",
                    "Träge",
                    "Die zähflüssige Form beeinträchtigt Bewegung oder Reaktionsgeschwindigkeit.",
                    "drawback",
                    159,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Formbare Masse",
      description: "Die Figur streckt Gliedmaßen und absorbiert Schaden durch eine zähflüssige Körperstruktur.",
      boons: [
        feature(
                    "ooze-elastic-limbs",
                    "Elastische Gliedmaßen",
                    "Gliedmaßen erhalten größere Reichweite und flexible Interaktionsmöglichkeiten.",
                    "passive",
                    159,
                  ),
        feature(
                    "ooze-viscous-durability",
                    "Zähflüssige Haltbarkeit",
                    "Der formlose Körper kann Schaden besser aufnehmen.",
                    "passive",
                    159,
                  ),
      ],
      flaws: [
        feature(
                    "ooze-molten-appearance",
                    "Geschmolzenes Aussehen",
                    "Humanoide Tarnung und soziale Akzeptanz verschlechtern sich deutlich.",
                    "drawback",
                    159,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Lebender Schleim",
      description: "Säure und Verschlingen machen den formbaren Körper zu einer gefährlichen Waffe.",
      boons: [
        feature(
                    "ooze-corrosive-membrane",
                    "Ätzende Membran",
                    "Berührung und Nahkampf können Säureschaden verursachen.",
                    "passive",
                    160,
                  ),
        feature(
                    "ooze-engulf",
                    "Verschlingen",
                    "Die Figur kann ein Ziel in ihren Körper aufnehmen und festsetzen.",
                    "action",
                    160,
                  ),
      ],
      flaws: [
        feature(
                    "ooze-physical-decay",
                    "Körperlicher Verfall",
                    "Ausrüstung und Körperstruktur leiden unter der schleimigen Form.",
                    "drawback",
                    160,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Vollendetes Schleimwesen",
      description: "Die Figur kann sich aufspalten oder Gegenstände durch formlose Anpassung imitieren.",
      boons: [
        feature(
                    "ooze-ooze-legion",
                    "Schleimlegion",
                    "Die Figur kann Abspaltungen oder mehrere verbundene Schleimkörper erzeugen.",
                    "action",
                    161,
                  ),
        feature(
                    "ooze-object-mimicry",
                    "Gegenstand imitieren",
                    "Form und Erscheinung eines Objekts können angenommen werden.",
                    "action",
                    161,
                  ),
      ],
      flaws: [
        feature(
                    "ooze-slippery-self",
                    "Schlüpfriges Ich",
                    "Erinnerungen, Identität und Persönlichkeit lösen sich zunehmend auf.",
                    "drawback",
                    161,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const primordial: TransformationDefinition = {
  id: "primordial",
  name: "Urelementar",
  description: "Eine elementare Wandlung, bei der sich die Figur zunehmend mit einer chaotischen Urgewalt verbindet.",
  source: "grim-hollow",
  sourcePage: 162,
  tags: [
    "elemental",
    "aura",
    "primordial",
  ],
  theme: "Elementarkraft, Widerstand und chaotische Urgewalten",
  origin: "Die Verschmelzung mit elementarer Energie, ein uraltes Ritual oder die Berührung einer elementaren Machtquelle.",
  stages: [
    {
      stage: 1,
      title: "Elementares Erwachen",
      description: "Die Figur entwickelt eine urelementare Gestalt und bindet sich an eine elementare Affinität.",
      automaticFeatures: [
        feature(
                    "primordial-primordial-form",
                    "Urelementare Gestalt",
                    "Die Figur erhält Elementar als zusätzlichen Kreaturentyp.",
                    "passive",
                    162,
                  ),
      ],
      boons: [
        feature(
                    "primordial-elemental-affinity",
                    "Elementare Affinität",
                    "Wähle ein Element, das Resistenz, Angriff und besondere Bewegung der Wandlung prägt.",
                    "benefit",
                    162,
                  ),
      ],
      flaws: [
        feature(
                    "primordial-planar-binding",
                    "Ebenenbindung",
                    "Die zugehörige Elementarebene zieht die Figur an sich und beeinflusst Ebenenmagie.",
                    "drawback",
                    163,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Doppelnatur",
      description: "Ein zweites Element oder ein aktiver Elementarausbruch erweitert die Urkraft.",
      boons: [
        feature(
                    "primordial-dual-nature",
                    "Doppelnatur",
                    "Die Figur erhält Zugang zu einem zweiten Element oder einer elementaren Kombination.",
                    "benefit",
                    163,
                  ),
        feature(
                    "primordial-elemental-burst",
                    "Elementarer Ausbruch",
                    "Ein aktiver Elementarangriff oder unterstützender Impuls setzt gespeicherte Urkraft frei.",
                    "action",
                    163,
                  ),
      ],
      flaws: [
        feature(
                    "primordial-surging-elements",
                    "Wallende Elemente",
                    "Elementare Kräfte brechen ungewollt hervor und beeinflussen Umgebung oder Verbündete.",
                    "drawback",
                    163,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Urzeitlicher Körper",
      description: "Die Figur wird zu einem widerstandsfähigen Kanal verschiedener Elementarkräfte.",
      boons: [
        feature(
                    "primordial-ancient-body",
                    "Urzeitlicher Körper",
                    "Der Körper erhält starke elementare Widerstandskraft.",
                    "passive",
                    164,
                  ),
        feature(
                    "primordial-master-of-many-elements",
                    "Meister vieler Elemente",
                    "Die Auswahl und Beherrschung elementarer Kräfte wird erweitert.",
                    "passive",
                    164,
                  ),
        feature(
                    "primordial-aura-of-awakening",
                    "Aura des Erwachens",
                    "Die Umgebung wird mit elementarer Kraft erfüllt.",
                    "passive",
                    164,
                  ),
      ],
      flaws: [
        feature(
                    "primordial-elemental-imbalance",
                    "Elementares Ungleichgewicht",
                    "Gegensätzliche Elemente oder körperliche Bedürfnisse geraten in Konflikt.",
                    "drawback",
                    164,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Urelementares Chaos",
      description: "Die Figur wird zu einer dauerhaften Verkörperung elementarer Urgewalt.",
      boons: [
        feature(
                    "primordial-primordial-aura",
                    "Urelementare Aura",
                    "Eine dauerhafte und mächtige elementare Aura umgibt die Figur.",
                    "passive",
                    165,
                  ),
        feature(
                    "primordial-elemental-mastery",
                    "Elementarbeherrschung",
                    "Affinitätskräfte werden stärker und können häufiger genutzt werden.",
                    "passive",
                    165,
                  ),
      ],
      flaws: [
        feature(
                    "primordial-primordial-chaos",
                    "Urelementares Chaos",
                    "Rohe Elementarkraft kann unkontrolliert und zerstörerisch hervorbrechen.",
                    "drawback",
                    165,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const seraph: TransformationDefinition = {
  id: "seraph",
  name: "Seraph",
  description: "Eine himmlische Wandlung, die Licht, Flug, Schutz und göttliche Vergeltung verkörpert.",
  source: "grim-hollow",
  sourcePage: 166,
  tags: [
    "celestial",
    "radiant",
    "wings",
  ],
  theme: "Licht, Glaube und göttliche Macht",
  origin: "Eine göttliche Berufung, ein himmlischer Segen oder die Berührung einer höheren Macht.",
  stages: [
    {
      stage: 1,
      title: "Himmlisches Erwachen",
      description: "Die Figur erhält eine himmlische Gestalt, Engelsflügel und heilige Angriffe.",
      automaticFeatures: [
        feature(
                    "seraph-celestial-form",
                    "Himmlische Gestalt",
                    "Die Figur erhält einen himmlisch geprägten Kreaturentyp und erkennbare göttliche Merkmale.",
                    "passive",
                    166,
                  ),
        feature(
                    "seraph-angelic-wings",
                    "Engelsflügel",
                    "Die Figur entwickelt Flügel und erhält eine Form des Fluges.",
                    "passive",
                    166,
                  ),
        feature(
                    "seraph-holy-strikes",
                    "Heilige Schläge",
                    "Angriffe können durch strahlende himmlische Kraft verstärkt werden.",
                    "passive",
                    166,
                  ),
      ],
      flaws: [
        feature(
                    "seraph-planar-binding",
                    "Ebenenbindung",
                    "Die höhere Ebene und der himmlische Auftrag beanspruchen die Figur.",
                    "drawback",
                    167,
                  ),
      ],
      featureSelection: {
        boons: 0,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Göttliche Milde",
      description: "Die Figur schützt oder heilt Verbündete und bestraft feindliche Angriffe.",
      boons: [
        feature(
                    "seraph-divine-mercy",
                    "Göttliche Milde",
                    "Die Figur kann Verbündeten Schutz oder Heilung gewähren.",
                    "action",
                    167,
                  ),
        feature(
                    "seraph-holy-retribution",
                    "Heilige Vergeltung",
                    "Angriffe gegen die Figur oder ihre Verbündeten können durch heilige Macht bestraft werden.",
                    "reaction",
                    167,
                  ),
      ],
      flaws: [
        feature(
                    "seraph-blinding-radiance",
                    "Blendendes Strahlen",
                    "Die wahre Gestalt ist schwer zu verbergen und kann andere Wesen beeinträchtigen.",
                    "drawback",
                    167,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Himmlischer Vollstrecker",
      description: "Reinigung, Schutz und himmlische Bewaffnung erweitern die göttliche Macht.",
      boons: [
        feature(
                    "seraph-purify-suffering",
                    "Leiden reinigen",
                    "Die Figur kann Zustände, Leiden oder schädliche Einflüsse entfernen.",
                    "action",
                    168,
                  ),
        feature(
                    "seraph-protective-wings",
                    "Schützende Flügel",
                    "Flügel können als defensive Reaktion oder schützende Aura eingesetzt werden.",
                    "reaction",
                    168,
                  ),
        feature(
                    "seraph-bow-of-celestial-judgment",
                    "Bogen des himmlischen Gerichts",
                    "Die Figur erschafft eine himmlische Fernkampfwaffe.",
                    "action",
                    168,
                  ),
      ],
      flaws: [
        feature(
                    "seraph-beacon-for-darkness",
                    "Leuchtfeuer für die Dunkelheit",
                    "Böse und übernatürliche Mächte können die Figur leichter wahrnehmen und verfolgen.",
                    "drawback",
                    168,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Vollendeter Seraph",
      description: "Die Figur erhält eine mächtige heilige Aura oder die vollendete Form ihrer himmlischen Waffe.",
      boons: [
        feature(
                    "seraph-aura-of-holy-purification",
                    "Aura der heiligen Läuterung",
                    "Eine mächtige Aura reinigt und schwächt verderbte Einflüsse.",
                    "passive",
                    169,
                  ),
        feature(
                    "seraph-aura-of-righteous-grace",
                    "Aura rechtschaffener Gnade",
                    "Eine heilige Aura schützt und stärkt Verbündete.",
                    "passive",
                    169,
                  ),
        feature(
                    "seraph-bow-of-celestial-dominion",
                    "Bogen himmlischer Herrschaft",
                    "Die himmlische Fernkampfwaffe erreicht ihre vollendete Form.",
                    "action",
                    169,
                  ),
      ],
      flaws: [
        feature(
                    "seraph-seraphic-corruption",
                    "Seraphische Verderbnis",
                    "Handlungen gegen das himmlische Ideal erzeugen Verderbnis, Schmerz oder Machtverlust.",
                    "drawback",
                    169,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const shadowsteelGhoul: TransformationDefinition = {
  id: "shadowsteel-ghoul",
  name: "Schattenstahl-Ghul",
  description: "Eine ghulartige Wandlung durch Schattenstahl, die untote Zähigkeit, Flüche und körperlichen Verfall verbindet.",
  source: "grim-hollow",
  sourcePage: 170,
  tags: [
    "undead",
    "shadowsteel",
    "curse",
  ],
  theme: "Untod, Schattenstahl und zehrende Verderbnis",
  origin: "Vergiftung oder Verwundung durch Schattenstahl, ein untotes Ritual oder der Fluch eines ghulartigen Wesens.",
  stages: [
    {
      stage: 1,
      title: "Erwachender Schattenstahl",
      description: "Die Figur bindet eine Waffe an ihre Verderbnis und lernt, Schattenstahlflüche zu verstärken.",
      boons: [
        feature(
                    "shadowsteel-ghoul-shadowsteel-weapon",
                    "Schattenstahlwaffe",
                    "Eine Waffe wird an die Verderbnis der Figur gebunden.",
                    "benefit",
                    170,
                  ),
        feature(
                    "shadowsteel-ghoul-shadowsteel-curser",
                    "Schattenstahl-Verflucher",
                    "Die Figur verstärkt Schattenstahlflüche und ihre Auswirkungen.",
                    "passive",
                    170,
                  ),
      ],
      flaws: [
        feature(
                    "shadowsteel-ghoul-debilitating-magic",
                    "Schwächende Magie",
                    "Die Nutzung von Schattenstahl entzieht Körper und Seele Kraft.",
                    "drawback",
                    171,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Schattenstahlspezialisierung",
      description: "Die Figur spezialisiert sich auf Magieresistenz, Absorption, Zauberei oder Waffenmeisterschaft.",
      boons: [
        feature(
                    "shadowsteel-ghoul-magic-resistance",
                    "Magieresistenz",
                    "Die Figur erhält stärkere Verteidigung gegen Magie.",
                    "passive",
                    171,
                  ),
        feature(
                    "shadowsteel-ghoul-shadowsteel-absorption",
                    "Schattenstahlabsorption",
                    "Schattenstahlenergie kann aufgenommen oder umgeleitet werden.",
                    "reaction",
                    171,
                  ),
        feature(
                    "shadowsteel-ghoul-shadowsteel-caster",
                    "Schattenstahlwirker",
                    "Die Figur nutzt Schattenstahl als Quelle oder Verstärker magischer Effekte.",
                    "passive",
                    171,
                  ),
        feature(
                    "shadowsteel-ghoul-shadowsteel-weapon-master",
                    "Schattenstahl-Waffenmeister",
                    "Die Beherrschung gebundener Schattenstahlwaffen wird deutlich verbessert.",
                    "passive",
                    171,
                  ),
      ],
      flaws: [
        feature(
                    "shadowsteel-ghoul-friendless",
                    "Freundlos",
                    "Die Figur gilt für viele Humanoide und unterstützende Effekte nicht mehr als normaler Verbündeter.",
                    "drawback",
                    171,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Verfluchte Klaue",
      description: "Die Verderbnis formt einen mächtigen natürlichen Schattenstahlangriff.",
      automaticFeatures: [
        feature(
                    "shadowsteel-ghoul-cursed-claw",
                    "Verfluchte Klaue",
                    "Die Figur erhält einen mächtigen natürlichen Schattenstahlangriff.",
                    "action",
                    172,
                  ),
      ],
      flaws: [
        feature(
                    "shadowsteel-ghoul-healing-resistance",
                    "Heilungsresistenz",
                    "Magische und gewöhnliche Heilung wirken vermindert.",
                    "drawback",
                    172,
                  ),
      ],
      featureSelection: {
        boons: 0,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Schattenstahlzorn",
      description: "Die Figur speichert arkane Energie oder entfesselt einen mächtigen offensiven Endzustand.",
      boons: [
        feature(
                    "shadowsteel-ghoul-arcane-shadowsteel-vessel",
                    "Arkanes Schattenstahlgefäß",
                    "Die Figur kann arkane Energie im Schattenstahl speichern.",
                    "passive",
                    173,
                  ),
        feature(
                    "shadowsteel-ghoul-shadowsteel-wrath",
                    "Schattenstahlzorn",
                    "Die Verderbnis wird als mächtiger offensiver Endzustand entfesselt.",
                    "action",
                    173,
                  ),
      ],
      flaws: [
        feature(
                    "shadowsteel-ghoul-shadowsteel-explosion",
                    "Schattenstahlexplosion",
                    "Angesammelte Verderbnis kann katastrophal und unkontrolliert freigesetzt werden.",
                    "drawback",
                    173,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const specter: TransformationDefinition = {
  id: "specter",
  name: "Gespenst",
  description: "Eine geisterhafte Wandlung zwischen Leben, Tod und körperloser Existenz.",
  source: "grim-hollow",
  sourcePage: 174,
  tags: [
    "spirit",
    "ethereal",
    "possession",
  ],
  theme: "Tod, Körperlosigkeit und ätherische Existenz",
  origin: "Ein unvollendeter Tod, eine Bindung an einen Ort oder eine starke Verbindung zur Geisterwelt.",
  stages: [
    {
      stage: 1,
      title: "Geisterhafte Spur",
      description: "Die Figur erhält eine spektrale Gestalt, körperlose Bewegung und eine grauenhafte Berührung.",
      automaticFeatures: [
        feature(
                    "specter-spectral-form",
                    "Spektrale Gestalt",
                    "Die Figur erhält einen geisterhaften Kreaturentyp und übernatürliche Resistenzen.",
                    "passive",
                    174,
                  ),
        feature(
                    "specter-incorporeal-movement",
                    "Körperlose Bewegung",
                    "Die Figur kann durch Kreaturen und feste Gegenstände gleiten.",
                    "passive",
                    174,
                  ),
        feature(
                    "specter-horrifying-touch",
                    "Grauenhafte Berührung",
                    "Die Figur erhält einen geisterhaften Nahkampfangriff.",
                    "action",
                    174,
                  ),
      ],
      flaws: [
        feature(
                    "specter-drawn-to-darkness",
                    "Von der Dunkelheit angezogen",
                    "Helles Licht und Dunkelheit beeinflussen Bewegung, Ruhe oder Kräfte der Figur.",
                    "drawback",
                    175,
                  ),
      ],
      featureSelection: {
        boons: 0,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Ätherische Gestalt",
      description: "Die Figur kann zwischen Ebenen wechseln oder ihre Beute fliegend heimsuchen.",
      boons: [
        feature(
                    "specter-ethereal-phasing",
                    "Ätherisches Phasenwandeln",
                    "Die Figur kann zeitweise in die Ätherebene wechseln.",
                    "action",
                    175,
                  ),
        feature(
                    "specter-haunting-flight",
                    "Heimsuchender Flug",
                    "Die Figur erhält Flug und verbesserte geisterhafte Verfolgung.",
                    "passive",
                    175,
                  ),
      ],
      flaws: [
        feature(
                    "specter-detached-from-life",
                    "Vom Leben gelöst",
                    "Heilung, Nahrung und lebendige Bindungen funktionieren zunehmend schlechter.",
                    "drawback",
                    175,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Zwischen den Welten",
      description: "Die Figur entzieht Lebenskraft beim Durchqueren und kann Ziele mit ihrer Berührung lähmen.",
      boons: [
        feature(
                    "specter-draining-flight",
                    "Entziehender Flug",
                    "Das Durchqueren von Kreaturen kann diese schädigen oder schwächen.",
                    "passive",
                    176,
                  ),
        feature(
                    "specter-paralyzing-touch",
                    "Lähmende Berührung",
                    "Die geisterhafte Berührung kann Ziele lähmen.",
                    "action",
                    176,
                  ),
      ],
      flaws: [
        feature(
                    "specter-fraying-reality",
                    "Ausfransende Realität",
                    "Die Verbindung zur materiellen Welt wird zunehmend instabil.",
                    "drawback",
                    176,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Sog des Vergessens",
      description: "Die Figur kann Auslöschung herbeirufen oder einen fremden Körper besetzen.",
      boons: [
        feature(
                    "specter-call-of-annihilation",
                    "Ruf der Auslöschung",
                    "Die Figur entfesselt einen mächtigen zerstörerischen Geistereffekt.",
                    "action",
                    177,
                  ),
        feature(
                    "specter-possession",
                    "Besessenheit",
                    "Die Figur kann einen fremden Körper kontrollieren.",
                    "action",
                    177,
                  ),
      ],
      flaws: [
        feature(
                    "specter-pull-of-oblivion",
                    "Sog des Vergessens",
                    "Die Figur droht endgültig aus der Realität gezogen zu werden.",
                    "drawback",
                    177,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

const vampire: TransformationDefinition = {
  id: "vampire",
  name: "Vampir",
  description: "Eine blutgebundene Wandlung, die Hunger, natürliche Waffen und die Macht einer vampirischen Blutlinie vereint.",
  source: "grim-hollow",
  sourcePage: 178,
  tags: [
    "undead",
    "blood",
    "vampire",
  ],
  theme: "Blutdurst, Nacht und unnatürliche Unsterblichkeit",
  origin: "Der Biss eines Vampirs, ein Blutritual oder eine verfluchte Blutlinie.",
  stages: [
    {
      stage: 1,
      title: "Blutdurst",
      description: "Die Figur erhält einen Fangbiss und wählt eine vampirische Blutlinie.",
      automaticFeatures: [
        feature(
                    "vampire-fanged-bite",
                    "Fangbiss",
                    "Die Figur erhält einen natürlichen Angriff mit den Fängen und kann über Blutraub Kraft gewinnen.",
                    "action",
                    178,
                  ),
      ],
      boons: [
        feature(
                    "vampire-strigoi-bloodline",
                    "Strigoi-Blutlinie",
                    "Die Blutlinie konzentriert sich auf körperliche Jagd, Stärke und bestialische Fähigkeiten.",
                    "benefit",
                    178,
                  ),
        feature(
                    "vampire-soman-bloodline",
                    "Soman-Blutlinie",
                    "Die Blutlinie konzentriert sich auf Magie, Beweglichkeit und übernatürliche Eleganz.",
                    "benefit",
                    178,
                  ),
        feature(
                    "vampire-fzeg-bloodline",
                    "Fzeg-Blutlinie",
                    "Die Blutlinie konzentriert sich auf Beherrschung, Täuschung und Heimlichkeit.",
                    "benefit",
                    178,
                  ),
      ],
      flaws: [
        feature(
                    "vampire-sanguine-curse",
                    "Sanguinischer Fluch",
                    "Blutdurst, Sonnenlicht und weitere klassische vampirische Einschränkungen belasten die Figur.",
                    "drawback",
                    179,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 2,
      title: "Nächtlicher Jäger",
      description: "Die Figur spezialisiert sich auf Nachtsehen, untote Seele, Reflexe oder Widerstandskraft.",
      boons: [
        feature(
                    "vampire-eyes-of-the-night",
                    "Augen der Nacht",
                    "Die Sinne der Figur werden an Dunkelheit und nächtliche Jagd angepasst.",
                    "passive",
                    179,
                  ),
        feature(
                    "vampire-grave-touched-soul",
                    "Grabberührte Seele",
                    "Die untote Natur der Seele wird stärker und widerstandsfähiger.",
                    "passive",
                    179,
                  ),
        feature(
                    "vampire-inhuman-reflexes",
                    "Unmenschliche Reflexe",
                    "Die Figur reagiert mit übernatürlicher Geschwindigkeit.",
                    "reaction",
                    179,
                  ),
        feature(
                    "vampire-undead-resilience",
                    "Untote Widerstandskraft",
                    "Die Figur erhält zusätzliche Widerstandskraft einer untoten Kreatur.",
                    "passive",
                    179,
                  ),
      ],
      flaws: [
        feature(
                    "vampire-greater-sanguine-curse",
                    "Größerer sanguinischer Fluch",
                    "Hunger und vampirische Verwundbarkeiten verschärfen sich.",
                    "drawback",
                    179,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 3,
      title: "Untoter Adel",
      description: "Der Fangbiss, die Nebelgestalt, Sangromantie oder vampirische Verführung erreichen größere Macht.",
      boons: [
        feature(
                    "vampire-improved-fanged-bite",
                    "Verbesserter Fangbiss",
                    "Der natürliche Fangangriff und sein Blutraub werden stärker.",
                    "passive",
                    180,
                  ),
        feature(
                    "vampire-mist-form",
                    "Nebelgestalt",
                    "Die Figur kann eine schwer greifbare Nebelgestalt annehmen.",
                    "action",
                    180,
                  ),
        feature(
                    "vampire-sangromancy-specialist",
                    "Sangromantie-Spezialist",
                    "Die Figur spezialisiert sich auf Magie, die Blut als Quelle oder Fokus verwendet.",
                    "passive",
                    180,
                  ),
        feature(
                    "vampire-seducers-charm",
                    "Charme des Verführers",
                    "Die vampirische Präsenz kann andere Wesen übernatürlich beeinflussen.",
                    "action",
                    180,
                  ),
      ],
      flaws: [
        feature(
                    "vampire-superior-sanguine-curse",
                    "Überlegener sanguinischer Fluch",
                    "Weitere Tabus sowie stärkere Hunger- und Sonnennachteile treten auf.",
                    "drawback",
                    180,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
    {
      stage: 4,
      title: "Vollendeter Vampir",
      description: "Die Blutlinie erreicht ihre vollendete Gestalt oder entwickelt mächtige Regeneration.",
      boons: [
        feature(
                    "vampire-perfected-strigoi-bloodline",
                    "Vollendete Strigoi-Blutlinie",
                    "Die körperlichen und jagdbezogenen Kräfte der Strigoi erreichen ihre höchste Form.",
                    "benefit",
                    181,
                    [
                      "vampire-strigoi-bloodline",
                    ],
                  ),
        feature(
                    "vampire-perfected-soman-bloodline",
                    "Vollendete Soman-Blutlinie",
                    "Die magischen und beweglichen Kräfte der Soman erreichen ihre höchste Form.",
                    "benefit",
                    181,
                    [
                      "vampire-soman-bloodline",
                    ],
                  ),
        feature(
                    "vampire-perfected-fzeg-bloodline",
                    "Vollendete Fzeg-Blutlinie",
                    "Die Kräfte der Beherrschung und Heimlichkeit der Fzeg erreichen ihre höchste Form.",
                    "benefit",
                    181,
                    [
                      "vampire-fzeg-bloodline",
                    ],
                  ),
        feature(
                    "vampire-regeneration",
                    "Regeneration",
                    "Die Figur regeneriert sich mit unnatürlicher Geschwindigkeit, sofern ihre Schwächen dies nicht verhindern.",
                    "passive",
                    181,
                  ),
      ],
      flaws: [
        feature(
                    "vampire-ultimate-sanguine-curse",
                    "Ultimativer sanguinischer Fluch",
                    "Die Figur ist vollständig an Blutdurst und die endgültigen Schwächen ihrer Art gebunden.",
                    "drawback",
                    181,
                  ),
      ],
      featureSelection: {
        boons: 1,
        flaws: 1,
      },
    },
  ],
};

export const transformations: TransformationDefinition[] = [
  aberrantHorror,
  fey,
  fiend,
  hag,
  lich,
  lycanthrope,
  ooze,
  primordial,
  seraph,
  shadowsteelGhoul,
  specter,
  vampire,
];


export function getTransformationStageAutomaticFeatures(
  stage: TransformationStage,
): TransformationFeature[] {
  return [...(stage.automaticFeatures ?? [])];
}

export function getTransformationStageBoons(
  stage: TransformationStage,
): TransformationFeature[] {
  return [
    ...(stage.boons ?? []),
    ...(stage.features ?? []).filter(
      (entry) => entry.kind !== "drawback",
    ),
  ];
}

export function getTransformationStageFlaws(
  stage: TransformationStage,
): TransformationFeature[] {
  return [
    ...(stage.flaws ?? []),
    ...(stage.features ?? []).filter(
      (entry) => entry.kind === "drawback",
    ),
  ];
}

export function getTransformationStageFeatures(
  stage: TransformationStage,
): TransformationFeature[] {
  return [
    ...getTransformationStageAutomaticFeatures(stage),
    ...getTransformationStageBoons(stage),
    ...getTransformationStageFlaws(stage),
  ];
}

export function getTransformationById(
  transformationId: string,
): TransformationDefinition | undefined {
  return transformations.find(
    (entry) => entry.id === transformationId,
  );
}

export function getTransformationStage(
  transformationId: string,
  stage: number,
): TransformationStage | undefined {
  return getTransformationById(
    transformationId,
  )?.stages.find(
    (entry) => entry.stage === stage,
  );
}

export function getActiveTransformationStages(
  transformationId: string,
  currentStage: number,
): TransformationStage[] {
  const transformation =
    getTransformationById(transformationId);

  if (!transformation) {
    return [];
  }

  const safeStage =
    Math.max(0, Math.min(4, currentStage));

  return transformation.stages.filter(
    (entry) => entry.stage <= safeStage,
  );
}

export function getActiveTransformationFeatures(
  transformationId: string,
  currentStage: number,
): TransformationFeature[] {
  return getActiveTransformationStages(
    transformationId,
    currentStage,
  ).flatMap(getTransformationStageFeatures);
}
