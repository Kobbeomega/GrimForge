import { sourceClassProgressionLevel1To3 } from "../../content/phase1/classProgressionLevel1To3";

export interface ClassProgressionEntry {
  classId: string; level: number; proficiencyBonus: number; primaryAbility: string; priority: string; hitDie: string; fixedHitPointGain: string; savingThrows: string[]; armorProficiencies: string; weaponProficiencies: string; skillChoices: string; features: string[]; resourcesAndSpellcasting: string;
}
export const classProgressionRegistry: ClassProgressionEntry[] = sourceClassProgressionLevel1To3.map((entry) => ({
  classId: entry.class_id, level: entry.level, proficiencyBonus: entry.proficiency_bonus, primaryAbility: entry.primary, priority: entry.priority, hitDie: entry.hit_die, fixedHitPointGain: entry.fixed_hp_gain, savingThrows: entry.saving_throws.split(",").map((v)=>v.trim()), armorProficiencies: entry.armor, weaponProficiencies: entry.weapons, skillChoices: entry.skill_choices, features: entry.features.split(";").map((v)=>v.trim()).filter(Boolean), resourcesAndSpellcasting: entry.resources_and_spellcasting,
}));
export function getClassProgression(classId: string, level: number) { return classProgressionRegistry.find((entry)=>entry.classId===classId && entry.level===level); }
