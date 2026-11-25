import { sourceWeapons2014 } from "../../content/phase1/weapons2014";
import { sourceArmor2014 } from "../../content/phase1/armor2014";

import type {
  ArmorItem,
  EquipmentDefinition,
  GearItem,
  WeaponItem,
} from "./types";

// Stable saved IDs; German source IDs also resolve when loading older inventory.
const ids: Record<string,string> = {
  keule:"club",dolch:"dagger",wurfpfeil:"dart",zweihandkeule:"greatclub",beil:"handaxe",wurfspeer:"javelin",
  streitkolben:"mace",kampfstab:"quarterstaff",speer:"spear","leichte-armbrust":"light-crossbow",kurzbogen:"shortbow",
  streitaxt:"battleaxe",zweihandaxt:"greataxe",zweihandschwert:"greatsword",langschwert:"longsword",
  krummsaebel:"scimitar",kurzschwert:"shortsword",kriegshammer:"warhammer",langbogen:"longbow",
  lederruestung:"leather",schuppenpanzer:"scale-mail",kettenruestung:"chain-mail",schild:"shield",
};
function parseDamage(value: string) {
  if (value === "-") return { dice: 0, die: 0, type: "bludgeoning" as const }; // No damage roll.
  const match = /^(\d+)(?:W(\d+))?\s+(Hieb|Stich|Wucht)$/.exec(value);
  if (!match) throw new Error("Unbekannte Schadensangabe: " + value);
  return { dice: Number(match[1]), die: Number(match[2] ?? 1), type: ({ Hieb: "slashing", Stich: "piercing", Wucht: "bludgeoning" } as const)[match[3] as "Hieb"|"Stich"|"Wucht"] };
}
function parseWeaponProperties(value: string): WeaponItem["properties"] {
  const map: Array<[RegExp, WeaponItem["properties"][number]]> = [[/Leicht/i,"light"],[/Schwer/i,"heavy"],[/Finesse/i,"finesse"],[/Zweihändig/i,"two-handed"],[/Vielseitig/i,"versatile"],[/Reichweite/i,"reach"],[/Wurf/i,"thrown"],[/Laden/i,"loading"],[/Munition/i,"ammunition"]];
  return map.filter(([pattern]) => pattern.test(value)).map(([, property]) => property);
}
function parseRange(value: string): WeaponItem["range"] | undefined {
  const match = value.match(/(?:Wurf|Munition)\s+(\d+)\/(\d+)/i);
  return match ? { normal: Number(match[1]), long: Number(match[2]) } : undefined;
}
export const weapons: WeaponItem[] = sourceWeapons2014.map((source): WeaponItem => ({
  id: ids[source.app_id] ?? source.app_id, name: source.name_de, category: "weapon", weaponCategory: source.category.startsWith("Kriegswaffe") ? "martial" : "simple",
  damage: parseDamage(source.damage), properties: parseWeaponProperties(source.properties), range: parseRange(source.properties), weight: source.weight_lb, price: source.cost_gp,
  versatile: source.properties.includes("Vielseitig") ? parseDamage(source.properties.match(/Vielseitig (\d+W\d+)/)![1] + " " + source.damage.split(" ").at(-1)) : undefined,
  description: `2014-Referenz: ${source.properties === "-" ? "keine besonderen Eigenschaften" : source.properties}.`,
})).sort((a,b)=>a.name.localeCompare(b.name,"de"));

function parseArmorClass(value: string) { const match=value.match(/\d+/); return Number(match?.[0] ?? 10); }
export const armor: ArmorItem[] = sourceArmor2014.map((source): ArmorItem => ({
  id: ids[source.app_id] ?? source.app_id, name: source.name_de, category: source.category === "Schild" ? "shield" : "armor", weight: source.weight_lb, price: source.cost_gp,
  armorClass: parseArmorClass(source.armor_class), dexterityModifier: source.armor_class.includes("GE"), maximumDexterityBonus: source.armor_class.includes("max. +2") ? 2 : undefined,
  strengthRequirement: source.strength === "-" ? undefined : Number(source.strength.match(/\d+/)?.[0]), stealthDisadvantage: source.stealth === "Nachteil",
  description: `Rüstungskategorie: ${source.category}.`,
})).sort((a,b)=>a.name.localeCompare(b.name,"de"));

