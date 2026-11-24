import type { SpellDefinition } from "../../../compendium/spells";
import { spellFact } from "../../../compendium/spells/spellFact";
import { getSpellDisplayValues } from "../utils/getSpellDisplayValues";

/** Brief but complete enough to compare spells before selection. No invented effects. */
export function SpellQuickFacts({ spell, characterLevel, abilityModifier = 0, compact = false }: {
  spell: SpellDefinition;
  characterLevel: number;
  abilityModifier?: number;
  compact?: boolean;
}) {
  const values = getSpellDisplayValues({ spell, characterLevel, spellcastingAbilityModifier: abilityModifier });
  const damage = values.damage ? `${values.damage.dice} ${values.damage.type}` : spell.damageText?.join(" · ");
  const healing = values.healing?.formatted ?? spell.healingText?.join(" · ");
  const save = values.savingThrow?.abilityLabel ?? spell.savingThrows?.join(", ");
  const effect = spell.mechanicsSummary || spell.description;
  const brief = compact && effect.length > 240 ? `${effect.slice(0, 237).trimEnd()}…` : effect;
  return <div className="gf-spell-quick" aria-label={`Kurzüberblick ${spell.name}`}>
    <dl className="gf-spell-quick__facts">
      <div><dt>Wirkzeit</dt><dd>{spellFact(spell.castingTime)}</dd></div>
      <div><dt>Reichweite</dt><dd>{spellFact(spell.range)}</dd></div>
      <div><dt>Dauer</dt><dd>{spellFact(spell.duration)}</dd></div>
      {damage && <div><dt>Schaden</dt><dd>{damage}</dd></div>}
      {healing && <div><dt>Heilung</dt><dd>{healing}</dd></div>}
      {save && <div><dt>Rettungswurf</dt><dd>{save}</dd></div>}
    </dl>
    <p className="gf-spell-quick__effect"><strong>Wirkung:</strong> {brief}</p>
    <div className="gf-spell-quick__tags">
      {spell.concentration && <span>Konzentration</span>}
      {spell.ritual && <span>Ritual</span>}
      {values.usesSpellAttack && <span>Zauberangriff</span>}
    </div>
  </div>;
}
