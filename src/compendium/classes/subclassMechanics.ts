import type { AbilityId } from "../core";
import type { SpellSchool } from "../spells";
import type { CharacterPathChoices } from "./characterChoices";

export interface SubclassSpellcastingProfile {
  classId: string;
  subclassId: string;
  sourceClassId: string;
  abilityId: AbilityId;
  startsAtLevel: number;
  cantripsKnown: Record<number, number>;
  spellsKnown: Record<number, number>;
  restrictedSchools?: SpellSchool[];
  restrictedSpellCount?: number;
  forcedCantripIds?: string[];
}

export interface SubclassSpellPackage {
  classId: string;
  subclassId: string;
  /** Immer bekannt/vorbereitet; zählt nicht gegen normale Grenzen. */
  grantedByLevel?: Record<number, string[]>;
  /** Zusätzliche Zauberoptionen, aber nicht automatisch bekannt. */
  expandedByLevel?: Record<number, string[]>;
  /** Zusätzliche frei wählbare Zaubertricks, die gegen keine Basisgrenze zählen. */
  bonusSelectableCantripsByLevel?: Record<number, number>;
}

export interface SubclassProficiencyPackage {
  classId: string;
  subclassId: string;
  armor?: string[];
  weapons?: string[];
  tools?: string[];
  languages?: string[];
}

export const subclassSpellcastingProfiles: SubclassSpellcastingProfile[] = [
  {
    classId: "fighter",
    subclassId: "eldritch-knight",
    sourceClassId: "wizard",
    abilityId: "intelligence",
    startsAtLevel: 3,
    cantripsKnown: { 3: 2 },
    spellsKnown: { 3: 3 },
    restrictedSchools: ["abjuration", "evocation"],
    restrictedSpellCount: 2,
  },
  {
    classId: "rogue",
    subclassId: "arcane-trickster",
    sourceClassId: "wizard",
    abilityId: "intelligence",
    startsAtLevel: 3,
    cantripsKnown: { 3: 3 },
    spellsKnown: { 3: 3 },
    restrictedSchools: ["enchantment", "illusion"],
    restrictedSpellCount: 2,
    forcedCantripIds: ["mage-hand"],
  },
];

export const subclassSpellPackages: SubclassSpellPackage[] = [
  // Cleric domains: domain spells are always prepared and do not count.
  { classId: "cleric", subclassId: "life-domain", grantedByLevel: { 1: ["bless", "cure-wounds"], 3: ["lesser-restoration", "spiritual-weapon"] } },
  { classId: "cleric", subclassId: "light-domain", grantedByLevel: { 1: ["burning-hands", "faerie-fire", "light"], 3: ["flaming-sphere", "scorching-ray"] } },
  { classId: "cleric", subclassId: "war-domain", grantedByLevel: { 1: ["divine-favor", "shield-of-faith"], 3: ["magic-weapon", "spiritual-weapon"] } },
  { classId: "cleric", subclassId: "grave-domain", grantedByLevel: { 1: ["bane", "false-life", "spare-the-dying"], 3: ["gentle-repose", "ray-of-enfeeblement"] } },

  // Druid circles.
  { classId: "druid", subclassId: "circle-of-the-land", bonusSelectableCantripsByLevel: { 2: 1 } },
  { classId: "druid", subclassId: "circle-of-spores", grantedByLevel: { 2: ["chill-touch"], 3: ["blindness-deafness", "gentle-repose"] } },

  // Paladin oath spells begin at paladin level 3 and are always prepared.
  { classId: "paladin", subclassId: "oath-of-devotion", grantedByLevel: { 3: ["protection-from-evil-and-good", "sanctuary"] } },
  { classId: "paladin", subclassId: "oath-of-vengeance", grantedByLevel: { 3: ["bane", "hunters-mark"] } },
  { classId: "paladin", subclassId: "oath-of-the-ancients", grantedByLevel: { 3: ["ensnaring-strike", "speak-with-animals"] } },
  { classId: "paladin", subclassId: "oath-of-the-crown", grantedByLevel: { 3: ["command", "compelled-duel"] } },

  // Ranger subclass spells.
  { classId: "ranger", subclassId: "gloom-stalker", grantedByLevel: { 3: ["disguise-self"] } },

  // Sorcerer bonus spell.
  { classId: "sorcerer", subclassId: "shadow-magic", grantedByLevel: { 3: ["darkness"] } },

  // Warlock patron expanded lists are options, not free known spells.
  { classId: "warlock", subclassId: "the-fiend", expandedByLevel: { 1: ["burning-hands", "command"] } },
  { classId: "warlock", subclassId: "the-archfey", expandedByLevel: { 1: ["faerie-fire", "sleep"] } },
  { classId: "warlock", subclassId: "the-great-old-one", expandedByLevel: { 1: ["dissonant-whispers", "tasha-s-hideous-laughter"] } },
  { classId: "warlock", subclassId: "the-undead", expandedByLevel: { 1: ["bane", "false-life"] } },
];

