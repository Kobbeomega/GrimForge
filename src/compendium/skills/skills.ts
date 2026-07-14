import type {
  SkillDefinition,
  SkillId,
} from "./types";

export const skills: SkillDefinition[] = [
  {
    id: "acrobatics",
    name: "Akrobatik",
    shortName: "Akrobatik",
    abilityId: "dexterity",
    description:
      "Balance, Körperbeherrschung und akrobatische Bewegungen.",
  },
  {
    id: "animal-handling",
    name: "Mit Tieren umgehen",
    shortName: "Tierkunde",
    abilityId: "wisdom",
    description:
      "Tiere beruhigen, führen und ihr Verhalten einschätzen.",
  },
  {
    id: "arcana",
    name: "Arkane Kunde",
    shortName: "Arkane Kunde",
    abilityId: "intelligence",
    description:
      "Wissen über Magie, Zauber, Ebenen und arkane Traditionen.",
  },
  {
    id: "athletics",
    name: "Athletik",
    shortName: "Athletik",
    abilityId: "strength",
    description:
      "Klettern, Springen, Schwimmen und körperliche Kraftakte.",
  },
  {
    id: "deception",
    name: "Täuschen",
    shortName: "Täuschen",
    abilityId: "charisma",
    description:
      "Lügen, falsche Absichten verbergen und andere irreführen.",
  },
  {
    id: "history",
    name: "Geschichte",
    shortName: "Geschichte",
    abilityId: "intelligence",
    description:
      "Wissen über Reiche, Kriege, Kulturen und vergangene Ereignisse.",
  },
  {
    id: "insight",
    name: "Motiv erkennen",
    shortName: "Motiv erkennen",
    abilityId: "wisdom",
    description:
      "Gefühle, Absichten und mögliche Unwahrheiten erkennen.",
  },
  {
    id: "intimidation",
    name: "Einschüchtern",
    shortName: "Einschüchtern",
    abilityId: "charisma",
    description:
      "Andere durch Drohungen, Auftreten oder Gewaltbereitschaft beeinflussen.",
  },
  {
    id: "investigation",
    name: "Nachforschungen",
    shortName: "Nachforschen",
    abilityId: "intelligence",
    description:
      "Hinweise verbinden, Mechanismen verstehen und verborgene Zusammenhänge erkennen.",
  },
  {
    id: "medicine",
    name: "Heilkunde",
    shortName: "Heilkunde",
    abilityId: "wisdom",
    description:
      "Verletzungen einschätzen, Verwundete stabilisieren und Krankheiten erkennen.",
  },
  {
    id: "nature",
    name: "Naturkunde",
    shortName: "Naturkunde",
    abilityId: "intelligence",
    description:
      "Wissen über Tiere, Pflanzen, Gelände und natürliche Kreisläufe.",
  },
  {
    id: "perception",
    name: "Wahrnehmung",
    shortName: "Wahrnehmung",
    abilityId: "wisdom",
    description:
      "Geräusche, Bewegungen und andere unmittelbare Hinweise bemerken.",
  },
  {
    id: "performance",
    name: "Auftreten",
    shortName: "Auftreten",
    abilityId: "charisma",
    description:
      "Ein Publikum durch Musik, Schauspiel, Rede oder Kunst unterhalten.",
  },
  {
    id: "persuasion",
    name: "Überzeugen",
    shortName: "Überzeugen",
    abilityId: "charisma",
    description:
      "Andere durch Argumente, Diplomatie und glaubwürdiges Auftreten beeinflussen.",
  },
  {
    id: "religion",
    name: "Religion",
    shortName: "Religion",
    abilityId: "intelligence",
    description:
      "Wissen über Götter, Kulte, Rituale und religiöse Überlieferungen.",
  },
  {
    id: "sleight-of-hand",
    name: "Fingerfertigkeit",
    shortName: "Fingerfertigkeit",
    abilityId: "dexterity",
    description:
      "Unauffällige Handbewegungen, Taschenspielerei und geschicktes Manipulieren.",
  },
  {
    id: "stealth",
    name: "Heimlichkeit",
    shortName: "Heimlichkeit",
    abilityId: "dexterity",
    description:
      "Sich leise bewegen, verstecken und unbemerkt bleiben.",
  },
  {
    id: "survival",
    name: "Überlebenskunst",
    shortName: "Überleben",
    abilityId: "wisdom",
    description:
      "Spuren verfolgen, Nahrung finden und Gefahren der Wildnis bewältigen.",
  },
];

export const skillsById: Record<
  SkillId,
  SkillDefinition
> = Object.fromEntries(
  skills.map((skill) => [
    skill.id,
    skill,
  ]),
) as Record<
  SkillId,
  SkillDefinition
>;

export function getSkillById(
  skillId: SkillId,
): SkillDefinition {
  return skillsById[skillId];
}