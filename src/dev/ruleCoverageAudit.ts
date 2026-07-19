import { ancestries } from "../compendium/ancestries";
import { backgrounds } from "../compendium/backgrounds";
import { classes } from "../compendium/classes";
import { equipment } from "../compendium/equipment";
import { classSpellcastingDefinitions, spells } from "../compendium/spells";
import { CURRENT_CHARACTER_SCHEMA_VERSION } from "../migrations/characterSchema";

export interface RuleCoverageCheck {
  id: string;
  label: string;
  ok: boolean;
  details: string;
}

export function getRuleCoverageReport(): RuleCoverageCheck[] {
  const ancestryBonuses = ancestries.filter((entry) =>
    Object.keys(entry.abilityBonuses).length > 0 || Boolean(entry.abilityBonusChoice),
  ).length;
  const backgroundRules = backgrounds.filter((entry) =>
    entry.skillProficiencies.length > 0 && Boolean(entry.feature?.name),
  ).length;
  const classRules = classes.filter((entry) =>
    entry.hitDie > 0 && entry.savingThrows.length === 2 && (entry.features?.length ?? 0) > 0,
  ).length;
  const spellClassIds = new Set(classSpellcastingDefinitions.map((entry) => entry.classId));
  const spellcasters = classes.filter((entry) => entry.spellcasting).map((entry) => entry.id);
  const invalidSpellReferences = spells.flatMap((spell) =>
    spell.classIds.filter((classId) => !classes.some((entry) => entry.id === classId)),
  );

  return [
    { id: "schema", label: "Charakter-Migration", ok: CURRENT_CHARACTER_SCHEMA_VERSION >= 2, details: `Schema v${CURRENT_CHARACTER_SCHEMA_VERSION}` },
    { id: "ancestry", label: "Abstammungsboni", ok: ancestryBonuses === ancestries.length, details: `${ancestryBonuses}/${ancestries.length}` },
    { id: "background", label: "Hintergrundeffekte", ok: backgroundRules === backgrounds.length, details: `${backgroundRules}/${backgrounds.length}` },
    { id: "class", label: "Klassenregeln", ok: classRules === classes.length, details: `${classRules}/${classes.length}` },
    { id: "spellcasting", label: "Zauberklassen", ok: spellcasters.every((id) => spellClassIds.has(id)), details: `${spellClassIds.size} Definitionen` },
    { id: "spells", label: "Zauberreferenzen", ok: invalidSpellReferences.length === 0, details: `${spells.length} Zauber` },
    { id: "equipment", label: "Ausrüstungsregeln", ok: equipment.every((entry) => entry.weight >= 0 && entry.price >= 0), details: `${equipment.length} Einträge` },
  ];
}

export function runRuleCoverageAudit(): void {
  const report = getRuleCoverageReport();
  const failing = report.filter((entry) => !entry.ok);
  console.groupCollapsed(`[GrimForge Rule Coverage] ${failing.length === 0 ? "OK" : `${failing.length} offene Prüfungen`}`);
  console.table(report);
  console.groupEnd();
}
