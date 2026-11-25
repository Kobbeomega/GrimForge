import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { buildGrimHollowSheetPdf } from "../src/modules/print/exportGrimHollowSheet";
import { getSpellsForClass } from "../src/compendium/spells";
import type { CharacterArchiveEntry } from "../src/modules/archives/types";
const output=process.env.GRIMFORGE_OVERLAY_QA!;
const adapter=process.env.GRIMFORGE_CANVAS_ADAPTER!;
class FakeCanvas {
  width=0;height=0;
  bg="";
  getContext() {
    const ops:unknown[][]=[];
    let factor=1;
    let circle:number[]=[];
    const stack:Array<[string,string,string]>=[];
    const ctx={
      font:"10px Arial", textAlign:"start", textBaseline:"alphabetic", fillStyle:"#111", strokeStyle:"#bbb",
      scale:(x:number)=>{factor=x},
      measureText(text:string){
        const size=Number(this.font.match(/([\d.]+)px/)?.[1]??10);
        const width=[...text].reduce((a,c)=>a+(/[ ilI.,'!|:;]/.test(c)?.32:/[wWmM@%]/.test(c)?.95:/[A-ZÄÖÜ]/.test(c)?.72:.59),0)*size;
        return {width,actualBoundingBoxAscent:size*.72,actualBoundingBoxDescent:size*.20};
      },
      save(){stack.push([this.font,this.textAlign,this.textBaseline]);},
      restore(){const s=stack.pop();if(s)[this.font,this.textAlign,this.textBaseline]=s;},
      fillText(t:string,x:number,y:number){ops.push(["text",t,x*factor,y*factor,this.font,this.textAlign,this.textBaseline,factor]);},
      drawImage:(img:{src:string})=>{this.bg=img.src},
      fillRect(){},
      strokeRect(x:number,y:number,w:number,h:number){ops.push(["rect",x*factor,y*factor,w*factor,h*factor]);},
      beginPath(){circle=[];},
      arc(x:number,y:number,r:number){circle=[x,y,r];},
      fill(){if(circle.length)ops.push(["circle",...circle]);},
    };
    this.toBlob=(callback:(b:Blob)=>void)=>{
      const result=spawnSync("python",[adapter],{input:JSON.stringify({bg:this.bg,width:this.width,height:this.height,ops}),maxBuffer:8*1024*1024});
      if(result.status!==0)throw Error(result.stderr.toString());
      callback(new Blob([new Uint8Array(result.stdout)]));
    };
    return ctx;
  }
  toBlob(_cb:(b:Blob)=>void){}
}
Object.assign(globalThis,{document:{createElement:()=>new FakeCanvas()},Image:class{
  naturalWidth=1700;naturalHeight=2200;onload=()=>{};
  set src(v:string){this.path=v;queueMicrotask(this.onload);}
  get src(){return this.path;}
  path="";
}});
for(const heavy of [false,true]) {
  const stamp="2026-01-01";
  const item=(id:string,name:string,equipped=false,category:"weapon"|"other"="other")=>({id,name,category,equipped,quantity:1,weight:1,notes:"",createdAt:stamp,updatedAt:stamp});
  const c:CharacterArchiveEntry={id:"qa",fileNumber:"QA",name:"Mira Ährenwald",classId:heavy?"wizard":"fighter",className:heavy?"Magier":"Kämpfer",level:5,ancestry:"Mensch",backgroundName:"Gelehrte",alignment:"Neutral gut",status:"active",summary:heavy?"Sie wuchs zwischen alten Karten und staubigen Regalen auf. ".repeat(72):"Aus dem Nebelwald.",updatedAt:stamp,abilityScores:{strength:16,dexterity:12,constitution:14,intelligence:16,wisdom:10,charisma:8},vitals:{maximumHitPoints:33,currentHitPoints:21,temporaryHitPoints:5,speed:9,armorClass:11,initiativeModifier:1},skillProficiencies:["arcana","perception","stealth"],inventory:{items:[item("longsword","Langschwert",true,"weapon"),item("dagger","Dolch",true,"weapon"),item("quarterstaff","Kampfstab",true,"weapon"),...(heavy?[item("light-crossbow","Leichte Armbrust",true,"weapon"),...Array.from({length:22},(_,i)=>item("qa"+i,"Inventarstück "+(i+1)))]:[])],currency:{gold:12,silver:5,copper:8}},spellcasting:{spellIds:heavy?getSpellsForClass("wizard").filter(s=>s.level<=2).slice(0,28).map((s,i)=>({spellId:s.id,prepared:i%2===0})):[],slots:{spentSlots:{1:1},spentPactSlots:0}}};
  const blob=await buildGrimHollowSheetPdf(c);
  writeFileSync(output+"/grim-hollow-original-"+(heavy?"magier":"kaempfer")+".pdf",new Uint8Array(await blob.arrayBuffer()));
}

