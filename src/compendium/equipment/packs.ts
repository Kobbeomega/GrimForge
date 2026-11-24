import type { EquipmentPack } from "./types";

function pack(id: string, name: string, entries: [string, number][]): EquipmentPack {
  return { id, name, description: "Startausrüstung (Regelstand 2014).", items: entries.map(([equipmentId, quantity]) => ({equipmentId, quantity})) };
}

export const equipmentPacks = [
  pack("explorers-pack","Entdeckerpaket",[["backpack",1],["bedroll",1],["mess-kit",1],["tinderbox",1],["torch",10],["ration",10],["waterskin",1],["rope",1]]),
  pack("dungeoneers-pack","Gewölbeforscherpaket",[["backpack",1],["crowbar",1],["hammer",1],["piton",10],["torch",10],["tinderbox",1],["ration",10],["waterskin",1],["rope",1]]),
  pack("priests-pack","Priesterpaket",[["backpack",1],["blanket",1],["candle",10],["tinderbox",1],["alms-box",1],["incense-stick",2],["censer",1],["vestments",1],["ration",2],["waterskin",1]]),
  pack("burglars-pack","Einbrecherpaket",[["backpack",1],["ball-bearings",1],["string-10ft",1],["bell",1],["candle",5],["crowbar",1],["hammer",1],["piton",10],["hooded-lantern",1],["oil",2],["ration",5],["tinderbox",1],["waterskin",1],["rope",1]]),
  pack("scholars-pack","Gelehrtenpaket",[["backpack",1],["lore-book",1],["ink",1],["ink-pen",1],["parchment",10],["sand-bag",1],["small-knife",1]]),
  pack("diplomats-pack","Diplomatenpaket",[["chest",1],["scroll-case",2],["fine-clothes",1],["ink",1],["ink-pen",1],["lamp",1],["oil",2],["paper",5],["perfume",1],["sealing-wax",1],["soap",1]]),
  pack("entertainers-pack","Unterhalterpaket",[["backpack",1],["bedroll",1],["costume",2],["candle",5],["ration",5],["waterskin",1],["disguise-kit",1]]),
];
