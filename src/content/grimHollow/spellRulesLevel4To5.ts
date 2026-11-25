// Kompakte Spielhilfen für Grim-Hollow-Zauber, die bis Charakterstufe 10
// relevant werden. Keine Buchtexte: Die Einträge fassen die Mechanik knapp
// zusammen und setzen für vollständige Sonderfälle den Besitz der Quelle voraus.

const labels: Record<string, string> = {
  bard: "Barde", cleric: "Kleriker", druid: "Druide", paladin: "Paladin",
  ranger: "Waldläufer", sorcerer: "Zauberer", warlock: "Hexenmeister", wizard: "Magier",
};

const schoolLabels: Record<string, string> = {
  abjuration: "Bannmagie", conjuration: "Beschwörung", enchantment: "Verzauberung",
  evocation: "Hervorrufung", necromancy: "Nekromantie", transmutation: "Verwandlung",
};

function spell(
  id: string,
  name: string,
  level: 0 | 4 | 5,
  school: "abjuration" | "conjuration" | "enchantment" | "evocation" | "necromancy" | "transmutation",
  castingTime: string,
  range: string,
  components: string,
  duration: string,
  concentration: boolean,
  classIds: string[],
  summary: string,
  options: {
    ritual?: boolean;
    saves?: string[];
    damage?: string[];
    conditions?: string[];
    tags?: string[];
    scaling?: string;
  } = {},
) {
  return {
    id,
    sourceId: id.replaceAll("-", "_"),
    name,
    level,
    school,
    schoolLabelGerman: schoolLabels[school],
    ritual: options.ritual ?? false,
    castingTime,
    range,
    components,
    duration,
    concentration,
    classIds,
    classLabelsGerman: classIds.map((classId) => labels[classId] ?? classId),
    mechanicsSummaryGerman: summary,
    rulesTextEnglish: summary,
    scalingTextEnglish: options.scaling ?? "",
    attackTypesGerman: [],
    savingThrowsGerman: options.saves ?? [],
    damageGerman: options.damage ?? [],
    healingGerman: [],
    conditionsGerman: options.conditions ?? [],
    effectTagsGerman: options.tags ?? [],
    source: "Grim Hollow Player's Guide (2025)",
  };
}

