import { ChapterHeader } from "../../components/ui/ChapterHeader";
import { GrimButton } from "../../components/ui/GrimButton";
import { PaperPage } from "../../components/ui/PaperPage";

import {
  getClassSkillChoice,
} from "../../compendium/classes/skillChoices";

import {
  getCharacterPathChoices,
  getClassSubclassUnlockLevel,
  getSubclassById,
  getSubclassUnlockLevel,
  isCharacterPathChoiceComplete,
} from "../../compendium/classes";

import {
  getAncestryById,
} from "../../compendium/ancestries";

import { getBackgroundById } from "../../compendium/backgrounds";

import {
  getStartingEquipment,
} from "../../compendium/equipment";

import {
  getTransformationById,
  isTransformationSelectionComplete,
} from "../../compendium/transformations";

import { CharacterCreatorLayout } from "./components/CharacterCreatorLayout";
import { CharacterRecordPreview } from "./components/CharacterRecordPreview";
import { CreatorStepNavigation } from "./components/CreatorStepNavigation";

import { AbilitiesStep } from "./components/steps/AbilitiesStep";
import { AncestryStep } from "./components/steps/AncestryStep";
import { BackgroundStep } from "./components/steps/BackgroundStep";
import { ClassStep } from "./components/steps/ClassStep";
import { EquipmentStep } from "./components/steps/EquipmentStep";
import { IdentityStep } from "./components/steps/IdentityStep";
import { SkillsStep } from "./components/steps/SkillsStep";

import {
  SpellsStep,
} from "./components/steps/SpellStep";

import {
  TransformationStep,
} from "./components/steps/TransformationStep";

import {
  mapDraftToArchiveEntry,
} from "./mappers/mapDraftToArchiveEntry";

import {
  mergeEditedCharacter,
} from "./mappers/mergeEditedCharacter";

import {
  useCharacterCreator,
} from "./useCharacterCreator";

import {
  validateSpellSelection,
} from "./utils/getSpellSelectionRules";

import type {
  CharacterArchiveEntry,
} from "../archives/types";

import type {
  CharacterCreatorDraft,
  CharacterIdentityDraft,
  CreatorStepId,
} from "./types";

interface CharacterCreatorProps {
  fileNumber: string;

  initialDraft?: CharacterCreatorDraft;
  initialCharacter?: CharacterArchiveEntry;

  onCancel: () => void;

  onFinished: (
    character: CharacterArchiveEntry,
  ) => void;
}

const pointBuyCosts: Record<
  number,
  number
> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

