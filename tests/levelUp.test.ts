import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CharacterPrintSheets } from "../src/modules/print/CharacterPrintView";
import { makeGrimHollowPlayPdf } from "../src/modules/print/grimHollowPlayPdf";
import { resolveCharacterTransformation } from "../src/compendium/transformations/activeRecord";
import { transformations, getTransformationStageAutomaticFeatures } from "../src/compendium/transformations";
import { TransformationPanel } from "../src/modules/sheet/components/TransformationPanel";
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { classes, getCharacterClassFeatures, getCharacterPathChoices, getClassSubclassUnlockLevel, getGrantedSubclassSpellIds, getSubclassSkillProficiencies, getSubclassUnlockLevel, subclassSpellPackages } from "../src/compendium/classes";
import { backgrounds } from "../src/compendium/backgrounds";
import { getSpellsForClass, getSpellById, spells } from "../src/compendium/spells";
import { getSpellDisplayValues } from "../src/modules/sheet/utils/getSpellDisplayValues";
import { sourceSpellsLevel0To3 } from "../src/content/phase1/spellsLevel0To3";
import { defaultAbilityScores } from "../src/compendium/core";
import { createLevelUpDraft, previewLevelUp, validateLevelUp, applyLevelUp, type LevelUpDraft } from "../src/modules/level-up/levelUp";
import { getSpellSelectionRules, validateSpellSelection } from "../src/modules/creator/utils/getSpellSelectionRules";
import { getSpellcastingStats } from "../src/modules/sheet/utils/getSpellcastingStats";
import { createCharacterRuleInput } from "../src/modules/sheet/rules/createCharacterRuleInput";
import { getLevelUpChanges } from "../src/modules/level-up/LevelUpReview";
import { getEquippedWeaponAttacks, getInventoryWeaponAttacks } from "../src/modules/sheet/utils/getWeaponAttack";
import { getLevelUpSpellOptions, LevelUpSpells } from "../src/modules/level-up/LevelUpSpells";
import { LevelUpSpellPreview } from "../src/modules/level-up/LevelUpSpellPreview";
import { LevelUpPanel } from "../src/modules/level-up/LevelUpPanel";
import { SessionDashboard } from "../src/modules/sheet/components/SessionDashboard";
import { getCharacterDerivedStats } from "../src/modules/sheet/utils/getCharacterDerivedStats";
import { getCharacterVitals } from "../src/modules/archives/utils/getCharacterVitals";
import { getCharacterInventory } from "../src/modules/archives/utils/getCharacterInventory";
import { getBeastCompanion } from "../src/modules/sheet/utils/getBeastCompanion";
import { getSubclassSheetStats } from "../src/modules/sheet/utils/getSubclassSheetStats";
import { migrateCharacterArchiveEntry } from "../src/migrations/characterSchema";
import { mergeEditedCharacter } from "../src/modules/creator/mappers/mergeEditedCharacter";
import { mapArchiveEntryToDraft } from "../src/modules/creator/mappers/mapArchiveEntryToDraft";
import { mapDraftToArchiveEntry } from "../src/modules/creator/mappers/mapDraftToArchiveEntry";
import { resolveCharacterClassResources } from "../src/rules/classResources";
import { calculateCharacterRules } from "../src/rules";
import type { CharacterArchiveEntry } from "../src/modules/archives/types";
import { readStoredArchive } from "../src/store/readStoredArchive";
import { mergeCharacterArchives, readCharacterArchiveFile } from "../src/modules/archives/io/characterArchiveIO";
import { CharacterRecordPreview } from "../src/modules/creator/components/CharacterRecordPreview";
import { AbilitiesStep } from "../src/modules/creator/components/steps/AbilitiesStep";
import { ClassStep } from "../src/modules/creator/components/steps/ClassStep";

test("Gespielte Figur: numerische verbrauchte Ressourcen überleben Browserladen und Dateiimport",async () => {
  const c = fixture();
  const stored = readStoredArchive(JSON.stringify([c]));
  assert.equal(stored.protectedRaw,null);
  assert.deepEqual(stored.characters[0].spentClassResources,c.spentClassResources);
  const backup = new File([JSON.stringify({format:"grimforge-character-archive",version:2,characters:[c]})],"test.json");
  const imported = await readCharacterArchiveFile(backup);
  assert.deepEqual(imported.characters[0].spentClassResources,c.spentClassResources);
});

test("Beschädigter oder neuerer Originalspeicher bleibt bytegenau zur Rettung verfügbar", () => {
  for(const broken of ["", "{", "{}", JSON.stringify([{...fixture(),schemaVersion:999}])])
    assert.equal(readStoredArchive(broken).protectedRaw,broken);
  const raw=JSON.stringify([fixture(),{bad:true}]);
  assert.equal(readStoredArchive(raw).protectedRaw,raw);
  assert.equal(readStoredArchive(raw).characters.length,1);
  assert.equal(readStoredArchive(null).protectedRaw,null);
  assert.equal(readStoredArchive("[]").protectedRaw,null);
});

test("Alter Import überschreibt keine jüngere Figur durch einen Migrationszeitstempel",() => {
  const c=fixture(); c.name="Am Spieltisch geändert";
  const old={...c,schemaVersion:2,updatedAt:"2020-01-01",name:"Alte Sicherung",baseAbilityScores:undefined};
  assert.equal(mergeCharacterArchives([c],[old])[0].name,c.name);
});

test("Altakte ohne Historie: maximale, fehlende und temporäre TP sowie Todesrettungen und Zustände bleiben erhalten",() => {
  const c=fixture("fighter",4); c.schemaVersion=4; c.featIds=["tough"];
  c.vitals={...c.vitals!,maximumHitPoints:45,currentHitPoints:0};
  c.deathSaves={successes:1,failures:2}; c.exhaustionLevel=3; c.conditionIds=["exhaustion","unconscious"];
  const migrated=migrateCharacterArchiveEntry(c).character;
  const edited=mergeEditedCharacter(mapDraftToArchiveEntry(mapArchiveEntryToDraft(migrated)),migrated);
  assert.deepEqual([edited.vitals!.maximumHitPoints,edited.vitals!.currentHitPoints,edited.vitals!.temporaryHitPoints],[45,0,3]);
  assert.deepEqual(edited.deathSaves,c.deathSaves);
  assert.deepEqual(edited.conditionIds,c.conditionIds); assert.equal(edited.exhaustionLevel,3);
  const pdf=new TextDecoder().decode(makeGrimHollowPlayPdf(edited));
  for(const value of ["Erfolge: 1/3 · Fehlschläge: 2/3","Stufe 3 / 6"])
    assert.ok(pdf.includes(Buffer.from(value,"latin1").toString("hex")));
});

test("Bearbeiten vergibt keine verbrauchten Startpakete erneut",() => {
  const d=createEmptyCharacterDraft("W"); d.classId="wizard";
  d.startingEquipmentSelections=[{choiceId:"wizard-pack",optionId:"wizard-scholar"}];
  const c=mapDraftToArchiveEntry(d);
  assert.ok(c.inventory!.items.some(i=>i.id==="parchment"));
  c.inventory!.items=c.inventory!.items.filter(i=>i.id!=="parchment");
  const edited=mergeEditedCharacter(mapDraftToArchiveEntry(mapArchiveEntryToDraft(c)),c);
  assert.deepEqual(edited.inventory,c.inventory);
  assert.ok(!edited.equipmentIds?.includes("parchment"));
});

test("Hügelzwerg: feste TP bei Erstellung, Aufstieg und Wiederöffnen; kein Bonus beim Gebirgszwerg",() => {
  for(const [variant,bonus] of [["hill-dwarf",1],["mountain-dwarf",0]] as const) {
    const d=createEmptyCharacterDraft("Z"); d.ancestryId="dwarf"; d.ancestryVariantId=variant; d.classId="fighter";
    d.baseAbilities={...defaultAbilityScores,constitution:12}; d.pathChoices={"fighter-fighting-style":"defense"};
    let c=mapDraftToArchiveEntry(d);
    assert.equal(c.vitals!.maximumHitPoints,12+bonus);
    for(let level=2;level<=5;level++){
      const draft=createLevelUpDraft(c); if(level===3) draft.subclassId="champion";
      if(level===4) draft.abilityScoreIncreases={strength:2};
      c=applyLevelUp(c,draft);
      assert.equal(c.vitals!.maximumHitPoints,12+8*(level-1)+level*bonus);
      assert.equal(mergeEditedCharacter(mapDraftToArchiveEntry(mapArchiveEntryToDraft(c)),c).vitals!.maximumHitPoints,c.vitals!.maximumHitPoints);
    }
  }
});

test("Erstellungsvorschau zeigt die tatsächlichen Kampagnen-TP und Waffenübung aus dem Spielbogen",() => {
  const c=fixture("cleric",3); c.vitals!.maximumHitPoints=31;
  c.inventory!.items=[{id:"greatsword",name:"Kampagnenklinge",equipped:true,quantity:1,weight:3,notes:"",category:"weapon",createdAt:"",updatedAt:""}];
  const attack=getEquippedWeaponAttacks(c,c.inventory!)[0]; assert.equal(attack.proficient,false);
  const html=renderToStaticMarkup(createElement(CharacterRecordPreview,{character:c,title:"",alignment:"",pronouns:""}));
  assert.ok(html.includes("<strong>31</strong><small>Max. Trefferpunkte</small>"));
  assert.ok(html.includes("<span>"+attack.attackBonusLabel+"</span>")); assert.match(html,/Kampagnenklinge/);
});

