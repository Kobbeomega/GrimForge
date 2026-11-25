import { SpellBrowser } from "../../components/spells/SpellBrowser";
import { getSpellById, getSpellsForClass, type CharacterSpellcasting } from "../../compendium/spells";
import type { SpellSelectionRules } from "../creator/utils/getSpellSelectionRules";
import { GrimButton } from "../../components/ui/GrimButton";
import { LevelUpSpellPreview, type LevelUpSpellContext } from "./LevelUpSpellPreview";


interface SpellChoices {
  rules: SpellSelectionRules;
  value: CharacterSpellcasting;
  previous: CharacterSpellcasting;
  needsBlast: boolean;
}

interface Props extends SpellChoices {
  context: LevelUpSpellContext;
  onChange: (value: CharacterSpellcasting) => void;
}

export function getLevelUpSpellOptions({ rules, value, previous, needsBlast }: SpellChoices) {
  const selected = value.spellIds.filter(({ spellId }) => !rules.grantedSpellIds.includes(spellId));
  const selectedIds = new Set(selected.map(({ spellId }) => spellId));
  const catalog = new Map([
    ...getSpellsForClass(rules.sourceClassId ?? ""),
    ...rules.expandedSpellIds.flatMap((id) => getSpellById(id) ?? []),
  ].map((spell) => [spell.id, spell]));
  const eligible = (id: string) => {
    const spell = catalog.get(id);
    return spell && spell.level <= rules.maximumSpellLevel && !rules.grantedSpellIds.includes(id);
  };
  const original = new Set(previous.spellIds.filter(({ spellId }) => eligible(spellId)).map(({ spellId }) => spellId));
  const cantripCount = selected.filter(({ spellId }) => getSpellById(spellId)?.level === 0).length;
  const spellCount = selected.length - cantripCount;
  const preparedCount = selected.filter(({ spellId, prepared }) => prepared && (getSpellById(spellId)?.level ?? 0) > 0).length;
  const swapsUsed = [...original].filter((id) => (catalog.get(id)?.level ?? 0) > 0 && !selectedIds.has(id)).length;
  const cantripSwapUsed = [...original].some((id) => catalog.get(id)?.level === 0 && !selectedIds.has(id));
  const unrestrictedLimit = rules.levelledSpellsRequired - (rules.restrictedSpellCount ?? 0);
  const isUnrestricted = (id: string) => {
    const spell = getSpellById(id);
    return spell && spell.level > 0 && rules.restrictedSchools && !rules.restrictedSchools.includes(spell.school);
  };
  const unrestrictedUsed = selected.filter(({ spellId }) => isUnrestricted(spellId)).length;
  const available = [...catalog.values()]
    .filter((spell) => eligible(spell.id) && !selectedIds.has(spell.id))
    .filter((spell) => spell.level === 0
      ? cantripCount < rules.cantripsRequired && (!needsBlast || spell.id === "eldritch-blast" || cantripCount + 1 < rules.cantripsRequired)
      : spellCount < rules.levelledSpellsRequired && (!isUnrestricted(spell.id) || unrestrictedUsed < unrestrictedLimit))
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "de"));

  function canRemove(id: string) {
    if (!original.has(id)) return true;
    if (catalog.get(id)?.level === 0) return rules.canReplaceCantrip === true && !cantripSwapUsed;
    if (rules.mode === "spellbook") return false;
    return rules.mode === "prepared" || swapsUsed === 0;
  }

  return { selected, available, canRemove, cantripCount, spellCount, preparedCount };
}

function SpellDetails({ id, context }: { id: string; context: LevelUpSpellContext }) {
  const spell = getSpellById(id);
  if (!spell) return <span>{id} · Kein Katalogeintrag</span>;
  return <details className="level-up__spell-details">
    <summary>{spell.name}{spell.level > 0 && ` · Grad ${spell.level}`}</summary>
    <LevelUpSpellPreview spell={spell} context={context} />
  </details>;
}

