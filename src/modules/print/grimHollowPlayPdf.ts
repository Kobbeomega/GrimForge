import { abilityIds, abilityLabels, defaultAbilityScores, getAbilityModifier, formatAbilityModifier } from "../../compendium/core";
import { getClassById, getSubclassById, getGrantedSubclassSpellIds } from "../../compendium/classes";
import { getAncestryTraitById } from "../../compendium/ancestries";
import { getBackgroundById } from "../../compendium/backgrounds";
import { getSpellById } from "../../compendium/spells";
import { getFeatById } from "../../compendium/feats";
import { skillsById } from "../../compendium/skills";
import { resolveCharacterTransformation, transformationApplicationLabels, transformationGroupLabels } from "../../compendium/transformations/activeRecord";
import { calculateCharacterRules } from "../../rules";
import type { CharacterArchiveEntry } from "../archives/types";
import { getCharacterInventory } from "../archives/utils/getCharacterInventory";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import { resolveInventoryItem } from "../archives/utils/resolveInventoryItem";
import { createCharacterRuleInput } from "../sheet/rules/createCharacterRuleInput";
import { getCharacterDerivedStats } from "../sheet/utils/getCharacterDerivedStats";
import { getSpellDisplayValues } from "../sheet/utils/getSpellDisplayValues";
import { getSubclassSheetStats } from "../sheet/utils/getSubclassSheetStats";
import { getBeastCompanion } from "../sheet/utils/getBeastCompanion";
import { getInventoryWeaponAttacks } from "../sheet/utils/getWeaponAttack";
import { tableConditions } from "../sheet/tableConditions";
import { PlayPdf } from "./playPdfLayout";

const signed = (n:number) => formatAbilityModifier(n);
const join = (parts: unknown[]) => parts.filter(Boolean).join(" · ");

