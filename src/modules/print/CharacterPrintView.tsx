import { getBeastCompanion } from "../sheet/utils/getBeastCompanion";
import { getSubclassSheetStats } from "../sheet/utils/getSubclassSheetStats";
import { getClassById, getSubclassById } from "../../compendium/classes";
import { getBackgroundById } from "../../compendium/backgrounds";
import { createPortal } from "react-dom";
import {
  abilityIds,
  abilityLabels,
  abilityShortLabels,
  defaultAbilityScores,
  formatAbilityModifier,
} from "../../compendium/core";
import { getSpellById } from "../../compendium/spells";
import { getFeatById } from "../../compendium/feats";
import { getGrantedSubclassSpellIds } from "../../compendium/classes";
import { resolveCharacterTransformation, transformationApplicationLabels, type ActiveTransformationFeature } from "../../compendium/transformations/activeRecord";
import { calculateCharacterRules } from "../../rules";
import { createCharacterRuleInput } from "../sheet/rules/createCharacterRuleInput";
import { getCharacterDerivedStats } from "../sheet/utils/getCharacterDerivedStats";
import { getCharacterInventory } from "../archives/utils/getCharacterInventory";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import { getSpellDisplayValues } from "../sheet/utils/getSpellDisplayValues";
import type { CharacterArchiveEntry } from "../archives/types";
import type { TransformationFeatureKind } from "../../compendium/transformations";
import "./character-print.css";
import "./folio.css";

interface CharacterPrintViewProps {
  character: CharacterArchiveEntry;
}

const emptyLines = Array.from({ length: 5 }, (_, index) => index);

const tableConditionLabels: Record<string, string> = {
  concentrating: "Konzentration",
  blessed: "Gesegnet",
  frightened: "Verängstigt",
  poisoned: "Vergiftet",
  restrained: "Festgesetzt",
  exhaustion: "Erschöpfung",
  unconscious: "Bewusstlos",
};

export function CharacterPrintView({ character }: CharacterPrintViewProps) {
  return createPortal(<CharacterPrintSheets character={character} />, document.body);
}

