import { abilityIds, defaultAbilityScores, formatAbilityModifier } from "../../compendium/core";
import { getClassById } from "../../compendium/classes";
import { getSpellById } from "../../compendium/spells";
import { getGrantedSubclassSpellIds } from "../../compendium/classes";
import { resolveCharacterTransformation, transformationApplicationLabels, transformationGroupLabels } from "../../compendium/transformations/activeRecord";
import { calculateCharacterRules } from "../../rules";
import type { CharacterArchiveEntry } from "../archives/types";
import { makeGrimHollowPlayPdf } from "./grimHollowPlayPdf";
import { getCharacterInventory } from "../archives/utils/getCharacterInventory";
import { getCharacterVitals } from "../archives/utils/getCharacterVitals";
import { createCharacterRuleInput } from "../sheet/rules/createCharacterRuleInput";
import { getCharacterDerivedStats } from "../sheet/utils/getCharacterDerivedStats";
import { getEquippedWeaponAttacks } from "../sheet/utils/getWeaponAttack";

const PDF_W = 612;
const PDF_H = 792;
const TEMPLATE_PAGES = [1, 2, 3, 4].map((n) => `/grim-hollow-sheet-page${n}.jpg`);
const BLANK_TEMPLATE = "/grim-hollow-charakterbogen-de.pdf";
const encoder = new TextEncoder();

type PdfRect = [number, number, number, number];

type PageContext = {
  ctx: CanvasRenderingContext2D;
  sx: number;
  sy: number;
  overflow: Array<[string,string]>;
};

function safeName(name: string): string {
  return (name || "Charakter")
    .trim()
    .replace(/[^a-zA-Z0-9äöüÄÖÜß_-]+/g, "_")
    .replace(/^_+|_+$/g, "") || "Charakter";
}

function concat(parts: Uint8Array[]): Uint8Array {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function formatBonus(value: number | undefined): string {
  return typeof value === "number" ? formatAbilityModifier(value) : "";
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`PDF-Vorlage konnte nicht geladen werden: ${url}`));
    image.src = url;
  });
}

function drawTextInRect(
  page: PageContext,
  rect: PdfRect,
  value: unknown,
  options: { size?: number; align?: CanvasTextAlign; bold?: boolean; multiline?: boolean; valign?: "middle" | "top"; label?: string } = {},
): void {
  const text = String(value ?? "").trim();
  if (!text) return;

  const [x0, y0, x1, y1] = rect;
  const x = x0 * page.sx;
  const yTop = (PDF_H - y1) * page.sy;
  const width = (x1 - x0) * page.sx;
  const height = (y1 - y0) * page.sy;
  const align = options.align ?? "center";
  let fontSize = (options.size ?? 9) * page.sy;
  const family = '"Arial Narrow", Arial, sans-serif';

  page.ctx.save();
  page.ctx.fillStyle = "#111";
  page.ctx.textAlign = align;
  page.ctx.textBaseline = "middle";

  const setFont = () => {
    page.ctx.font = `${options.bold === false ? "400" : "600"} ${fontSize}px ${family}`;
  };
  setFont();

  const targetWidth = Math.max(8, width - 6 * page.sx);
  if (!options.multiline) {
    // Never pass maxWidth to fillText here: Canvas horizontally scales glyphs
    // when maxWidth is smaller than the natural text width. That made short
    // values such as +1 / -2 and ability scores visibly stretched or squashed.
    // Instead, reduce the font size until the text naturally fits.
    while (fontSize > 6.2 * page.sy && page.ctx.measureText(text).width > targetWidth) {
      fontSize -= 0.25 * page.sy;
      setFont();
    }
    const tx = align === "left" ? x + 3 * page.sx : align === "right" ? x + width - 3 * page.sx : x + width / 2;
    const shortened=fitCanvasText(page.ctx,text,targetWidth);
    if(shortened!==text)page.overflow.push([options.label??"Langer Feldeintrag",text]);
    page.ctx.fillText(shortened, tx, yTop + height / 2);
  } else {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (page.ctx.measureText(candidate).width <= targetWidth || !current) current = candidate;
      else { lines.push(current); current = word; }
    }
    if (current) lines.push(current);
    const lineHeight = fontSize * 1.15;
    const maxLines = Math.max(1, Math.floor(height / lineHeight));
    const visible = lines.slice(0, maxLines);
    if(lines.length>maxLines || lines.some(line=>page.ctx.measureText(line).width>targetWidth))page.overflow.push([options.label??"Langer Feldeintrag",text]);
    const startY = options.valign === "top"
      ? yTop + lineHeight * 0.75
      : yTop + Math.max(lineHeight / 2, (height - visible.length * lineHeight) / 2 + lineHeight / 2);
    visible.forEach((line, index) => {
      const tx = align === "left" ? x + 3 * page.sx : x + width / 2;
      page.ctx.fillText(fitCanvasText(page.ctx,line,targetWidth), tx, startY + index * lineHeight);
    });
  }
  page.ctx.restore();
}