test("Bearbeitungsansicht auf Stufe 4 bietet weder Zurückstufen noch gekappte Kampagnenattribute an",() => {
  const html=renderToStaticMarkup(createElement(ClassStep,{existingLevel:4,level:4,selectedClassId:"fighter",selectedSubclassId:"champion",pathChoices:{},onSelectClass(){},onChangeLevel(){},onSelectSubclass(){},onChangePathChoice(){}}));
  assert.match(html,/Stufe 4 bleibt/);assert.doesNotMatch(html,/Beginn der Laufbahn/);
  const abilities=renderToStaticMarkup(createElement(AbilitiesStep,{campaignValues:true,values:{...defaultAbilityScores,strength:17},onChange(){}}));
  assert.match(abilities,/Basis 17 · Endwert 17/);assert.doesNotMatch(abilities,/Zurücksetzen/);
});

test("Grim-Hollow-Spielbogen: PDF enthält auch lange Listen und Zeichensätze",()=>{
  const c=fixture("wizard",5);
  c.name="Mira Ährenwald";
  c.inventory!.items=Array.from({length:25},(_,i)=>({id:"carry-"+i,name:"Inventarstück "+(i+1),quantity:i+1,category:"other",equipped:false,weight:0.4,notes:"",createdAt:"",updatedAt:""}));
  for(const [id,name] of [["longsword","Langschwert"],["rapier","Rapier"],["dagger","Dolch"],["light-crossbow","Leichte Armbrust"],["quarterstaff","Kampfstab"]]){
    c.inventory!.items.push({...c.inventory!.items[0],id,name,category:"weapon",equipped:true});
  }
  c.spellcasting!.spellIds=getSpellsForClass("wizard").filter(s=>s.level<=3).slice(0,28).map(s=>({spellId:s.id,prepared:true}));
  c.summary=("Die Jägerin hütet das düstere Erbe der Familie und hält jeden Handel schriftlich fest. ").repeat(38)+"Chronik-Endmarke";
  const pdf=makeGrimHollowPlayPdf(c);
  const raw=new TextDecoder().decode(pdf);
  assert.ok(raw.startsWith("%PDF-1.4"));
  assert.match(raw,/\/MediaBox \[0 0 595\.28 841\.89\]/);
  function pdfContainsLatin1(value:string) {return raw.includes([...value].map(ch=>ch.charCodeAt(0).toString(16).padStart(2,"0")).join(""));}
  for(const text of ["Mira Ährenwald","Inventarstück 25","Kampfstab","Chronik-Endmarke","Zauberwirken","Fertigkeiten"]) assert.ok(pdfContainsLatin1(text),text);
  if(process.env.GRIMFORGE_PDF_QA){
    mkdirSync(process.env.GRIMFORGE_PDF_QA,{recursive:true});
    const mage = structuredClone(c);
    mage.ancestry="Mensch"; mage.backgroundName="Gelehrte"; mage.subclassId="evocation"; mage.summary="Seit im Schwarzmoor das Licht erlosch, sammelt Mira jede Karte, die dorthin führt.";
    mage.inventory!.items=c.inventory!.items.slice(-1);
    mage.abilityScores={...defaultAbilityScores,intelligence:16,dexterity:14,constitution:14};
    mage.spellcasting!.spellIds=["fire-bolt","light","mage-hand","shield","magic-missile","misty-step","fireball","counterspell"].map(spellId=>({spellId,prepared:true}));
    writeFileSync(process.env.GRIMFORGE_PDF_QA+"/grimforge-spielakte-magier.pdf",makeGrimHollowPlayPdf(mage));
    const fighter=fixture("fighter",3); fighter.name="Aldric von Dornheim"; fighter.subclassId="champion";
    fighter.inventory!.items=c.inventory!.items.slice(-5).map((item,index)=>({...item,equipped:index===0}));
    fighter.pathChoices={"fighter-fighting-style":"dueling"};
    writeFileSync(process.env.GRIMFORGE_PDF_QA+"/grimforge-spielakte-kaempfer.pdf",makeGrimHollowPlayPdf(fighter));
  }
});

function fixture(classId = "fighter", level = 1): CharacterArchiveEntry {
  return {
    schemaVersion: 7, id: "test", fileNumber: "Testakte", name: "Aufstiegstest", classId,
    className: classes.find((entry) => entry.id === classId)!.name, ancestry: "Test", level,
    status: "active", summary: "Test", updatedAt: "2026-09-01T12:00:00.000Z",
    baseAbilityScores: { ...defaultAbilityScores, constitution: 14 },
    abilityScores: { ...defaultAbilityScores, constitution: 14 },
    vitals: { maximumHitPoints: 12, currentHitPoints: 4, temporaryHitPoints: 3, armorClass: 16, initiativeModifier: 1, speed: 9 },
    pathChoices: classId === "fighter" ? { "fighter-fighting-style": "defense" } : {},
    skillProficiencies: ["athletics", "perception", "acrobatics", "arcana"],
    inventory: { items: [], currency: { copper: 5, silver: 9, gold: 42 } },
    spentHitDice: 1, spentClassResources: { "fighter-second-wind": 1 }, inspiration: true,
    spellcasting: { spellIds: [], slots: { spentSlots: { 1: 1 }, spentPactSlots: 1 } },
  };
}

test("Alte Vampir-Akte zeigt automatische, gewählte und situative Merkmale auf allen Spieloberflächen",()=>{
  const previous={...fixture(),transformation:"Vampir",transformationStage:1,transformationFeatureIds:["vampire-strigoi-bloodline","vampire-sanguine-curse","vampire-eyes-of-the-night"]};
  const saved=JSON.stringify(previous);
  const record=resolveCharacterTransformation(previous);
  assert.equal(record.definition?.id,"vampire");
  assert.deepEqual(record.features.map(f=>[f.id,f.group]),[["vampire-fanged-bite","automatic"],["vampire-strigoi-bloodline","boon"],["vampire-sanguine-curse","flaw"]]);
  assert.equal(record.features[0].application,"conditional");
  assert.match(record.warning!,/ungültige Merkmale/);
  const legacy=migrateCharacterArchiveEntry(JSON.parse(saved)).character;
  assert.equal(mapArchiveEntryToDraft(legacy).transformationId,"vampire");
  assert.match(renderToStaticMarkup(createElement(TransformationPanel,{character:legacy})),/Fangbiss/);
  assert.match(renderToStaticMarkup(createElement(CharacterPrintSheets,{character:legacy})),/Fangbiss/);
  const vitals=getCharacterVitals(legacy);
  const derivedStats=getCharacterDerivedStats(legacy,getCharacterInventory(legacy));
  const dashboard=renderToStaticMarkup(createElement(SessionDashboard,{character:legacy,vitals,derivedStats,onDamage(){},onHeal(){},onShortRest(){},onLongRest(){},onToggleCondition(){},onNavigate(){}}));
  assert.match(dashboard,/Fangbiss/);
  assert.match(dashboard,/nicht in Grundwerten eingerechnet/);
  assert.ok(new TextDecoder().decode(makeGrimHollowPlayPdf(legacy)).includes(Buffer.from("Automatisch erhalten · Fangbiss","latin1").toString("hex")));
  assert.equal(JSON.stringify(previous),saved);
  assert.equal(resolveCharacterTransformation({transformation:"Eigene Wandlung",transformationStage:2}).name,"Eigene Wandlung");
  assert.match(resolveCharacterTransformation({transformation:"Vampir"}).warning!,/Keine aktive Stufe/);
  assert.equal(resolveCharacterTransformation(fixture()).name,undefined);
});

test("Alle Katalog-Wandlungen zeigen automatische Merkmale erst auf der richtigen Stufe",()=>{
  for(const t of transformations)for(let stage=1;stage<=4;stage++){
    const all=resolveCharacterTransformation({transformationId:t.id,transformationStage:stage});
    assert.deepEqual(all.features.map(f=>f.id),[...new Set(t.stages.filter(s=>s.stage<=stage).flatMap(s=>getTransformationStageAutomaticFeatures(s).map(f=>f.id)))],t.id);
  }
});

test("A4: Ersatzwaffen und unbekannte Altwaffen stehen im PDF, Duellieren bleibt bedingt",()=>{
  const c=fixture("fighter",3);
  c.pathChoices={"fighter-fighting-style":"dueling"};
  const base={quantity:1,weight:1,equipped:false,category:"weapon" as const,notes:"",createdAt:"",updatedAt:""};
  const inv=c.inventory!;
  inv.items=[
    {...base,id:"longsword",name:"Langschwert",equipped:true},
    {...base,id:"test-reserve",catalogId:"dagger",name:"Reservedolch",quantity:2},
    {...base,id:"test-legacy",name:"Alte Freitextwaffe"},
    {...base,id:"shortbow",name:"Leerer Posten",quantity:0},
  ];
  assert.deepEqual(getEquippedWeaponAttacks(c,inv).map(a=>a.damage),["1W8 +2"]);
  const rows=getInventoryWeaponAttacks(c,inv);
  assert.deepEqual(rows.map(({attack})=>attack?.damage),["1W8","1W4",undefined]);
  assert.match(rows[1].attack!.details,/Duellieren: \+2 Schaden/);
  const pdf=new TextDecoder().decode(makeGrimHollowPlayPdf(c));
  for(const line of ["Reservedolch ×2","Keine Waffenwerte hinterlegt.","Langschwert · ausgerüstet"]){
    assert.ok(pdf.includes(Buffer.from(line,"latin1").toString("hex")),line);
  }
  assert.ok(!pdf.includes(Buffer.from("Leerer Posten","latin1").toString("hex")));
});

