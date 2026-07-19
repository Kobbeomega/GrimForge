export {
  calculateClassMaximumHitPoints,
  calculateSpellAttackBonus,
  calculateSpellSaveDifficultyClass,
  classes,
  getCharacterClassFeatures,
  getClassById,
  getClassFeatures,
  getClassSpellcastingAbility,
  getClassSpellcastingRules,
  getSubclassById,
  getSubclassFeatures,
  resolveClassResourceAmount,
} from "./classes";

export type {
  CharacterClass,
  CharacterSubclass,
  ClassFeature,
  ClassFeatureKind,
  ClassFeatureResource,
  ClassResourceAmount,
  ClassResourceRecharge,
  ClassSource,
  ClassSpellcastingRules,
  SpellcastingProgression,
  SpellPreparationMode,
} from "./classes";

export { classProgressionRegistry, getClassProgression } from "./progression";
export type { ClassProgressionEntry } from "./progression";
