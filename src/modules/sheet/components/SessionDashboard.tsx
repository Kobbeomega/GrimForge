import { resolveCharacterTransformation, transformationApplicationLabels, transformationGroupLabels } from "../../../compendium/transformations/activeRecord";
import { useId, useState } from "react";
import { formatAbilityModifier } from "../../../compendium/core";
import type { SpellSlots } from "../../../compendium/spells";
import { calculateCharacterRules } from "../../../rules";
import type { CharacterArchiveEntry, CharacterVitals } from "../../archives/types";
import { createCharacterRuleInput } from "../rules/createCharacterRuleInput";
import { tableConditions } from "../tableConditions";
import type { CharacterDerivedStats } from "../utils/getCharacterDerivedStats";
import "../styles/session-dashboard.css";

interface SessionDashboardProps {
  character: CharacterArchiveEntry;
  vitals: CharacterVitals;
  derivedStats: CharacterDerivedStats;
  onDamage: (amount: number) => void;
  onHeal: (amount: number) => void;
  onShortRest: () => void;
  onLongRest: () => void;
  onToggleCondition: (id: string) => void;
  onNavigate: (section: "combat" | "magic") => void;
}

export function SessionDashboard({
  character, vitals, derivedStats, onDamage, onHeal, onShortRest, onLongRest, onToggleCondition, onNavigate,
}: SessionDashboardProps) {
  const [amount, setAmount] = useState("1");
  const headingId = useId();
  const numericAmount = Number(amount);
  const validAmount = Number.isSafeInteger(numericAmount) && numericAmount > 0;
  const activeConditions = new Set(character.conditionIds ?? []);
  const activeConditionList = tableConditions.filter((entry) => activeConditions.has(entry.id));
  const { classResources } = calculateCharacterRules(createCharacterRuleInput(character));
  const { spellSlots, pactSlots, enabled, spellSaveDifficultyClass, spellAttackBonus } = derivedStats.spellcasting;
  const spent = character.spellcasting?.slots;
  const spellLevels: (keyof SpellSlots)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const spellReserves = spellLevels.flatMap((level) => {
    const total = spellSlots[level] ?? 0;
    return total > 0 ? [{ label: `Grad ${level}`, available: Math.max(0, total - (spent?.spentSlots[level] ?? 0)), total }] : [];
  });
  if (pactSlots) spellReserves.push({
    label: `Pakt · Grad ${pactSlots.slotLevel}`, available: Math.max(0, pactSlots.slots - (spent?.spentPactSlots ?? 0)), total: pactSlots.slots,
  });
  const transformation=resolveCharacterTransformation(character);
  const attacks = derivedStats.equippedWeapons;
  const remainingDice = Math.max(0, character.level - (character.spentHitDice ?? 0));

  return <section className="table-board" aria-labelledby={headingId}>
    <h2 id={headingId}>Spieltisch</h2>
    <div className="table-board__core">
      <section className="table-board__hp" aria-label="Trefferpunkte">
        <h3>Trefferpunkte</h3>
        <div className="table-board__hp-line">
          <strong>{vitals.currentHitPoints} <span>/ {vitals.maximumHitPoints}</span></strong>
          {vitals.temporaryHitPoints > 0 && <span className="table-board__temporary">+{vitals.temporaryHitPoints} temporär</span>}
        </div>
        <progress value={Math.max(0, vitals.currentHitPoints)} max={Math.max(1, vitals.maximumHitPoints)} aria-label="Aktuelle Trefferpunkte" />
        <div className="table-board__hp-actions">
          <label>Betrag <input type="number" inputMode="numeric" min={1} step={1} value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
          <button type="button" disabled={!validAmount || (vitals.currentHitPoints <= 0 && vitals.temporaryHitPoints <= 0)} onClick={() => onDamage(numericAmount)}>Schaden</button>
          <button type="button" disabled={!validAmount || vitals.currentHitPoints >= vitals.maximumHitPoints} onClick={() => onHeal(numericAmount)}>Heilen</button>
        </div>
      </section>
      <dl className="table-board__metrics">
        <div><dt>Rüstungsklasse</dt><dd>{derivedStats.armorClass}</dd></div>
        <div><dt>Initiative</dt><dd>{formatAbilityModifier(vitals.initiativeModifier)}</dd></div>
        <div><dt>Bewegung</dt><dd>{derivedStats.speed} m</dd></div>
        <div><dt>Passive Wahrnehmung</dt><dd>{derivedStats.passivePerception}</dd></div>
        <div><dt>Übungsbonus</dt><dd>{formatAbilityModifier(derivedStats.proficiencyBonus)}</dd></div>
        <div><dt>Trefferwürfel frei</dt><dd>{remainingDice}/{character.level}</dd></div>
      </dl>
    </div>

    <div className="table-board__section table-board__status">
      <div className="table-board__badges" aria-label="Aktive Zustände">
        {activeConditionList.length ? activeConditionList.map(({ id, label }) => <span key={id}>{label}</span>) : <span>Keine Zustände</span>}
        {character.inspiration && <span>Inspiration</span>}
      </div>
      <div className="table-board__rest">
        <button type="button" onClick={onShortRest}>Kurze Rast</button>
        <button type="button" onClick={onLongRest}>Lange Rast</button>
      </div>
      <details className="table-board__condition-picker">
        <summary>Zustände ändern</summary>
        <div>{tableConditions.map(({ id, label, hint }) => <button key={id} type="button" aria-pressed={activeConditions.has(id)} onClick={() => onToggleCondition(id)}>
          <strong>{label}</strong><small>{hint}</small>
        </button>)}</div>
      </details>
    </div>

    {transformation.name && <section className="table-board__section" aria-label="Aktive Wandlung">
      <h3>Wandlung: {transformation.name}{transformation.stage>0 ? " · Stufe "+transformation.stage : ""}</h3>
      {transformation.warning && <p role="status">{transformation.warning}</p>}
      {transformation.features.length>0 && <details>
        <summary>{transformation.features.length} Merkmale · nicht in Grundwerten eingerechnet</summary>
        <ul>{transformation.features.map(f=><li key={f.id}><strong>{f.name}</strong> · {transformationGroupLabels[f.group]} · {transformationApplicationLabels[f.application]}<p>{f.description}</p></li>)}</ul>
      </details>}
    </section>}
    <div className="table-board__extras">
      {attacks.length > 0 && <section className="table-board__section">
        <div className="table-board__section-heading"><h3>Ausgerüstete Angriffe</h3><button type="button" onClick={() => onNavigate("combat")}>Kampf öffnen</button></div>
        <ul className="table-board__listing">{attacks.slice(0, 3).map((attack) => <li key={attack.id}><span>{attack.name}</span><strong>{attack.attackBonusLabel} · {attack.damage} {attack.damageType}{attack.criticalMinimum < 20 ? ` · Kritisch ${attack.criticalMinimum}–20` : ""}</strong></li>)}</ul>
      </section>}
      {enabled && <section className="table-board__section">
        <div className="table-board__section-heading"><h3>Zauber</h3><button type="button" onClick={() => onNavigate("magic")}>Zauber öffnen</button></div>
        <p className="table-board__spell-facts">SG <strong>{spellSaveDifficultyClass ?? "—"}</strong> · Angriff <strong>{spellAttackBonus !== undefined ? formatAbilityModifier(spellAttackBonus) : "—"}</strong></p>
        {spellReserves.length > 0 && <ul className="table-board__listing" aria-label="Verfügbare Zauberplätze">{spellReserves.map(({ label, available, total }) => <li key={label}><span>{label}</span><strong>{available}/{total} frei</strong></li>)}</ul>}
      </section>}
      {classResources.length > 0 && <section className="table-board__section">
        <h3>Klassenressourcen</h3>
        <ul className="table-board__listing">{classResources.map(({ id, name, remaining, maximum }) => <li key={id}><span>{name}</span><strong>{remaining}/{maximum} frei</strong></li>)}</ul>
      </section>}
    </div>
  </section>;
}
