import {
  useMemo,
} from "react";

import {
  calculateCharacterRules,
} from "../../../rules";

import {
  createCharacterRuleInput,
} from "../rules/createCharacterRuleInput";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

export function useCharacterRules(
  character: CharacterArchiveEntry,
) {
  return useMemo(
    () =>
      calculateCharacterRules(
        createCharacterRuleInput(
          character,
        ),
      ),

    [character],
  );
}
