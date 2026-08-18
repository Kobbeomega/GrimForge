import type { CharacterArchiveEntry } from "../archives/types";
import { buildGrimHollowPage1Svg, GH_SHEET_HEIGHT, GH_SHEET_WIDTH } from "./grimHollowPage1Svg";

const PAGE_W = 841.89;
const PAGE_H = 595.28;
const enc = new TextEncoder();

function safeName(name: string): string { return (name || "Charakter").trim().replace(/[^a-zA-Z0-9äöüÄÖÜß_-]+/g,"_").replace(/^_+|_+$/g,"") || "Charakter"; }
function concat(parts: Uint8Array[]): Uint8Array { const n=parts.reduce((s,p)=>s+p.length,0); const out=new Uint8Array(n); let o=0; for(const p of parts){out.set(p,o);o+=p.length;} return out; }
function imagePdf(jpeg: Uint8Array,w:number,h:number): Uint8Array {
 const objs:Uint8Array[]=[]; const txt=(s:string)=>objs.push(enc.encode(s));
 txt("<< /Type /Catalog /Pages 2 0 R >>"); txt("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
 txt(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
 objs.push(concat([enc.encode(`<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`),jpeg,enc.encode("\nendstream")]));
 const stream=enc.encode(`q ${PAGE_W} 0 0 ${PAGE_H} 0 0 cm /Im0 Do Q\n`); objs.push(concat([enc.encode(`<< /Length ${stream.length} >>\nstream\n`),stream,enc.encode("endstream")]));
 const header=enc.encode("%PDF-1.4\n%âãÏÓ\n"); const chunks: Uint8Array[]=[header]; const offsets=[0]; let off=header.length;
 objs.forEach((obj,i)=>{offsets.push(off);const wrapped=concat([enc.encode(`${i+1} 0 obj\n`),obj,enc.encode("\nendobj\n")]);chunks.push(wrapped);off+=wrapped.length;});
 let x=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`; for(let i=1;i<=objs.length;i++)x+=`${String(offsets[i]).padStart(10,"0")} 00000 n \n`; x+=`trailer\n<< /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${off}\n%%EOF`; chunks.push(enc.encode(x)); return concat(chunks);
}
async function svgToJpeg(svg:string):Promise<{bytes:Uint8Array,w:number,h:number}>{
 const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"}); const url=URL.createObjectURL(blob);
 try { const image=await new Promise<HTMLImageElement>((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>rej(new Error("SVG konnte nicht gerendert werden."));im.src=url;});
  const scale=2; const canvas=document.createElement("canvas");canvas.width=GH_SHEET_WIDTH*scale;canvas.height=GH_SHEET_HEIGHT*scale;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("Canvas konnte nicht initialisiert werden.");ctx.drawImage(image,0,0,canvas.width,canvas.height);
  const jpeg=await new Promise<Blob>((res,rej)=>canvas.toBlob(b=>b?res(b):rej(new Error("PDF-Bild konnte nicht erzeugt werden.")),"image/jpeg",0.96)); return {bytes:new Uint8Array(await jpeg.arrayBuffer()),w:canvas.width,h:canvas.height};
 } finally {URL.revokeObjectURL(url);}
}
export function previewGrimHollowSheet(character: CharacterArchiveEntry): void { const svg=buildGrimHollowPage1Svg(character); const url=URL.createObjectURL(new Blob([svg],{type:"image/svg+xml;charset=utf-8"})); window.open(url,"_blank","noopener,noreferrer"); window.setTimeout(()=>URL.revokeObjectURL(url),60000); }
export async function exportGrimHollowSheet(character: CharacterArchiveEntry):Promise<void>{ const svg=buildGrimHollowPage1Svg(character); const img=await svgToJpeg(svg); const pdf=imagePdf(img.bytes,img.w,img.h); const url=URL.createObjectURL(new Blob([new Uint8Array(pdf).buffer],{type:"application/pdf"})); const a=document.createElement("a");a.href=url;a.download=`${safeName(character.name)}_Grim_Hollow_Charakterbogen.pdf`;document.body.appendChild(a);a.click();a.remove();window.setTimeout(()=>URL.revokeObjectURL(url),1000); }
