import { useRef, useState } from "react";
import { getCharacterClassFeatures, getCharacterPathChoices, getClassById, getClassSubclassUnlockLevel, getSubclassUnlockLevel, isCharacterPathChoiceComplete } from "../../compendium/classes";
import { abilityIds, abilityLabels, defaultAbilityScores, getAbilityModifier, getProficiencyBonus, type AbilityId } from "../../compendium/core";
import { feats, getFeatAbilityChoices, getFeatById } from "../../compendium/feats";
import { getSpellById } from "../../compendium/spells";
import { GrimButton } from "../../components/ui/GrimButton";
import type { CharacterArchiveEntry } from "../archives/types";
import { LevelUpSpells } from "./LevelUpSpells";
import { LevelUpReview } from "./LevelUpReview";
import { LevelUpSpellPreview, type LevelUpSpellContext } from "./LevelUpSpellPreview";
import { mapArchiveEntryToDraft } from "../creator/mappers/mapArchiveEntryToDraft";
import { getSpellSelectionRules } from "../creator/utils/getSpellSelectionRules";
import { applyLevelUp, canChooseWarCaster, choiceValues, createLevelUpDraft, invocationRequiresEldritchBlast, needsEldritchBlast, previewLevelUp, validateLevelUp } from "./levelUp";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import "./level-up.css";

interface Props {
  character: CharacterArchiveEntry;
  onCancel: () => void;
  onSave: (character: CharacterArchiveEntry) => void;
}

