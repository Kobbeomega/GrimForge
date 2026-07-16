import { ChapterHeader } from "../../components/ui/ChapterHeader";
import { GrimButton } from "../../components/ui/GrimButton";
import { PaperPage } from "../../components/ui/PaperPage";

import {
  getClassSkillChoice,
} from "../../compendium/classes/skillChoices";

import {
  startingEquipment,
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

export function CharacterCreator({
  fileNumber,
  initialDraft,
  onCancel,
  onFinished,
}: CharacterCreatorProps) {
  const creator =
    useCharacterCreator({
      fileNumber,
      initialDraft,
    });

  const previewCharacter =
    mapDraftToArchiveEntry(
      creator.draft,
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

    const classSkillChoice =
      getClassSkillChoice(
        creator.draft.classId,
      );

    if (
      classSkillChoice &&
      creator.draft
        .classSkillProficiencies
        .length !==
        classSkillChoice.choose
    ) {
      window.alert(
        `Wähle genau ${classSkillChoice.choose} Klassenfertigkeiten.`,
      );

      creator.setCurrentStep(
        "skills",
      );

      return;
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

    if (spentAbilityPoints !== 27) {
      window.alert(
        "Verteile im Point-Buy-System genau 27 Punkte.",
      );

      creator.setCurrentStep(
        "abilities",
      );

      return;
    }

    const equipmentConfiguration =
      startingEquipment.find(
        (entry) =>
          entry.classId ===
          creator.draft.classId,
      );

    if (equipmentConfiguration) {
      const completedEquipmentChoices =
        equipmentConfiguration
          .choices
          .filter(
            (choice) =>
              creator.draft
                .startingEquipmentSelections
                .some(
                  (selection) =>
                    selection.choiceId ===
                    choice.id,
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

        level:
          creator.draft.level,

        abilityScores:
          creator.draft
            .baseAbilities,

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

    const sealedCharacter:
      CharacterArchiveEntry = {
      ...previewCharacter,

      status: "active",

      updatedAt:
        new Date().toISOString(),
    };

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
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  ancestryId,
                  ancestrySize,
                  ancestryTraitIds,

                  ancestryUsesReducedSpeed:
                    false,

                  ancestryVariantId: "",

                  ancestryBonusChoices:
                    [],
                }),
              )
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
                (draft) => ({
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
            selectedClassId={
              creator.draft.classId
            }
            selectedSubclassId={
              creator.draft
                .subclassId
            }
            onSelectClass={(
              classId,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  classId,

                  subclassId: "",

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
            onSelectSubclass={(
              subclassId,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  subclassId,
                }),
              )
            }
          />
        );

      case "abilities":
        return (
          <AbilitiesStep
            classId={creator.draft.classId}
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
            level={
              creator.draft.level
            }
            abilityScores={
              creator.draft
                .baseAbilities
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
            : "Führe das entstehende Schicksal durch die zehn Kapitel."
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
                  onClick={onCancel}
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