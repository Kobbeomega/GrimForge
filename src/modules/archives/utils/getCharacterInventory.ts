import type {
  CharacterArchiveEntry,
  CharacterInventory,
} from "../types";

const emptyInventory: CharacterInventory = {
  items: [],
  currency: {
    copper: 0,
    silver: 0,
    gold: 0,
  },
};

export function getCharacterInventory(
  character: CharacterArchiveEntry,
): CharacterInventory {
  const inventory = character.inventory;

  if (!inventory) {
    return {
      items: [],
      currency: {
        ...emptyInventory.currency,
      },
    };
  }

  return {
    items: Array.isArray(inventory.items)
      ? inventory.items
      : [],

    currency: {
      copper: normalizeCurrency(
        inventory.currency?.copper,
      ),

      silver: normalizeCurrency(
        inventory.currency?.silver,
      ),

      gold: normalizeCurrency(
        inventory.currency?.gold,
      ),
    },
  };
}

function normalizeCurrency(
  value: unknown,
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(value),
  );
}