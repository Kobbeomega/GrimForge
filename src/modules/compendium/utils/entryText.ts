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

export function formatCompendiumEntryText(entry: CompendiumEntry): string {
  const lines = [entry.name.toUpperCase()];

  if (entry.description) {
    lines.push("", entry.description);
  }

  if ("hitDie" in entry) {
    lines.push(
      "",
      `Trefferwürfel: W${entry.hitDie}`,
      `Rettungswürfe: ${entry.savingThrows.join(", ")}`,
      `Rüstungen: ${entry.armorProficiencies.join(", ") || "—"}`,
      `Waffen: ${entry.weaponProficiencies.join(", ") || "—"}`,
    );
    if (entry.features?.length) {
      lines.push("", "Merkmale:", ...entry.features.map((feature) => `- ${feature.name}: ${feature.description}`));
    }
  } else if ("stages" in entry) {
    lines.push("", `Thema: ${entry.theme}`, `Ursprung: ${entry.origin}`);
    for (const stage of entry.stages) {
      lines.push("", `Stufe ${stage.stage} – ${stage.title}`, stage.description);
    }
  } else if ("level" in entry && "school" in entry) {
    lines.push(
      "",
      `Grad: ${entry.level === 0 ? "Zaubertrick" : entry.level}`,
      `Schule: ${schoolLabels[entry.school] ?? entry.school}`,
      `Wirkzeit: ${entry.castingTime}`,
      `Reichweite: ${entry.range}`,
      `Dauer: ${entry.duration}`,
      `Komponenten: ${[
        entry.components.verbal ? "V" : null,
        entry.components.somatic ? "G" : null,
        entry.components.material ? "M" : null,
      ].filter(Boolean).join(", ") || "—"}`,
    );
    if (entry.rulesText) lines.push("", "Kurzregel (EN):", entry.rulesText);
    if (entry.higherLevels) lines.push("", "Hochstufung / Skalierung:", entry.higherLevels);
    if (entry.sourceLabel) lines.push("", `Quelle: ${entry.sourceLabel}${entry.sourcePage ? ` · PDF-Seite ${entry.sourcePage}` : ""}`);
  } else if ("category" in entry) {
    lines.push("", `Gewicht: ${entry.weight} lb`, `Preis: ${formatPrice(entry.price)}`);
    if (entry.category === "weapon") {
      lines.push(
        `Schaden: ${entry.damage.dice}W${entry.damage.die} ${damageTypeLabels[entry.damage.type] ?? entry.damage.type}`,
        `Eigenschaften: ${entry.properties.join(", ") || "—"}`,
      );
    }
    if (entry.category === "armor" || entry.category === "shield") {
      lines.push(`Rüstungsklasse: ${entry.armorClass}`);
    }
  } else if ("speed" in entry) {
    lines.push(
      "",
      `Größe: ${entry.size === "small" ? "Klein" : "Mittel"}`,
      `Bewegung: ${entry.speed} m`,
      `Dunkelsicht: ${entry.darkvision ? `${entry.darkvision} m` : "—"}`,
      `Sprachen: ${entry.languages.join(", ") || "—"}`,
      "",
      "Merkmale:",
      ...entry.traits.map((trait) => `- ${trait}`),
    );
  }

  return lines.join("\n");
}
