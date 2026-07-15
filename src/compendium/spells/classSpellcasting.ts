import type {
  ClassSpellcastingDefinition,
  PactSpellSlots,
  SpellSlots,
} from "./types";

export const classSpellcastingDefinitions:
  ClassSpellcastingDefinition[] = [
    {
      classId: "bard",

      abilityId: "charisma",

      progression: "full",

      preparationMode: "known",

      ritualCasting: true,

      focusLabel: "Musikinstrument",

      cantripsKnownByLevel: [
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
      ],

      spellsKnownByLevel: [
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        14,
        15,
        15,
        16,
        18,
        19,
        19,
        20,
        22,
        22,
        22,
      ],
    },

    {
      classId: "cleric",

      abilityId: "wisdom",

      progression: "full",

      preparationMode: "prepared",

      ritualCasting: true,

      focusLabel: "Heiliges Symbol",

      cantripsKnownByLevel: [
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
      ],

      preparedSpellFormula:
        "ability-plus-level",

      minimumPreparedSpells: 1,
    },

    {
      classId: "druid",

      abilityId: "wisdom",

      progression: "full",

      preparationMode: "prepared",

      ritualCasting: true,

      focusLabel: "Druidischer Fokus",

      cantripsKnownByLevel: [
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
      ],

      preparedSpellFormula:
        "ability-plus-level",

      minimumPreparedSpells: 1,
    },

    {
      classId: "paladin",

      abilityId: "charisma",

      progression: "half",

      preparationMode: "prepared",

      ritualCasting: false,

      focusLabel: "Heiliges Symbol",

      cantripsKnownByLevel: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],

      preparedSpellFormula:
        "ability-plus-half-level",

      minimumPreparedSpells: 1,
    },

    {
      classId: "ranger",

      abilityId: "wisdom",

      progression: "half",

      preparationMode: "known",

      ritualCasting: false,

      focusLabel:
        "Druidischer Fokus oder Komponententasche",

      cantripsKnownByLevel: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],

      spellsKnownByLevel: [
        0,
        2,
        3,
        3,
        4,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        8,
        8,
        9,
        9,
        10,
        10,
        11,
        11,
      ],
    },

    {
      classId: "sorcerer",

      abilityId: "charisma",

      progression: "full",

      preparationMode: "known",

      ritualCasting: false,

      focusLabel: "Arkaner Fokus",

      cantripsKnownByLevel: [
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
      ],

      spellsKnownByLevel: [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        12,
        13,
        13,
        14,
        14,
        15,
        15,
        15,
        15,
      ],
    },

    {
      classId: "warlock",

      abilityId: "charisma",

      progression: "pact",

      preparationMode: "pact",

      ritualCasting: false,

      focusLabel: "Arkaner Fokus",

      cantripsKnownByLevel: [
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4,
      ],

      spellsKnownByLevel: [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        10,
        11,
        11,
        12,
        12,
        13,
        13,
        14,
        14,
        15,
        15,
      ],
    },

    {
      classId: "wizard",

      abilityId: "intelligence",

      progression: "full",

      preparationMode: "spellbook",

      ritualCasting: true,

      focusLabel:
        "Arkaner Fokus oder Komponententasche",

      cantripsKnownByLevel: [
        3,
        3,
        3,
        4,
        4,
        4,
        4,
        4,
        4,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
      ],

      preparedSpellFormula:
        "ability-plus-level",

      minimumPreparedSpells: 1,
    },
  ];

export function getClassSpellcasting(
  classId: string,
): ClassSpellcastingDefinition | undefined {
  return classSpellcastingDefinitions.find(
    (entry) =>
      entry.classId === classId,
  );
}

export function getCantripsKnown(
  classId: string,
  classLevel: number,
): number {
  const definition =
    getClassSpellcasting(classId);

  if (!definition) {
    return 0;
  }

  return getLevelArrayValue(
    definition.cantripsKnownByLevel,
    classLevel,
  );
}

export function getSpellsKnown(
  classId: string,
  classLevel: number,
): number | null {
  const definition =
    getClassSpellcasting(classId);

  if (
    !definition ||
    !definition.spellsKnownByLevel
  ) {
    return null;
  }

  return getLevelArrayValue(
    definition.spellsKnownByLevel,
    classLevel,
  );
}