export const subclassProficiencyPackages: SubclassProficiencyPackage[] = [
  { classId: "bard", subclassId: "college-of-valor", armor: ["Mittlere Rüstung", "Schilde"], weapons: ["Kriegswaffen"] },
  { classId: "cleric", subclassId: "life-domain", armor: ["Schwere Rüstung"] },
  { classId: "cleric", subclassId: "war-domain", armor: ["Schwere Rüstung"], weapons: ["Kriegswaffen"] },
  { classId: "rogue", subclassId: "assassin", tools: ["Verkleidungsausrüstung", "Giftmischerausrüstung"] },
];

export function getSubclassSpellcastingProfile(classId: string, subclassId?: string) {
  return subclassSpellcastingProfiles.find((entry) => entry.classId === classId && entry.subclassId === subclassId);
}

export function getSubclassSpellPackage(classId: string, subclassId?: string) {
  return subclassSpellPackages.find((entry) => entry.classId === classId && entry.subclassId === subclassId);
}

export function getSubclassProficiencyPackage(classId: string, subclassId?: string) {
  return subclassProficiencyPackages.find((entry) => entry.classId === classId && entry.subclassId === subclassId);
}

function collectByLevel(table: Record<number, string[]> | undefined, level: number): string[] {
  if (!table) return [];
  return Object.entries(table)
    .filter(([requiredLevel]) => Number(requiredLevel) <= level)
    .flatMap(([, spellIds]) => spellIds);
}

function latestNumericValue(table: Record<number, number> | undefined, level: number): number {
  if (!table) return 0;
  return Object.entries(table)
    .filter(([requiredLevel]) => Number(requiredLevel) <= level)
    .sort(([a], [b]) => Number(b) - Number(a))[0]?.[1] ?? 0;
}

export function getGrantedSubclassSpellIds({
  classId,
  subclassId,
  level,
  pathChoices,
}: {
  classId: string;
  subclassId?: string;
  level: number;
  pathChoices?: CharacterPathChoices;
}): string[] {
  const spellPackage = getSubclassSpellPackage(classId, subclassId);
  const fixed = collectByLevel(spellPackage?.grantedByLevel, level);

  if (classId === "druid" && subclassId === "circle-of-the-land" && level >= 3) {
    const land = pathChoices?.["circle-land"];
    const selectedLand = Array.isArray(land) ? land[0] : land;
    const landSpells: Record<string, string[]> = {
      arctic: ["hold-person", "spike-growth"],
      coast: ["mirror-image", "misty-step"],
      desert: ["blur", "silence"],
      forest: ["barkskin", "spider-climb"],
      grassland: ["invisibility", "pass-without-trace"],
      mountain: ["spider-climb", "spike-growth"],
      swamp: ["darkness", "melf-s-acid-arrow"],
      underdark: ["spider-climb", "web"],
    };
    return [...new Set([...fixed, ...(selectedLand ? landSpells[selectedLand] ?? [] : [])])];
  }

  return [...new Set(fixed)];
}

export function getExpandedSubclassSpellIds(classId: string, subclassId: string | undefined, level: number): string[] {
  return [...new Set(collectByLevel(getSubclassSpellPackage(classId, subclassId)?.expandedByLevel, level))];
}

export function getBonusSelectableSubclassCantrips(classId: string, subclassId: string | undefined, level: number): number {
  return latestNumericValue(getSubclassSpellPackage(classId, subclassId)?.bonusSelectableCantripsByLevel, level);
}