export const grimHollowSpellRulesLevel4To5 = [
  spell("toll-the-dead", "Toll the Dead", 0, "necromancy", "1 Aktion", "18 m", "V, S", "Sofort", false, ["cleric", "warlock", "wizard"],
    "Ein sichtbares Ziel legt einen WE-Rettungswurf ab. Bei Fehlschlag erleidet es 1W8 nekrotischen Schaden, oder 1W12, falls ihm bereits Trefferpunkte fehlen. Der Schaden steigt auf den Charakterstufen 5, 11 und 17 um je einen Würfel.",
    { saves: ["Weisheit"], damage: ["1W8 oder 1W12 nekrotisch"], tags: ["Zaubertrick", "Einzelziel"] }),

  spell("word-of-radiance", "Word of Radiance", 0, "evocation", "1 Aktion", "Selbst (1,5-m-Emanation)", "V, M (heiliges Symbol)", "Sofort", false, ["cleric"],
    "Jede von dir gewählte Kreatur in 1,5 m legt einen KO-Rettungswurf ab. Bei Fehlschlag erleidet sie 1W6 Strahlenschaden. Der Schaden steigt auf den Charakterstufen 5, 11 und 17 um je 1W6.",
    { saves: ["Konstitution"], damage: ["1W6 Strahlung"], tags: ["Zaubertrick", "Emanation"] }),

  spell("aura-of-purity", "Aura of Purity", 4, "abjuration", "1 Aktion", "Selbst (9-m-Aura)", "V", "Konzentration, bis 10 Minuten", true, ["cleric", "paladin"],
    "Nicht feindliche Kreaturen in 9 m können nicht erkranken, haben Resistenz gegen Giftschaden und Vorteil auf Rettungswürfe gegen Blind, Bezaubert, Taub, Verängstigt, Gelähmt, Vergiftet und Betäubt.",
    { tags: ["Aura", "Resistenz", "Zustandsschutz"] }),

  spell("circle-of-scarlet", "Circle of Scarlet", 4, "evocation", "1 Aktion", "36 m", "V, S, M (mit Humanoidenblut gezeichneter Kreis)", "Sofort", false, ["sorcerer", "warlock"],
    "Verbrauche 4 Trefferwürfel. In einem Zylinder (6 m Radius, 30 m Höhe) legt jede Kreatur einen KO-Rettungswurf ab. Bei Fehlschlag: nekrotischer Schaden in Höhe der verbrauchten Trefferwürfel + Zauberattribut; bei Erfolg halbiert. Für jeden Fehlschlag erhältst du 10 temporäre TP.",
    { saves: ["Konstitution"], damage: ["Trefferwürfel + Zauberattribut · nekrotisch"], tags: ["Sangromantie", "Fläche", "Temporäre Trefferpunkte"] }),

  spell("consume-mind", "Consume Mind", 4, "necromancy", "1 Aktion", "Selbst", "V, S, M (30 g frisches oder konserviertes Gehirn)", "1 Stunde", false, ["cleric", "warlock", "wizard"],
    "Verzehre einen Teil des Gehirns einer höchstens 3 Tage toten, nicht untoten Kreatur. Du kannst Erinnerungen abrufen: als Magieaktion Zauberattributsprobe gegen SG = Intelligenzwert der Leiche. Jede konkrete Information kann nur einmal versucht werden.",
    { tags: ["Erkundung", "Information"] }),

  spell("dark-sacrament", "Dark Sacrament", 4, "evocation", "1 Aktion", "Berührung", "V, S, M (juwelenbesetzter Dolch, mindestens 100 GM)", "Sofort; Segen 10 Minuten", false, ["warlock", "wizard"],
    "Verbrauche 4 Trefferwürfel und führe einen Nahkampf-Zauberangriff aus. Treffer: Schaden der Würfel + 4W8 nekrotisch. Stirbt das Ziel, wähle 10 Minuten lang einen Segen: Vorteil auf Rettungswürfe, körperliche Verstärkung oder +2 Übungsbonus; währenddessen erleidest du zusätzlich 1W4 Strahlenschaden, wenn du Strahlenschaden nimmst.",
    { damage: ["4W8 + Trefferwürfel · nekrotisch"], tags: ["Sangromantie", "Zauberangriff", "Segen"], scaling: "+1W8 nekrotischer Schaden je Zaubergrad über 4." }),

  spell("primordial-power", "Primordial Power", 4, "transmutation", "1 Aktion", "Berührung", "V, S, M (eine Handvoll Lehm)", "Konzentration, bis 1 Stunde", true, ["druid"],
    "Das Ziel spricht Primordial und wählt ein Element: Luft (Blitz/Donner-Resistenz, 9 m Flug), Kaltfeuer (Kälte-Resistenz und Heilung per Trefferwürfel), Erde (Vorteil gegen Schieben/Zu-Boden und 9 m Erschütterungssinn), Feuer (Feuer-Resistenz und Reaktions-Nahkampfangriff) oder Wasser (Säure-Resistenz, Wasseratmung, 18 m Schwimmen).",
    { tags: ["Buff", "Resistenz", "Bewegung"] }),

  spell("ride-the-lightning", "Ride the Lightning", 4, "conjuration", "1 Aktion", "Selbst (18-m-Linie)", "V, S, M (Kupferdraht)", "Sofort", false, ["druid", "sorcerer", "wizard"],
    "Verwandle dich in einen Blitz und erscheine in einem freien Feld bis 18 m entfernt. Jede Kreatur in der 1,5 m breiten Linie legt einen GE-Rettungswurf ab: 4W6 Blitzschaden, bei Erfolg halbiert.",
    { saves: ["Geschicklichkeit"], damage: ["4W6 Blitz"], tags: ["Teleportation", "Linie"], scaling: "+1W6 Schaden und +3 m Reichweite je Zaubergrad über 4." }),

  spell("shared-judgement", "Shared Judgement", 4, "evocation", "1 Bonusaktion", "Selbst", "V", "Konzentration, bis 1 Minute", true, ["cleric"],
    "Einmal in jedem deiner Züge, wenn du einen Untoten auf 0 TP bringst, darfst du einer sichtbaren Kreatur in 18 m ohne Aktion 5W6 Strahlenschaden zufügen.",
    { damage: ["5W6 Strahlung"], tags: ["Untote", "Zusatzschaden"], scaling: "+1W6 Schaden je Zaubergrad über 4." }),

  spell("supernal-smite", "Supernal Smite", 4, "evocation", "1 Bonusaktion", "Selbst", "V", "Konzentration, bis 1 Minute", true, ["paladin"],
    "Wirke den Zauber unmittelbar nach einem Nahkampftreffer. Der Treffer verursacht zusätzlich 4W6 Kraftschaden und bricht die Konzentration des Ziels. Laufende Zauber bis Grad 3 auf dem Ziel enden; ab Grad 4 ist je Zauber eine Zauberattributsprobe gegen SG 10 + Zaubergrad nötig.",
    { damage: ["4W6 Kraft"], tags: ["Smite", "Waffentreffer", "Konzentrationsbruch", "Magie bannen"] }),

  spell("viscous-sheath", "Viscous Sheath", 4, "necromancy", "1 Aktion", "Selbst", "V, S, M (blutiges Leichentuch)", "10 Minuten", false, ["sorcerer", "warlock", "wizard"],
    "Verbrauche 7 Trefferwürfel. Trifft dich eine Kreatur in 1,5 m im Nahkampf, erleidet sie nekrotischen Schaden in Höhe der Würfel + Zauberattribut. Bei einem Waffenangriff kannst du per Reaktion die Waffe festkleben; ein ST-Rettungswurf verhindert dies.",
    { saves: ["Stärke"], damage: ["Trefferwürfel + Zauberattribut · nekrotisch"], tags: ["Sangromantie", "Abwehr", "Reaktion"] }),

  spell("greater-animate-dead", "Greater Animate Dead", 5, "necromancy", "1 Stunde", "3 m", "V, S, M (Graberde, Brackwasser und schwarzer Onyx ab 500 GM)", "Sofort", false, ["cleric", "wizard"],
    "Belebe geeignete Leichen als bis zu fünf untote Kreaturen mit HG 2 oder niedriger. Befehle sie gemeinsam als Bonusaktion in 36 m. Die Kontrolle hält 24 Stunden; erneutes Wirken kontrolliert bis zu vier bestehende Untote weitere 24 Stunden ohne kostspielige Komponenten.",
    { tags: ["Untote", "Beschwörung", "Kontrolle"], scaling: "+1 untote Kreatur je Zaubergrad über 5." }),

  spell("incite-riot", "Incite Riot", 5, "enchantment", "1 Aktion", "9 m", "V, S, M (rotes Taschentuch)", "Konzentration, bis 1 Minute", true, ["bard", "sorcerer", "warlock", "wizard"],
    "Beliebig viele sichtbare Ziele in Reichweite legen einen WE-Rettungswurf ab (mit Vorteil, wenn ihr bereits kämpft). Bei Fehlschlag sind sie bezaubert und greifen die nächste andere Kreatur an oder bewegen sich auf sie zu. Rettungswurf am Ende jedes Zuges erneut.",
    { saves: ["Weisheit"], conditions: ["Bezaubert"], tags: ["Massenkontrolle"] }),

  spell("investiture-of-venom", "Investiture of Venom", 5, "transmutation", "1 Aktion", "Selbst", "V, S", "Konzentration, bis 10 Minuten", true, ["druid", "ranger"],
    "Du wirst immun gegen Giftschaden und den Zustand Vergiftet, erkennst Giftresistenzen in 9 m und kannst sie per Bonusaktion bis zum Ende deines nächsten Zuges ausschalten. Als Magieaktion erzeugst du eine 4,5-m-Linie: KO-Rettungswurf, 4W6 Giftschaden und Vergiftet bis Ende deines nächsten Zuges; bei Erfolg halber Schaden.",
    { saves: ["Konstitution"], damage: ["4W6 Gift"], conditions: ["Vergiftet"], tags: ["Immunität", "Linie"] }),

  spell("little-death", "Little Death", 5, "necromancy", "1 Aktion", "Selbst", "S, M (persönlicher Gegenstand ab 1 SM)", "Bis 8 Stunden", false, ["warlock"],
    "Du stirbst und wirst zu Beginn deines nächsten Zuges zum Geist. Nutze dessen Werte, behältst aber TP, Trefferwürfel, geistige Attribute und Sprachen; dein Übungsbonus gilt für Geistangriffe und -SG. Nach geheimen 1W8 Stunden oder freiwilligem Ende kehrst du bei intakter Komponente mit halben maximalen TP zurück.",
    { tags: ["Verwandlung", "Geist", "Tod"] }),

  spell("magic-mirror", "Magic Mirror", 5, "abjuration", "1 Reaktion (wenn du Ziel eines Zaubers wirst)", "Selbst", "V, S, M (polierte Silbermurmel)", "Sofort", false, ["sorcerer"],
    "Leite den auslösenden Zauber auf eine sichtbare Kreatur in 18 m um. Zauber bis Grad 5 werden automatisch umgeleitet; ab Grad 6 ist eine Zauberattributsprobe gegen SG 10 + Zaubergrad nötig.",
    { tags: ["Reaktion", "Zauberabwehr", "Umlenkung"] }),

  spell("mortality", "Mortality", 5, "transmutation", "1 Aktion", "36 m", "V, S, M (juwelenbesetzter Humanoidenschädel ab 200 GM)", "Konzentration, bis 1 Minute", true, ["sorcerer"],
    "Verbrauche und würfle 5 Trefferwürfel. Eine Aberration, ein Celestischer, Elementar, Feenwesen oder Unhold legt einen CH-Rettungswurf ab. Bei Fehlschlag sinken aktuelle und maximale TP um den Wurf; außerdem verliert es Resistenzen/Immunitäten, wird Humanoid und erleidet bei jedem Schaden +1W4 nekrotisch. Tod bei 0 TP macht die Änderung permanent.",
    { saves: ["Charisma"], damage: ["5 Trefferwürfel TP-Reduktion; +1W4 nekrotisch je Schaden"], tags: ["Sangromantie", "Debuff", "Typänderung"] }),

  spell("spirit-swarm", "Spirit Swarm", 5, "necromancy", "1 Aktion", "36 m", "V, S", "Konzentration, bis 1 Minute", true, ["cleric", "wizard"],
    "Ein sichtbares Ziel mit Charisma 3+ legt einen CH-Rettungswurf ab. Bei Fehlschlag: 8W8 psychischer Schaden und Verängstigt bis zum Zauberende; bei Erfolg halber Schaden ohne Zustand.",
    { saves: ["Charisma"], damage: ["8W8 psychisch"], conditions: ["Verängstigt"], tags: ["Einzelziel", "Kontrolle"] }),
];

export type GrimHollowSpellRuleLevel4To5 = (typeof grimHollowSpellRulesLevel4To5)[number];
