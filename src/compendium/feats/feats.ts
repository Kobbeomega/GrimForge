import type { AbilityId } from "../core";

export type FeatChoiceKind = "ability";

export interface FeatChoiceDefinition {
  id: string;
  kind: FeatChoiceKind;
  name: string;
  choose: number;
  options: AbilityId[];
}

export interface FeatDefinition {
  id: string;
  name: string;
  description: string;
  abilityIncreases?: Partial<Record<AbilityId, number>>;
  abilityChoice?: FeatChoiceDefinition;
  grantsSavingThrowProficiency?: "chosen-ability";
  bonuses?: {
    initiative?: number;
    passivePerception?: number;
    passiveInvestigation?: number;
    speed?: number;
    hitPointsPerLevel?: number;
  };
}

export type CharacterFeatChoices = Record<string, Record<string, string[]>>;

export const feats: FeatDefinition[] = [
  {
    id: "alert",
    name: "Wachsam",
    description: "+5 auf Initiative. Du kannst nicht überrascht werden, solange du bei Bewusstsein bist; versteckte Angreifer erhalten durch ihre Verborgenheit keinen Vorteil gegen dich.",
    bonuses: { initiative: 5 },
  },
  {
    id: "tough",
    name: "Zäh",
    description: "Dein Trefferpunktemaximum steigt um 2 pro Charakterstufe.",
    bonuses: { hitPointsPerLevel: 2 },
  },
  {
    id: "mobile",
    name: "Beweglich",
    description: "+3 m Bewegungsrate. Wenn du eine Kreatur im Nahkampf angreifst, provozierst du für den Rest des Zuges keine Gelegenheitsangriffe von ihr.",
    bonuses: { speed: 3 },
  },
  {
    id: "observant",
    name: "Aufmerksam",
    description: "+1 auf Intelligenz oder Weisheit, maximal 20. Außerdem +5 auf passive Wahrnehmung und passive Nachforschungen.",
    abilityChoice: { id: "observant-ability", kind: "ability", name: "Attribut", choose: 1, options: ["intelligence", "wisdom"] },
    bonuses: { passivePerception: 5, passiveInvestigation: 5 },
  },
  {
    id: "resilient",
    name: "Widerstandsfähig",
    description: "+1 auf ein Attribut, maximal 20. Du erhältst Übung in Rettungswürfen mit diesem Attribut.",
    abilityChoice: { id: "resilient-ability", kind: "ability", name: "Attribut", choose: 1, options: ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"] },
    grantsSavingThrowProficiency: "chosen-ability",
  },
  {
    id: "war-caster",
    name: "Kriegszauberer",
    description: "Vorteil auf KO-Rettungswürfe zum Aufrechterhalten von Konzentration. Du kannst somatische Komponenten auch mit Waffen oder Schild in den Händen ausführen und unter passenden Umständen einen Zauber als Gelegenheitsangriff wirken.",
  },
  {
    id: "great-weapon-master",
    name: "Meister großer Waffen",
    description: "Nach einem kritischen Treffer oder wenn du ein Ziel auf 0 TP bringst, kannst du als Bonusaktion erneut angreifen. Vor einem Angriff mit schwerer Waffe kannst du -5 auf den Angriff nehmen, um bei Treffer +10 Schaden zu verursachen.",
  },
  {
    id: "sharpshooter",
    name: "Scharfschütze",
    description: "Fernkampfangriffe ignorieren lange Reichweite und die meisten Deckungsboni. Vor einem Angriff mit Fernkampfwaffe kannst du -5 auf den Angriff nehmen, um bei Treffer +10 Schaden zu verursachen.",
  },
  {
    id: "dual-wielder",
    name: "Kampf mit zwei Waffen",
    description: "+1 RK, solange du in jeder Hand eine Nahkampfwaffe führst. Du kannst Zwei-Waffen-Kampf auch mit einhändigen Nahkampfwaffen ohne die leichte Eigenschaft verwenden und zwei Waffen gleichzeitig ziehen oder verstauen.",
  },
];

export function getFeatById(featId: string): FeatDefinition | undefined {
  return feats.find((feat) => feat.id === featId);
}

export function getFeatAbilityChoices(feat: FeatDefinition | undefined, choices: CharacterFeatChoices | undefined): AbilityId[] {
  if (!feat?.abilityChoice) return [];
  const raw = choices?.[feat.id]?.[feat.abilityChoice.id] ?? [];
  return raw.filter((value): value is AbilityId => feat.abilityChoice!.options.includes(value as AbilityId));
}