export function LevelUpPanel({ character, onCancel, onSave }: Props) {
  const [draft, setDraft] = useState(() => createLevelUpDraft(character));
  const [step, setStep] = useState<"choices" | "spells" | "review">("choices");
  const [saveError, setSaveError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const classId = character.classId ?? "";
  const definition = getClassById(classId);
  const level = character.level + 1;
  const preview = previewLevelUp(character, draft);
  const errors = validateLevelUp(character, draft, step === "review" ? "all" : step);
  const choices = getCharacterPathChoices(classId, draft.subclassId, level, draft.pathChoices);
  const unlock = getClassSubclassUnlockLevel(classId);
  const hasLegacySubclass = definition?.subclasses.some((entry) => entry.id === character.subclassId && entry.legacy);
  const canChooseSubclass = (!character.subclassId || hasLegacySubclass) && unlock !== undefined && level >= unlock;
  const targetScores = preview.abilityScores ?? defaultAbilityScores;
  const oldMaximum = getCharacterVitals(character).maximumHitPoints;
  const newMaximum = preview.vitals?.maximumHitPoints ?? oldMaximum;
  const spellRules = getSpellSelectionRules({ classId, subclassId: draft.subclassId, level, abilityScores: targetScores, pathChoices: draft.pathChoices });
  const castingModifier = spellRules.abilityId ? getAbilityModifier(targetScores[spellRules.abilityId]) : undefined;
  const spellContext: LevelUpSpellContext = { invocations: draft.pathChoices["warlock-invocations"], characterLevel: level, lifeDomainHealing: classId === "cleric" && draft.subclassId === "life-domain" };
  if (castingModifier !== undefined) {
    spellContext.spellcastingAbilityModifier = castingModifier;
    spellContext.spellAttackBonus = castingModifier + getProficiencyBonus(level);
    spellContext.spellSaveDifficultyClass = 8 + spellContext.spellAttackBonus;
  }
  const invalidOldSpells = spellRules.restrictedSchools
    ? (character.spellcasting?.spellIds ?? []).flatMap(({ spellId }) => {
      const spell = getSpellById(spellId);
      return spell && spell.level > spellRules.maximumSpellLevel ? [spell.name] : [];
    })
    : [];
  const oldFeatures = new Map(getCharacterClassFeatures({ classId, subclassId: character.subclassId, level: character.level }).map((feature) => [feature.id, feature.description]));
  const newFeatures = getCharacterClassFeatures({ classId, subclassId: draft.subclassId, level }).filter((feature) => oldFeatures.get(feature.id) !== feature.description);
  const steps = ["choices", ...(spellRules.enabled ? ["spells" as const] : []), "review"] as const;
  const labels = { choices: "Trefferpunkte & Klasse", spells: "Zauber", review: "Aufstieg prüfen" };
  const previousSpellcasting = mapArchiveEntryToDraft(character).spellcasting;
  const cantrips = draft.spellcasting.spellIds.filter(({ spellId }) => getSpellById(spellId)?.level === 0);
  const canLearnBlast = cantrips.some(({ spellId }) => spellId === "eldritch-blast")
    || spellRules.grantedSpellIds.includes("eldritch-blast") || cantrips.length < spellRules.cantripsRequired;
  const currentAbilityScores = { ...defaultAbilityScores, ...character.abilityScores };
  const abilityIncreaseTotal = Object.values(draft.abilityScoreIncreases).reduce((sum, increase) => sum + (Number.isFinite(increase) ? Math.max(0, Math.floor(increase ?? 0)) : 0), 0);
  const selectedFeat = getFeatById(draft.featId);
  const selectableFeats = feats.filter((feat) =>
    !character.featIds?.includes(feat.id) &&
    (feat.id !== "war-caster" || canChooseWarCaster(character, draft)) &&
    Object.entries(feat.abilityIncreases ?? {}).every(([id, increase]) => currentAbilityScores[id as AbilityId] + (increase ?? 0) <= 20) &&
    (!feat.abilityChoice || feat.abilityChoice.options.filter((id) => currentAbilityScores[id] + (feat.abilityIncreases?.[id] ?? 0) < 20).length >= feat.abilityChoice.choose));

  function setAbilityIncrease(abilityId: AbilityId, increase: number) {
    const next = { ...draft.abilityScoreIncreases };
    if (increase <= 0 || !Number.isFinite(increase)) delete next[abilityId];
    else next[abilityId] = Math.min(2, Math.floor(increase));
    setDraft({ ...draft, abilityScoreIncreases: next });
  }

  function setFeatAbilityChoice(abilityId: AbilityId) {
    if (!selectedFeat?.abilityChoice) return;
    setDraft({
      ...draft,
      featChoices: {
        ...draft.featChoices,
        [selectedFeat.id]: {
          ...(draft.featChoices[selectedFeat.id] ?? {}),
          [selectedFeat.abilityChoice.id]: [abilityId],
        },
      },
    });
  }

  function save() {
    try { onSave(applyLevelUp(character, draft)); }
    catch (error) { setSaveError(error instanceof Error ? error.message : "Der Aufstieg konnte nicht gespeichert werden."); }
  }

  function goTo(next: typeof step) {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  }

  return (
    <section className="level-up" aria-labelledby="level-up-title">
      <header className="level-up__header">
        <p>Ein neuer Schritt auf deinem Pfad</p>
        <h2 id="level-up-title" ref={heading} tabIndex={-1}>{character.name} steigt auf</h2>
        <strong>{character.className} · Stufe {character.level} → {level}</strong>
        <p>Deine Entscheidungen werden erst mit „Aufstieg abschließen“ in der Akte gespeichert.</p>
      </header>
      <ol className="level-up__steps" aria-label="Schritte des Aufstiegs">
        {steps.map((id, index) => <li key={id} aria-current={step === id ? "step" : undefined}>{index + 1}. {labels[id]}</li>)}
      </ol>

      {step === "choices" && <>
        <section className="level-up__card">
          <h3>Trefferpunkte</h3>
          <div className="level-up__fields">
            <label>Ermittlung<select value={draft.hitPointMode} onChange={(event) => setDraft({ ...draft, hitPointMode: event.target.value as "average" | "roll" })}>
              <option value="average">Fester Wert: {Math.floor((definition?.hitDie ?? 8) / 2) + 1}</option>
              <option value="roll">W{definition?.hitDie ?? 8} selbst würfeln</option>
            </select></label>
            {draft.hitPointMode === "roll" && <label>Würfelergebnis ohne KO-Bonus
              <select value={draft.hitDieRoll} onChange={(event) => setDraft({ ...draft, hitDieRoll: Number(event.target.value) })}>
                {Array.from({ length: definition?.hitDie ?? 8 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
              </select>
            </label>}
          </div>
          <p>Dein Konstitutionsmodifikator ({getAbilityModifier(targetScores.constitution)}) wird automatisch eingerechnet. Gib beim Würfeln nur die Augenzahl an.</p>
          <strong>Maximale TP: {oldMaximum} → {Number.isFinite(newMaximum) ? newMaximum : "—"}{Number.isFinite(newMaximum) && ` (+${newMaximum - oldMaximum})`}</strong>
          <p>Aktuelle TP bleiben erhalten. Eine Heilung oder lange Rast kannst du anschließend im Charakterbogen ausführen.</p>
        </section>

        {level === 4 && <section className="level-up__card">
          <h3>Attributswerterhöhung oder Talent</h3>
          <p>Erhöhe ein Attribut um 2 oder zwei Attribute um je 1 (höchstens 20). Wenn eure Runde mit Talenten spielt, kannst du stattdessen eines wählen.</p>
          <div className="level-up__mode-options" role="radiogroup" aria-label="Stufe-4-Entscheidung">
            <label><input type="radio" name="abilityScoreMode" checked={draft.abilityScoreMode === "increase"} onChange={() => setDraft({ ...draft, abilityScoreMode: "increase", featNote: "" })} /> Attribute erhöhen</label>
            <label><input type="radio" name="abilityScoreMode" checked={draft.abilityScoreMode === "feat"} onChange={() => setDraft({ ...draft, abilityScoreMode: "feat", abilityScoreIncreases: {} })} /> Talent wählen</label>
          </div>
          {draft.abilityScoreMode === "increase" ? <>
            <p><strong>Verteilt:</strong> {abilityIncreaseTotal}/2 Punkte</p>
            <div className="level-up__ability-grid">
              {abilityIds.map((abilityId) => {
                const increase = draft.abilityScoreIncreases[abilityId] ?? 0;
                const before = currentAbilityScores[abilityId];
                const after = preview.abilityScores?.[abilityId] ?? before;
                return <label key={abilityId}>
                  <span>{abilityLabels[abilityId]} <small>{before} → {after}</small></span>
                  <select value={increase} onChange={(event) => setAbilityIncrease(abilityId, Number(event.target.value))}>
                    <option value={0}>+0</option>
                    {[1, 2].filter((points) => before + points <= 20 && abilityIncreaseTotal - increase + points <= 2)
                      .map((points) => <option key={points} value={points}>+{points}</option>)}
                  </select>
                </label>;
              })}
            </div>
          </> : <>
            <label>Talent wählen<select value={draft.featId} onChange={(event) => setDraft({ ...draft, featId: event.target.value, featNote: "", featChoices: { ...draft.featChoices, [event.target.value]: {} } })}>
              <option value="">Bitte wählen</option>
              {selectableFeats.map((feat) => <option key={feat.id} value={feat.id}>{feat.name}</option>)}
            </select></label>
            {selectedFeat && <div className="level-up__feat-preview">
              <strong>{selectedFeat.name}</strong>
              <p>{selectedFeat.description}</p>
              {selectedFeat.abilityChoice && <label>{selectedFeat.abilityChoice.name}<select value={getFeatAbilityChoices(selectedFeat, draft.featChoices)[0] ?? ""} onChange={(event) => setFeatAbilityChoice(event.target.value as AbilityId)}>
                <option value="">Bitte wählen</option>
                {selectedFeat.abilityChoice.options.filter((abilityId) => currentAbilityScores[abilityId] + (selectedFeat.abilityIncreases?.[abilityId] ?? 0) < 20)
                  .map((abilityId) => <option key={abilityId} value={abilityId}>{abilityLabels[abilityId]} ({currentAbilityScores[abilityId]} → {currentAbilityScores[abilityId] + 1})</option>)}
              </select></label>}
              <label>Optionale Notiz<input type="text" value={draft.featNote} onChange={(event) => setDraft({ ...draft, featNote: event.target.value })} placeholder="Hausregel, Quelle oder Details ..." /></label>
            </div>}
          </>}
        </section>}

        {canChooseSubclass && <section className="level-up__card">
          <h3>Deine Unterklasse</h3>
          {hasLegacySubclass && <p>Deine Akte hat eine alte Spezialisierung. Du kannst hier auf eine der vier Gilden wechseln.</p>}
          <label>Unterklasse wählen<select value={draft.subclassId} onChange={(event) => {
            const subclassId = event.target.value;
            const allowed = new Set(getCharacterPathChoices(classId, subclassId, level, draft.pathChoices).map((choice) => choice.id));
            setDraft({ ...draft, subclassId, spellcasting: previousSpellcasting,
              pathChoices: Object.fromEntries(Object.entries(draft.pathChoices).filter(([id]) => allowed.has(id))) });
          }}><option value="">Bitte wählen</option>{definition?.subclasses.filter((entry) =>
            (!entry.legacy || entry.id === character.subclassId) && (getSubclassUnlockLevel(classId, entry.id) ?? Infinity) <= level)
              .map((entry) => <option key={entry.id} value={entry.id}>{entry.name}{entry.legacy ? " (alte Spezialisierung)" : ""}</option>)}</select></label>
          <p>{definition?.subclasses.find((entry) => entry.id === draft.subclassId)?.description}</p>
        </section>}

        {choices.map((choice) => {
          const selected = choiceValues(draft.pathChoices[choice.id]);
          const original = choiceValues(character.pathChoices?.[choice.id]);
          const isInvocation = choice.id === "warlock-invocations";
          const locked = !isInvocation && choice.level <= character.level && isCharacterPathChoiceComplete(choice, character.pathChoices?.[choice.id]);
          if (locked) return null;
          const options = choice.options.filter((option) => {
            if (selected.includes(option.id)) return true;
            if (choice.id.endsWith("-expertise")) return option.id === "thieves-tools" || preview.skillProficiencies?.some((id) => id === option.id);
            if (choice.id === "lore-bonus-skills") return !character.skillProficiencies?.some((id) => id === option.id) || original.includes(option.id);
            if (choice.id === "warlock-tome-cantrips") return !cantrips.some(({ spellId }) => spellId === option.id);
            return !isInvocation || canLearnBlast || !invocationRequiresEldritchBlast(option.id);
          });
          const field = <fieldset key={choice.id} className="level-up__card">
            <legend>{choice.name} · {selected.length}/{choice.choose}</legend>
            <p>{choice.description}</p>
            <div className="level-up__options">{options.map((option) => {
              const spell = choice.id === "warlock-tome-cantrips" ? getSpellById(option.id) : undefined;
              const control = <label>
              <input type={choice.choose === 1 ? "radio" : "checkbox"} name={choice.id} checked={selected.includes(option.id)} disabled={
                (!selected.includes(option.id) && choice.choose > 1 && selected.length >= choice.choose) ||
                (choice.id === "monster-hunter-weapon-mastery" && selected.includes(option.id) && original.includes(option.id)) ||
                (isInvocation && selected.includes(option.id) && original.includes(option.id) && original.some((id) => !selected.includes(id)))
              } onChange={() => {
                const value = choice.choose === 1 ? option.id : selected.includes(option.id) ? selected.filter((id) => id !== option.id) : [...selected, option.id];
                const pathChoices = { ...draft.pathChoices, [choice.id]: value };
                const allowed = new Set(getCharacterPathChoices(classId, draft.subclassId, level, pathChoices).map((entry) => entry.id));
                setDraft({ ...draft, pathChoices: Object.fromEntries(Object.entries(pathChoices).filter(([id]) => allowed.has(id))) });
              }} />
              <span><strong>{option.name}</strong>{!spell && <small>{option.description}</small>}</span>
            </label>;
              return <div key={option.id}>{control}{spell && <details className="level-up__spell-details">
                <summary>Wirkung ansehen <span className="level-up__sr-only">{spell.name}</span></summary>
                <LevelUpSpellPreview spell={spell} context={spellContext} />
              </details>}</div>;
            })}</div>
          </fieldset>;
          return isInvocation && original.length === choice.choose
            ? <details key={choice.id} className="level-up__optional"><summary>Anrufungen · {selected.length}/{choice.choose}</summary>{field}</details>
            : field;
        })}

        <section className="level-up__card"><h3>Neue oder verbesserte Merkmale</h3>{newFeatures.length ? newFeatures.map((feature) => <div key={feature.id}><h4>{feature.name}</h4><p>{feature.description}</p></div>) : <p>Weitere Merkmale erscheinen gegebenenfalls nach der Wahl deiner Unterklasse.</p>}</section>
      </>}

      {step === "spells" && <section className="level-up__card">
        <h3>Zauber auf Stufe {level}</h3>
        {spellRules.enabled ? <>
          {invalidOldSpells.length > 0 && <p role="status">Diese Zauber aus deiner bisherigen Akte haben einen zu hohen Grad: {invalidOldSpells.join(", ")}. Wähle Ersatz. Die Akte ändert sich erst beim Abschließen des Aufstiegs.</p>}
          <LevelUpSpells rules={spellRules} previous={previousSpellcasting} value={draft.spellcasting} context={spellContext}
            needsBlast={needsEldritchBlast(draft, spellRules.grantedSpellIds)} onChange={(spellcasting) => setDraft({ ...draft, spellcasting })} />
        </> : <p>Für diesen Aufstieg ist keine Zauberauswahl erforderlich.</p>}
      </section>}

      {step === "review" && <>
        <section className="level-up__card"><h3>Dein Aufstieg im Überblick</h3>
          <dl className="level-up__summary">
            <div><dt>Stufe</dt><dd>{character.level} → {level}</dd></div>
            <div><dt>Maximale TP</dt><dd>{character.vitals?.maximumHitPoints ?? 10} → {Number.isFinite(preview.vitals?.maximumHitPoints) ? preview.vitals?.maximumHitPoints : "—"}</dd></div>
            <div><dt>Trefferwürfel</dt><dd>{character.level} → {level} W{definition?.hitDie}</dd></div>
            <div><dt>Übungsbonus</dt><dd>+{getProficiencyBonus(character.level)} → +{getProficiencyBonus(level)}</dd></div>
            <div><dt>Unterklasse</dt><dd>{preview.subclass ?? "Noch keine"}</dd></div>
            {level === 4 && <div><dt>Stufe-4-Wahl</dt><dd>{draft.abilityScoreMode === "feat" ? selectedFeat?.name ?? "Talent offen" : "Attribute"}</dd></div>}
          </dl>
          <LevelUpReview before={character} after={preview} />
          <p>Klassenressourcen und Zauberplätze richten sich nach der neuen Stufe. Bereits verbrauchte Ressourcen und Plätze bleiben verbraucht.</p>
          <p>Inventar, Währung, Journal, Inspiration und aktuelle Trefferpunkte bleiben erhalten.</p>
        </section>
        {saveError && <p role="alert">{saveError}</p>}
      </>}
      {errors.length > 0 && <div className="level-up__errors" role="status"><strong>Noch offen</strong><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}
      <footer className="level-up__footer">
        <GrimButton type="button" onClick={onCancel}>Abbrechen</GrimButton>
        {step !== "choices" && <GrimButton type="button" onClick={() => goTo(step === "review" && spellRules.enabled ? "spells" : "choices")}>Zurück</GrimButton>}
        {step !== "review"
          ? <GrimButton type="button" disabled={errors.length > 0} onClick={() => goTo(step === "choices" && spellRules.enabled ? "spells" : "review")}>Weiter</GrimButton>
          : <GrimButton type="button" disabled={errors.length > 0} onClick={save}>Aufstieg abschließen</GrimButton>}
      </footer>
    </section>
  );
}
