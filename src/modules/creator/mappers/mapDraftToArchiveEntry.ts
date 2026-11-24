import { weaponDamageLabel } from "../../../compendium/equipment";
import {
  ancestries,
  applyAbilityBonuses,
  getAncestryAbilityBonuses,
} from "../../../compendium/ancestries";

import {
  getBackgroundById,
} from "../../../compendium/backgrounds";

import {
  classes,
  getSubclassProficiencyPackage,
} from "../../../compendium/classes";

import {
  equipmentPacks,
  getEquipmentById,
  getStartingEquipment,
} from "../../../compendium/equipment";

import type {
  ArmorItem,
  EquipmentDefinition,
  WeaponItem,
} from "../../../compendium/equipment";

import type {
  SkillId,
} from "../../../compendium/skills";

import type {
  CharacterArchiveEntry,
  CharacterInventoryItem,
  InventoryItemCategory,
} from "../../archives/types";

import type {
  CharacterCreatorDraft,
} from "../types";
import { CURRENT_CHARACTER_SCHEMA_VERSION, resolveBackgroundInventory } from "../../../migrations/characterSchema";

import {
  calculateMaximumHitPoints,
  buildHitPointsPerLevel,
} from "../../../rules/hitPoints";

export function mapDraftToArchiveEntry(
  draft: CharacterCreatorDraft,
): CharacterArchiveEntry {
  const selectedAncestry =
    ancestries.find(
      (entry) =>
        entry.id === draft.ancestryId,
    );

  const selectedVariant =
    selectedAncestry?.variants.find(
      (entry) =>
        entry.id ===
        draft.ancestryVariantId,
    );

  const ancestryAbilityBonuses = getAncestryAbilityBonuses({
    ancestryId: draft.ancestryId,
    variantId: draft.ancestryVariantId,
    choices: draft.ancestryBonusChoices,
  });

  const effectiveAbilityScores = applyAbilityBonuses(
    draft.baseAbilities,
    ancestryAbilityBonuses.total,
  );

  const selectedBackground =
    getBackgroundById(
      draft.backgroundId,
    );

  const selectedClass =
    classes.find(
      (entry) =>
        entry.id === draft.classId,
    );

  const selectedSubclass =
    selectedClass?.subclasses.find(
      (entry) =>
        entry.id === draft.subclassId,
    );

  const subclassProficiencies = getSubclassProficiencyPackage(draft.classId, draft.subclassId, draft.level);

  const battleMasterToolId = draft.classId === "fighter" && draft.subclassId === "battle-master" && draft.level >= 3
    ? normalizeRawChoice(draft.pathChoices["battle-master-artisans-tool"])[0]
    : undefined;
  const battleMasterTool = battleMasterToolId ? getBattleMasterToolLabel(battleMasterToolId) : undefined;

  const samuraiBonusChoice = draft.classId === "fighter" && draft.subclassId === "samurai" && draft.level >= 3
    ? normalizeRawChoice(draft.pathChoices["samurai-bonus-proficiency"])[0]
    : undefined;
  const samuraiBonusSkills = samuraiBonusChoice && samuraiBonusChoice !== "language"
    ? normalizeSkillChoice(samuraiBonusChoice)
    : [];

  const ancestryLabel =
    selectedAncestry
      ? selectedVariant
        ? `${selectedAncestry.name} · ${selectedVariant.name}`
        : selectedAncestry.name
      : "Nicht festgelegt";

  const skillProficiencies =
    Array.from(
      new Set<SkillId>([
        ...(
          selectedBackground
            ?.skillProficiencies ??
          []
        ),

        ...draft.classSkillProficiencies,
        ...(subclassProficiencies?.skills ?? []),
        ...(draft.classId === "bard" && draft.subclassId === "college-of-lore" && draft.level >= 3
          ? normalizeSkillChoice(draft.pathChoices["lore-bonus-skills"])
          : []),
        ...(draft.classId === "warlock" && draft.level >= 2 && normalizeRawChoice(draft.pathChoices["warlock-invocations"]).includes("beguiling-influence")
          ? (["deception", "persuasion"] as SkillId[])
          : []),
        ...samuraiBonusSkills,
      ]),
    );

  const timestamp =
    new Date().toISOString();

  const backgroundEquipment = selectedBackground?.equipment ?? [];
  const inventoryItems =
    createStartingInventoryItems(
      draft,
      timestamp,
      backgroundEquipment,
    );
  const backgroundGold = getBackgroundStartingGold(backgroundEquipment);

  const maximumHitPoints =
    calculateMaximumHitPoints({
      classId: draft.classId,
      level: draft.level,
      constitution:
        effectiveAbilityScores.constitution,
      bonusPerLevel: buildHitPointsPerLevel(draft),
    });

  return {
    schemaVersion: CURRENT_CHARACTER_SCHEMA_VERSION,
    movementBaseVersion: 1,

    id:
      draft.id,

    fileNumber:
      draft.fileNumber,

    name:
      draft.identity.name.trim() ||
      "Unbenannte Akte",

    title:
      draft.identity.title.trim() ||
      undefined,

    pronouns:
      draft.identity.pronouns.trim() ||
      undefined,

    alignment:
      draft.identity.alignment.trim() ||
      undefined,

    ancestry:
      ancestryLabel,

    ancestryId:
      draft.ancestryId ||
      undefined,

    ancestryVariantId:
      draft.ancestryVariantId ||
      undefined,

    ancestryBonusChoices: [
      ...draft.ancestryBonusChoices,
    ],
ancestrySize:
  draft.ancestrySize,

ancestryTraitIds: [
  ...draft.ancestryTraitIds,
],

ancestryUsesReducedSpeed:
  draft.ancestryUsesReducedSpeed,

    backgroundId:
      selectedBackground?.id,

    backgroundName:
      selectedBackground?.name,

    backgroundFeature:
      selectedBackground
        ? {
            ...selectedBackground.feature,
          }
        : undefined,

    toolProficiencies:
      selectedBackground
        ? [
            ...selectedBackground.toolProficiencies,
            ...(subclassProficiencies?.tools ?? []),
            ...(battleMasterTool ? [battleMasterTool] : []),
          ]
        : [
            ...(subclassProficiencies?.tools ?? []),
            ...(battleMasterTool ? [battleMasterTool] : []),
          ],

    languageChoices:
      (selectedBackground?.languageChoices ?? 0) +
      (samuraiBonusChoice === "language" ? 1 : 0),

    className:
      selectedClass?.name ??
      "Nicht festgelegt",

    classId:
      draft.classId ||
      undefined,

    subclass:
      selectedSubclass?.name,

    subclassId:
      draft.subclassId ||
      undefined,

    pathChoices: { ...draft.pathChoices },

    level:
      draft.level,

    skillProficiencies,

    skillExpertise: Array.from(new Set<SkillId>([
      ...draft.skillExpertise,
      ...normalizeSkillChoice(draft.pathChoices["bard-expertise"]),
      ...normalizeSkillChoice(draft.pathChoices["rogue-expertise"]),
    ])),

    baseAbilityScores: {
      ...draft.baseAbilities,
    },

    abilityScores: effectiveAbilityScores,

    vitals: {
      maximumHitPoints,
      currentHitPoints: maximumHitPoints,
      temporaryHitPoints: 0,
      armorClass:
        draft.classId === "sorcerer" && draft.subclassId === "draconic-bloodline"
          ? 13 + Math.floor((effectiveAbilityScores.dexterity - 10) / 2)
          : 10,

      initiativeModifier:
        Math.floor((effectiveAbilityScores.dexterity - 10) / 2) +
        (draft.classId === "ranger" && draft.subclassId === "gloom-stalker" && draft.level >= 3
          ? Math.floor((effectiveAbilityScores.wisdom - 10) / 2)
          : 0),

      speed:
        draft.ancestryUsesReducedSpeed
          ? 7.5
          : (selectedAncestry?.speed ?? 9) + (selectedVariant?.speedBonus ?? 0),
    },

    inventory: {
      items:
        inventoryItems,

      currency: {
        copper: 0,
        silver: 0,
        gold: backgroundGold,
      },
    },

    spellcasting:
      cloneDraftSpellcasting(
        draft,
      ),

    equipmentIds:
      inventoryItems.map(
        (item) =>
          item.id,
      ),

    startingEquipmentSelections: draft.startingEquipmentSelections.map((selection) => ({ ...selection })),

    spentClassResources: {},
    spentHitDice: 0,
    inspiration: false,

    summary:
      draft.identity.summary.trim() ||
      "Noch keine Beschreibung vorhanden.",

    status:
      "draft",

    createdAt:
      draft.createdAt,

    updatedAt:
      timestamp,

    transformation:
      draft.transformationId ||
      undefined,

    transformationId:
  draft.transformationId || undefined,

transformationStage:
  draft.transformationId
    ? draft.transformationStage
    : undefined,

transformationFeatureIds:
  draft.transformationId
    ? [...draft.transformationFeatureIds]
    : [],
};
}

