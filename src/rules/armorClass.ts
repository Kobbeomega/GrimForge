import {
  calculateAbilityModifier,
} from "./abilities";

export type ArmorCategory =
  | "none"
  | "light"
  | "medium"
  | "heavy";

export interface ArmorClassArmor {
  category: ArmorCategory;
  baseArmorClass: number;
  maximumDexterityBonus?: number;
}

export interface ArmorClassInput {
  dexterity: number;
  constitution?: number;
  wisdom?: number;

  armor?: ArmorClassArmor;

  shieldBonus?: number;
  flatBonus?: number;

  classId?: string;

  /**
   * Setze dies auf true, wenn eine Klassenregel
   * wie ungepanzerte Verteidigung aktiv sein soll.
   */
  useUnarmoredClassDefense?: boolean;
}

export interface ArmorClassResult {
  armorClass: number;

  baseArmorClass: number;
  dexterityContribution: number;
  shieldContribution: number;
  flatContribution: number;

  formula: string;
}

function calculateDexterityContribution({
  dexterity,
  armor,
}: {
  dexterity: number;
  armor?: ArmorClassArmor;
}): number {
  const modifier =
    calculateAbilityModifier(
      dexterity,
    );

  if (!armor) {
    return modifier;
  }

  switch (armor.category) {
    case "heavy":
      return 0;

    case "medium":
      return Math.min(
        modifier,
        armor
          .maximumDexterityBonus ??
          2,
      );

    case "light":
    case "none":
      return modifier;
  }
}

function calculateUnarmoredBase({
  classId,
  dexterity,
  constitution = 10,
  wisdom = 10,
}: {
  classId?: string;
  dexterity: number;
  constitution?: number;
  wisdom?: number;
}): {
  armorClass: number;
  formula: string;
} {
  const dexterityModifier =
    calculateAbilityModifier(
      dexterity,
    );

  if (classId === "barbarian") {
    return {
      armorClass:
        10 +
        dexterityModifier +
        calculateAbilityModifier(
          constitution,
        ),

      formula:
        "10 + GE + KO",
    };
  }

  if (classId === "monk") {
    return {
      armorClass:
        10 +
        dexterityModifier +
        calculateAbilityModifier(
          wisdom,
        ),

      formula:
        "10 + GE + WE",
    };
  }

  return {
    armorClass:
      10 +
      dexterityModifier,

    formula:
      "10 + GE",
  };
}

export function calculateArmorClass(
  input: ArmorClassInput,
): ArmorClassResult {
  const shieldContribution =
    input.shieldBonus ?? 0;

  const flatContribution =
    input.flatBonus ?? 0;

  if (
    !input.armor &&
    input.useUnarmoredClassDefense
  ) {
    const unarmored =
      calculateUnarmoredBase({
        classId:
          input.classId,

        dexterity:
          input.dexterity,

        constitution:
          input.constitution,

        wisdom:
          input.wisdom,
      });

    return {
      armorClass:
        unarmored.armorClass +
        shieldContribution +
        flatContribution,

      baseArmorClass:
        unarmored.armorClass,

      dexterityContribution: 0,
      shieldContribution,
      flatContribution,

      formula:
        unarmored.formula,
    };
  }

  const armor =
    input.armor ?? {
      category:
        "none" as const,

      baseArmorClass: 10,
    };

  const dexterityContribution =
    calculateDexterityContribution({
      dexterity:
        input.dexterity,

      armor,
    });

  return {
    armorClass:
      armor.baseArmorClass +
      dexterityContribution +
      shieldContribution +
      flatContribution,

    baseArmorClass:
      armor.baseArmorClass,

    dexterityContribution,
    shieldContribution,
    flatContribution,

    formula:
      `${armor.baseArmorClass} + GE-Anteil`,
  };
}