test("jede Katalog-Unterklasse schaltet ihre Merkmale auf der richtigen Stufe frei", () => {
  for (const cls of classes) for (const sub of cls.subclasses) {
    const unlock = getSubclassUnlockLevel(cls.id, sub.id);
    assert.ok(unlock, sub.id);
    for (let level = 1; level <= 5; level++) {
      const character = { ...fixture(cls.id, level), subclassId: sub.id };
      const rules = calculateCharacterRules(createCharacterRuleInput(character));
      assert.deepEqual(rules.classFeatures.filter(({ source }) => source === "subclass").map(({ id }) => id),
        (sub.features ?? []).filter((feature) => feature.level <= level).map(({ id }) => id), sub.id);
      if (level < unlock) assert.deepEqual(getSubclassSheetStats(character), [], sub.id);
      for (const spellId of getGrantedSubclassSpellIds({ ...character, classId: cls.id })) assert.ok(getSpellById(spellId), `${sub.id}: ${spellId}`);
    }
  }
});

import { equipmentPacks, startingEquipment, getEquipmentById, weaponDamageLabel } from "../src/compendium/equipment";
import { sourceWeapons2014 } from "../src/content/phase1/weapons2014";
import { sourceArmor2014 } from "../src/content/phase1/armor2014";
import { createEmptyCharacterDraft } from "../src/modules/creator/types";

test("Waffen und Rüstung: alle Quellzeilen mit Preis, Gewicht und Schadens- bzw. RK-Wert", () => {
  for (const row of sourceWeapons2014) {
    const w = getEquipmentById(row.app_id);
    assert.ok(w?.category === "weapon",row.app_id);
    const label = {slashing:"Hieb",piercing:"Stich",bludgeoning:"Wucht"}[w.damage.type];
    assert.equal(weaponDamageLabel(w.damage,label),row.damage === "-" ? "Kein Schaden" : row.damage);
    assert.deepEqual([w.price,w.weight],[row.cost_gp,row.weight_lb]);
    assert.equal(w.versatile?.die, row.properties.includes("Vielseitig") ? Number(row.properties.match(/Vielseitig 1W(\d+)/)![1]) : undefined);
  }
  for (const row of sourceArmor2014) {
    const a = getEquipmentById(row.app_id);
    assert.ok(a?.category === "armor" || a?.category === "shield");
    assert.deepEqual([a.price,a.weight,a.armorClass,a.dexterityModifier,a.stealthDisadvantage],[row.cost_gp,row.weight_lb,Number(row.armor_class.match(/\d+/)![0]),row.armor_class.includes("GE"),row.stealth === "Nachteil"]);
  }
});

test("Jede Klasse: jede Startoption und jeder Paketbestandteil ist auflösbar", () => {
  assert.deepEqual(startingEquipment.map(v=>v.classId).sort(),classes.map(v=>v.id).sort());
  for (const cfg of startingEquipment) {
    for (const choice of cfg.choices) {
      assert.equal(new Set(choice.options.map(o=>o.id)).size,choice.options.length,choice.id);
      for (const o of choice.options) {
        for (const x of o.equipment ?? []) assert.ok(getEquipmentById(x.equipmentId) && x.quantity > 0,x.equipmentId);
        for (const id of o.packIds ?? []) assert.ok(equipmentPacks.some(p=>p.id === id),id);
      }
    }
    for (const x of cfg.guaranteedEquipment) assert.ok(getEquipmentById(x.equipmentId),x.equipmentId);
    for (const id of cfg.guaranteedPacks) assert.ok(equipmentPacks.some(p=>p.id === id),id);
  }
  for (const pack of equipmentPacks) for (const x of pack.items) assert.ok(getEquipmentById(x.equipmentId) && x.quantity > 0,pack.id + ": " + x.equipmentId);
  const d=createEmptyCharacterDraft("Test"); d.classId="wizard";
  d.startingEquipmentSelections=[{choiceId:"wizard-pack",optionId:"wizard-scholar"}];
  const inv=mapDraftToArchiveEntry(d).inventory!.items;
  assert.equal(inv.find(i=>i.id==="spellbook")?.quantity,1);
  assert.equal(inv.find(i=>i.id==="parchment")?.quantity,10);
});

import { sourceSpellRulesLevel0To3 } from "../src/content/phase1/spellRulesLevel0To3";
import { spellFact } from "../src/compendium/spells/spellFact";
import { getStartingEquipment } from "../src/compendium/equipment";

test("Alle Zauberregelzeilen: Grad, Schule, Komponenten, Wirkzeit, Reichweite, Dauer, Ritual und Konzentration", () => {
  assert.equal(new Set(spells.map(v=>v.id)).size,spells.length);
  for (const source of sourceSpellRulesLevel0To3) {
    const v=getSpellById(source.id)!;
    assert.deepEqual([v.level,v.school,v.ritual,v.concentration], [source.level,source.school,source.ritual,source.concentration],source.id);
    const flags=source.components.split("(")[0].split(",").map(s=>s.trim());
    assert.deepEqual([v.components.verbal,v.components.somatic,v.components.material],["V","S","M"].map(s=>flags.includes(s)),source.id);
    assert.deepEqual([v.range,v.duration,v.castingTime],[source.range,source.duration,source.castingTime].map(spellFact),source.id);
  }
  assert.equal(getSpellById("fireball")!.range,"45 m");
  assert.match(getSpellById("shield")!.castingTime,/Reaktion.*Angriff/);
});
test("Kleriker: schwere Startausrüstung und Kriegshammer erfordern die passende Übung", () => {
  const options=(subclassId:string,ancestryId="human")=>getStartingEquipment({classId:"cleric",subclassId,ancestryId})!.choices.flatMap(c=>c.options.map(o=>o.id));
  assert.ok(!options("light-domain").includes("cleric-warhammer"));
  assert.ok(options("life-domain").includes("cleric-chain-mail"));
  assert.ok(options("light-domain","dwarf").includes("cleric-warhammer"));
  assert.ok(!options("light-domain").includes("cleric-chain-mail"));
});
test("Zaubersonderfälle: drei Geschosse, zwei Strahlen, sechs Schadensarten, alte Zauber-ID", () => {
  const display = (id:string) => getSpellDisplayValues({spell:getSpellById(id)!,characterLevel:5,spellcastingAbilityModifier:3, invocations:["agonizing-blast"]});
  assert.match(display("magic-missile").damage!.dice,/1W4\s*\+\s*1/);
  assert.match(getSpellById("magic-missile")!.damageText![0],/1W4 \+ 1/);
  assert.equal(display("eldritch-blast").attackCount,2);
  assert.match(display("eldritch-blast").damage!.dice,/1W10\s*\+\s*3/);
  assert.equal(display("chromatic-orb").damage!.type.split(" oder ").length,6);
  const c=fixture("ranger",3);
  c.spellcasting!.spellIds=[{spellId:"hunters-mark",prepared:true},{spellId:"hunter-s-mark",prepared:false}];
  assert.deepEqual(migrateCharacterArchiveEntry(c).character.spellcasting!.spellIds,[{spellId:"hunter-s-mark",prepared:true}]);
});

for (const cls of classes) test(cls.name + ": Erstellung, Aufstieg 1–5 und Druck aller Katalog-Unterklassen", () => {
  for (const sub of cls.subclasses.filter(sub => !sub.legacy)) {
    const d=createEmptyCharacterDraft("Audit"); d.identity.name="Auditfigur"; d.classId=cls.id; d.ancestryId="human"; d.backgroundId=backgrounds[0].id;
    d.baseAbilities={strength:12,dexterity:16,constitution:14,intelligence:14,wisdom:14,charisma:14};
    d.classSkillProficiencies=["athletics","perception","acrobatics","arcana"];
    d.startingEquipmentSelections=startingEquipment.find(x=>x.classId===cls.id)!.choices.map(x=>({choiceId:x.id,optionId:x.options[0].id}));
    const unlock=getSubclassUnlockLevel(cls.id,sub.id)!; d.subclassId=unlock===1?sub.id:"";
    const seed=fixture(cls.id); seed.abilityScores=d.baseAbilities;
    const first=complete({...seed,level:0},{...createLevelUpDraft(seed),subclassId:d.subclassId,pathChoices:{},spellcasting:d.spellcasting},true);
    d.pathChoices=first.pathChoices; d.spellcasting=first.spellcasting;
    let c=mapDraftToArchiveEntry(d);
    for (let level=1;level<=5;level++) {
      if(level>1){const draft=createLevelUpDraft(c); if(unlock===level)draft.subclassId=sub.id;
        c=applyLevelUp(c,complete(c,draft,true));}
      c=migrateCharacterArchiveEntry(JSON.parse(JSON.stringify(c))).character;
      if(level>=unlock)assert.equal(c.subclassId,sub.id);
      const html=renderToStaticMarkup(createElement(CharacterPrintSheets,{character:c}));
      assert.ok(html.includes("Stufe "+level) && !html.includes("NaN"),sub.id);
    }
  }
});

