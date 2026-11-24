import {
  useState,
} from "react";

import {
  abilityLabels,
  getAbilityModifier,
} from "../../../../compendium/core";

import {
  getSpellById,
  getSpellsForClass,
} from "../../../../compendium/spells";

import type {
  AbilityScores,
} from "../../../../compendium/core";

import type {
  CharacterSpellcasting,
  CharacterSpellSelection,
  SpellDefinition,
} from "../../../../compendium/spells";

import { SpellQuickFacts } from "../../../sheet/components/SpellQuickFacts";

import {
  getSpellSelectionRules, validateSpellSelection,
} from "../../utils/getSpellSelectionRules";

import { SpellBrowser,spellRoles } from "../../../../components/spells/SpellBrowser";
const spellSchoolLabels = {
  abjuration: "Bannmagie",
  conjuration: "Beschwörung",
  divination: "Erkenntnismagie",
  enchantment: "Verzauberung",
  evocation: "Hervorrufung",
  illusion: "Illusion",
  necromancy: "Nekromantie",
  transmutation: "Verwandlung",
} as const;


interface SpellsStepProps {
  classId: string;
  subclassId?: string;
  pathChoices?: import("../../../../compendium/classes").CharacterPathChoices;
  level: number;

  abilityScores: AbilityScores;

  value: CharacterSpellcasting;

  onChange: (
    spellcasting:
      CharacterSpellcasting,
  ) => void;
}

