import { abilityIds, abilityLabels } from "../../../compendium/core";
import type { CharacterArchiveEntry } from "../../archives/types";
import { getBeastCompanion } from "../utils/getBeastCompanion";
import { getSubclassSheetStats } from "../utils/getSubclassSheetStats";

export function SubclassStats({ character }: { character: CharacterArchiveEntry }) {
  const stats = getSubclassSheetStats(character);
  const beast = getBeastCompanion(character);
  if (!stats.length && !beast) return null;
  return (
    <section className="subclass-stats" aria-label="Unterklassenwerte">
      {stats.length > 0 && <>
        <h3>Unterklassenwerte</h3>
        <dl>{stats.map(({ label, value, condition }) => <div key={label}>
          <dt>{label}</dt><dd><strong>{value}</strong>{condition && <small>{condition}</small>}</dd>
        </div>)}</dl>
      </>}
      {beast && <>
        <h3>Tiergefährte · {beast.name}</h3>
        <dl>
          <div><dt>Rüstungsklasse</dt><dd>{beast.armor}</dd></div>
          <div><dt>Maximale Trefferpunkte</dt><dd>{beast.hp}</dd></div>
          <div><dt>Bewegung</dt><dd>{beast.speed}</dd></div>
          <div><dt>Passive Wahrnehmung</dt><dd>{beast.passive}</dd></div>
          {beast.senses && <div><dt>Sinne</dt><dd>{beast.senses}</dd></div>}
          {beast.perception && <div><dt>Wahrnehmung</dt><dd>{beast.perception}</dd></div>}
          {beast.stealth && <div><dt>Heimlichkeit</dt><dd>{beast.stealth}</dd></div>}
          {abilityIds.map((id, index) => <div key={id}><dt>{abilityLabels[id]}</dt><dd>{beast.abilities[index]}</dd></div>)}
        </dl>
        <ul>{beast.attacks.map((attack) => <li key={attack.name}><strong>{attack.name}:</strong> {attack.attack} zum Treffen · {attack.damage}{attack.note && <small>{attack.note}</small>}</li>)}</ul>
        {beast.traits && <p>{beast.traits}</p>}
        <p className="subclass-stats__note">Dein Übungsbonus ist bereits eingerechnet. Befehle, aktuelle TP und ausgelöste Effekte verwaltest du am Spieltisch.</p>
      </>}
    </section>
  );
}
