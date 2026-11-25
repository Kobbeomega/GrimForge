import {
  getAbilityModifier,
  getProficiencyBonus,
} from "../../../compendium/core";

import {
  getClassSpellcasting,
  getPactSpellSlotsForClassLevel,
  getSpellSlotsForClassLevel,
} from "../../../compendium/spells";

import {
  getSubclassSpellcastingProfile,
  getThirdCasterSlots,
} from "../../../compendium/classes";

import type { AbilityId } from "../../../compendium/core";
import type { PactSpellSlots, SpellSlots } from "../../../compendium/spells";
import type { CharacterArchiveEntry } from "../../archives/types";

export interface SpellcastingStats {
  enabled: boolean;
  abilityId?: AbilityId;
  abilityModifier?: number;
  spellAttackBonus?: number;
  spellSaveDifficultyClass?: number;
  spellSlots: SpellSlots;
  pactSlots?: PactSpellSlots;
  ritualCasting: boolean;
  focusLabel?: string;
}

export function getSpellcastingStats(character: CharacterArchiveEntry): SpellcastingStats {
  const classId = character.classId;
  if (!classId) return createEmptySpellcastingStats();

  const subclassProfile = getSubclassSpellcastingProfile(classId, character.subclassId);
  const baseDefinition = getClassSpellcasting(classId);
  if (classId === "monk" && character.subclassId === "way-of-shadow" && character.level >= 3) {
    return { ...createStats({ character, abilityId: "wisdom", spellSlots: {}, ritualCasting: false, focusLabel: "Schattenkünste · Ki" }), spellAttackBonus: undefined, spellSaveDifficultyClass: undefined };
  }
  if (classId === "barbarian" && character.subclassId === "totem-warrior" && character.level >= 3) {
    return { ...createEmptySpellcastingStats(), enabled: true, ritualCasting: true, focusLabel: "Geistsucher · nur Rituale" };
  }

  if (subclassProfile && character.level >= subclassProfile.startsAtLevel) {
    return createStats({
      character,
      abilityId: subclassProfile.abilityId,
      spellSlots: getThirdCasterSlots(character.level),
      ritualCasting: false,
      focusLabel: classId === "monster-hunter" ? "Komponententasche oder arkaner Fokus" : "Komponententasche",
    });
  }

  if (!baseDefinition) return createEmptySpellcastingStats();

  return createStats({
    character,
    abilityId: baseDefinition.abilityId,
    spellSlots: getSpellSlotsForClassLevel(classId, character.level),
    pactSlots: getPactSpellSlotsForClassLevel(classId, character.level) ?? undefined,
    ritualCasting: baseDefinition.ritualCasting,
    focusLabel: baseDefinition.focusLabel,
  });
}

function createStats({
  character,
  abilityId,
  spellSlots,
  pactSlots,
  ritualCasting,
  focusLabel,
}: {
  character: CharacterArchiveEntry;
  abilityId: AbilityId;
  spellSlots: SpellSlots;
  pactSlots?: PactSpellSlots;
  ritualCasting: boolean;
  focusLabel?: string;
}): SpellcastingStats {
  const abilityScore = character.abilityScores?.[abilityId] ?? 10;
  const abilityModifier = getAbilityModifier(abilityScore);
  const proficiencyBonus = getProficiencyBonus(character.level);
  return {
    enabled: true,
    abilityId,
    abilityModifier,
    spellAttackBonus: abilityModifier + proficiencyBonus,
    spellSaveDifficultyClass: 8 + abilityModifier + proficiencyBonus,
    spellSlots,
    pactSlots,
    ritualCasting,
    focusLabel,
  };
}

function createEmptySpellcastingStats(): SpellcastingStats {
  return { enabled: false, spellSlots: {}, ritualCasting: false };
}