export function CharacterPrintSheets({ character }: CharacterPrintViewProps) {
  const companion = getBeastCompanion(character);
  const subclass = getSubclassById(character.classId ?? "", character.subclassId ?? "");
  const backgroundDefinition = getBackgroundById(character.backgroundId ?? "");
  const currentBackgroundFeature =
    backgroundDefinition?.feature ?? character.backgroundFeature;
  const inventory = getCharacterInventory(character);
  const vitals = getCharacterVitals(character);
  const derived = getCharacterDerivedStats(character, inventory);
  const rules = calculateCharacterRules(createCharacterRuleInput(character));
  const abilityScores = { ...defaultAbilityScores, ...character.abilityScores };

  const transformationRecord=resolveCharacterTransformation(character);
  const transformation=transformationRecord.definition;
  const transformationBoons=transformationRecord.features.filter(f=>f.group!=="flaw");
  const transformationFlaws=transformationRecord.features.filter(f=>f.group==="flaw");

  const grantedSpellIds = getGrantedSubclassSpellIds({
    classId: character.classId ?? "",
    subclassId: character.subclassId,
    level: character.level,
    pathChoices: character.pathChoices,
  });
  const effectiveSelections = [
    ...(character.spellcasting?.spellIds ?? []),
    ...grantedSpellIds
      .filter((spellId) => !(character.spellcasting?.spellIds ?? []).some((selection) => selection.spellId === spellId))
      .map((spellId) => ({ spellId, prepared: true })),
  ];
  const spells = effectiveSelections
    .map((selection) => ({ selection, spell: getSpellById(selection.spellId) }))
    .filter((entry): entry is { selection: typeof entry.selection; spell: NonNullable<typeof entry.spell> } => Boolean(entry.spell));
  const spellGroups = Array.from({ length: 10 }, (_, level) => ({
    level,
    spells: spells.filter((entry) => entry.spell.level === level),
  }));

  const pageOneSpells = spells
    .filter(({ spell, selection }) => spell.level === 0 || selection.prepared)
    .slice(0, 9)
    .map(({ spell, selection }) => {
      const display = getSpellDisplayValues({
        spell,
        invocations: character.pathChoices?.["warlock-invocations"],
        lifeDomainHealing: character.classId === "cleric" && character.subclassId === "life-domain",
        characterLevel: character.level,
        spellcastingAbilityModifier: derived.spellcasting.abilityModifier,
        spellAttackBonus: derived.spellcasting.spellAttackBonus,
        spellSaveDifficultyClass: derived.spellcasting.spellSaveDifficultyClass,
      });

      const mechanic = display.damage
        ? `${display.attackCount && display.attackCount > 1 ? display.attackCount + "× je " : spell.id === "magic-missile" ? "3× je " : ""}${display.damage.dice} ${display.damage.type}`
        : display.healing
          ? display.healing.formatted
          : display.savingThrow
            ? `${display.savingThrow.abilityLabel}-RW`
            : display.usesSpellAttack
              ? `Angriff ${display.spellAttackLabel ?? ""}`.trim()
              : "";

      return {
        id: spell.id,
        name: spell.name,
        level: spell.level,
        prepared: selection.prepared,
        mechanic,
      };
    });

  const classFeatureRows = rules.classFeatures.map((feature) => {
    const resource = feature.resourceId
      ? rules.classResources.find((entry) => entry.id === feature.resourceId)
      : undefined;

    return {
      ...feature,
      resource,
    };
  });

  const pageOneSlotSummary = Object.entries(derived.spellcasting.spellSlots)
    .filter(([, total]) => (total ?? 0) > 0)
    .map(([level, total]) => {
      const spent = character.spellcasting?.slots.spentSlots[
        Number(level) as keyof typeof character.spellcasting.slots.spentSlots
      ] ?? 0;
      const remaining = Math.max(0, (total ?? 0) - spent);
      return `${level}: ${remaining}/${total}`;
    })
    .join(" · ");

  const activeConditionLabels = (character.conditionIds ?? [])
    .map((conditionId) => tableConditionLabels[conditionId] ?? conditionId)
    .filter(Boolean);
  const resourceSummary = rules.classResources
    .filter((resource) => resource.maximum > 0)
    .map((resource) => `${resource.name}: ${resource.remaining}/${resource.maximum}`);
  const hitDieLabel = `W${getClassById(character.classId ?? "")?.hitDie ?? "—"}`;
  const chosenFeats = (character.featIds ?? [])
    .map((featId) => getFeatById(featId))
    .filter((feat): feat is NonNullable<typeof feat> => Boolean(feat));

  const identitySubtitle = [character.className, subclass?.name, character.level ? `Stufe ${character.level}` : "", character.ancestry]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="character-print-root" aria-hidden="true">
      {/* PAGE 1 — table-ready core sheet */}
      <section className="print-sheet print-sheet--core">
        <PrintBanner title={character.name || "Unbenannter Charakter"} subtitle={identitySubtitle || "GRIMFORGE · CHARAKTERAKTE"} />

        <div className="print-identity-strip">
          <PrintField label="Klasse & Stufe" value={`${character.className || "—"} ${character.level}`} />
          <PrintField label="Abstammung" value={character.ancestry || "—"} />
          <PrintField label="Hintergrund" value={character.backgroundName || "—"} />
          <PrintField label="Gesinnung" value={character.alignment || "—"} />
        </div>

        <div className="print-core-layout">
          <aside className="print-core-left">
            <section className="print-ability-stack" aria-label="Attribute">
              {abilityIds.map((abilityId) => (
                <div className="print-ability" key={abilityId}>
                  <div className="print-ability__label">
                    <b>{abilityShortLabels[abilityId]}</b>
                    <small>{abilityLabels[abilityId]}</small>
                  </div>
                  <strong>{abilityScores[abilityId]}</strong>
                  <em>{formatAbilityModifier(rules.abilityModifiers[abilityId])}</em>
                </div>
              ))}
            </section>

            <div className="print-mini-stats">
              <PrintStat label="Passive Wahrn." value={rules.passivePerception} compact />
              <PrintStat label="Passive Nachf." value={derived.passiveScores.investigation} compact />
              <PrintStat label="Übungsbonus" value={formatAbilityModifier(rules.proficiencyBonus)} compact />
            </div>

            <PrintPanel title="Rettungswürfe" compact>
              <div className="print-save-list">
                {abilityIds.map((abilityId) => (
                  <div key={abilityId}>
                    <b>{rules.savingThrows[abilityId] !== rules.abilityModifiers[abilityId] ? "●" : "○"}</b>
                    <span>{formatAbilityModifier(rules.savingThrows[abilityId])}</span>
                    <em>{abilityShortLabels[abilityId]}</em>
                  </div>
                ))}
              </div>
            </PrintPanel>
          </aside>

          <main className="print-core-main">
            <div className="print-vitals-grid">
              <PrintStat label="RK" value={derived.armorClass} shape="shield" />
              <PrintStat label="Initiative" value={formatAbilityModifier(rules.initiativeModifier)} />
              <PrintStat label="Bewegung" value={`${rules.speed} m`} />
              <PrintStat label="TP Max." value={vitals.maximumHitPoints} />
              <PrintStat label="TP Aktuell" value={vitals.currentHitPoints} />
              <PrintStat label="Temporär" value={vitals.temporaryHitPoints || "—"} />
            </div>

            <div className="print-death-strip">
              <strong>Todesrettungen</strong>
              <span>Erfolge {[1,2,3].map(n => n <= (character.deathSaves?.successes ?? 0) ? "●" : "○").join(" ")}</span>
              <span>Fehlschläge {[1,2,3].map(n => n <= (character.deathSaves?.failures ?? 0) ? "●" : "○").join(" ")}</span>
            </div>

            <div className="print-death-strip print-reserve-strip">
              <strong>Reserven</strong>
              <span>Trefferwürfel {Math.max(0, character.level - (character.spentHitDice ?? 0))}/{character.level} {hitDieLabel}</span>
              <span>Inspiration {character.inspiration ? "●" : "○"}</span>
            </div>

            <PrintPanel title="Live am Tisch" compact>
              <div className="print-tabletop-grid">
                <PrintNumberLine label="Aktive Zustände" value={activeConditionLabels.length > 0 ? activeConditionLabels.join(" · ") : "Keine"} />
                {!!character.exhaustionLevel && <PrintNumberLine label="Erschöpfung" value={`Stufe ${character.exhaustionLevel}/6`} />}
                <PrintNumberLine label="Unterklasse" value={subclass?.name ?? "—"} />
              </div>
              {resourceSummary.length > 0 && (
                <div className="print-tabletop-resources">
                  {resourceSummary.map((resource) => <span key={resource}>{resource}</span>)}
                </div>
              )}
            </PrintPanel>

            <PrintPanel title="Angriffe">
              {rules.classFeatures.some(feature => feature.id.endsWith("-extra-attack")) && <p>Angriffsaktion: zwei Angriffe.</p>}
              <div className="print-attacks-grid" role="table" aria-label="Angriffe und Zauberwirken">
                <div className="print-attacks-head" role="row">
                  <span>Name</span>
                  <span>Angriff</span>
                  <span>Schaden / Art</span>
                </div>
                {derived.equippedWeapons.map((weapon) => (
                  <div className="print-attack-row" role="row" key={weapon.id}>
                    <div className="print-attack-name">
                      <strong>{weapon.name}</strong>
                      {weapon.quantity > 1 && <small>×{weapon.quantity}</small>}
                    </div>
                    <div className="print-attack-bonus">{weapon.attackBonusLabel}</div>
                    <div className="print-attack-damage">
                      <strong>{weapon.damage} {weapon.damageType}</strong>
                      {(weapon.versatileDamage || weapon.range) && (
                        <small>
                          {weapon.versatileDamage ? `2H ${weapon.versatileDamage} ${weapon.damageType}` : ""}
                          {weapon.versatileDamage && weapon.range ? " · " : ""}
                          {weapon.range ? `${weapon.range}` : ""}
                        </small>
                      )}
                    </div>
                  </div>
                ))}
                {derived.equippedWeapons.length === 0 && emptyLines.slice(0, 3).map((line) => (
                  <div className="print-attack-row print-attack-row--empty" role="row" key={line}>
                    <div>&nbsp;</div><div></div><div></div>
                  </div>
                ))}
              </div>
            </PrintPanel>

            {derived.spellcasting.enabled && (
              <PrintPanel title="Zauber — spielbereit" compact>
                <div className="print-page1-spell-meta">
                  <span><b>Attribut</b> {derived.spellcasting.abilityId ? abilityShortLabels[derived.spellcasting.abilityId] : "—"}</span>
                  <span><b>SG</b> {derived.spellcasting.spellSaveDifficultyClass ?? "—"}</span>
                  <span><b>Angriff</b> {formatAbilityModifier(derived.spellcasting.spellAttackBonus ?? 0)}</span>
                  {derived.spellcasting.pactSlots && <span><b>Paktplätze</b> {Math.max(0, derived.spellcasting.pactSlots.slots - (character.spellcasting?.slots.spentPactSlots ?? 0))}/{derived.spellcasting.pactSlots.slots} · Grad {derived.spellcasting.pactSlots.slotLevel}</span>}
                  {pageOneSlotSummary && <span className="print-page1-slots"><b>Plätze</b> {pageOneSlotSummary}</span>}
                </div>
                <div className="print-page1-spells">
                  {pageOneSpells.map((spell) => (
                    <div className="print-page1-spell-row" key={spell.id}>
                      <span className="print-page1-spell-level">{spell.level === 0 ? "ZT" : spell.level}</span>
                      <strong>{spell.name}</strong>
                      <em>{spell.mechanic}</em>
                    </div>
                  ))}
                  {spells.length > pageOneSpells.length && <span>Weitere Zauber: siehe Zauberblatt.</span>}
                  {pageOneSpells.length === 0 && <PrintRuleLine text="Keine vorbereiteten Zauber." />}
                </div>
              </PrintPanel>
            )}

            <PrintPanel title="Notizen" grow>
              <div className="print-notes-area" aria-label="Notizen">
                {Array.from({ length: derived.spellcasting.enabled ? 12 : 18 }, (_, index) => (
                  <div className="print-note-line" key={index} />
                ))}
              </div>
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

          </aside>
        </div>
      </section>

      <section className="print-sheet folio-details">
        <PrintBanner title="Merkmale & Ausrüstung" subtitle={identitySubtitle} />
        <p>{character.name}</p>
        {companion && <PrintPanel title={"Tiergefährte: " + companion.name}>
          <p>RK {companion.armor} · TP {companion.hp} · {companion.speed} · Passive Wahrnehmung {companion.passive}</p>
          {companion.attacks.map(a => <p key={a.name}>{a.name}: {a.attack} · {a.damage} {a.note}</p>)}<p>{companion.traits}</p>
        </PrintPanel>}
        {getSubclassSheetStats(character).map(stat => <p key={stat.label}><b>{stat.label}: {stat.value}</b>{stat.condition && " · " + stat.condition}</p>)}
            <PrintPanel title="Klassenmerkmale & Ressourcen" compact>
              <div className="print-class-feature-grid">
                {classFeatureRows.map((feature) => (
                  <div className="print-class-feature" key={feature.id}>
                    <div className="print-class-feature__head">
                      <strong>{feature.name}</strong>
                      <span>{formatPrintFeatureKind(feature.kind)}</span>
                    </div>
                    <p>{feature.description}</p>
                    {feature.resource && (
                      <div className="print-class-feature__resource">
                        <b>{feature.resource.remaining}/{feature.resource.maximum}</b>
                        <span>{formatPrintRecharge(feature.resource.recharge)}</span>
                      </div>
                    )}
                  </div>
                ))}
                {classFeatureRows.length === 0 && <PrintRuleLine text="Keine Klassenmerkmale für diese Stufe." />}
              </div>
            </PrintPanel>

            {chosenFeats.length > 0 && (
              <PrintPanel title="Talente" compact>
                <div className="print-class-feature-grid">
                  {chosenFeats.map((feat) => (
                    <div className="print-class-feature" key={feat.id}>
                      <div className="print-class-feature__head">
                        <strong>{feat.name}</strong>
                        <span>Talent</span>
                      </div>
                      <p>{feat.description}</p>
                    </div>
                  ))}
                </div>
              </PrintPanel>
            )}

            <PrintPanel title="Ausrüstung & Währung" grow>
              <div className="print-currency">GM {inventory.currency.gold} · SM {inventory.currency.silver} · KM {inventory.currency.copper}</div>
              <div className="print-inventory-list">
                {inventory.items.map((item) => (
                  <PrintRuleLine key={item.id} text={`${item.quantity > 1 ? `${item.quantity}× ` : ""}${item.name}${item.equipped ? " · ●" : ""}${item.homebrew && item.notes ? " · " + item.notes : ""}`} />
                ))}
              </div>
            </PrintPanel>

            <PrintPanel title="Werkzeuge & Sprachen">
              {(character.toolProficiencies ?? []).map((tool) => <PrintRuleLine key={tool} text={tool} />)}
              {(character.languageChoices ?? 0) > 0 && <PrintRuleLine text={`Zusätzliche Sprachen: ${character.languageChoices}`} />}
              {(character.toolProficiencies ?? []).length === 0 && (character.languageChoices ?? 0) === 0 && emptyLines.slice(0, 2).map((line) => <PrintRuleLine key={line} />)}
            </PrintPanel>

      </section>
      {/* PAGE 2 — story / transformation */}
      <section className="print-sheet print-sheet--story">
        <PrintBanner title={character.name || "Unbenannter Charakter"} subtitle="GESCHICHTE · TRANSFORMATION · SCHÄTZE" />
        <div className="print-story-meta">
          <PrintField label="Klasse & Stufe" value={`${character.className || "—"} ${character.level}`} />
          <PrintField label="Abstammung" value={character.ancestry || "—"} />
          <PrintField label="Hintergrund" value={character.backgroundName || "—"} />
          <PrintField label="Titel" value={character.title || "—"} />
        </div>

        <div className="print-story-columns print-story-columns--no-portrait">
          <PrintPanel title="Charaktergeschichte" grow>
            {(character.journal?.background || character.summary) ? (
              <p className="print-long-text">{character.journal?.background || character.summary}</p>
            ) : (
              <div className="print-story-writing-lines">
                {Array.from({ length: 12 }, (_, index) => <div className="print-note-line" key={`story-${index}`} />)}
              </div>
            )}
          </PrintPanel>

          <PrintPanel title="Hintergrund & Persönlichkeit" grow>
            {currentBackgroundFeature?.name && <h3>{currentBackgroundFeature.name}</h3>}
            {currentBackgroundFeature?.description && <p className="print-long-text">{currentBackgroundFeature.description}</p>}
            {character.journal?.personality && <StoryNote label="Persönlichkeit" text={character.journal.personality} />}
            {character.journal?.ideals && <StoryNote label="Ideale" text={character.journal.ideals} />}
            {character.journal?.bonds && <StoryNote label="Bindungen" text={character.journal.bonds} />}
            {character.journal?.flaws && <StoryNote label="Makel" text={character.journal.flaws} />}
            {!character.journal?.personality && !character.journal?.ideals && !character.journal?.bonds && !character.journal?.flaws && (
              <div className="print-personality-writing-grid">
                <div>
                  <h3>Persönlichkeit & Ideale</h3>
                  {Array.from({ length: 5 }, (_, index) => <div className="print-note-line" key={`personality-${index}`} />)}
                </div>
                <div>
                  <h3>Bindungen & Makel</h3>
                  {Array.from({ length: 5 }, (_, index) => <div className="print-note-line" key={`bonds-${index}`} />)}
                </div>
              </div>
            )}
          </PrintPanel>
        </div>

        <PrintPanel title="Transformation">
          <div className="print-transformation-meta">
            <PrintNumberLine label="Typ" value={transformationRecord.name || "Keine"} />
            <PrintNumberLine label="Stufe" value={transformationRecord.stage} />
            <PrintNumberLine label="Ursprung" value={transformation?.origin || "—"} />
          </div>
          {transformationRecord.warning && <p>{transformationRecord.warning}</p>}
          <div className="print-transformation-grid">
            <div>
              <h3>Segen & Merkmale</h3>
              {transformationBoons.map((feature) => <PrintTransformationRule key={`${feature.stage}-${feature.id}`} feature={feature} />)}
              {transformationBoons.length === 0 && emptyLines.slice(0, 4).map((line) => <PrintRuleLine key={line} />)}
            </div>
            <div>
              <h3>Makel & Konsequenzen</h3>
              {transformationFlaws.map((feature) => <PrintTransformationRule key={`${feature.stage}-${feature.id}`} feature={feature} />)}
              {transformationFlaws.length === 0 && emptyLines.slice(0, 4).map((line) => <PrintRuleLine key={line} />)}
            </div>
          </div>
        </PrintPanel>

        <div className="print-story-bottom">
          <PrintPanel title="Schätze, Kontakte & Notizen" grow>
            {emptyLines.concat([5, 6]).map((line) => <PrintRuleLine key={line} />)}
          </PrintPanel>
          <PrintPanel title="Motivationen & Ziele" grow>
            {character.journal?.motivations && <p className="print-long-text">{character.journal.motivations}</p>}
            {(character.journal?.goals ?? []).slice(0, 5).map((goal) => <PrintRuleLine key={goal.id} text={`${goal.status === "completed" ? "✓" : "○"} ${goal.title}`} />)}
          </PrintPanel>
        </div>
      </section>

      {/* PAGE 3 — spells only when relevant */}
      {derived.spellcasting.enabled && (
        <section className="print-sheet print-sheet--spells">
          <PrintBanner title="Zauberwirken" subtitle={`${character.name || "Charakter"} · ${character.className}`} />
          <div className="print-spell-header">
            <PrintStat label="Attribut" value={derived.spellcasting.abilityId ? abilityShortLabels[derived.spellcasting.abilityId] : "—"} />
            <PrintStat label="Zauber-SG" value={derived.spellcasting.spellSaveDifficultyClass ?? "—"} />
            <PrintStat label="Zauberangriff" value={formatAbilityModifier(derived.spellcasting.spellAttackBonus ?? 0)} />
            <PrintStat label="Fokus" value={derived.spellcasting.focusLabel || "—"} />
          </div>
          {derived.spellcasting.pactSlots && <p>Paktplätze: {Math.max(0, derived.spellcasting.pactSlots.slots - (character.spellcasting?.slots.spentPactSlots ?? 0))}/{derived.spellcasting.pactSlots.slots} frei · Grad {derived.spellcasting.pactSlots.slotLevel}</p>}
          <div className="print-spell-grid">
            {spellGroups.filter(group => group.spells.length || derived.spellcasting.spellSlots[group.level as keyof typeof derived.spellcasting.spellSlots]).map(({ level, spells: levelSpells }) => (
              <PrintPanel key={level} title={level === 0 ? "Zaubertricks" : `Grad ${level}`} compact>
                {level > 0 && Boolean(derived.spellcasting.spellSlots[level as keyof typeof derived.spellcasting.spellSlots] || derived.spellcasting.pactSlots?.slotLevel === level) && (
                  <div className="print-slot-row">
                    <b>{derived.spellcasting.pactSlots?.slotLevel === level ? "Paktplätze" : "Plätze"}</b>
                    {derived.spellcasting.pactSlots?.slotLevel === level && <span>{Math.max(0, derived.spellcasting.pactSlots.slots - (character.spellcasting?.slots.spentPactSlots ?? 0))}/{derived.spellcasting.pactSlots.slots} frei</span>}
                    <span>{Array.from({ length: derived.spellcasting.spellSlots[level as keyof typeof derived.spellcasting.spellSlots] ?? 0 }, (_, index) => {
                      const spent = character.spellcasting?.slots.spentSlots[level as keyof typeof character.spellcasting.slots.spentSlots] ?? 0;
                      return <i key={index}>{index < spent ? "●" : "○"}</i>;
                    })}</span>
                  </div>
                )}
                <div className="print-spell-list print-spell-list--detailed">
                  <div className="print-spell-detail-head" aria-hidden="true">
                    <span />
                    <span>Zauber</span>
                    <span>Reichweite</span>
                    <span>Schaden / Effekt</span>
                  </div>
                  {levelSpells.map(({ spell, selection }) => {
                    const display = getSpellDisplayValues({
                      spell,
                      invocations: character.pathChoices?.["warlock-invocations"],
        lifeDomainHealing: character.classId === "cleric" && character.subclassId === "life-domain",
                      characterLevel: character.level,
                      spellcastingAbilityModifier: derived.spellcasting.abilityModifier,
                      spellAttackBonus: derived.spellcasting.spellAttackBonus,
                      spellSaveDifficultyClass: derived.spellcasting.spellSaveDifficultyClass,
                    });

                    const effectParts: string[] = [];
                    if (display.damage) {
                      effectParts.push(`${display.attackCount && display.attackCount > 1 ? display.attackCount + "× je " : spell.id === "magic-missile" ? "3× je " : ""}${display.damage.dice} ${display.damage.type}`);
                    }
                    if (display.healing) {
                      effectParts.push(`${display.healing.formatted} Heilung`);
                    }
                    if (display.savingThrow) {
                      effectParts.push(
                        `${display.savingThrow.abilityLabel}-RW${
                          display.savingThrow.difficultyClass
                            ? ` SG ${display.savingThrow.difficultyClass}`
                            : ""
                        }`,
                      );
                    } else if (display.usesSpellAttack) {
                      effectParts.push(
                        `Angriff ${display.spellAttackLabel ?? ""}`.trim(),
                      );
                    }

                    const effect = effectParts.length > 0
                      ? effectParts.join(" · ")
                      : "—";

                    return (
                      <div className="print-spell-detail-row" key={spell.id}>
                        <span className="print-spell-prepared">{selection.prepared ? "●" : "○"}</span>
                        <strong className="print-spell-name">{spell.name}</strong>
                        <span className="print-spell-range">{spell.range || "—"}</span>
                        <span className="print-spell-effect">{effect !== "—" && <b>{effect} · </b>}{spell.description} <i>{[spell.castingTime, spell.duration, spell.concentration && "Konzentration", spell.ritual && "Ritual", [spell.components.verbal && "V", spell.components.somatic && "G", spell.components.material && ("M" + (spell.components.materialDescription ? ": "+spell.components.materialDescription : ""))].filter(Boolean).join("/"), spell.level > 0 && spell.higherLevels].filter(Boolean).join(" · ")}</i></span>
                      </div>
                    );
                  })}
                  {levelSpells.length === 0 && (
                    <div className="print-spell-empty">
                      {emptyLines.slice(0, level === 0 ? 4 : 2).map((line) => <PrintRuleLine key={line} />)}
                    </div>
                  )}
                </div>
              </PrintPanel>
            ))}
          </div>
        </section>
      )}

      {/* Optional appendix — only if there is actual journal content */}
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
              {character.journal?.goals.map((goal) => <PrintRuleLine key={goal.id} text={`${goal.status === "completed" ? "✓" : goal.status === "abandoned" ? "×" : "○"} ${goal.title}${goal.details ? ` — ${goal.details}` : ""}`} />)}
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
    </div>
  );
}

function PrintBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return <header className="print-banner"><span>{subtitle}</span><h1>{title}</h1></header>;
}
function PrintField({ label, value }: { label: string; value: string | number }) {
  return <div className="print-field"><span>{label}</span><strong>{value}</strong></div>;
}

const printFeatureKindLabels = {
  passive: "Passiv",
  action: "Aktion",
  "bonus-action": "Bonusaktion",
  reaction: "Reaktion",
  resource: "Ressource",
  benefit: "Segen",
  drawback: "Makel",
} as const;

function formatPrintFeatureKind(kind: keyof typeof printFeatureKindLabels | TransformationFeatureKind): string {
  return printFeatureKindLabels[kind as keyof typeof printFeatureKindLabels] ?? kind;
}

const printRechargeLabels = {
  turn: "Pro Zug",
  "short-rest": "Kurze Rast",
  "long-rest": "Lange Rast",
} as const;

function formatPrintRecharge(recharge: keyof typeof printRechargeLabels): string {
  return printRechargeLabels[recharge];
}

function PrintPanel({ title, children, grow = false, compact = false }: { title: string; children: React.ReactNode; grow?: boolean; compact?: boolean }) {
  return <section className={`print-panel${grow ? " print-panel--grow" : ""}${compact ? " print-panel--compact" : ""}`}><h2>{title}</h2><div className="print-panel__body">{children}</div></section>;
}
function PrintStat({ label, value, shape, compact = false }: { label: string; value: string | number; shape?: "shield"; compact?: boolean }) {
  return <div className={`print-stat${shape ? ` print-stat--${shape}` : ""}${compact ? " print-stat--compact" : ""}`}><strong>{value}</strong><span>{label}</span></div>;
}
function PrintNumberLine({ label, value }: { label: string; value: string | number }) {
  return <div className="print-number-line"><span>{label}</span><strong>{value}</strong></div>;
}
function PrintRuleLine({ text = "" }: { text?: string }) {
  return <div className="print-rule-line">{text}</div>;
}
function PrintTransformationRule({ feature }: { feature: ActiveTransformationFeature }) {
  return (
    <article className={`print-transformation-rule print-transformation-rule--${feature.kind}`}>
      <header>
        <strong>{feature.stage}. {feature.name}</strong>
        <span>{formatPrintFeatureKind(feature.kind)}</span>
      </header>
      <p><b>{transformationApplicationLabels[feature.application]}:</b> {feature.description}</p>
    </article>
  );
}
function StoryNote({ label, text }: { label: string; text: string }) {
  return <div className="print-story-note"><b>{label}</b><p>{text}</p></div>;
}
function hasPrintableJournal(journal: CharacterArchiveEntry["journal"]): boolean {
  if (!journal) return false;
  return [journal.background, journal.motivations, journal.personality, journal.ideals, journal.bonds, journal.flaws, journal.fears, journal.secrets].some((value) => value.trim().length > 0) || journal.goals.length > 0 || journal.relationships.length > 0 || journal.factions.length > 0 || journal.sessionNotes.length > 0;
}
function PrintJournalText({ title, text, wide = false }: { title: string; text?: string; wide?: boolean }) {
  if (!text?.trim()) return null;
  return <section className={`print-journal-text${wide ? " print-journal-text--wide" : ""}`}><h2>{title}</h2><p>{text}</p></section>;
}
