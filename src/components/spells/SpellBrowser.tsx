import { useState } from "react";
import type { SpellDefinition } from "../../compendium/spells";
import { GrimButton } from "../ui/GrimButton";
import { LevelUpSpellPreview, type LevelUpSpellContext } from "../../modules/level-up/LevelUpSpellPreview";
import { getSpellDisplayValues } from "../../modules/sheet/utils/getSpellDisplayValues";
import "./spell-browser.css";

const schools = {abjuration:"Bannmagie",conjuration:"Beschwörung",divination:"Erkenntnismagie",enchantment:"Verzauberung",evocation:"Hervorrufung",illusion:"Illusion",necromancy:"Nekromantie",transmutation:"Verwandlung"};
const roles = ["Schaden","Schutz","Heilung","Kontrolle","Erkundung"] as const;
type Role = typeof roles[number];
export function spellRoles(s:SpellDefinition): Role[] {
  const t=s.description+" "+s.name;
  return roles.filter(r => {
    switch(r){
      case "Schaden": return !!s.damage || /\d+[wd]\d+.{0,30}(damage|schaden)/i.test(t);
      case "Heilung": return !!s.healing || /regains? .*hit points|stellt .*trefferpunkte wieder her|wiederbeleb|revivify/i.test(t);
      case "Schutz": return s.school==="abjuration" || /armor class|rüstungsklasse|temporary hit points|temporäre Trefferpunkte/i.test(t);
      case "Kontrolle": return /paraly[sz]|restrained|frightened|charmed|blinded|difficult terrain|gelähmt|festgesetzt|verängstigt|bezaubert|schwieriges Gelände|schlaf/i.test(t);
      case "Erkundung": return s.school==="divination" || /invisible|unsichtbar|speak with|communicate|detect|entdecken|mit Tieren|magische Hand/i.test(t);
    }
  });
}
export function SpellBrowser({candidates,context,onAdd}:{candidates:SpellDefinition[];context:LevelUpSpellContext;onAdd:(id:string)=>void}) {
  const [role,setRole]=useState<Role|"Alle">("Alle"), [q,search]=useState(""),[school,setSchool]=useState(""),[grade,setGrade]=useState(""),[conc,setConc]=useState(false),[limit,more]=useState(6);
  const matches=candidates.filter(s=>(role==="Alle" || spellRoles(s).includes(role)) && (!school||s.school===school) && (!grade||String(s.level)===grade) && (!conc||s.concentration) && (s.name+" "+s.description+" "+(s.mechanicsSummary??"")).toLocaleLowerCase("de").includes(q.trim().toLocaleLowerCase("de")));
  return <section className="gf-picker" aria-label="Zauber auswählen">
    <label className="gf-spell-search">Zauber suchen<input type="search" value={q} placeholder="Name oder Wirkung …" onChange={e=>{search(e.target.value);more(6)}}/></label>
    <div className="gf-picker__roles" aria-label="Nach Wirkung stöbern">{(["Alle",...roles] as const).map(r=><button type="button" key={r} aria-pressed={role===r} onClick={()=>{setRole(r);more(6)}}>{r}</button>)}</div>
    <details><summary>Weitere Filter</summary><div className="gf-picker__roles">
      <label>Schule <select value={school} onChange={e=>{setSchool(e.target.value);more(6)}}><option value="">Alle Schulen</option>{Object.entries(schools).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
      <label>Grad <select value={grade} onChange={e=>{setGrade(e.target.value);more(6)}}><option value="">Alle Grade</option>{[...new Set(candidates.map(s=>s.level))].sort().map(g=><option key={g} value={g}>{g || "Zaubertrick"}</option>)}</select></label>
      <label><input type="checkbox" checked={conc} onChange={e=>{setConc(e.target.checked);more(6)}}/> Konzentration</label></div></details>
    <p aria-live="polite">{matches.length ? Math.min(limit,matches.length)+" von "+matches.length+" Treffern" : "Keine Treffer. Ändere deine Suche oder Filter."}</p>
    <div className="gf-level-spell-grid">{matches.slice(0,limit).map(s=>{
      const v=getSpellDisplayValues({...context,spell:s});
      const first=s.description.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || s.description;
      return <article key={s.id} className="gf-level-spell-card"><header><strong>{s.name}</strong><span>{s.level ? "Grad "+s.level : "Zaubertrick"}</span></header>
        <p>{first.length>155?first.slice(0,152)+"…":first}</p>
        <small>{[s.castingTime,s.range,s.concentration&&"Konzentration",v.damage && ((v.attackCount??1)>1?v.attackCount+"× je ":"")+v.damage.dice+" "+v.damage.type,v.healing?.formatted && "Heilung "+v.healing.formatted].filter(Boolean).join(" · ")}</small>
        <details><summary>Wirkung und Regeln</summary><LevelUpSpellPreview spell={s} context={context}/></details>
        <GrimButton type="button" onClick={()=>onAdd(s.id)}>{s.name} wählen</GrimButton></article>;
    })}</div>
    {matches.length>limit && <GrimButton type="button" onClick={()=>more(limit+6)}>Weitere anzeigen</GrimButton>}
  </section>;
}
