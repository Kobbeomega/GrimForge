import {
  defaultAbilityScores,
} from "../../../compendium/core";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

import type {
  CharacterRuleInput,
} from "../../../rules";
import { resolveInventoryItem } from "../../archives/utils/resolveInventoryItem";
import { getClassMovementBonus } from "../../../rules/movement";

export function createCharacterRuleInput(
  character: CharacterArchiveEntry,
): CharacterRuleInput {
  let armor: "none" | "shield" | "armor" | "heavy" = "none";
  let armorRules: NonNullable<CharacterRuleInput["armorClass"]>["armor"];
  let shieldBonus = 0;
  for (const item of character.inventory?.items ?? []) {
    if (!item.equipped || item.quantity <= 0) continue;
    const definition = resolveInventoryItem(item);
    if (definition?.category === "shield") {
      shieldBonus = Math.max(shieldBonus, definition.armorClass);
      if (armor === "none") armor = "shield";
    } else if (definition?.category === "armor" && !armorRules) {
      armor = definition.dexterityModifier ? "armor" : "heavy";
      armorRules = {
        baseArmorClass: definition.armorClass,
        category: !definition.dexterityModifier ? "heavy" : definition.maximumDexterityBonus !== undefined ? "medium" : "light",
        maximumDexterityBonus: definition.maximumDexterityBonus,
      };
    }
  }
  return {
    classId:
      character.classId ?? "",
    subclassId:
      character.subclassId,
    pathChoices: { ...(character.pathChoices ?? {}) },
    level:
      character.level,
    abilityScores: {
      ...defaultAbilityScores,
      ...character.abilityScores,
    },
    proficientSkillIds: [
      ...(
        character
          .skillProficiencies ??
        []
      ),
    ],
    expertiseSkillIds: [
      ...(
        character
          .skillExpertise ??
        []
      ),
    ],
    baseSpeed:
      character.vitals?.speed ??
      9,
    usesReducedSpeed:
      character
        .ancestryUsesReducedSpeed ??
      false,
    classMovementBonus: getClassMovementBonus(character.classId ?? "", character.level, armor),
    armorClass: {
      armor: armorRules,
      shieldBonus,
      flatBonus: armorRules && character.pathChoices?.[`${character.classId}-fighting-style`] === "defense" ? 1 : 0,
      useUnarmoredClassDefense: !armorRules && (character.classId === "barbarian" || (character.classId === "monk" && !shieldBonus)),
    },
    spentClassResources:
      character
        .spentClassResources ??
      {},
    featIds:
      character
        .featIds ??
      [],
    featChoices:
      character
        .featChoices,
  };
}
