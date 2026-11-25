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
    note?: string;
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
  attackCount?: number;

  spellAttackBonus?: number;

  spellAttackLabel?: string;
}

interface GetSpellDisplayValuesOptions {
  spell: SpellDefinition;
  lifeDomainHealing?: boolean;
  invocations?: string | string[];

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
  lifeDomainHealing = false,
  invocations = [],
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
        dice: spell.damage?.flatModifier ? formatDiceWithModifier(damageDice,spell.damage.flatModifier) : spell.damage?.addsCastingModifier || (spell.id === "eldritch-blast" && (Array.isArray(invocations) ? invocations : [invocations]).includes("agonizing-blast"))
          ? formatDiceWithModifier(damageDice, spellcastingAbilityModifier)
          : formatSpellDice(damageDice),

        type: (spell.damage!.selectableTypes ?? [spell.damage!.damageType, spell.damage!.alternativeDamageType])
          .flatMap((id) => id ? [damageTypeLabels[id]] : []).join(" oder "),
        note: spell.damageNote,
      }
    : undefined;

  const healingModifier = (spell.healing?.addsCastingModifier === false ? 0 : spellcastingAbilityModifier) +
    (lifeDomainHealing && spell.level > 0 ? 2 + spell.level : 0);
  const healing = spell.healing
    ? {
        dice: formatSpellDice(
          spell.healing.dice,
        ),

        modifier:
          healingModifier,

        formatted:
          formatDiceWithModifier(
            spell.healing.dice,
            healingModifier,
          ),
      }
    : undefined;

  const savingThrowAbility =
    spell.savingThrowAbility ?? spell.damage
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
            spell.savingThrowNote ?? (spell.damage?.halfDamageOnSave
              ? "Halber Schaden bei Erfolg"
              : spell.damage?.savingThrowAbility === savingThrowAbility ? "Kein Schaden bei Erfolg" : ""),
        }
      : undefined;

  const usesSpellAttack = spell.attackRoll === true;

  return {
    damage,
    healing,
    savingThrow,

    usesSpellAttack,
    attackCount: spell.numberOfAttacks?.(characterLevel),

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

function formatDiceWithModifier(
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
