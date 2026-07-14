import type {
  AbilityId,
} from "../core";

export const skillIds = [
  "acrobatics",
  "animal-handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight-of-hand",
  "stealth",
  "survival",
] as const;

export type SkillId =
  (typeof skillIds)[number];

export interface SkillDefinition {
  id: SkillId;

  name: string;

  shortName: string;

  abilityId: AbilityId;

  description: string;
}

export function isSkillId(
  value: unknown,
): value is SkillId {
  return (
    typeof value === "string" &&
    skillIds.includes(
      value as SkillId,
    )
  );
}