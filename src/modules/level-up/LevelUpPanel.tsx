import { useState } from "react";
import { getCharacterClassFeatures, getCharacterPathChoices, getClassById, getClassSubclassUnlockLevel, getSubclassUnlockLevel } from "../../compendium/classes";
import { defaultAbilityScores, getAbilityModifier, getProficiencyBonus } from "../../compendium/core";
import { GrimButton } from "../../components/ui/GrimButton";
import type { CharacterArchiveEntry } from "../archives/types";
import { SpellsStep } from "../creator/components/steps/SpellStep";
import { getSpellSelectionRules } from "../creator/utils/getSpellSelectionRules";
import { applyLevelUp, choiceValues, createLevelUpDraft, getLevelUpHitPointGain, previewLevelUp, validateLevelUp } from "./levelUp";
import "./level-up.css";

interface Props {
  character: CharacterArchiveEntry;
  onCancel: () => void;
  onSave: (character: CharacterArchiveEntry) => void;
}

export function LevelUpPanel({ character, onCancel, onSave }: Props) {
  const [draft, setDraft] = useState(() => createLevelUpDraft(character));
  const [step, setStep] = useState(0);
  const [saveError, setSaveError] = useState("");
  const classId = character.classId ?? "";
  const definition = getClassById(classId);
  const level = character.level + 1;
  const preview = previewLevelUp(character, draft);
  const errors = validateLevelUp(character, draft);
  const choices = getCharacterPathChoices(classId, draft.subclassId, level, draft.pathChoices);
  const unlock = getClassSubclassUnlockLevel(classId);
  const canChooseSubclass = !character.subclassId && unlock !== undefined && level >= unlock;
  const spellRules = getSpellSelectionRules({ classId, subclassId: draft.subclassId, level, abilityScores: character.abilityScores ?? defaultAbilityScores, pathChoices: draft.pathChoices });
  const oldFeatures = new Set(getCharacterClassFeatures({ classId, subclassId: character.subclassId, level: character.level }).map((feature) => feature.id));
  const newFeatures = getCharacterClassFeatures({ classId, subclassId: draft.subclassId, level }).filter((feature) => !oldFeatures.has(feature.id));
  const steps = ["Trefferpunkte & Klasse", "Zauber", "Aufstieg prüfen"];

  function save() {
    try { onSave(applyLevelUp(character, draft)); }
    catch (error) { setSaveError(error instanceof Error ? error.message : "Der Aufstieg konnte nicht gespeichert werden."); }
  }

  return (
    <section className="level-up" aria-labelledby="level-up-title">
      <header className="level-up__header">
        <p>Ein neuer Schritt auf deinem Pfad</p>
        <h2 id="level-up-title">{character.name} steigt auf</h2>
        <strong>{character.className} · Stufe {character.level} → {level}</strong>
        <p>Deine Entscheidungen werden erst mit „Aufstieg abschließen“ in der Akte gespeichert.</p>
      </header>
      <nav className="level-up__steps" aria-label="Schritte des Aufstiegs">
        {steps.map((label, index) => <button type="button" key={label} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}>{index + 1}. {label}</button>)}
      </nav>

      {step === 0 && <>
        <section className="level-up__card">
          <h3>Trefferpunkte</h3>
          <div className="level-up__fields">
            <label>Ermittlung<select value={draft.hitPointMode} onChange={(event) => setDraft({ ...draft, hitPointMode: event.target.value as "average" | "roll" })}>
              <option value="average">Fester Wert: {Math.floor((definition?.hitDie ?? 8) / 2) + 1}</option>
              <option value="roll">W{definition?.hitDie ?? 8} selbst würfeln</option>
            </select></label>
            {draft.hitPointMode === "roll" && <label>Würfelergebnis ohne KO-Bonus<input type="number" min={1} max={definition?.hitDie ?? 8} step={1} value={Number.isNaN(draft.hitDieRoll) ? "" : draft.hitDieRoll} onChange={(event) => setDraft({ ...draft, hitDieRoll: event.target.value === "" ? NaN : Number(event.target.value) })} /></label>}
          </div>
          <p>KO-Modifikator: {getAbilityModifier(character.abilityScores?.constitution ?? 10)}{classId === "sorcerer" && draft.subclassId === "draconic-bloodline" ? " · Drakonische Widerstandskraft: +1" : ""}</p>
          <strong>Maximale TP: {character.vitals?.maximumHitPoints ?? 10} → {Number.isFinite(preview.vitals?.maximumHitPoints) ? preview.vitals?.maximumHitPoints : "—"} (+{Number.isFinite(getLevelUpHitPointGain(character, draft)) ? getLevelUpHitPointGain(character, draft) : "—"})</strong>
          <p>Aktuelle TP bleiben erhalten. Eine Heilung oder lange Rast kannst du anschließend im Charakterbogen ausführen.</p>
        </section>

        {canChooseSubclass && <section className="level-up__card">
          <h3>Deine Unterklasse</h3>
          <label>Unterklasse wählen<select value={draft.subclassId} onChange={(event) => {
            const subclassId = event.target.value;
            const allowed = new Set(getCharacterPathChoices(classId, subclassId, level, draft.pathChoices).map((choice) => choice.id));
            setDraft({ ...draft, subclassId, pathChoices: Object.fromEntries(Object.entries(draft.pathChoices).filter(([id]) => allowed.has(id))) });
          }}><option value="">Bitte wählen</option>{definition?.subclasses.filter((entry) => (getSubclassUnlockLevel(classId, entry.id) ?? Infinity) <= level).map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
          <p>{definition?.subclasses.find((entry) => entry.id === draft.subclassId)?.description}</p>
        </section>}

        {choices.map((choice) => {
          const selected = choiceValues(draft.pathChoices[choice.id]);
          const locked = choice.level <= character.level && choiceValues(character.pathChoices?.[choice.id]).length === choice.choose;
          return <fieldset key={choice.id} className="level-up__card" disabled={locked}>
            <legend>{choice.name} · {selected.length}/{choice.choose}{locked ? " · Bereits gewählt" : ""}</legend>
            <p>{choice.description}</p>
            <div className="level-up__options">{choice.options.map((option) => <label key={option.id}>
              <input type={choice.choose === 1 ? "radio" : "checkbox"} name={choice.id} checked={selected.includes(option.id)} disabled={!selected.includes(option.id) && choice.choose > 1 && selected.length >= choice.choose} onChange={() => {
                const value = choice.choose === 1 ? option.id : selected.includes(option.id) ? selected.filter((id) => id !== option.id) : [...selected, option.id];
                const pathChoices = { ...draft.pathChoices, [choice.id]: value };
                const allowed = new Set(getCharacterPathChoices(classId, draft.subclassId, level, pathChoices).map((entry) => entry.id));
                setDraft({ ...draft, pathChoices: Object.fromEntries(Object.entries(pathChoices).filter(([id]) => allowed.has(id))) });
              }} />
              <span><strong>{option.name}</strong><small>{option.description}</small></span>
            </label>)}</div>
          </fieldset>;
        })}

        <section className="level-up__card"><h3>Neue Merkmale</h3>{newFeatures.length ? newFeatures.map((feature) => <div key={feature.id}><h4>{feature.name}</h4><p>{feature.description}</p></div>) : <p>Weitere Merkmale erscheinen gegebenenfalls nach der Wahl deiner Unterklasse.</p>}</section>
      </>}

      {step === 1 && <section className="level-up__card">
        <h3>Dein Grimoire auf Stufe {level}</h3>
        {spellRules.enabled ? <>
          <p>Ergänze deine Auswahl für die neue Stufe. Gelernte Zaubertricks und vorhandene Zauberbucheinträge bleiben erhalten. Bei bekannten Zaubern ist höchstens ein Austausch möglich.</p>
          <SpellsStep classId={classId} subclassId={draft.subclassId} pathChoices={draft.pathChoices} level={level} abilityScores={character.abilityScores ?? defaultAbilityScores} value={draft.spellcasting} onChange={(spellcasting) => setDraft({ ...draft, spellcasting })} />
        </> : <p>Für diesen Aufstieg ist keine Zauberauswahl erforderlich.</p>}
      </section>}

      {step === 2 && <>
        <section className="level-up__card"><h3>Dein Aufstieg im Überblick</h3>
          <dl className="level-up__summary">
            <div><dt>Stufe</dt><dd>{character.level} → {level}</dd></div>
            <div><dt>Maximale TP</dt><dd>{character.vitals?.maximumHitPoints ?? 10} → {Number.isFinite(preview.vitals?.maximumHitPoints) ? preview.vitals?.maximumHitPoints : "—"}</dd></div>
            <div><dt>Trefferwürfel</dt><dd>{character.level} → {level} W{definition?.hitDie}</dd></div>
            <div><dt>Übungsbonus</dt><dd>+{getProficiencyBonus(character.level)} → +{getProficiencyBonus(level)}</dd></div>
            <div><dt>Unterklasse</dt><dd>{preview.subclass ?? "Noch keine"}</dd></div>
          </dl>
          {choices.filter((choice) => choice.level > character.level).map((choice) => <p key={choice.id}><strong>{choice.name}:</strong> {choice.options.filter((option) => choiceValues(draft.pathChoices[choice.id]).includes(option.id)).map((option) => option.name).join(", ") || "Noch offen"}</p>)}
          <p>Klassenressourcen und Zauberplätze richten sich nach der neuen Stufe. Bereits verbrauchte Ressourcen und Plätze bleiben verbraucht.</p>
          <p>Inventar, Währung, Journal, Inspiration und aktuelle Trefferpunkte bleiben erhalten.</p>
        </section>
        {errors.length > 0 && <div className="level-up__errors" role="status"><strong>Vor dem Abschluss noch erledigen:</strong><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
        {saveError && <p role="alert">{saveError}</p>}
      </>}
      <footer className="level-up__footer">
        <GrimButton type="button" onClick={onCancel}>Abbrechen</GrimButton>
        {step > 0 && <GrimButton type="button" onClick={() => setStep(step - 1)}>Zurück</GrimButton>}
        {step < 2 ? <GrimButton type="button" onClick={() => setStep(step + 1)}>Weiter</GrimButton> : <GrimButton type="button" disabled={errors.length > 0} onClick={save}>Aufstieg abschließen</GrimButton>}
      </footer>
    </section>
  );
}
