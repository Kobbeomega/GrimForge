import type {
  CharacterArchiveEntry,
  CharacterVitals,
} from "../types";

export function getCharacterVitals(
  character: CharacterArchiveEntry,
): CharacterVitals {
  return (
    character.vitals ?? {
      maximumHitPoints: 10,

      currentHitPoints: 10,

      temporaryHitPoints: 0,

      armorClass: 10,

      initiativeModifier: 0,

      speed: 9,
    }
  );
}