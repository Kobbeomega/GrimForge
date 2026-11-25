import { getProficiencyBonus, formatAbilityModifier } from "../../../compendium/core";
import type { CharacterArchiveEntry } from "../../archives/types";

type Attack = readonly [name: string, attack: number, dice: string, modifier: number, type: string, note?: string];
type Beast = {
  name: string; armor: number; hp: number; speed: string;
  abilities: [number, number, number, number, number, number];
  perception?: number; stealth?: number; passive: number; senses?: string;
  attacks: Attack[]; traits: string;
};

// Baseline values: 2014 Basic Rules creature stat blocks. Distances use the book's grid conversion.
const beasts: Record<string, Beast> = {
  wolf: { name: "Wolf", armor: 13, hp: 11, speed: "12 m", abilities: [12, 15, 12, 3, 12, 6], perception: 3, stealth: 4, passive: 13, attacks: [["Biss", 4, "2W4", 2, "Stich", "ST-SG 11, sonst liegend."]], traits: "Rudeltaktik; Vorteil auf Wahrnehmung mit Gehör oder Geruch." },
  panther: { name: "Panther", armor: 12, hp: 13, speed: "15 m · Klettern 12 m", abilities: [14, 15, 10, 3, 14, 7], perception: 4, stealth: 6, passive: 14, attacks: [["Biss", 4, "1W6", 2, "Stich"], ["Klaue", 4, "1W4", 2, "Hieb", "Nach 6 m geradem Anlauf: ST-SG 12 gegen Umwerfen; gegen das dadurch liegende Ziel ist ein Bonusaktionsbiss möglich."]], traits: "Vorteil auf Wahrnehmung mit Geruch." },
  mastiff: { name: "Mastiff", armor: 12, hp: 5, speed: "12 m", abilities: [13, 14, 12, 3, 12, 7], perception: 3, passive: 13, attacks: [["Biss", 3, "1W6", 1, "Stich", "ST-SG 11, sonst liegend."]], traits: "Vorteil auf Wahrnehmung mit Gehör oder Geruch." },
  "giant-badger": { name: "Riesendachs", armor: 10, hp: 13, speed: "9 m · Graben 3 m", abilities: [13, 10, 15, 2, 12, 5], passive: 11, senses: "Dunkelsicht 9 m", attacks: [["Biss", 3, "1W6", 1, "Stich"], ["Klauen", 3, "2W4", 1, "Hieb"]], traits: "Vorteil auf Wahrnehmung mit Geruch; Mehrfachangriff aus Biss und Klauen." },
  "giant-frog": { name: "Riesenfrosch", armor: 11, hp: 18, speed: "9 m · Schwimmen 9 m", abilities: [12, 13, 11, 2, 10, 3], perception: 2, stealth: 3, passive: 12, senses: "Dunkelsicht 9 m", attacks: [["Biss", 3, "1W6", 1, "Stich", "Gepackt (Entkommen SG 11) und festgesetzt; kein gewöhnlicher Biss, solange der Griff hält."], ["Verschlucken", 3, "1W6", 1, "Stich", "Biss gegen ein bereits gepacktes kleines oder kleineres Ziel. Verschluckt: blind und festgesetzt, volle Deckung gegen außen, 2W4 Säure zu Beginn jedes Zugs des Frosches; maximal ein Ziel."]], traits: "Amphibisch; aus dem Stand bis 6 m weit oder 3 m hoch springen." },
  "giant-poisonous-snake": { name: "Riesengiftschlange", armor: 14, hp: 11, speed: "9 m · Schwimmen 9 m", abilities: [10, 18, 13, 2, 10, 3], perception: 2, passive: 12, senses: "Blindsicht 3 m", attacks: [["Biss", 6, "1W4", 4, "Stich", "Reichweite 3 m; zusätzlich 3W6 Gift, KO-SG 11 halbiert den Giftschaden."]], traits: "" },
  pteranodon: { name: "Pteranodon", armor: 13, hp: 13, speed: "3 m · Fliegen 18 m", abilities: [12, 15, 10, 2, 9, 5], perception: 1, passive: 11, attacks: [["Biss", 3, "2W4", 1, "Stich"]], traits: "Provoziert beim Wegfliegen keine Gelegenheitsangriffe." },
};

export function getBeastCompanion(character: CharacterArchiveEntry) {
  if (character.classId !== "ranger" || character.subclassId !== "beast-master" || character.level < 3) return;
  const selected = character.pathChoices?.["beast-master-companion"];
  const id = Array.isArray(selected) ? selected[0] : selected;
  if (!id || !Object.hasOwn(beasts, id)) return;
  const beast = beasts[id];
  const bonus = getProficiencyBonus(character.level);
  return {
    ...beast,
    armor: beast.armor + bonus,
    hp: Math.max(beast.hp, 4 * character.level),
    passive: beast.passive + (beast.perception === undefined ? 0 : bonus),
    perception: beast.perception === undefined ? undefined : formatAbilityModifier(beast.perception + bonus),
    stealth: beast.stealth === undefined ? undefined : formatAbilityModifier(beast.stealth + bonus),
    attacks: beast.attacks.map(([name, attack, dice, modifier, type, note]) => ({
      name, attack: formatAbilityModifier(attack + bonus), damage: `${dice} ${formatAbilityModifier(modifier + bonus)} ${type}`, note,
    })),
  };
}
