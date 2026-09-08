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
  | number
  | "proficiency-bonus"
  | "class-level"
  | "ability-modifier"
  | "ability-modifier-plus-one"
  | {
      kind: "level-table";
      values: Record<number, number>;
    }
  | {
      kind: "class-level-multiplier";
      multiplier: number;
    };

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
        description: "Als Bonusaktion verfällst du bis zu 1 Minute in Kampfrausch. Ohne schwere Rüstung erhältst du Vorteil auf Stärkeproben und Stärkerettungswürfe, +2 Schaden mit Nahkampfangriffen über Stärke sowie Resistenz gegen Hieb-, Stich- und Wuchtschaden.",
        level: 1, kind: "bonus-action",
        resource: { id: "barbarian-rage-uses", name: "Kampfrausch", amount: { kind: "level-table", values: { 1: 2, 3: 3 } }, recharge: "long-rest" },
      },
      { id: "barbarian-unarmored-defense", name: "Ungepanzerte Verteidigung", description: "Ohne Rüstung beträgt deine RK 10 + GE-Modifikator + KO-Modifikator. Einen Schild kannst du dabei verwenden.", level: 1, kind: "passive" },
      { id: "barbarian-reckless-attack", name: "Rücksichtsloser Angriff", description: "Beim ersten Angriff deines Zuges kannst du rücksichtslos angreifen: Vorteil auf Stärke-basierte Nahkampfangriffe in diesem Zug, dafür haben Angriffe gegen dich bis zu deinem nächsten Zug Vorteil.", level: 2, kind: "passive" },
      { id: "barbarian-danger-sense", name: "Gefahrengespür", description: "Du hast Vorteil auf GE-Rettungswürfe gegen sichtbare Effekte wie Fallen und Zauber, solange du nicht blind, taub oder kampfunfähig bist.", level: 2, kind: "passive" },
      { id: "barbarian-primal-path", name: "Urpfad", description: "Auf Stufe 3 wählst du deinen barbarischen Urpfad. Die konkreten Unterklassenmerkmale werden über die gewählte Unterklasse ergänzt.", level: 3, kind: "passive" },
    ],

    subclasses: [
      {
        id: "berserker",
        name: "Berserker",
        description:
          "Ein Pfad der ungezügelten Gewalt und völligen Hingabe an den Kampfrausch.",
        features: [
          { id: "berserker-1", name: "Raserei", description: "Im Kampfrausch kannst du Raserei wählen. Ab dem Zug nach Aktivierung darfst du als Bonusaktion einen Nahkampfwaffenangriff ausführen; nach Ende des Kampfrauschs erhältst du eine Stufe Erschöpfung.", level: 3, kind: "bonus-action" },
        ],
      },
      {
        id: "totem-warrior",
        name: "Totemkrieger",
        description:
          "Ein spiritueller Pfad, der tierische Vorbilder und Ahnenkräfte vereint.",
        features: [
          { id: "totem-warrior-1", name: "Geistsucher", description: "2014-Unterklassenmerkmal: You gain ritual access to beast sense and speak with animals, representing your bond with nature spirits.", level: 3, kind: "passive" },
          { id: "totem-warrior-2", name: "Totemgeist", description: "2014-Unterklassenmerkmal: Choose Bear, Eagle, or Wolf. While raging, your chosen totem grants its level-3 benefit.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "ancestral-guardian",
        name: "Ahnenwächter",
        description:
          "Ein Krieger, der im Kampf von den Geistern seiner Vorfahren begleitet wird.",
        features: [
          { id: "ancestral-guardian-1", name: "Ahnenbeschützer", description: "2014-Unterklassenmerkmal: While raging, the first creature you hit on your turn becomes hindered by ancestral spirits: it has disadvantage on attacks against others, and its target gains resistance if such an attack still hits.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "beast",
        name: "Bestie",
        description:
          "Ein Pfad, auf dem sich der eigene Körper in eine natürliche Waffe verwandelt.",
        features: [
          { id: "beast-1", name: "Gestalt der Bestie", description: "2014-Unterklassenmerkmal: When you enter a rage, choose Bite, Claws, or Tail. That natural weapon lasts until the rage ends and uses Strength for its attacks.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "storm-herald",
        name: "Sturmbote",
        description:
          "Ein Barbar, dessen Zorn die Kraft extremer Landschaften entfesselt.",
        features: [
          { id: "storm-herald-1", name: "Sturmaura", description: "2014-Unterklassenmerkmal: While raging you project a 10-foot storm aura. Choose Desert, Sea, or Tundra when you gain this feature; your bonus action can trigger the aura’s level-3 effect.", level: 3, kind: "bonus-action" },
        ],
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
      preparation: "known",
      ritualCasting: true,
      startsAtLevel: 1,
    },

    features: [
      { id: "bard-bardic-inspiration", name: "Bardische Inspiration", description: "Als Bonusaktion erhält eine andere Kreatur innerhalb von 18 m, die dich hören kann, einen W6-Inspirationswürfel. Sie kann ihn innerhalb von 10 Minuten auf einen Attributs-, Angriffs- oder Rettungswurf addieren.", level: 1, kind: "bonus-action", resource: { id: "bard-bardic-inspiration-uses", name: "Bardische Inspiration", amount: "ability-modifier", recharge: "long-rest" } },
      { id: "bard-spellcasting", name: "Zauberwirken", description: "Du kennst Bardenzauber und wirkst sie mit Charisma. Auf Stufe 1 kennst du 2 Zaubertricks und 4 Zauber des 1. Grades.", level: 1, kind: "passive" },
      { id: "bard-jack-of-all-trades", name: "Alleskönner", description: "Auf Attributsproben ohne deinen Übungsbonus addierst du deinen halben Übungsbonus, abgerundet.", level: 2, kind: "passive" },
      { id: "bard-song-of-rest", name: "Lied der Erholung", description: "Während einer kurzen Rast erhalten Kreaturen, die Trefferwürfel zur Heilung ausgeben und dein Lied hören, zusätzlich 1W6 Trefferpunkte.", level: 2, kind: "passive" },
      { id: "bard-college", name: "Bardenschule", description: "Auf Stufe 3 wählst du eine Bardenschule und erhältst deren erste Merkmale.", level: 3, kind: "passive" },
      { id: "bard-expertise", name: "Expertise", description: "Wähle zwei Fertigkeiten, in denen du geübt bist. Dein Übungsbonus wird für Proben mit diesen Fertigkeiten verdoppelt.", level: 3, kind: "passive" },
    ],

    subclasses: [
      {
        id: "college-of-lore",
        name: "Kolleg des Wissens",
        description:
          "Ein Pfad für Gelehrte, Redner und Sammler vergessener Geheimnisse.",
        features: [
          { id: "college-of-lore-1", name: "Zusätzliche Übungen", description: "2014-Unterklassenmerkmal: You gain proficiency in three skills of your choice.", level: 3, kind: "passive" },
          { id: "college-of-lore-2", name: "Schneidende Worte", description: "2014-Unterklassenmerkmal: As a reaction, spend Bardic Inspiration to subtract the die from a creature’s attack roll, ability check, or damage roll when the feature’s conditions are met.", level: 3, kind: "reaction" },
        ],
      },
      {
        id: "college-of-valor",
        name: "Kolleg der Tapferkeit",
        description:
          "Ein kriegerischer Barde, der Verbündete mit Taten und Liedern antreibt.",
        features: [
          { id: "college-of-valor-1", name: "Zusätzliche Übungen", description: "2014-Unterklassenmerkmal: You gain proficiency with medium armor, shields, and martial weapons.", level: 3, kind: "passive" },
          { id: "college-of-valor-2", name: "Kampfinspiration", description: "2014-Unterklassenmerkmal: A creature holding your Bardic Inspiration die can also add it to weapon damage or, as a reaction, to AC against one attack.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "college-of-whispers",
        name: "Kolleg des Flüsterns",
        description:
          "Ein düsterer Pfad aus Geheimnissen, Furcht und gezielter Manipulation.",
        features: [
          { id: "college-of-whispers-1", name: "Psychische Klingen", description: "2014-Unterklassenmerkmal: When you hit with a weapon attack, you can expend Bardic Inspiration to deal an extra 2d6 psychic damage; once per round.", level: 3, kind: "passive" },
          { id: "college-of-whispers-2", name: "Worte des Schreckens", description: "2014-Unterklassenmerkmal: After speaking privately with a humanoid for at least 1 minute, you can attempt to frighten it for up to 1 hour; usable once per short or long rest.", level: 3, kind: "action", resource: { id: "whispers-words-of-terror-uses", name: "Worte des Schreckens", amount: 1, recharge: "short-rest" } },
        ],
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
      { id: "cleric-spellcasting", name: "Zauberwirken", description: "Du bereitest Klerikerzauber vor und wirkst sie mit Weisheit. Die Zahl vorbereiteter Zauber entspricht WE-Modifikator + Klerikerstufe, mindestens 1.", level: 1, kind: "passive" },
      { id: "cleric-divine-domain", name: "Göttliche Domäne", description: "Auf Stufe 1 wählst du eine göttliche Domäne und erhältst deren Domänenzauber und Merkmale.", level: 1, kind: "passive" },
      { id: "cleric-channel-divinity", name: "Göttliche Macht fokussieren", description: "Du kanalisierst göttliche Energie für Untote vertreiben oder eine Option deiner Domäne. Der SG entspricht deinem Zauberrettungswurf-SG.", level: 2, kind: "action", resource: { id: "cleric-channel-divinity-uses", name: "Göttliche Macht fokussieren", amount: 1, recharge: "short-rest" } },
      { id: "cleric-turn-undead", name: "Untote vertreiben", description: "Als Aktion präsentierst du dein heiliges Symbol. Untote innerhalb von 9 m, die dich sehen oder hören, müssen einen WE-Rettungswurf bestehen oder werden 1 Minute lang vertrieben.", level: 2, kind: "action" },
    ],

    subclasses: [
      {
        id: "life-domain",
        name: "Domäne des Lebens",
        description:
          "Eine göttliche Ausrichtung auf Heilung, Schutz und die Bewahrung des Lebens.",
        features: [
          { id: "life-domain-1", name: "Zusätzliche Übung", description: "2014-Unterklassenmerkmal: You gain proficiency with heavy armor.", level: 1, kind: "passive" },
          { id: "life-domain-2", name: "Jünger des Lebens", description: "2014-Unterklassenmerkmal: Your healing spells of 1st level or higher restore extra hit points equal to 2 + the spell’s level.", level: 1, kind: "passive" },
          { id: "life-domain-3", name: "Göttliche Macht fokussieren: Leben bewahren", description: "2014-Unterklassenmerkmal: As an action, distribute healing equal to five times your cleric level among creatures within 30 feet, without healing a creature above half its hit-point maximum.", level: 2, kind: "action" },
        ],
      },
      {
        id: "light-domain",
        name: "Domäne des Lichts",
        description:
          "Eine strahlende Tradition, die Dunkelheit und Verderbnis bekämpft.",
        features: [
          { id: "light-domain-1", name: "Zusätzlicher Zaubertrick", description: "2014-Unterklassenmerkmal: You learn the light cantrip if you do not already know it.", level: 1, kind: "passive" },
          { id: "light-domain-2", name: "Schützendes Flackern", description: "2014-Unterklassenmerkmal: As a reaction, impose disadvantage on an attack from a creature you can see within 30 feet. Uses per long rest equal to your Wisdom modifier, minimum 1.", level: 1, kind: "reaction", resource: { id: "light-warding-flare-uses", name: "Schützendes Flackern", amount: "ability-modifier", recharge: "long-rest" } },
          { id: "light-domain-3", name: "Göttliche Macht fokussieren: Glanz der Morgenröte", description: "2014-Unterklassenmerkmal: As an action, dispel magical darkness and damage hostile creatures around you with radiant power; a Constitution save halves the damage.", level: 2, kind: "action" },
        ],
      },
      {
        id: "war-domain",
        name: "Domäne des Krieges",
        description:
          "Eine kämpferische Ausrichtung für Priester, die ihren Glauben mit Waffen verteidigen.",
        features: [
          { id: "war-domain-1", name: "Zusätzliche Übungen", description: "2014-Unterklassenmerkmal: You gain proficiency with martial weapons and heavy armor.", level: 1, kind: "passive" },
          { id: "war-domain-2", name: "Kriegspriester", description: "2014-Unterklassenmerkmal: After taking the Attack action, you can make one weapon attack as a bonus action. Uses per long rest equal to your Wisdom modifier, minimum 1.", level: 1, kind: "bonus-action", resource: { id: "war-priest-uses", name: "Kriegspriester", amount: "ability-modifier", recharge: "long-rest" } },
          { id: "war-domain-3", name: "Göttliche Macht fokussieren: Geführter Schlag", description: "2014-Unterklassenmerkmal: After making an attack roll, you can use Channel Divinity to gain +10 to that roll.", level: 2, kind: "passive" },
        ],
      },
      {
        id: "grave-domain",
        name: "Domäne des Grabes",
        description:
          "Eine düstere Lehre über Tod, Übergang und das Gleichgewicht zwischen Leben und Sterben.",
        features: [
          { id: "grave-domain-1", name: "Kreis der Sterblichkeit", description: "2014-Unterklassenmerkmal: When you heal a creature at 0 hit points with a spell, treat the healing dice as maximum; you also learn spare the dying and can cast it as a bonus action at 30 feet.", level: 1, kind: "passive" },
          { id: "grave-domain-2", name: "Augen des Grabes", description: "2014-Unterklassenmerkmal: As an action, sense undead within 60 feet that are not behind total cover or protected from divination. Uses per long rest equal to your Wisdom modifier, minimum 1.", level: 1, kind: "action", resource: { id: "grave-eyes-of-the-grave-uses", name: "Augen des Grabes", amount: "ability-modifier", recharge: "long-rest" } },
          { id: "grave-domain-3", name: "Göttliche Macht fokussieren: Pfad zum Grab", description: "2014-Unterklassenmerkmal: As an action, curse a creature within 30 feet; the next time it takes damage before the end of your next turn, it is vulnerable to all of that attack or effect’s damage.", level: 2, kind: "action" },
        ],
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
      { id: "druid-druidic", name: "Druidisch", description: "Du beherrschst die geheime Sprache der Druiden und kannst darin verborgene Botschaften hinterlassen.", level: 1, kind: "passive" },
      { id: "druid-spellcasting", name: "Zauberwirken", description: "Du bereitest Druidenzauber vor und wirkst sie mit Weisheit. Die Zahl vorbereiteter Zauber entspricht WE-Modifikator + Druidenstufe, mindestens 1.", level: 1, kind: "passive" },
      { id: "druid-wild-shape", name: "Tiergestalt", description: "Als Aktion verwandelst du dich in eine Tiergestalt, die du bereits gesehen hast. Auf Stufe 2 gelten die normalen 2014-Grenzen für HG, Flug- und Schwimmbewegung.", level: 2, kind: "action", resource: { id: "druid-wild-shape-uses", name: "Tiergestalt", amount: 2, recharge: "short-rest" } },
      { id: "druid-circle", name: "Druidenzirkel", description: "Auf Stufe 2 wählst du einen Druidenzirkel und erhältst dessen erste Merkmale.", level: 2, kind: "passive" },
    ],

    subclasses: [
      {
        id: "circle-of-the-land",
        name: "Zirkel des Landes",
        description:
          "Ein naturverbundener Pfad mit starker Bindung an eine bestimmte Region.",
        features: [
          { id: "circle-of-the-land-1", name: "Zusätzlicher Zaubertrick", description: "2014-Unterklassenmerkmal: You learn one additional druid cantrip of your choice.", level: 2, kind: "passive" },
          { id: "circle-of-the-land-2", name: "Natürliche Erholung", description: "2014-Unterklassenmerkmal: Once per day during a short rest, recover expended spell slots with combined levels up to half your druid level, rounded up; no slot can be 6th level or higher.", level: 2, kind: "resource", resource: { id: "land-natural-recovery-uses", name: "Natürliche Erholung", amount: 1, recharge: "long-rest" } },
          { id: "circle-of-the-land-3", name: "Zirkelzauber", description: "2014-Unterklassenmerkmal: At 3rd level, your chosen land grants two always-prepared circle spells; they count as druid spells and do not count against prepared spells.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "circle-of-the-moon",
        name: "Zirkel des Mondes",
        description:
          "Ein kämpferischer Zirkel, der die Tiergestalt in den Mittelpunkt stellt.",
        features: [
          { id: "circle-of-the-moon-1", name: "Kampf-Tiergestalt", description: "2014-Unterklassenmerkmal: You can use Wild Shape as a bonus action and can expend spell slots while transformed to restore hit points.", level: 2, kind: "bonus-action" },
          { id: "circle-of-the-moon-2", name: "Zirkelgestalten", description: "2014-Unterklassenmerkmal: Your Wild Shape can assume stronger beasts: at 2nd level up to CR 1, still respecting the normal movement restrictions.", level: 2, kind: "passive" },
        ],
      },
      {
        id: "circle-of-spores",
        name: "Zirkel der Sporen",
        description:
          "Eine düstere Tradition über Verfall, Pilze und den Kreislauf des Lebens.",
        features: [
          { id: "circle-of-spores-1", name: "Sporenhalo", description: "2014-Unterklassenmerkmal: As a reaction when a creature moves into or starts its turn within 10 feet, deal necrotic damage on a failed Constitution save; the die starts at 1d4.", level: 2, kind: "reaction" },
          { id: "circle-of-spores-2", name: "Symbiotische Entität", description: "2014-Unterklassenmerkmal: As an action, expend Wild Shape to gain temporary hit points, double Halo of Spores damage, and add 1d6 poison damage to melee weapon hits while the effect lasts.", level: 2, kind: "action" },
        ],
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
      { id: "fighter-fighting-style", name: "Kampfstil", description: "Du spezialisierst dich auf einen Kampfstil. Die konkrete Wahl bestimmt den dauerhaften Bonus oder die zusätzliche Kampfoption.", level: 1, kind: "passive" },
      { id: "fighter-second-wind", name: "Zweiter Wind", description: "Als Bonusaktion stellst du 1W10 + Kämpferstufe Trefferpunkte wieder her.", level: 1, kind: "bonus-action", resource: { id: "fighter-second-wind-uses", name: "Zweiter Wind", amount: 1, recharge: "short-rest" } },
      { id: "fighter-action-surge", name: "Tatendrang", description: "In deinem Zug erhältst du zusätzlich zu deiner normalen Aktion und möglichen Bonusaktion eine weitere Aktion.", level: 2, kind: "resource", resource: { id: "fighter-action-surge-uses", name: "Tatendrang", amount: 1, recharge: "short-rest" } },
      { id: "fighter-martial-archetype", name: "Kriegerischer Archetyp", description: "Auf Stufe 3 wählst du deinen kriegerischen Archetyp und erhältst dessen erste Merkmale.", level: 3, kind: "passive" },
    ],

    subclasses: [
      {
        id: "champion",
        name: "Champion",
        description:
          "Ein körperlich überragender Kämpfer mit direktem und zuverlässigem Spielstil.",
        features: [
          { id: "champion-1", name: "Verbesserter kritischer Treffer", description: "2014-Unterklassenmerkmal: Your weapon attacks score a critical hit on a roll of 19 or 20.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "battle-master",
        name: "Kampfmeister",
        description:
          "Ein taktischer Krieger, der Manöver und Kontrolle über rohe Gewalt stellt.",
        features: [
          { id: "battle-master-1", name: "Kampfüberlegenheit", description: "Du lernst drei Manöver und erhältst vier Überlegenheitswürfel (W8). Verbrauchte Würfel kehren nach kurzer oder langer Rast zurück.", level: 3, kind: "resource", resource: { id: "battle-master-superiority-dice", name: "Überlegenheitswürfel", amount: 4, recharge: "short-rest" } },
          { id: "battle-master-2", name: "Kriegsschüler", description: "2014-Unterklassenmerkmal: You gain proficiency with one type of artisan’s tools of your choice.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "eldritch-knight",
        name: "Arkaner Ritter",
        description:
          "Ein Kämpfer, der Waffenführung mit begrenzter arkaner Magie verbindet.",
        features: [
          { id: "eldritch-knight-1", name: "Zauberwirken", description: "2014-Unterklassenmerkmal: You gain limited wizard spellcasting using Intelligence. At 3rd level you know two cantrips and three 1st-level wizard spells, mostly from abjuration or evocation.", level: 3, kind: "passive" },
          { id: "eldritch-knight-2", name: "Waffenbindung", description: "2014-Unterklassenmerkmal: During a 1-hour ritual you can bond with up to two weapons. You cannot be disarmed of a bonded weapon while conscious and can summon one to your hand as a bonus action.", level: 3, kind: "bonus-action" },
        ],
      },
      {
        id: "samurai",
        name: "Samurai",
        description:
          "Ein entschlossener Duellant, der Disziplin und mentale Stärke verkörpert.",
        features: [
          { id: "samurai-1", name: "Zusätzliche Übung", description: "2014-Unterklassenmerkmal: Gain proficiency in one of History, Insight, Performance, or Persuasion; alternatively learn one language.", level: 3, kind: "passive" },
          { id: "samurai-2", name: "Kampfgeist", description: "Als Bonusaktion erhältst du bis zum Ende des Zuges Vorteil auf Waffenangriffe und 5 temporäre TP. 3 Anwendungen pro langer Rast.", level: 3, kind: "bonus-action", resource: { id: "samurai-fighting-spirit-uses", name: "Kampfgeist", amount: 3, recharge: "long-rest" } },
        ],
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
      { id: "monk-martial-arts", name: "Kampfkünste", description: "Ohne Rüstung und Schild kannst du GE statt ST für passende Mönchswaffen und waffenlose Angriffe verwenden; dein Kampfkunstwürfel ist bis Stufe 4 ein W4 und ermöglicht einen waffenlosen Bonusangriff.", level: 1, kind: "passive" },
      { id: "monk-unarmored-defense", name: "Ungepanzerte Verteidigung", description: "Ohne Rüstung und Schild beträgt deine RK 10 + GE-Modifikator + WE-Modifikator.", level: 1, kind: "passive" },
      { id: "monk-ki", name: "Ki", description: "Du erhältst Ki-Punkte in Höhe deiner Mönchsstufe. Du kannst sie unter anderem für Schlaghagel, Geduldige Verteidigung und Schritt des Windes ausgeben.", level: 2, kind: "resource", resource: { id: "monk-ki-points", name: "Ki", amount: "class-level", recharge: "short-rest" } },
      { id: "monk-unarmored-movement", name: "Ungepanzerte Bewegung", description: "Ohne Rüstung und Schild steigt deine Bewegungsrate ab Stufe 2 um 3 m.", level: 2, kind: "passive" },
      { id: "monk-monastic-tradition", name: "Klostertradition", description: "Auf Stufe 3 wählst du deine Klostertradition und erhältst deren erste Merkmale.", level: 3, kind: "passive" },
      { id: "monk-deflect-missiles", name: "Geschosse abwehren", description: "Als Reaktion verringerst du den Schaden eines Fernkampf-Waffenangriffs um 1W10 + GE-Modifikator + Mönchsstufe. Reduzierst du auf 0, kannst du das Geschoss unter den Regelbedingungen zurückwerfen.", level: 3, kind: "reaction" },
    ],

    subclasses: [
      {
        id: "way-of-the-open-hand",
        name: "Weg der offenen Hand",
        description:
          "Ein klassischer Pfad für Kontrolle, Bewegung und waffenlosen Kampf.",
        features: [
          { id: "way-of-the-open-hand-1", name: "Technik der offenen Hand", description: "2014-Unterklassenmerkmal: Whenever you hit with an attack granted by Flurry of Blows, you can prevent reactions, push the target, or knock it prone depending on the chosen option and save.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "way-of-shadow",
        name: "Weg des Schattens",
        description:
          "Ein heimlicher Pfad aus Dunkelheit, Täuschung und lautloser Bewegung.",
        features: [
          { id: "way-of-shadow-1", name: "Schattenkünste", description: "2014-Unterklassenmerkmal: You learn minor illusion. By spending 2 ki, you can cast darkness, darkvision, pass without trace, or silence without material components.", level: 3, kind: "action" },
        ],
      },
      {
        id: "way-of-the-long-death",
        name: "Weg des langen Todes",
        description:
          "Eine düstere Schule über Furcht, Sterblichkeit und die Grenzen des Körpers.",
        features: [
          { id: "way-of-the-long-death-1", name: "Berührung des Todes", description: "2014-Unterklassenmerkmal: When you reduce a creature within 5 feet to 0 hit points, gain temporary hit points equal to your Wisdom modifier + monk level.", level: 3, kind: "passive" },
        ],
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
      startsAtLevel: 2,
    },

    features: [
      { id: "paladin-divine-sense", name: "Göttliches Gespür", description: "Als Aktion spürst du bis zum Ende deines nächsten Zuges Himmlische, Unholde und Untote innerhalb von 18 m sowie geweihte oder entweihte Orte auf.", level: 1, kind: "action", resource: { id: "paladin-divine-sense-uses", name: "Göttliches Gespür", amount: "ability-modifier-plus-one", recharge: "long-rest" } },
      { id: "paladin-lay-on-hands", name: "Handauflegen", description: "Du besitzt einen Heilpool von 5 Trefferpunkten pro Paladinstufe. Als Aktion kannst du daraus heilen oder 5 Punkte ausgeben, um bestimmte Krankheiten oder Gifte zu neutralisieren.", level: 1, kind: "action", resource: { id: "paladin-lay-on-hands-pool", name: "Handauflegen", amount: { kind: "class-level-multiplier", multiplier: 5 }, recharge: "long-rest" } },
      { id: "paladin-fighting-style", name: "Kampfstil", description: "Auf Stufe 2 wählst du einen Kampfstil und erhältst dessen dauerhaften Vorteil.", level: 2, kind: "passive" },
      { id: "paladin-spellcasting", name: "Zauberwirken", description: "Ab Stufe 2 bereitest du Paladinzauber vor und wirkst sie mit Charisma.", level: 2, kind: "passive" },
      { id: "paladin-divine-smite", name: "Göttliches Niederstrecken", description: "Wenn du mit einer Nahkampfwaffe triffst, kannst du einen Zauberplatz ausgeben, um zusätzlichen gleißenden Schaden zu verursachen; höhere Plätze erhöhen den Schaden.", level: 2, kind: "passive" },
      { id: "paladin-divine-health", name: "Göttliche Gesundheit", description: "Ab Stufe 3 bist du gegen Krankheiten immun.", level: 3, kind: "passive" },
      { id: "paladin-sacred-oath", name: "Heiliger Eid", description: "Auf Stufe 3 legst du deinen Heiligen Eid ab und erhältst dessen erste Merkmale und Optionen für Göttliche Macht fokussieren.", level: 3, kind: "passive" },
    ],

    subclasses: [
      {
        id: "oath-of-devotion",
        name: "Eid der Hingabe",
        description:
          "Ein klassischer Eid über Ehre, Schutz und den Kampf gegen das Böse.",
        features: [
          { id: "oath-of-devotion-1", name: "Eidzauber", description: "2014-Unterklassenmerkmal: You always have protection from evil and good and sanctuary prepared; they do not count against your prepared paladin spells.", level: 3, kind: "passive" },
          { id: "oath-of-devotion-2", name: "Göttliche Macht fokussieren: Heilige Waffe", description: "2014-Unterklassenmerkmal: As an action, empower one weapon for 1 minute, adding your Charisma modifier to its attack rolls and making it magical and luminous.", level: 3, kind: "action" },
          { id: "oath-of-devotion-3", name: "Göttliche Macht fokussieren: Unheilige vertreiben", description: "2014-Unterklassenmerkmal: As an action, fiends and undead within 30 feet that can see or hear you must save or be turned for 1 minute.", level: 3, kind: "action" },
        ],
      },
      {
        id: "oath-of-vengeance",
        name: "Eid der Vergeltung",
        description:
          "Ein unerbittlicher Schwur, Schuldige zu verfolgen und Unrecht zu vergelten.",
        features: [
          { id: "oath-of-vengeance-1", name: "Eidzauber", description: "2014-Unterklassenmerkmal: You always have bane and hunter’s mark prepared; they do not count against your prepared paladin spells.", level: 3, kind: "passive" },
          { id: "oath-of-vengeance-2", name: "Göttliche Macht fokussieren: Feind bannen", description: "2014-Unterklassenmerkmal: As an action, frighten one creature you can see within 60 feet on a failed Wisdom save; fiends and undead have disadvantage on the save.", level: 3, kind: "action" },
          { id: "oath-of-vengeance-3", name: "Göttliche Macht fokussieren: Schwur der Feindschaft", description: "2014-Unterklassenmerkmal: As a bonus action, choose a creature within 10 feet and gain advantage on attacks against it for 1 minute or until it drops unconscious.", level: 3, kind: "bonus-action" },
        ],
      },
      {
        id: "oath-of-the-ancients",
        name: "Eid der Uralten",
        description:
          "Ein Eid zum Schutz von Hoffnung, Natur und dem Licht des Lebens.",
        features: [
          { id: "oath-of-the-ancients-1", name: "Eidzauber", description: "2014-Unterklassenmerkmal: You always have ensnaring strike and speak with animals prepared; they do not count against your prepared paladin spells.", level: 3, kind: "passive" },
          { id: "oath-of-the-ancients-2", name: "Göttliche Macht fokussieren: Zorn der Natur", description: "2014-Unterklassenmerkmal: As an action, spectral vines attempt to restrain a creature within 10 feet; it can repeat a Strength or Dexterity save to escape.", level: 3, kind: "action" },
          { id: "oath-of-the-ancients-3", name: "Göttliche Macht fokussieren: Treulose vertreiben", description: "2014-Unterklassenmerkmal: As an action, fey and fiends within 30 feet that can hear you must save or be turned for 1 minute.", level: 3, kind: "action" },
        ],
      },
      {
        id: "oath-of-the-crown",
        name: "Eid der Krone",
        description:
          "Ein Schwur an Ordnung, Pflicht, Gemeinschaft und Herrschaft.",
        features: [
          { id: "oath-of-the-crown-1", name: "Eidzauber", description: "2014-Unterklassenmerkmal: You always have command and compelled duel prepared; they do not count against your prepared paladin spells.", level: 3, kind: "passive" },
          { id: "oath-of-the-crown-2", name: "Göttliche Macht fokussieren: Herausforderung des Champions", description: "2014-Unterklassenmerkmal: As a bonus action, creatures of your choice within 30 feet must save or be unable to willingly move more than 30 feet away from you.", level: 3, kind: "bonus-action" },
          { id: "oath-of-the-crown-3", name: "Göttliche Macht fokussieren: Blatt wenden", description: "2014-Unterklassenmerkmal: As a bonus action, creatures of your choice within 30 feet that can hear you regain 1d6 + Charisma modifier hit points if they are below half their maximum.", level: 3, kind: "bonus-action" },
        ],
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
      preparation: "known",
      startsAtLevel: 2,
    },

    features: [
      { id: "ranger-favored-enemy", name: "Erzfeind", description: "Du wählst einen Typ bevorzugter Feinde. Du hast Vorteil auf WE-(Überleben)-Proben zum Verfolgen sowie auf IN-Proben, um Wissen über diese Feinde abzurufen, und lernst gegebenenfalls eine passende Sprache.", level: 1, kind: "passive" },
      { id: "ranger-natural-explorer", name: "Natürlicher Entdecker", description: "Du wählst ein bevorzugtes Gelände und erhältst dort die 2014-Vorteile für Reise, Orientierung, Nahrungssuche, Spurenlesen und andere Wildnisaufgaben.", level: 1, kind: "passive" },
      { id: "ranger-fighting-style", name: "Kampfstil", description: "Auf Stufe 2 wählst du einen Kampfstil und erhältst dessen dauerhaften Vorteil.", level: 2, kind: "passive" },
      { id: "ranger-spellcasting", name: "Zauberwirken", description: "Ab Stufe 2 kennst du Waldläuferzauber und wirkst sie mit Weisheit. Auf Stufe 2 kennst du 2 Zauber des 1. Grades.", level: 2, kind: "passive" },
      { id: "ranger-archetype", name: "Waldläuferarchetyp", description: "Auf Stufe 3 wählst du deinen Waldläuferarchetyp und erhältst dessen erste Merkmale.", level: 3, kind: "passive" },
      { id: "ranger-primeval-awareness", name: "Urbewusstsein", description: "Du kannst einen Zauberplatz ausgeben, um für eine begrenzte Zeit bestimmte Kreaturenarten in deiner Umgebung aufzuspüren; die Fähigkeit verrät nicht Ort oder Anzahl.", level: 3, kind: "action" },
    ],

    subclasses: [
      {
        id: "hunter",
        name: "Jäger",
        description:
          "Ein vielseitiger Spezialist im Kampf gegen besonders gefährliche Beute.",
        features: [
          { id: "hunter-1", name: "Beute des Jägers", description: "2014-Unterklassenmerkmal: Choose Colossus Slayer, Giant Killer, or Horde Breaker and gain that option’s offensive benefit.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "beast-master",
        name: "Tiermeister",
        description:
          "Ein Waldläufer, der an der Seite eines treuen Tiergefährten kämpft.",
        features: [
          { id: "beast-master-1", name: "Gefährte des Waldläufers", description: "2014-Unterklassenmerkmal: You gain a beast companion of CR 1/4 or lower that meets the 2014 size and movement limits. It acts on your initiative and normally attacks when you use your action to command it.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "gloom-stalker",
        name: "Düsterpirscher",
        description:
          "Ein Jäger der Finsternis, der in Höhlen, Ruinen und Schatten besonders gefährlich ist.",
        features: [
          { id: "gloom-stalker-1", name: "Düsterpirscher-Magie", description: "2014-Unterklassenmerkmal: You learn disguise self at 3rd level; it counts as a ranger spell and does not reduce your normal spells known.", level: 3, kind: "passive" },
          { id: "gloom-stalker-2", name: "Schreckensangreifer", description: "2014-Unterklassenmerkmal: Add Wisdom modifier to initiative. On your first turn of combat your speed increases by 10 feet, and if you take the Attack action you can make one additional weapon attack that deals an extra 1d8 damage on a hit.", level: 3, kind: "passive" },
          { id: "gloom-stalker-3", name: "Umbralsicht", description: "2014-Unterklassenmerkmal: You gain 60-foot darkvision, or extend existing darkvision by 30 feet. In darkness you are invisible to creatures relying on darkvision to see you.", level: 3, kind: "passive" },
        ],
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
      { id: "rogue-expertise", name: "Expertise", description: "Wähle zwei deiner Fertigkeitsübungen oder eine Fertigkeitsübung und Diebeswerkzeug. Dein Übungsbonus wird dafür verdoppelt.", level: 1, kind: "passive" },
      { id: "rogue-sneak-attack", name: "Hinterhältiger Angriff", description: "Einmal pro Zug verursachst du mit einer Finesse- oder Fernkampfwaffe zusätzlichen Schaden, wenn du Vorteil hast oder ein Verbündeter den Gegner im Nahkampf bindet und du keinen Nachteil hast. Schaden: 1W6 auf Stufe 1–2, 2W6 ab Stufe 3.", level: 1, kind: "passive" },
      { id: "rogue-thieves-cant", name: "Diebessprache", description: "Du beherrschst die geheime Sprache, Zeichen und Codes krimineller Kreise.", level: 1, kind: "passive" },
      { id: "rogue-cunning-action", name: "Raffinierte Aktion", description: "Ab Stufe 2 kannst du in jedem Zug eine Bonusaktion verwenden, um Rennen, Rückzug oder Verstecken auszuführen.", level: 2, kind: "bonus-action" },
      { id: "rogue-roguish-archetype", name: "Schurkenarchetyp", description: "Auf Stufe 3 wählst du deinen Schurkenarchetyp und erhältst dessen erste Merkmale.", level: 3, kind: "passive" },
    ],

    subclasses: [
      {
        id: "thief",
        name: "Dieb",
        description:
          "Ein klassischer Spezialist für Einbruch, Bewegung und den Einsatz von Gegenständen.",
        features: [
          { id: "thief-1", name: "Flinke Hände", description: "2014-Unterklassenmerkmal: Your Cunning Action can also make a Sleight of Hand check, use thieves’ tools to disarm a trap or open a lock, or take the Use an Object action.", level: 3, kind: "bonus-action" },
          { id: "thief-2", name: "Fassadenkletterer", description: "2014-Unterklassenmerkmal: Climbing no longer costs extra movement, and your running jump distance increases by a number of feet equal to your Dexterity modifier.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "assassin",
        name: "Assassine",
        description:
          "Ein tödlicher Pfad aus Tarnung, Vorbereitung und gezielten Angriffen.",
        features: [
          { id: "assassin-1", name: "Zusätzliche Übungen", description: "2014-Unterklassenmerkmal: You gain proficiency with the disguise kit and poisoner’s kit.", level: 3, kind: "passive" },
          { id: "assassin-2", name: "Meucheln", description: "2014-Unterklassenmerkmal: You have advantage on attacks against creatures that have not yet taken a turn. A hit against a surprised creature is a critical hit.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "arcane-trickster",
        name: "Arkaner Betrüger",
        description:
          "Ein Schurke, der Täuschung und Heimlichkeit mit begrenzter Magie verbindet.",
        features: [
          { id: "arcane-trickster-1", name: "Zauberwirken", description: "2014-Unterklassenmerkmal: You gain limited wizard spellcasting using Intelligence. At 3rd level you know mage hand plus two other cantrips and three 1st-level wizard spells, with the 2014 enchantment/illusion restrictions.", level: 3, kind: "passive" },
          { id: "arcane-trickster-2", name: "Fingerfertige Magierhand", description: "2014-Unterklassenmerkmal: Your mage hand can be invisible and perform additional roguish tasks such as stowing or retrieving objects, using thieves’ tools, and picking pockets at range.", level: 3, kind: "passive" },
        ],
      },
      {
        id: "inquisitive",
        name: "Inquisitiv",
        description:
          "Ein Beobachter und Ermittler, der Lügen, Schwächen und verborgene Wahrheiten erkennt.",
        features: [
          { id: "inquisitive-1", name: "Ohr für Täuschung", description: "2014-Unterklassenmerkmal: When an Insight check contests Deception, a d20 roll of 7 or lower counts as an 8.", level: 3, kind: "passive" },
          { id: "inquisitive-2", name: "Auge fürs Detail", description: "2014-Unterklassenmerkmal: As a bonus action, make a Perception check to spot a hidden creature or object, or Investigation to uncover clues.", level: 3, kind: "bonus-action" },
          { id: "inquisitive-3", name: "Scharfsinniger Kampf", description: "2014-Unterklassenmerkmal: As a bonus action, contest your Insight against a creature’s Deception. On success, you can use Sneak Attack against it for 1 minute without advantage, provided you do not have disadvantage.", level: 3, kind: "bonus-action" },
        ],
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
      preparation: "known",
      startsAtLevel: 1,
    },

    features: [
      { id: "sorcerer-spellcasting", name: "Zauberwirken", description: "Du kennst Zaubererzauber und wirkst sie mit Charisma. Auf Stufe 1 kennst du 4 Zaubertricks und 2 Zauber des 1. Grades.", level: 1, kind: "passive" },
      { id: "sorcerer-origin", name: "Zaubererursprung", description: "Auf Stufe 1 wählst du den Ursprung deiner angeborenen Magie und erhältst dessen erste Merkmale.", level: 1, kind: "passive" },
      { id: "sorcerer-font-of-magic", name: "Quelle der Magie", description: "Ab Stufe 2 besitzt du Zaubereipunkte in Höhe deiner Zaubererstufe. Du kannst Zauberplätze in Zaubereipunkte umwandeln und umgekehrt.", level: 2, kind: "resource", resource: { id: "sorcerer-sorcery-points", name: "Zaubereipunkte", amount: "class-level", recharge: "long-rest" } },
      { id: "sorcerer-metamagic", name: "Metamagie", description: "Auf Stufe 3 wählst du zwei Metamagie-Optionen, mit denen du Zauber durch den Einsatz von Zaubereipunkten veränderst.", level: 3, kind: "passive" },
    ],

    subclasses: [
      {
        id: "draconic-bloodline",
        name: "Drachenblutlinie",
        description:
          "Eine magische Herkunft, die auf drakonische Abstammung oder Einfluss zurückgeht.",
        features: [
          { id: "draconic-bloodline-1", name: "Drachenahne", description: "2014-Unterklassenmerkmal: Choose a dragon type. You learn Draconic, and double your proficiency bonus on Charisma checks when interacting with dragons when your proficiency applies.", level: 1, kind: "passive" },
          { id: "draconic-bloodline-2", name: "Drakonische Widerstandskraft", description: "2014-Unterklassenmerkmal: Your hit-point maximum increases by 1 per sorcerer level. While unarmored, your AC equals 13 + Dexterity modifier.", level: 1, kind: "passive" },
        ],
      },
      {
        id: "wild-magic",
        name: "Wilde Magie",
        description:
          "Eine unberechenbare Quelle, deren Kraft sich nicht vollständig kontrollieren lässt.",
        features: [
          { id: "wild-magic-1", name: "Woge der wilden Magie", description: "2014-Unterklassenmerkmal: After casting a sorcerer spell of 1st level or higher, the GM can have you roll a d20; on a 1, roll on the Wild Magic Surge table.", level: 1, kind: "passive" },
          { id: "wild-magic-2", name: "Gezeiten des Chaos", description: "2014-Unterklassenmerkmal: Gain advantage on one attack roll, ability check, or saving throw. It normally refreshes after a long rest, but the GM can trigger a Wild Magic Surge after you cast a sorcerer spell to restore it sooner.", level: 1, kind: "resource", resource: { id: "wild-magic-tides-of-chaos-uses", name: "Gezeiten des Chaos", amount: 1, recharge: "long-rest" } },
        ],
      },
      {
        id: "shadow-magic",
        name: "Schattenmagie",
        description:
          "Eine düstere Verbindung zu Finsternis, Tod oder der Schattenwelt.",
        features: [
          { id: "shadow-magic-1", name: "Augen der Dunkelheit", description: "2014-Unterklassenmerkmal: You gain darkvision out to 120 feet.", level: 1, kind: "passive" },
          { id: "shadow-magic-2", name: "Kraft des Grabes", description: "2014-Unterklassenmerkmal: When damage would reduce you to 0 hit points, make a Charisma save to drop to 1 instead, except against radiant damage or a critical hit. Once successful, it refreshes after a long rest.", level: 1, kind: "resource", resource: { id: "shadow-strength-of-the-grave-uses", name: "Kraft des Grabes", amount: 1, recharge: "long-rest" } },
        ],
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
      preparation: "known",
      startsAtLevel: 1,
    },

    features: [
      { id: "warlock-otherworldly-patron", name: "Jenseitiger Schutzherr", description: "Auf Stufe 1 wählst du deinen jenseitigen Schutzherrn und erhältst dessen erste Merkmale.", level: 1, kind: "passive" },
      { id: "warlock-pact-magic", name: "Paktmagie", description: "Du kennst Hexenmeisterzauber und wirkst sie mit Charisma. Deine Pakt-Zauberplätze haben alle denselben Grad und kehren nach kurzer oder langer Rast zurück.", level: 1, kind: "passive" },
      { id: "warlock-eldritch-invocations", name: "Unheimliche Anrufungen", description: "Auf Stufe 2 wählst du zwei Unheimliche Anrufungen und erhältst deren besondere Fähigkeiten.", level: 2, kind: "passive" },
      { id: "warlock-pact-boon", name: "Paktsegen", description: "Auf Stufe 3 gewährt dir dein Schutzherr einen Paktsegen, etwa Kette, Klinge oder Buch.", level: 3, kind: "passive" },
    ],

    subclasses: [
      {
        id: "the-fiend",
        name: "Der Unhold",
        description: "Ein Pakt mit infernalischen oder abyssalen Mächten.",
        features: [
          { id: "the-fiend-1", name: "Erweiterte Zauberliste", description: "2014-Unterklassenmerkmal: The Fiend adds burning hands and command to the warlock spell options available to you at 1st level.", level: 1, kind: "passive" },
          { id: "the-fiend-2", name: "Segen des Dunklen Meisters", description: "2014-Unterklassenmerkmal: When you reduce a hostile creature to 0 hit points, gain temporary hit points equal to Charisma modifier + warlock level, minimum 1.", level: 1, kind: "passive" },
        ],
      },
      {
        id: "the-archfey",
        name: "Der Erzfee",
        description:
          "Ein Pakt mit einer uralten und unberechenbaren Feenmacht.",
        features: [
          { id: "the-archfey-1", name: "Erweiterte Zauberliste", description: "2014-Unterklassenmerkmal: The Archfey adds faerie fire and sleep to the warlock spell options available to you at 1st level.", level: 1, kind: "passive" },
          { id: "the-archfey-2", name: "Feenpräsenz", description: "2014-Unterklassenmerkmal: As an action, creatures in a 10-foot cube originating from you make a Wisdom save or are charmed or frightened by you until the end of your next turn. Once per short or long rest.", level: 1, kind: "action", resource: { id: "archfey-fey-presence-uses", name: "Feenpräsenz", amount: 1, recharge: "short-rest" } },
        ],
      },
      {
        id: "the-great-old-one",
        name: "Der Große Alte",
        description:
          "Ein Pakt mit einer fremdartigen Entität jenseits gewöhnlicher Vernunft.",
        features: [
          { id: "the-great-old-one-1", name: "Erweiterte Zauberliste", description: "2014-Unterklassenmerkmal: The Great Old One adds dissonant whispers and Tasha’s hideous laughter to the warlock spell options available to you at 1st level.", level: 1, kind: "passive" },
          { id: "the-great-old-one-2", name: "Erwachter Geist", description: "2014-Unterklassenmerkmal: You can communicate telepathically with a creature you can see within 30 feet if it understands at least one language.", level: 1, kind: "passive" },
        ],
      },
      {
        id: "the-undead",
        name: "Der Untote",
        description:
          "Eine Bindung an eine mächtige untote oder todlose Wesenheit.",
        features: [
          { id: "the-undead-1", name: "Erweiterte Zauberliste", description: "2014-Unterklassenmerkmal: The Undead adds bane and false life to the warlock spell options available to you at 1st level.", level: 1, kind: "passive" },
          { id: "the-undead-2", name: "Gestalt des Schreckens", description: "Als Bonusaktion verwandelst du dich 1 Minute: temporäre TP, Immunität gegen Verängstigt und einmal pro Zug kann ein Treffer Furcht auslösen. Anwendungen = Übungsbonus pro langer Rast.", level: 1, kind: "bonus-action", resource: { id: "undead-form-of-dread-uses", name: "Gestalt des Schreckens", amount: "proficiency-bonus", recharge: "long-rest" } },
        ],
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
      { id: "wizard-spellcasting", name: "Zauberwirken", description: "Du führst ein Zauberbuch, bereitest Magierzauber daraus vor und wirkst sie mit Intelligenz. Auf Stufe 1 enthält dein Zauberbuch sechs Zauber des 1. Grades.", level: 1, kind: "passive" },
      { id: "wizard-ritual-adept", name: "Ritualwirken", description: "Du kannst einen Magierzauber als Ritual wirken, wenn er das Ritualmerkmal besitzt und in deinem Zauberbuch steht; er muss dafür nicht vorbereitet sein.", level: 1, kind: "passive" },
      { id: "wizard-arcane-recovery", name: "Arkane Erholung", description: "Einmal pro Tag kannst du nach einer kurzen Rast verbrauchte Zauberplätze mit einer Gesamtsumme von höchstens der Hälfte deiner Magierstufe (aufgerundet) zurückerlangen; kein Platz darf Grad 6 oder höher sein.", level: 1, kind: "resource", resource: { id: "wizard-arcane-recovery-uses", name: "Arkane Erholung", amount: 1, recharge: "long-rest" } },
      { id: "wizard-arcane-tradition", name: "Arkane Tradition", description: "Auf Stufe 2 wählst du deine arkane Tradition und erhältst deren erste Merkmale.", level: 2, kind: "passive" },
    ],

    subclasses: [
      {
        id: "school-of-abjuration",
        name: "Schule der Bannmagie",
        description:
          "Eine Schule für Schutz, Gegenzauber und die Kontrolle magischer Gefahren.",
        features: [
          { id: "school-of-abjuration-1", name: "Bannmagie-Gelehrter", description: "2014-Unterklassenmerkmal: The gold and time needed to copy an abjuration spell into your spellbook are halved.", level: 2, kind: "passive" },
          { id: "school-of-abjuration-2", name: "Arkaner Schutz", description: "2014-Unterklassenmerkmal: When you cast an abjuration spell of 1st level or higher, create a ward with hit points equal to twice wizard level + Intelligence modifier; later abjuration spells restore ward hit points.", level: 2, kind: "passive" },
        ],
      },
      {
        id: "school-of-evocation",
        name: "Schule der Hervorrufung",
        description:
          "Eine Schule für direkte, zerstörerische und elementare Magie.",
        features: [
          { id: "school-of-evocation-1", name: "Hervorrufungs-Gelehrter", description: "2014-Unterklassenmerkmal: The gold and time needed to copy an evocation spell into your spellbook are halved.", level: 2, kind: "passive" },
          { id: "school-of-evocation-2", name: "Zauber formen", description: "2014-Unterklassenmerkmal: When you cast an evocation spell affecting creatures you can see, protect up to 1 + spell level of them from its worst effects.", level: 2, kind: "passive" },
        ],
      },
      {
        id: "school-of-necromancy",
        name: "Schule der Nekromantie",
        description:
          "Eine dunkle Schule über Tod, Lebensenergie und untote Wesen.",
        features: [
          { id: "school-of-necromancy-1", name: "Nekromantie-Gelehrter", description: "2014-Unterklassenmerkmal: The gold and time needed to copy a necromancy spell into your spellbook are halved.", level: 2, kind: "passive" },
          { id: "school-of-necromancy-2", name: "Düstere Ernte", description: "2014-Unterklassenmerkmal: Once per turn when you kill creatures with a spell of 1st level or higher, regain hit points equal to twice the spell’s level, or three times for necromancy spells; constructs and undead do not trigger it.", level: 2, kind: "passive" },
        ],
      },
      {
        id: "school-of-illusion",
        name: "Schule der Illusion",
        description:
          "Eine Schule für Täuschung, Sinnesbilder und die Manipulation von Wahrnehmung.",
        features: [
          { id: "school-of-illusion-1", name: "Illusions-Gelehrter", description: "2014-Unterklassenmerkmal: The gold and time needed to copy an illusion spell into your spellbook are halved.", level: 2, kind: "passive" },
          { id: "school-of-illusion-2", name: "Verbesserte Einfache Illusion", description: "2014-Unterklassenmerkmal: You learn minor illusion, or another wizard cantrip if you already know it. Your minor illusion can create both a sound and an image with one casting.", level: 2, kind: "passive" },
        ],
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

export function getSubclassUnlockLevel(
  classId: string,
  subclassId: string,
): number | undefined {
  const subclass = getSubclassById(classId, subclassId);
  const levels = (subclass?.features ?? [])
    .map((feature) => feature.level)
    .filter((level) => Number.isFinite(level) && level > 0);

  return levels.length > 0 ? Math.min(...levels) : undefined;
}

export function getClassSubclassUnlockLevel(
  classId: string,
): number | undefined {
  const levels = (getClassById(classId)?.subclasses ?? [])
    .map((subclass) => getSubclassUnlockLevel(classId, subclass.id))
    .filter((level): level is number => typeof level === "number");

  return levels.length > 0 ? Math.min(...levels) : undefined;
}

const abilityScoreImprovementDescription =
  "Auf Stufe 4 erhöhst du einen Attributswert um 2 oder zwei Attributswerte um je 1. Alternativ kann eure Runde ein Talent erlauben. Trage die Werte anschließend über „Bearbeiten“ in die Akte ein.";

const extraAttackDescription =
  "Wenn du in deinem Zug die Angriffsaktion ausführst, kannst du zweimal statt einmal angreifen.";

const coreLevelMilestoneFeatures: Record<string, ClassFeature[]> = {
  barbarian: [
    { id: "barbarian-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "barbarian-extra-attack", name: "Zusätzlicher Angriff", description: extraAttackDescription, level: 5, kind: "passive" },
    { id: "barbarian-fast-movement", name: "Schnelle Bewegung", description: "Deine Bewegungsrate erhöht sich um 3 m, solange du keine schwere Rüstung trägst.", level: 5, kind: "passive" },
  ],
  bard: [
    { id: "bard-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "bard-font-of-inspiration", name: "Quelle der Inspiration", description: "Du erhältst alle verbrauchten Bardischen Inspirationen zurück, wenn du eine kurze oder lange Rast beendest.", level: 5, kind: "passive" },
  ],
  cleric: [
    { id: "cleric-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "cleric-destroy-undead", name: "Untote zerstören", description: "Wenn ein Untoter mit Herausfordern der Untoten seinen Rettungswurf nicht schafft und seine HG niedrig genug ist, wird er zerstört statt vertrieben. Auf Stufe 5 gilt dies bis HG 1/2.", level: 5, kind: "passive" },
  ],
  druid: [
    { id: "druid-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "druid-wild-shape-swim", name: "Tiergestalt-Verbesserung", description: "Ab Stufe 4 kannst du Tiergestalt auch für Gestalten mit Schwimmbewegungsrate verwenden, solange die weiteren Grenzen deiner Tiergestalt eingehalten werden.", level: 4, kind: "passive" },
  ],
  fighter: [
    { id: "fighter-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "fighter-extra-attack", name: "Zusätzlicher Angriff", description: extraAttackDescription, level: 5, kind: "passive" },
  ],
  monk: [
    { id: "monk-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "monk-slow-fall", name: "Langsamer Fall", description: "Als Reaktion verringerst du Fallschaden um das Fünffache deiner Mönchsstufe.", level: 4, kind: "reaction" },
    { id: "monk-extra-attack", name: "Zusätzlicher Angriff", description: extraAttackDescription, level: 5, kind: "passive" },
    { id: "monk-stunning-strike", name: "Betäubender Schlag", description: "Wenn du eine Kreatur mit einem Nahkampfwaffenangriff triffst, kannst du 1 Ki-Punkt ausgeben. Misslingt ihr ein KO-Rettungswurf, ist sie bis zum Ende deines nächsten Zuges betäubt.", level: 5, kind: "passive" },
  ],
  paladin: [
    { id: "paladin-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "paladin-extra-attack", name: "Zusätzlicher Angriff", description: extraAttackDescription, level: 5, kind: "passive" },
  ],
  ranger: [
    { id: "ranger-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "ranger-extra-attack", name: "Zusätzlicher Angriff", description: extraAttackDescription, level: 5, kind: "passive" },
  ],
  "monster-hunter": [
    { id: "monster-hunter-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "monster-hunter-extra-attack", name: "Zusätzlicher Angriff", description: extraAttackDescription, level: 5, kind: "passive" },
  ],
  rogue: [
    { id: "rogue-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
    { id: "rogue-uncanny-dodge", name: "Unheimliches Ausweichen", description: "Wenn dich ein Angreifer trifft, den du sehen kannst, kannst du deine Reaktion verwenden, um den Schaden dieses Angriffs gegen dich zu halbieren.", level: 5, kind: "reaction" },
  ],
  sorcerer: [
    { id: "sorcerer-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
  ],
  warlock: [
    { id: "warlock-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
  ],
  wizard: [
    { id: "wizard-asi-4", name: "Attributswerterhöhung", description: abilityScoreImprovementDescription, level: 4, kind: "passive" },
  ],
};

export function getClassFeatures(
  classId: string,
  level: number,
): ClassFeature[] {
  return [
    ...(getClassById(classId)?.features?.filter(
      (feature) => feature.level <= level,
    ) ?? []),
    ...(coreLevelMilestoneFeatures[classId]?.filter(
      (feature) => feature.level <= level,
    ) ?? []),
  ];
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

  if (typeof amount === "object") {
    if (amount.kind === "class-level-multiplier") {
      return Math.max(1, classLevel * amount.multiplier);
    }

    const levels = Object.keys(amount.values)
      .map(Number)
      .filter((level) => Number.isFinite(level) && level <= classLevel)
      .sort((a, b) => b - a);

    return levels.length > 0
      ? Math.max(1, amount.values[levels[0]] ?? 1)
      : 1;
  }

  switch (amount) {
    case "class-level":
      return Math.max(1, classLevel);

    case "proficiency-bonus":
      return Math.max(1, proficiencyBonus);

    case "ability-modifier":
      return Math.max(1, abilityModifier);

    case "ability-modifier-plus-one":
      return Math.max(1, abilityModifier + 1);
  }
}