export function LevelUpSpells({ rules, value, previous, needsBlast, context, onChange }: Props) {
  const options = getLevelUpSpellOptions({ rules, value, previous, needsBlast });

  function addSpell(id: string) {
    const spell = options.available.find((entry) => entry.id === id);
    if (!spell) return;
    const prepared = spell.level === 0 || rules.mode !== "spellbook" || options.preparedCount < rules.preparedSpellsRequired;
    onChange({ ...value, spellIds: [...options.selected, { spellId: id, prepared }] });
  }

  return <div className="level-up__spell-picker">
    <p aria-live="polite">{options.cantripCount<rules.cantripsRequired ? "Zaubertricks wählen · noch "+(rules.cantripsRequired-options.cantripCount) : options.spellCount<rules.levelledSpellsRequired ? "Wähle noch "+(rules.levelledSpellsRequired-options.spellCount)+" Zauber." : rules.mode==="spellbook" && options.preparedCount<rules.preparedSpellsRequired ? "Öffne dein Zauberbuch und bereite deine Zauber vor." : "Du musst keinen weiteren Zauber wählen."}</p>
    {needsBlast && <p>Wähle Schauriger Strahl für deine Anrufung.</p>}
    {rules.grantedSpellIds.length > 0 && <fieldset className="level-up__card">
      <legend>Automatisch erhaltene Zauber</legend>
      <ul className="level-up__spell-list">{rules.grantedSpellIds.map((id) => <li key={id}><SpellDetails id={id} context={context} /></li>)}</ul>
    </fieldset>}
    {([
      { title: "Zaubertricks", cantrips: true, count: options.cantripCount, limit: rules.cantripsRequired },
      { title: "Zauber", cantrips: false, count: options.spellCount, limit: rules.levelledSpellsRequired },
    ]).filter((group) => group.count > 0 || group.limit > 0).map((group) => {
      const candidates = options.available.filter((spell) => (spell.level === 0) === group.cantrips);
      return <fieldset key={group.title} className="level-up__card">
        <legend>{group.title} · {group.count}/{group.limit}</legend>
        {group.cantrips && rules.canReplaceCantrip && <p>Du kannst einen bisher bekannten Zaubertrick austauschen.</p>}
        {!group.cantrips && rules.mode === "spellbook" && <p>Vorbereitet: {options.preparedCount}/{rules.preparedSpellsRequired}</p>}
        {!group.cantrips && (rules.mode === "known" || rules.mode === "pact") && <p>Du kannst höchstens einen bisher bekannten Zauber austauschen.</p>}
        <details open={!group.cantrips && rules.mode==="spellbook" && options.spellCount===group.limit && options.preparedCount<rules.preparedSpellsRequired || undefined}><summary>{group.cantrips?"Meine Zaubertricks":"Meine Zauber"} ansehen und bearbeiten</summary><ul className="level-up__spell-list">
          {options.selected.filter(({ spellId }) => ((getSpellById(spellId)?.level ?? -1) === 0) === group.cantrips).map((entry) => {
            const spell = getSpellById(entry.spellId);
            return <li key={entry.spellId}>
              <SpellDetails id={entry.spellId} context={context} />
              {!group.cantrips && rules.mode === "spellbook" && <label><input type="checkbox"
                checked={entry.prepared}
                disabled={!entry.prepared && options.preparedCount >= rules.preparedSpellsRequired}
                onChange={() => onChange({ ...value, spellIds: options.selected.map((other) => other.spellId === entry.spellId ? { ...other, prepared: !other.prepared } : other) })}
              /> Vorbereiten <span className="level-up__sr-only">{spell?.name ?? entry.spellId}</span></label>}
              {options.canRemove(entry.spellId) && <GrimButton type="button"
                aria-label={`${spell?.name ?? entry.spellId} entfernen`}
                onClick={() => onChange({ ...value, spellIds: options.selected.filter((other) => other.spellId !== entry.spellId) })}
              >Entfernen</GrimButton>}
            </li>;
          })}
        </ul></details>
        {group.count < group.limit && (group.cantrips || options.cantripCount>=rules.cantripsRequired) && <SpellBrowser candidates={candidates} context={context} onAdd={addSpell} />}
      </fieldset>;
    })}
  </div>;
}
