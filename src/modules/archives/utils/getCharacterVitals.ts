import {
  calculateMaximumHitPoints,
  buildHitPointsPerLevel,
} from "../../../rules/hitPoints";
import { getFeatById } from "../../../compendium/feats";

import type {
  CharacterArchiveEntry,
  CharacterVitals,
} from "../types";

export function getCharacterVitals(
  character: CharacterArchiveEntry,
): CharacterVitals {
  if (character.vitals) {
    return character.vitals;
  }

  const maximumHitPoints =
    calculateMaximumHitPoints({
      classId: character.classId ?? "",
      level: character.level,
      bonusPerLevel: buildHitPointsPerLevel(character) + (character.featIds ?? []).reduce((n,id) => n + (getFeatById(id)?.bonuses?.hitPointsPerLevel ?? 0),0),
      constitution:
        character.abilityScores?.constitution ??
        character.baseAbilityScores?.constitution ??
        10,
    });

  const safeMaximumHitPoints =
    maximumHitPoints > 0
      ? maximumHitPoints
      : 10;

  return {
    maximumHitPoints:
      safeMaximumHitPoints,

    currentHitPoints:
      safeMaximumHitPoints,

    temporaryHitPoints: 0,

    armorClass: 10,

    initiativeModifier:
      Math.floor(
        (
          (
            character.abilityScores
              ?.dexterity ??
            character.baseAbilityScores
              ?.dexterity ??
            10
          ) -
          10
        ) /
          2,
      ),

    speed: 9,
  };
}
