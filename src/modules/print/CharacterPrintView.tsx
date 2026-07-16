import { createPortal } from "react-dom";
import {
  abilityIds,
  abilityLabels,
  abilityShortLabels,
  defaultAbilityScores,
  formatAbilityModifier,
} from "../../compendium/core";
import {
  getAncestryTraitById,
} from "../../compendium/ancestries";
import {
  getSpellById,
} from "../../compendium/spells";
import {
  getTransformationById,
} from "../../compendium/transformations";
import {
  calculateCharacterRules,
} from "../../rules";
import {
  createCharacterRuleInput,
} from "../sheet/rules/createCharacterRuleInput";
import {
  getCharacterDerivedStats,
} from "../sheet/utils/getCharacterDerivedStats";
import {
  getCharacterInventory,
} from "../archives/utils/getCharacterInventory";
import {
  getCharacterVitals,
} from "../archives/utils/getCharacterVitals";
import type {
  CharacterArchiveEntry,
} from "../archives/types";
import "./character-print.css";

interface CharacterPrintViewProps {
  character: CharacterArchiveEntry;
}

const emptyLines = Array.from({ length: 5 }, (_, index) => index);

export function CharacterPrintView({ character }: CharacterPrintViewProps) {
  const inventory = getCharacterInventory(character);
  const vitals = getCharacterVitals(character);
  const derived = getCharacterDerivedStats(character, inventory);
  const rules = calculateCharacterRules(createCharacterRuleInput(character));
  const abilityScores = {
    ...defaultAbilityScores,
    ...character.abilityScores,
  };

  const ancestryTraits = (character.ancestryTraitIds ?? [])
    .map((id) => getAncestryTraitById(id))
    .filter((trait): trait is NonNullable<typeof trait> => Boolean(trait));

  const transformation = character.transformationId
    ? getTransformationById(character.transformationId)
    : undefined;

  const spells = (character.spellcasting?.spellIds ?? [])
    .map((selection) => ({
      selection,
      spell: getSpellById(selection.spellId),
    }))
    .filter((entry): entry is { selection: typeof entry.selection; spell: NonNullable<typeof entry.spell> } => Boolean(entry.spell));

  const spellGroups = Array.from({ length: 10 }, (_, level) => ({
    level,
    spells: spells.filter((entry) => entry.spell.level === level),
  }));

  return createPortal(
    <div className="character-print-root" aria-hidden="true">
      <section className="print-sheet print-sheet--core">
        <PrintBanner title={character.name || "Unbenannter Charakter"} subtitle="GRIMFORGE · CHARAKTERAKTE" />

        <div className="print-identity-grid">
          <PrintField label="Klasse & Stufe" value={`${character.className || "—"} ${character.level}`} />
          <PrintField label="Abstammung" value={character.ancestry || "—"} />
          <PrintField label="Hintergrund" value={character.backgroundName || "—"} />
          <PrintField label="Gesinnung" value={character.alignment || "—"} />
          <PrintField label="Titel" value={character.title || "—"} />
          <PrintField label="Pronomen" value={character.pronouns || "—"} />
        </div>

        <div className="print-core-grid">
          <aside className="print-abilities-column">
            {abilityIds.map((abilityId) => (
              <div className="print-ability" key={abilityId}>
                <span>{abilityShortLabels[abilityId]}</span>
                <strong>{abilityScores[abilityId]}</strong>
                <em>{formatAbilityModifier(rules.abilityModifiers[abilityId])}</em>
                <small>{abilityLabels[abilityId]}</small>
              </div>
            ))}
            <div className="print-passive-box">
              <strong>{rules.passivePerception}</strong>
              <span>Passive Wahrnehmung</span>
            </div>
          </aside>

          <main className="print-core-center">
            <div className="print-skull-medallion" aria-hidden="true">☠</div>
            <div className="print-vitals-row">
              <PrintStat label="RK" value={derived.armorClass} shape="shield" />
              <PrintStat label="Initiative" value={formatAbilityModifier(rules.initiativeModifier)} />
              <PrintStat label="Bewegung" value={`${rules.speed} m`} />
              <PrintStat label="Übungsbonus" value={formatAbilityModifier(rules.proficiencyBonus)} />
            </div>

            <PrintPanel title="Trefferpunkte">
              <div className="print-hp-grid">
                <PrintNumberLine label="Maximum" value={vitals.maximumHitPoints} />
                <PrintNumberLine label="Aktuell" value={vitals.currentHitPoints} />
                <PrintNumberLine label="Temporär" value={vitals.temporaryHitPoints} />
              </div>
              <div className="print-death-saves">
                <span>Erfolge ○ ○ ○</span>
                <span>Fehlschläge ○ ○ ○</span>
              </div>
            </PrintPanel>

            <PrintPanel title="Rettungswürfe">
              <div className="print-two-column-list">
                {abilityIds.map((abilityId) => (
                  <div key={abilityId}>
                    <b>{character.classId && rules.savingThrows[abilityId] !== rules.abilityModifiers[abilityId] ? "●" : "○"}</b>
                    <span>{formatAbilityModifier(rules.savingThrows[abilityId])}</span>
                    {abilityLabels[abilityId]}
                  </div>
                ))}
              </div>
            </PrintPanel>

            <PrintPanel title="Merkmale & Eigenschaften" grow>
              {[...ancestryTraits.map((trait) => trait.name), ...rules.classFeatures.map((feature) => feature.name)]
                .slice(0, 12)
                .map((name) => <PrintRuleLine key={name} text={name} />)}
              {ancestryTraits.length === 0 && rules.classFeatures.length === 0 && emptyLines.map((line) => <PrintRuleLine key={line} />)}
            </PrintPanel>
          </main>

          <aside className="print-core-right">
            <PrintPanel title="Fertigkeiten" compact>
              <div className="print-skills-list">
                {rules.skillBonuses.map((skill) => (
                  <div key={skill.id}>
                    <b>{skill.expertise ? "◆" : skill.proficient ? "●" : "○"}</b>
                    <span>{formatAbilityModifier(skill.bonus)}</span>
                    <em>{skill.name}</em>
                  </div>
                ))}
              </div>
            </PrintPanel>

            <PrintPanel title="Angriffe & Zauberwirken">
              <table className="print-table print-attack-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Angriff</th>
                    <th>Schaden / Art</th>
                  </tr>
                </thead>
                <tbody>
                  {derived.equippedWeapons.slice(0, 5).map((weapon) => (
                    <tr key={weapon.id}>
                      <td>
                        <strong>{weapon.name}</strong>
                        <small>
                          {weapon.proficient ? "geübt" : "nicht geübt"}
                          {weapon.quantity > 1 ? ` · ×${weapon.quantity}` : ""}
                        </small>
                      </td>
                      <td>{weapon.attackBonusLabel}</td>
                      <td>
                        <strong>{weapon.damage} {weapon.damageType}</strong>
                        {weapon.details && <small>{weapon.details}</small>}
                      </td>
                    </tr>
                  ))}
                  {derived.equippedWeapons.length === 0 && emptyLines.slice(0, 4).map((line) => (
                    <tr key={line}><td>&nbsp;</td><td></td><td></td></tr>
                  ))}
                </tbody>
              </table>
            </PrintPanel>

            <PrintPanel title="Werkzeuge, Sprachen & Übung" grow>
              {(character.toolProficiencies ?? []).map((tool) => <PrintRuleLine key={tool} text={tool} />)}
              <PrintRuleLine text={`Sprachen nach Wahl: ${character.languageChoices ?? 0}`} />
              {emptyLines.slice(0, 4).map((line) => <PrintRuleLine key={line} />)}
            </PrintPanel>
          </aside>
        </div>

        <div className="print-lower-grid">
          <PrintPanel title="Ausrüstung & Währung">
            <div className="print-currency">GM {inventory.currency.gold} · SM {inventory.currency.silver} · KM {inventory.currency.copper}</div>
            {inventory.items.slice(0, 8).map((item) => <PrintRuleLine key={item.id} text={`${item.quantity}× ${item.name}${item.equipped ? " · ausgerüstet" : ""}`} />)}
          </PrintPanel>
          <PrintPanel title="Persönlichkeit, Ideale, Bindungen & Makel">
            <p className="print-summary">{character.summary || ""}</p>
          </PrintPanel>
        </div>
      </section>

      <section className="print-sheet print-sheet--story">
        <PrintBanner title={character.name || "Unbenannter Charakter"} subtitle="GESCHICHTE · TRANSFORMATION · SCHÄTZE" />
        <div className="print-story-meta">
          <PrintField label="Klasse & Stufe" value={`${character.className || "—"} ${character.level}`} />
          <PrintField label="Abstammung" value={character.ancestry || "—"} />
          <PrintField label="Hintergrund" value={character.backgroundName || "—"} />
          <PrintField label="Status" value={character.status} />
        </div>
        <div className="print-story-columns">
          <PrintPanel title="Charaktergeschichte" grow>
            <p className="print-long-text">{character.summary || "Noch keine Geschichte eingetragen."}</p>
          </PrintPanel>
          <div className="print-portrait-frame">
            <div className="print-portrait-symbol">⚔</div>
            <span>PORTRÄT / WAPPEN</span>
          </div>
          <PrintPanel title="Erweiterter Hintergrund" grow>
            {character.backgroundFeature?.name && <h3>{character.backgroundFeature.name}</h3>}
            <p className="print-long-text">{character.backgroundFeature?.description || ""}</p>
          </PrintPanel>
        </div>

        <PrintPanel title="Transformation">
          <div className="print-transformation-meta">
            <PrintNumberLine label="Typ" value={transformation?.name || character.transformation || "Keine"} />
            <PrintNumberLine label="Stufe" value={character.transformationStage ?? 0} />
            <PrintNumberLine label="Save DC" value="" />
          </div>
          <div className="print-transformation-grid">
            <div><h3>Boons & Merkmale</h3>{(character.transformationFeatureIds ?? []).map((id) => <PrintRuleLine key={id} text={id} />)}{emptyLines.map((line) => <PrintRuleLine key={line} />)}</div>
            <div><h3>Flaws & Konsequenzen</h3>{emptyLines.concat([5, 6]).map((line) => <PrintRuleLine key={line} />)}</div>
          </div>
        </PrintPanel>

        <PrintPanel title="Schätze, Kontakte & wichtige Notizen" grow>
          {emptyLines.concat([5, 6, 7]).map((line) => <PrintRuleLine key={line} />)}
        </PrintPanel>
      </section>

      {hasPrintableJournal(character.journal) && (
        <section className="print-sheet print-sheet--journal">
          <PrintBanner title="Charakterjournal" subtitle={`${character.name || "Charakter"} · PERSÖNLICHE AUFZEICHNUNGEN`} />
          <div className="print-journal-grid">
            <PrintJournalText title="Hintergrund" text={character.journal?.background} wide />
            <PrintJournalText title="Motivationen" text={character.journal?.motivations} />
            <PrintJournalText title="Persönlichkeit" text={character.journal?.personality} />
            <PrintJournalText title="Ideale" text={character.journal?.ideals} />
            <PrintJournalText title="Bindungen" text={character.journal?.bonds} />
            <PrintJournalText title="Makel" text={character.journal?.flaws} />
            <PrintJournalText title="Ängste" text={character.journal?.fears} />
            <PrintJournalText title="Geheimnisse" text={character.journal?.secrets} />
          </div>
          {(character.journal?.goals.length ?? 0) > 0 && (
            <PrintPanel title="Ziele">
              {character.journal?.goals.map((goal) => (
                <PrintRuleLine key={goal.id} text={`${goal.status === "completed" ? "✓" : goal.status === "abandoned" ? "×" : "○"} ${goal.title}${goal.details ? ` — ${goal.details}` : ""}`} />
              ))}
            </PrintPanel>
          )}
          <div className="print-journal-columns">
            {(character.journal?.relationships.length ?? 0) > 0 && (
              <PrintPanel title="Beziehungen">
                {character.journal?.relationships.map((entry) => <PrintRuleLine key={entry.id} text={`${entry.name} · ${entry.type}${entry.notes ? ` — ${entry.notes}` : ""}`} />)}
              </PrintPanel>
            )}
            {(character.journal?.factions.length ?? 0) > 0 && (
              <PrintPanel title="Fraktionen">
                {character.journal?.factions.map((entry) => <PrintRuleLine key={entry.id} text={`${entry.name}${entry.rank ? ` · ${entry.rank}` : ""}${entry.standing ? ` · ${entry.standing}` : ""}${entry.notes ? ` — ${entry.notes}` : ""}`} />)}
              </PrintPanel>
            )}
          </div>
          {(character.journal?.sessionNotes.length ?? 0) > 0 && (
            <PrintPanel title="Sitzungsnotizen" grow>
              {[...(character.journal?.sessionNotes ?? [])].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map((note) => (
                <div className="print-journal-session" key={note.id}>
                  <h3>{note.title} <span>{note.date}</span></h3>
                  <p>{note.notes}</p>
                </div>
              ))}
            </PrintPanel>
          )}
        </section>
      )}

      {derived.spellcasting.enabled && (
        <section className="print-sheet print-sheet--spells">
          <PrintBanner title="Zauberwirken" subtitle={`${character.name || "Charakter"} · ${character.className}`} />
          <div className="print-spell-header">
            <PrintStat label="Attribut" value={derived.spellcasting.abilityId ? abilityShortLabels[derived.spellcasting.abilityId] : "—"} />
            <PrintStat label="Zauber-SG" value={derived.spellcasting.spellSaveDifficultyClass ?? "—"} />
            <PrintStat label="Zauberangriff" value={formatAbilityModifier(derived.spellcasting.spellAttackBonus ?? 0)} />
            <PrintStat label="Fokus" value={derived.spellcasting.focusLabel || "—"} />
          </div>
          <div className="print-spell-grid">
            {spellGroups.map(({ level, spells: levelSpells }) => (
              <PrintPanel key={level} title={level === 0 ? "Zaubertricks" : `Grad ${level}`} compact>
                {level > 0 && <div className="print-slot-row">Plätze: {Array.from({ length: derived.spellcasting.spellSlots[level as keyof typeof derived.spellcasting.spellSlots] ?? 0 }, (_, index) => <span key={index}>○</span>)}</div>}
                {levelSpells.map(({ spell, selection }) => <PrintRuleLine key={spell.id} text={`${selection.prepared ? "●" : "○"} ${spell.name}`} />)}
                {levelSpells.length === 0 && emptyLines.slice(0, level === 0 ? 8 : 5).map((line) => <PrintRuleLine key={line} />)}
              </PrintPanel>
            ))}
          </div>
        </section>
      )}
    </div>,
    document.body,
  );
}

function PrintBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return <header className="print-banner"><span>{subtitle}</span><h1>{title}</h1></header>;
}

function PrintField({ label, value }: { label: string; value: string | number }) {
  return <div className="print-field"><span>{label}</span><strong>{value}</strong></div>;
}

function PrintPanel({ title, children, grow = false, compact = false }: { title: string; children: React.ReactNode; grow?: boolean; compact?: boolean }) {
  return <section className={`print-panel${grow ? " print-panel--grow" : ""}${compact ? " print-panel--compact" : ""}`}><h2>{title}</h2><div className="print-panel__body">{children}</div></section>;
}

function PrintStat({ label, value, shape }: { label: string; value: string | number; shape?: "shield" }) {
  return <div className={`print-stat${shape ? ` print-stat--${shape}` : ""}`}><strong>{value}</strong><span>{label}</span></div>;
}

function PrintNumberLine({ label, value }: { label: string; value: string | number }) {
  return <div className="print-number-line"><span>{label}</span><strong>{value}</strong></div>;
}

function PrintRuleLine({ text = "" }: { text?: string }) {
  return <div className="print-rule-line">{text}</div>;
}

function hasPrintableJournal(journal: CharacterArchiveEntry["journal"]): boolean {
  if (!journal) return false;
  return [journal.background, journal.motivations, journal.personality, journal.ideals, journal.bonds, journal.flaws, journal.fears, journal.secrets].some((value) => value.trim().length > 0) || journal.goals.length > 0 || journal.relationships.length > 0 || journal.factions.length > 0 || journal.sessionNotes.length > 0;
}

function PrintJournalText({ title, text, wide = false }: { title: string; text?: string; wide?: boolean }) {
  if (!text?.trim()) return null;
  return <section className={`print-journal-text${wide ? " print-journal-text--wide" : ""}`}><h2>{title}</h2><p>{text}</p></section>;
}