function cloneDraftSpellcasting(
  draft: CharacterCreatorDraft,
): NonNullable<
  CharacterArchiveEntry["spellcasting"]
> {
  return {
    spellIds: draft.spellcasting.spellIds.map((selection) => ({ ...selection })),

    slots: {
      spentSlots: {
        ...draft
          .spellcasting
          .slots
          .spentSlots,
      },

      spentPactSlots:
        draft
          .spellcasting
          .slots
          .spentPactSlots,
    },
  };
}

interface InventorySourceEntry {
  equipmentId: string;
  quantity: number;
}

function createStartingInventoryItems(
  draft: CharacterCreatorDraft,
  timestamp: string,
  backgroundEquipment: string[],
): CharacterInventoryItem[] {
  const configuration =
    getStartingEquipment(draft);

  if (!configuration) {
    return resolveBackgroundInventory(backgroundEquipment, timestamp);
  }

  const selectedEntries:
    InventorySourceEntry[] =
      draft
        .startingEquipmentSelections
        .filter((selection,index,list)=>list.findIndex(s=>s.choiceId===selection.choiceId)===index)
        .flatMap(
          (selection) => {
            const choice =
              configuration
                .choices
                .find(
                  (entry) =>
                    entry.id ===
                    selection.choiceId,
                );

            const option =
              choice?.options.find(
                (entry) =>
                  entry.id ===
                  selection.optionId,
              );

            if (!option) {
              return [];
            }

            const directEntries =
              option.equipment ?? [];

            const packEntries =
              (
                option.packIds ??
                []
              ).flatMap(
                (packId) => {
                  const pack =
                    equipmentPacks.find(
                      (entry) =>
                        entry.id ===
                        packId,
                    );

                  return (
                    pack?.items ??
                    []
                  );
                },
              );

            return [
              ...directEntries,
              ...packEntries,
            ];
          },
        );

  const guaranteedEntries:
    InventorySourceEntry[] =
      configuration
        .guaranteedEquipment;

  const guaranteedPackEntries:
    InventorySourceEntry[] =
      configuration
        .guaranteedPacks
        .flatMap(
          (packId) => {
            const pack =
              equipmentPacks.find(
                (entry) =>
                  entry.id ===
                  packId,
              );

            return (
              pack?.items ??
              []
            );
          },
        );

  const combinedEntries =
    mergeEquipmentEntries([
      ...selectedEntries,
      ...guaranteedEntries,
      ...guaranteedPackEntries,
    ]);

  const classItems = combinedEntries.flatMap(
    (entry) => {
      const definition =
        getEquipmentById(
          entry.equipmentId,
        );

      if (!definition) {
        return [];
      }

      return [
        createInventoryItem(
          definition,
          entry.quantity,
          timestamp,
        ),
      ];
    },
  );

  const backgroundItems = resolveBackgroundInventory(backgroundEquipment, timestamp);
  const consolidated = new Map(classItems.map(item=>[item.id,item]));
  for (const item of backgroundItems) {
    const prior=consolidated.get(item.id);
    consolidated.set(item.id,prior ? {...prior,quantity:prior.quantity+item.quantity}:item);
  }
  return [...consolidated.values()];
}

