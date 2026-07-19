import {
  phase1Coverage,
  sourceArmor2014,
  sourceBackgrounds2014,
  sourceSpellsLevel0To3,
  sourceWeapons2014,
} from "../content/phase1";

const duplicateIds = (ids: readonly string[]) =>
  [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];

export function runPhase1ContentAudit(): void {
  const duplicates = {
    spells: duplicateIds(sourceSpellsLevel0To3.map((entry) => entry.app_id)),
    backgrounds: duplicateIds(sourceBackgrounds2014.map((entry) => entry.app_id)),
    weapons: duplicateIds(sourceWeapons2014.map((entry) => entry.app_id)),
    armor: duplicateIds(sourceArmor2014.map((entry) => entry.app_id)),
  };

  console.groupCollapsed("[GrimForge] Phase-1-Content-Audit");
  console.table(phase1Coverage.source);
  console.info("Noch für Phase 2 zu integrieren:", phase1Coverage.pendingForPhase2);
  const hasDuplicates = Object.values(duplicates).some((entries) => entries.length > 0);
  if (hasDuplicates) console.warn("Doppelte Quell-IDs:", duplicates);
  else console.info("Keine doppelten Quell-IDs gefunden.");
  console.groupEnd();
}
