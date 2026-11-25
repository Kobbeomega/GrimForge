import type { AbilityId } from "../core";
import type { SpellDamageType, SpellDefinition } from "./types";

const damageTypes = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"] as const;
const damagePattern = new RegExp(`\\b(\\d+)d(\\d+) (${damageTypes.join("|")}) damage\\b`, "gi");
const abilityPattern = /\b(strength|dexterity|constitution|intelligence|wisdom|charisma) saving throw\b/gi;

type SpellMechanics = Pick<SpellDefinition, "damage" | "healing" | "attackRoll" | "savingThrowAbility" | "scaling" | "numberOfAttacks" | "damageNote" | "savingThrowNote">;
type SpellOverride = Partial<SpellMechanics & Pick<SpellDefinition, "description" | "higherLevels" | "rulesText">>;

const standardCantripScaling = (die: number) => [5, 11, 17].map((characterLevel, index) => ({
  characterLevel, dice: { dice: index + 2, die },
}));

// Text imports occasionally attach the heading and body of the next spell.
export function cleanSpellRule(value: string): string {
  const text = value.replace(/\s+/g, " ").trim().replace(/(?:\s+At Higher Levels\.?|\s+At Higher Levels\s*\.)$/i, "");
  const embeddedHeader = /\s+(?:\d+\s*(?:st|nd|rd|th)\s*-\s*level\s+(?:abjuration|conjuration|divination|enchantment|evocation|illusion|necromancy|transmutation)|(?:abjuration|conjuration|divination|enchantment|evocation|illusion|necromancy|transmutation)\s+cantrip)\s+C\s*asting\s+T\s*ime\s*:/i;
  const match = embeddedHeader.exec(text);
  if (!match) return text;
  const boundary = text.lastIndexOf(". ", match.index);
  return boundary >= 0 ? text.slice(0, boundary + 1) : "";
}

export function readExplicitSpellMechanics(text: string, higherLevels: string, level: number): SpellMechanics {
  const saves = [...new Set([...text.matchAll(abilityPattern)].map((match) => match[1].toLowerCase() as AbilityId))];
  const hits = [...text.matchAll(damagePattern)];
  const distinctDamage = new Set(hits.map((hit) => hit[0].toLowerCase()));
  const singleDamage = distinctDamage.size === 1 ? hits[0] : undefined;
  const attackRoll = /\b(?:melee|ranged) spell attack\b/i.test(text);
  const healingMatch = /\bregains? (?:a number of )?hit points (?:equal to |of )?(\d+)d(\d+)(\s*\+\s*your spellcasting ability modifier)?/i.exec(text)
    ?? /\bregains? (\d+)d(\d+)(\s*\+\s*your spellcasting ability modifier)? hit points\b/i.exec(text);
  // "An extra 1d6" describes a rider, not the entire damage of the spell.
  const damage = singleDamage && !/\b(?:extra|additional)\s+\d+d\d+\s+\w+\s+damage\b/i.test(text)
    ? { dice: { dice: Number(singleDamage[1]), die: Number(singleDamage[2]) }, damageType: singleDamage[3].toLowerCase() as SpellDamageType }
    : undefined;
  const cantripScaling = level === 0 && damage && /damage increases by/i.test(higherLevels)
    ? [...higherLevels.matchAll(/(5|11|17)(?:th) level \((\d+)d(\d+)\)/gi)].map((match) => ({
      characterLevel: Number(match[1]), dice: { dice: Number(match[2]), die: Number(match[3]) },
    }))
    : [];
  return {
    damage,
    attackRoll,
    savingThrowAbility: saves.length === 1 ? saves[0] : undefined,
    savingThrowNote: /half as much damage on a success/i.test(text)
      ? "Halber Schaden bei Erfolg." : undefined,
    healing: healingMatch ? {
      dice: { dice: Number(healingMatch[1]), die: Number(healingMatch[2]) }, addsCastingModifier: Boolean(healingMatch[3]),
    } : undefined,
    scaling: cantripScaling.length ? cantripScaling : undefined,
  };
}

