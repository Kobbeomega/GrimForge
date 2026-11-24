import type { AbilityId } from "../core";
import type { SpellSchool, SpellSlots } from "../spells";
import type { SkillId } from "../skills";
import type { CharacterPathChoices } from "./characterChoices";
import { skills } from "../skills";
import { getSubclassUnlockLevel } from "./classes";

export interface SubclassSpellcastingProfile {
  classId: string;
  subclassId: string;
  sourceClassId: string;
  abilityId: AbilityId;
  startsAtLevel: number;
  cantripsKnown: Record<number, number>;
  spellsKnown: Record<number, number>;
  restrictedSchools?: SpellSchool[];
  unrestrictedSpellCount?: number;
  forcedCantripIds?: string[];
  canReplaceCantrip?: boolean;
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
  skills?: SkillId[];
}

export const subclassSpellcastingProfiles: SubclassSpellcastingProfile[] = [
  {
    classId: "monster-hunter", subclassId: "monster-hunter-occultist-guild", sourceClassId: "wizard",
    abilityId: "intelligence", startsAtLevel: 3,
    cantripsKnown: { 3: 2, 10: 3 }, spellsKnown: { 3: 3, 4: 4, 7: 5, 8: 6, 10: 7, 11: 8, 13: 9, 14: 10, 16: 11, 19: 12, 20: 13 },
    canReplaceCantrip: true,
  },
  {
    classId: "fighter",
    subclassId: "eldritch-knight",
    sourceClassId: "wizard",
    abilityId: "intelligence",
    startsAtLevel: 3,
    cantripsKnown: { 3: 2 },
    spellsKnown: { 3: 3, 4: 4 },
    restrictedSchools: ["abjuration", "evocation"],
    unrestrictedSpellCount: 1,
  },
  {
    classId: "rogue",
    subclassId: "arcane-trickster",
    sourceClassId: "wizard",
    abilityId: "intelligence",
    startsAtLevel: 3,
    cantripsKnown: { 3: 3 },
    spellsKnown: { 3: 3, 4: 4 },
    restrictedSchools: ["enchantment", "illusion"],
    unrestrictedSpellCount: 1,
    forcedCantripIds: ["mage-hand"],
  },
];

export function getThirdCasterSlots(level: number): SpellSlots {
  if (level < 3) return {};
  if (level < 7) return { 1: level === 3 ? 2 : 3 };
  if (level < 10) return { 1: 4, 2: 2 };
  if (level < 13) return { 1: 4, 2: 3 };
  if (level < 16) return { 1: 4, 2: 3, 3: 2 };
  if (level < 19) return { 1: 4, 2: 3, 3: 3 };
  return { 1: 4, 2: 3, 3: 3, 4: 1 };
}

export const subclassSpellPackages: SubclassSpellPackage[] = [
  // Cleric domains: domain spells are always prepared and do not count.
  { classId: "cleric", subclassId: "life-domain", grantedByLevel: { 1: ["bless", "cure-wounds"], 3: ["lesser-restoration", "spiritual-weapon"], 5: ["beacon-of-hope", "revivify"] } },
  { classId: "cleric", subclassId: "light-domain", grantedByLevel: { 1: ["burning-hands", "faerie-fire", "light"], 3: ["flaming-sphere", "scorching-ray"], 5: ["daylight", "fireball"] } },
  { classId: "cleric", subclassId: "war-domain", grantedByLevel: { 1: ["divine-favor", "shield-of-faith"], 3: ["magic-weapon", "spiritual-weapon"], 5: ["crusader-s-mantle", "spirit-guardians"] } },
  { classId: "cleric", subclassId: "grave-domain", grantedByLevel: { 1: ["bane", "false-life", "spare-the-dying"], 3: ["gentle-repose", "ray-of-enfeeblement"], 5: ["revivify", "vampiric-touch"] } },

  // Druid circles.
  { classId: "druid", subclassId: "circle-of-the-land", bonusSelectableCantripsByLevel: { 2: 1 } },
  { classId: "druid", subclassId: "circle-of-spores", grantedByLevel: { 2: ["chill-touch"], 3: ["blindness-deafness", "gentle-repose"], 5: ["animate-dead", "gaseous-form"] } },

  // Paladin oath spells begin at paladin level 3 and are always prepared.
  { classId: "paladin", subclassId: "oath-of-devotion", grantedByLevel: { 3: ["protection-from-evil-and-good", "sanctuary"], 5: ["lesser-restoration", "zone-of-truth"] } },
  { classId: "paladin", subclassId: "oath-of-vengeance", grantedByLevel: { 3: ["bane", "hunter-s-mark"], 5: ["hold-person", "misty-step"] } },
  { classId: "paladin", subclassId: "oath-of-the-ancients", grantedByLevel: { 3: ["ensnaring-strike", "speak-with-animals"], 5: ["misty-step", "moonbeam"] } },
  { classId: "paladin", subclassId: "oath-of-the-crown", grantedByLevel: { 3: ["command", "compelled-duel"], 5: ["warding-bond", "zone-of-truth"] } },

  // Ranger subclass spells.
  { classId: "ranger", subclassId: "gloom-stalker", grantedByLevel: { 3: ["disguise-self"], 5: ["rope-trick"] } },
  { classId: "barbarian", subclassId: "totem-warrior", grantedByLevel: { 3: ["beast-sense", "speak-with-animals"] } },
  { classId: "wizard", subclassId: "school-of-illusion", grantedByLevel: { 2: ["minor-illusion"] } },
  { classId: "monk", subclassId: "way-of-shadow", grantedByLevel: { 3: ["minor-illusion", "darkness", "darkvision", "pass-without-trace", "silence"] } },

  // Sorcerer bonus spell.
  { classId: "sorcerer", subclassId: "shadow-magic", grantedByLevel: { 3: ["darkness"] } },

  // Warlock patron expanded lists are options, not free known spells.
  { classId: "warlock", subclassId: "the-fiend", expandedByLevel: { 1: ["burning-hands", "command"], 3: ["blindness-deafness", "scorching-ray"], 5: ["fireball", "stinking-cloud"] } },
  { classId: "warlock", subclassId: "the-archfey", expandedByLevel: { 1: ["faerie-fire", "sleep"], 3: ["calm-emotions", "phantasmal-force"], 5: ["blink", "plant-growth"] } },
  { classId: "warlock", subclassId: "the-great-old-one", expandedByLevel: { 1: ["dissonant-whispers", "tasha-s-hideous-laughter"], 3: ["detect-thoughts", "phantasmal-force"], 5: ["clairvoyance", "sending"] } },
  { classId: "warlock", subclassId: "the-undead", expandedByLevel: { 1: ["bane", "false-life"], 3: ["blindness-deafness", "phantasmal-force"], 5: ["phantom-steed", "speak-with-dead"] } },
];

