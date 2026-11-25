import type { CharacterSubclass, ClassFeature, ClassFeatureKind } from "./classes";

const f = (
  id: string,
  name: string,
  description: string,
  level: number,
  kind: ClassFeatureKind = "passive",
): ClassFeature => ({ id, name, description, level, kind });

const gh = (
  id: string,
  name: string,
  description: string,
  features: ClassFeature[],
): CharacterSubclass => ({
  id,
  name,
  description,
  source: "grim-hollow-2025",
  unlockLevel: 3,
  features,
});

/**
 * Grim-Hollow-Unterklassen aus dem Player's Guide (2024/2025-Fassung).
 * Enthalten sind alle Merkmale, die bis einschließlich Klassenstufe 10
 * tatsächlich erreichbar sind. Die Texte sind kompakte deutsche Spielhilfen.
 */
export const grimHollowSubclassesByClassId: Record<string, CharacterSubclass[]> = {
  barbarian: [
    gh("path-of-the-fractured", "Pfad des Gespaltenen", "Trennt zivilisierte Kontrolle und körperlich gewordenen Zorn.", [
      f("fractured-face-of-rage", "Antlitz des Zorns", "Im Kampfrausch werden deine waffenlosen Schläge zu W8-Kraftschaden; du kannst 3 m schieben oder bei misslungenem KO-Rettungswurf zu Boden werfen und zählst für Ringkampf eine Größenkategorie größer.", 3),
      f("fractured-mask-of-civility", "Maske der Zivilität", "Wähle eine Wissens- oder Gesellschaftsfertigkeit sowie eine Handwerkszeug-Übung oder Sprache.", 3),
      f("fractured-brains-brawn", "Verstand und Muskelkraft", "Ohne Kampfrausch: Resistenz gegen psychischen Schaden. Im Kampfrausch: Resistenz gegen alle Schadensarten außer Kraft und psychisch.", 6),
      f("fractured-cunning-brutal", "Listig und brutal", "Ohne Kampfrausch kannst du Lösen oder Helfen als Bonusaktion; im Kampfrausch erzielen waffenlose Angriffe bei 19–20 einen kritischen Treffer.", 10),
    ]),
    gh("path-of-the-primal-spirit", "Pfad des Urgeists", "Kämpft gemeinsam mit einem beschworenen bestialischen Geist.", [
      f("primal-spirit-companion", "Urgeistgefährte", "Beschwöre Wächter oder Angreifer in Land-, See- oder Himmelsgestalt. Er handelt in deinem Zug und greift auf Bonusaktionsbefehl oder statt eines deiner Angriffe an.", 3, "bonus-action"),
      f("primal-spirit-shared-rage", "Geteilter Zorn", "Während deines Kampfrauschs hat der Urgeist Resistenz gegen Hieb-, Stich- und Wuchtschaden.", 3),
      f("primal-spirit-kin-to-beasts", "Verwandt mit Tieren", "Tierfreundschaft und Mit Tieren sprechen sind immer vorbereitet und je einmal pro kurzer oder langer Rast ohne Zauberplatz wirkbar; KO ist dein Zauberattribut.", 6),
      f("primal-spirit-skinrider", "Hautreitertrance", "Besitze deinen Urgeist oder ein Tier unter Tierfreundschaft bis zu halbe Barbarenstufe + KO-Modifikator Stunden. Nach langer Rast erneut oder durch eine Kampfrausch-Anwendung wiederherstellen.", 10, "action"),
    ]),
    gh("path-of-the-wrathful-dead", "Pfad der zornigen Toten", "Leiht den unruhigen Toten Körper und Zorn.", [
      f("wrathful-dead-rage", "Zorn der Toten", "Im Kampfrausch ignorierst du schwieriges Gelände, darfst durch Kreaturenräume ziehen und erhältst gespenstische Mobilitäts- und Wahrnehmungsvorteile.", 3),
      f("wrathful-dead-catharsis", "Katharsis der letzten Nacht", "Wähle nach langer Rast Hass, Eifersucht oder Schrecken und erhalte den zugehörigen situativen Kampfvorteil.", 3),
      f("wrathful-dead-doom", "Wiederkehrendes dunkles Verhängnis", "Einmal je Kampfrausch entfesselst du Verseuchung, Unterkühlung oder Verbrennung; der Schaden würfelt W6 in Höhe deines Kampfrauschschadens.", 6, "action"),
      f("wrathful-dead-door", "Der Tod ist nur eine Tür", "Vorteil auf Todesrettungswürfe und Tod erst nach vier Fehlschlägen. Heilung, Wiederbeleben oder Tote erwecken kann ohne Materialkomponenten gewirkt werden, verursacht aber Erschöpfung.", 10),
    ]),
  ],
  bard: [
    gh("college-of-adventurers", "Kolleg der Abenteurer", "Verbindet gelernte Talente anderer Abenteurerrollen.", [
      f("adventurers-talented", "Talentierter Abenteurer", "Wähle auf Stufe 3 und 6 je ein Abenteurertalent aus den Klassenmotiven Barbar, Kleriker, Druide, Kämpfer, Mönch, Paladin, Waldläufer, Schurke, Zauberer, Hexenmeister oder Magier.", 3),
      f("adventurers-party-planner", "Gruppenplaner", "Kreaturen mit deinem Bardischen Inspirationswürfel können als Bonusaktion Helfen.", 3),
      f("adventurers-well-rounded", "Vielseitig", "Erhalte eine Werkzeugübung, eine Fertigkeitsübung und eine Sprache deiner Wahl.", 6),
    ]),
    gh("college-of-fools", "Kolleg der Narren", "Macht aus Furcht, Spott und Unglück tödliche Pointen.", [
      f("fools-antics", "Antagonistische Possen", "Lerne Bösartiger Spott zusätzlich und habe Dissonantes Flüstern stets vorbereitet; nach Sprinten, Lösen oder Beeinflussen darfst du den Zaubertrick als Bonusaktion wirken.", 3, "bonus-action"),
      f("fools-cruel-jest", "Grausamer Scherz", "Scheitert eine Kreatur in 9 m an einem W20-Test, verbrauche als Reaktion Inspiration: psychischer Schaden = Würfel + CH und Nachteil auf den nächsten W20-Test.", 3, "reaction"),
      f("fools-gallows-humor", "Galgenhumor", "Fällt eine Kreatur in 18 m auf 0 TP, kannst du per Reaktion Inspiration zurückerhalten und ein Ziel in 9 m bei misslungenem WE-Rettungswurf zu Boden werfen und festsetzen.", 6, "reaction"),
    ]),
    gh("college-of-requiems", "Kolleg der Requien", "Verwebt Trauermusik mit Nekromantie und Untoten.", [
      f("requiems-chilling-melody", "Schaurige Melodie", "Lerne zwei Nekromantie-Zaubertricks zusätzlich als Bardenzauber.", 3),
      f("requiems-heartstrings", "An den Lebensfäden zupfen", "Deine Inspiration rettet bei 0 TP in Höhe des Würfels oder erhöht nach einem Treffer den nekrotischen Schaden um den Würfel.", 3),
      f("requiems-stir-bones", "Knochen aufrütteln", "Tote beleben ist stets vorbereitet. Ausgewählte Untote unter deiner Kontrolle erhalten beim Einsatz deiner Inspiration eigene Inspirationswürfel.", 6),
    ]),
  ],
  cleric: [
    gh("eldritch-domain", "Domäne des Unbegreiflichen", "Kanalisiert die Macht ferner, toter und unbegreiflicher Gottheiten.", [
      f("eldritch-domain-spells", "Domänenzauber", "Erhält auf den Klerikerstufen 3, 5, 7 und 9 die hinterlegten, stets vorbereiteten Domänenzauber.", 3),
      f("eldritch-contagion", "Unbegreifliche Ansteckung", "Nach einem zielgerichteten Zauber kann ein Ziel bei misslungenem WE-Rettungswurf 1 Minute einen zufälligen unbegreiflichen Effekt erleiden.", 3),
      f("eldritch-otherworldly-calm", "Überweltliche Ruhe", "Resistenz gegen psychischen Schaden, Vorteil gegen bezaubert/verängstigt und Schutz vor Gedankenlesen; ein Versuch kann psychischen Schaden in Höhe deiner Klerikerstufe auslösen.", 6),
    ]),
    gh("inquisition-domain", "Domäne der Inquisition", "Jagt Zauberwirker und schützt vor arkaner Macht.", [
      f("inquisition-domain-spells", "Domänenzauber", "Erhält auf Klerikerstufe 3/5/7/9 stets vorbereitete Inquisitionszauber.", 3),
      f("inquisition-witch-hunter", "Hexenjägerschlag", "Ein Waffen- oder waffenloser Treffer verursacht 1W8 Kraftschaden, gegen konzentrierende Ziele 2W8; Anwendungen = WE-Modifikator pro langer Rast.", 3),
      f("inquisition-spell-shield", "Zauberschild", "Göttliche Macht gewährt 10 Minuten 1W10 + Klerikerstufe temporäre TP; solange sie bestehen: Vorteil auf Rettungswürfe gegen Zauber und Resistenz gegen Zauberschaden.", 3, "bonus-action"),
      f("inquisition-rebuke", "Zauberwirker zurechtweisen", "Reaktion auf einen Zauber in 18 m: KO-Rettungswurf; 1W8 Kraftschaden je Zaubergrad, bei Erfolg halbiert. Anwendungen = WE-Modifikator.", 6, "reaction"),
    ]),
    gh("purification-domain", "Domäne der Läuterung", "Verbrennt Krankheit, Mutation und körperliche Verderbnis.", [
      f("purification-domain-spells", "Domänenzauber", "Erhält auf Klerikerstufe 3/5/7/9 stets vorbereitete Läuterungszauber.", 3),
      f("purification-cleanse-fire", "Mit Feuer läutern", "Zaubertrick- oder Waffenschaden kann +1W8 Feuerschaden verursachen; Anwendungen = WE-Modifikator + Übungsbonus pro kurzer/langer Rast.", 3),
      f("purification-unclean-brand", "Brandmal der Unreinen", "Göttliche Macht ersetzt den Schaden eines Nahkampftreffers durch ein Brandmal: 1 Minute Nachteil auf Rettungswürfe gegen deine Zauber und Verwundbarkeit gegen deinen Feuerschaden.", 3),
      f("purification-ward-corruption", "Schutz vor Verderbnis", "Vorteil gegen Krankheiten und Formveränderung; kann per Berührung gegen geringen unvermeidbaren Feuerschaden 1 Stunde auf einen Verbündeten übertragen werden.", 6),
    ]),
  ],
  druid: [
    gh("circle-of-blood", "Zirkel des Blutes", "Tauscht Blut und Lebenskraft gegen rasende Gewalt.", [
      f("blood-circle-spells", "Zirkelzauber", "Erhält auf Druidenstufe 3/5/7/9 stets vorbereitete Blut- und Sangromantiezauber.", 3),
      f("blood-moon-rite", "Ritus des Blutmonds", "Bonusaktion + Tiergestalt: 10 Minuten temporäre TP = 3 × Druidenstufe, +3 m Bewegung, Sprinten als Bonusaktion und +1W6 nekrotisch bei Treffern.", 3, "bonus-action"),
      f("blood-boon", "Blutgabe", "Fällt eine Kreatur in 18 m auf 0 TP, erhältst du per Reaktion einen Trefferwürfel zurück und gibst temporäre TP in Höhe deiner Druidenstufe.", 6, "reaction"),
      f("blood-lust", "Blutlust", "Während des Blutmonds steigt der Zusatzschaden auf 2W6 und du erhältst Resistenz gegen Hieb-, Stich- und Wuchtschaden.", 10),
    ]),
    gh("circle-of-entropy", "Zirkel der Entropie", "Verkörpert Zerfall, Katastrophe und das unausweichliche Ende.", [
      f("entropy-catastrophic-power", "Katastrophale Macht", "Wähle nach Rast Elementarkatastrophe, zerstörerisches Schmettern oder eine Waffenmeisterschaft.", 3),
      f("entropy-ruin-incarnate", "Verkörperter Untergang", "Bonusaktion + Tiergestalt: 10 Minuten Vorteil gegen blutende Ziele, zwei Angriffe und Basis-RK 17 + WE (falls höher).", 3, "bonus-action"),
      f("entropy-many-roads", "Viele Wege ins Verderben", "In Untergangsform können Treffer Elementar- oder nekrotischen Schaden verursachen und du addierst WE auf ST- und GE-Rettungswürfe.", 6),
      f("entropy-shake-earth", "Die Erde erschüttern", "Wachse 10 Minuten um eine Größenkategorie, wirf Ziele in 9 m bei misslungenem GE-Rettungswurf zu Boden, beschädige Bauwerke mit Druidenstufe W10 und verursache +1W4 Waffenschaden.", 10, "action"),
    ]),
    gh("circle-of-mutation", "Zirkel der Mutation", "Verformt Tiergestalt mit bezahlten Mutationen zum Apexräuber.", [
      f("mutation-circle-forms", "Zirkelgestalten", "Tiergestalt bis HG = Druidenstufe/3, +2 Schaden mit Bestienangriffen und Sprinten/Lösen/Beeinflussen als Bonusaktion.", 3),
      f("mutation-mutate-shape", "Gestalt mutieren", "Gib in Tiergestalt Zauberplätze für Mutationspunkte aus und kaufe Schwimmen, Flug, Dunkelsicht, Mehrfachangriff, natürliche Rüstung, Gift und weitere Mutationen.", 3),
      f("mutation-unnatural", "Unnatürlich und beunruhigend", "Bei einem Platz ab Grad 2 erhältst du einen niedrigeren Platz zurück; Angriffe der Tiergestalt können Kraftschaden verursachen und du erhältst soziale Vorteile.", 6),
      f("mutation-endless", "Endlose Evolution", "Erhalte zusätzliche Mutationspunkte = WE-Modifikator und Zugriff auf Erdbewegung, Resistenzen, Angriffsboni, Zaubern in Tiergestalt, Regeneration und übernatürliche Haut.", 10),
    ]),
  ],
  fighter: [
    gh("bulwark-warrior", "Bollwerkkrieger", "Provoziert Feinde und fängt Schaden für Verbündete ab.", [
      f("bulwark-taunt", "Schützender Spott", "Einmal pro Zug beim Nahkampftreffer hat das Ziel bis zu deinem nächsten Zug Nachteil auf Angriffe gegen andere Ziele.", 3),
      f("bulwark-weather-storm", "Dem Sturm trotzen", "Bonusaktion: 1 Minute lang am Ende jedes Zuges temporäre TP = Kämpferstufe + KO; nach kurzer/langer Rast erneut.", 3, "bonus-action"),
      f("bulwark-threatening", "Bedrohliche Präsenz", "Gegner in 9 m erleiden bei misslungenem WE-Rettungswurf 5W6 psychisch und Nachteil gegen andere Ziele; stellt Dem Sturm trotzen wieder her. Zwei Anwendungen pro lange Rast.", 7, "action"),
      f("bulwark-aggressive-defense", "Aggressive Verteidigung", "Einmal pro Zug kannst du beim Nahkampftreffer bis zur halben Kämpferstufe temporäre TP opfern und denselben Wert als Zusatzschaden verursachen.", 10),
    ]),
    gh("living-crucible", "Lebender Schmelztiegel", "Stählt Körper und Sinne mit selbst gebrauten alchemistischen Verbindungen.", [
      f("crucible-compounds", "Verbindungshersteller", "Lerne 3 Verbindungen (auf 7 und 10 je +2), braue sie nach langer Rast und vertrage 1 + KO-Modifikator Wirkungen pro Rast.", 3),
      f("crucible-alchemy", "Schüler der Alchemie", "Erhalte Alchemistenausrüstung, Übung und doppelten Übungsbonus für ihre Proben.", 3),
      f("crucible-cauldron", "Lebender Kessel", "Dein Verträglichkeitslimit steigt auf 3 + KO-Modifikator.", 7),
      f("crucible-rapid", "Schneller Konsum", "Wenn du eine Verbindung als Bonusaktion trinkst, darfst du eine zweite trinken.", 10, "bonus-action"),
    ]),
    gh("nightwatcher", "Nachtwächter", "Wachsam, dunkelheitskundig und auf Schutzreaktionen spezialisiert.", [
      f("nightwatcher-skilled", "Erfahrener Wächter", "Erhalte Expertise in einer geübten Fertigkeit und Übung in zwei passenden Ermittlungs-, Sozial- oder Wahrnehmungsfertigkeiten.", 3),
      f("nightwatcher-vigilant", "Stets wachsam", "Dunkelsicht 18 m (oder +18 m), Vorteil auf Initiative und Wahrnehmung; Warngruf kann Verbündeten Vorteil auf Initiative und halbe Bewegung geben.", 3, "reaction"),
      f("nightwatcher-size-up", "Einschätzen", "Bonusaktion auf ein Ziel in 9 m; bei dessen Angriff kannst du als Reaktion Nachteil und Resistenz gegen den Schaden gewähren.", 7, "bonus-action"),
      f("nightwatcher-night-stalker", "Nachtpirscher", "Bonusaktion: 10 Minuten Blindsicht 9 m; Gelegenheitsangriffe haben Nachteil und in Dunkelheit provozierst du sie nicht.", 10, "bonus-action"),
    ]),
  ],
  monk: [
    gh("warrior-of-the-leaden-crown", "Krieger der bleiernen Krone", "Verteidigt den freien Willen mit telekinetischer Kampfkunst.", [
      f("leaden-subtle-hand", "Subtile Hand", "Während deines Zugs +1,5 m Reichweite für waffenlose Schläge; Treffer können psychischen statt normalen Schaden verursachen.", 3),
      f("leaden-psionic-prowess", "Psionische Meisterschaft", "Lerne Magierhand und wirke für Fokuspunkte Magie entdecken, Schutz vor Gut und Böse, Person festhalten, Schweben oder Zerbersten.", 3),
      f("leaden-unsubtle-strike", "Unsubtiler Schlag", "Einmal pro Zug kann ein Treffer bei misslungenem ST-Rettungswurf das Ziel 3 m zu dir oder von dir bewegen.", 6),
    ]),
    gh("warrior-of-pride", "Krieger des Stolzes", "Gewinnt Macht aus verletztem Ego und demonstrativer Überlegenheit.", [
      f("pride-tall-tales", "Große Geschichten", "Erhalte eine soziale Fertigkeitsübung; bei Fokuspunktausgabe temporäre TP = WE, verdoppelt wenn blutend.", 3),
      f("pride-assertive", "Durchsetzungsstarker Angreifer", "Solange du blutend bist, addiere WE auf den Schaden waffenloser Schläge und Mönchswaffen.", 3),
      f("pride-bruised-ego", "Gekränktes Ego", "Wirst du verletzt, kannst du per Reaktion 1 Fokus ausgeben und bis Ende deines nächsten Zugs Vorteil gegen den Verursacher erhalten.", 6, "reaction"),
      f("pride-redoubled", "Verdoppelte Anstrengung", "Kritischer Treffer im blutenden Zustand würfelt einen weiteren Schadenswürfel.", 6),
    ]),
    gh("warrior-of-regret", "Krieger der Reue", "Formt Schuld zu einem beweglichen Schatten und Hilfe für andere.", [
      f("regret-shade", "Schatten der Reue", "Einmal pro Zug für 1 Fokus einen Schatten in 3 m erzeugen; Flurry-Angriffe können von ihm ausgehen, als Bonusaktion bis 18 m bewegen.", 3),
      f("regret-road", "Der unbeschrittene Weg", "Beim Sprinten kannst du stattdessen dich oder einen Verbündeten in 18 m an die Position deines Schattens teleportieren.", 3),
      f("regret-aid", "Nicht gewährte Hilfe", "Bonusaktion: Helfen oder Berührung heilt Kampfkünste-Würfel + WE; kann vom Schatten aus erfolgen.", 6, "bonus-action"),
    ]),
  ],
  paladin: [
    gh("oath-of-pestilence", "Eid der Pestilenz", "Verbreitet Verfall, Krankheit und widerstandsfähige Verderbnis.", [
      f("pestilence-fever", "Schwächendes Fieber", "Ein Treffer kann Göttliche Macht ausgeben: 1 Minute vergiftet und kampfunfähig, KO-Rettungswurf am Zugende beendet.", 3),
      f("pestilence-infection", "Entropische Infektion", "Göttliche Macht markiert 1 Minute: Dein Schaden verursacht +2W6 nekrotisch und ignoriert nekrotische Resistenz/Immunität; KO-Rettungswurf am Zugende.", 3, "action"),
      f("pestilence-spells", "Eidzauber", "Erhält auf Paladinstufe 3/5/9 die hinterlegten, stets vorbereiteten Eidzauber.", 3),
      f("pestilence-aura", "Aura grassierender Krankheit", "Bei einem W20-Test einer Kreatur in deiner Schutzaura kannst du als Reaktion Nachteil auferlegen.", 7, "reaction"),
    ]),
    gh("oath-of-slaughter", "Eid des Gemetzels", "Lebt für Blutvergießen und endlose Kampfesraserei.", [
      f("slaughter-frenzy", "Rasendes Gemetzel", "Göttliche Macht als Bonusaktion: bis zu 1 Minute Reaktionsangriff nach Fehlschlag sowie Vorteil gegen bezaubert, verängstigt und betäubt.", 3, "bonus-action"),
      f("slaughter-spells", "Eidzauber", "Erhält auf Paladinstufe 3/5/9 die hinterlegten, stets vorbereiteten Eidzauber.", 3),
      f("slaughter-aura", "Aura des Blutdursts", "Blutende Verbündete in deiner Schutzaura addieren CH auf Waffenschaden; Reaktion kann Rettungswürfe gegen Sangromantie erschweren.", 7),
    ]),
    gh("oath-of-zeal", "Eid des Fanatismus", "Jagt Häresie mit absoluter ideologischer Härte.", [
      f("zeal-heretic", "Zeichen des Häretikers", "Göttliche Macht als Bonusaktion markiert ein Ziel: deine Treffer kriten bei 19–20 und du kannst bei dessen Zugbeginn per Reaktion im Nahkampf angreifen.", 3, "bonus-action"),
      f("zeal-spells", "Eidzauber", "Erhält auf Paladinstufe 3/5/9 die hinterlegten, stets vorbereiteten Eidzauber.", 3),
      f("zeal-clarity", "Aura der Klarheit", "Wirke Zone der Wahrheit ohne Zauberplatz; ein erfolgreicher Widerstand verursacht fortlaufend 1W6 psychisch, bis das Ziel freiwillig scheitert.", 7),
    ]),
  ],
  ranger: [
    gh("green-reaper", "Grüner Schnitter", "Giftmischer und Attentäter mit skalierenden Toxineffekten.", [
      f("green-reaper-envenomed", "Vergifteter Angriff", "Bonusaktion vergiftet Waffe/20 Geschosse für 1 Minute; Treffer +1W4 Gift. Anwendungen = WE pro lange Rast.", 3, "bonus-action"),
      f("green-reaper-tradecraft", "Giftiges Handwerk", "Erhalte Giftmischerausrüstung und doppelten Übungsbonus; ein Giftschadenstreffer kann Zauberplatz für +1W6 Gift, vergiftet und einen Toxineffekt ausgeben.", 3),
      f("green-reaper-spells", "Schnitterzauber", "Erhält auf Waldläuferstufe 3/5/9 stets vorbereitete Gift- und Fluchzauber.", 3),
      f("green-reaper-control", "Giftkontrolle", "Resistenz gegen Gift, Vorteil gegen vergiftet; Schutz vor Gift ohne Platz WE-Modifikator-mal pro lange Rast.", 7),
    ]),
    gh("primordial-archer", "Primordialer Bogenschütze", "Speist Pfeile und Körper mit elementarer Naturmagie.", [
      f("primordial-herbal", "Kräuterkunde", "Erhalte Kräuterkundeausrüstung; stabilisiere als Bonusaktion oder heile mit Nutzen-Aktion von 0 auf 1 TP, einmal pro kurzer/langer Rast.", 3),
      f("primordial-arrows", "Elementarpfeile", "Bonusaktion: Kurz-/Langbogen verursacht 1 Minute gewählte Elementarschadensart und +1W6 desselben Typs.", 3, "bonus-action"),
      f("primordial-spells", "Primordialzauber", "Erhält auf Waldläuferstufe 3/5/9 stets vorbereitete Bogen- und Elementarzauber.", 3),
      f("primordial-weave", "Elemente verweben", "Nach 1 Stunde oder langer Rast erhältst du Resistenz gegen Säure, Kälte, Feuer, Blitz oder Donner bis zur nächsten langen Rast.", 7),
    ]),
    gh("vermin-lord", "Herr des Ungeziefers", "Kommandiert beschworene Schwärme und wird durch Seuchen abgehärtet.", [
      f("vermin-kin", "Ungezieferbrut", "Kommuniziere mit winzigen Tieren und beschwöre per Zauberplatz eine Anzahl Schwärme in Höhe des Platzgrads für 1 Stunde.", 3, "action"),
      f("vermin-strikes", "Schwarmangriffe", "Bonusaktion: alle Schwärme greifen an oder ein Schwarm greift zweimal an. Anwendungen = WE + Übungsbonus pro kurzer/langer Rast.", 3, "bonus-action"),
      f("vermin-spells", "Ungezieferzauber", "Erhält auf Waldläuferstufe 3/5/9 stets vorbereitete Schwarm- und Seuchenzauber.", 3),
      f("vermin-fortitude", "Schmutz und Widerstandskraft", "Immun gegen vergiftet und Übung in KO-Rettungswürfen.", 7),
    ]),
  ],
  rogue: [
    gh("highway-rider", "Wegereiter", "Schießwütiger Straßenräuber mit treuem Reittier.", [
      f("highway-hair-trigger", "Lockerer Abzug", "Bei Initiative ohne Nachteil sofort Reaktion: Angriff, Bewegung ohne Gelegenheitsangriffe, Reittierbewegung oder Ausweichen/Nutzen.", 3, "reaction"),
      f("highway-mount", "Treues Reittier", "Reittier finden ist stets vorbereitet und einmal pro lange Rast ohne Platz/Komponenten mit IN wirkbar.", 3),
      f("highway-ride-down", "Niederreiten", "Hinterhältiger Angriff ohne Vorteil, wenn du oder dein kontrolliertes Reittier mindestens 6 m bewegt wurdet und du keinen Nachteil hast.", 3),
      f("highway-horse-lord", "Pferdeherr", "Nach 1 Minute Pflege erhält das Reittier temporäre TP = 2 × Schurkenstufe; es kann als Bonusaktion Sprinten, Lösen oder Ausweichen.", 9),
    ]),
    gh("misfortune-bringer", "Unglücksbringer", "Verflucht Ziele mit dem bösen Blick und bezahlten Missgeschicken.", [
      f("misfortune-evil-eye", "Böser Blick", "Bonusaktion: Ziel in 18 m 1 Minute verfluchen; gegen dieses Ziel ist Hinterhältiger Angriff ohne Vorteil möglich, sofern kein Nachteil besteht.", 3, "bonus-action"),
      f("misfortune-jinx", "Unglücksbringer", "Lerne zwei Missgeschicke und erhalte 4 Jinxpunkte pro kurze/lange Rast; Rettungswurf-SG = 8 + IN oder CH + Übung.", 3, "resource"),
      f("misfortune-steal-luck", "Glück stehlen", "Reaktion entfernt Vorteil von einem W20-Test in 9 m und stellt 1 Jinxpunkt wieder her; nach kurzer/langer Rast erneut.", 9, "reaction"),
    ]),
    gh("sanguine-thief", "Sanguinischer Dieb", "Verbindet Hinterhalt, Magie und geraubte Blutkraft.", [
      f("sanguine-thief-spellcasting", "Zauberwirken", "Drittelzauberwirker mit IN: 3 Zaubertricks und 3 vorbereitete Magier-/Sangromantiezauber auf Stufe 3; auf Stufe 10 ein vierter Zaubertrick und 7 vorbereitete Zauber.", 3),
      f("sanguine-thief-power", "Gestohlene Kraft", "Pool aus W8-Sangromantiewürfeln in Höhe deiner Hinterhältiger-Angriff-Würfel; sie können bei Sangromantie Trefferwürfel ersetzen.", 3, "resource"),
      f("sanguine-thief-steal", "Blut stehlen", "Bei Hinterhältigem Angriff einen Sangromantiewürfel wiederherstellen oder blutend als Heilung würfeln; Anwendungen = IN pro lange Rast.", 3),
      f("sanguine-thief-blades", "Blutige Klingen", "Nach langer Rast bis zu zwei Treffer-/Sangromantiewürfel in Blutdolche umwandeln; sie sind Fokus und verursachen bei kritischen Treffern zusätzliche W8.", 9),
    ]),
  ],
  sorcerer: [
    gh("apocalypse-sorcery", "Apokalypsezauberei", "Schreibt Visionen des Weltendes in mächtige Schriftrollen.", [
      f("apocalypse-spells", "Apokalyptische Zauber", "Erhält auf Zaubererstufe 3/5/7/9 stets vorbereitete Weissagungs- und Katastrophenzauber.", 3),
      f("apocalypse-assertations", "Wahnwitzige Behauptungen", "Übung in Kalligrafie; Schriftrollen in halber Zeit/zu halben Kosten und mit bezahlter Metamagie verzauberbar.", 3),
      f("apocalypse-witness", "Zeuge sein", "Während Angeborene Zauberei: Kraftresistenz, Immunität gegen verängstigt und einmal Schriftrolle mit Aktionszeit als Bonusaktion nutzen.", 6),
      f("apocalypse-apocrypha", "Arkane Apokryphen", "Nach langer Rast kostenlos eine Schriftrolle eines wirkbaren Zaubers bis Grad 5 erschaffen; zerfällt bei der nächsten langen Rast.", 6),
    ]),
    gh("haunted-sorcery", "Heimgesuchte Zauberei", "Arbeitet mit einem untoten Phantomgefährten und dem sechsten Sinn.", [
      f("haunted-spells", "Heimgesuchte Zauber", "Erhält auf Zaubererstufe 3/5/7/9 stets vorbereitete Geister- und Todeszauber.", 3),
      f("haunted-sixth-sense", "Sechster Sinn", "Addiere deinen CH-Modifikator auf Initiative.", 3),
      f("haunted-phantom", "Phantomgefährte", "Vertrauten finden ohne Platz als Aktion; der Vertraute ist ein untotes Gespenst, kann unsichtbar werden und per Reaktion Lebensentzug einsetzen.", 3),
      f("haunted-spirit-strength", "Stärke des Geistes", "Phantom erhält +4 × Zaubererstufe maximale TP; Zauber können von seinem Feld ausgehen und es darf nach deiner Zauberaktion per Bonusaktion Lebensentzug nutzen.", 6),
      f("haunted-pallor", "Totenblässe", "Resistenz gegen nekrotischen Schaden; Schadenszauber dürfen nekrotischen statt normalen Schaden verursachen.", 6),
    ]),
    gh("wretched-bloodline", "Elende Blutlinie", "Wendet einen vererbten Feen-, Unhold- oder Untotenfluch gegen Feinde.", [
      f("wretched-bad-luck", "Pechbringer", "Bonusaktion: sichtbares Ziel in 9 m hat Nachteil auf den nächsten W20-Test; pro kurze/lange Rast oder für 1 Zaubereipunkt erneut.", 3, "bonus-action"),
      f("wretched-blood-ties", "Blutsbande", "Böses und Gutes entdecken stets vorbereitet und ohne Platz; wähle Feenwesen, Unhold oder Untoter für Schutz während der Konzentration.", 3),
      f("wretched-curse", "Elender Fluch", "Wähle massig (mehr TP/Tragkraft), nachtaktiv (120 Fuß Dunkelsicht) oder pesttragend (Immunität gegen vergiftet, Nekrotisch-Resistenz) samt jeweiligem Nachteil.", 3),
      f("wretched-share", "Die Bürde teilen", "Fluch als stets vorbereiteten Zauber für 3 Zaubereipunkte ohne Konzentration und mit 18 m Reichweite wirken.", 6),
    ]),
  ],
  warlock: [
    gh("the-coven", "Der Hexenzirkel", "Dient einer Vettel und arbeitet mit Täuschung, Flüchen und Blickmagie.", [
      f("coven-spells", "Zirkelzauber", "Erhält auf Hexenmeisterstufe 3/5/7/9 stets vorbereitete Vettelnzauber.", 3),
      f("coven-hags-eye", "Vettelauge", "Magisches Fokusauge; Hex CH-mal ohne Platz pro lange Rast, ab Stufe 10 zusätzlich Fluch einmal ohne Platz.", 3),
      f("coven-guile", "List der Vettel", "Lerne Einfache Illusion zusätzlich; erschwert Untersuchung deiner Illusionen und kann entdeckende Kreaturen mit 1W6 + 1W6 je Zaubergrad psychisch verletzen.", 6),
      f("coven-visage", "Antlitz der Vettel", "1 Minute schreckliches Antlitz: nacheinander verängstigender, lähmender und tödlicher Blick; nach langer Rast erneut.", 10, "action"),
    ]),
    gh("the-first-vampire", "Der Erste Vampir", "Leiht nächtliche Sinne, Lebensentzug und bestialische Gestalten.", [
      f("vampire-drain-life", "Leben entziehen", "Nach Angriff/Magie waffenloser Bonusangriff für 1W6 + CH nekrotisch; Paktplatz fügt 1W8 je Platzgrad hinzu und heilt um den Schaden.", 3, "bonus-action"),
      f("vampire-nocturnal", "Nächtlicher Jäger", "Dunkelsicht 18 m oder bestehende Reichweite +18 m.", 3),
      f("vampire-spells", "Vampirzauber", "Erhält auf Hexenmeisterstufe 3/5/7/9 stets vorbereitete Vampirzauber.", 3),
      f("vampire-night-creature", "Kreatur der Nacht", "Verwandlung stets vorbereitet und CH-mal pro lange Rast ohne Platz/Material nur auf dich als Fledermaus, Ratte oder Wolf.", 6),
      f("vampire-appetite", "Unheimlicher Appetit", "Reduzierst du einen Gegner mit Leben entziehen auf 0 TP, stellt deine Reaktion einen Paktplatz wieder her; einmal pro lange Rast.", 10, "reaction"),
    ]),
    gh("the-parasite", "Der Parasit", "Wird Wirt eines kosmischen Larvenwesens und raubt Magie.", [
      f("parasite-siphon", "Zauber absaugen", "Reaktion auf Zauber in 18 m: misslingt CH-Rettungswurf, kann das Ziel 8 Stunden nicht erneut zaubern und du bereitest den Zauber vor; Kapazität 1 + CH Zaubergrade.", 3, "reaction"),
      f("parasite-specimen", "Physisches Exemplar", "Bonusaktion nach langer Rast: wähle CH-Modifikator viele Anpassungen wie +TP, Dunkelsicht, Bewegung, Giftabwehr, Klettern oder Athletik/Turnen.", 3, "bonus-action"),
      f("parasite-sentinel", "Symbiotischer Wächter", "Nicht überraschbar, Vorteil auf Initiative sowie Rettungswürfe gegen bezaubert und verängstigt.", 6),
      f("parasite-appetite", "Unheimlicher Appetit", "Beherrschung einer Person stets vorbereitet, einmal ohne Platz; Schaden bricht Konzentration darauf nicht und erfolgreicher Rettungswurf verursacht psychischen Schaden = Hexenmeisterstufe.", 10),
      f("parasite-spawn", "Brutmarionette", "Nach deinem Tod bricht eine kontrollierte Larve hervor und kann einen Humanoiden übernehmen; einmal pro lange Rast.", 10),
    ]),
  ],
  wizard: [
    gh("daemonologist", "Daemonologe", "Stiehlt himmlische und infernale Macht samt Anrufungen.", [
      f("daemonologist-fair-foul", "Heilig und verdorben", "Wähle nach langer Rast Archdämon oder Erzseraph und bereite die hinterlegten Zauber dieser Seite vor.", 3),
      f("daemonologist-secrets", "Gestohlene Geheimnisse", "Lerne eine Anrufung, nutze IN statt CH; eine weitere Anrufung auf Stufe 6.", 3),
      f("daemonologist-tongues", "Geliehene Zungen und Häute", "Je nach Seite nekrotische oder gleißende Resistenz und Verständigung mit Unholden oder Himmlischen; Seitenwechsel als Bonusaktion einmal pro lange Rast.", 6, "bonus-action"),
      f("daemonologist-countenance", "Überirdisches Antlitz", "Bonusaktion: 10 Minuten Vorteil auf CH-Proben, Tabellenzauber einen Grad höher und 18 m Flug; pro lange Rast oder Platz ab Grad 5.", 10, "bonus-action"),
    ]),
    gh("plague-doctor", "Pestdoktor", "Destilliert Zauber in heilende oder schädliche Tränke.", [
      f("plague-potion-craft", "Trankhandwerk", "Übung in Heilkunde, Kräuter- und Alchemistenausrüstung; verwandle passende Einzelzielzauberplätze in bis zur nächsten langen Rast haltbare Tränke.", 3),
      f("plague-good-medicine", "Gute Medizin", "Zauberplatz ohne Zauber in Heiltrank umwandeln: Platzgrad W8 Heilung, ab Grad 3 zusätzlich vergiftet entfernen.", 3),
      f("plague-bad-medicine", "Schlechte Medizin", "Zauberplatz erzeugt eine Wurfdosis mit wählbaren Gift-, Bewegungs-, Nekrotisch-, Gift- und Säureeffekten; KO-Rettungswurf beendet.", 6, "action"),
      f("plague-breathe", "Tief einatmen", "Nach nekrotischem oder Giftschaden temporäre TP in Höhe des Schadens; Immunität gegen vergiftet.", 10),
    ]),
    gh("sangromancer", "Sangromant", "Bezahlt Blutmagie mit eigenen oder gespeicherten Lebenswürfeln.", [
      f("sangromancer-savant", "Sangromantiegelehrter", "Sangromantie gilt als Magiermagie; zwei Zauber bis Grad 2 gratis ins Zauberbuch, je neuem Zaubergrad ein weiterer.", 3),
      f("sangromancer-full-blooded", "Vollblütig", "Pool aus 1 + Magierstufe W12-Sangromantiewürfeln statt Trefferwürfeln für Sangromantie; einer pro kurze, alle pro lange Rast zurück.", 3, "resource"),
      f("sangromancer-vigor", "Sanguinische Vitalität", "+6 maximale TP und +1 je weiterer Magierstufe; ein Sangromantiezauber mit Platz heilt dich um den Platzgrad.", 6),
      f("sangromancer-blood-for-blood", "Blut für Blut", "Einmal pro Zug bei Zauberschaden Treffer-/Sangromantiewürfel ausgeben und als Zusatzschaden würfeln; gegen blutende Ziele zweimal, höheres Ergebnis.", 10),
    ]),
  ],
};

// GrimForge führt weiterhin ältere Kern-Unterklassen, die ihre Wahl bei
// Kleriker/Zauberer/Hexenmeister auf Stufe 1 und bei Druide/Magier auf Stufe 2
// verlangen. Damit eine Grim-Hollow-Unterklasse in demselben Klassenmodell
// wählbar bleibt, wird nur die Entscheidung vorgezogen; sämtliche GH-Merkmale
// behalten ausdrücklich ihre korrekte Freischaltung ab Stufe 3.
for (const [classId, selectionLevel] of Object.entries({
  cleric: 1,
  sorcerer: 1,
  warlock: 1,
  druid: 2,
  wizard: 2,
})) {
  for (const subclass of grimHollowSubclassesByClassId[classId] ?? []) {
    subclass.unlockLevel = selectionLevel;
  }
}