export const spellOverrides: Record<string, SpellOverride> = {
  "hold-person": {
    description: "Ein sichtbarer Humanoider wird bei misslungenem Weisheitsrettungswurf gelähmt. Am Ende jedes eigenen Zuges wiederholt er den Rettungswurf und beendet den Effekt bei Erfolg.",
    savingThrowAbility: "wisdom",
    savingThrowNote: "Bei Erfolg endet der Effekt für das Ziel.",
    higherLevels: "Pro Zauberplatzgrad über 2 ist ein zusätzlicher Humanoider möglich. Die Ziele müssen beim Wirken innerhalb von 9 m voneinander sein.",
  },
  fireball: {
    description: "Alle Kreaturen in einer Kugel mit 6 m Radius erleiden 8W6 Feuerschaden oder bei erfolgreichem Geschicklichkeitsrettungswurf die Hälfte. Die Flammen greifen um Ecken und entzünden brennbare Gegenstände, die niemand trägt.",
    damage: { dice: { dice: 8, die: 6 }, damageType: "fire", savingThrowAbility: "dexterity", halfDamageOnSave: true },
    higherLevels: "+1W6 Feuerschaden pro Zauberplatzgrad über 3.",
  },
  "eldritch-blast": {
    description: "Führe für jeden Strahl einen eigenen Fernkampf-Zauberangriff aus. Jeder Treffer verursacht 1W10 Energieschaden.",
    damage: { dice: { dice: 1, die: 10 }, damageType: "force" },
    attackRoll: true,
    scaling: undefined,
    numberOfAttacks: (level) => level >= 17 ? 4 : level >= 11 ? 3 : level >= 5 ? 2 : 1,
    damageNote: "pro Strahl",
    higherLevels: "Auf Charakterstufe 5, 11 und 17 steigt die Zahl der Strahlen auf 2, 3 beziehungsweise 4.",
  },
  augury: {
    description: "Für ein Vorhaben innerhalb der nächsten 30 Minuten nennt die Spielleitung ein günstiges, ungünstiges, gemischtes oder neutrales Omen. Spätere Änderungen sind nicht berücksichtigt. Vor der nächsten langen Rast steigt mit jedem weiteren Wirken die Chance auf ein zufälliges Ergebnis um 25 Prozentpunkte.",
  },
  prestidigitation: {
    description: "Wähle einen kleinen magischen Effekt: harmloser Sinneseindruck; kleine Flamme entzünden oder löschen; einen Gegenstand bis etwa 28 Liter reinigen oder verschmutzen; ebensoviel unbelebtes Material eine Stunde wärmen, kühlen oder würzen; Farbe oder Zeichen eine Stunde anbringen; oder bis zum Ende deines nächsten Zuges eine handgroße Illusion bzw. einen kleinen nichtmagischen Gegenstand erschaffen. Bis zu drei nicht sofortige Effekte zugleich; als Aktion beendbar.",
  },
  "hunter-s-mark": {
    description: "Markiere ein sichtbares Ziel: Deine Waffentreffer verursachen gegen dieses Ziel zusätzlich 1W6 Schaden. Du hast Vorteil auf Wahrnehmung und Überleben, um es zu finden. Sinkt es auf 0 TP, kannst du in einem späteren eigenen Zug die Marke als Bonusaktion übertragen.",
  },
  "chromatic-orb": {
    damage: { dice: { dice: 3, die: 8 }, damageType: "acid", selectableTypes: ["acid","cold","fire","lightning","poison","thunder"] },
    attackRoll: true, higherLevels: "+1W8 pro Platzgrad über 1.",
    description: "Fernkampf-Zauberangriff gegen ein Ziel. Wähle für den Treffer Säure, Kälte, Feuer, Blitz, Gift oder Schall.",
  },
  "scorching-ray": {
    description: "Drei Feuerstrahlen. Führe für jeden Strahl einen eigenen Fernkampf-Zauberangriff aus. Jeder Treffer verursacht 2W6 Feuerschaden.",
    damage: { dice: { dice: 2, die: 6 }, damageType: "fire" },
    attackRoll: true,
    numberOfAttacks: () => 3,
    damageNote: "pro Strahl",
    higherLevels: "+1 Strahl pro Zauberplatzgrad über 2.",
  },
  "heat-metal": {
    description: "Eine Kreatur in Kontakt mit dem erhitzten Metall nimmt 2W8 Feuerschaden. Beim Halten oder Tragen kann ein Konstitutionsrettungswurf entscheiden, ob sie den Gegenstand fallen lassen muss.",
    damage: { dice: { dice: 2, die: 8 }, damageType: "fire" },
    attackRoll: false,
    savingThrowAbility: "constitution",
    savingThrowNote: "Der Rettungswurf betrifft das Fallenlassen. Der Feuerschaden bleibt bestehen.",
    higherLevels: "+1W8 Feuerschaden pro Zauberplatzgrad über 2.",
  },
  sleep: {
    description: "Würfle 5W8 als Trefferpunktebudget. Kreaturen im Wirkungsbereich werden beginnend mit den niedrigsten aktuellen TP in den Schlaf versetzt, solange das Budget reicht.",
    higherLevels: "+2W8 zum Trefferpunktebudget pro Zauberplatzgrad über 1.",
  },
  "magic-missile": {
    damage: { dice: { dice:1, die:4 }, flatModifier:1, damageType:"force" },
    attackRoll: false,
    damageNote: "pro Geschoss · 3 Geschosse beim Wirken auf Grad 1",
    higherLevels: "+1 Geschoss pro Zauberplatzgrad über 1.",
  },
  "shocking-grasp": {
    description: "Nahkampf-Zauberangriff mit Vorteil gegen Ziele in Metallrüstung. Bei einem Treffer erleidet das Ziel Blitzschaden und kann bis zum Beginn seines nächsten Zuges keine Reaktionen einsetzen.",
    damage: { dice: { dice: 1, die: 8 }, damageType: "lightning" },
    attackRoll: true,
    scaling: standardCantripScaling(8),
    higherLevels: "Der Schaden steigt auf Charakterstufe 5, 11 und 17 auf 2W8, 3W8 beziehungsweise 4W8.",
  },
  "produce-flame": {
    attackRoll: true,
    damageNote: "beim Werfen der Flamme",
  },
  "spiritual-weapon": {
    damage: { dice: { dice: 1, die: 8 }, damageType: "force", addsCastingModifier: true },
    attackRoll: true,
    description: "Die schwebende Waffe greift mit einem Nahkampf-Zauberangriff an. Bei einem Treffer verursacht sie 1W8 plus Zauberattributsmodifikator Energieschaden. In späteren Zügen kannst du sie mit einer Bonusaktion bewegen und erneut angreifen lassen.",
    higherLevels: "+1W8 für je zwei Zauberplatzgrade über 2.",
  },
  moonbeam: {
    damage: { dice: { dice: 2, die: 10 }, damageType: "radiant", savingThrowAbility: "constitution", halfDamageOnSave: true },
    damageNote: "beim ersten Eintritt pro Zug oder bei Zugbeginn im Licht",
    higherLevels: "+1W10 Strahlenschaden pro Zauberplatzgrad über 2.",
  },
  "spirit-guardians": {
    description: "Die beschworenen Geister verursachen 3W8 Strahlen- oder nekrotischen Schaden, wenn eine betroffene Kreatur den Bereich in einem Zug erstmals betritt oder ihren Zug darin beginnt.",
    damageNote: "Schadensart je nach Gesinnung",
    damage: { dice: { dice: 3, die: 8 }, damageType: "radiant", alternativeDamageType: "necrotic", savingThrowAbility: "wisdom", halfDamageOnSave: true },
    higherLevels: "+1W8 pro Zauberplatzgrad über 3.",
  },
  "ray-of-sickness": {
    attackRoll: true,
    savingThrowAbility: "constitution",
    savingThrowNote: "Der Rettungswurf entscheidet über den Zustand Vergiftet. Der Trefferschaden bleibt bestehen.",
  },
};
