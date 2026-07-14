import {
  abilityIds,
  type AbilityScores,
} from "../../../compendium/core";

import { AbilitySeal } from "./AbilitySeal";

interface AbilitySealGridProps {
  values: AbilityScores;
}

export function AbilitySealGrid({
  values,
}: AbilitySealGridProps) {
  return (
    <section
      className="ability-seal-grid"
      aria-label="Attribute"
    >
      {abilityIds.map((abilityId) => (
        <AbilitySeal
          key={abilityId}
          abilityId={abilityId}
          value={values[abilityId]}
        />
      ))}
    </section>
  );
}