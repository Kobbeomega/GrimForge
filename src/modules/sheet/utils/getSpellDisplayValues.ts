import {
  abilityLabels,
  formatAbilityModifier,
} from "../../../compendium/core";

import type {
  AbilityId,
} from "../../../compendium/core";

import type {
  SpellDamageType,
  SpellDefinition,
  SpellDice,
} from "../../../compendium/spells";

export interface SpellDisplayValues {
  damage?: {
    dice: string;
    type: string;
  };

  healing?: {
    dice: string;
    modifier: number;
    formatted: string;
  };

  savingThrow?: {
    abilityId: AbilityId;
    abilityLabel: string;
    difficultyClass?: number;
    resultOnSuccess: string;
  };

  usesSpellAttack: boolean;

  spellAttackBonus?: number;

  spellAttackLabel?: string;
}

interface GetSpellDisplayValuesOptions {
  spell: SpellDefinition;

  characterLevel: number;

  spellcastingAbilityModifier?: number;

  spellAttackBonus?: number;

  spellSaveDifficultyClass?: number;
}

const damageTypeLabels: Record<
  SpellDamageType,
  string
> = {
  acid: "Säure",
  bludgeoning: "Wucht",
  cold: "Kälte",
  fire: "Feuer",
  force: "Energie",
  lightning: "Blitz",
  necrotic: "Nekrotisch",
  piercing: "Stich",
  poison: "Gift",
  psychic: "Psychisch",
  radiant: "Strahlend",
  slashing: "Hieb",
  thunder: "Donner",
};

export function getSpellDisplayValues({
  spell,
  characterLevel,
  spellcastingAbilityModifier = 0,
  spellAttackBonus,
  spellSaveDifficultyClass,
}: GetSpellDisplayValuesOptions): SpellDisplayValues {
  const damageDice =
    spell.damage?.dice
      ? getScaledSpellDice(
          spell,
          characterLevel,
        )
      : undefined;

  const damage = damageDice
    ? {
        dice: formatSpellDice(
          damageDice,
        ),

        type:
          damageTypeLabels[
            spell.damage!.damageType
          ],
      }
    : undefined;

  const healing = spell.healing
    ? {
        dice: formatSpellDice(
          spell.healing.dice,
        ),

        modifier:
          spellcastingAbilityModifier,

        formatted:
          formatHealingValue(
            spell.healing.dice,
            spellcastingAbilityModifier,
          ),
      }
    : undefined;

  const savingThrowAbility =
    spell.damage
      ?.savingThrowAbility;

  const savingThrow =
    savingThrowAbility
      ? {
          abilityId:
            savingThrowAbility,

          abilityLabel:
            abilityLabels[
              savingThrowAbility
            ],

          difficultyClass:
            spellSaveDifficultyClass,

          resultOnSuccess:
            spell.damage
              ?.halfDamageOnSave
              ? "Halber Schaden bei Erfolg"
              : "Kein Schaden bei Erfolg",
        }
      : undefined;

  /*
   * Direkter Zauberangriff:
   * Der Zauber verursacht Schaden, verlangt
   * aber keinen Rettungswurf.
   *
   * Automatisch treffende Zauber wie
   * Magisches Geschoss sind eine Ausnahme.
   */
  const usesSpellAttack =
    Boolean(spell.damage) &&
    !savingThrowAbility &&
    spell.id !== "magic-missile";

  return {
    damage,
    healing,
    savingThrow,

    usesSpellAttack,

    spellAttackBonus:
      usesSpellAttack
        ? spellAttackBonus
        : undefined,

    spellAttackLabel:
      usesSpellAttack &&
      typeof spellAttackBonus ===
        "number"
        ? formatAbilityModifier(
            spellAttackBonus,
          )
        : undefined,
  };
}

export function getScaledSpellDice(
  spell: SpellDefinition,
  characterLevel: number,
): SpellDice {
  const baseDice =
    spell.damage?.dice;

  if (!baseDice) {
    return {
      dice: 0,
      die: 0,
    };
  }

  if (
    spell.level !== 0 ||
    !spell.scaling ||
    spell.scaling.length === 0
  ) {
    return {
      ...baseDice,
    };
  }

  const safeCharacterLevel =
    Math.max(
      1,
      Math.floor(
        characterLevel,
      ),
    );

  const applicableScaling =
    spell.scaling
      .filter(
        (entry) =>
          entry.characterLevel <=
          safeCharacterLevel,
      )
      .sort(
        (left, right) =>
          right.characterLevel -
          left.characterLevel,
      )[0];

  return applicableScaling
    ? {
        ...applicableScaling.dice,
      }
    : {
        ...baseDice,
      };
}

export function formatSpellDice(
  dice: SpellDice,
): string {
  if (
    dice.dice <= 0 ||
    dice.die <= 0
  ) {
    return "—";
  }

  return `${dice.dice}W${dice.die}`;
}

function formatHealingValue(
  dice: SpellDice,
  modifier: number,
): string {
  const base =
    formatSpellDice(dice);

  if (modifier === 0) {
    return base;
  }

  return modifier > 0
    ? `${base} +${modifier}`
    : `${base} ${modifier}`;
}