function fitCanvasText(ctx:CanvasRenderingContext2D,text:string,width:number) {
  if(ctx.measureText(text).width<=width)return text;
  let shortened=text;
  while(shortened.length && ctx.measureText(shortened+"…").width>width)shortened=shortened.slice(0,-1);
  return shortened.trimEnd()+"…";
}

function drawListTopRect(
  page: PageContext,
  rect: PdfRect,
  lines: string[],
  options: { size?: number; bold?: boolean } = {},
): void {
  const visibleLines = lines.map((line) => line.trim()).filter(Boolean);
  if (visibleLines.length === 0) return;

  const [x0, y0, x1, y1] = rect;
  const x = x0 * page.sx;
  const y = y0 * page.sy;
  const width = (x1 - x0) * page.sx;
  const height = (y1 - y0) * page.sy;
  const baseSize = (options.size ?? 5) * page.sy;
  const lineHeight = baseSize * 1.35;
  const maxLines = Math.max(1, Math.floor(height / lineHeight));
  const family = '"Arial Narrow", Arial, sans-serif';

  page.ctx.save();
  page.ctx.fillStyle = "#111";
  page.ctx.textAlign = "left";
  page.ctx.textBaseline = "middle";

  const shown=visibleLines.length>maxLines?maxLines-1:maxLines;
  if(visibleLines.length>shown)page.overflow.push(["Weitere Ausrüstung",visibleLines.slice(shown).join("\n")]);
  const display=visibleLines.length>shown?[...visibleLines.slice(0,shown),"... siehe Anhang"]:visibleLines;
  display.forEach((line, index) => {
    let fontSize = baseSize;
    const setFont = () => {
      page.ctx.font = `${options.bold ? "600" : "400"} ${fontSize}px ${family}`;
    };
    setFont();
    const targetWidth = Math.max(8, width - 4 * page.sx);
    while (fontSize > 6.2 * page.sy && page.ctx.measureText(line).width > targetWidth) {
      fontSize -= 0.25 * page.sy;
      setFont();
    }
    const fitted=fitCanvasText(page.ctx,line,targetWidth);
    if(fitted!==line)page.overflow.push(["Ausrüstung",line]);
    page.ctx.fillText(fitted, x + 2 * page.sx, y + lineHeight * (index + 0.78));
  });

  page.ctx.restore();
}


