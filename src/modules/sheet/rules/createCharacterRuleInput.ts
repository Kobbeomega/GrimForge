import {
  defaultAbilityScores,
} from "../../../compendium/core";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

import type {
  CharacterRuleInput,
} from "../../../rules";

export function createCharacterRuleInput(
  character: CharacterArchiveEntry,
): CharacterRuleInput {
  return {
    classId:
      character.classId ?? "",
    subclassId:
      character.subclassId,
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
    armorClass: {
      useUnarmoredClassDefense:
        (
          character.vitals
            ?.armorClass ??
          10
        ) <= 10,
    },
    spentClassResources:
      character
        .spentClassResources ??
      {},
  };
}