export const gear: GearItem[] = [
  {"id":"healing-potion","name":"Heiltrank","weight":0.5,"price":50,"category":"consumable","description":"Stellt 2W4 + 2 Trefferpunkte wieder her. Heilung über die Trefferpunktleiste eintragen."},
  {"id":"antitoxin","name":"Gegengift (Phiole)","weight":0,"price":50,"category":"consumable","description":"Gewährt eine Stunde lang Vorteil auf Rettungswürfe gegen Gift; wirkt nicht bei Konstrukten oder Untoten."},
  {"id":"caltrops","name":"Krähenfüße (Beutel mit 20)","weight":2,"price":1,"category":"gear","description":"Beim Betreten der bestreuten Fläche: GE-Rettungswurf SG 15 oder Bewegung endet und das Ziel erleidet 1 Stichschaden. Bei halbem Tempo ist kein Wurf nötig."},
  {"id":"grappling-hook","name":"Enterhaken","weight":4,"price":2,"category":"gear"},
  {"id":"climbers-kit","name":"Kletterausrüstung","weight":12,"price":25,"category":"gear"},
  {"id":"chain","name":"Kette (10 Fuß)","weight":10,"price":5,"category":"gear"},
  {"id":"bullseye-lantern","name":"Richtlaterne","weight":2,"price":10,"category":"gear"},
  {"id":"chalk","name":"Kreide","weight":0,"price":0.01,"category":"gear"},
  {"id":"mirror","name":"Stahlspiegel","weight":0.5,"price":5,"category":"gear"},
  {"id":"travelers-clothes","name":"Reisekleidung","weight":4,"price":2,"category":"gear"},
  {"id":"common-clothes","name":"Gewöhnliche Kleidung","weight":3,"price":0.5,"category":"gear"},
  {"id":"pouch","name":"Gürteltasche","weight":1,"price":0.5,"category":"gear"},
  {"id":"tent","name":"Zweipersonenzelt","weight":20,"price":2,"category":"gear"},
  {"id":"quiver","name":"Köcher","weight":1,"price":1,"category":"gear"},
  {"id":"sling-bullets","name":"Schleuderkugeln","weight":0.075,"price":0.002,"category":"ammunition"},
  {"id":"blowgun-needles","name":"Blasrohrnadeln","weight":0.02,"price":0.05,"category":"ammunition"},
  {"id":"herbalism-kit","name":"Kräuterkundeausstattung","weight":3,"price":5,"category":"tool"},
  {"id":"bagpipes","name":"Dudelsack","category":"tool","weight":6,"price":30},
  {"id":"drum","name":"Trommel","category":"tool","weight":3,"price":6},
  {"id":"dulcimer","name":"Hackbrett","category":"tool","weight":10,"price":25},
  {"id":"flute","name":"Flöte","category":"tool","weight":1,"price":2},
  {"id":"lyre","name":"Leier","category":"tool","weight":2,"price":30},
  {"id":"horn","name":"Horn","category":"tool","weight":2,"price":3},
  {"id":"pan-flute","name":"Panflöte","category":"tool","weight":2,"price":12},
  {"id":"shawm","name":"Schalmei","category":"tool","weight":1,"price":2},
  {"id":"viol","name":"Viola","category":"tool","weight":1,"price":30},
  {"id":"candle","name":"Kerze","category":"gear","weight":0,"price":0.01},
  {"id":"ball-bearings","name":"Beutel mit 1.000 Metallkugeln","category":"gear","weight":2,"price":1},
  {"id":"bell","name":"Glocke","category":"gear","weight":0,"price":1},
  {"id":"hooded-lantern","name":"Blendlaterne","category":"gear","weight":2,"price":5},
  {"id":"oil","name":"Öl (Flasche)","category":"gear","weight":1,"price":0.1},
  {"id":"lore-book","name":"Sachbuch","category":"gear","weight":5,"price":25},
  {"id":"ink","name":"Tinte (Fläschchen)","category":"gear","weight":0,"price":10},
  {"id":"ink-pen","name":"Schreibfeder","category":"gear","weight":0,"price":0.02},
  {"id":"parchment","name":"Pergamentblatt","category":"gear","weight":0,"price":0.1},
  {"id":"chest","name":"Truhe","category":"gear","weight":25,"price":5},
  {"id":"scroll-case","name":"Schriftrollenbehälter","category":"gear","weight":1,"price":1},
  {"id":"fine-clothes","name":"Feine Kleidung","category":"gear","weight":6,"price":15},
  {"id":"lamp","name":"Lampe","category":"gear","weight":1,"price":0.5},
  {"id":"paper","name":"Papierbogen","category":"gear","weight":0,"price":0.2},
  {"id":"perfume","name":"Parfüm (Fläschchen)","category":"gear","weight":0,"price":5},
  {"id":"sealing-wax","name":"Siegelwachs","category":"gear","weight":0,"price":0.5},
  {"id":"soap","name":"Seife","category":"gear","weight":0,"price":0.02},
  {"id":"costume","name":"Kostüm","category":"gear","weight":4,"price":5},
  {"id":"disguise-kit","name":"Verkleidungsset","category":"tool","weight":3,"price":25},
  {"id":"string-10ft","name":"Schnur (10 Fuß)","category":"gear","weight":0,"price":0,"description":"Paketbestandteil ohne eigenen Tabellenwert; nicht separat in Preis und Gewicht berechnet."},
  {"id":"sand-bag","name":"Beutel mit Sand","category":"gear","weight":0,"price":0,"description":"Paketbestandteil ohne eigenen Tabellenwert; nicht separat in Preis und Gewicht berechnet."},
  {"id":"small-knife","name":"Kleines Messer","category":"gear","weight":0,"price":0,"description":"Paketbestandteil ohne eigenen Tabellenwert; nicht separat in Preis und Gewicht berechnet."},
  {"id":"alms-box","name":"Almosenkästchen","category":"gear","weight":0,"price":0,"description":"Paketbestandteil ohne eigenen Tabellenwert; nicht separat in Preis und Gewicht berechnet."},
  {"id":"incense-stick","name":"Räucherstäbchen","category":"gear","weight":0,"price":0,"description":"Paketbestandteil ohne eigenen Tabellenwert; nicht separat in Preis und Gewicht berechnet."},
  {"id":"censer","name":"Räuchergefäß","category":"gear","weight":0,"price":0,"description":"Paketbestandteil ohne eigenen Tabellenwert; nicht separat in Preis und Gewicht berechnet."},
  {"id":"vestments","name":"Messgewand","category":"gear","weight":0,"price":0,"description":"Paketbestandteil ohne eigenen Tabellenwert; nicht separat in Preis und Gewicht berechnet."},
  {
    id: "backpack",
    name: "Rucksack",
    category: "gear",
    weight: 5,
    price: 2,
  },
  {
    id: "bedroll",
    name: "Schlafsack",
    category: "gear",
    weight: 7,
    price: 1,
  },
  {
    id: "blanket",
    name: "Decke",
    category: "gear",
    weight: 3,
    price: 0.5,
  },
  {
    id: "crowbar",
    name: "Brecheisen",
    category: "gear",
    weight: 5,
    price: 2,
  },
  {
    id: "hammer",
    name: "Hammer",
    category: "gear",
    weight: 3,
    price: 1,
  },
  {
    id: "piton",
    name: "Kletterhaken",
    category: "gear",
    weight: 0.25,
    price: 0.05,
  },
  {
    id: "rope",
    name: "Hanfseil (50 ft)",
    category: "gear",
    weight: 10,
    price: 1,
  },
  {
    id: "torch",
    name: "Fackel",
    category: "consumable",
    weight: 1,
    price: 0.01,
  },
  {
    id: "ration",
    name: "Tagesration",
    category: "consumable",
    weight: 2,
    price: 0.5,
  },
  {
    id: "waterskin",
    name: "Wasserschlauch",
    category: "gear",
    weight: 5,
    price: 0.2,
  },
  {
    id: "tinderbox",
    name: "Zunderbüchse",
    category: "gear",
    weight: 1,
    price: 0.5,
  },
  {
    id: "mess-kit",
    name: "Essgeschirr",
    category: "gear",
    weight: 1,
    price: 0.2,
  },
  {
    id: "healers-kit",
    name: "Heilerausrüstung",
    category: "tool",
    weight: 3,
    price: 5,
  },
  {
    id: "thieves-tools",
    name: "Diebeswerkzeug",
    category: "tool",
    weight: 1,
    price: 25,
  },
  {
    id: "lute",
    name: "Laute",
    category: "tool",
    weight: 2,
    price: 35,
  },
  {
    id: "holy-symbol",
    name: "Heiliges Symbol",
    category: "focus",
    weight: 1,
    price: 5,
  },
  {
    id: "druidic-focus",
    name: "Druidischer Fokus",
    category: "focus",
    weight: 1,
    price: 1,
  },
  {
    id: "arcane-focus",
    name: "Arkaner Fokus",
    category: "focus",
    weight: 1,
    price: 10,
  },
  {
    id: "component-pouch",
    name: "Komponententasche",
    category: "focus",
    weight: 2,
    price: 25,
  },
  {
    id: "spellbook",
    name: "Zauberbuch",
    category: "gear",
    weight: 3,
    price: 50,
  },
  {
    id: "arrows",
    name: "Pfeile",
    category: "ammunition",
    weight: 0.05,
    price: 0.05,
  },
  {
    id: "crossbow-bolts",
    name: "Armbrustbolzen",
    category: "ammunition",
    weight: 0.075,
    price: 0.05,
  },
];

export const equipment: EquipmentDefinition[] = [
  ...weapons,
  ...armor,
  ...gear,
];

export const equipmentRegistry = new Map(equipment.map((entry) => [entry.id, entry]));

export function getEquipmentById(
  id: string,
): EquipmentDefinition | undefined {
  return equipmentRegistry.get(ids[id] ?? id);
}