function drawFeatureListTopRect(
  page: PageContext,
  rect: PdfRect,
  features: Array<{ name: string; description: string; resourceText?: string }>,
): void {
  if (features.length === 0) return;

  const [x0, y0, x1, y1] = rect;
  const x = x0 * page.sx;
  const y = y0 * page.sy;
  const width = (x1 - x0) * page.sx;
  const height = (y1 - y0) * page.sy;
  const left = x + 3 * page.sx;
  const targetWidth = Math.max(12, width - 6 * page.sx);
  const bottom = y + height - 2 * page.sy;
  let cursorY = y + 2 * page.sy;

  page.ctx.save();
  page.ctx.fillStyle = "#111";
  page.ctx.textAlign = "left";
  page.ctx.textBaseline = "top";

  const size=8 * page.sy, step=size*1.38;
  page.ctx.font = `600 ${size}px Arial, sans-serif`;
  for (const feature of features) {
    const heading=feature.name+(feature.resourceText?" · "+feature.resourceText:"");
    const shown=fitCanvasText(page.ctx,heading,targetWidth);
    if(cursorY+step<=bottom){page.ctx.fillText(shown,left,cursorY);cursorY+=step;}
    page.overflow.push([heading,feature.description]);
  }
  if(cursorY+step<=bottom)page.ctx.fillText("Details im Anhang",left,cursorY);
  page.ctx.restore();
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const pdfRechargeLabels = {
  turn: "pro Zug",
  "short-rest": "kurze Rast",
  "long-rest": "lange Rast",
} as const;

function markCircle(page: PageContext, x: number, yFromTop: number, active: boolean): void {
  if (!active) return;
  page.ctx.save();
  page.ctx.fillStyle = "#111";
  page.ctx.beginPath();
  page.ctx.arc(x * page.sx, yFromTop * page.sy, 1.05 * page.sx, 0, Math.PI * 2);
  page.ctx.fill();
  page.ctx.restore();
}

function drawTextTopRect(
  page: PageContext,
  rect: PdfRect,
  value: unknown,
  options: { size?: number; align?: CanvasTextAlign; bold?: boolean; multiline?: boolean; valign?: "middle" | "top"; label?: string } = {},
): void {
  const [x0, y0, x1, y1] = rect;
  // Template maps are measured directly from the approved 612 x 792 page render.
  // Convert top-origin coordinates into drawTextInRect's PDF bottom-origin coordinates.
  drawTextInRect(page, [x0, PDF_H - y1, x1, PDF_H - y0], value, options);
}

function drawValueTopRect(
  page: PageContext,
  rect: PdfRect,
  value: unknown,
  options: { size?: number; bold?: boolean } = {},
): void {
  const text = String(value ?? "").trim();
  if (!text) return;

  const [x0, y0, x1, y1] = rect;
  const x = x0 * page.sx;
  const y = y0 * page.sy;
  const width = (x1 - x0) * page.sx;
  const height = (y1 - y0) * page.sy;
  let fontSize = (options.size ?? 6) * page.sy;
  const family = '"Arial Narrow", Arial, sans-serif';

  page.ctx.save();
  page.ctx.fillStyle = "#111";
  page.ctx.textAlign = "center";
  page.ctx.textBaseline = "alphabetic";

  const setFont = () => {
    page.ctx.font = `${options.bold === false ? "400" : "600"} ${fontSize}px ${family}`;
  };
  setFont();

  const targetWidth = Math.max(6, width - 2 * page.sx);
  while (fontSize > 6.2 * page.sy && page.ctx.measureText(text).width > targetWidth) {
    fontSize -= 0.2 * page.sy;
    setFont();
  }

  const metrics = page.ctx.measureText(text);
  const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.72;
  const descent = metrics.actualBoundingBoxDescent || fontSize * 0.18;

  // Center the visible glyph bounds, not the font em-box. This prevents
  // numbers and +/- modifiers from looking vertically shifted inside circles/boxes.
  const visualHeight = ascent + descent;
  const baselineY = y + (height - visualHeight) / 2 + ascent;
  const fitted=fitCanvasText(page.ctx,text,targetWidth);
  if(fitted!==text)page.overflow.push(["Langer Zahlenwert",text]);
  page.ctx.fillText(fitted, x + width / 2, baselineY);
  page.ctx.restore();
}


function cleanExportText(value: unknown): string {
  const text = String(value ?? "").trim();
  if (!text) return "";
  const placeholders = new Set([
    "Noch keine Beschreibung vorhanden.",
    "Keine Beschreibung vorhanden.",
  ]);
  return placeholders.has(text) ? "" : text;
}

function drawRowListTop(
  page: PageContext,
  rows: Array<{ y: number; text: string; prepared?: boolean }>,
  xText: number,
  xRight: number,
  options: { size?: number; circleX?: number } = {},
): void {
  rows.forEach(({ y, text, prepared }) => {
    if (!text) return;
    drawTextTopRect(page, [xText, y - 11, xRight, y - 1.5], text, {
      size: options.size ?? 5.4,
      align: "left",
      bold: false,
    });
    if (options.circleX && prepared) markCircle(page, options.circleX, y - 4.1, true);
  });
}

function drawValueAboveLine(
  page: PageContext,
  x0: number,
  x1: number,
  lineY: number,
  value: unknown,
  size: number,
  bold = false,
): void {
  drawValueTopRect(page, [x0, lineY - 10.5, x1, lineY - 1.0], value, { size, bold });
}

function populatePage1(page: PageContext, character: CharacterArchiveEntry): void {
  const inventory = getCharacterInventory(character);
  const vitals = getCharacterVitals(character);
  const derived = getCharacterDerivedStats(character, inventory);
  const rules = calculateCharacterRules(createCharacterRuleInput(character));
  const scores = { ...defaultAbilityScores, ...character.abilityScores };
  const classDefinition = character.classId ? getClassById(character.classId) : undefined;

  // Header - measured from the approved German template, not estimated from form coordinates.
  drawTextTopRect(page, [201, 38, 399, 66], character.name, { size: 13, label: "Charaktername" });
  drawTextTopRect(page, [49, 44, 174, 63], `${character.className || ""} ${character.level}`.trim(), { size: 9, label: "Klasse und Stufe" });
  drawTextTopRect(page, [431, 44, 541, 63], character.ancestry, { size: 9, label: "Abstammung" });
  drawTextTopRect(page, [49, 84, 174, 103], character.backgroundName, { size: 9, label: "Hintergrund" });
  drawTextTopRect(page, [325, 87, 409, 107], character.alignment, { size: 9, label: "Gesinnung" });

  // Core combat fields: place glyphs on the clear interior of the original artwork.
  drawValueTopRect(page, [390, 147, 435, 161], vitals.currentHitPoints, { size: 11 });
  drawValueTopRect(page, [468, 146, 514, 162], vitals.temporaryHitPoints, { size: 10 });
  if(character.inspiration)drawValueTopRect(page,[340,181,367,201],"Ja",{size:9});
  drawValueTopRect(page,[294,474,318,492],character.level,{size:9});
  drawValueTopRect(page, [415, 127, 438, 135], vitals.maximumHitPoints, { size: 7.0 });
  drawValueTopRect(page, [292, 242, 320, 255], formatBonus(rules.initiativeModifier), { size: 8.0 });
  drawValueTopRect(page, [286, 314, 325, 339], derived.armorClass, { size: 8.4 });
  drawValueTopRect(page, [291, 384, 321, 407], `${rules.speed} m`, { size: 6.4 });
  drawValueTopRect(page, [291, 442, 322, 469], classDefinition ? `W${classDefinition.hitDie}` : "", { size: 7.4 });
  drawValueTopRect(page, [36, 582, 60, 602], rules.passivePerception, { size: 6.6 });
  // Proficiency is a fixed character value; inspiration/current resources stay handwritten.
  drawValueTopRect(page, [234, 181, 273, 201], formatBonus(derived.proficiencyBonus), { size: 6.0 });

  // Ability blocks on the official sheet use the large rectangle for the RAW
  // ability score and the overlapping circle for the MODIFIER. Earlier export
  // versions had those two values reversed. The rows are also spaced by 50 pt
  // on the approved 612x792 template; using 48 pt made every following ability
  // drift upward and pushed Charisma outside its intended field.
  const abilityRows = [230,280,330,380,430,480];
  abilityIds.forEach((id,index) => {
    const score = scores[id];
    drawValueTopRect(page, [35,abilityRows[index]+2,60,abilityRows[index]+16], score, { size: 10 });
    drawValueTopRect(page, [40,abilityRows[index]+20,55,abilityRows[index]+32], formatAbilityModifier(Math.floor((score - 10) / 2)), { size: 7.8 });
  });

  // Saving throws: bonuses sit on the short lines; proficiency is marked in the circle.
  const saveRows: Record<string, { value: PdfRect; circle: [number, number] }> = {
    strength:{value:[63,128.8,77,138.8],circle:[54,136.5]}, dexterity:{value:[63,145.8,77,155.8],circle:[54,153.5]}, constitution:{value:[63,162.8,77,172.8],circle:[54,170.5]},
    intelligence:{value:[149,128.8,163,138.8],circle:[139,136.5]}, wisdom:{value:[149,145.8,163,155.8],circle:[139,153.5]}, charisma:{value:[149,162.8,163,172.8],circle:[139,170.5]},
  };
  const proficientSaves = new Set(classDefinition?.savingThrows ?? []);
  abilityIds.forEach((id) => {
    drawValueAboveLine(page, saveRows[id].value[0], saveRows[id].value[2], saveRows[id].circle[1], formatBonus(rules.savingThrows[id]), 7.0, false);
    markCircle(page, saveRows[id].circle[0], saveRows[id].circle[1], proficientSaves.has(id));
  });

  // Skills: exact rows from the template. Value goes on the line; proficiency fills the adjacent circle.
  const skillRows: Record<string, { value: PdfRect; circle: [number, number] }> = {
    acrobatics:{value:[357.5,226.7,369.5,236.7],circle:[356,233]}, medicine:{value:[456.5,226.7,468.5,236.7],circle:[455,233]},
    "animal-handling":{value:[357.5,243.7,369.5,253.7],circle:[356,250]}, nature:{value:[456.5,243.7,468.5,253.7],circle:[455,250]},
    arcana:{value:[357.5,260.7,369.5,270.7],circle:[356,267]}, perception:{value:[456.5,260.7,468.5,270.7],circle:[455,267]},
    athletics:{value:[357.5,277.7,369.5,287.7],circle:[356,284]}, performance:{value:[456.5,277.7,468.5,287.7],circle:[455,284]},
    deception:{value:[357.5,294.7,369.5,304.7],circle:[356,301]}, persuasion:{value:[456.5,294.7,468.5,304.7],circle:[455,301]},
    history:{value:[357.5,311.7,369.5,321.7],circle:[356,318]}, religion:{value:[456.5,311.7,468.5,321.7],circle:[455,318]},
    insight:{value:[357.5,328.7,369.5,338.7],circle:[356,335]}, "sleight-of-hand":{value:[456.5,328.7,468.5,338.7],circle:[455,335]},
    intimidation:{value:[357.5,345.7,369.5,355.7],circle:[356,352]}, stealth:{value:[456.5,345.7,468.5,355.7],circle:[455,352]},
    investigation:{value:[357.5,362.7,369.5,372.7],circle:[356,369]}, survival:{value:[456.5,362.7,468.5,372.7],circle:[455,369]},
  };  rules.skillBonuses.forEach((skill) => {
    const row = skillRows[skill.id];
    if (!row) return;
    drawValueAboveLine(page, row.value[0] - 1, row.value[2] + 1, row.circle[1] + 3, formatBonus(skill.bonus), 6.8, true);
    markCircle(page, row.circle[0], row.circle[1], skill.proficient);
  });


  // Class and subclass features belong in the large "Merkmale & Eigenschaften" panel.
  // Use the same resolved rules as the live sheet so base features, subclass features,
  // path choices and current resource counts cannot drift apart from the character record.
  const printableClassFeatures = rules.classFeatures.map((feature) => {
    const resource = feature.resourceId
      ? rules.classResources.find((entry) => entry.id === feature.resourceId)
      : undefined;
    return {
      name: feature.name,
      description: feature.description,
      resourceText: resource
        ? `${resource.remaining}/${resource.maximum} · ${pdfRechargeLabels[resource.recharge]}`
        : undefined,
    };
  });
  drawFeatureListTopRect(page, [92, 396, 260, 521], printableClassFeatures);

  // Journal areas at the bottom.
  // Ideale / Bindungen / Makel bleiben im Export bewusst frei: die dekorative Fläche ist für Handschrift gedacht.

  const toolsAndLanguages = [
    ...(character.toolProficiencies ?? []),
    character.languageChoices ? `${character.languageChoices} zusätzliche Sprache${character.languageChoices === 1 ? "" : "n"}` : "",
  ].filter(Boolean).join(" · ");
  drawTextTopRect(page, [352, 396, 540, 446], toolsAndLanguages, { size: 5.2, align: "left", multiline: true, bold: false, valign: "top" });

  const journal = character.journal;
  drawTextTopRect(page, [92, 675, 250, 705], cleanExportText(journal?.personality), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });
  drawTextTopRect(page, [326, 684, 537, 705], cleanExportText(journal?.ideals), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });
  drawTextTopRect(page, [92, 724, 272, 746], cleanExportText(journal?.bonds), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });
  drawTextTopRect(page, [331, 724, 537, 748], cleanExportText(journal?.flaws), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });

  // Equipment & currency. The inventory panel on the official sheet is intentionally
  // free-form, so we render a compact one-line list rather than forcing table columns.
  // Equipped items are prefixed with a bullet; quantities greater than one are shown as "Nx".
  const inventoryItems = inventory.items
    .filter((item) => item.quantity > 0)
    .map((item) => `${item.equipped ? "• " : ""}${item.quantity > 1 ? `${item.quantity}x ` : ""}${item.name}`);
  const currencyLine = [
    inventory.currency.gold > 0 ? `${inventory.currency.gold} GM` : "",
    inventory.currency.silver > 0 ? `${inventory.currency.silver} SM` : "",
    inventory.currency.copper > 0 ? `${inventory.currency.copper} KM` : "",
  ].filter(Boolean).join(" · ");
  const equipmentLines = [currencyLine, ...inventoryItems].filter(Boolean);
  // The decorative sword occupies the left half of this panel; keep text in the free right column.
  drawListTopRect(page, [124, 222, 218, 369], equipmentLines, { size: 8, bold: false });

  // Attacks & spellcasting table: export up to three equipped weapon attacks using the
  // same calculation engine as the live character sheet.
  const allAttacks = getEquippedWeaponAttacks(character, inventory);
  const attacks=allAttacks.slice(0,3);
  if(allAttacks.length>3) page.overflow.push(["Weitere Angriffe",allAttacks.slice(3).map(a=>[a.name,a.attackBonusLabel,a.damage,a.damageType,a.details].filter(Boolean).join(" · ")).join("\n")]);
  const attackRows = [
    { name:[350, 478, 398, 488] as PdfRect, bonus:[402, 478, 469, 488] as PdfRect, damage:[473, 478, 538, 488] as PdfRect },
    { name:[350, 491, 398, 500] as PdfRect, bonus:[402, 491, 469, 500] as PdfRect, damage:[473, 491, 538, 500] as PdfRect },
    { name:[350, 503, 398, 512] as PdfRect, bonus:[402, 503, 469, 512] as PdfRect, damage:[473, 503, 538, 512] as PdfRect },
  ];
  attacks.forEach((attack, index) => {
    const row = attackRows[index];
    drawTextTopRect(page, row.name, attack.name, { size: 8.5, align: "left", bold: false, label: "Vollständiger Angriffsname" });
    drawValueTopRect(page, row.bonus, attack.attackBonusLabel, { size: 8.5, bold: true });
    drawTextTopRect(page, row.damage, `${attack.damage} ${attack.damageType}`, { size: 8.5, bold: false });
  });

}

