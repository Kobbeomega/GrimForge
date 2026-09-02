import { abilityIds, defaultAbilityScores, formatAbilityModifier } from "../../compendium/core";
import { getClassById } from "../../compendium/classes";
import { getSpellById } from "../../compendium/spells";
import { getGrantedSubclassSpellIds } from "../../compendium/classes";
import { getTransformationById } from "../../compendium/transformations";
import { getActiveTransformationStages, getTransformationStageBoons, getTransformationStageFlaws } from "../../compendium/transformations";
import { calculateCharacterRules } from "../../rules";
import type { CharacterArchiveEntry } from "../archives/types";
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
  options: { size?: number; align?: CanvasTextAlign; bold?: boolean; multiline?: boolean; valign?: "middle" | "top" } = {},
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
    while (fontSize > 3.2 * page.sy && page.ctx.measureText(text).width > targetWidth) {
      fontSize -= 0.25 * page.sy;
      setFont();
    }
    const tx = align === "left" ? x + 3 * page.sx : align === "right" ? x + width - 3 * page.sx : x + width / 2;
    page.ctx.fillText(text, tx, yTop + height / 2);
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
    const startY = options.valign === "top"
      ? yTop + lineHeight * 0.75
      : yTop + Math.max(lineHeight / 2, (height - visible.length * lineHeight) / 2 + lineHeight / 2);
    visible.forEach((line, index) => {
      const tx = align === "left" ? x + 3 * page.sx : x + width / 2;
      page.ctx.fillText(line, tx, startY + index * lineHeight);
    });
  }
  page.ctx.restore();
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

  visibleLines.slice(0, maxLines).forEach((line, index) => {
    let fontSize = baseSize;
    const setFont = () => {
      page.ctx.font = `${options.bold ? "600" : "400"} ${fontSize}px ${family}`;
    };
    setFont();
    const targetWidth = Math.max(8, width - 4 * page.sx);
    while (fontSize > 3.2 * page.sy && page.ctx.measureText(line).width > targetWidth) {
      fontSize -= 0.25 * page.sy;
      setFont();
    }
    page.ctx.fillText(line, x + 2 * page.sx, y + lineHeight * (index + 0.65));
  });

  page.ctx.restore();
}

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
  options: { size?: number; align?: CanvasTextAlign; bold?: boolean; multiline?: boolean; valign?: "middle" | "top" } = {},
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
  while (fontSize > 3.0 * page.sy && page.ctx.measureText(text).width > targetWidth) {
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
  page.ctx.fillText(text, x + width / 2, baselineY);
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
    if (options.circleX && prepared) markCircle(page, options.circleX, y - 5.0, true);
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
  drawTextTopRect(page, [188, 40, 398, 61], character.name, { size: 8.2 });
  drawTextTopRect(page, [39, 40, 169, 61], `${character.className || ""} ${character.level}`.trim(), { size: 6.4 });
  drawTextTopRect(page, [401, 40, 558, 61], character.ancestry, { size: 5.8 });
  drawTextTopRect(page, [39, 82, 169, 101], character.backgroundName, { size: 6.2 });
  drawTextTopRect(page, [285, 82, 373, 101], character.alignment, { size: 5.8 });

  // Core combat values.
  drawValueTopRect(page, [409, 125, 443, 140], vitals.maximumHitPoints, { size: 7.0 });
  drawValueTopRect(page, [286, 244, 327, 265], formatBonus(rules.initiativeModifier), { size: 8.0 });
  drawValueTopRect(page, [283, 301, 330, 320], derived.armorClass, { size: 8.4 });
  drawValueTopRect(page, [282, 388, 333, 408], `${rules.speed} m`, { size: 6.4 });
  drawValueTopRect(page, [281, 445, 335, 468], classDefinition ? `W${classDefinition.hitDie}` : "", { size: 7.4 });
  drawValueTopRect(page, [38, 577, 63, 601], rules.passivePerception, { size: 6.6 });
  // Proficiency is a fixed character value; inspiration/current resources stay handwritten.
  drawValueTopRect(page, [236, 165, 275, 185], formatBonus(derived.proficiencyBonus), { size: 6.0 });

  // Ability blocks on the official sheet use the large rectangle for the RAW
  // ability score and the overlapping circle for the MODIFIER. Earlier export
  // versions had those two values reversed. The rows are also spaced by 50 pt
  // on the approved 612x792 template; using 48 pt made every following ability
  // drift upward and pushed Charisma outside its intended field.
  const abilityRows: Record<string, { score: PdfRect; modifier: PdfRect }> = {
    strength:     { score:[34,230.5,62,252.5], modifier:[41,253,62,272] },
    dexterity:    { score:[34,280.5,62,302.5], modifier:[41,303,62,322] },
    constitution: { score:[34,330.5,62,352.5], modifier:[41,353,62,372] },
    intelligence: { score:[34,380.5,62,402.5], modifier:[41,403,62,422] },
    wisdom:       { score:[34,430.5,62,452.5], modifier:[41,453,62,472] },
    charisma:     { score:[34,480.5,62,502.5], modifier:[41,503,62,522] },
  };
  abilityIds.forEach((id) => {
    const score = scores[id];
    drawValueTopRect(page, abilityRows[id].score, score, { size: 7.0 });
    drawValueTopRect(page, abilityRows[id].modifier, formatAbilityModifier(Math.floor((score - 10) / 2)), { size: 5.0 });
  });

  // Saving throws: bonuses sit on the short lines; proficiency is marked in the circle.
  const saveRows: Record<string, { value: PdfRect; circle: [number, number] }> = {
    strength:{value:[63,128.8,77,138.8],circle:[54,136.5]}, dexterity:{value:[63,145.8,77,155.8],circle:[54,153.5]}, constitution:{value:[63,162.8,77,172.8],circle:[54,170.5]},
    intelligence:{value:[149,128.8,163,138.8],circle:[139,136.5]}, wisdom:{value:[149,145.8,163,155.8],circle:[139,153.5]}, charisma:{value:[149,162.8,163,172.8],circle:[139,170.5]},
  };
  const proficientSaves = new Set(classDefinition?.savingThrows ?? []);
  abilityIds.forEach((id) => {
    drawValueAboveLine(page, saveRows[id].value[0], saveRows[id].value[2], saveRows[id].circle[1], formatBonus(rules.savingThrows[id]), 4.15, false);
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
    drawValueAboveLine(page, row.value[0] - 1, row.value[2] + 1, row.circle[1], formatBonus(skill.bonus), 4.35, true);
    markCircle(page, row.circle[0], row.circle[1], skill.proficient);
  });

  // Journal areas at the bottom.
  // Ideale / Bindungen / Makel bleiben im Export bewusst frei: die dekorative Fläche ist für Handschrift gedacht.

  const toolsAndLanguages = [
    ...(character.toolProficiencies ?? []),
    character.languageChoices ? `${character.languageChoices} zusätzliche Sprache${character.languageChoices === 1 ? "" : "n"}` : "",
  ].filter(Boolean).join(" · ");
  drawTextTopRect(page, [350, 390, 548, 455], toolsAndLanguages, { size: 5.2, align: "left", multiline: true, bold: false, valign: "top" });

  const journal = character.journal;
  drawTextTopRect(page, [72, 672, 303, 702], cleanExportText(journal?.personality), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });
  drawTextTopRect(page, [309, 672, 548, 702], cleanExportText(journal?.ideals), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });
  drawTextTopRect(page, [72, 707, 303, 737], cleanExportText(journal?.bonds), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });
  drawTextTopRect(page, [309, 707, 548, 737], cleanExportText(journal?.flaws), { size: 5.0, align: "left", multiline: true, bold: false, valign: "top" });

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
  drawListTopRect(page, [140, 222, 260, 409], equipmentLines, { size: 5.9, bold: false });

  // Attacks & spellcasting table: export up to three equipped weapon attacks using the
  // same calculation engine as the live character sheet.
  const attacks = getEquippedWeaponAttacks(character, inventory).slice(0, 3);
  const attackRows = [
    { name:[348, 475, 393, 488] as PdfRect, bonus:[394, 475, 461, 488] as PdfRect, damage:[462, 475, 549, 488] as PdfRect },
    { name:[348, 491, 393, 504] as PdfRect, bonus:[394, 491, 461, 504] as PdfRect, damage:[462, 491, 549, 504] as PdfRect },
    { name:[348, 507, 393, 520] as PdfRect, bonus:[394, 507, 461, 520] as PdfRect, damage:[462, 507, 549, 520] as PdfRect },
  ];
  attacks.forEach((attack, index) => {
    const row = attackRows[index];
    drawTextTopRect(page, row.name, attack.name, { size: 5.35, align: "left", bold: false });
    drawValueTopRect(page, row.bonus, attack.attackBonusLabel, { size: 5.6, bold: true });
    drawTextTopRect(page, row.damage, `${attack.damage} ${attack.damageType}`, { size: 5.25, bold: false });
  });

}