function getBackgroundStartingGold(labels: string[]): number {
  return labels.reduce((total, label) => total + (parseBackgroundGold(label) ?? 0), 0);
}

function parseBackgroundGold(label: string): number | undefined {
  const match = label.trim().match(/^(\d+)\s*(?:GM|GP)$/i);
  return match ? Number(match[1]) : undefined;
}


function mergeEquipmentEntries(
  entries: InventorySourceEntry[],
): InventorySourceEntry[] {
  const quantities =
    new Map<string, number>();

  for (const entry of entries) {
    const safeQuantity =
      Math.max(
        1,
        Math.floor(
          entry.quantity,
        ),
      );

    const currentQuantity =
      quantities.get(
        entry.equipmentId,
      ) ?? 0;

    quantities.set(
      entry.equipmentId,

      currentQuantity +
        safeQuantity,
    );
  }

  return Array.from(
    quantities.entries(),

    (
      [
        equipmentId,
        quantity,
      ],
    ) => ({
      equipmentId,
      quantity,
    }),
  );
}

function createInventoryItem(
  definition: EquipmentDefinition,
  quantity: number,
  timestamp: string,
): CharacterInventoryItem {
  return {
    id:
      definition.id,

    name:
      definition.name,

    category:
      mapInventoryCategory(
        definition,
      ),

    quantity,

    weight:
      poundsToKilograms(
        definition.weight,
      ),

    equipped:
      false,

    notes:
      createEquipmentNotes(
        definition,
      ),

    createdAt:
      timestamp,

    updatedAt:
      timestamp,
  };
}

