import { getEquipmentById, weapons } from "./equipment";
export interface StartingEquipmentItem {
  equipmentId: string;
  quantity: number;
}

export interface StartingEquipmentOption {
  id: string;
  title: string;
  description?: string;

  equipment?: StartingEquipmentItem[];
  packIds?: string[];
}

export interface EquipmentChoice {
  id: string;
  title: string;
  options: StartingEquipmentOption[];
}

export interface StartingEquipmentDefinition {
  classId: string;

  choices: EquipmentChoice[];

  guaranteedEquipment:
    StartingEquipmentItem[];

  guaranteedPacks: string[];
}

function simpleOptions(prefix:string, excluded:string[] = [], melee = false) {
  return weapons.filter(w => w.weaponCategory === "simple" && !excluded.includes(w.id) &&
    (!melee || (!w.properties.includes("ammunition") && w.id !== "dart")))
    .map(w => option(prefix + "-" + w.id, w.name, [[w.id,1]]));
}

function weaponPairs(prefix: string, martial: boolean): StartingEquipmentOption[] {
  const pool = weapons.filter(w => martial ? w.weaponCategory === "martial" : w.weaponCategory === "simple" && !w.properties.includes("ammunition") && w.id !== "dart");
  const result = pool.flatMap((a,i) => pool.slice(i).filter(b => !(a.id === b.id && a.id === (martial ? "longsword" : "handaxe"))).map(b =>
    option(prefix + "-" + a.id + "-" + b.id, a.name + " + " + b.name, a.id === b.id ? [[a.id,2]] : [[a.id,1],[b.id,1]])));
  return martial ? [...pool.filter(w => !["longsword","greatsword"].includes(w.id)).map(w => option(prefix+"-"+w.id+"-shield",w.name+" und Schild",[[w.id,1],["shield",1]])), ...result] : result;
}