test("Tiergefährten zeigen eigene RK, TP und Angriffe mit skalierendem Übungsbonus", () => {
  const beastmaster = { ...fixture("ranger", 3), subclassId: "beast-master" };
  for (const id of ["wolf", "panther", "mastiff", "giant-badger", "giant-frog", "giant-poisonous-snake", "pteranodon"]) {
    const character = { ...beastmaster, pathChoices: { "beast-master-companion": id } };
    const beast = getBeastCompanion(character)!;
    const upgraded = getBeastCompanion({ ...character, level: 5 })!;
    assert.equal(getBeastCompanion({ ...character, level: 2 }), undefined);
    assert.equal(upgraded.armor, beast.armor + 1);
    assert.equal(upgraded.hp, 20);
    assert.equal(Number(upgraded.attacks[0].attack), Number(beast.attacks[0].attack) + 1);
  }
  const wolf = getBeastCompanion({ ...beastmaster, pathChoices: { "beast-master-companion": "wolf" } })!;
  assert.deepEqual([wolf.armor, wolf.hp, wolf.passive, wolf.attacks[0].damage], [15, 12, 15, "2W4 +4 Stich"]);
});

test("situative Unterklassenboni ändern keine Grundwerte; Heilbonus und RK bleiben konsistent", () => {
  const ranger = { ...fixture("ranger", 3), subclassId: "gloom-stalker", abilityScores: { ...defaultAbilityScores, wisdom: 16 } };
  const rules = calculateCharacterRules(createCharacterRuleInput(ranger));
  assert.equal(rules.initiativeModifier, 3);
  assert.equal(rules.speed, 9);
  assert.match(getSubclassSheetStats(ranger).find(({ label }) => label === "Schreckensangreifer")?.condition ?? "", /ersten Zug/);
  const mage = { ...fixture("sorcerer", 3), subclassId: "draconic-bloodline", abilityScores: { ...defaultAbilityScores, dexterity: 14 } };
  assert.equal(getCharacterDerivedStats(mage, getCharacterInventory(mage)).armorClass, 15);
  assert.equal(calculateCharacterRules(createCharacterRuleInput(mage)).armorClass.armorClass, 15);
  const healing = getSpellDisplayValues({ spell: getSpellById("cure-wounds")!, characterLevel: 3, spellcastingAbilityModifier: 3, lifeDomainHealing: true });
  assert.equal(healing.healing?.modifier, 6);
});

test("importierte Samurai-Akte erhält gewählte Fertigkeit auch ohne gespeicherten Bonus", () => {
  const samurai = { ...fixture("fighter", 3), subclassId: "samurai", pathChoices: { "samurai-bonus-proficiency": "insight" }, skillProficiencies: [] };
  assert.deepEqual(getSubclassSkillProficiencies("fighter", "samurai", 2, samurai.pathChoices), []);
  assert.ok(migrateCharacterArchiveEntry(samurai).character.skillProficiencies?.includes("insight"));
  assert.equal(getCharacterDerivedStats(samurai, getCharacterInventory(samurai)).passiveScores.insight, 12);
});

test("Spieltisch zeigt aktuelle TP, Zustände und freie Paktplätze", () => {
  const character = { ...fixture("warlock", 3), conditionIds: ["poisoned"] };
  const markup = renderToStaticMarkup(createElement(SessionDashboard, {
    character, vitals: getCharacterVitals(character), derivedStats: getCharacterDerivedStats(character, getCharacterInventory(character)),
    onDamage() {}, onHeal() {}, onShortRest() {}, onLongRest() {}, onToggleCondition() {}, onNavigate() {},
  }));
  assert.match(markup, /aria-label="Aktuelle Trefferpunkte" value="4" max="12"|value="4" max="12" aria-label="Aktuelle Trefferpunkte"/);
  assert.match(markup, /\+3 temporär/);
  assert.match(markup, /<span>Vergiftet<\/span>/);
  assert.match(markup, /Pakt · Grad 2<\/span><strong>1\/2 frei/);
  assert.doesNotMatch(markup, /Slots verbraucht/);
});

test("Spieltisch zeigt ausgegebene Klassenressourcen als nicht verfügbar", () => {
  const character = { ...fixture(), spentClassResources: { "fighter-second-wind-uses": 1 } };
  const markup = renderToStaticMarkup(createElement(SessionDashboard, {
    character, vitals: getCharacterVitals(character), derivedStats: getCharacterDerivedStats(character, getCharacterInventory(character)),
    onDamage() {}, onHeal() {}, onShortRest() {}, onLongRest() {}, onToggleCondition() {}, onNavigate() {},
  }));
  assert.match(markup, /Klassenressourcen/);
  assert.match(markup, /0\/1 frei/);
  assert.doesNotMatch(markup, /Verfügbare Zauberplätze/);
});

function complete(character: CharacterArchiveEntry, draft: LevelUpDraft, fillGrowingChoices = false) {
  const level = character.level + 1;
  const classId = character.classId!;
  const cls = classes.find((entry) => entry.id === classId)!;
  if (!draft.subclassId && (getClassSubclassUnlockLevel(classId) ?? Infinity) <= level) draft.subclassId = cls.subclasses[0].id;
  if (level === 4 && draft.abilityScoreMode === "increase" && Object.keys(draft.abilityScoreIncreases).length === 0) {
    draft.abilityScoreIncreases = { strength: 2 };
  }
  // Iterate because a choice may unlock a dependent choice (e.g. Pact of the Tome).
  for (let pass = 0; pass < 3; pass++) {
    for (const choice of getCharacterPathChoices(classId, draft.subclassId, level, draft.pathChoices)) {
      const existing = draft.pathChoices[choice.id];
      if (existing && (!fillGrowingChoices || !Array.isArray(existing) || existing.length === choice.choose)) continue;
      const options = choice.options.filter((option) =>
        (!choice.id.endsWith("-expertise") || character.skillProficiencies?.includes(option.id as never)) &&
        (choice.id !== "lore-bonus-skills" || !character.skillProficiencies?.includes(option.id as never)));
      if (options.length === 0) continue;
      draft.pathChoices[choice.id] = choice.choose === 1 ? options[0].id : options.slice(0, choice.choose).map((option) => option.id);
    }
  }
  const rules = getSpellSelectionRules({ classId, subclassId: draft.subclassId, level, abilityScores: character.abilityScores!, pathChoices: draft.pathChoices });
  if (!rules.enabled) return draft;
  const spells = [...getSpellsForClass(rules.sourceClassId ?? classId), ...rules.expandedSpellIds.flatMap((id) => getSpellById(id) ?? [])].filter((spell) => !rules.grantedSpellIds.includes(spell.id));
  let cantrips = spells.filter((spell) => spell.level === 0);
  if (classId === "warlock") cantrips = [...cantrips].sort((a, b) => Number(b.id === "eldritch-blast") - Number(a.id === "eldritch-blast"));
  const levelled = spells.filter((spell) => spell.level > 0 && spell.level <= rules.maximumSpellLevel);
  if (rules.restrictedSchools) levelled.sort((a, b) =>
    Number(rules.restrictedSchools?.includes(b.school)) - Number(rules.restrictedSchools?.includes(a.school)));
  draft.spellcasting.spellIds = [...cantrips.slice(0, rules.cantripsRequired), ...levelled.slice(0, rules.levelledSpellsRequired)].map((spell) => ({ spellId: spell.id, prepared: spell.level === 0 || rules.mode !== "spellbook" || levelled.indexOf(spell) < rules.preparedSpellsRequired }));
  return draft;
}

test("fighter 1→2: preserve session state, record HP and survive migration/export", () => {
  const original = fixture();
  const frozen = structuredClone(original);
  const draft = createLevelUpDraft(original);
  const next = applyLevelUp(original, draft);
  assert.equal(next.level, 2);
  assert.equal(next.vitals!.maximumHitPoints, 20);
  assert.equal(next.vitals!.currentHitPoints, 4);
  assert.equal(next.vitals!.temporaryHitPoints, 3);
  assert.deepEqual(next.inventory, original.inventory);
  assert.deepEqual(next.spentClassResources, original.spentClassResources);
  assert.deepEqual(next.spellcasting!.slots, original.spellcasting!.slots);
  assert.equal(next.spentHitDice, 1);
  assert.equal(next.inspiration, true);
  assert.equal(next.levelUpHistory![0].hitPointGain, 8);
  assert.deepEqual(migrateCharacterArchiveEntry(JSON.parse(JSON.stringify(next))).character.levelUpHistory, JSON.parse(JSON.stringify(next.levelUpHistory)));
  assert.deepEqual(original, frozen);
});

test("draft and preview do not mutate saved state", () => {
  const character = fixture();
  const original = structuredClone(character);
  const draft = createLevelUpDraft(character);
  draft.pathChoices["fighter-fighting-style"] = "archery";
  draft.spellcasting.slots.spentPactSlots = 0;
  previewLevelUp(character, draft);
  assert.deepEqual(character, original);
  assert.throws(() => applyLevelUp(character, draft), /bisherige Entscheidung/);
});

test("early saved subclass does not block level-up before its feature level", () => {
  const character = {
    ...fixture("fighter", 1),
    subclassId: "champion",
    subclass: "Champion",
  };
  const next = applyLevelUp(character, createLevelUpDraft(character));
  assert.equal(next.level, 2);
  assert.equal(next.subclassId, "champion");
  assert.ok(!getCharacterClassFeatures({ classId: "fighter", subclassId: next.subclassId, level: next.level }).some((feature) => feature.id === "champion-1"));
});

