export {
  calculateClassMaximumHitPoints,
  calculateSpellAttackBonus,
  calculateSpellSaveDifficultyClass,
  classes,
  getCharacterClassFeatures,
  getClassById,
  getClassFeatures,
  getClassSubclassUnlockLevel,
  getClassSpellcastingAbility,
  getClassSpellcastingRules,
  getSubclassById,
  getSubclassFeatures,
  getSubclassUnlockLevel,
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

export {
  characterPathChoices,
  getCharacterPathChoices,
  getCharacterPathChoiceSummary,
  isCharacterPathChoiceComplete,
} from "./characterChoices";

export type {
  CharacterPathChoiceDefinition,
  CharacterPathChoiceOption,
  CharacterPathChoiceValue,
  CharacterPathChoices,
} from "./characterChoices";

export {
  getBonusSelectableSubclassCantrips,
  getExpandedSubclassSpellIds,
  getGrantedSubclassSpellIds,
  getSubclassProficiencyPackage,
  getSubclassSpellPackage,
  getSubclassSpellcastingProfile,
  subclassProficiencyPackages,
  subclassSpellPackages,
  subclassSpellcastingProfiles,
} from "./subclassMechanics";
export type {
  SubclassProficiencyPackage,
  SubclassSpellPackage,
  SubclassSpellcastingProfile,
} from "./subclassMechanics";