function populatePage2(page: PageContext, character: CharacterArchiveEntry): void {
  const record=resolveCharacterTransformation(character);
  drawTextTopRect(page, [202, 50, 410, 77], character.name, { size: 10 });
  drawTextTopRect(page, [42, 94, 159, 113], `${character.className || ""} ${character.level}`.trim(), { size: 7.2 });
  drawTextTopRect(page, [45, 204, 207, 465], cleanExportText(character.journal?.background || character.summary), { size: 8.2, align: "left", multiline: true, bold: false, valign: "top", label: "Charaktergeschichte" });

  const faction = character.journal?.factions?.[0];
  if (faction) {
    drawTextTopRect(page, [276, 389, 336, 478], `${faction.name}\n${faction.rank}`, { size: 5.5, multiline: true, bold: false });
  }

  if (!record.name) return;
  drawTextTopRect(page,[93,507,342,522], record.name,{size:8,align:"left",bold:true});
  drawValueTopRect(page,[379,507,432,522],record.stage||"",{size:8});
  if(record.warning)page.overflow.push(["Wandlung",record.warning]);
  const boons=record.features.filter(f=>f.group==="boon");
  const flaws=record.features.filter(f=>f.group==="flaw");
  for(const f of record.features)page.overflow.push([transformationGroupLabels[f.group]+" · "+f.name,transformationApplicationLabels[f.application]+": "+f.description]);
  const boonRows = [[1,555],[1,574],[2,594],[3,614],[4,632]];
  const shownBoons = new Set<number>();
  for(const [level,y] of boonRows){
    const i=boons.findIndex((b,index)=>b.stage===level && !shownBoons.has(index));
    if(i>=0){shownBoons.add(i);drawTextTopRect(page,[121,y-4,291,y+7],boons[i].name,{size:8,align:"left",bold:false});}
  }
  for(const [index,y] of [555,575,595,615].entries()){
    const rows=flaws.filter(f=>f.stage===index+1);
    if(rows[0])drawTextTopRect(page,[354,y-4,548,y+7],rows[0].name,{size:8,align:"left",bold:false});
  }

}

