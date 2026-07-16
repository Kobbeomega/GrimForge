import type {
  CharacterAncestry,
} from "../../../compendium/ancestries";
import type {
  CharacterClass,
} from "../../../compendium/classes";
import type {
  EquipmentDefinition,
  WeaponItem,
} from "../../../compendium/equipment";
import type {
  SpellDefinition,
} from "../../../compendium/spells";
import type {
  TransformationDefinition,
} from "../../../compendium/transformations";
import type { CompendiumEntry } from "../types";

const schoolLabels: Record<string, string> = {
  abjuration: "Bannmagie",
  conjuration: "Beschwörung",
  divination: "Erkenntnismagie",
  enchantment: "Verzauberung",
  evocation: "Hervorrufung",
  illusion: "Illusion",
  necromancy: "Nekromantie",
  transmutation: "Verwandlung",
};

const damageTypeLabels: Record<string, string> = {
  slashing: "Hieb",
  piercing: "Stich",
  bludgeoning: "Wucht",
};

function formatPrice(price: number) {
  if (price >= 1) return `${price} GM`;
  const silver = price * 10;
  return Number.isInteger(silver) ? `${silver} SM` : `${Math.round(price * 100)} KM`;
}

function formatDamage(damage: WeaponItem["damage"]) {
  return `${damage.dice}W${damage.die} ${damageTypeLabels[damage.type] ?? damage.type}`;
}

export interface ComparisonRow {
  label: string;
  values: string[];
}

export function getComparisonRows(entries: CompendiumEntry[]): ComparisonRow[] {
  if (entries.length === 0) return [];
  const first = entries[0];

  if ("hitDie" in first) {
    const classes = entries as CharacterClass[];
    return [
      { label: "Trefferwürfel", values: classes.map((entry) => `W${entry.hitDie}`) },
      { label: "Primärattribute", values: classes.map((entry) => entry.primaryAbilities.join(", ")) },
      { label: "Rettungswürfe", values: classes.map((entry) => entry.savingThrows.join(", ")) },
      { label: "Zauberwirken", values: classes.map((entry) => entry.spellcasting ? "Ja" : "Nein") },
      { label: "Unterklassen", values: classes.map((entry) => String(entry.subclasses.length)) },
      { label: "Merkmale", values: classes.map((entry) => String(entry.features?.length ?? 0)) },
    ];
  }

  if ("stages" in first) {
    const transformations = entries as TransformationDefinition[];
    return [
      { label: "Thema", values: transformations.map((entry) => entry.theme) },
      { label: "Ursprung", values: transformations.map((entry) => entry.origin) },
      { label: "Stufen", values: transformations.map((entry) => String(entry.stages.length)) },
      {
        label: "Gaben",
        values: transformations.map((entry) => String(entry.stages.reduce((total, stage) => total + (stage.automaticFeatures?.length ?? 0) + (stage.boons?.length ?? 0), 0))),
      },
      {
        label: "Makel",
        values: transformations.map((entry) => String(entry.stages.reduce((total, stage) => total + (stage.flaws?.length ?? 0), 0))),
      },
    ];
  }

  if ("level" in first && "school" in first) {
    const spells = entries as SpellDefinition[];
    return [
      { label: "Grad", values: spells.map((entry) => entry.level === 0 ? "Zaubertrick" : String(entry.level)) },
      { label: "Schule", values: spells.map((entry) => schoolLabels[entry.school] ?? entry.school) },
      { label: "Wirkzeit", values: spells.map((entry) => entry.castingTime) },
      { label: "Reichweite", values: spells.map((entry) => entry.range) },
      { label: "Dauer", values: spells.map((entry) => entry.duration) },
      { label: "Konzentration", values: spells.map((entry) => entry.concentration ? "Ja" : "Nein") },
      { label: "Ritual", values: spells.map((entry) => entry.ritual ? "Ja" : "Nein") },
    ];
  }

  if ("category" in first) {
    const equipment = entries as EquipmentDefinition[];
    return [
      { label: "Kategorie", values: equipment.map((entry) => entry.category) },
      { label: "Gewicht", values: equipment.map((entry) => `${entry.weight} lb`) },
      { label: "Preis", values: equipment.map((entry) => formatPrice(entry.price)) },
      {
        label: "Schaden / RK",
        values: equipment.map((entry) => entry.category === "weapon" ? formatDamage(entry.damage) : entry.category === "armor" || entry.category === "shield" ? `RK ${entry.armorClass}` : "—"),
      },
      {
        label: "Eigenschaften",
        values: equipment.map((entry) => entry.category === "weapon" ? (entry.properties.join(", ") || "—") : entry.category === "armor" || entry.category === "shield" ? [entry.dexterityModifier ? "GE-Bonus" : "Kein GE-Bonus", entry.stealthDisadvantage ? "Heimlichkeitsnachteil" : null].filter(Boolean).join(", ") : "—"),
      },
    ];
  }

  const ancestries = entries as CharacterAncestry[];
  return [
    { label: "Größe", values: ancestries.map((entry) => entry.size === "small" ? "Klein" : "Mittel") },
    { label: "Bewegung", values: ancestries.map((entry) => `${entry.speed} m`) },
    { label: "Dunkelsicht", values: ancestries.map((entry) => entry.darkvision ? `${entry.darkvision} m` : "—") },
    { label: "Varianten", values: ancestries.map((entry) => String(entry.variants.length)) },
    { label: "Merkmale", values: ancestries.map((entry) => entry.traits.join(", ")) },
    { label: "Sprachen", values: ancestries.map((entry) => entry.languages.join(", ") || "—") },
  ];
}
