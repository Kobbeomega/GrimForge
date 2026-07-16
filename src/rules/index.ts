export {
  abilityIds,
  calculateAbilityModifier,
  calculateAbilityModifiers,
  calculateInitiativeModifier,
  calculateSavingThrowBonus,
  formatModifier,
  normalizeAbilityScore,
} from "./abilities";

export {
  calculateArmorClass,
} from "./armorClass";

export type {
  ArmorCategory,
  ArmorClassArmor,
  ArmorClassInput,
  ArmorClassResult,
} from "./armorClass";

export {
  resolveCharacterClassFeatures,
} from "./classFeatures";

export type {
  ResolvedClassFeature,
} from "./classFeatures";

export {
  resolveCharacterClassResources,
  restoreClassResource,
  restoreClassResourcesByRest,
  spendClassResource,
} from "./classResources";

export type {
  CharacterClassResource,
  CharacterClassResourceUsage,
} from "./classResources";

export {
  calculateCharacterRules,
} from "./character";

export type {
  CalculatedCharacterRules,
  CharacterRuleInput,
} from "./character";

export {
  calculateFirstLevelHitPoints,
  calculateHitPointsPerAdditionalLevel,
  calculateMaximumHitPoints,
} from "./hitPoints";

export type {
  HitPointProgressionMode,
} from "./hitPoints";

export {
  calculateMovementSpeed,
  feetToMeters,
  metersToFeet,
} from "./movement";

export type {
  MovementInput,
} from "./movement";

export {
  applyProficiency,
  calculateProficiencyBonus,
  normalizeCharacterLevel,
} from "./proficiency";

export {
  calculatePassivePerception,
  calculatePassiveScore,
  calculateSkillBonus,
  calculateSkillBonuses,
} from "./skills";

export type {
  SkillBonusEntry,
} from "./skills";

export {
  calculateClassSpellcasting,
  calculateSpellAttackBonus,
  calculateSpellSaveDifficultyClass,
} from "./spellcasting";

export type {
  SpellcastingRuleResult,
} from "./spellcasting";

export {
  resolveCharacterEquipment,
} from "./equipment";

export type {
  ResolvedEquipment,
} from "./equipment";

export {
  calculateCarryingCapacity,
} from "./carryingCapacity";

export type {
  CarryingCapacityResult,
} from "./carryingCapacity";
export * from "./attacks";