export const startingEquipment:
  StartingEquipmentDefinition[] = [
    {
      classId: "barbarian",
      choices: [
        {
          id: "barbarian-primary",
          title: "Primärwaffe",
          options: [
            option(
              "barbarian-greataxe",
              "Große Axt",
              [["greataxe", 1]],
            ),
            option(
              "barbarian-greatsword",
              "Großschwert",
              [["greatsword", 1]],
            ),
            ...weapons.filter(w => w.weaponCategory === "martial" && !w.properties.includes("ammunition") && !["greataxe","greatsword","zweihandaxt","zweihandschwert","netz"].includes(w.id))
              .map(w => option("barbarian-primary-"+w.id,w.name,[[w.id,1]])),
          ],
        },
        { id: "barbarian-secondary", title: "Zweitwaffe", options: [
          option("barbarian-two-axes","Zwei Handäxte",[["handaxe",2]]),
          ...weapons.filter(w => w.weaponCategory === "simple" && !["beil","zweihandkeule"].includes(w.id))
            .map(w => option("barbarian-secondary-"+w.id,w.name,[[w.id,1]])),
        ] },
      ],
      guaranteedEquipment: [
        item("javelin", 4),
      ],
      guaranteedPacks: [
        "explorers-pack",
      ],
    },
    {
      classId: "bard",
      choices: [
        {
          id: "bard-instrument", title:"Musikinstrument", options:["lute","bagpipes","drum","dulcimer","flute","lyre","horn","pan-flute","shawm","viol"].map(id=>option("bard-"+id,getEquipmentById(id)!.name,[[id,1]])) },
        {
          id: "bard-weapon",
          title: "Waffe",
          options: [
            ...simpleOptions("bard-weapon",[],false),
            option(
              "bard-rapier",
              "Rapier",
              [["rapier", 1]],
            ),
            option(
              "bard-longsword",
              "Langschwert",
              [["longsword", 1]],
            ),
          ],
        },
        {
          id: "bard-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "bard-diplomat",
              "Diplomatenpaket",
              "diplomats-pack",
            ),
            packOption(
              "bard-entertainer",
              "Unterhalterpaket",
              "entertainers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("leather", 1),
        item("dagger", 1),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "cleric",
      choices: [
        {
          id: "cleric-weapon",
          title: "Nahkampfwaffe",
          options: [
            option(
              "cleric-mace",
              "Streitkolben",
              [["mace", 1]],
            ),
            option(
              "cleric-warhammer",
              "Kriegshammer",
              [["warhammer", 1]],
            ),
          ],
        },
        {
          id: "cleric-armor",
          title: "Rüstung",
          options: [
            option("cleric-chain-mail","Kettenrüstung",[["chain-mail",1]]),
            option(
              "cleric-scale-mail",
              "Schuppenpanzer",
              [["scale-mail", 1]],
            ),
            option(
              "cleric-leather",
              "Lederrüstung",
              [["leather", 1]],
            ),
          ],
        },
        {
          id: "cleric-secondary",
          title: "Sekundärwaffe",
          options: [
            ...simpleOptions("cleric-secondary",["spear","light-crossbow"],false),
            option(
              "cleric-crossbow",
              "Leichte Armbrust",
              [
                ["light-crossbow", 1],
                ["crossbow-bolts", 20],
              ],
            ),
            option(
              "cleric-spear",
              "Speer",
              [["spear", 1]],
            ),
          ],
        },
        {
          id: "cleric-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "cleric-priest",
              "Priesterpaket",
              "priests-pack",
            ),
            packOption(
              "cleric-explorer",
              "Entdeckerpaket",
              "explorers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("shield", 1),
        item("holy-symbol", 1),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "druid",
      choices: [
        {
          id: "druid-defense",
          title: "Schutz oder Waffe",
          options: [
            ...simpleOptions("druid-defense",["spear"],false),
            option(
              "druid-shield",
              "Holzschild",
              [["shield", 1]],
            ),
            option(
              "druid-spear",
              "Speer",
              [["spear", 1]],
            ),
          ],
        },
        {
          id: "druid-weapon",
          title: "Nahkampfwaffe",
          options: [
            ...simpleOptions("druid-weapon",["quarterstaff"],true),
            option(
              "druid-scimitar",
              "Krummsäbel",
              [["scimitar", 1]],
            ),
            option(
              "druid-quarterstaff",
              "Kampfstab",
              [["quarterstaff", 1]],
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("leather", 1),
        item("druidic-focus", 1),
      ],
      guaranteedPacks: [
        "explorers-pack",
      ],
    },
    {
      classId: "fighter",
      choices: [
        {
          id: "fighter-armor",
          title: "Rüstung",
          options: [
            option(
              "fighter-chain-mail",
              "Kettenrüstung",
              [["chain-mail", 1]],
            ),
            option(
              "fighter-leather",
              "Lederrüstung, Langbogen und 20 Pfeile",
              [["leather", 1], ["longbow", 1], ["arrows",20]],
            ),
          ],
        },
        {
          id: "fighter-primary",
          title: "Bewaffnung",
          options: [
            ...weaponPairs("fighter",true),
            option(
              "fighter-longsword-shield",
              "Langschwert und Schild",
              [
                ["longsword", 1],
                ["shield", 1],
              ],
            ),
            option(
              "fighter-two-longswords",
              "Zwei Langschwerter",
              [["longsword", 2]],
            ),
            option(
              "fighter-greatsword",
              "Großschwert und Schild",
              [["greatsword", 1], ["shield",1]],
            ),
          ],
        },
        {
          id: "fighter-ranged",
          title: "Fernkampf oder Handäxte",
          options: [
            option(
              "fighter-crossbow",
              "Leichte Armbrust",
              [
                ["light-crossbow", 1],
                ["crossbow-bolts", 20],
              ],
            ),
            option(
              "fighter-handaxes",
              "Zwei Handäxte",
              [["handaxe", 2]],
            ),
          ],
        },
        {
          id: "fighter-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "fighter-dungeoneer",
              "Gewölbeforscherpaket",
              "dungeoneers-pack",
            ),
            packOption(
              "fighter-explorer",
              "Entdeckerpaket",
              "explorers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [],
      guaranteedPacks: [],
    },
    {
      classId: "monk",
      choices: [
        {
          id: "monk-weapon",
          title: "Waffe",
          options: [
            ...simpleOptions("monk-weapon",["quarterstaff"],false),
            option(
              "monk-shortsword",
              "Kurzschwert",
              [["shortsword", 1]],
            ),
            option(
              "monk-quarterstaff",
              "Kampfstab",
              [["quarterstaff", 1]],
            ),
          ],
        },
        {
          id: "monk-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "monk-dungeoneer",
              "Gewölbeforscherpaket",
              "dungeoneers-pack",
            ),
            packOption(
              "monk-explorer",
              "Entdeckerpaket",
              "explorers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("dart", 10),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "paladin",
      choices: [
        {
          id: "paladin-weapons",
          title: "Bewaffnung",
          options: [
            ...weaponPairs("paladin",true),
            option(
              "paladin-longsword-shield",
              "Langschwert und Schild",
              [
                ["longsword", 1],
                ["shield", 1],
              ],
            ),
            option(
              "paladin-two-longswords",
              "Zwei Langschwerter",
              [["longsword", 2]],
            ),
            option(
              "paladin-greatsword",
              "Großschwert und Schild",
              [["greatsword", 1], ["shield",1]],
            ),
          ],
        },
        {
          id: "paladin-secondary",
          title: "Sekundärwaffen",
          options: [
            ...simpleOptions("paladin-secondary",["spear"],true),
            option(
              "paladin-javelins",
              "Fünf Wurfspeere",
              [["javelin", 5]],
            ),
            option(
              "paladin-spear",
              "Speer",
              [["spear", 1]],
            ),
          ],
        },
        {
          id: "paladin-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "paladin-priest",
              "Priesterpaket",
              "priests-pack",
            ),
            packOption(
              "paladin-explorer",
              "Entdeckerpaket",
              "explorers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("chain-mail", 1),
        item("holy-symbol", 1),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "ranger",
      choices: [
        {
          id: "ranger-armor",
          title: "Rüstung",
          options: [
            option(
              "ranger-scale-mail",
              "Schuppenpanzer",
              [["scale-mail", 1]],
            ),
            option(
              "ranger-leather",
              "Lederrüstung",
              [["leather", 1]],
            ),
          ],
        },
        {
          id: "ranger-weapons",
          title: "Nahkampfwaffen",
          options: [
            ...weaponPairs("ranger",false),
            option(
              "ranger-shortswords",
              "Zwei Kurzschwerter",
              [["shortsword", 2]],
            ),
            option(
              "ranger-handaxes",
              "Zwei Handäxte",
              [["handaxe", 2]],
            ),
          ],
        },
        {
          id: "ranger-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "ranger-dungeoneer",
              "Gewölbeforscherpaket",
              "dungeoneers-pack",
            ),
            packOption(
              "ranger-explorer",
              "Entdeckerpaket",
              "explorers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("longbow", 1),
        item("arrows", 20),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "rogue",
      choices: [
        {
          id: "rogue-primary",
          title: "Primärwaffe",
          options: [
            option(
              "rogue-rapier",
              "Rapier",
              [["rapier", 1]],
            ),
            option(
              "rogue-shortsword",
              "Kurzschwert",
              [["shortsword", 1]],
            ),
          ],
        },
        {
          id: "rogue-secondary",
          title: "Sekundärwaffe",
          options: [
            option(
              "rogue-shortbow",
              "Kurzbogen",
              [
                ["shortbow", 1],
                ["arrows", 20],
              ],
            ),
            option(
              "rogue-second-shortsword",
              "Weiteres Kurzschwert",
              [["shortsword", 1]],
            ),
          ],
        },
        {
          id: "rogue-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "rogue-explorer", "Entdeckerpaket", "explorers-pack"),
            packOption(
              "rogue-burglar",
              "Einbrecherpaket",
              "burglars-pack",
            ),
            packOption(
              "rogue-dungeoneer",
              "Gewölbeforscherpaket",
              "dungeoneers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("leather", 1),
        item("dagger", 2),
        item("thieves-tools", 1),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "sorcerer",
      choices: [
        {
          id: "sorcerer-weapon",
          title: "Waffe",
          options: [
            ...simpleOptions("sorcerer-weapon",["quarterstaff","light-crossbow"],false),
            option(
              "sorcerer-crossbow",
              "Leichte Armbrust",
              [
                ["light-crossbow", 1],
                ["crossbow-bolts", 20],
              ],
            ),
            option(
              "sorcerer-quarterstaff",
              "Kampfstab",
              [["quarterstaff", 1]],
            ),
          ],
        },
        {
          id: "sorcerer-focus",
          title: "Zauberfokus",
          options: [
            option(
              "sorcerer-component-pouch",
              "Komponententasche",
              [["component-pouch", 1]],
            ),
            option(
              "sorcerer-arcane-focus",
              "Arkaner Fokus",
              [["arcane-focus", 1]],
            ),
          ],
        },
        {
          id: "sorcerer-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "sorcerer-dungeoneer",
              "Gewölbeforscherpaket",
              "dungeoneers-pack",
            ),
            packOption(
              "sorcerer-explorer",
              "Entdeckerpaket",
              "explorers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("dagger", 2),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "warlock",
      choices: [
        {
          id: "warlock-weapon", title: "Zusätzliche einfache Waffe", options: simpleOptions("warlock-extra") },
        {
          id: "warlock-ranged",
          title: "Leichte Armbrust oder einfache Waffe",
          options: [
            ...simpleOptions("warlock-ranged",["shortbow","light-crossbow"],false),
            option(
              "warlock-crossbow",
              "Leichte Armbrust",
              [
                ["light-crossbow", 1],
                ["crossbow-bolts", 20],
              ],
            ),
            option(
              "warlock-shortbow",
              "Kurzbogen",
              [
                ["shortbow", 1],
              ],
            ),
          ],
        },
        {
          id: "warlock-focus",
          title: "Zauberfokus",
          options: [
            option(
              "warlock-component-pouch",
              "Komponententasche",
              [["component-pouch", 1]],
            ),
            option(
              "warlock-arcane-focus",
              "Arkaner Fokus",
              [["arcane-focus", 1]],
            ),
          ],
        },
        {
          id: "warlock-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "warlock-scholar",
              "Gelehrtenpaket",
              "scholars-pack",
            ),
            packOption(
              "warlock-dungeoneer",
              "Gewölbeforscherpaket",
              "dungeoneers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("leather", 1),

        item("dagger", 2),
      ],
      guaranteedPacks: [],
    },
    {
      classId: "wizard",
      choices: [
        {
          id: "wizard-weapon",
          title: "Waffe",
          options: [
            option(
              "wizard-quarterstaff",
              "Kampfstab",
              [["quarterstaff", 1]],
            ),
            option(
              "wizard-dagger",
              "Dolch",
              [["dagger", 1]],
            ),
          ],
        },
        {
          id: "wizard-focus",
          title: "Zauberfokus",
          options: [
            option(
              "wizard-component-pouch",
              "Komponententasche",
              [["component-pouch", 1]],
            ),
            option(
              "wizard-arcane-focus",
              "Arkaner Fokus",
              [["arcane-focus", 1]],
            ),
          ],
        },
        {
          id: "wizard-pack",
          title: "Ausrüstungspaket",
          options: [
            packOption(
              "wizard-scholar",
              "Gelehrtenpaket",
              "scholars-pack",
            ),
            packOption(
              "wizard-explorer",
              "Entdeckerpaket",
              "explorers-pack",
            ),
          ],
        },
      ],
      guaranteedEquipment: [
        item("spellbook", 1),
      ],
      guaranteedPacks: [],
    },
    {
  classId: "monster-hunter",

  choices: [
    {
      id: "monster-hunter-armor",
      title: "Rüstung",
      options: [
        option(
          "monster-hunter-scale-mail",
          "Schuppenpanzer",
          [["scale-mail", 1]],
        ),
        option(
          "monster-hunter-leather",
          "Lederrüstung",
          [["leather", 1]],
        ),
      ],
    },

    {
      id: "monster-hunter-primary",
      title: "Primärwaffe",
      options: [
        option(
          "monster-hunter-longsword",
          "Langschwert",
          [["longsword", 1]],
        ),
        option(
          "monster-hunter-rapier",
          "Rapier",
          [["rapier", 1]],
        ),
        option(
          "monster-hunter-greatsword",
          "Großschwert",
          [["greatsword", 1]],
        ),
      ],
    },

    {
      id: "monster-hunter-secondary",
      title: "Sekundärbewaffnung",
      options: [
        option(
          "monster-hunter-shield",
          "Schild",
          [["shield", 1]],
        ),
        option(
          "monster-hunter-light-crossbow",
          "Leichte Armbrust",
          [
            ["light-crossbow", 1],
            ["crossbow-bolts", 20],
          ],
        ),
        option(
          "monster-hunter-handaxes",
          "Zwei Handäxte",
          [["handaxe", 2]],
        ),
      ],
    },

    {
      id: "monster-hunter-pack",
      title: "Ausrüstungspaket",
      options: [
        packOption(
          "monster-hunter-dungeoneer",
          "Gewölbeforscherpaket",
          "dungeoneers-pack",
        ),
        packOption(
          "monster-hunter-explorer",
          "Entdeckerpaket",
          "explorers-pack",
        ),
      ],
    },
  ],

  guaranteedEquipment: [
    item("dagger", 1),
  ],

  guaranteedPacks: [],
},
  ];

function item(
  equipmentId: string,
  quantity: number,
): StartingEquipmentItem {
  return {
    equipmentId,
    quantity,
  };
}

function option(
  id: string,
  title: string,
  entries: Array<
    [
      equipmentId: string,
      quantity: number,
    ]
  >,
): StartingEquipmentOption {
  return {
    id,
    title,

    equipment: entries.map(
      ([equipmentId, quantity]) => ({
        equipmentId,
        quantity,
      }),
    ),
    
  };
}

function packOption(
  id: string,
  title: string,
  packId: string,
): StartingEquipmentOption {
  return {
    id,
    title,
    packIds: [packId],
  };
}

export function getStartingEquipment(draft: {classId?: string; subclassId?: string; ancestryId?: string}) {
  const config = startingEquipment.find(v => v.classId === draft.classId);
  if (config?.classId !== "cleric") return config;
  return {...config, choices:config.choices.map(c=>({...c,options:c.options.filter(o =>
    (o.id !== "cleric-chain-mail" || ["war-domain","life-domain"].includes(draft.subclassId ?? "")) &&
    (o.id !== "cleric-warhammer" || draft.subclassId === "war-domain" || draft.ancestryId === "dwarf"))}))};
}