function populatePage3(page: PageContext, character: CharacterArchiveEntry): void {
  const inventory = getCharacterInventory(character);
  const derived = getCharacterDerivedStats(character, inventory);
  if (!derived.spellcasting.enabled) return;
  const abilityLabels: Record<string, string> = { strength:"STÄ", dexterity:"GES", constitution:"KON", intelligence:"INT", wisdom:"WEI", charisma:"CHA" };

  // The official page has the class in the large scroll, then ability / save DC / attack in
  // the rectangle and the two circles. Previous maps had all four shifted one field right.
  drawTextTopRect(page, [76, 63, 230, 93], character.className, { size: 7.5 });
  drawValueTopRect(page, [269, 59, 327, 82], derived.spellcasting.abilityId ? abilityLabels[derived.spellcasting.abilityId] : "", { size: 8.5 });
  drawValueTopRect(page, [392, 54, 430, 89], derived.spellcasting.spellSaveDifficultyClass, { size: 9.5 });
  drawValueTopRect(page, [487, 54, 525, 89], formatBonus(derived.spellcasting.spellAttackBonus), { size: 9.0 });

  const grantedSpellIds = getGrantedSubclassSpellIds({
    classId: character.classId ?? "",
    subclassId: character.subclassId,
    level: character.level,
    pathChoices: character.pathChoices,
  });
  const effectiveSelections = [
    ...(character.spellcasting?.spellIds ?? []),
    ...grantedSpellIds
      .filter((spellId) => !(character.spellcasting?.spellIds ?? []).some((entry) => entry.spellId === spellId))
      .map((spellId) => ({ spellId, prepared: true })),
  ];
  const selected = effectiveSelections
    .map((entry) => ({ entry, spell: getSpellById(entry.spellId) }))
    .filter((item): item is { entry: typeof item.entry; spell: NonNullable<typeof item.spell> } => Boolean(item.spell));

  // One spell per printed line. Never join spell names into a paragraph: that caused long
  // strings to cross several lines and circles on the original sheet.
  const spellRows = [{ys:Array.from({length:8},(_,i)=>190+i*13.85),xText:43,xRight:207,circleX:undefined},
    {ys:Array.from({length:13},(_,i)=>358.4+i*13.85),xText:52,xRight:207,circleX:45},
    {ys:Array.from({length:13},(_,i)=>581.8+i*13.85),xText:52,xRight:207,circleX:45},
    {ys:Array.from({length:13},(_,i)=>191+i*13.85),xText:237,xRight:394,circleX:229},
    {ys:Array.from({length:13},(_,i)=>413.5+i*13.85),xText:237,xRight:394,circleX:229},
    {ys:Array.from({length:9},(_,i)=>637+i*13.85),xText:237,xRight:394,circleX:229},
    {ys:Array.from({length:9},(_,i)=>191+i*13.85),xText:416,xRight:574,circleX:408},
    {ys:Array.from({length:9},(_,i)=>358.4+i*13.85),xText:416,xRight:574,circleX:408},
    {ys:Array.from({length:7},(_,i)=>526+i*13.85),xText:416,xRight:574,circleX:408},
    {ys:Array.from({length:7},(_,i)=>664+i*13.85),xText:416,xRight:574,circleX:408}];

  for (let level = 0; level <= 9; level += 1) {
    const config = spellRows[level];
    const spells = selected.filter((item) => item.spell.level === level);
    for(const item of spells.slice(config.ys.length))page.overflow.push([level===0?"Weitere Zaubertricks":"Weitere Zauber · Grad "+level,item.spell.name+(item.entry.prepared?" · vorbereitet":"")]);
    drawRowListTop(page, spells.slice(0, config.ys.length).map((item, i) => ({
      y: config.ys[i],
      text: item.spell.name,
      prepared: level > 0 ? item.entry.prepared : false,
    })), config.xText, config.xRight, { size: 8.1, circleX: config.circleX });
  }

  // Slot totals and spent slots. The sheet prints total/used only in each level header.
  const spent = character.spellcasting?.slots.spentSlots ?? {};
  const slotHeader: Partial<Record<number, { total: PdfRect; spent: PdfRect }>> = {
    1:{total:[72,318,105,330], spent:[139,318,176,330]},
    2:{total:[72,543,105,555], spent:[139,543,176,555]},
    3:{total:[258,153,282,171], spent:[326,153,375,171]},
    4:{total:[267,373,300,385], spent:[332,373,372,385]},
    5:{total:[267,580,300,592], spent:[332,580,372,592]},
    6:{total:[438,153,460,171], spent:[509,153,554,171]},
    7:{total:[450,317,483,329], spent:[514,317,554,329]},
    8:{total:[450,478,483,490], spent:[514,478,554,490]},
    9:{total:[450,616,483,628], spent:[514,616,554,628]},
  };
  const pact = derived.spellcasting.pactSlots;
  const totals = { ...derived.spellcasting.spellSlots };
  const used = { ...spent };
  if (pact) {
    const grade = pact.slotLevel as keyof typeof totals;
    totals[grade] = (totals[grade] ?? 0) + pact.slots;
    used[grade] = (used[grade] ?? 0) + (character.spellcasting?.slots.spentPactSlots ?? 0);
  }
  Object.entries(totals).forEach(([levelKey, total]) => {
    const level = Number(levelKey) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    const rects = slotHeader[level];
    if (!rects || !total) return;
    drawValueTopRect(page, rects.total, total, { size: 8, bold: true });
    drawValueTopRect(page, rects.spent, used[level] ?? 0, { size: 8, bold: true });
  });
}

