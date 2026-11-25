import { getCharacterPathChoiceSummary, getGrantedSubclassSpellIds } from "../../compendium/classes";
import { abilityIds, abilityLabels, defaultAbilityScores } from "../../compendium/core";
import { getSpellById } from "../../compendium/spells";
import { calculateCharacterRules } from "../../rules";
import type { CharacterArchiveEntry } from "../archives/types";
import { createCharacterRuleInput } from "../sheet/rules/createCharacterRuleInput";
import { getSpellcastingStats } from "../sheet/utils/getSpellcastingStats";
import { getSubclassSheetStats } from "../sheet/utils/getSubclassSheetStats";
import { getBeastCompanion } from "../sheet/utils/getBeastCompanion";

function getSpellIds(character: CharacterArchiveEntry): Set<string> {
  return new Set([
    ...(character.spellcasting?.spellIds.map(({ spellId }) => spellId) ?? []),
    ...getGrantedSubclassSpellIds({ ...character, classId: character.classId ?? "" }),
  ]);
}

export function getLevelUpChanges(before: CharacterArchiveEntry, after: CharacterArchiveEntry) {
  const entries: { label: string; value: string }[] = [];
  const oldRules = calculateCharacterRules(createCharacterRuleInput(before));
  const newRules = calculateCharacterRules(createCharacterRuleInput(after));
  const oldSpellStats = getSpellcastingStats(before);
  const newSpellStats = getSpellcastingStats(after);

  for (const id of abilityIds) {
    const oldScore = before.abilityScores?.[id] ?? defaultAbilityScores[id];
    const newScore = after.abilityScores?.[id] ?? defaultAbilityScores[id];
    if (oldScore !== newScore) entries.push({ label: abilityLabels[id], value: `${oldScore} → ${newScore}` });
  }
  if (oldRules.speed !== newRules.speed) entries.push({ label: "Bewegung mit aktueller Ausrüstung", value: `${oldRules.speed} → ${newRules.speed} m` });
  if (oldRules.armorClass.armorClass !== newRules.armorClass.armorClass) entries.push({ label: "Rüstungsklasse", value: `${oldRules.armorClass.armorClass} → ${newRules.armorClass.armorClass}` });
  const previousStats = new Map(getSubclassSheetStats(before).map(({ label, value }) => [label, value]));
  for (const { label, value } of getSubclassSheetStats(after)) {
    const previous = previousStats.get(label);
    if (previous !== value) entries.push({ label, value: previous ? `${previous} → ${value}` : value });
  }
  const previousBeast = getBeastCompanion(before);
  const beast = getBeastCompanion(after);
  if (beast && (beast.name !== previousBeast?.name || beast.hp !== previousBeast.hp || beast.armor !== previousBeast.armor)) {
    entries.push({ label: `Tiergefährte · ${beast.name}`, value: `RK ${beast.armor} · ${beast.hp} maximale TP` });
  }
  if (before.vitals && after.vitals && before.vitals.initiativeModifier !== after.vitals.initiativeModifier) {
    entries.push({ label: "Initiative", value: `${before.vitals.initiativeModifier} → ${after.vitals.initiativeModifier}` });
  }

  const oldChoices = new Map(getCharacterPathChoiceSummary(before.pathChoices).map((entry) => [entry.id, entry.selections]));
  for (const { id, name, selections } of getCharacterPathChoiceSummary(after.pathChoices)) {
    const previous = oldChoices.get(id) ?? [];
    const added = selections.filter((selection) => !previous.some((item) => item.id === selection.id)).map((selection) => selection.name);
    const removed = previous.filter((selection) => !selections.some((item) => item.id === selection.id)).map((selection) => selection.name);
    if (added.length || removed.length) entries.push({
      label: name, value: [added.length ? `Neu: ${added.join(", ")}` : "", removed.length ? `Ersetzt: ${removed.join(", ")}` : ""].filter(Boolean).join(" · "),
    });
  }
  const oldSpells = getSpellIds(before);
  const newSpells = getSpellIds(after);
  const addedSpells = [...newSpells].filter((id) => !oldSpells.has(id));
  const removedSpells = [...oldSpells].filter((id) => !newSpells.has(id));
  for (const [label, ids] of [["Neue Zauber", addedSpells], ["Entfernte Zauber", removedSpells]] as const) {
    if (ids.length) entries.push({ label, value: ids.map((id) => getSpellById(id)?.name ?? id).join(", ") });
  }
  const oldPreparation = new Map(before.spellcasting?.spellIds.map(({ spellId, prepared }) => [spellId, prepared] as const));
  const switchedPreparation = (after.spellcasting?.spellIds ?? []).filter(({ spellId, prepared }) =>
    oldPreparation.has(spellId) && oldPreparation.get(spellId) !== prepared && (getSpellById(spellId)?.level ?? 0) > 0);
  if (switchedPreparation.length) entries.push({
    label: "Vorbereitung geändert", value: switchedPreparation.map(({ spellId, prepared }) =>
      `${getSpellById(spellId)?.name ?? spellId}: ${prepared ? "vorbereitet" : "nicht vorbereitet"}`).join(" · "),
  });
  const oldFeatures = new Map(oldRules.classFeatures.map((feature) => [feature.id, feature.description]));
  const newFeatures = newRules.classFeatures
    .filter((feature) => !feature.id.startsWith("path-choice:") && oldFeatures.get(feature.id) !== feature.description)
    .map((feature) => feature.name);
  if (newFeatures.length) entries.push({ label: "Neue oder verbesserte Merkmale", value: newFeatures.join(", ") });
  const describeSlots = (stats: ReturnType<typeof getSpellcastingStats>) => stats.pactSlots
    ? `${stats.pactSlots.slots} Paktplätze (Grad ${stats.pactSlots.slotLevel})`
    : Object.entries(stats.spellSlots).map(([grade, count]) => `Grad ${grade}: ${count}`).join(", ") || "—";
  if (describeSlots(oldSpellStats) !== describeSlots(newSpellStats)) entries.push({
    label: "Zauberplätze", value: `${describeSlots(oldSpellStats)} → ${describeSlots(newSpellStats)}`,
  });
  for (const resource of newRules.classResources) {
    const previous = oldRules.classResources.find((entry) => entry.id === resource.id);
    if (previous?.maximum !== resource.maximum || previous?.recharge !== resource.recharge) {
      const recharge = { "short-rest": "kurze Rast", "long-rest": "lange Rast", turn: "Zug" }[resource.recharge];
      entries.push({ label: resource.name, value: `${previous ? `${previous.maximum} → ` : ""}${resource.maximum} · ${recharge}` });
    }
  }
  return entries;
}

export function LevelUpReview({ before, after }: { before: CharacterArchiveEntry; after: CharacterArchiveEntry }) {
  const changes = getLevelUpChanges(before, after);
  return changes.length > 0 ? <dl className="level-up__summary">
    {changes.map(({ label, value }, index) => <div key={`${label}-${index}`}><dt>{label}</dt><dd>{value}</dd></div>)}
  </dl> : null;
}
