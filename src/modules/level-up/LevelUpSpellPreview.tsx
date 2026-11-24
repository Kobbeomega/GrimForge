import type { SpellDefinition } from "../../compendium/spells";
import { spellFact } from "../../compendium/spells/spellFact";
import { getSpellDisplayValues } from "../sheet/utils/getSpellDisplayValues";

export interface LevelUpSpellContext {
  characterLevel: number;
  lifeDomainHealing?: boolean;
  invocations?: string | string[];
  spellcastingAbilityModifier?: number;
  spellAttackBonus?: number;
  spellSaveDifficultyClass?: number;
}

export function LevelUpSpellPreview({ spell, context }: { spell: SpellDefinition; context: LevelUpSpellContext }) {
  const { damage, healing, savingThrow, attackCount, usesSpellAttack, spellAttackLabel } = getSpellDisplayValues({
    ...context,
    spell,
  });
  const components = [
    spell.components.verbal && "V",
    spell.components.somatic && "G",
    spell.components.material && (spell.components.materialDescription ? `M (${spell.components.materialDescription})` : "M"),
  ].filter(Boolean).join(", ");
  const facts: Array<[label: string, value: string | false | undefined]> = [
    ["Wirkzeit", spellFact(spell.castingTime)],
    ["Reichweite", spellFact(spell.range)],
    ["Dauer", spellFact(spell.duration)],
    ["Konzentration", spell.concentration ? "Ja" : "Nein"],
    ["Ritual", spell.ritual ? "Ja" : "Nein"],
    ["Komponenten", components],
    ["Schaden", damage ? [damage.dice, damage.type, damage.note].filter(Boolean).join(" · ") : spell.damageText?.join(" · ")],
    ["Heilung", healing?.formatted ?? spell.healingText?.join(" · ")],
    ["Rettungswurf", savingThrow && [savingThrow.abilityLabel, savingThrow.difficultyClass !== undefined && `SG ${savingThrow.difficultyClass}`].filter(Boolean).join(" · ")],
    ["Zauberangriff", usesSpellAttack && [attackCount && attackCount > 1 ? `${attackCount} getrennte Würfe` : "Angriffswurf", spellAttackLabel].filter(Boolean).join(" · ")],
  ];
  return <div className="level-up__spell-preview">
    <p className="level-up__spell-effect"><strong>Wirkung</strong> {spell.mechanicsSummary ?? spell.description}</p>
    {spell.mechanicsSummary && spell.description !== spell.mechanicsSummary && <details><summary>Weitere Beschreibung</summary><p>{spell.description}</p></details>}
    <dl className="level-up__spell-facts">
      {facts.map(([label, value]) => value ? <div key={label}><dt>{label}</dt><dd>{value}</dd></div> : null)}
    </dl>
    {savingThrow?.resultOnSuccess && <p>{savingThrow.resultOnSuccess}</p>}
    {spell.higherLevels && <p><strong>Skalierung</strong> {spell.higherLevels}</p>}
    {spell.rulesText && spell.rulesText !== spell.description && <details>
      <summary>Regelauszug (Englisch)</summary>
      <p lang="en">{spell.rulesText}</p>
    </details>}
    {spell.mechanicsReview === "source-excerpt" && <small>Regelauszug{spell.sourceLabel ? ` · ${spell.sourceLabel}` : ""}. Einzelheiten stehen in der Regelquelle.</small>}
  </div>;
}