function mapInventoryCategory(
  definition: EquipmentDefinition,
): InventoryItemCategory {
  switch (definition.category) {
    case "weapon":
      return "weapon";

    case "armor":
    case "shield":
      return "armor";

    case "consumable":
    case "ammunition":
      return "consumable";

    case "tool":
      return "tool";

    case "focus":
    case "gear":
    default:
      return "adventuring-gear";
  }
}

function createEquipmentNotes(
  definition: EquipmentDefinition,
): string {
  if (
    definition.category ===
    "weapon"
  ) {
    return createWeaponNotes(
      definition,
    );
  }

  if (
    definition.category ===
      "armor" ||
    definition.category ===
      "shield"
  ) {
    return createArmorNotes(
      definition,
    );
  }

  return (
    definition.description ??
    "Teil der Startausrüstung."
  );
}

function createWeaponNotes(
  weapon: WeaponItem,
): string {
  const notes: string[] = [
    weaponDamageLabel(weapon.damage,getDamageTypeLabel(weapon.damage.type)),
  ];

  if (weapon.versatile) {
    notes.push(
      `Vielseitig: ${weapon.versatile.dice}W${weapon.versatile.die}`,
    );
  }

  if (weapon.range) {
    notes.push(
      weapon.range.long
        ? `Reichweite: ${weapon.range.normal}/${weapon.range.long} ft`
        : `Reichweite: ${weapon.range.normal} ft`,
    );
  }

  if (
    weapon.properties.length > 0
  ) {
    notes.push(
      weapon.properties
        .map(
          getWeaponPropertyLabel,
        )
        .join(", "),
    );
  }

  return notes.join(" · ");
}

