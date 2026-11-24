import { getEquipmentById, type EquipmentDefinition, type WeaponItem } from "../../../compendium/equipment";
import type { CharacterInventoryItem } from "../types";

const integer = (n: unknown, min: number, max: number): n is number => typeof n === "number" && Number.isInteger(n) && n >= min && n <= max;

export function resolveInventoryItem(item: CharacterInventoryItem): EquipmentDefinition | undefined {
  const custom = item.homebrew;
  if (!custom) return getEquipmentById(item.catalogId ?? item.id);
  const base = {id:item.id,name:item.name,weight:item.weight/0.45359237,price:Number.isFinite(custom.price) && custom.price>=0 ? custom.price : 0,description:item.notes};
  if (custom.kind === "weapon" && item.category === "weapon" && integer(custom.dice,1,20) && integer(custom.die,1,100) && ["slashing","piercing","bludgeoning"].includes(custom.damageType)) {
    const properties: WeaponItem["properties"] = [];
    if(custom.finesse) properties.push("finesse");
    if(custom.ranged) properties.push("ammunition");
    if(custom.thrown && !custom.ranged) properties.push("thrown");
    const range = (custom.ranged || custom.thrown) && integer(custom.rangeNormal,1,1000) ? {normal:custom.rangeNormal,long:integer(custom.rangeLong,custom.rangeNormal,1000)?custom.rangeLong:undefined} : undefined;
    if(custom.twoHanded) properties.push("two-handed");
    return {...base,category:"weapon",weaponCategory:custom.martial?"martial":"simple",properties,range,damage:{dice:custom.dice,die:custom.die,type:custom.damageType}};
  }
  if ((custom.kind === "armor" || custom.kind === "shield") && item.category === "armor" && integer(custom.armorClass,1,custom.kind==="shield"?10:30)) {
    return {...base,category:custom.kind,armorClass:custom.armorClass,dexterityModifier:custom.kind==="armor" && ["full","limited"].includes(custom.dexterity),maximumDexterityBonus:custom.kind==="armor" && custom.dexterity==="limited"?2:undefined};
  }
  if(custom.kind === "gear") return {...base,category:item.category==="tool" || item.category==="consumable"?item.category:"gear"};
  return undefined;
}

export function homebrewWeaponBonus(item: CharacterInventoryItem, key: "attackBonus" | "damageBonus"): number {
  const h=item.homebrew;
  return h?.kind==="weapon" && integer(h[key],-20,20) ? h[key] : 0;
}
