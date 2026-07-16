import {
  ClassRulesPanel,
} from "./ClassRulesPanel";

import {
  RuleSummaryPanel,
} from "./RuleSummaryPanel";

import {
  SkillRulesPanel,
} from "./SkillRulesPanel";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface CharacterRulesSectionProps {
  character: CharacterArchiveEntry;

  onSpendClassResource: (
    resourceId: string,
    maximum: number,
  ) => void;

  onRestoreClassResource: (
    resourceId: string,
  ) => void;
}

export function CharacterRulesSection({
  character,
  onSpendClassResource,
  onRestoreClassResource,
}: CharacterRulesSectionProps) {
  return (
    <div className="character-rules-section">
      <RuleSummaryPanel
        character={character}
      />

      <SkillRulesPanel
        character={character}
      />

      <ClassRulesPanel
        character={character}
        onSpendResource={
          onSpendClassResource
        }
        onRestoreResource={
          onRestoreClassResource
        }
      />
    </div>
  );
}