test("roll boundaries, fractional and empty inputs, minimum HP", () => {
  const character = fixture();
  const draft = createLevelUpDraft(character);
  draft.hitPointMode = "roll";
  for (const roll of [NaN, 0, -1, 11, 1.5, Infinity]) {
    draft.hitDieRoll = roll;
    assert.throws(() => applyLevelUp(character, draft), /Würfelergebnis/);
  }
  character.abilityScores!.constitution = 1;
  draft.hitDieRoll = 1;
  assert.equal(applyLevelUp(character, draft).vitals!.maximumHitPoints, 13);
});

test("subclass required for 2→3; level 5 is final for now", () => {
  const character = fixture("fighter", 2);
  const draft = createLevelUpDraft(character);
  assert.throws(() => applyLevelUp(character, draft), /Unterklasse/);
  draft.subclassId = "champion";
  const next = applyLevelUp(character, draft);
  assert.equal(next.subclass, "Champion");
  const levelFour = applyLevelUp(next, complete(next, createLevelUpDraft(next)));
  const levelFive = applyLevelUp(levelFour, complete(levelFour, createLevelUpDraft(levelFour)));
  assert.equal(levelFive.level, 5);
  assert.throws(() => applyLevelUp(levelFive, createLevelUpDraft(levelFive)), /bis Stufe 5/);
  assert.throws(() => applyLevelUp({ ...character, level: 1 }, draft), /geändert/);
});

test("jede reguläre Unterklasse lässt sich bei ihrer Freischaltung übernehmen und erneut laden", () => {
  for (const cls of classes) for (const sub of cls.subclasses) {
    const unlock = getSubclassUnlockLevel(cls.id, sub.id);
    if (sub.legacy || !unlock || unlock === 1 || unlock > 5) continue;
    const before = fixture(cls.id, unlock - 1);
    const draft = complete(before, { ...createLevelUpDraft(before), subclassId: sub.id });
    const errors = validateLevelUp(before, draft);
    assert.deepEqual(errors, [], sub.id);
    const saved = migrateCharacterArchiveEntry(applyLevelUp(before, draft)).character;
    assert.equal(saved.subclassId, sub.id);
    const rules = calculateCharacterRules(createCharacterRuleInput(saved));
    for (const feature of sub.features ?? []) if (feature.level === unlock) {
      assert.ok(rules.classFeatures.some(({ id, source }) => id === feature.id && source === "subclass"), feature.id);
      if (feature.resource) assert.ok(rules.classResources.some(({ id }) => id === feature.resource?.id), feature.resource.id);
    }
  }
});

test("third casters share the sheet's slot limits and gain a fourth known spell at level 4", () => {
  for (const [classId, subclassId, schoolSpells] of [
    ["fighter", "eldritch-knight", ["shield", "magic-missile"]],
    ["rogue", "arcane-trickster", ["charm-person", "disguise-self"]],
  ] as const) {
    for (const level of [3, 4, 5]) {
      const character = { ...fixture(classId, level), subclassId };
      const args = { classId, subclassId, level, abilityScores: character.abilityScores! };
      const rules = getSpellSelectionRules(args);
      assert.equal(rules.maximumSpellLevel, 1);
      assert.equal(rules.levelledSpellsRequired, level === 3 ? 3 : 4);
      assert.equal(rules.restrictedSpellCount, level === 3 ? 2 : 3);
      assert.deepEqual(getSpellcastingStats(character).spellSlots, { 1: level === 3 ? 2 : 3 });
      if (classId === "rogue") assert.ok(getGrantedSubclassSpellIds(args).includes("mage-hand"));
      if (level !== 3) continue;
      const spellcasting = {
        ...character.spellcasting!,
        spellIds: ["fire-bolt", "ray-of-frost", ...schoolSpells, "misty-step"].map((spellId) => ({ spellId, prepared: true })),
      };
      assert.equal(validateSpellSelection({ ...args, spellcasting }).valid, false);
      spellcasting.spellIds[4] = { spellId: "find-familiar", prepared: true };
      assert.equal(validateSpellSelection({ ...args, spellcasting }).valid, true);
    }
  }
});

test("Monster Hunter guild selection is required at level 3 and preserves legacy sheets", () => {
  const character = fixture("monster-hunter", 2);
  const draft = createLevelUpDraft(character);
  assert.throws(() => applyLevelUp(character, draft), /Wähle eine Unterklasse/);
  for (const guild of ["carver", "devourer", "occultist", "trapper"]) {
    draft.subclassId = `monster-hunter-${guild}-guild`;
    assert.equal(applyLevelUp(character, complete(character, structuredClone(draft))).subclassId, draft.subclassId);
  }
  const legacy = { ...character, subclassId: "monster-hunter-beast-slayer" };
  assert.equal(applyLevelUp(legacy, complete(legacy, createLevelUpDraft(legacy))).subclassId, legacy.subclassId);
});

test("2025 monster hunter gets Studied Response, actual guild benefits and Expert Strike", () => {
  const hunter = { ...fixture("monster-hunter", 2), abilityScores: { ...defaultAbilityScores, intelligence: 16 }, baseAbilityScores: { ...defaultAbilityScores, intelligence: 16 } };
  const features = (level: number) => getCharacterClassFeatures({ classId: hunter.classId!, level }).map((feature) => feature.id);
  assert.ok(features(2).includes("monster-hunter-studied-response"));
  assert.ok(features(5).includes("monster-hunter-expert-strike"));
  assert.ok(!features(5).includes("monster-hunter-extra-attack"));
  assert.ok(features(11).includes("monster-hunter-extra-attack"));
  const draft = createLevelUpDraft(hunter);
  draft.subclassId = "monster-hunter-devourer-guild";
  const devourer = applyLevelUp(hunter, complete(hunter, draft));
  assert.ok(devourer.toolProficiencies?.includes("Kochutensilien"));
  assert.equal(calculateCharacterRules(createCharacterRuleInput(devourer)).classResources.find((item) => item.id === "monster-hunter-devourer-portions")?.maximum, 4);
  const trapperDraft = createLevelUpDraft(hunter);
  trapperDraft.subclassId = "monster-hunter-trapper-guild";
  const trapper = applyLevelUp(hunter, complete(hunter, trapperDraft));
  assert.ok(trapper.skillProficiencies?.includes("stealth"));
  assert.ok(trapper.toolProficiencies?.includes("Tüftlerwerkzeug"));
  const sword = { id: "longsword", name: "Langschwert", category: "weapon" as const, quantity: 1, equipped: true, weight: 3, notes: "", createdAt: "", updatedAt: "" };
  const inventory = { ...hunter.inventory!, items: [sword] };
  const attacks = (level: number) => getEquippedWeaponAttacks({ ...hunter, level, pathChoices: { "monster-hunter-weapon-mastery": ["longsword", "greatsword"] } }, inventory)[0];
  assert.equal(attacks(5).attackBonus - attacks(4).attackBonus, 4);
  assert.match(attacks(5).damage, /\+3/);
  assert.ok(attacks(5).properties.includes("Meisterschaft: Sap"));
  assert.equal(getCharacterPathChoices("monster-hunter", undefined, 5).find((choice) => choice.id === "monster-hunter-weapon-mastery")?.choose, 3);
});

test("Occultist chooses unfiltered wizard schools and gains the correct slots through level 5", () => {
  const subclassId = "monster-hunter-occultist-guild";
  for (const level of [3, 4, 5]) {
    const character = { ...fixture("monster-hunter", level), subclassId };
    const rules = getSpellSelectionRules({ classId: "monster-hunter", subclassId, level, abilityScores: defaultAbilityScores });
    assert.ok(rules.enabled && rules.canReplaceCantrip);
    assert.equal(rules.abilityId, "intelligence");
    assert.equal(rules.cantripsRequired, 2);
    assert.equal(rules.levelledSpellsRequired, level === 3 ? 3 : 4);
    assert.equal(rules.maximumSpellLevel, 1);
    assert.equal(rules.restrictedSchools, undefined);
    assert.deepEqual(getSpellcastingStats(character).spellSlots, { 1: level === 3 ? 2 : 3 });
  }
});

test("barbarian movement follows equipped armor and old saved bonus migrates once", () => {
  const before = fixture("barbarian", 4);
  const after = applyLevelUp(before, complete(before, createLevelUpDraft(before)));
  const speed = (character: CharacterArchiveEntry) => calculateCharacterRules(createCharacterRuleInput(character)).speed;
  const armor = { id: "chain-mail", name: "Kettenpanzer", category: "armor" as const, quantity: 1, equipped: true, weight: 55, notes: "", createdAt: "", updatedAt: "" };
  const armored = { ...after, inventory: { ...after.inventory!, items: [armor] } };
  assert.equal(speed(armored), 9);
  assert.equal(speed({ ...armored, inventory: { ...armored.inventory!, items: [{ ...armor, equipped: false }] } }), 12);
  const legacy = { ...after, movementBaseVersion: undefined, vitals: { ...after.vitals!, speed: 12 } };
  const migrated = migrateCharacterArchiveEntry(legacy).character;
  assert.equal(migrated.vitals?.speed, 9);
  assert.equal(speed(migrateCharacterArchiveEntry(migrated).character), 12);
});

