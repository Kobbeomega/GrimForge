/* SSR smoke tests independent of Vite's platform-native dev server. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
for (const ext of ['.ts', '.tsx']) {
  require.extensions[ext] = (mod, filename) => {
    const source = fs.readFileSync(filename, 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
    mod._compile(compiled, filename);
  };
}
require.extensions['.css'] = () => {};
const { SpellQuickFacts } = require('../src/modules/sheet/components/SpellQuickFacts.tsx');
const { DeathSavesPanel } = require('../src/modules/sheet/components/DeathSavesPanel.tsx');
const { RollsPanel } = require('../src/modules/sheet/components/RollsPanel.tsx');
const { getSpellById } = require('../src/compendium/spells/spells.ts');
const { defaultAbilityScores } = require('../src/compendium/core/abilities.ts');
const spell = getSpellById('acid-splash');
assert.ok(spell);
const facts = renderToStaticMarkup(React.createElement(SpellQuickFacts, {spell, characterLevel:1}));
for (const term of ['Wirkzeit','Reichweite','Schaden','1W6','Wirkung']) assert.ok(facts.includes(term),term);
const deaths = renderToStaticMarkup(React.createElement(DeathSavesPanel, {
  vitals: {maximumHitPoints:20,currentHitPoints:0,temporaryHitPoints:0,armorClass:12,initiativeModifier:1,speed:9},
  saves: {successes:1,failures:2},onMark:()=>{},onReset:()=>{},
}));
assert.ok(deaths.includes('Todesrettungswürfe'));
const rolls = renderToStaticMarkup(React.createElement(RollsPanel, { character: {
  id:'test', name:'T', classId:'fighter', level:3, abilityScores: defaultAbilityScores, skillProficiencies:[],
  skillExpertise:[],
}}));
assert.ok(rolls.includes('Attribute') && rolls.includes('Fertigkeiten'));
assert.ok(!rolls.includes('W20 · Attributsprobe'));
assert.ok(!deaths.includes('W20 · Todesrettung'));
const { VitalPanel } = require('../src/modules/sheet/components/VitalPanel.tsx');
const vital = renderToStaticMarkup(React.createElement(VitalPanel, {
  vitals: {maximumHitPoints:20,currentHitPoints:8,temporaryHitPoints:0,armorClass:12,initiativeModifier:1,speed:9},
  effectiveSpeed:9,onDamage:()=>{},onHeal:()=>{},onTemporaryHitPointsChange:()=>{},
  onVitalsChange:()=>{},onShortRest:()=>{},onLongRest:()=>{},hitDie:10,
  totalHitDice:3,spentHitDice:0,onUseHitDie:()=>{},inspiration:false,onToggleInspiration:()=>{},
}));
assert.ok(vital.includes('Würfelergebnis') && vital.includes('Ergebnis anwenden'));
const { CombatPanel } = require('../src/modules/sheet/components/CombatPanel.tsx');
const combat = renderToStaticMarkup(React.createElement(CombatPanel, {
  character: { id:'test', name:'T', classId:'fighter', level:3, abilityScores: defaultAbilityScores },
  inventory: {items:[],currency:{}}, onSpellcastingChange:()=>{}, includeSpellcasting:false,
}));
assert.ok(!combat.includes('Angriff würfeln') && !combat.includes('Schaden würfeln'));
console.log('SSR smoke: spell facts, manual death saves, character values rendered successfully.');
const { SpellsStep } = require('../src/modules/creator/components/steps/SpellStep.tsx');
const { LevelUpSpells } = require('../src/modules/level-up/LevelUpSpells.tsx');
const { getSpellSelectionRules } = require('../src/modules/creator/utils/getSpellSelectionRules.ts');
const { SpellcastingPanel } = require('../src/modules/sheet/components/SpellcastingPanel.tsx');
const { getSpellcastingStats } = require('../src/modules/sheet/utils/getSpellcastingStats.ts');
const blankSlots = { spentSlots: {}, spentPactSlots: 0 };
const spellSelection = { spellIds: [{ spellId: 'acid-splash', prepared: true }, {spellId: 'magic-missile', prepared:true}], slots: blankSlots };
const wizard = { id:'wizard-ssr', fileNumber:'w', name:'Mage', classId:'wizard', className:'Magier', ancestry:'Mensch', level:3, status:'active', summary:'',updatedAt:'2026-11-23T00:00:00Z', abilityScores:defaultAbilityScores, baseAbilityScores:defaultAbilityScores, spellcasting:spellSelection };
const creator = renderToStaticMarkup(React.createElement(SpellsStep, { classId:'wizard', level:1, abilityScores:defaultAbilityScores, value:spellSelection, onChange:()=>{} }));
assert.ok(creator.includes('Reichweite') && creator.includes('Wirkung'), 'creator spell facts missing');
const selectionRules = getSpellSelectionRules({classId:'wizard',level:3,abilityScores:defaultAbilityScores});
const levelup = renderToStaticMarkup(React.createElement(LevelUpSpells, {
  rules:selectionRules,value:spellSelection,previous:spellSelection,needsBlast:false,
  context: {characterLevel:3,spellcastingAbilityModifier:1},onChange:()=>{},
}));
assert.ok(levelup.includes('Zauber suchen') && levelup.includes('Wirkung'), 'level-up spell picker missing');
const magic = renderToStaticMarkup(React.createElement(SpellcastingPanel, {character:wizard,stats:getSpellcastingStats(wizard),onChange:()=>{}}));
assert.ok(magic.includes('Zauberplatz') && magic.includes('Wirken'), 'cast slot UI missing');
console.log('SSR smoke: creator, level-up picker, spell slot casting rendered successfully.');
const { SpellBrowser, spellRoles } = require('../src/components/spells/SpellBrowser.tsx');
const { spells } = require('../src/compendium/spells/spells.ts');
const picker = renderToStaticMarkup(React.createElement(SpellBrowser, {candidates:spells,context:{characterLevel:1},onAdd:()=>{}}));
assert.equal((picker.match(/class="gf-level-spell-card"/g)||[]).length,6);
for(const label of ['Weitere anzeigen','Erkundung','Weitere Filter']) assert.ok(picker.includes(label));
assert.ok(spellRoles(getSpellById('magic-missile')).includes('Schaden'));
assert.ok(spellRoles(getSpellById('cure-wounds')).includes('Heilung'));
assert.ok(creator.includes('Startvorschlag ansehen') && creator.includes('Meine Auswahl bearbeiten'));
assert.equal((creator.match(/aria-label="Zauber auswählen"/g)||[]).length,1);
assert.equal((levelup.match(/aria-label="Zauber auswählen"/g)||[]).length,1);
console.log('Geführte Zauberwahl: gemeinsame Auswahl, Wirkungsgruppen und erste sechs Karten geprüft.');
