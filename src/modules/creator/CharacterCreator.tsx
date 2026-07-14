import { ChapterHeader } from "../../components/ui/ChapterHeader";
import { GrimButton } from "../../components/ui/GrimButton";
import { PaperPage } from "../../components/ui/PaperPage";

import {
  getBackgroundById,
} from "../../compendium/backgrounds";

import {
  getClassSkillChoice,
} from "../../compendium/classes/skillChoices";

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

import { useCharacterCreator } from "./useCharacterCreator";
import { mapDraftToArchiveEntry } from "./mappers/mapDraftToArchiveEntry";

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

export function CharacterCreator({
  fileNumber,
  initialDraft,
  onCancel,
  onFinished,
}: CharacterCreatorProps) {
  const creator = useCharacterCreator({
    fileNumber,
    initialDraft,
  });

  const previewCharacter =
    mapDraftToArchiveEntry(
      creator.draft,
    );

  const isEditing =
    Boolean(initialDraft);

  function handleIdentityChange(
    identity: CharacterIdentityDraft,
  ) {
    creator.updateDraft((draft) => ({
      ...draft,
      identity,
    }));
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

    const sealedCharacter:
      CharacterArchiveEntry = {
      ...previewCharacter,

      status: "active",

      updatedAt:
        new Date().toISOString(),
    };

    onFinished(sealedCharacter);
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
              creator.draft.ancestryId
            }
            selectedVariantId={
              creator.draft
                .ancestryVariantId
            }
            selectedBonusChoices={
              creator.draft
                .ancestryBonusChoices
            }
            onSelect={(ancestryId) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  ancestryId,

                  ancestryVariantId:
                    "",

                  ancestryBonusChoices:
                    [],
                }),
              )
            }
            onSelectVariant={(
              ancestryVariantId,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  ancestryVariantId,
                }),
              )
            }
            onBonusChoicesChange={(
              ancestryBonusChoices,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,
                  ancestryBonusChoices,
                }),
              )
            }
          />
        );

      case "background":
        return (
          <BackgroundStep
            selectedBackgroundId={
              creator.draft.backgroundId
            }
            onSelectBackground={(
              backgroundId,
            ) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  backgroundId,

                  /*
                   * Ein neuer Hintergrund kann
                   * Überschneidungen mit bisherigen
                   * Klassenfertigkeiten erzeugen.
                   */
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
              creator.draft.subclassId
            }
            onSelectClass={(classId) =>
              creator.updateDraft(
                (draft) => ({
                  ...draft,

                  classId,

                  subclassId: "",

                  classSkillProficiencies:
                    [],

                  startingEquipmentSelections:
                    [],
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
              creator.draft.backgroundId
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

      case "transformation":
        return (
          <CreatorPlaceholder
            chapter="Kapitel VIII"
            title="Transformation"
            description="Hier werden später Wandlung, Transformationsstufe sowie positive und negative Effekte verwaltet."
          />
        );

      case "summary":
        return (
          <CreatorSummary
            character={
              previewCharacter
            }
            isEditing={isEditing}
          />
        );
    }
  }

  const isFirstStep =
    creator.draft.currentStep ===
    "identity";

  const isLastStep =
    creator.draft.currentStep ===
    "summary";

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
            : "Führe das entstehende Schicksal durch die neun Kapitel."
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
              creator.draft.currentStep,
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
                      creator.goToPreviousStep
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
            fileNumber={
              previewCharacter.fileNumber
            }
            name={
              previewCharacter.name
            }
            title={
              creator.draft.identity.title
            }
            pronouns={
              creator.draft.identity
                .pronouns
            }
            alignment={
              creator.draft.identity
                .alignment
            }
            ancestry={
              previewCharacter.ancestry
            }
            className={
              previewCharacter.className
            }
            subclass={
              previewCharacter.subclass
            }
            level={
              previewCharacter.level
            }
            summary={
              previewCharacter.summary
            }
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

interface CreatorPlaceholderProps {
  chapter: string;
  title: string;
  description: string;
}

function CreatorPlaceholder({
  chapter,
  title,
  description,
}: CreatorPlaceholderProps) {
  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          {chapter}
        </p>

        <h2>{title}</h2>

        <p>{description}</p>
      </header>
    </section>
  );
}

interface CreatorSummaryProps {
  character: CharacterArchiveEntry;
  isEditing: boolean;
}

function CreatorSummary({
  character,
  isEditing,
}: CreatorSummaryProps) {
  const background =
    getBackgroundById(
      character.backgroundId ?? "",
    );

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel IX
        </p>

        <h2>Zusammenfassung</h2>

        <p>
          {isEditing
            ? "Prüfe die überarbeitete Akte, bevor die Änderungen versiegelt werden."
            : "Prüfe die vollständige Akte, bevor sie im Grimforge-Archiv versiegelt wird."}
        </p>
      </header>

      <dl className="creator-summary">
        <div>
          <dt>Aktennummer</dt>

          <dd>
            {character.fileNumber}
          </dd>
        </div>

        <div>
          <dt>Name</dt>

          <dd>{character.name}</dd>
        </div>

        <div>
          <dt>Abstammung</dt>

          <dd>
            {character.ancestry}
          </dd>
        </div>

        <div>
          <dt>Hintergrund</dt>

          <dd>
            {background?.name ??
              "Nicht gewählt"}
          </dd>
        </div>

        <div>
          <dt>Klasse</dt>

          <dd>
            {[
              character.className,
              character.subclass,
            ]
              .filter(Boolean)
              .join(" · ")}
          </dd>
        </div>

        <div>
          <dt>Fertigkeiten</dt>

          <dd>
            {
              character
                .skillProficiencies
                ?.length ?? 0
            }{" "}
            geübt
          </dd>
        </div>

        <div>
          <dt>Stufe</dt>

          <dd>{character.level}</dd>
        </div>

        <div>
          <dt>Vorgang</dt>

          <dd>
            {isEditing
              ? "Bestehende Akte aktualisieren"
              : "Neue Akte anlegen"}
          </dd>
        </div>
      </dl>
    </section>
  );
}