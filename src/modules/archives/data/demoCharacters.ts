import type { CharacterArchiveEntry } from "../types";

export const demoCharacters: CharacterArchiveEntry[] = [
  {
    id: "aldric-von-dornheim",
    fileNumber: "Akte 001",
    name: "Aldric von Dornheim",
    ancestry: "Mensch",
    className: "Paladin",
    subclass: "Eid der Vergeltung",
    level: 4,
    summary:
      "Ein gefallener Ritter, der zwischen Rache, Pflicht und Erlösung wandelt.",
    status: "active",
    updatedAt: "2026-07-14T06:30:00.000Z",
    sealId: "paladin",
  },
  {
    id: "mirella-voss",
    fileNumber: "Akte 002",
    name: "Mirella Voss",
    ancestry: "Tiefling",
    className: "Hexenmeister",
    subclass: "Der Große Alte",
    level: 3,
    summary:
      "Eine Okkultistin, deren Träume von Stimmen aus einer fremden Tiefe erfüllt sind.",
    status: "draft",
    updatedAt: "2026-07-13T20:15:00.000Z",
    sealId: "warlock",
    transformation: "Vampir",
  },
];