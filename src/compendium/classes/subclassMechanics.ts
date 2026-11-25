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
    cantripsKnown: { 3: 2, 10: 3 },
    spellsKnown: { 3: 3, 4: 4, 7: 5, 8: 6, 10: 7 },
    restrictedSchools: ["abjuration", "evocation"],
    unrestrictedSpellCount: 1,
  },
  {
    classId: "rogue",
    subclassId: "arcane-trickster",
    sourceClassId: "wizard",
    abilityId: "intelligence",
    startsAtLevel: 3,
    cantripsKnown: { 3: 3, 10: 4 },
    spellsKnown: { 3: 3, 4: 4, 7: 5, 8: 6, 10: 7 },
    restrictedSchools: ["enchantment", "illusion"],
    unrestrictedSpellCount: 1,
    forcedCantripIds: ["mage-hand"],
  },
  {
    classId: "rogue",
    subclassId: "sanguine-thief",
    sourceClassId: "wizard",
    abilityId: "intelligence",
    startsAtLevel: 3,
    cantripsKnown: { 3: 3, 10: 4 },
    spellsKnown: { 3: 3, 4: 4, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7 },
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
  { classId: "cleric", subclassId: "life-domain", grantedByLevel: { 1: ["bless", "cure-wounds"], 3: ["lesser-restoration", "spiritual-weapon"], 5: ["beacon-of-hope", "revivify"], 7: ["death-ward", "guardian-of-faith"], 9: ["mass-cure-wounds", "raise-dead"] } },
  { classId: "cleric", subclassId: "light-domain", grantedByLevel: { 1: ["burning-hands", "faerie-fire", "light"], 3: ["flaming-sphere", "scorching-ray"], 5: ["daylight", "fireball"], 7: ["guardian-of-faith", "wall-of-fire"], 9: ["flame-strike", "scrying"] } },
  { classId: "cleric", subclassId: "war-domain", grantedByLevel: { 1: ["divine-favor", "shield-of-faith"], 3: ["magic-weapon", "spiritual-weapon"], 5: ["crusader-s-mantle", "spirit-guardians"], 7: ["freedom-of-movement", "stoneskin"], 9: ["flame-strike", "hold-monster"] } },
  { classId: "cleric", subclassId: "grave-domain", grantedByLevel: { 1: ["bane", "false-life", "spare-the-dying"], 3: ["gentle-repose", "ray-of-enfeeblement"], 5: ["revivify", "vampiric-touch"], 7: ["blight", "death-ward"], 9: ["antilife-shell", "raise-dead"] } },

  // Druid circles.
  { classId: "druid", subclassId: "circle-of-the-land", bonusSelectableCantripsByLevel: { 2: 1 } },
  { classId: "druid", subclassId: "circle-of-spores", grantedByLevel: { 2: ["chill-touch"], 3: ["blindness-deafness", "gentle-repose"], 5: ["animate-dead", "gaseous-form"], 7: ["blight", "confusion"], 9: ["cloudkill", "contagion"] } },

  // Paladin oath spells begin at paladin level 3 and are always prepared.
  { classId: "paladin", subclassId: "oath-of-devotion", grantedByLevel: { 3: ["protection-from-evil-and-good", "sanctuary"], 5: ["lesser-restoration", "zone-of-truth"], 9: ["beacon-of-hope", "dispel-magic"] } },
  { classId: "paladin", subclassId: "oath-of-vengeance", grantedByLevel: { 3: ["bane", "hunter-s-mark"], 5: ["hold-person", "misty-step"], 9: ["haste", "protection-from-energy"] } },
  { classId: "paladin", subclassId: "oath-of-the-ancients", grantedByLevel: { 3: ["ensnaring-strike", "speak-with-animals"], 5: ["misty-step", "moonbeam"], 9: ["plant-growth", "protection-from-energy"] } },
  { classId: "paladin", subclassId: "oath-of-the-crown", grantedByLevel: { 3: ["command", "compelled-duel"], 5: ["warding-bond", "zone-of-truth"], 9: ["aura-of-vitality", "spirit-guardians"] } },

  // Ranger subclass spells.
  { classId: "ranger", subclassId: "gloom-stalker", grantedByLevel: { 3: ["disguise-self"], 5: ["rope-trick"], 9: ["fear"] } },
  { classId: "barbarian", subclassId: "totem-warrior", grantedByLevel: { 3: ["beast-sense", "speak-with-animals"] } },
  { classId: "wizard", subclassId: "school-of-illusion", grantedByLevel: { 2: ["minor-illusion"] } },
  { classId: "monk", subclassId: "way-of-shadow", grantedByLevel: { 3: ["minor-illusion", "darkness", "darkvision", "pass-without-trace", "silence"] } },

  // Sorcerer bonus spell.
  { classId: "sorcerer", subclassId: "shadow-magic", grantedByLevel: { 3: ["darkness"] } },

  // Warlock patron expanded lists are options, not free known spells.
  { classId: "warlock", subclassId: "the-fiend", expandedByLevel: { 1: ["burning-hands", "command"], 3: ["blindness-deafness", "scorching-ray"], 5: ["fireball", "stinking-cloud"], 7: ["fire-shield", "wall-of-fire"], 9: ["flame-strike", "hallow"] } },
  { classId: "warlock", subclassId: "the-archfey", expandedByLevel: { 1: ["faerie-fire", "sleep"], 3: ["calm-emotions", "phantasmal-force"], 5: ["blink", "plant-growth"], 7: ["dominate-beast", "greater-invisibility"], 9: ["dominate-person", "seeming"] } },
  { classId: "warlock", subclassId: "the-great-old-one", expandedByLevel: { 1: ["dissonant-whispers", "tasha-s-hideous-laughter"], 3: ["detect-thoughts", "phantasmal-force"], 5: ["clairvoyance", "sending"], 7: ["dominate-beast", "black-tentacles"], 9: ["dominate-person", "telekinesis"] } },
  { classId: "warlock", subclassId: "the-undead", expandedByLevel: { 1: ["bane", "false-life"], 3: ["blindness-deafness", "phantasmal-force"], 5: ["phantom-steed", "speak-with-dead"], 7: ["death-ward", "greater-invisibility"], 9: ["antilife-shell", "cloudkill"] } },

  // Grim Hollow: feste Unterklassenzauber und erweiterte Zauberlisten bis Stufe 10.
  { classId: "barbarian", subclassId: "path-of-the-primal-spirit", grantedByLevel: { 6: ["animal-friendship", "speak-with-animals"] } },
  { classId: "bard", subclassId: "college-of-fools", grantedByLevel: { 3: ["vicious-mockery", "dissonant-whispers"] } },
  { classId: "bard", subclassId: "college-of-requiems", grantedByLevel: { 6: ["animate-dead"] }, bonusSelectableCantripsByLevel: { 3: 2 } },

  { classId: "cleric", subclassId: "eldritch-domain", grantedByLevel: { 3: ["detect-thoughts", "tasha-s-hideous-laughter", "see-invisibility", "sleep"], 5: ["fear", "tongues"], 7: ["confusion", "phantasmal-killer"], 9: ["contact-other-plane", "dream"] } },
  { classId: "cleric", subclassId: "inquisition-domain", grantedByLevel: { 3: ["see-invisibility", "silence"], 5: ["dispel-magic", "remove-curse"], 7: ["arcane-eye", "locate-creature"], 9: ["creation", "hallow"] } },
  { classId: "cleric", subclassId: "purification-domain", grantedByLevel: { 3: ["detect-poison-and-disease", "flame-blade"], 5: ["fear", "flash-fever"], 7: ["aura-of-purity", "wall-of-fire"], 9: ["flame-strike", "hold-monster"] } },

  { classId: "druid", subclassId: "circle-of-blood", grantedByLevel: { 3: ["blood-rush", "crimson-lash", "sense-lifeblood"], 5: ["blood-bond", "sanguine-poppet"], 7: ["circle-of-scarlet", "dark-sacrament"], 9: ["dominate-person", "mortality"] } },

  { classId: "monk", subclassId: "warrior-of-the-leaden-crown", grantedByLevel: { 3: ["mage-hand", "detect-evil-and-good", "protection-from-evil-and-good", "hold-person", "levitate", "shatter"] } },

  { classId: "paladin", subclassId: "oath-of-pestilence", grantedByLevel: { 3: ["bane", "inflict-wounds"], 5: ["melf-s-acid-arrow", "ray-of-enfeeblement"], 9: ["flash-fever", "stinking-cloud"] } },
  { classId: "paladin", subclassId: "oath-of-slaughter", grantedByLevel: { 3: ["crimson-lash", "inflict-wounds"], 5: ["bloodletter", "shatter"], 9: ["fear", "suffocate"] } },
  { classId: "paladin", subclassId: "oath-of-zeal", grantedByLevel: { 3: ["detect-evil-and-good", "hunter-s-mark"], 5: ["detect-thoughts", "knock"], 9: ["fear", "tongues"] } },

  { classId: "ranger", subclassId: "green-reaper", grantedByLevel: { 3: ["detect-poison-and-disease"], 5: ["hold-person"], 9: ["bestow-curse"] } },
  { classId: "ranger", subclassId: "primordial-archer", grantedByLevel: { 3: ["hex"], 5: ["blindness-deafness"], 9: ["call-lightning"] } },
  { classId: "ranger", subclassId: "vermin-lord", grantedByLevel: { 3: ["consumption"], 5: ["animal-messenger"], 9: ["flash-fever"] } },

  { classId: "rogue", subclassId: "highway-rider", grantedByLevel: { 3: ["find-steed"] } },

  { classId: "sorcerer", subclassId: "apocalypse-sorcery", grantedByLevel: { 3: ["augury", "comprehend-languages", "hellish-rebuke", "ray-of-enfeeblement"], 5: ["bestow-curse", "revivify"], 7: ["banishment", "divination"], 9: ["contagion", "insect-plague"] } },
  { classId: "sorcerer", subclassId: "haunted-sorcery", grantedByLevel: { 3: ["bane", "chill-touch", "find-familiar", "invisibility", "see-invisibility", "unseen-servant"], 5: ["fly", "speak-with-dead"], 7: ["death-ward", "greater-invisibility"], 9: ["little-death", "telekinesis"] } },
  { classId: "sorcerer", subclassId: "wretched-bloodline", grantedByLevel: { 3: ["detect-evil-and-good"], 6: ["bestow-curse"] } },

  { classId: "warlock", subclassId: "the-coven", grantedByLevel: { 3: ["minor-illusion", "hex"] }, expandedByLevel: { 3: ["hold-person", "identify", "locate-object", "ray-of-sickness"], 5: ["bestow-curse", "counterspell"], 7: ["phantasmal-killer", "polymorph"], 9: ["divination", "locate-creature"] } },
  { classId: "warlock", subclassId: "the-first-vampire", grantedByLevel: { 6: ["polymorph"] }, expandedByLevel: { 3: ["bane", "command", "false-life", "fog-cloud"], 5: ["conjure-animals", "gaseous-form"], 7: ["dominate-person", "seeming"], 9: ["little-death", "telekinesis"] } },
  { classId: "warlock", subclassId: "the-parasite", grantedByLevel: { 10: ["dominate-person"] } },

  // Der Daemonologe wählt Arch Daemon oder Arch Seraph. Die Liste bleibt daher als Auswahl offen.
  { classId: "wizard", subclassId: "daemonologist", expandedByLevel: { 3: ["aid", "bane", "bless", "toll-the-dead", "word-of-radiance"], 5: ["fear", "revivify"], 7: ["dark-sacrament", "guardian-of-faith"], 9: ["geas", "greater-restoration"] } },
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

  if (classId === "bard") {
    for (const choiceId of ["lore-magical-secrets", "bard-magical-secrets"]) {
      const selected = pathChoices?.[choiceId];
      fixed.push(...(Array.isArray(selected) ? selected : selected ? [selected] : []));
    }
  }

  if (classId === "monster-hunter" && subclassId === "monster-hunter-occultist-guild" && level >= 10) {
    const selected = pathChoices?.["monster-hunter-occult-rituals"];
    fixed.push(...(Array.isArray(selected) ? selected : selected ? [selected] : []));
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
    const fourthLevelLandSpells: Record<string, string[]> = {
      arctic: ["freedom-of-movement", "ice-storm"],
      coast: ["control-water", "freedom-of-movement"],
      desert: ["blight", "hallucinatory-terrain"],
      forest: ["divination", "freedom-of-movement"],
      grassland: ["divination", "freedom-of-movement"],
      mountain: ["stone-shape", "stoneskin"],
      swamp: ["freedom-of-movement", "locate-creature"],
      underdark: ["greater-invisibility", "stone-shape"],
    };
    const fifthLevelLandSpells: Record<string, string[]> = {
      arctic: ["commune-with-nature", "cone-of-cold"],
      coast: ["conjure-elemental", "scrying"],
      desert: ["insect-plague", "wall-of-stone"],
      forest: ["commune-with-nature", "tree-stride"],
      grassland: ["dream", "insect-plague"],
      mountain: ["passwall", "wall-of-stone"],
      swamp: ["insect-plague", "scrying"],
      underdark: ["cloudkill", "insect-plague"],
    };
    if (selectedLand) {
      fixed.push(...(landSpells[selectedLand] ?? []));
      if (level >= 5) fixed.push(...(higherLandSpells[selectedLand] ?? []));
      if (level >= 7) fixed.push(...(fourthLevelLandSpells[selectedLand] ?? []));
      if (level >= 9) fixed.push(...(fifthLevelLandSpells[selectedLand] ?? []));
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