function populatePage2(page: PageContext, character: CharacterArchiveEntry): void {
  const transformation = character.transformationId ? getTransformationById(character.transformationId) : undefined;
  drawTextTopRect(page, [202, 50, 410, 77], character.name, { size: 10 });
  drawTextTopRect(page, [42, 94, 159, 113], `${character.className || ""} ${character.level}`.trim(), { size: 7.2 });
  drawTextTopRect(page, [48, 205, 260, 472], cleanExportText(character.journal?.background || character.summary), { size: 5.7, align: "left", multiline: true, bold: false, valign: "top" });

  const faction = character.journal?.factions?.[0];
  if (faction) {
    drawTextTopRect(page, [276, 389, 336, 478], `${faction.name}\n${faction.rank}`, { size: 5.5, multiline: true, bold: false });
  }

  if (!transformation) return;
  const stage = Math.max(0, Math.min(4, character.transformationStage ?? 0));
  drawTextTopRect(page, [84, 502, 300, 519], transformation.name, { size: 5.4, align: "left", bold: true });
  drawValueTopRect(page, [365, 502, 420, 519], stage || "", { size: 5.6 });

  const selected = new Set(character.transformationFeatureIds ?? []);
  const activeStages = getActiveTransformationStages(transformation.id, stage);
  const boons = activeStages.flatMap((st) => getTransformationStageBoons(st)
    .filter((f) => selected.has(f.id)).map((f) => ({ stage: st.stage, name: f.name })));
  const flaws = activeStages.flatMap((st) => getTransformationStageFlaws(st)
    .filter((f) => selected.has(f.id)).map((f) => ({ stage: st.stage, name: f.name })));

  const rowY: Record<number, number> = { 1: 558, 2: 580, 3: 601, 4: 622 };
  boons.slice(0, 4).forEach((item) => {
    const y = rowY[item.stage];
    if (!y) return;
    drawTextTopRect(page, [96, y - 10, 296, y - 1], item.name, { size: 4.7, align: "left", bold: false });
  });
  flaws.slice(0, 4).forEach((item) => {
    const y = rowY[item.stage];
    if (!y) return;
    drawTextTopRect(page, [343, y - 10, 553, y - 1], item.name, { size: 4.7, align: "left", bold: false });
  });
}