async function renderPage(url: string, overflow:PageContext["overflow"] = [], populate?: (page: PageContext) => void): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const image = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas konnte nicht initialisiert werden.");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  populate?.({ ctx, sx: canvas.width / PDF_W, sy: canvas.height / PDF_H, overflow });
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("PDF-Seite konnte nicht erzeugt werden.")), "image/jpeg", 0.96));
  return { bytes: new Uint8Array(await blob.arrayBuffer()), width: canvas.width, height: canvas.height };
}

async function renderAppendix(name:string,entries:PageContext["overflow"]) {
  const result: Array<{bytes:Uint8Array;width:number;height:number}>=[];
  let canvas:HTMLCanvasElement|undefined;
  let ctx:CanvasRenderingContext2D;
  let y=0;
  async function save() {
    if(!canvas)return;
    const current=canvas;
    const blob=await new Promise<Blob>((ok,fail)=>current.toBlob(b=>b?ok(b):fail(new Error("PDF-Anhang fehlgeschlagen")),"image/jpeg",0.96));
    result.push({bytes:new Uint8Array(await blob.arrayBuffer()),width:current.width,height:current.height});
  }
  async function next() {
    await save();
    canvas=document.createElement("canvas");canvas.width=1836;canvas.height=2376;
    const context=canvas.getContext("2d");
    if(!context)throw new Error("PDF-Anhang konnte nicht erzeugt werden.");
    ctx=context;
    ctx.scale(3,3);ctx.fillStyle="white";ctx.fillRect(0,0,612,792);
    ctx.strokeStyle="#bbb";ctx.strokeRect(32,33,548,722);
    ctx.fillStyle="#111";ctx.font="bold 17px Georgia";ctx.fillText("Grim Hollow · Anhang",46,62);
    ctx.font="10px Arial";ctx.fillText(fitCanvasText(ctx,name,455),46,82);ctx.fillText(String(result.length+5),548,739);
    y=111;
  }
  for(const [label,body] of entries){
    if(!canvas || y+38>719)await next();
    ctx!.font="bold 11px Arial";
    for(const line of wrapCanvasText(ctx!,label,510)){
      if(y+15>720){await next();ctx!.font="bold 11px Arial";}
      ctx!.fillText(fitCanvasText(ctx!,line,510),46,y);y+=15;
    }
    ctx!.font="10px Arial";
    for(const line of body.split(/\r?\n/).flatMap(p=>wrapCanvasText(ctx!,p,510))){
      if(y+14>720){await next();ctx!.font="10px Arial";}
      ctx!.fillText(fitCanvasText(ctx!,line,510),46,y);y+=14;
    }
    y+=9;
  }
  await save();
  return result;
}

