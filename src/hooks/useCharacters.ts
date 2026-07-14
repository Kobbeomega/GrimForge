import { useCharacterContext } from "../store/CharacterContext";

export function useCharacters() {
  return useCharacterContext();
}