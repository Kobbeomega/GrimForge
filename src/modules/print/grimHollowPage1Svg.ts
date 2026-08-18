import { abilityIds, abilityShortLabels, defaultAbilityScores, formatAbilityModifier } from "../../compendium/core";
import { getTransformationById } from "../../compendium/transformations";
import { calculateCharacterRules } from "../../rules";
import type { CharacterArchiveEntry } from "../archives/types";
import { getCharacterInventory } from "../archives/utils/getCharacterInventory";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import { createCharacterRuleInput } from "../sheet/rules/createCharacterRuleInput";
import { getCharacterDerivedStats } from "../sheet/utils/getCharacterDerivedStats";

export const GH_SHEET_WIDTH = 1492;
export const GH_SHEET_HEIGHT = 1054;

const esc = (v: unknown) => String(v ?? "").replace(/[&<>\"]/g, (m) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]!));
const t = (x:number,y:number,value:unknown, cls="value", anchor="middle") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" dominant-baseline="middle">${esc(value)}</text>`;
const line = (x1:number,y1:number,x2:number,y2:number, cls="rule") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;
const box = (x:number,y:number,w:number,h:number, title:string) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" class="panel"/><rect x="${x}" y="${y}" width="${w}" height="38" class="panelHead"/>${t(x+14,y+21,title,"label","start")}</g>`;

export function buildGrimHollowPage1Svg(character: CharacterArchiveEntry): string {
  const inventory = getCharacterInventory(character);
  const vitals = getCharacterVitals(character);
  const derived = getCharacterDerivedStats(character, inventory);
  const rules = calculateCharacterRules(createCharacterRuleInput(character));
  const scores = { ...defaultAbilityScores, ...character.abilityScores };
  const transformation = character.transformationId ? getTransformationById(character.transformationId) : undefined;

  const attrs = abilityIds.map((id,i) => {
    const x = 520 + i*126;
    return `<g>${t(x,300,abilityShortLabels[id],"abilityLabel")}
      <circle cx="${x}" cy="357" r="45" class="abilityCircle"/>${t(x,350,scores[id],"abilityScore")}${t(x,390,formatAbilityModifier(rules.abilityModifiers[id]),"abilityMod")}
      ${t(x,425,"SAVE","micro")}${t(x,448,formatAbilityModifier(rules.savingThrows[id]),"smallValue")}</g>`;
  }).join("");

  const weapons = derived.equippedWeapons.slice(0,3).map((w,i) => {
    const y=603+i*48;
    return `${t(538,y,w.name,"tableValue","start")}${t(800,y,w.attackBonusLabel,"tableValue")}${t(935,y,w.range||"–","tableSmall")}${t(1100,y,`${w.damage} ${w.damageType}`,"tableSmall")}`;
  }).join("");

  const items = inventory.items.slice(0,7).map((it,i) => {
    const y=805+i*31;
    return `${t(535,y,it.name,"itemValue","start")}${t(990,y,it.quantity,"itemValue")}${t(1090,y,`${Number(it.weight.toFixed(2))} kg`,"itemSmall")}`;
  }).join("");

  const resources = rules.classResources.slice(0,4).map((r,i) => {
    const y=667+i*44;
    return `${t(72,y,r.name,"resourceValue","start")}${line(70,y+17,400,y+17,"thinRule")}${t(415,y,`${r.remaining}/${r.maximum}`,"resourceCount","end")}`;
  }).join("");

  const stage = character.transformationStage ?? 0;
  const stages = [1,2,3,4,5].map((n,i)=>`<circle cx="${1240+i*42}" cy="894" r="14" class="stage ${stage===n?"active":""}"/>${t(1240+i*42,895,n,"stageText")}`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${GH_SHEET_WIDTH}" height="${GH_SHEET_HEIGHT}" viewBox="0 0 ${GH_SHEET_WIDTH} ${GH_SHEET_HEIGHT}">
<defs>
 <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="13" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="1.1"/></filter>
 <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M-2 12L12-2M4 16L16 4" class="hatch"/></pattern>
 <filter id="paperNoise"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 0.15 0 0 0 0 0.14 0 0 0 0 0.12 0 0 0 .16 0"/></filter>
 <filter id="inkBleed"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.5"/></filter>
 <style><![CDATA[
 .paper{fill:#f1eee4}.ink{fill:#111}.red{fill:#8b1118}.panel{fill:#f8f5ec;stroke:#111;stroke-width:4;filter:url(#rough)}.panelHead{fill:#111;filter:url(#rough)}.rule{stroke:#111;stroke-width:3}.thinRule{stroke:#777;stroke-width:1.5}.hatch{stroke:#c9c4b8;stroke-width:1}
 text{fill:#111;font-family:"Courier New",monospace}.title{font-family:Impact,"Arial Black",sans-serif;font-size:64px;font-weight:900;letter-spacing:1px;font-style:italic}.subtitle{font-size:14px;font-weight:700;letter-spacing:4px;fill:#8b1118}.label{fill:#f7f4ea;font-family:Georgia,serif;font-size:20px;font-weight:900;letter-spacing:1px;font-style:italic}.fieldLabel{font-size:12px;font-weight:700;letter-spacing:1px}.value{font-size:20px;font-weight:700}.smallValue{font-size:16px;font-weight:700}.micro{font-size:10px;font-weight:700;letter-spacing:1px}.abilityLabel{font-family:Georgia,serif;font-size:25px;font-weight:900}.abilityScore{font-size:27px;font-weight:900}.abilityMod{font-size:15px;font-weight:700}.abilityCircle{fill:#f8f5ec;stroke:#111;stroke-width:5;filter:url(#rough)}.tableValue{font-size:17px;font-weight:700}.tableSmall{font-size:14px;font-weight:700}.itemValue{font-size:15px}.itemSmall{font-size:13px}.resourceValue{font-size:15px;font-weight:700}.resourceCount{font-size:15px;font-weight:900;fill:#8b1118}.stage{fill:#f8f5ec;stroke:#111;stroke-width:3}.stage.active{fill:#8b1118}.stageText{font-size:11px;font-weight:900}.stage.active+text{fill:#fff}.footer{font-family:Georgia,serif;font-size:13px;font-style:italic}.combatBig{font-size:31px;font-weight:900}.combatLabel{font-size:11px;font-weight:700;letter-spacing:1px}.hpBig{font-size:34px;font-weight:900}.hpLabel{font-size:11px;font-weight:700}.skull{fill:none;stroke:#111;stroke-width:6;filter:url(#rough)}
 ]]></style>
</defs>
<rect width="1492" height="1054" class="paper"/><rect width="1492" height="1054" filter="url(#paperNoise)" opacity=".24"/><rect x="18" y="18" width="1456" height="1018" fill="none" stroke="#111" stroke-width="8" filter="url(#rough)"/>
<!-- torn zine masthead / blood accents -->
<path d="M18 18H475L456 37L474 53L449 68L471 86L438 105L457 121H18Z" class="ink" filter="url(#inkBleed)"/>
<path d="M1378 18H1474V222L1455 202L1438 218L1422 195L1404 211L1380 180Z" class="red" filter="url(#inkBleed)"/>
<path d="M438 130l13 18-8 15 17 16-15 17 13 18-17 15" fill="none" stroke="#8b1118" stroke-width="8" filter="url(#inkBleed)"/>
<g opacity=".95" fill="#8b1118"><circle cx="470" cy="112" r="5"/><circle cx="484" cy="128" r="3"/><circle cx="1185" cy="522" r="5"/><circle cx="1198" cy="536" r="3"/><circle cx="1450" cy="730" r="4"/></g>
${t(52,66,"GRIM HOLLOW","title","start")}${t(56,112,"CHARAKTERAKTE • GRIMFORGE","subtitle","start")}
<!-- identity -->
${box(45,145,405,405,"IDENTITÄT")}
${t(65,208,"NAME","fieldLabel","start")}${line(65,238,425,238)}${t(245,225,character.name||"Unbenannt","value")}
${t(65,270,"VOLK","fieldLabel","start")}${line(65,300,425,300)}${t(245,287,character.ancestry||"–","smallValue")}
${t(65,332,"HINTERGRUND","fieldLabel","start")}${line(65,362,425,362)}${t(245,349,character.backgroundName||"–","smallValue")}
${t(65,394,"GESINNUNG","fieldLabel","start")}${line(65,424,425,424)}${t(245,411,character.alignment||"–","smallValue")}
${t(65,456,"KLASSE / SUBKLASSE","fieldLabel","start")}${line(65,486,425,486)}${t(245,473,`${character.className||"–"}${character.subclass?` / ${character.subclass}`:""}`,"smallValue")}
${t(65,518,"STUFE","fieldLabel","start")}${t(155,518,character.level,"value")}${t(255,518,"ÜBUNGSBONUS","fieldLabel","start")}${t(400,518,formatAbilityModifier(rules.proficiencyBonus),"value")}
<!-- hp skull -->
<path d="M660 155 C620 155 595 190 600 232 C604 264 621 279 638 292 L638 322 L662 312 L686 322 L710 312 L734 322 L734 292 C752 279 769 264 772 232 C778 190 752 155 712 155Z" class="skull"/>
<circle cx="646" cy="225" r="19" class="ink"/><circle cx="727" cy="225" r="19" class="ink"/><path d="M687 246l-12 24h24z" class="ink"/>
${t(686,178,"TREFFERPUNKTE","hpLabel")}${t(686,210,`${vitals.currentHitPoints} / ${vitals.maximumHitPoints}`,"hpBig")}${t(686,286,`TEMP ${vitals.temporaryHitPoints||0}`,"smallValue")}
<!-- attributes -->${attrs}
<!-- combat -->
${box(1230,145,215,405,"KAMPF")}
${t(1338,215,"RÜSTUNGSKLASSE","combatLabel")}${t(1338,252,derived.armorClass,"combatBig")}${line(1260,276,1415,276,"thinRule")}
${t(1338,315,"INITIATIVE","combatLabel")}${t(1338,352,formatAbilityModifier(rules.initiativeModifier),"combatBig")}${line(1260,376,1415,376,"thinRule")}
${t(1338,415,"BEWEGUNG","combatLabel")}${t(1338,452,`${rules.speed} m`,"combatBig")}${line(1260,476,1415,476,"thinRule")}
${t(1338,510,"INSPIRATION","combatLabel")}<rect x="1320" y="523" width="36" height="18" fill="none" stroke="#111" stroke-width="3"/>
<!-- resources -->${box(45,585,405,240,"RESSOURCEN & FÄHIGKEITEN")}${[0,1,2,3].map(i=>line(70,650+i*44,420,650+i*44,"thinRule")).join("")}${resources}
<!-- chains / occult ornaments -->
<g fill="none" stroke="#111" stroke-width="4" opacity=".95">${[0,1,2,3,4,5].map(i=>`<ellipse cx="55" cy="${610+i*35}" rx="8" ry="14" transform="rotate(${i%2?28:-28} 55 ${610+i*35})"/>`).join("")}</g>
<g transform="translate(1390 970)" stroke="#8b1118" fill="none" stroke-width="3"><circle r="25"/><path d="M0-31L8-8l25-8-18 18 18 17-25-7-8 25-8-25-25 7 18-17-18-18 25 8z"/></g>
<!-- attacks -->${box(490,535,700,185,"ANGRIFFE & MAGIE")}
${t(535,579,"NAME","fieldLabel","start")}${t(800,579,"ANGRIFF","fieldLabel")}${t(935,579,"REICHWEITE","fieldLabel")}${t(1100,579,"SCHADEN / TYP","fieldLabel")}${line(520,594,1160,594,"thinRule")}${line(520,627,1160,627,"thinRule")}${line(520,675,1160,675,"thinRule")}${line(520,723,1160,723,"thinRule")}${weapons}
<!-- equipment -->${box(490,750,700,265,"AUSRÜSTUNG")}${t(535,788,"GEGENSTAND","fieldLabel","start")}${t(990,788,"MENGE","fieldLabel")}${t(1090,788,"GEWICHT","fieldLabel")}${line(520,798,1160,798,"thinRule")}${[0,1,2,3,4,5,6].map(i=>line(520,820+i*31,1160,820+i*31,"thinRule")).join("")}${items}
<!-- right lower -->${box(1230,585,215,430,"GRIM HOLLOW")}${t(1338,642,"GOLD","combatLabel")}${t(1338,680,inventory.currency.gold,"combatBig")}${line(1260,704,1415,704,"thinRule")}
${t(1338,742,"DEATH SAVES","combatLabel")}${t(1270,780,"ERFOLG","micro","start")}<circle cx="1350" cy="776" r="9" class="stage"/><circle cx="1378" cy="776" r="9" class="stage"/><circle cx="1406" cy="776" r="9" class="stage"/>${t(1270,815,"FEHLER","micro","start")}<circle cx="1350" cy="811" r="9" class="stage"/><circle cx="1378" cy="811" r="9" class="stage"/><circle cx="1406" cy="811" r="9" class="stage"/>
${t(1338,858,"TRANSFORMATION","combatLabel")}${stages}${t(1338,935,transformation?.name||"Keine","smallValue")}${line(1260,960,1415,960,"thinRule")}
<!-- gothic accents -->
<path d="M462 145l18 18-18 18 18 18-18 18" fill="none" stroke="#8b1118" stroke-width="6"/><path d="M1200 535l15 15-15 15 15 15-15 15" fill="none" stroke="#8b1118" stroke-width="6"/>
<!-- ruined skyline / graveyard accent -->
<g fill="#111" opacity=".95" filter="url(#rough)"><path d="M438 1015V970h12v-20h8v20h12v45zm35 0v-30h8v-18h7v18h9v30zm18-54l-7-10 7-10 7 10z"/><path d="M1140 1015v-42h10v-26h7v26h12v42zm25 0v-27h7v-15h6v15h8v27z"/><path d="M1192 1015v-34h5v-22h5v22h7v34z"/></g>
<g stroke="#111" stroke-width="4" fill="none"><path d="M460 1014v-36m-12 10h24"/><path d="M1170 1014v-30m-10 9h20"/></g>
${t(52,1020,"› WAS DU IM SPIEL BRAUCHST. NICHTS MEHR. NICHTS WENIGER. ‹","footer","start")}
</svg>`;
}