export function SpellsStep({
  classId,
  subclassId,
  pathChoices,
  level,
  abilityScores,
  value,
  onChange,
}: SpellsStepProps) {
  const [suggest,showSuggestion]=useState(false);
  const rules =
    getSpellSelectionRules({
      classId,
      subclassId,
      pathChoices,
      level,
      abilityScores,
    });

  if (!rules.enabled || !rules.abilityId || !rules.sourceClassId) {
    return (
      <section className="creator-section">
        <header className="creator-section__header">
          <p className="creator-section__chapter">
            Kapitel VIII
          </p>

          <h2>Zauber</h2>

          <p>
            Diese Klasse besitzt keine
            Zauberausbildung.
          </p>
        </header>

        <div className="compact-empty-state">
          <strong>
            Keine Zauberauswahl
            notwendig
          </strong>

          <span>
            Fahre mit dem nächsten
            Kapitel fort.
          </span>
        </div>
      </section>
    );
  }

  const spellcastingAbilityModifier =
    getAbilityModifier(abilityScores[rules.abilityId]);

  const expandedSpells = rules.expandedSpellIds
    .map((spellId) => getSpellById(spellId))
    .filter((spell): spell is SpellDefinition => Boolean(spell));

  const grantedSpells = rules.grantedSpellIds
    .map((spellId) => getSpellById(spellId))
    .filter((spell): spell is SpellDefinition => Boolean(spell));

  const grantedIds = new Set(grantedSpells.map((spell) => spell.id));
  const availableSpells = [
    ...getSpellsForClass(rules.sourceClassId),
    ...expandedSpells,
  ]
    .filter((spell, index, list) => list.findIndex((entry) => entry.id === spell.id) === index)
    .filter((spell) => !grantedIds.has(spell.id))
    .filter((spell) => spell.level === 0 || spell.level <= rules.maximumSpellLevel);

  const selectedCantrips =
    countSelectedSpells(
      value,
      availableSpells,
      (spell) =>
        spell.level === 0,
    );

  const selectedLevelledSpells =
    countSelectedSpells(
      value,
      availableSpells,
      (spell) =>
        spell.level > 0,
    );

  const preparedSpells =
    value.spellIds.filter(
      (selection) => {
        const spell =
          availableSpells.find(
            (entry) =>
              entry.id ===
              selection.spellId,
          );

        return (
          Boolean(spell) &&
          spell!.level > 0 &&
          selection.prepared
        );
      },
    ).length;

  const early = selectedCantrips < rules.cantripsRequired;
  const pending = early || selectedLevelledSpells < rules.levelledSpellsRequired;
  const restricted = rules.restrictedSchools;
  const unrestrictedCount = availableSpells.filter(s=>isSelected(s.id) && s.level>0 && restricted && !restricted.includes(s.school)).length;
  const rawInvocations=pathChoices?.["warlock-invocations"];
  const invocations=Array.isArray(rawInvocations)?rawInvocations:rawInvocations?[rawInvocations]:[];
  const needsBlast=classId==="warlock" && invocations.some(id=>["agonizing-blast","eldritch-spear","repelling-blast"].includes(id)) && !isSelected("eldritch-blast");
  const candidates=availableSpells.filter(s=>!isSelected(s.id) && (s.level===0)===early && (!early || !needsBlast || rules.cantripsRequired-selectedCantrips>1 || s.id==="eldritch-blast") && (early || !restricted || restricted.includes(s.school) || unrestrictedCount<rules.levelledSpellsRequired-(rules.restrictedSpellCount??0)));
  function proposal() {
    const entries=[...value.spellIds];
    const used=new Set(entries.map(x=>x.spellId));
    const featured=["eldritch-blast","fire-bolt","sacred-flame","vicious-mockery","guidance","light","mage-hand","minor-illusion","cure-wounds","healing-word","shield","magic-missile","faerie-fire","detect-magic"];
    for(const trick of [true,false]) {
      let needed=trick?rules.cantripsRequired-selectedCantrips:rules.levelledSpellsRequired-selectedLevelledSpells;
      const pool=availableSpells.filter(s=>!used.has(s.id) && (s.level===0)===trick);
      const rank=(s:SpellDefinition)=>{const i=featured.indexOf(s.id);return (restricted && !trick && !restricted.includes(s.school)?1000:0)+(i<0?100:i)};
      for(const s of pool.sort((a,b)=>rank(a)-rank(b)||a.name.localeCompare(b.name,"de"))){
        if(needed--<=0)break;
        entries.push({spellId:s.id,prepared:trick || rules.mode!=="spellbook" || entries.filter(x=>x.prepared && (getSpellById(x.spellId)?.level??0)>0).length<rules.preparedSpellsRequired});
      }
    }
    const draft={...value,spellIds:entries};
    if(needsBlast && !entries.some(x=>x.spellId==="eldritch-blast"))return null;
    return validateSpellSelection({classId,subclassId,level,abilityScores,pathChoices,spellcasting:draft}).valid?draft:null;
  }
  const proposed=suggest?proposal():null;
  function isSelected(
    spellId: string,
  ): boolean {
    return value.spellIds.some(
      (selection) =>
        selection.spellId ===
        spellId,
    );
  }

  function isPrepared(
    spellId: string,
  ): boolean {
    return value.spellIds.some(
      (selection) =>
        selection.spellId ===
          spellId &&
        selection.prepared,
    );
  }

  function toggleSpell(
    spell: SpellDefinition,
  ) {
    if (isSelected(spell.id)) {
      onChange({
        ...value,

        spellIds:
          value.spellIds.filter(
            (selection) =>
              selection.spellId !==
              spell.id,
          ),
      });

      return;
    }

    if (
      spell.level === 0 &&
      selectedCantrips >=
        rules.cantripsRequired
    ) {
      return;
    }

    if (
      spell.level > 0 &&
      selectedLevelledSpells >=
        rules.levelledSpellsRequired
    ) {
      return;
    }

    const selection:
      CharacterSpellSelection = {
        spellId: spell.id,

        prepared:
          spell.level === 0 || rules.mode !==
            "spellbook" ||
          preparedSpells <
            rules.preparedSpellsRequired,
      };

    onChange({
      ...value,

      spellIds: [
        ...value.spellIds,
        selection,
      ],
    });
  }

  function togglePrepared(
    spellId: string,
  ) {
    if (
      rules.mode !==
      "spellbook"
    ) {
      return;
    }

    const currentlyPrepared =
      isPrepared(spellId);

    if (
      !currentlyPrepared &&
      preparedSpells >=
        rules.preparedSpellsRequired
    ) {
      return;
    }

    onChange({
      ...value,

      spellIds:
        value.spellIds.map(
          (selection) =>
            selection.spellId ===
            spellId
              ? {
                  ...selection,

                  prepared:
                    !selection.prepared,
                }
              : selection,
        ),
    });
  }

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel VIII
        </p>

        <h2>Zauber</h2>

        <p>
          Wähle die magischen
          Fähigkeiten, mit denen dein
          Charakter seine Laufbahn
          beginnt.
        </p>
      </header>

      <dl className="compact-spell-summary">
        <SummaryValue
          label="Zauberattribut"
          value={
            abilityLabels[
              rules.abilityId
            ]
          }
        />

        <SummaryValue
          label="Zaubertricks"
          value={`${selectedCantrips} / ${rules.cantripsRequired}`}
        />

        <SummaryValue
          label={
            rules.mode ===
            "spellbook"
              ? "Zauberbuch"
              : "Zauber"
          }
          value={`${selectedLevelledSpells} / ${rules.levelledSpellsRequired}`}
        />

        {rules.mode ===
          "spellbook" && (
          <SummaryValue
            label="Vorbereitet"
            value={`${preparedSpells} / ${rules.preparedSpellsRequired}`}
          />
        )}
      </dl>

      {grantedSpells.length > 0 && (
        <section className="creator-skill-source">
          <header className="creator-skill-source__header">
            <p className="creator-section__chapter">Durch Unterklasse</p>
            <h3>Automatisch bekannte / vorbereitete Zauber</h3>
            <p>Diese Zauber zählen nicht gegen deine normale Zauberauswahl.</p>
          </header>
          <div className="gf-granted-spells">
            {grantedSpells.map((spell) => <details key={spell.id} className="gf-granted-spell">
              <summary>{spell.name} · {spell.level === 0 ? "Zaubertrick" : `Grad ${spell.level}`}</summary>
              <SpellQuickFacts spell={spell} characterLevel={level} abilityModifier={spellcastingAbilityModifier} />
            </details>)}
          </div>
        </section>
      )}

      {rules.restrictedSchools?.length && rules.restrictedSpellCount ? (
        <div className="compact-empty-state">
          <strong>Unterklassenregel</strong>
          <span>Mindestens {rules.restrictedSpellCount} deiner gewählten Zauber müssen aus {rules.restrictedSchools.map((school) => spellSchoolLabels[school]).join(" oder ")} stammen.</span>
        </div>
      ) : null}

      <section className="compact-spell-section">
        <h3 aria-live="polite">{early ? "Zaubertricks wählen · noch "+(rules.cantripsRequired-selectedCantrips) : pending ? (rules.mode==="spellbook"?"Ins Zauberbuch eintragen":rules.mode==="prepared"?"Für heute vorbereiten":"Zauber lernen")+" · noch "+(rules.levelledSpellsRequired-selectedLevelledSpells) : rules.mode==="spellbook" && preparedSpells<rules.preparedSpellsRequired ? "Wähle unten deine vorbereiteten Zauber" : "Deine Zauberauswahl ist vollständig"}</h3>
        {pending && <><button className="creator-spell-toolbar__toggle" type="button" onClick={()=>showSuggestion(!suggest)}>Startvorschlag {suggest?"schließen":"ansehen"}</button>
        {suggest && <aside className="compact-empty-state"><strong>Vorschlag für die offenen Plätze</strong>{proposed ? <><ul>{proposed.spellIds.filter(x=>!isSelected(x.spellId)).map(x=>{const s=getSpellById(x.spellId)!;return <li key={s.id}>{s.name} · {spellRoles(s).join(" / ") || spellSchoolLabels[s.school]}</li>})}</ul><button type="button" onClick={()=>{onChange(proposed);showSuggestion(false)}}>Vorschlag übernehmen</button></> : <p>Für diese Kombination ist kein vollständiger Vorschlag verfügbar. Deine Auswahl bleibt erhalten.</p>}</aside>}
        <SpellBrowser key={early?"tricks":"zauber"} candidates={candidates} context={{characterLevel:level,spellcastingAbilityModifier, invocations}} onAdd={id=>{const s=candidates.find(x=>x.id===id);if(s)toggleSpell(s)}}/></>}
      </section>
      {value.spellIds.length>0 && <details key={pending?"choosing":"review"} open={!pending}><summary>Meine Auswahl bearbeiten · {value.spellIds.length}</summary>
        <CompactSpellSection title="Gewählte Zauber" counter={String(value.spellIds.length)} spells={availableSpells.filter(s=>isSelected(s.id))} characterLevel={level} spellcastingAbilityModifier={spellcastingAbilityModifier} isSelected={isSelected} isPrepared={isPrepared} onToggle={toggleSpell} onTogglePrepared={togglePrepared} showPreparedToggle={rules.mode==="spellbook"}/>
      </details>}
      {rules.maximumSpellLevel ===
        0 && (
        <div className="compact-empty-state">
          <strong>
            Noch keine Zauberplätze
          </strong>

          <span>
            Diese Klasse erhält ihre
            ersten Zauber auf einer
            späteren Stufe.
          </span>
        </div>
      )}
    </section>
  );
}

function SummaryValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

interface CompactSpellSectionProps {
  title: string;
  counter: string;

  spells: SpellDefinition[];

  characterLevel: number;

  spellcastingAbilityModifier:
    number;

  isSelected: (
    spellId: string,
  ) => boolean;

  isPrepared: (
    spellId: string,
  ) => boolean;

  onToggle: (
    spell: SpellDefinition,
  ) => void;

  onTogglePrepared: (
    spellId: string,
  ) => void;

  showPreparedToggle: boolean;
}

function CompactSpellSection({
  title,
  counter,
  spells,
  characterLevel,
  spellcastingAbilityModifier,
  isSelected,
  isPrepared,
  onToggle,
  onTogglePrepared,
  showPreparedToggle,
}: CompactSpellSectionProps) {
  return (
    <section className="compact-spell-section">
      <header className="compact-spell-section__header">
        <div>
          <p>
            Magische Auswahl
          </p>

          <h3>{title}</h3>
        </div>

        <span>
          {counter} gewählt
        </span>
      </header>

      {spells.length === 0 ? (
        <div className="compact-empty-state">
          <strong>
            Keine Einträge
          </strong>

          <span>
            Für diese Klasse sind
            derzeit keine passenden
            Zauber hinterlegt.
          </span>
        </div>
      ) : (
        <div className="compact-spell-grid">
          {spells.map((spell) => {
            const selected =
              isSelected(
                spell.id,
              );

            const prepared =
              isPrepared(
                spell.id,
              );



            return (
              <article
                key={spell.id}
                className={[
                  "compact-spell-card",

                  selected
                    ? "compact-spell-card--selected"
                    : "",

                  prepared
                    ? "compact-spell-card--prepared"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="compact-spell-card__main">
                  <button
                    type="button"
                    className="gf-spell-card-select"
                    aria-pressed={selected}
                    onClick={() => onToggle(spell)}
                  >
                    <span className="gf-spell-card-select__layout">
                      <span className="gf-spell-card-select__heading">
                        <span>{spell.level === 0 ? "Zaubertrick" : `Grad ${spell.level}`} · {spellSchoolLabels[spell.school]}</span>
                        <strong className="gf-spell-card-select__name">{spell.name}</strong>
                      </span>
                      <strong className="gf-spell-card-select__status">{selected ? "Gewählt ✓" : "+ Wählen"}</strong>
                    </span>
                  </button>
                  <SpellQuickFacts spell={spell} characterLevel={characterLevel}
                    abilityModifier={spellcastingAbilityModifier} compact />
                  {((spell.mechanicsSummary ?? spell.description).length > 240 || spell.higherLevels || spell.rulesText) && (
                    <details className="gf-spell-full"><summary>Vollständige Wirkung und Regeln</summary>
                      <p>{spell.description}</p>
                      {spell.higherLevels && <p><strong>Höhere Grade:</strong> {spell.higherLevels}</p>}
                      {spell.rulesText && <details><summary>Regeltext (Englisch)</summary><p lang="en">{spell.rulesText}</p></details>}
                    </details>
                  )}
                </div>

                {showPreparedToggle &&
                  selected &&
                  spell.level > 0 && (
                  <button
                    type="button"
                    className="compact-spell-card__prepare"
                    aria-pressed={
                      prepared
                    }
                    onClick={() =>
                      onTogglePrepared(
                        spell.id,
                      )
                    }
                  >
                    {prepared
                      ? "Vorbereitet"
                      : "Vorbereiten"}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function countSelectedSpells(
  value: CharacterSpellcasting,
  spells: SpellDefinition[],
  predicate: (
    spell: SpellDefinition,
  ) => boolean,
): number {
  return value.spellIds.filter(
    (selection) => {
      const spell =
        spells.find(
          (entry) =>
            entry.id ===
            selection.spellId,
        );

      return (
        Boolean(spell) &&
        predicate(spell!)
      );
    },
  ).length;
}
