import type { EquipmentPack } from "./types";

export const equipmentPacks: EquipmentPack[] = [
  {
    id: "explorers-pack",

    name: "Entdeckerpaket",

    items: [
      {
        equipmentId: "backpack",
        quantity: 1,
      },
      {
        equipmentId: "bedroll",
        quantity: 1,
      },
      {
        equipmentId: "rope",
        quantity: 1,
      },
      {
        equipmentId: "torch",
        quantity: 10,
      },
      {
        equipmentId: "ration",
        quantity: 10,
      },
      {
        equipmentId: "waterskin",
        quantity: 1,
      },
    ],
  },
];