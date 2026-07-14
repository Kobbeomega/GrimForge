import {
  skillIds,
  type SkillId,
} from "../skills";

export interface ClassSkillChoiceDefinition {
  classId: string;

  choose: number;

  options: SkillId[];
}

export const classSkillChoices: ClassSkillChoiceDefinition[] =
  [
    {
      classId: "barbarian",
      choose: 2,
      options: [
        "animal-handling",
        "athletics",
        "intimidation",
        "nature",
        "perception",
        "survival",
      ],
    },

    {
      classId: "bard",
      choose: 3,
      options: [
        ...skillIds,
      ],
    },

    {
      classId: "cleric",
      choose: 2,
      options: [
        "history",
        "insight",
        "medicine",
        "persuasion",
        "religion",
      ],
    },

    {
      classId: "druid",
      choose: 2,
      options: [
        "arcana",
        "animal-handling",
        "insight",
        "medicine",
        "nature",
        "perception",
        "religion",
        "survival",
      ],
    },

    {
      classId: "fighter",
      choose: 2,
      options: [
        "acrobatics",
        "animal-handling",
        "athletics",
        "history",
        "insight",
        "intimidation",
        "perception",
        "survival",
      ],
    },

    {
      classId: "monk",
      choose: 2,
      options: [
        "acrobatics",
        "athletics",
        "history",
        "insight",
        "religion",
        "stealth",
      ],
    },

    {
      classId: "paladin",
      choose: 2,
      options: [
        "athletics",
        "insight",
        "intimidation",
        "medicine",
        "persuasion",
        "religion",
      ],
    },

    {
      classId: "ranger",
      choose: 3,
      options: [
        "animal-handling",
        "athletics",
        "insight",
        "investigation",
        "nature",
        "perception",
        "stealth",
        "survival",
      ],
    },

    {
      classId: "rogue",
      choose: 4,
      options: [
        "acrobatics",
        "athletics",
        "deception",
        "insight",
        "intimidation",
        "investigation",
        "perception",
        "performance",
        "persuasion",
        "sleight-of-hand",
        "stealth",
      ],
    },

    {
      classId: "sorcerer",
      choose: 2,
      options: [
        "arcana",
        "deception",
        "insight",
        "intimidation",
        "persuasion",
        "religion",
      ],
    },

    {
      classId: "warlock",
      choose: 2,
      options: [
        "arcana",
        "deception",
        "history",
        "intimidation",
        "investigation",
        "nature",
        "religion",
      ],
    },

    {
      classId: "wizard",
      choose: 2,
      options: [
        "arcana",
        "history",
        "insight",
        "investigation",
        "medicine",
        "religion",
      ],
    },
  ];

export function getClassSkillChoice(
  classId: string,
): ClassSkillChoiceDefinition | undefined {
  return classSkillChoices.find(
    (definition) =>
      definition.classId === classId,
  );
}