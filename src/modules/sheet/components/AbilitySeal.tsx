import {
  abilityLabels,
  abilityShortLabels,
  formatAbilityModifier,
  getAbilityModifier,
  type AbilityId,
} from "../../../compendium/core";

interface AbilitySealProps {
  abilityId: AbilityId;
  value: number;
}

export function AbilitySeal({
  abilityId,
  value,
}: AbilitySealProps) {
  return (
    <article className="ability-seal">
      <span
        className="ability-seal__glyph"
        aria-hidden="true"
      >
        ◆
      </span>

      <small className="ability-seal__short-label">
        {abilityShortLabels[abilityId]}
      </small>

      <strong className="ability-seal__value">
        {value}
      </strong>

      <span className="ability-seal__modifier">
        {formatAbilityModifier(
          getAbilityModifier(value),
        )}
      </span>

      <footer className="ability-seal__label">
        {abilityLabels[abilityId]}
      </footer>
    </article>
  );
}