import {
  getAbilityModifier,
} from "../../../compendium/core";

import {
  getCantripsKnown,
  getClassSpellcasting,
  getMaximumSpellLevel,
  getSpellById,
  getSpellsKnown,
} from "../../../compendium/spells";

import type {
  AbilityScores,
} from "../../../compendium/core";

import type {
  CharacterSpellcasting,
  SpellPreparationMode,
} from "../../../compendium/spells";

export interface SpellSelectionRules {
  enabled: boolean;

  mode?: SpellPreparationMode;

  cantripsRequired: number;

  levelledSpellsRequired: number;

  preparedSpellsRequired: number;

  maximumSpellLevel: number;
}

export interface SpellSelectionValidation {
  valid: boolean;
  message?: string;
}

export function getSpellSelectionRules({
  classId,
  level,
  abilityScores,
}: {
  classId: string;
  level: number;
  abilityScores: AbilityScores;
}): SpellSelectionRules {
  const definition =
    getClassSpellcasting(classId);

  if (!definition) {
    return {
      enabled: false,

      cantripsRequired: 0,
      levelledSpellsRequired: 0,
      preparedSpellsRequired: 0,
      maximumSpellLevel: 0,
    };
  }

  const maximumSpellLevel =
    getMaximumSpellLevel(
      classId,
      level,
    );

  const cantripsRequired =
    getCantripsKnown(
      classId,
      level,
    );

  if (maximumSpellLevel <= 0) {
    return {
      enabled: true,

      mode:
        definition.preparationMode,

      cantripsRequired,

      levelledSpellsRequired: 0,

      preparedSpellsRequired: 0,

      maximumSpellLevel: 0,
    };
  }

  const abilityModifier =
    getAbilityModifier(
      abilityScores[
        definition.abilityId
      ],
    );

  const preparedLimit =
    calculatePreparedSpellLimit({
      mode:
        definition.preparationMode,

      formula:
        definition
          .preparedSpellFormula,

      minimum:
        definition
          .minimumPreparedSpells ??
        0,

      abilityModifier,
      level,
    });

  switch (
    definition.preparationMode
  ) {
    case "known":
    case "pact":
      return {
        enabled: true,

        mode:
          definition.preparationMode,

        cantripsRequired,

        levelledSpellsRequired:
          getSpellsKnown(
            classId,
            level,
          ) ?? 0,

        preparedSpellsRequired: 0,

        maximumSpellLevel,
      };

    case "prepared":
      return {
        enabled: true,

        mode:
          definition.preparationMode,

        cantripsRequired,

        levelledSpellsRequired:
          preparedLimit,

        preparedSpellsRequired:
          preparedLimit,

        maximumSpellLevel,
      };

    case "spellbook": {
      const spellbookSpellCount =
        getWizardSpellbookSpellCount(
          level,
        );

      return {
        enabled: true,

        mode:
          definition.preparationMode,

        cantripsRequired,

        levelledSpellsRequired:
          spellbookSpellCount,

        preparedSpellsRequired:
          Math.min(
            preparedLimit,
            spellbookSpellCount,
          ),

        maximumSpellLevel,
      };
    }
  }
}

export function validateSpellSelection({
  classId,
  level,
  abilityScores,
  spellcasting,
}: {
  classId: string;
  level: number;
  abilityScores: AbilityScores;
  spellcasting: CharacterSpellcasting;
}): SpellSelectionValidation {
  const rules =
    getSpellSelectionRules({
      classId,
      level,
      abilityScores,
    });

  if (!rules.enabled) {
    return {
      valid: true,
    };
  }

  const selectedSpells =
    spellcasting.spellIds.flatMap(
      (selection) => {
        const spell =
          getSpellById(
            selection.spellId,
          );

        return spell
          ? [
              {
                spell,
                selection,
              },
            ]
          : [];
      },
    );

  const cantripCount =
    selectedSpells.filter(
      ({ spell }) =>
        spell.level === 0,
    ).length;

  const levelledCount =
    selectedSpells.filter(
      ({ spell }) =>
        spell.level > 0,
    ).length;

  const preparedCount =
    selectedSpells.filter(
      ({
        spell,
        selection,
      }) =>
        spell.level > 0 &&
        selection.prepared,
    ).length;

  if (
    cantripCount !==
    rules.cantripsRequired
  ) {
    return {
      valid: false,

      message:
        rules.cantripsRequired === 1
          ? "Wähle genau einen Zaubertrick."
          : `Wähle genau ${rules.cantripsRequired} Zaubertricks.`,
    };
  }

  if (
    levelledCount !==
    rules.levelledSpellsRequired
  ) {
    return {
      valid: false,

      message:
        rules.levelledSpellsRequired === 1
          ? "Wähle genau einen Zauber."
          : `Wähle genau ${rules.levelledSpellsRequired} Zauber.`,
    };
  }

  if (
    rules.mode === "spellbook" &&
    preparedCount !==
      rules.preparedSpellsRequired
  ) {
    return {
      valid: false,

      message:
        rules.preparedSpellsRequired === 1
          ? "Bereite genau einen Zauber vor."
          : `Bereite genau ${rules.preparedSpellsRequired} Zauber vor.`,
    };
  }

  return {
    valid: true,
  };
}

function calculatePreparedSpellLimit({
  mode,
  formula,
  minimum,
  abilityModifier,
  level,
}: {
  mode: SpellPreparationMode;

  formula:
    | "ability-plus-level"
    | "ability-plus-half-level"
    | undefined;

  minimum: number;

  abilityModifier: number;
  level: number;
}): number {
  if (
    mode !== "prepared" &&
    mode !== "spellbook"
  ) {
    return 0;
  }

  const classLevel =
    Math.max(
      1,
      Math.floor(level),
    );

  let result = minimum;

  switch (formula) {
    case "ability-plus-level":
      result =
        abilityModifier +
        classLevel;
      break;

    case "ability-plus-half-level":
      result =
        abilityModifier +
        Math.floor(
          classLevel / 2,
        );
      break;
  }

  return Math.max(
    minimum,
    result,
  );
}

function getWizardSpellbookSpellCount(
  level: number,
): number {
  const safeLevel =
    Math.max(
      1,
      Math.floor(level),
    );

  return (
    6 +
    Math.max(
      0,
      safeLevel - 1,
    ) *
      2
  );
}