function populatePage3(page: PageContext, character: CharacterArchiveEntry): void {
  const inventory = getCharacterInventory(character);
  const derived = getCharacterDerivedStats(character, inventory);
  if (!derived.spellcasting.enabled) return;
  const abilityLabels: Record<string, string> = { strength:"STÄ", dexterity:"GES", constitution:"KON", intelligence:"INT", wisdom:"WEI", charisma:"CHA" };

  // The official page has the class in the large scroll, then ability / save DC / attack in
  // the rectangle and the two circles. Previous maps had all four shifted one field right.
  drawTextTopRect(page, [45, 38, 242, 82], character.className, { size: 7.5 });
  drawValueTopRect(page, [264, 50, 330, 82], derived.spellcasting.abilityId ? abilityLabels[derived.spellcasting.abilityId] : "", { size: 8.5 });
  drawValueTopRect(page, [378, 47, 432, 83], derived.spellcasting.spellSaveDifficultyClass, { size: 9.5 });
  drawValueTopRect(page, [472, 47, 526, 83], formatBonus(derived.spellcasting.spellAttackBonus), { size: 9.0 });

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
  const spellRows: Record<number, { ys: number[]; xText: number; xRight: number; circleX?: number }> = {
    0:{ys:[175,190,203,217,231,245,259,273,286], xText:43, xRight:207},
    1:{ys:[358,372,386,399,413,427,441,455,469,483,497,510,524], xText:50, xRight:207, circleX:45},
    2:{ys:[582,595,609,623,637,651,664,678,692,706,720,733,747], xText:50, xRight:207, circleX:45},
    3:{ys:[191,205,218,232,246,260,273,287,301,315,329,342,356], xText:237, xRight:394, circleX:228},
    4:{ys:[413,427,441,455,469,482,496,510,523,537,551,565], xText:237, xRight:394, circleX:228},
    5:{ys:[637,650,664,678,692,705,719,733,747], xText:237, xRight:394, circleX:228},
    6:{ys:[191,205,218,232,246,260,273,288,301,315], xText:419, xRight:576, circleX:410},
    7:{ys:[358,372,386,400,414,428,441,455,469,481], xText:419, xRight:576, circleX:410},
    8:{ys:[526,540,554,567,581,595,608,621], xText:419, xRight:576, circleX:410},
    9:{ys:[664,678,692,705,719,733,747], xText:419, xRight:576, circleX:410},
  };

  for (let level = 0; level <= 9; level += 1) {
    const config = spellRows[level];
    const spells = selected.filter((item) => item.spell.level === level);
    drawRowListTop(page, spells.slice(0, config.ys.length).map((item, i) => ({
      y: config.ys[i],
      text: item.spell.name,
      prepared: level > 0 ? item.entry.prepared : false,
    })), config.xText, config.xRight, { size: 5.1, circleX: config.circleX });
  }

  // Slot totals and spent slots. The sheet prints total/used only in each level header.
  const spent = character.spellcasting?.slots.spentSlots ?? {};
  const slotHeader: Partial<Record<number, { total: PdfRect; spent: PdfRect }>> = {
    1:{total:[72,318,105,330], spent:[139,318,176,330]},
    2:{total:[72,543,105,555], spent:[139,543,176,555]},
    3:{total:[267,120,300,132], spent:[332,120,372,132]},
    4:{total:[267,373,300,385], spent:[332,373,372,385]},
    5:{total:[267,580,300,592], spent:[332,580,372,592]},
    6:{total:[450,120,483,132], spent:[514,120,554,132]},
    7:{total:[450,317,483,329], spent:[514,317,554,329]},
    8:{total:[450,478,483,490], spent:[514,478,554,490]},
    9:{total:[450,616,483,628], spent:[514,616,554,628]},
  };
  Object.entries(derived.spellcasting.spellSlots).forEach(([levelKey, total]) => {
    const level = Number(levelKey) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    const rects = slotHeader[level];
    if (!rects || !total) return;
    drawValueTopRect(page, rects.total, total, { size: 4.2, bold: false });
    drawValueTopRect(page, rects.spent, spent[level] ?? 0, { size: 4.2, bold: false });
  });
}

async function renderPage(url: string, populate?: (page: PageContext) => void): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const image = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas konnte nicht initialisiert werden.");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  populate?.({ ctx, sx: canvas.width / PDF_W, sy: canvas.height / PDF_H });
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("PDF-Seite konnte nicht erzeugt werden.")), "image/jpeg", 0.96));
  return { bytes: new Uint8Array(await blob.arrayBuffer()), width: canvas.width, height: canvas.height };
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
  const pages = await Promise.all([
    renderPage(TEMPLATE_PAGES[0], (page) => populatePage1(page, character)),
    renderPage(TEMPLATE_PAGES[1], (page) => populatePage2(page, character)),
    renderPage(TEMPLATE_PAGES[2], (page) => populatePage3(page, character)),
    renderPage(TEMPLATE_PAGES[3]),
  ]);
  const pdf = imagePagesPdf(pages);
  return new Blob([pdf.buffer as ArrayBuffer], { type: "application/pdf" });
}

export async function exportGrimHollowSheet(character: CharacterArchiveEntry): Promise<void> {
  const blob = await buildGrimHollowSheetPdf(character);
  downloadBlob(blob, `${safeName(character.name)}_Grim_Hollow_Charakterbogen_DE.pdf`);
}