export const subclassProficiencyPackages: SubclassProficiencyPackage[] = [
  { classId: "monster-hunter", subclassId: "monster-hunter-carver-guild", armor: ["Schwere Rüstung"] },
  { classId: "monster-hunter", subclassId: "monster-hunter-devourer-guild", tools: ["Alchemistenausrüstung", "Kochutensilien"] },
  { classId: "monster-hunter", subclassId: "monster-hunter-occultist-guild", skills: ["arcana"] },
  { classId: "monster-hunter", subclassId: "monster-hunter-trapper-guild", tools: ["Tüftlerwerkzeug"], skills: ["stealth"] },
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

export function getSubclassProficiencyPackage(classId: string, subclassId?: string, level?: number) {
  if (level !== undefined && subclassId && level < (getSubclassUnlockLevel(classId, subclassId) ?? Infinity)) return;
  return subclassProficiencyPackages.find((entry) => entry.classId === classId && entry.subclassId === subclassId);
}

export function getSubclassSkillProficiencies(classId: string, subclassId: string | undefined, level: number, pathChoices?: CharacterPathChoices): SkillId[] {
  const ids = getSubclassProficiencyPackage(classId, subclassId, level)?.skills ?? [];
  const raw = level >= 3 && classId === "bard" && subclassId === "college-of-lore" ? pathChoices?.["lore-bonus-skills"]
    : level >= 3 && classId === "fighter" && subclassId === "samurai" ? pathChoices?.["samurai-bonus-proficiency"] : undefined;
  return [...new Set([...ids, ...(Array.isArray(raw) ? raw : raw ? [raw] : []).filter((id): id is SkillId => skills.some((skill) => skill.id === id))])];
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
  const profile = getSubclassSpellcastingProfile(classId, subclassId);
  if (profile && level >= profile.startsAtLevel) fixed.push(...(profile.forcedCantripIds ?? []));

  if (classId === "warlock" && level >= 3) {
    const pact = pathChoices?.["warlock-pact-boon"];
    if (pact === "chain") fixed.push("find-familiar");
    if (pact === "tome") {
      const cantrips = pathChoices?.["warlock-tome-cantrips"];
      fixed.push(...(Array.isArray(cantrips) ? cantrips : cantrips ? [cantrips] : []));
    }
  }

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
    const higherLandSpells: Record<string, string[]> = {
      arctic: ["sleet-storm", "slow"],
      coast: ["water-breathing", "water-walk"],
      desert: ["create-food-and-water", "protection-from-energy"],
      forest: ["call-lightning", "plant-growth"],
      grassland: ["daylight", "haste"],
      mountain: ["lightning-bolt", "meld-into-stone"],
      swamp: ["water-walk", "stinking-cloud"],
      underdark: ["gaseous-form", "stinking-cloud"],
    };
    if (selectedLand) {
      fixed.push(...(landSpells[selectedLand] ?? []));
      if (level >= 5) fixed.push(...(higherLandSpells[selectedLand] ?? []));
    }
  }

  return [...new Set(fixed)];
}

export function getExpandedSubclassSpellIds(classId: string, subclassId: string | undefined, level: number): string[] {
  return [...new Set(collectByLevel(getSubclassSpellPackage(classId, subclassId)?.expandedByLevel, level))];
}

export function getBonusSelectableSubclassCantrips(classId: string, subclassId: string | undefined, level: number): number {
  return latestNumericValue(getSubclassSpellPackage(classId, subclassId)?.bonusSelectableCantripsByLevel, level);
}