export function makeGrimHollowPlayPdf(c:CharacterArchiveEntry): Uint8Array {
  const transformation=resolveCharacterTransformation(c);
  const inventory=getCharacterInventory(c);
  const hp=getCharacterVitals(c);
  const stats=getCharacterDerivedStats(c,inventory);
  const weaponRows=getInventoryWeaponAttacks(c,inventory).sort((a,b)=>Number(b.item.equipped)-Number(a.item.equipped));
  const knownAttacks=weaponRows.flatMap(({attack})=>attack?[attack]:[]);
  const rules=calculateCharacterRules(createCharacterRuleInput(c));
  const scores={...defaultAbilityScores,...c.abilityScores};
  const cls=c.classId ? getClassById(c.classId) : undefined;
  const pdf=new PlayPdf(c.name);
  pdf.title(c.name || "Unbenannter Charakter");
  const subclass=getSubclassById(c.classId??"",c.subclassId??"");
  pdf.row(join([c.className,"Stufe "+c.level,subclass?.name??c.subclass,c.ancestry,c.backgroundName,c.alignment]));
  pdf.heading("Am Spieltisch");
  pdf.cells([
    ["Trefferpunkte",hp.currentHitPoints+"/"+hp.maximumHitPoints+(hp.temporaryHitPoints?" +"+hp.temporaryHitPoints+" temporär":"")],
    ["Rüstungsklasse",String(stats.armorClass)],["Initiative",signed(rules.initiativeModifier)],
    ["Bewegung",rules.speed+" m"],["Übungsbonus",signed(stats.proficiencyBonus)],["Passive Wahrnehmung",String(rules.passivePerception)],
    ["Trefferwürfel",Math.max(0,c.level-(c.spentHitDice??0))+"/"+c.level+(cls?" W"+cls.hitDie:"")],
    ["Inspiration",c.inspiration?"Vorhanden":"Nicht aktiv"],["TP / Zustände am Tisch","________________"],
  ]);
  pdf.heading("Attribute und Rettungswürfe");
  pdf.cells(abilityIds.map(id=>[abilityLabels[id],scores[id]+" ("+signed(getAbilityModifier(scores[id]))+") / RW "+signed(rules.savingThrows[id])]),3);
  pdf.heading("Fertigkeiten");
  pdf.cells(rules.skillBonuses.map(s=>[skillsById[s.id]?.name??s.id,signed(s.bonus)+(c.skillExpertise?.includes(s.id)?" · Expertise":s.proficient?" · Geübt":"")]),3);
  if(knownAttacks.length){
    pdf.heading("Angriffe auf einen Blick");
    knownAttacks.slice(0,2).forEach(a=>pdf.row(a.name,join([a.attackBonusLabel,a.damage+" "+a.damageType])));
  }
  if(stats.spellcasting.enabled)pdf.row("Zauberwerte",join(["SG "+(stats.spellcasting.spellSaveDifficultyClass??"-"),"Angriff "+signed(stats.spellcasting.spellAttackBonus??0)]));
  const conditions=tableConditions.filter(item=>c.conditionIds?.includes(item.id));
  if(conditions.length)pdf.row("Aktuelle Zustände",conditions.map(item=>item.label).join(", "));
  if(transformation.name)pdf.row("Wandlung: "+transformation.name+(transformation.stage?" · Stufe "+transformation.stage:""),"Nicht eingerechnet · Details unter Merkmale & Chronik");
  pdf.noteLines();

  pdf.start("Kampf & Ausrüstung");
  pdf.heading("Angriffe mit Inventarwaffen");
  if(!weaponRows.length) pdf.row("Keine Waffen im Inventar.");
  weaponRows.forEach(({item,attack:a})=>{
    const title=item.name+(item.quantity>1?" ×"+item.quantity:"")+(item.equipped?" · ausgerüstet":"");
    pdf.row(title,a ? join(["Angriff "+a.attackBonusLabel,(a.damage+" "+a.damageType).trim(),!a.proficient && "Ohne Übung",a.criticalMinimum<20 && "Kritisch ab "+a.criticalMinimum,a.details]) : "Keine Waffenwerte hinterlegt.");
  });
  if(rules.classResources.length){
    pdf.heading("Klassenressourcen");
    rules.classResources.forEach(r=>pdf.row(r.name,r.remaining+"/"+r.maximum+" verfügbar · "+({"short-rest":"kurze Rast","long-rest":"lange Rast","turn":"je Zug"})[r.recharge]));
  }
  pdf.heading("Ausrüstung & Münzen");
  pdf.row(inventory.currency.gold+" GM · "+inventory.currency.silver+" SM · "+inventory.currency.copper+" KM",stats.totalWeight.toLocaleString("de-DE",{maximumFractionDigits:2})+" kg getragen");
  inventory.items.filter(i=>i.quantity>0).forEach(i=>{
    const d=resolveInventoryItem(i);
    const defense=d?.category==="shield"?"RK +"+d.armorClass:d?.category==="armor"?join(["Basis-RK "+d.armorClass,d.dexterityModifier&&(d.maximumDexterityBonus===undefined?"GE voll":"GE bis +"+d.maximumDexterityBonus),d.strengthRequirement&&"ST "+d.strengthRequirement,d.stealthDisadvantage&&"Nachteil auf Heimlichkeit"]):"";
    pdf.row((i.quantity>1?i.quantity+"× ":"")+i.name+(i.equipped?" · ausgerüstet":""),join([defense,i.homebrew?i.notes:undefined,d?.category==="consumable"?d.description:undefined]));
  });
  if(c.toolProficiencies?.length || c.languageChoices) pdf.row("Werkzeuge und Sprachen",join([...(c.toolProficiencies??[]),c.languageChoices && c.languageChoices+" zusätzliche Sprachen"]));
  const companion=getBeastCompanion(c);
  if(companion){
    pdf.heading("Tiergefährte · "+companion.name);
    pdf.cells([["Rüstungsklasse",String(companion.armor)],["Trefferpunkte",String(companion.hp)],["Bewegung",companion.speed]]);
    pdf.row("Sinne und Merkmale",join(["Passive Wahrnehmung "+companion.passive,companion.senses,companion.traits]));
    companion.attacks.forEach(a=>pdf.row(a.name,join([a.attack,a.damage,a.note])));
  }

  if(stats.spellcasting.enabled){
    const magic=stats.spellcasting, slots=c.spellcasting?.slots;
    pdf.start("Zauber");
    pdf.heading("Zauberwirken");
    pdf.cells([["Attribut",magic.abilityId?abilityLabels[magic.abilityId]:"-"],["Rettungswurf-SG",String(magic.spellSaveDifficultyClass??"-")],["Zauberangriff",signed(magic.spellAttackBonus??0)]]);
    const totals=Object.entries(magic.spellSlots).filter(([,n])=>n>0);
    for(const [grade,n] of totals) pdf.row("Grad "+grade+" · "+Math.max(0,n-(slots?.spentSlots[Number(grade) as 1]??0))+"/"+n+" Plätze frei");
    if(magic.pactSlots)pdf.row("Paktplätze · Grad "+magic.pactSlots.slotLevel+" · "+Math.max(0,magic.pactSlots.slots-(slots?.spentPactSlots??0))+"/"+magic.pactSlots.slots+" frei");
    const granted=getGrantedSubclassSpellIds({classId:c.classId??"",subclassId:c.subclassId,level:c.level,pathChoices:c.pathChoices});
    const selected=new Map((c.spellcasting?.spellIds??[]).map(s=>[s.spellId,s.prepared]));
    granted.forEach(id=>selected.set(id,true));
    const entries=[...selected].map(([id,prepared])=>({id,prepared,spell:getSpellById(id)})).sort((a,b)=>(a.spell?.level??99)-(b.spell?.level??99)||(a.spell?.name??a.id).localeCompare(b.spell?.name??b.id,"de"));
    let last=-1;
    for(const {id,prepared,spell:s} of entries){
      if(!s){pdf.row(id,"Kein Katalogtext vorhanden.");continue;}
      if(last!==s.level){last=s.level;pdf.heading(last?"Grad "+last:"Zaubertricks");}
      const v=getSpellDisplayValues({spell:s,characterLevel:c.level,spellcastingAbilityModifier:magic.abilityModifier,spellSaveDifficultyClass:magic.spellSaveDifficultyClass,spellAttackBonus:magic.spellAttackBonus,lifeDomainHealing:c.subclassId==="life-domain",invocations:c.pathChoices?.["warlock-invocations"]});
      pdf.row(s.name+(granted.includes(id)?" · automatisch":s.level && prepared?" · vorbereitet":""),[
        join([s.castingTime,s.range,s.duration,s.concentration&&!/concentr|konzentr/i.test(s.duration)&&"Konzentration",s.ritual&&"Ritual",s.components.verbal&&"V",s.components.somatic&&"G",s.components.material&&("M"+(s.components.materialDescription?": "+s.components.materialDescription:""))]),
        join([v.damage&&((v.attackCount??1)>1?v.attackCount+"× je ":"")+v.damage.dice+" "+v.damage.type+(v.damage.note?" ("+v.damage.note+")":""),v.healing&&"Heilung "+v.healing.formatted,v.savingThrow&&v.savingThrow.abilityLabel+"-RW",v.usesSpellAttack&&"Zauberangriff "+(v.spellAttackLabel??"")]),
        s.description,s.higherLevels&&"Höhere Grade / Stufen: "+s.higherLevels
      ].filter(Boolean).join("\n"));
    }
  }
  pdf.start("Merkmale & Chronik");
  pdf.heading("Klasse, Talente und Herkunft");
  rules.classFeatures.forEach(f=>pdf.row(f.name,f.description));
  getSubclassSheetStats(c).forEach(s=>pdf.row(s.label+": "+s.value,s.condition));
  for(const id of c.featIds??[]){const feat=getFeatById(id);pdf.row(feat?.name??id,feat?.description);}
  for(const id of c.ancestryTraitIds??[]){const trait=getAncestryTraitById(id);if(trait)pdf.row(trait.name,trait.description);}
  const background=getBackgroundById(c.backgroundId??"")?.feature??c.backgroundFeature;
  if(background)pdf.row(background.name,background.description);
  if(transformation.name){
    pdf.heading("Transformation");
    pdf.row(transformation.name+(transformation.stage?" · Stufe "+transformation.stage:""),transformation.warning);
    transformation.features.forEach(f=>pdf.row(transformationGroupLabels[f.group]+" · "+f.name,"Stufe "+f.stage+" · "+transformationApplicationLabels[f.application]+"\n"+f.description));
  }
  const journal=c.journal;
  const story=[["Vorgeschichte",journal?.background||c.summary],["Motivation",journal?.motivations],["Persönlichkeit",journal?.personality],["Ideale",journal?.ideals],["Bindungen",journal?.bonds],["Makel",journal?.flaws]];
  if(story.some(([,body])=>body?.trim())){pdf.heading("Chronik");story.forEach(([label,body])=>{if(body?.trim())pdf.row(label!,body);});}
  return pdf.bytes();
}
