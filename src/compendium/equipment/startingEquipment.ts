export interface EquipmentChoice {
  id: string;

  title: string;

  options: string[];
}

export interface StartingEquipmentDefinition {
  classId: string;

  choices: EquipmentChoice[];

  guaranteedEquipment: string[];

  guaranteedPacks: string[];
}

export const startingEquipment: StartingEquipmentDefinition[] =
  [
    {
      classId: "fighter",

      choices: [
        {
          id: "fighter-primary-weapon",

          title: "Primärwaffe",

          options: [
            "longsword",
            "battleaxe",
            "warhammer",
          ],
        },
      ],

      guaranteedEquipment: [
        "shield",
      ],

      guaranteedPacks: [
        "explorers-pack",
      ],
    },
  ];