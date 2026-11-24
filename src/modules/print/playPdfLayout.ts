// A4 portrait; standard PDF fonts keep the export sharp and selectable.
const width = 595.28, height = 841.89, margin = 43, bottom = 783;
const ink = "0.13 0.12 0.12", edge = "0.39 0.35 0.31", paper = "0.965 0.954 0.931";
const winAnsi = new Map([...("€\u0081‚ƒ„…†‡ˆ‰Š‹Œ\u008dŽ\u008f\u0090‘’“”•–—˜™š›œ\u009džŸ")].map((c,i)=>[c,128+i]));
function hex(s: string) {
  return [...s.normalize("NFC")].map(c=>{
    const n=c.charCodeAt(0);
    return (n>=32 && n<=255?n:winAnsi.get(c)??63).toString(16).padStart(2,"0");
  }).join("");
}

const units = (s:string) => [...s].reduce((sum,c)=>sum+(/[ ilI.,'!|:;]/.test(c)?0.31:/[wWmM@%]/.test(c)?0.96:/[A-ZÄÖÜ]/.test(c)?0.73:0.61),0);
function wrap(text:string,size:number,available:number) {
  return text.split(/\r?\n/).flatMap(paragraph=>{
    const result:string[]=[];
    let line="";
    for(const word of paragraph.trim().split(/\s+/)) {
      if(line && units(line+" "+word)*size>available){result.push(line);line="";}
      if(units(word)*size>available){
        for(const c of word){if(units(line+c)*size>available && line){result.push(line);line="";}line+=c;}
      } else line+=line?" "+word:word;
    }
    return [...result,line];
  });
}

export class PlayPdf {
  private pages:string[][]=[];
  private y=0;
  private area="Spielwerte";
  private readonly name:string;
  constructor(name:string){this.name=name;this.page();}
  private get ops(){return this.pages[this.pages.length-1];}
  private text(value:string,x:number,y:number,size:number,bold=false,serif=false) {
    this.ops.push(`BT ${ink} rg /F${serif?3:bold?2:1} ${size} Tf 1 0 0 1 ${x} ${(height-y).toFixed(2)} Tm <${hex(value)}> Tj ET`);
  }
  private path(points:number[][],closed=true,fill?:string,stroke=edge,weight=.65) {
    this.ops.push(`q ${stroke} RG ${weight} w ${fill?fill+" rg ":""}${points.map(([x,y],i)=>x.toFixed(2)+" "+(height-y).toFixed(2)+(i?" l":" m")).join(" ")}${closed?" h":""} ${fill?"B":"S"} Q`);
  }
  private panel(x:number,y:number,w:number,h:number,cut:number,fill?:string){
    this.path([[x+cut,y],[x+w-cut,y],[x+w,y+cut],[x+w,y+h-cut],[x+w-cut,y+h],[x+cut,y+h],[x,y+h-cut],[x,y+cut]],true,fill);
  }
  private diamond(x:number,y:number,r:number,fill=edge){
    this.path([[x-r,y],[x,y-r],[x+r,y],[x,y+r]],true,fill);
  }
  private seal(x:number,y:number){
    this.diamond(x,y,16,paper);
    this.diamond(x,y,12,"1 1 1");
    this.path([[x-4,y+6],[x-6,y+1],[x-6,y-3],[x-3,y-6],[x+3,y-6],[x+6,y-3],[x+6,y+1],[x+4,y+6]],true,ink,ink);
    this.diamond(x-2.5,y-1,1.1,"1 1 1");
    this.diamond(x+2.5,y-1,1.1,"1 1 1");
    this.path([[x-2,y+3],[x+2,y+3]],false,undefined,"1 1 1",.6);
  }
  private line(y:number){this.ops.push(`0.63 0.58 0.50 RG 0.6 w ${margin} ${height-y} m ${width-margin} ${height-y} l S`);}
  private page() {
    this.pages.push([]);
    this.panel(20,20,width-40,height-40,15);
    this.panel(26,26,width-52,height-52,11);
    for(const x of [28,width-28]) for(const y of [28,height-28])this.diamond(x,y,3);
    this.path([[margin,64],[width/2-23,64]],false);
    this.path([[width/2+23,64],[width-margin,64]],false);
    this.diamond(margin,64,2.5);
    this.diamond(width-margin,64,2.5);
    this.seal(width/2,64);
    this.text("GRIMFORGE",margin,54,15,true,true);
    this.text(this.area.toUpperCase(),width-margin-units(this.area.toUpperCase())*9,54,9,true);
    this.y=86;
  }
  start(area:string){this.area=area;this.page();}
  noteLines() {
    if(this.y+50>bottom)return;
    this.y+=10;
    this.text("Notizen am Tisch",margin,this.y+10,9,true);
    for(let y=this.y+27;y<Math.min(this.y+65,bottom);y+=17)this.line(y);
  }
  private ensure(space:number){if(this.y+space>bottom)this.page();}
  title(value:string) {
    for(const line of wrap(value,25,width-2*margin-16)){this.ensure(36);this.panel(margin,this.y,width-2*margin,32,6,paper);this.text(line,margin+9,this.y+23,25,true,true);this.y+=36;}
  }
  heading(value:string) {
    this.ensure(60);
    this.y+=7;
    this.panel(margin,this.y,width-2*margin,21,4,paper);
    this.diamond(margin+10,this.y+10.5,2.6);
    this.text(value,margin+19,this.y+15,12,true,true);
    this.y+=27;
  }
  row(label:string,detail?:string) {
    const lead=wrap(label,10.5,width-2*margin);
    const body=detail?wrap(detail,10,width-2*margin-8):[];
    const lines=lead.length+body.length;
    this.ensure((lines<=12?lines:Math.min(lines,4))*14+5);
    for(const str of lead){this.ensure(14);this.text(str,margin,this.y+10.5,10.5,true);this.y+=14;}
    for(const str of body){this.ensure(14);this.text(str,margin+8,this.y+10,10);this.y+=14;}
    this.y+=4;
  }
  cells(entries:[string,string][],columns=3) {
    const w=(width-2*margin)/columns;
    for(let start=0;start<entries.length;start+=columns){
      const line=entries.slice(start,start+columns);
      const wrapped=line.map(([label,value])=>({label:wrap(label,9,w-16),value:wrap(value,11,w-16)}));
      const labelLines=Math.max(...wrapped.map(c=>c.label.length));
      const rowHeight=labelLines*11+Math.max(...wrapped.map(c=>c.value.length))*14+10;
      this.ensure(rowHeight);
      wrapped.forEach((c,i)=>{
        const x=margin+i*w+8;
        this.panel(x-8,this.y+1,w-5,rowHeight-3,4);
        c.label.forEach((l,j)=>this.text(l,x,this.y+10+11*j,9));
        c.value.forEach((v,j)=>this.text(v,x,this.y+12+labelLines*11+14*j,11,true));
      });
      this.y+=rowHeight;
    }
  }
  bytes(): Uint8Array {
    const objects=["<< /Type /Catalog /Pages 2 0 R >>","", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>","<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold /Encoding /WinAnsiEncoding >>"];
    this.pages.forEach((commands,i)=>{
      const short = wrap(this.name,9,350)[0];
      const stream=[...commands,`BT /F1 8 Tf 1 0 0 1 ${margin} 37 Tm <${hex(short)}> Tj ET`,`BT /F1 8 Tf 1 0 0 1 495 37 Tm <${hex((i+1)+" / "+this.pages.length)}> Tj ET`].join("\n");
      const ref=objects.length+2;
      objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${ref} 0 R >>`,`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    });
    objects[1]=`<< /Type /Pages /Kids [${this.pages.map((_,i)=>(6+2*i)+" 0 R").join(" ")}] /Count ${this.pages.length} >>`;
    let out="%PDF-1.4\n", offsets=[0];
    objects.forEach((object,i)=>{offsets.push(out.length);out+=`${i+1} 0 obj\n${object}\nendobj\n`;});
    const xref=out.length;
    out+=`xref\n0 ${offsets.length}\n0000000000 65535 f \n`;
    out+=offsets.slice(1).map(offset=>String(offset).padStart(10,"0")+" 00000 n \n").join("");
    out+=`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
    return new TextEncoder().encode(out);
  }
}
