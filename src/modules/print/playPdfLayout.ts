// A4 portrait; standard PDF fonts keep the export sharp and selectable.
const width = 595.28, height = 841.89, margin = 43, bottom = 783;
const ink = "0.13 0.12 0.12";
const edge = "0.38 0.12 0.17";
const edgeDark = "0.27 0.065 0.09";
const edgeSoft = "0.72 0.60 0.62";
const paper = "0.977 0.964 0.958";
const paperShade = "0.955 0.936 0.928";
const paperText = "0.985 0.973 0.958";
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
  private text(value:string,x:number,y:number,size:number,bold=false,serif=false,color=ink) {
    this.ops.push(`BT ${color} rg /F${serif?3:bold?2:1} ${size} Tf 1 0 0 1 ${x} ${(height-y).toFixed(2)} Tm <${hex(value)}> Tj ET`);
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
  private line(y:number,x1=margin,x2=width-margin,color=edgeSoft,weight=.45){
    this.ops.push(`${color} RG ${weight} w ${x1} ${height-y} m ${x2} ${height-y} l S`);
  }
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
    this.text("GRIMFORGE",margin,54,15,true,true,edgeDark);
    this.text(this.area.toUpperCase(),width-margin-units(this.area.toUpperCase())*9,54,9,true,false,edgeDark);
    this.text("SPIELAKTE · A4",margin,75,6.5,true,false,edgeSoft);
    this.y=86;
  }
  start(area:string){this.area=area;this.page();}
  noteLines() {
    if(this.y+50>bottom)return;
    this.y+=9;
    this.panel(margin,this.y,width-2*margin,18,3,paperShade);
    this.diamond(margin+9,this.y+9,2,edge);
    this.text("NOTIZEN AM TISCH",margin+17,this.y+12.5,7.5,true,false,edgeDark);
    for(let y=this.y+31;y<Math.min(this.y+72,bottom);y+=17)this.line(y);
  }
  private ensure(space:number){if(this.y+space>bottom)this.page();}
  keepTogether(space:number){this.ensure(space);}
  title(value:string) {
    for(const line of wrap(value,23,width-2*margin-22)){
      this.ensure(34);
      this.panel(margin,this.y,width-2*margin,30,6,edgeDark);
      this.text(line,margin+11,this.y+22,23,true,true,paperText);
      this.y+=34;
    }
  }
  heading(value:string) {
    // Reserve enough room for the heading and the beginning of the first
    // following block. A section label at the foot of a page is harder to
    // scan at the table and looks like a printing error.
    this.ensure(120);
    this.y+=5;
    this.panel(margin,this.y,width-2*margin,19,4,paperShade);
    this.panel(margin,this.y,7,19,2,edgeDark);
    this.diamond(margin+14,this.y+9.5,2.2,edge);
    this.text(value,margin+22,this.y+13.5,10.5,true,true,edgeDark);
    this.y+=24;
  }
  row(label:string,detail?:string) {
    const lead=wrap(label,10.2,width-2*margin-12);
    const body=detail?wrap(detail,9.5,width-2*margin-14):[];
    const lines=lead.length+body.length;
    this.ensure((lines<=12?lines:Math.min(lines,4))*13+5);
    this.diamond(margin+3,this.y+6,1.25,edge);
    for(const str of lead){this.ensure(13);this.text(str,margin+10,this.y+10,10.2,true,false,edgeDark);this.y+=13;}
    for(const str of body){this.ensure(12.5);this.text(str,margin+10,this.y+9.5,9.5);this.y+=12.5;}
    this.line(this.y+1,margin+10,width-margin,"0.84 0.78 0.78",.35);
    this.y+=5;
  }
  cells(entries:[string,string][],columns=3) {
    const w=(width-2*margin)/columns;
    for(let start=0;start<entries.length;start+=columns){
      const line=entries.slice(start,start+columns);
      const wrapped=line.map(([label,value])=>({label:wrap(label,8,w-16),value:wrap(value,10,w-16)}));
      const labelLines=Math.max(...wrapped.map(c=>c.label.length));
      const rowHeight=labelLines*9+Math.max(...wrapped.map(c=>c.value.length))*12+9;
      this.ensure(rowHeight);
      wrapped.forEach((c,i)=>{
        const x=margin+i*w+8;
        this.panel(x-8,this.y+1,w-5,rowHeight-3,4,paper);
        c.label.forEach((l,j)=>this.text(l,x,this.y+9+9*j,8,false,false,edgeDark));
        c.value.forEach((v,j)=>this.text(v,x,this.y+10+labelLines*9+12*j,10,true));
      });
      this.y+=rowHeight;
    }
  }
  metrics(entries:Array<[string,string,string?]>,columns=3) {
    const w=(width-2*margin)/columns;
    const rowHeight=48;
    for(let start=0;start<entries.length;start+=columns){
      const line=entries.slice(start,start+columns);
      this.ensure(rowHeight);
      line.forEach(([label,value,note],i)=>{
        const x=margin+i*w;
        this.panel(x,this.y+1,w-5,rowHeight-4,4,paper);
        this.panel(x,this.y+1,5,rowHeight-4,2,edgeDark);
        this.text(label.toUpperCase(),x+10,this.y+10.5,7,true,false,edgeDark);
        this.text(value,x+10,this.y+28,14,true,true);
        if(note){
          const detail=wrap(note,7,w-20).slice(0,2);
          detail.forEach((str,j)=>this.text(str,x+10,this.y+39+j*7,7));
        }
      });
      this.y+=rowHeight;
    }
  }
  bytes(): Uint8Array {
    const objects=["<< /Type /Catalog /Pages 2 0 R >>","", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>","<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold /Encoding /WinAnsiEncoding >>"];
    this.pages.forEach((commands,i)=>{
      const short = wrap(this.name,9,350)[0];
      const footerY=height-795;
      const stream=[
        ...commands,
        `${edgeSoft} RG 0.45 w ${margin} ${footerY.toFixed(2)} m ${width-margin} ${footerY.toFixed(2)} l S`,
        `BT ${ink} rg /F1 8 Tf 1 0 0 1 ${margin} 37 Tm <${hex(short)}> Tj ET`,
        `BT ${edgeDark} rg /F2 7 Tf 1 0 0 1 485 37 Tm <${hex("SEITE "+(i+1)+" / "+this.pages.length)}> Tj ET`,
      ].join("\n");
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
