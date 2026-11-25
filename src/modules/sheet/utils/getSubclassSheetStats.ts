import { getAncestryById } from "../../../compendium/ancestries";
import { getSubclassUnlockLevel } from "../../../compendium/classes";
import { getAbilityModifier, getProficiencyBonus } from "../../../compendium/core";
import type { CharacterArchiveEntry } from "../../archives/types";

export interface SubclassSheetStat {
  label: string;
  value: string;
  condition?: string;
}

/** Situational values are printed with their trigger, never added to the base stats. */
export function getSubclassSheetStats(character: CharacterArchiveEntry): SubclassSheetStat[] {
  const { classId, subclassId, level } = character;
  if (!classId || !subclassId) return [];
  const unlock = getSubclassUnlockLevel(classId, subclassId);
  if (unlock === undefined || level < unlock) return [];

  const modifier = (id: "strength" | "dexterity" | "wisdom" | "intelligence" | "charisma") =>
    getAbilityModifier(character.abilityScores?.[id] ?? 10);
  const proficiency = getProficiencyBonus(level);
  const save = (id: Parameters<typeof modifier>[0]) => 8 + modifier(id) + proficiency;
  const stat = (label: string, value: number | string, condition?: string) => ({ label, value: String(value), condition });
  const darkvision = getAncestryById(character.ancestryId ?? "")?.darkvision ?? 0;
  const meters = (value: number) => `${value.toLocaleString("de-DE")} m`;
  const selection = (id: string) => {
    const value = character.pathChoices?.[id];
    return Array.isArray(value) ? value[0] : value;
  };

  switch (subclassId) {
    case "champion": return [stat("Kritischer Treffer", level >= 15 ? "18–20" : "19–20", "Nur bei Waffenangriffen.")];
    case "battle-master": return [stat("Manöver-SG", `ST ${save("strength")} / GE ${save("dexterity")}`, "Du wählst Stärke oder Geschicklichkeit."), stat("Überlegenheitswürfel", `4 × ${level >= 10 ? "W10" : "W8"}`, "Erholen sich nach kurzer oder langer Rast.")];
    case "samurai": return [stat("Kampfgeist", `${level >= 10 ? 10 : 5} temporäre TP`, "Bei Aktivierung; Vorteil auf Waffenangriffe bis zum Ende des Zuges.")];
    case "college-of-whispers": return [stat("Psychische Klingen", level >= 10 ? "5W6 psychisch" : level >= 5 ? "3W6 psychisch" : "2W6 psychisch", "Bei einem Waffentreffer; kostet eine Bardische Inspiration, einmal pro Runde.")];
    case "life-domain": return [stat("Jünger des Lebens", "2 + Zaubergrad zusätzlich", "Wenn ein Zauber ab Grad 1 Trefferpunkte wiederherstellt."), ...(level >= 2 ? [stat("Leben bewahren", `${5 * level} TP zum Verteilen`, "Göttliche Macht; kein Ziel über die Hälfte seiner maximalen TP heilen.")] : [])];
    case "light-domain": return level >= 2 ? [stat("Glanz der Morgenröte", `2W10 + ${level} strahlend · KO-SG ${save("wisdom")}`, "Göttliche Macht; halber Schaden bei Erfolg.")] : [];
    case "war-domain": return level >= 2 ? [stat("Geführter Schlag", "+10 auf einen Angriffswurf", "Nur bei Einsatz von Göttlicher Macht.")] : [];
    case "grave-domain": return [stat("Kreis der Sterblichkeit", "Maximale Heilwürfel", "Nur wenn ein Heilzauber ein Ziel mit 0 TP heilt.")];
    case "circle-of-the-land": return [stat("Natürliche Erholung", `${Math.ceil(level / 2)} Zaubergrade`, "Einmal pro langer Rast während einer kurzen Rast; kein Platz ab Grad 6.")];
    case "circle-of-the-moon": return [stat("Kampf-Tiergestalt", `HG ${Math.max(1, Math.floor(level / 3))}`, level < 4 ? "Als Bonusaktion; keine Schwimm- oder Flugbewegungsrate." : level < 8 ? "Als Bonusaktion; Schwimmen erlaubt, Fliegen noch nicht." : "Als Bonusaktion."), stat("Heilung in Tiergestalt", "1W8 pro Zaubergrad", "Bonusaktion, kostet einen Zauberplatz.")];
    case "circle-of-spores": return [stat("Sporenhalo", `1W${level >= 14 ? 10 : level >= 10 ? 8 : level >= 6 ? 6 : 4} nekrotisch · KO-SG ${save("wisdom")}`, "Reaktion, kein Schaden bei erfolgreichem Rettungswurf."), stat("Symbiotische Entität", `${4 * level} temporäre TP`, "Kostet eine Tiergestalt-Anwendung; verdoppelt die Würfel des Sporenhalos und gibt 1W6 nekrotischen Schaden bei Nahkampfwaffentreffern.")];
    case "way-of-the-open-hand": return [stat("Technik der offenen Hand", `WE-basierter Ki-SG ${save("wisdom")}`, "Auf einen Treffer mit Schlaghagel; Rettungswurf je nach gewähltem Effekt.")];
    case "way-of-shadow": return [stat("Schattenkünste", "2 Ki pro Zauber", "Dunkelheit, Dunkelsicht, Spurloses Gehen oder Stille; keine Materialkomponenten.")];
    case "way-of-the-long-death": return [stat("Berührung des Todes", `${Math.max(1, level + modifier("wisdom"))} temporäre TP`, "Wenn du eine Kreatur innerhalb von 1,5 m auf 0 TP bringst.")];
    case "oath-of-devotion": return [stat("Heilige Waffe", `+${Math.max(1, modifier("charisma"))} auf Angriffe`, "Nur mit der geweihten Waffe und solange Göttliche Macht dafür aktiv ist.")];
    case "gloom-stalker": return [stat("Umbralsicht", meters(darkvision ? darkvision + 9 : 18)), stat("Schreckensangreifer", "+3 m und 1 Zusatzangriff", "Nur im ersten Zug des Kampfes; Zusatzangriff bei der Angriffsaktion, +1W8 Schaden bei Treffer.")];
    case "hunter": return selection("hunter-prey") === "colossus-slayer" ? [stat("Koloss-Schlächter", "+1W8 Schaden", "Einmal pro Zug bei Waffentreffer gegen ein bereits verwundetes Ziel.")] : [];
    case "thief": return [stat("Fassadenkletterer", "Klettern ohne Mehrkosten", `Anlauf-Weitsprung: zusätzlicher GE-Modifikator in Fuß (${modifier("dexterity")}).`)];
    case "draconic-bloodline": return [stat("Drakonische Widerstandskraft", `+${level} maximale TP · RK-Basis 13 + GE`, "TP-Bonus ist bereits eingerechnet; RK-Formel ohne getragene Rüstung."), stat("Drachenahne", "Drakonisch", "Doppelter Übungsbonus bei passenden CH-Proben im Umgang mit Drachen, sofern du dafür geübt bist.")];
    case "shadow-magic": return [stat("Augen der Dunkelheit", meters(Math.max(darkvision, 36))), ...(level >= 3 ? [stat("Dunkelheit", "2 Zaubereipunkte oder Zauberplatz", "Bei Einsatz der Zaubereipunkte siehst du durch deine eigene Dunkelheit.")] : [])];
    case "the-fiend": return [stat("Segen des Dunklen Meisters", `${Math.max(1, level + modifier("charisma"))} temporäre TP`, "Wenn du eine feindliche Kreatur auf 0 TP bringst.")];
    case "the-great-old-one": return [stat("Erwachter Geist", "9 m Telepathie", "Sichtbares Ziel, das mindestens eine Sprache versteht.")];
    case "the-undead": return [stat("Gestalt des Schreckens", `1W10 + ${level} temporäre TP · WE-SG ${save("charisma")}`, "Bei Aktivierung; während der Gestalt kann einmal pro Zug ein Treffer Furcht auslösen.")];
    case "monster-hunter-carver-guild": return [stat("Nahkampfdruck", "+1W6 Zusatzschaden", "Reaktion nach einem Nahkampfwaffentreffer; der nächste Angriff des Ziels hat bis zum Beginn deines Zugs Nachteil.")];
    case "monster-hunter-trapper-guild": return [stat("Fallengeräte", `Geräte-SG ${save("intelligence")}`), stat("Elementarmunition", "+2W6 Elementarschaden", "Zusatzschaden bei einem Treffer mit der Spezialmunition."), stat("Werfalle", "3W10 Wucht", "GE-Rettungswurf: halber Schaden bei Erfolg; bei Misserfolg auch liegend.")];
    case "school-of-abjuration": return [stat("Arkaner Schutz", `${Math.max(0, 2 * level + modifier("intelligence"))} Schutz-TP`, "Eigener Schutzpool, keine Charakter-TP. Bannzauber ab Grad 1 stellen das Doppelte ihres Grades wieder her.")];
    default: return [];
  }
}
