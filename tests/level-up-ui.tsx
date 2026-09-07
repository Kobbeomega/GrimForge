import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CharacterSheetPage } from "../src/pages/CharacterSheetPage";
import { migrateCharacterArchiveEntry } from "../src/migrations/characterSchema";
import type { CharacterArchiveEntry } from "../src/modules/archives/types";
import "../src/styles/base.css";
import { AppLayout } from "../src/components/layout/AppLayout";

const testKey = "grimforge.level-up-ui-test";
const fixture: CharacterArchiveEntry = {
  schemaVersion: 7, id: "level-up-ui", fileNumber: "Testakte", name: "Aldric – Level-up-Test",
  ancestry: "Mensch", classId: "fighter", className: "Kämpfer", level: 1,
  status: "active", summary: "Lokale Testakte", updatedAt: "2026-09-01T12:00:00.000Z",
  abilityScores: { strength: 15, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 10, charisma: 10 },
  baseAbilityScores: { strength: 15, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 10, charisma: 10 },
  pathChoices: { "fighter-fighting-style": "defense" },
  vitals: { maximumHitPoints: 12, currentHitPoints: 4, temporaryHitPoints: 3, armorClass: 16, initiativeModifier: 1, speed: 9 },
  inventory: { items: [], currency: { copper: 5, silver: 9, gold: 42 } },
  spentHitDice: 1, inspiration: true, spentClassResources: { "fighter-second-wind-uses": 1 },
};
function TestApp() {
  const [character, setCharacter] = useState<CharacterArchiveEntry>(() => JSON.parse(localStorage.getItem(testKey) ?? "null") ?? fixture);
  return <AppLayout activeSection="character" onNavigate={() => {}}><CharacterSheetPage character={character} onBack={() => {}} onUpdateCharacter={(next) => {
    const saved = migrateCharacterArchiveEntry(next).character;
    localStorage.setItem(testKey, JSON.stringify(saved)); setCharacter(saved);
  }} /></AppLayout>;
}
createRoot(document.getElementById("root")!).render(<React.StrictMode><TestApp /></React.StrictMode>);