test("review lists invocation changes, learned and dropped spells and the new pact slot grade", () => {
  const before = fixture("warlock", 4);
  before.pathChoices = { "warlock-invocations": ["armor-of-shadows", "eldritch-sight"] };
  before.spellcasting!.spellIds = [{ spellId: "hex", prepared: true }];
  const after = fixture("warlock", 5);
  after.pathChoices = { "warlock-invocations": ["armor-of-shadows", "devils-sight", "one-with-shadows"] };
  after.spellcasting!.spellIds = [{ spellId: "fireball", prepared: true }];
  const changes = getLevelUpChanges(before, after);
  assert.match(changes.find(({ label }) => label === "Unheimliche Anrufungen")!.value, /Teufelssicht.*Unheimliche Sicht/);
  assert.ok(changes.some(({ label }) => label === "Neue Zauber"));
  assert.ok(changes.some(({ label }) => label === "Entfernte Zauber"));
  assert.match(changes.find(({ label }) => label === "Zauberplätze")!.value, /Grad 2.*Grad 3/);
});

test("Tome cantrips appear after saving, and Warlock gains a third invocation at level 5", () => {
  const character = { ...fixture("warlock", 2), subclassId: "the-fiend" };
  const draft = createLevelUpDraft(character);
  draft.pathChoices["warlock-pact-boon"] = "tome";
  draft.pathChoices["warlock-tome-cantrips"] = ["guidance", "light", "mage-hand"];
  const three = applyLevelUp(character, complete(character, draft));
  const reopened = migrateCharacterArchiveEntry(JSON.parse(JSON.stringify(three))).character;
  const grants = getGrantedSubclassSpellIds({ classId: "warlock", subclassId: reopened.subclassId, level: reopened.level, pathChoices: reopened.pathChoices });
  assert.deepEqual(grants, ["guidance", "light", "mage-hand"]);
  assert.equal(reopened.spellcasting!.spellIds.filter((entry) => getSpellById(entry.spellId)?.level === 0).length, 2);
  const four = applyLevelUp(reopened, complete(reopened, createLevelUpDraft(reopened)));
  const fiveDraft = complete(four, createLevelUpDraft(four));
  assert.ok(validateLevelUp(four, fiveDraft).some((error) => error.includes("genau 3")));
  fiveDraft.pathChoices["warlock-invocations"] = ["agonizing-blast", "armor-of-shadows", "one-with-shadows"];
  const five = applyLevelUp(four, fiveDraft);
  assert.deepEqual(five.pathChoices?.["warlock-invocations"], fiveDraft.pathChoices["warlock-invocations"]);
});

test("level 4 Constitution and Tough are applied to existing hit dice and recorded", () => {
  const character = { ...fixture("fighter", 3), subclassId: "champion" };
  character.vitals!.maximumHitPoints = 28;
  const draft = createLevelUpDraft(character);
  draft.abilityScoreIncreases = { constitution: 2 };
  const next = applyLevelUp(character, draft);
  assert.equal(next.vitals!.maximumHitPoints, 40);
  assert.equal(next.levelUpHistory?.at(-1)?.hitPointGain, 12);
  draft.abilityScoreMode = "feat";
  draft.featId = "tough";
  const tough = applyLevelUp(character, draft);
  assert.equal(tough.vitals!.maximumHitPoints, 44);
  assert.equal(applyLevelUp(tough, createLevelUpDraft(tough)).vitals!.maximumHitPoints, 54);
});

test("level 4 Wizard uses the new Intelligence score for spell preparation", () => {
  const character = fixture("wizard", 3);
  character.subclassId = "school-of-evocation";
  const draft = complete(character, createLevelUpDraft(character));
  draft.abilityScoreIncreases = { intelligence: 2 };
  assert.ok(validateLevelUp(character, draft).some((error) => error.includes("genau 5")));
  const nextSpell = draft.spellcasting.spellIds.find((entry) => !entry.prepared)!;
  nextSpell.prepared = true;
  assert.equal(applyLevelUp(character, draft).abilityScores?.intelligence, 12);
});

test("subclass spell packages through level 5 resolve to catalog entries", () => {
  for (const pack of subclassSpellPackages) {
    for (const spellId of [...Object.values(pack.grantedByLevel ?? {}).flat(), ...Object.values(pack.expandedByLevel ?? {}).flat()]) {
      assert.ok(getSpellById(spellId), `${pack.subclassId}: ${spellId}`);
    }
  }
  const paladin = resolveCharacterClassResources({ classId: "paladin", subclassId: "oath-of-devotion", level: 3, abilityScores: defaultAbilityScores });
  assert.equal(paladin.find((resource) => resource.id === "paladin-channel-divinity-uses")?.maximum, 1);
});

test("the guided spell picker blocks excess spell grades and off-school selections", () => {
  const rules = getSpellSelectionRules({
    classId: "fighter", subclassId: "eldritch-knight", level: 3, abilityScores: defaultAbilityScores,
  });
  const previous = { spellIds: [], slots: { spentSlots: {}, spentPactSlots: 0 } };
  const value = { ...previous, spellIds: [{ spellId: "find-familiar", prepared: true }] };
  const { available } = getLevelUpSpellOptions({ rules, previous, value, needsBlast: false });
  assert.ok(available.some((spell) => spell.id === "shield"));
  assert.ok(!available.some((spell) => spell.id === "misty-step" || spell.id === "charm-person"));
});

test("the guided picker protects prior cantrips and limits known spell swaps", () => {
  const rules = getSpellSelectionRules({
    classId: "warlock", subclassId: "the-fiend", level: 3, abilityScores: defaultAbilityScores,
  });
  const previous = {
    spellIds: ["mage-hand", "hex", "armor-of-agathys"].map((spellId) => ({ spellId, prepared: true })),
    slots: { spentSlots: {}, spentPactSlots: 0 },
  };
  const value = { ...previous, spellIds: previous.spellIds.slice(0, 2) };
  const options = getLevelUpSpellOptions({ rules, previous, value, needsBlast: true });
  assert.equal(options.canRemove("mage-hand"), false);
  assert.equal(options.canRemove("hex"), false);
  assert.deepEqual(options.available.filter((spell) => spell.level === 0).map((spell) => spell.id), ["eldritch-blast"]);
});

test("spell choices are checked in their own step and War Caster needs spellcasting", () => {
  const wizard = { ...fixture("wizard", 2), subclassId: "school-of-evocation" };
  const wizardDraft = createLevelUpDraft(wizard);
  assert.deepEqual(validateLevelUp(wizard, wizardDraft, "choices"), []);
  assert.ok(validateLevelUp(wizard, wizardDraft, "spells").some((message) => message.includes("Zaubertricks")));

  const fighter = { ...fixture("fighter", 3), subclassId: "champion" };
  const feat = createLevelUpDraft(fighter);
  feat.abilityScoreMode = "feat";
  feat.featId = "war-caster";
  assert.ok(validateLevelUp(fighter, feat, "choices").some((message) => message.includes("Kriegszauberer")));
  assert.deepEqual(validateLevelUp({ ...fighter, ancestryTraitIds: ["magical-aptitude"] }, feat, "choices"), []);
});

test("the level-up form blocks continuing without a subclass and omits the empty spell step", () => {
  const markup = renderToStaticMarkup(createElement(LevelUpPanel, {
    character: fixture("fighter", 2),
    onCancel: () => {},
    onSave: () => {},
  }));
  assert.match(markup, /Wähle eine Unterklasse/);
  assert.match(markup, /<button(?=[^>]*disabled)[^>]*>[\s\S]*?Weiter/);
  assert.doesNotMatch(markup, /<li[^>]*>2\. Zauber<\/li>/);
  assert.doesNotMatch(markup, /Kampfstil/);
});

test("all overlapping spell catalog entries agree with source grade, school, ritual and concentration flags", () => {
  const byId = new Map<string, (typeof sourceSpellsLevel0To3)[number]>(sourceSpellsLevel0To3.map((entry) => [entry.app_id, entry]));
  const overlapping = spells.filter((spell) => byId.has(spell.id));
  assert.equal(overlapping.length, byId.size);
  for (const spell of overlapping) {
    const source = byId.get(spell.id)!;
    assert.equal(spell.level, source.level, spell.id);
    assert.equal(spell.school, source.school_id, spell.id);
    assert.equal(spell.ritual, source.ritual, spell.id);
    assert.equal(spell.concentration, source.concentration, spell.id);
    if (spell.id !== "shield") assert.deepEqual([...spell.classIds].sort(), [...source.class_ids].sort(), spell.id);
  }
  assert.deepEqual(getSpellById("shield")?.classIds, ["sorcerer", "wizard"]);
});

test("each spell in the catalog can render an effect preview and core casting facts", () => {
  const context = { characterLevel: 5, spellcastingAbilityModifier: 3, spellAttackBonus: 6, spellSaveDifficultyClass: 14 };
  for (const spell of spells) {
    const markup = renderToStaticMarkup(createElement(LevelUpSpellPreview, { spell, context }));
    assert.ok(spell.description.trim(), spell.id);
    assert.match(markup, /Wirkung.*Wirkzeit.*Reichweite.*Dauer.*Konzentration/, spell.id);
  }
  const fireball = renderToStaticMarkup(createElement(LevelUpSpellPreview, { spell: getSpellById("fireball")!, context }));
  assert.match(fireball, /8W6/);
  assert.match(fireball, /Geschicklichkeit · SG 14/);
  const blast = renderToStaticMarkup(createElement(LevelUpSpellPreview, { spell: getSpellById("eldritch-blast")!, context }));
  assert.match(blast, /2 getrennte Würfe · \+6/);
});