function imagePagesPdf(images: Array<{ bytes: Uint8Array; width: number; height: number }>): Uint8Array {
  const objects: Uint8Array[] = [];
  const pageIds: number[] = [];
  const imageIds: number[] = [];
  const contentIds: number[] = [];
  let nextId = 3;
  for (let i = 0; i < images.length; i += 1) { pageIds.push(nextId++); imageIds.push(nextId++); contentIds.push(nextId++); }
  objects[0] = encoder.encode("<< /Type /Catalog /Pages 2 0 R >>");
  objects[1] = encoder.encode(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${images.length} >>`);
  images.forEach((image, index) => {
    const pageId = pageIds[index];
    const imageId = imageIds[index];
    const contentId = contentIds[index];
    objects[pageId - 1] = encoder.encode(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PDF_W} ${PDF_H}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    objects[imageId - 1] = concat([encoder.encode(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`), image.bytes, encoder.encode("\nendstream")]);
    const stream = encoder.encode(`q ${PDF_W} 0 0 ${PDF_H} 0 0 cm /Im0 Do Q\n`);
    objects[contentId - 1] = concat([encoder.encode(`<< /Length ${stream.length} >>\nstream\n`), stream, encoder.encode("endstream")]);
  });
  const header = encoder.encode("%PDF-1.4\n%âãÏÓ\n");
  const chunks: Uint8Array[] = [header];
  const offsets: number[] = [0];
  let offset = header.length;
  objects.forEach((object, index) => {
    offsets[index + 1] = offset;
    const wrapped = concat([encoder.encode(`${index + 1} 0 obj\n`), object, encoder.encode("\nendobj\n")]);
    chunks.push(wrapped);
    offset += wrapped.length;
  });
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i += 1) xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF`;
  chunks.push(encoder.encode(xref));
  return concat(chunks);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadBlankGrimHollowSheet(): void {
  const anchor = document.createElement("a");
  anchor.href = BLANK_TEMPLATE;
  anchor.download = "Grim_Hollow_Charakterbogen_DE.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export async function buildGrimHollowSheetPdf(character: CharacterArchiveEntry): Promise<Blob> {
  const overflow: PageContext["overflow"][] = [[],[],[]];
  const pages = await Promise.all([
    renderPage(TEMPLATE_PAGES[0], overflow[0], (page) => populatePage1(page, character)),
    renderPage(TEMPLATE_PAGES[1], overflow[1], (page) => populatePage2(page, character)),
    renderPage(TEMPLATE_PAGES[2], overflow[2], (page) => populatePage3(page, character)),
    renderPage(TEMPLATE_PAGES[3]),
  ]);
  pages.push(...await renderAppendix(character.name,overflow.flat()));
  const pdf = imagePagesPdf(pages);
  return new Blob([pdf.buffer as ArrayBuffer], { type: "application/pdf" });
}

export async function exportGrimHollowSheet(character: CharacterArchiveEntry): Promise<void> {
  const blob = await buildGrimHollowSheetPdf(character);
  downloadBlob(blob, `${safeName(character.name)}_Grim_Hollow_Charakterbogen_DE.pdf`);
}

export function exportGrimforgePlayPdf(character: CharacterArchiveEntry): void {
  const pdf = makeGrimHollowPlayPdf(character);
  downloadBlob(new Blob([pdf.buffer as ArrayBuffer], { type: "application/pdf" }), `${safeName(character.name)}_GrimForge_Spielakte.pdf`);
}
