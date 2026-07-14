import type {
  EquipmentPack,
} from "./types";

export const equipmentPacks: EquipmentPack[] = [
  {
    id: "explorers-pack",
    name: "Entdeckerpaket",
    description:
      "Grundausrüstung für lange Reisen und Unternehmungen in der Wildnis.",
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
        equipmentId: "mess-kit",
        quantity: 1,
      },
      {
        equipmentId: "tinderbox",
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
      {
        equipmentId: "rope",
        quantity: 1,
      },
    ],
  },
  {
    id: "dungeoneers-pack",
    name: "Gewölbeforscherpaket",
    description:
      "Ausrüstung zum Erkunden dunkler Ruinen, Keller und Gewölbe.",
    items: [
      {
        equipmentId: "backpack",
        quantity: 1,
      },
      {
        equipmentId: "crowbar",
        quantity: 1,
      },
      {
        equipmentId: "hammer",
        quantity: 1,
      },
      {
        equipmentId: "piton",
        quantity: 10,
      },
      {
        equipmentId: "torch",
        quantity: 10,
      },
      {
        equipmentId: "tinderbox",
        quantity: 1,
      },
      {
        equipmentId: "ration",
        quantity: 10,
      },
      {
        equipmentId: "waterskin",
        quantity: 1,
      },
      {
        equipmentId: "rope",
        quantity: 1,
      },
    ],
  },
  {
    id: "priests-pack",
    name: "Priesterpaket",
    description:
      "Reise- und Ritualausrüstung für Geistliche und geweihte Diener.",
    items: [
      {
        equipmentId: "backpack",
        quantity: 1,
      },
      {
        equipmentId: "blanket",
        quantity: 1,
      },
      {
        equipmentId: "tinderbox",
        quantity: 1,
      },
      {
        equipmentId: "ration",
        quantity: 2,
      },
      {
        equipmentId: "waterskin",
        quantity: 1,
      },
    ],
  },
  {
    id: "burglars-pack",
    name: "Einbrecherpaket",
    description:
      "Kompakte Ausrüstung für diskrete Zugänge und heimliche Unternehmungen.",
    items: [
      {
        equipmentId: "backpack",
        quantity: 1,
      },
      {
        equipmentId: "crowbar",
        quantity: 1,
      },
      {
        equipmentId: "hammer",
        quantity: 1,
      },
      {
        equipmentId: "piton",
        quantity: 10,
      },
      {
        equipmentId: "torch",
        quantity: 5,
      },
      {
        equipmentId: "tinderbox",
        quantity: 1,
      },
      {
        equipmentId: "waterskin",
        quantity: 1,
      },
    ],
  },
  {
    id: "scholars-pack",
    name: "Gelehrtenpaket",
    description:
      "Grundausrüstung für Studium, Notizen und die Suche nach Wissen.",
    items: [
      {
        equipmentId: "backpack",
        quantity: 1,
      },
      {
        equipmentId: "spellbook",
        quantity: 1,
      },
    ],
  },
  {
    id: "diplomats-pack",
    name: "Diplomatenpaket",
    description:
      "Reiseutensilien für gesellschaftliche Auftritte und Verhandlungen.",
    items: [
      {
        equipmentId: "backpack",
        quantity: 1,
      },
      {
        equipmentId: "blanket",
        quantity: 1,
      },
      {
        equipmentId: "waterskin",
        quantity: 1,
      },
    ],
  },
  {
    id: "entertainers-pack",
    name: "Unterhalterpaket",
    description:
      "Ausrüstung für reisende Künstler und Schausteller.",
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
        equipmentId: "ration",
        quantity: 5,
      },
      {
        equipmentId: "waterskin",
        quantity: 1,
      },
    ],
  },
];