export function getSpellSlotsForClassLevel(
  classId: string,
  classLevel: number,
): SpellSlots {
  const definition =
    getClassSpellcasting(classId);

  if (!definition) {
    return {};
  }

  switch (definition.progression) {
    case "full":
      return getFullCasterSlots(
        classLevel,
      );

    case "half":
      return getHalfCasterSlots(
        classLevel,
      );

    case "pact":
      return {};
  }
}

export function getPactSpellSlotsForClassLevel(
  classId: string,
  classLevel: number,
): PactSpellSlots | null {
  const definition =
    getClassSpellcasting(classId);

  if (
    !definition ||
    definition.progression !== "pact"
  ) {
    return null;
  }

  return getWarlockPactSlots(
    classLevel,
  );
}

export function getMaximumSpellLevel(
  classId: string,
  classLevel: number,
): number {
  const pactSlots =
    getPactSpellSlotsForClassLevel(
      classId,
      classLevel,
    );

  if (pactSlots) {
    return pactSlots.slotLevel;
  }

  const slots =
    getSpellSlotsForClassLevel(
      classId,
      classLevel,
    );

  const availableLevels =
    Object.entries(slots)
      .filter(
        ([, amount]) =>
          typeof amount === "number" &&
          amount > 0,
      )
      .map(([level]) => Number(level));

  return availableLevels.length > 0
    ? Math.max(...availableLevels)
    : 0;
}

function getLevelArrayValue(
  values: number[],
  classLevel: number,
): number {
  const safeLevel = Math.max(
    1,
    Math.min(
      20,
      Math.floor(classLevel),
    ),
  );

  return values[safeLevel - 1] ?? 0;
}

function getFullCasterSlots(
  classLevel: number,
): SpellSlots {
  const progression: SpellSlots[] = [
    { 1: 2 },
    { 1: 3 },
    { 1: 4, 2: 2 },
    { 1: 4, 2: 3 },
    { 1: 4, 2: 3, 3: 2 },
    { 1: 4, 2: 3, 3: 3 },
    { 1: 4, 2: 3, 3: 3, 4: 1 },
    { 1: 4, 2: 3, 3: 3, 4: 2 },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 3,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 3,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 3,
      6: 2,
      7: 2,
      8: 1,
      9: 1,
    },
  ];

  return getProgressionEntry(
    progression,
    classLevel,
  );
}

function getHalfCasterSlots(
  classLevel: number,
): SpellSlots {
  const progression: SpellSlots[] = [
    {},
    { 1: 2 },
    { 1: 3 },
    { 1: 3 },
    { 1: 4, 2: 2 },
    { 1: 4, 2: 2 },
    { 1: 4, 2: 3 },
    { 1: 4, 2: 3 },
    { 1: 4, 2: 3, 3: 2 },
    { 1: 4, 2: 3, 3: 2 },
    { 1: 4, 2: 3, 3: 3 },
    { 1: 4, 2: 3, 3: 3 },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 2,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 2,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 1,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
    },
    {
      1: 4,
      2: 3,
      3: 3,
      4: 3,
      5: 2,
    },
  ];

  return getProgressionEntry(
    progression,
    classLevel,
  );
}

function getWarlockPactSlots(
  classLevel: number,
): PactSpellSlots {
  const safeLevel = Math.max(
    1,
    Math.min(
      20,
      Math.floor(classLevel),
    ),
  );

  if (safeLevel === 1) {
    return {
      slotLevel: 1,
      slots: 1,
    };
  }

  if (safeLevel === 2) {
    return {
      slotLevel: 1,
      slots: 2,
    };
  }

  if (safeLevel <= 4) {
    return {
      slotLevel: 2,
      slots: 2,
    };
  }

  if (safeLevel <= 6) {
    return {
      slotLevel: 3,
      slots: 2,
    };
  }

  if (safeLevel <= 8) {
    return {
      slotLevel: 4,
      slots: 2,
    };
  }

  if (safeLevel <= 10) {
    return {
      slotLevel: 5,
      slots: 2,
    };
  }

  if (safeLevel <= 16) {
    return {
      slotLevel: 5,
      slots: 3,
    };
  }

  return {
    slotLevel: 5,
    slots: 4,
  };
}

function getProgressionEntry(
  progression: SpellSlots[],
  classLevel: number,
): SpellSlots {
  const safeLevel = Math.max(
    1,
    Math.min(
      20,
      Math.floor(classLevel),
    ),
  );

  return {
    ...(
      progression[
        safeLevel - 1
      ] ?? {}
    ),
  };
}