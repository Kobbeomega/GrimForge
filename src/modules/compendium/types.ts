import type { CharacterAncestry } from "../../compendium/ancestries";
import type { CharacterClass } from "../../compendium/classes";
import type { EquipmentDefinition } from "../../compendium/equipment";
import type { SpellDefinition } from "../../compendium/spells";
import type { TransformationDefinition } from "../../compendium/transformations";

export type CompendiumCategoryId =
  | "overview"
  | "ancestries"
  | "classes"
  | "transformations"
  | "weapons"
  | "armor"
  | "gear"
  | "spells";

export type CompendiumEntry =
  | CharacterAncestry
  | CharacterClass
  | TransformationDefinition
  | EquipmentDefinition
  | SpellDefinition;
