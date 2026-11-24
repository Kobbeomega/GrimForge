import {
  getAbilityModifier,
  getProficiencyBonus,
  getSkillBonus,
} from "../../../compendium/core";

import type {
  AbilityId,
} from "../../../compendium/core";

import type {
  SkillId,
} from "../../../compendium/skills";
import { getSubclassSkillProficiencies } from "../../../compendium/classes";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

import {
  getFeatById,
} from "../../../compendium/feats";

export interface PassiveScores {
  perception: number;
  investigation: number;
  insight: number;
}

interface PassiveScoreDefinition {
  skillId: SkillId;
  abilityId: AbilityId;
}

const passiveDefinitions: Record<
  keyof PassiveScores,
  PassiveScoreDefinition
> = {
  perception: {
    skillId: "perception",
    abilityId: "wisdom",
  },

  investigation: {
    skillId: "investigation",
    abilityId: "intelligence",
  },

  insight: {
    skillId: "insight",
    abilityId: "wisdom",
  },
};

export function getPassiveScores(
  character: CharacterArchiveEntry,
): PassiveScores {
  return {
    perception: calculatePassiveScore(
      character,
      passiveDefinitions.perception,
    ),

    investigation: calculatePassiveScore(
      character,
      passiveDefinitions.investigation,
    ),

    insight: calculatePassiveScore(
      character,
      passiveDefinitions.insight,
    ),
  };
}

function calculatePassiveScore(
  character: CharacterArchiveEntry,
  definition: PassiveScoreDefinition,
): number {
  const score =
    character.abilityScores?.[
      definition.abilityId
    ] ?? 10;

  const proficiencyBonus =
    getProficiencyBonus(
      character.level,
    );

  const proficient =
    (character.skillProficiencies?.includes(definition.skillId) ?? false) ||
    getSubclassSkillProficiencies(character.classId ?? "", character.subclassId, character.level, character.pathChoices).includes(definition.skillId);

  const expertise =
    character.skillExpertise
      ?.includes(
        definition.skillId,
      ) ?? false;

  const featBonus =
    (character.featIds ?? []).reduce(
      (sum, featId) => {
        const feat =
          getFeatById(featId);

        if (
          definition.skillId ===
          "perception"
        ) {
          return (
            sum +
            (feat?.bonuses
              ?.passivePerception ?? 0)
          );
        }

        if (
          definition.skillId ===
          "investigation"
        ) {
          return (
            sum +
            (feat?.bonuses
              ?.passiveInvestigation ?? 0)
          );
        }

        return sum;
      },
      0,
    );

  return (
    10 +
    getSkillBonus({
      abilityModifier:
        getAbilityModifier(score),

      proficiencyBonus,
      proficient,
      expertise,
    }) +
    featBonus
  );
}