function createArmorNotes(
  armor: ArmorItem,
): string {
  const notes: string[] = [];

  if (
    armor.category ===
    "shield"
  ) {
    notes.push(
      `Rüstungsklasse +${armor.armorClass}`,
    );
  } else {
    notes.push(
      `Rüstungsklasse ${armor.armorClass}`,
    );
  }

  if (
    armor.dexterityModifier
  ) {
    notes.push(
      typeof armor
        .maximumDexterityBonus ===
        "number"
        ? `GE-Bonus bis +${armor.maximumDexterityBonus}`
        : "Voller GE-Bonus",
    );
  } else {
    notes.push(
      "Kein GE-Bonus",
    );
  }

  if (
    armor.strengthRequirement
  ) {
    notes.push(
      `Mindeststärke ${armor.strengthRequirement}`,
    );
  }

  if (
    armor.stealthDisadvantage
  ) {
    notes.push(
      "Nachteil auf Heimlichkeit",
    );
  }

  return notes.join(" · ");
}

function getDamageTypeLabel(
  damageType:
    | "slashing"
    | "piercing"
    | "bludgeoning",
): string {
  switch (damageType) {
    case "slashing":
      return "Hieb";

    case "piercing":
      return "Stich";

    case "bludgeoning":
      return "Wucht";
  }
}

function getWeaponPropertyLabel(
  property:
    | "light"
    | "heavy"
    | "finesse"
    | "two-handed"
    | "versatile"
    | "reach"
    | "thrown"
    | "loading"
    | "ammunition",
): string {
  switch (property) {
    case "light":
      return "Leicht";

    case "heavy":
      return "Schwer";

    case "finesse":
      return "Finesse";

    case "two-handed":
      return "Zweihändig";

    case "versatile":
      return "Vielseitig";

    case "reach":
      return "Reichweite";

    case "thrown":
      return "Geworfen";

    case "loading":
      return "Laden";

    case "ammunition":
      return "Munition";
  }
}
export function getStoredAncestrySpeed(
  entry: CharacterArchiveEntry,
): number {
  return (
    entry.vitals?.speed ??
    9
  );
}

export function getStoredTraitCount(
  entry: CharacterArchiveEntry,
): number {
  return (
    entry.ancestryTraitIds
      ?.length ?? 0
  );
}
function poundsToKilograms(
  pounds: number,
): number {
  const kilograms =
    pounds * 0.45359237;

  return Number(
    kilograms.toFixed(2),
  );
}

function getBattleMasterToolLabel(id: string): string | undefined {
  const labels: Record<string, string> = {
    "alchemist-supplies": "Alchemistenausrüstung",
    "brewer-supplies": "Brauerwerkzeug",
    "calligrapher-supplies": "Kalligrafenwerkzeug",
    "carpenter-tools": "Zimmermannswerkzeug",
    "cartographer-tools": "Kartografenwerkzeug",
    "cobbler-tools": "Schusterwerkzeug",
    "cook-utensils": "Kochutensilien",
    "glassblower-tools": "Glasbläserwerkzeug",
    "jeweler-tools": "Juwelierwerkzeug",
    "leatherworker-tools": "Ledererwerkzeug",
    "mason-tools": "Maurerwerkzeug",
    "painter-supplies": "Malerbedarf",
    "potter-tools": "Töpferwerkzeug",
    "smith-tools": "Schmiedewerkzeug",
    "tinker-tools": "Tüftlerwerkzeug",
    "weaver-tools": "Weberwerkzeug",
    "woodcarver-tools": "Holzschnitzerwerkzeug",
  };
  return labels[id];
}

function normalizeRawChoice(value: import("../../../compendium/classes").CharacterPathChoiceValue | undefined): string[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function normalizeSkillChoice(value: import("../../../compendium/classes").CharacterPathChoiceValue | undefined): SkillId[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  const allowed = new Set<SkillId>([
    "acrobatics", "animal-handling", "arcana", "athletics", "deception", "history",
    "insight", "intimidation", "investigation", "medicine", "nature", "perception",
    "performance", "persuasion", "religion", "sleight-of-hand", "stealth", "survival",
  ]);
  return values.filter((value): value is SkillId => allowed.has(value as SkillId));
}