test("the wizard offers preview first and displays already learned and granted spells", () => {
  const rules = getSpellSelectionRules({
    classId: "rogue", subclassId: "arcane-trickster", level: 3, abilityScores: defaultAbilityScores,
  });
  const previous = {
    spellIds: [{ spellId: "fire-bolt", prepared: true }],
    slots: { spentSlots: {}, spentPactSlots: 0 },
  };
  const markup = renderToStaticMarkup(createElement(LevelUpSpells, {
    rules, value: previous, previous, needsBlast: false, context: { characterLevel: 3 }, onChange: () => {},
  }));
  assert.match(markup, /Automatisch erhaltene Zauber/);
  assert.match(markup, /<summary>Magierhand<\/summary>/);
  assert.match(markup, /<summary>Feuerpfeil<\/summary>/);
  assert.match(markup, /Zaubertricks wählen · noch/);
  assert.equal((markup.match(/aria-label="Zauber auswählen"/g) ?? []).length, 1);
  assert.match(markup, /<summary>Wirkung und Regeln<\/summary>/);
  assert.doesNotMatch(markup, /<button[^>]*>[^<]* hinzufügen/);
});

test("checked 2014 spells use distinct damage, save, healing and attack mechanics", () => {
  const display = (id: string, characterLevel = 5) => getSpellDisplayValues({
    spell: getSpellById(id)!, characterLevel, spellcastingAbilityModifier: 3, spellAttackBonus: 6, spellSaveDifficultyClass: 14,
  });
  const hold = getSpellById("hold-person")!;
  assert.deepEqual(hold.savingThrows, ["Weisheit"]);
  assert.doesNotMatch(hold.higherLevels!, /casting|aura/i);
  assert.equal(display("hold-person").savingThrow?.difficultyClass, 14);
  assert.equal(display("fireball").damage?.dice, "8W6");
  assert.equal(display("fireball").savingThrow?.resultOnSuccess, "Halber Schaden bei Erfolg.");
  assert.equal(display("heat-metal").damage?.dice, "2W8");
  assert.match(display("heat-metal").savingThrow!.resultOnSuccess, /Feuerschaden bleibt/);
  assert.equal(display("eldritch-blast", 4).attackCount, 1);
  assert.equal(display("eldritch-blast").attackCount, 2);
  assert.equal(display("eldritch-blast").damage?.dice, "1W10");
  assert.equal(display("scorching-ray").attackCount, 3);
  assert.equal(display("shocking-grasp").damage?.dice, "2W8");
  assert.equal(display("produce-flame").usesSpellAttack, true);
  assert.equal(display("spiritual-weapon").damage?.dice, "1W8 +3");
  assert.equal(display("aura-of-vitality").healing?.formatted, "2W6");
  assert.equal(display("cure-wounds").healing?.formatted, "1W8 +3");
  assert.equal(display("magic-missile").usesSpellAttack, false);
  assert.equal(display("sleep").damage, undefined);
  assert.equal(display("calling-card").savingThrow, undefined);
});

test("rolled HP, history, damage and spell slot usage survive creator edit", () => {
  const character = fixture();
  const draft = createLevelUpDraft(character);
  draft.hitPointMode = "roll";
  draft.hitDieRoll = 10;
  const next = applyLevelUp(character, draft);
  const edited = mergeEditedCharacter(mapDraftToArchiveEntry(mapArchiveEntryToDraft(next)), next);
  assert.deepEqual(edited.levelUpHistory, next.levelUpHistory);
  assert.equal(edited.vitals!.maximumHitPoints, 24);
  assert.equal(edited.vitals!.currentHitPoints, 4);
  assert.deepEqual(edited.spellcasting!.slots, next.spellcasting!.slots);
  assert.equal(migrateCharacterArchiveEntry(edited).character.vitals!.maximumHitPoints, 24);
});

test("bard expertise must use proficient skills; metamagic count is enforced", () => {
  const bard = fixture("bard", 2);
  const draft = complete(bard, createLevelUpDraft(bard));
  draft.pathChoices["bard-expertise"] = ["athletics", "survival"];
  assert.ok(validateLevelUp(bard, draft).some((error) => error.includes("Expertise benötigt")));
  const sorcerer = fixture("sorcerer", 2);
  const magic = complete(sorcerer, createLevelUpDraft(sorcerer));
  magic.pathChoices["sorcerer-metamagic"] = ["careful"];
  assert.ok(validateLevelUp(sorcerer, magic).some((error) => error.includes("Metamagie")));
});

for (const cls of classes) {
  for (const level of [1, 2, 3, 4]) test(`${cls.id} ${level}→${level + 1}: complete available progression`, () => {
    const character = fixture(cls.id, level);
    const draft = complete(character, createLevelUpDraft(character));
    assert.deepEqual(validateLevelUp(character, draft), []);
    const next = applyLevelUp(character, draft);
    assert.equal(next.level, level + 1);
    assert.ok(next.vitals!.maximumHitPoints > character.vitals!.maximumHitPoints);
  });
}

test("level 4 and 5 milestones are visible and apply lightweight mechanics", () => {
  const barbarianFour = fixture("barbarian", 4);
  const barbarianFive = applyLevelUp(barbarianFour, complete(barbarianFour, createLevelUpDraft(barbarianFour)));
  assert.equal(barbarianFive.vitals!.speed, 9);
  assert.equal(calculateCharacterRules(createCharacterRuleInput(barbarianFive)).speed, 12);
  assert.ok(getCharacterClassFeatures({ classId: "barbarian", level: 5 }).some((feature) => feature.id === "barbarian-extra-attack"));
  assert.ok(getCharacterClassFeatures({ classId: "wizard", level: 4 }).some((feature) => feature.id === "wizard-asi-4"));

  const bardResources = resolveCharacterClassResources({
    classId: "bard",
    level: 5,
    abilityScores: { ...defaultAbilityScores, charisma: 16 },
  });
  assert.equal(bardResources.find((resource) => resource.id === "bard-bardic-inspiration-uses")?.recharge, "short-rest");
});

test("level 4 applies ability score increases or records a feat", () => {
  const fighter = applyLevelUp(fixture("fighter", 2), complete(fixture("fighter", 2), createLevelUpDraft(fixture("fighter", 2))));

  const plusTwoDraft = createLevelUpDraft(fighter);
  plusTwoDraft.abilityScoreIncreases = { strength: 2 };
  const plusTwo = applyLevelUp(fighter, plusTwoDraft);
  assert.equal(plusTwo.level, 4);
  assert.equal(plusTwo.abilityScores!.strength, 12);
  assert.equal(plusTwo.levelUpHistory!.at(-1)!.abilityScoreIncreases!.strength, 2);

  const splitDraft = createLevelUpDraft(fighter);
  splitDraft.abilityScoreIncreases = { dexterity: 1, constitution: 1 };
  const split = applyLevelUp(fighter, splitDraft);
  assert.equal(split.abilityScores!.dexterity, 11);
  assert.equal(split.abilityScores!.constitution, 15);

  const featDraft = createLevelUpDraft(fighter);
  featDraft.abilityScoreMode = "feat";
  featDraft.featId = "alert";
  const feat = applyLevelUp(fighter, featDraft);
  assert.equal(feat.abilityScores!.strength, 10);
  assert.deepEqual(feat.featIds, ["alert"]);
  assert.equal(feat.levelUpHistory!.at(-1)!.featId, "alert");

  const observantDraft = createLevelUpDraft(fighter);
  observantDraft.abilityScoreMode = "feat";
  observantDraft.featId = "observant";
  observantDraft.featChoices = { observant: { "observant-ability": ["wisdom"] } };
  const observant = applyLevelUp(fighter, observantDraft);
  assert.equal(observant.abilityScores!.wisdom, 11);

  const invalidDraft = createLevelUpDraft({ ...fighter, abilityScores: { ...fighter.abilityScores!, strength: 19 } });
  invalidDraft.abilityScoreIncreases = { strength: 2 };
  assert.ok(validateLevelUp({ ...fighter, abilityScores: { ...fighter.abilityScores!, strength: 19 } }, invalidDraft).some((error) => error.includes("nicht über 20")));
});

test("feat mechanics affect derived rules", () => {
  const base = { ...defaultAbilityScores, dexterity: 14, constitution: 14, wisdom: 12 };
  const tough = calculateCharacterRules({ classId: "fighter", level: 4, abilityScores: base, baseSpeed: 9, featIds: ["tough"] });
  assert.equal(tough.maximumHitPoints, 44);

  const alertMobile = calculateCharacterRules({ classId: "fighter", level: 4, abilityScores: base, baseSpeed: 9, featIds: ["alert", "mobile"] });
  assert.equal(alertMobile.initiativeModifier, 7);
  assert.equal(alertMobile.speed, 12);

  const observant = calculateCharacterRules({
    classId: "fighter",
    level: 4,
    abilityScores: { ...base, wisdom: 13 },
    baseSpeed: 9,
    featIds: ["observant"],
    featChoices: { observant: { "observant-ability": ["wisdom"] } },
  });
  assert.equal(observant.passivePerception, 16);

  const resilient = calculateCharacterRules({
    classId: "wizard",
    level: 4,
    abilityScores: { ...base, constitution: 15 },
    baseSpeed: 9,
    featIds: ["resilient"],
    featChoices: { resilient: { "resilient-ability": ["constitution"] } },
  });
  assert.equal(resilient.savingThrows.constitution, 4);
});