function normalizePathChoiceValues(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function CharacterCreator({
  fileNumber,
  initialDraft,
  initialCharacter,
  onCancel,
  onFinished,
}: CharacterCreatorProps) {
  const creator =
    useCharacterCreator({
      fileNumber,
      initialDraft,
    });

  const generatedCharacter =
    mapDraftToArchiveEntry(
      creator.draft,
    );
  const previewCharacter = initialCharacter ? mergeEditedCharacter(generatedCharacter, initialCharacter) : generatedCharacter;
  const retainedScores = initialDraft && Object.entries(initialDraft.baseAbilities).every(
    ([id, value]) => creator.draft.baseAbilities[id as keyof typeof initialDraft.baseAbilities] === value,
  );

  const isEditing =
    Boolean(initialDraft);

  const isFirstStep =
    creator.draft.currentStep ===
    "identity";

  const isLastStep =
    creator.draft.currentStep ===
    "summary";

  function handleIdentityChange(
    identity: CharacterIdentityDraft,
  ) {
    creator.updateDraft(
      (draft) => ({
        ...draft,
        identity,
      }),
    );
  }

  function handleSealRecord() {
    const name =
      creator.draft.identity.name.trim();

    if (!name) {
      window.alert(
        "Die Akte kann ohne einen Namen nicht besiegelt werden.",
      );

      creator.setCurrentStep(
        "identity",
      );

      return;
    }

    if (!creator.draft.ancestryId) {
      window.alert(
        "Wähle zuerst eine Abstammung.",
      );

      creator.setCurrentStep(
        "ancestry",
      );

      return;
    }


    const selectedAncestry = getAncestryById(creator.draft.ancestryId);

    if (
      selectedAncestry?.variants.length &&
      !creator.draft.ancestryVariantId
    ) {
      window.alert("Wähle zuerst eine Abstammungsvariante.");
      creator.setCurrentStep("ancestry");
      return;
    }

    if (
      selectedAncestry?.abilityBonusChoice &&
      creator.draft.ancestryBonusChoices.length !==
        selectedAncestry.abilityBonusChoice.choose
    ) {
      window.alert(
        `Wähle genau ${selectedAncestry.abilityBonusChoice.choose} freie Attributsboni.`,
      );
      creator.setCurrentStep("ancestry");
      return;
    }

    if (!creator.draft.backgroundId) {
      window.alert(
        "Wähle zuerst einen Hintergrund.",
      );

      creator.setCurrentStep(
        "background",
      );

      return;
    }

    if (!creator.draft.classId) {
      window.alert(
        "Wähle zuerst eine Klasse.",
      );

      creator.setCurrentStep(
        "class",
      );

      return;
    }

    const subclassUnlockLevel = getClassSubclassUnlockLevel(creator.draft.classId);
    const subclassRequired = typeof subclassUnlockLevel === "number" && creator.draft.level >= subclassUnlockLevel;

    if (subclassRequired && !creator.draft.subclassId) {
      window.alert(
        `Wähle für Stufe ${creator.draft.level} zuerst eine Unterklasse.`,
      );
      creator.setCurrentStep("class");
      return;
    }

    if (creator.draft.subclassId) {
      const selectedSubclass = getSubclassById(creator.draft.classId, creator.draft.subclassId);
      const selectedSubclassUnlockLevel = getSubclassUnlockLevel(creator.draft.classId, creator.draft.subclassId);

      if (!selectedSubclass || (selectedSubclassUnlockLevel && creator.draft.level < selectedSubclassUnlockLevel)) {
        window.alert("Die gewählte Unterklasse ist auf dieser Stufe nicht verfügbar.");
        creator.setCurrentStep("class");
        return;
      }
    }

    const requiredPathChoices = getCharacterPathChoices(
      creator.draft.classId,
      creator.draft.subclassId || undefined,
      creator.draft.level,
      creator.draft.pathChoices,
    );

    const incompletePathChoice = requiredPathChoices.find(
      (definition) => !isCharacterPathChoiceComplete(
        definition,
        creator.draft.pathChoices[definition.id],
      ),
    );

    if (incompletePathChoice) {
      window.alert(
        `Vervollständige zuerst die Klassenentscheidung „${incompletePathChoice.name}“.`,
      );
      creator.setCurrentStep("class");
      return;
    }

    const classSkillChoice =
      getClassSkillChoice(
        creator.draft.classId,
      );

    if (classSkillChoice) {
      const selectedClassSkills = creator.draft.classSkillProficiencies;
      const validClassSkills =
        selectedClassSkills.length === classSkillChoice.choose &&
        new Set(selectedClassSkills).size === selectedClassSkills.length &&
        selectedClassSkills.every((skillId) => classSkillChoice.options.includes(skillId));

      if (!validClassSkills) {
        window.alert(
          `Wähle genau ${classSkillChoice.choose} gültige Klassenfertigkeiten.`,
        );

        creator.setCurrentStep(
          "skills",
        );

        return;
      }
    }

    const expertiseChoiceId = creator.draft.classId === "bard" && creator.draft.level >= 3
      ? "bard-expertise"
      : creator.draft.classId === "rogue"
        ? "rogue-expertise"
        : undefined;
    if (expertiseChoiceId) {
      const rawExpertise = creator.draft.pathChoices[expertiseChoiceId];
      const expertiseIds = Array.isArray(rawExpertise) ? rawExpertise : rawExpertise ? [rawExpertise] : [];
      const backgroundSkills = getBackgroundById(creator.draft.backgroundId)?.skillProficiencies ?? [];
      const loreBonusSkills =
        creator.draft.classId === "bard" &&
        creator.draft.subclassId === "college-of-lore" &&
        creator.draft.level >= 3
          ? normalizePathChoiceValues(creator.draft.pathChoices["lore-bonus-skills"])
          : [];
      const proficientSkills = new Set([
        ...backgroundSkills,
        ...creator.draft.classSkillProficiencies,
        ...loreBonusSkills,
      ]);
      const invalidExpertise = expertiseIds.find((id) => id !== "thieves-tools" && !proficientSkills.has(id as never));
      const rogueToolCount = expertiseIds.filter((id) => id === "thieves-tools").length;
      if (invalidExpertise || (creator.draft.classId === "bard" && rogueToolCount > 0)) {
        window.alert("Expertise kann nur für Fertigkeiten gewählt werden, in denen du bereits geübt bist.");
        creator.setCurrentStep("class");
        return;
      }
    }

    const spentAbilityPoints =
      Object.values(
        creator.draft.baseAbilities,
      ).reduce(
        (total, value) =>
          total +
          (
            pointBuyCosts[value] ??
            Number.POSITIVE_INFINITY
          ),
        0,
      );

    if (!retainedScores && spentAbilityPoints !== 27) {
      window.alert(
        "Verteile im Point-Buy-System genau 27 Punkte.",
      );

      creator.setCurrentStep(
        "abilities",
      );

      return;
    }

    const equipmentConfiguration =
      getStartingEquipment(creator.draft);

    const unchangedLegacyKit = initialCharacter?.inventory && !initialCharacter.startingEquipmentSelections?.length &&
      initialDraft?.classId === creator.draft.classId && initialDraft?.backgroundId === creator.draft.backgroundId &&
      JSON.stringify(initialDraft?.startingEquipmentSelections) === JSON.stringify(creator.draft.startingEquipmentSelections);
    if (equipmentConfiguration && !unchangedLegacyKit) {
      const completedEquipmentChoices =
        equipmentConfiguration
          .choices
          .filter(
            (choice) =>
              creator.draft
                .startingEquipmentSelections
                .some(
                  (selection) =>
                    selection.choiceId === choice.id && choice.options.some(o => o.id === selection.optionId),
                ),
          )
          .length;

      if (
        completedEquipmentChoices !==
        equipmentConfiguration
          .choices
          .length
      ) {
        window.alert(
          "Treffe zuerst alle Entscheidungen zur Startausrüstung.",
        );

        creator.setCurrentStep(
          "equipment",
        );

        return;
      }
    }

    const spellValidation =
      validateSpellSelection({
        classId:
          creator.draft.classId,

        subclassId:
          creator.draft.subclassId || undefined,

        pathChoices:
          creator.draft.pathChoices,

        level:
          creator.draft.level,

        abilityScores:
          previewCharacter.abilityScores ?? creator.draft.baseAbilities,

        spellcasting:
          creator.draft.spellcasting,
      });

    if (!spellValidation.valid) {
      window.alert(
        spellValidation.message ??
          "Vervollständige zuerst die Zauberauswahl.",
      );

      creator.setCurrentStep(
        "spells",
      );

      return;
    }

    if (creator.draft.classId === "warlock" && creator.draft.level >= 2) {
      const rawInvocations = creator.draft.pathChoices["warlock-invocations"];
      const invocations = Array.isArray(rawInvocations) ? rawInvocations : rawInvocations ? [rawInvocations] : [];
      const requiresEldritchBlast = invocations.some((id) => ["agonizing-blast", "eldritch-spear", "repelling-blast"].includes(id));
      if (requiresEldritchBlast && !creator.draft.spellcasting.spellIds.some((selection) => selection.spellId === "eldritch-blast")) {
        window.alert("Qualvoller Strahl, Unheimlicher Speer und Abstoßender Strahl setzen den Zaubertrick Unheimlicher Strahl voraus.");
        creator.setCurrentStep("spells");
        return;
      }
    }

    if (
      creator.draft.transformationId
    ) {
      const transformation =
        getTransformationById(
          creator.draft
            .transformationId,
        );

      if (!transformation) {
        window.alert(
          "Die gewählte Transformation konnte nicht gefunden werden.",
        );

        creator.setCurrentStep(
          "transformation",
        );

        return;
      }

      const transformationComplete =
        isTransformationSelectionComplete({
          transformation,

          currentStage:
            creator.draft
              .transformationStage,

          selectedFeatureIds:
            creator.draft
              .transformationFeatureIds,
        });

      if (!transformationComplete) {
        window.alert(
          "Vervollständige zuerst alle erforderlichen Gaben und Makel der Transformation.",
        );

        creator.setCurrentStep(
          "transformation",
        );

        return;
      }
    }

    const sealedCharacter: CharacterArchiveEntry =
      initialCharacter
        ? previewCharacter
        : {
            ...previewCharacter,
            status: "active",
            updatedAt: new Date().toISOString(),
          };

    creator.clearDraft();
    onFinished(
      sealedCharacter,
    );
  }

  function renderCurrentStep(
    stepId: CreatorStepId,
  ) {
    switch (stepId) {
      case "identity":
        return (
          <IdentityStep
            value={
              creator.draft.identity
            }
            onChange={
              handleIdentityChange
            }
          />
        );

      case "ancestry":
        return (
          <AncestryStep
            selectedId={
              creator.draft
                .ancestryId
            }
            selectedSize={
              creator.draft
                .ancestrySize
            }
            selectedVariantId={creator.draft.ancestryVariantId}
            selectedBonusChoices={creator.draft.ancestryBonusChoices}
            selectedTraitIds={
              creator.draft
                .ancestryTraitIds
            }
            usesReducedSpeed={
              creator.draft
                .ancestryUsesReducedSpeed
            }
            onSelect={(
              ancestryId,
              ancestrySize,
              ancestryTraitIds,
              ancestryVariantId,
            ) =>
              creator.updateDraft(
                (draft) => ancestryId === draft.ancestryId ? draft : ({
                  ...draft,

                  ancestryId,
                  ancestrySize,
                  ancestryTraitIds,

                  ancestryUsesReducedSpeed:
                    false,

                  ancestryVariantId,

                  ancestryBonusChoices:
                    [],
                }),
              )
            }
            onVariantChange={(ancestryVariantId) =>
              creator.updateDraft((draft) => ancestryVariantId === draft.ancestryVariantId ? draft : ({
                ...draft,
                ancestryVariantId,
                ancestryBonusChoices: [],
              }))
            }
            onBonusChoicesChange={(ancestryBonusChoices) =>
              creator.updateDraft((draft) => ({
                ...draft,
                ancestryBonusChoices,
              }))
            }
            onSizeChange={(
              ancestrySize,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  ancestrySize,
                }),
              )
            }
            onTraitIdsChange={(
              ancestryTraitIds,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  ancestryTraitIds,
                }),
              )
            }
            onReducedSpeedChange={(
              ancestryUsesReducedSpeed,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  ancestryUsesReducedSpeed,
                }),
              )
            }
          />
        );

      case "background":
        return (
          <BackgroundStep
            selectedBackgroundId={
              creator.draft
                .backgroundId
            }
            onSelectBackground={(
              backgroundId,
            ) =>
              creator.updateDraft(
                (draft) => backgroundId === draft.backgroundId ? draft : ({
                  ...draft,

                  backgroundId,

                  classSkillProficiencies:
                    [],
                }),
              )
            }
          />
        );

      case "class":
        return (
          <ClassStep
            existingLevel={initialCharacter?.level}
            selectedClassId={
              creator.draft.classId
            }
            selectedSubclassId={
              creator.draft
                .subclassId
            }
            level={creator.draft.level}
            pathChoices={creator.draft.pathChoices}
            onSelectClass={(
              classId,
            ) =>
              creator.updateDraft(
                (draft) => classId === draft.classId ? draft : ({
                  ...draft,

                  classId,

                  subclassId: "",
                  pathChoices: {},
                  skillExpertise: [],

                  classSkillProficiencies:
                    [],

                  startingEquipmentSelections:
                    [],

                  spellcasting: {
                    spellIds: [],

                    slots: {
                      spentSlots: {},
                      spentPactSlots: 0,
                    },
                  },
                }),
              )
            }
            onChangeLevel={(level) =>
              creator.updateDraft((draft) => {
                if (level === draft.level || initialCharacter) return draft;
                const currentUnlockLevel = draft.subclassId
                  ? getSubclassUnlockLevel(draft.classId, draft.subclassId)
                  : undefined;
                const keepSubclass = !currentUnlockLevel || level >= currentUnlockLevel;

                return {
                  ...draft,
                  level,
                  subclassId: keepSubclass ? draft.subclassId : "",
                  pathChoices: Object.fromEntries(
                    Object.entries(draft.pathChoices).filter(([choiceId]) =>
                      getCharacterPathChoices(
                        draft.classId,
                        keepSubclass ? draft.subclassId || undefined : undefined,
                        level,
                        draft.pathChoices,
                      ).some((definition) => definition.id === choiceId),
                    ),
                  ),
                  spellcasting: {
                    spellIds: [],
                    slots: { spentSlots: {}, spentPactSlots: 0 },
                  },
                };
              })
            }
            onSelectSubclass={(
              subclassId,
            ) =>
              creator.updateDraft(
                (draft) => subclassId === draft.subclassId ? draft : ({
                  ...draft,
                  subclassId,
                  pathChoices: Object.fromEntries(
                    Object.entries(draft.pathChoices).filter(([choiceId]) =>
                      getCharacterPathChoices(draft.classId, undefined, draft.level).some((definition) => definition.id === choiceId),
                    ),
                  ),
                }),
              )
            }
            onChangePathChoice={(choiceId, optionId, multiple) =>
              creator.updateDraft((draft) => {
                const current = draft.pathChoices[choiceId];
                const values = Array.isArray(current)
                  ? current
                  : current
                    ? [current]
                    : [];

                const nextValue = multiple
                  ? values.includes(optionId)
                    ? values.filter((entry) => entry !== optionId)
                    : [...values, optionId]
                  : optionId;

                return {
                  ...draft,
                  pathChoices: {
                    ...draft.pathChoices,
                    [choiceId]: nextValue,
                  },
                };
              })
            }
          />
        );

      case "abilities":
        return (
          <AbilitiesStep
            campaignValues={!!initialDraft && Object.values(initialDraft.baseAbilities).reduce((sum,v) => sum + (pointBuyCosts[v] ?? Infinity),0) !== 27}
            classId={creator.draft.classId}
            ancestryId={creator.draft.ancestryId}
            ancestryVariantId={creator.draft.ancestryVariantId}
            ancestryBonusChoices={creator.draft.ancestryBonusChoices}
            values={
              creator.draft
                .baseAbilities
            }
            onChange={(
              baseAbilities,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  baseAbilities,
                }),
              )
            }
          />
        );

      case "skills":
        return (
          <SkillsStep
            classId={
              creator.draft.classId
            }
            backgroundId={
              creator.draft
                .backgroundId
            }
            selectedSkillIds={
              creator.draft
                .classSkillProficiencies
            }
            onChange={(
              classSkillProficiencies,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  classSkillProficiencies,
                }),
              )
            }
          />
        );

      case "equipment":
        return (
          <EquipmentStep
            editing={isEditing}
            draft={creator.draft}
            onSelectionsChange={(
              startingEquipmentSelections,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  startingEquipmentSelections,
                }),
              )
            }
          />
        );

      case "spells":
        return (
          <SpellsStep
            classId={
              creator.draft.classId
            }
            subclassId={
              creator.draft.subclassId || undefined
            }
            pathChoices={
              creator.draft.pathChoices
            }
            level={
              creator.draft.level
            }
            abilityScores={
              previewCharacter.abilityScores ?? creator.draft.baseAbilities
            }
            value={
              creator.draft.spellcasting
            }
            onChange={(
              spellcasting,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  spellcasting,
                }),
              )
            }
          />
        );

      case "transformation":
        return (
          <TransformationStep
            selectedId={
              creator.draft
                .transformationId
            }
            selectedStage={
              creator.draft
                .transformationStage
            }
            selectedFeatureIds={
              creator.draft
                .transformationFeatureIds
            }
            onSelect={(
              transformationId,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  transformationId,

                  transformationStage:
                    transformationId
                      ? 1
                      : 0,

                  transformationFeatureIds:
                    [],
                }),
              )
            }
            onStageChange={(
              transformationStage,
              transformationFeatureIds,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  transformationStage,

                  transformationFeatureIds,
                }),
              )
            }
            onFeatureIdsChange={(
              transformationFeatureIds,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  transformationFeatureIds,
                }),
              )
            }
          />
        );

      case "summary":
        return (
          <section className="creator-section">
            <header className="creator-section__header">
              <p className="creator-section__chapter">
                Kapitel X
              </p>

              <h2>
                Zusammenfassung
              </h2>

              <p>
                Prüfe die fertige Akte in
                der Vorschau und versiegle
                sie anschließend.
              </p>
            </header>

            <dl className="creator-summary-facts">
              <div>
                <dt>Name</dt>

                <dd>
                  {creator.draft
                    .identity
                    .name
                    .trim() ||
                    "Nicht festgelegt"}
                </dd>
              </div>

              <div>
                <dt>Abstammung</dt>

                <dd>
                  {
                    previewCharacter
                      .ancestry
                  }
                </dd>
              </div>

              <div>
                <dt>Hintergrund</dt>

                <dd>
                  {previewCharacter
                    .backgroundName ??
                    "Nicht festgelegt"}
                </dd>
              </div>

              <div>
                <dt>Klasse</dt>

                <dd>
                  {
                    previewCharacter
                      .className
                  }
                </dd>
              </div>

              <div>
                <dt>Unterklasse</dt>

                <dd>
                  {previewCharacter
                    .subclass ??
                    "Keine gewählt"}
                </dd>
              </div>

              <div>
                <dt>Stufe</dt>

                <dd>
                  {
                    previewCharacter
                      .level
                  }
                </dd>
              </div>

              <div>
                <dt>Transformation</dt>

                <dd>
                  {previewCharacter
                    .transformation ??
                    "Keine Wandlung"}
                </dd>
              </div>

              <div>
                <dt>
                  Transformationsstufe
                </dt>

                <dd>
                  {previewCharacter
                    .transformationStage ??
                    0}
                </dd>
              </div>
            </dl>
          </section>
        );
    }
  }

  return (
    <PaperPage>
      <ChapterHeader
        chapter="Die Schwarze Akte"
        title={
          isEditing
            ? "Akte bearbeiten"
            : "Neue Akte"
        }
        subtitle={
          isEditing
            ? "Überarbeite den bestehenden Eintrag und versiegle die Änderungen erneut."
            : "Beginne mit dem Namen. Über „Nächstes Kapitel“ wählst du Herkunft, Klasse und Spielwerte. Erst „Akte besiegeln“ legt den Charakter im Archiv an."
        }
      />

      <CharacterCreatorLayout
        navigation={
          <CreatorStepNavigation
            activeStepId={
              creator.draft.currentStep
            }
            completedStepIds={
              creator.completedSteps
            }
            onStepChange={
              creator.setCurrentStep
            }
          />
        }
        editor={
          <div className="creator-editor">
            {renderCurrentStep(
              creator.draft
                .currentStep,
            )}

            <footer className="creator-footer">
              <div className="creator-footer__group">
                <GrimButton
                  type="button"
                  onClick={() => { creator.clearDraft(); onCancel(); }}
                >
                  Abbrechen
                </GrimButton>

                {!isFirstStep && (
                  <GrimButton
                    type="button"
                    onClick={
                      creator
                        .goToPreviousStep
                    }
                  >
                    Vorheriges Kapitel
                  </GrimButton>
                )}
              </div>

              <div className="creator-footer__group">
                {!isLastStep ? (
                  <GrimButton
                    type="button"
                    onClick={
                      creator.goToNextStep
                    }
                  >
                    Nächstes Kapitel
                  </GrimButton>
                ) : (
                  <GrimButton
                    type="button"
                    onClick={
                      handleSealRecord
                    }
                  >
                    {isEditing
                      ? "Änderungen besiegeln"
                      : "Akte besiegeln"}
                  </GrimButton>
                )}
              </div>
            </footer>
          </div>
        }
        preview={
          <CharacterRecordPreview
            character={previewCharacter}
            title={creator.draft.identity.title}
            pronouns={creator.draft.identity.pronouns}
            alignment={creator.draft.identity.alignment}
            status={
              isEditing
                ? "In Überarbeitung"
                : "Entwurf"
            }
          />
        }
      />
    </PaperPage>
  );
}