test("known cantrips and spellbook entries cannot be silently replaced", () => {
  const wizard = fixture("wizard", 1);
  const draft = complete(wizard, createLevelUpDraft(wizard));
  const unused = getSpellsForClass("wizard").filter((spell) => !draft.spellcasting.spellIds.some((selection) => selection.spellId === spell.id));
  wizard.spellcasting!.spellIds = [
    { spellId: unused.find((spell) => spell.level === 0)!.id, prepared: true },
    { spellId: unused.find((spell) => spell.level === 1)!.id, prepared: true },
  ];
  const errors = validateLevelUp(wizard, draft);
  assert.ok(errors.some((error) => error.includes("Zaubertricks bleiben")));
  assert.ok(errors.some((error) => error.includes("Zauberbuch")));
});

test("grim hollow backgrounds are available as creator vault data", () => {
  const grimHollowBackgrounds = backgrounds.filter((entry) => entry.source === "grim-hollow-2025");
  assert.equal(grimHollowBackgrounds.length, 25);
  assert.ok(grimHollowBackgrounds.every((entry) => entry.originFeat));
  assert.ok(grimHollowBackgrounds.every((entry) => entry.abilityScoreOptions?.length === 3));
  assert.ok(grimHollowBackgrounds.some((entry) => entry.id === "beast-hunter"));
  assert.ok(grimHollowBackgrounds.some((entry) => entry.id === "ebon-syndicate-smuggler"));
});

for (const classId of ["fighter", "warlock"]) test(classId + ": Aufstieg, erneutes Laden und Spielbogen 1–5", () => {
  let c = fixture(classId);
  c.ancestry = "Mensch";
  c.summary = "";
  c.name = classId === "fighter" ? "Aldric Dorn" : "Mira Nachtwind";
  c.inventory!.items = ["longsword", "shortbow"].map((id, i) => ({id, name: ["Langschwert","Kurzbogen"][i], category: "weapon", quantity: 1, equipped: true, weight: 2, notes: "", createdAt: "", updatedAt: ""}));
  while (c.level < 5) {
    c = migrateCharacterArchiveEntry(JSON.parse(JSON.stringify(applyLevelUp(c, complete(c, createLevelUpDraft(c), true))))).character;
    const html = renderToStaticMarkup(createElement(CharacterPrintSheets, { character: c }));
    assert.ok(html.includes(c.name) && html.includes("Stufe " + c.level));
    const rules = calculateCharacterRules(createCharacterRuleInput(c));
    for (const feature of rules.classFeatures) assert.ok(html.includes(feature.name), feature.name);
    if (c.level === 5) {
      assert.equal(rules.proficiencyBonus, 3);
      assert.ok(html.includes("Übungsbonus") && html.includes("Langschwert") && html.includes("Kurzbogen"));
      if (classId === "warlock") assert.ok(html.includes("Paktplätze") && !html.includes(">Grad 9<"));
      if (process.env.GRIMFORGE_PRINT_QA) {
        mkdirSync(process.env.GRIMFORGE_PRINT_QA, {recursive:true});
        const assets = readdirSync("dist/assets");
        const css = [/^index-.*\.css$/, /^CharacterSheetPage-.*\.css$/].map(pattern => {
          const file = assets.find(name => pattern.test(name));
          assert.ok(file, "Für die Druckprüfung zuerst npm run build ausführen");
          return readFileSync("dist/assets/"+file,"utf8");
        }).join("\n");
        writeFileSync(process.env.GRIMFORGE_PRINT_QA+"/"+classId+".html", '<!doctype html><html lang="de"><meta charset="utf-8"><style>'+css+'</style><body>'+html+'</body></html>');
      }
    }
  }
});



// GrimForge 1.2 UX regression coverage: data-driven spell facts and safe session mechanics.
import { SpellQuickFacts } from "../src/modules/sheet/components/SpellQuickFacts";
import { DeathSavesPanel } from "../src/modules/sheet/components/DeathSavesPanel";

test("Zauberauswahl zeigt Reichweite, Schaden und die belegte Beschreibung direkt an", () => {
  const spell = getSpellById("acid-splash");
  assert.ok(spell);
  const html = renderToStaticMarkup(createElement(SpellQuickFacts, { spell, characterLevel: 1, compact: true }));
  assert.match(html, /Reichweite/);
  assert.match(html, /Schaden/);
  assert.match(html, /1W6/);
  assert.match(html, /Wirkung/);
  assert.match(html, /Säure/);
});

test("Todesrettungen sind bei positivem TP-Stand gesperrt und bei 0 TP bedienbar", () => {
  const base = fixture();
  const vitals = base.vitals!;
  const props = { saves: { successes: 2, failures: 1 }, onMark: () => {}, onReset: () => {} };
  const healed = renderToStaticMarkup(createElement(DeathSavesPanel, { ...props, vitals }));
  assert.match(healed, /Nur bei 0 TP erforderlich/);
  assert.match(healed, /disabled/);
  const unconscious = renderToStaticMarkup(createElement(DeathSavesPanel, { ...props, vitals: { ...vitals, currentHitPoints: 0 } }));
  assert.match(unconscious, /\+ Erfolg/);
  assert.match(unconscious, /\+ Fehlschlag/);
  assert.doesNotMatch(unconscious, /W20 · Todesrettung/);
  assert.doesNotMatch(unconscious, /Nur bei 0 TP erforderlich/);
});

test("Alte Akten behalten neue optionale Sitzungszustände beim Import", () => {
  const input = { ...fixture(), deathSaves: { successes: 1, failures: 2 }, exhaustionLevel: 3 };
  const migrated = migrateCharacterArchiveEntry(input).character;
  assert.deepEqual(migrated.deathSaves, input.deathSaves);
  assert.equal(migrated.exhaustionLevel, 3);
});

import { resolveInventoryItem } from "../src/modules/archives/utils/resolveInventoryItem";
import { resolveBackgroundInventory } from "../src/migrations/characterSchema";
import type { CharacterInventoryItem } from "../src/modules/archives/types";

test("Homebrew-Waffe, Rüstung und Schild behalten ihre Werte in JSON, Regeln und Spielbogen", () => {
  const base={quantity:1,weight:1,equipped:true,notes:"Selbstgeschmiedet",createdAt:"",updatedAt:""};
  const weapon: CharacterInventoryItem={...base,id:"custom-w",name:"Aschenbogen",category:"weapon",homebrew:{kind:"weapon",price:25,dice:2,die:6,damageType:"piercing",martial:true,finesse:false,ranged:true,twoHanded:true,attackBonus:1,damageBonus:2,rangeNormal:60,rangeLong:120}};
  const armor: CharacterInventoryItem={...base,id:"custom-a",name:"Aschenrüstung",category:"armor",homebrew:{kind:"armor",price:50,armorClass:15,dexterity:"limited"}};
  const shield: CharacterInventoryItem={...base,id:"custom-s",name:"Aschenschild",category:"armor",homebrew:{kind:"shield",price:10,armorClass:3,dexterity:"none"}};
  const c=fixture("fighter",5);
  c.abilityScores={...defaultAbilityScores,dexterity:16};
  c.baseAbilityScores=c.abilityScores;
  c.inventory!.items=[weapon,armor,shield];
  const restored=migrateCharacterArchiveEntry(JSON.parse(JSON.stringify(c))).character;
  assert.deepEqual(restored.inventory!.items.map(i=>i.homebrew),[weapon.homebrew,armor.homebrew,shield.homebrew]);
  const attack=getEquippedWeaponAttacks(restored,restored.inventory!)[0];
  assert.deepEqual([attack.attackBonus,attack.damage,attack.range],[7,"2W6 +5","60/120 ft"]);
  assert.equal(getCharacterDerivedStats(restored,restored.inventory!).armorClass,21);
  assert.match(renderToStaticMarkup(createElement(CharacterPrintSheets,{character:restored})),/Aschenbogen/);
  const printPdf=new TextDecoder().decode(makeGrimHollowPlayPdf(restored));
  for(const expected of ["Aschenbogen","2W6 +5 Stich","Aschenschild","21"]){
    const encoded=Buffer.from(expected,"latin1").toString("hex");
    assert.ok(printPdf.includes(encoded),expected);
  }
  assert.equal(resolveInventoryItem({...weapon, homebrew:{kind:"weapon",price:0,dice:1,die:0,damageType:"piercing",martial:false,finesse:false,ranged:false,twoHanded:false,attackBonus:0,damageBonus:0}}),undefined);
});

test("Katalogeinträge mit eigener Inventar-ID und Hintergrundmengen bleiben auflösbar",()=>{
  const result=resolveBackgroundInventory(["Reisekleidung","2 Fackel","Unbekanntes Erbstück"],"");
  assert.deepEqual(result.map(i=>[i.id,i.quantity]),[["travelers-clothes",1],["torch",2],["background-unbekanntes-erbstueck-3",1]]);
  assert.ok(result[0].weight>1.8);
  assert.equal(resolveInventoryItem({...result[0],id:"unique-id",catalogId:"grappling-hook"})?.price,2);
});
