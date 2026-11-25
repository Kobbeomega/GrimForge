import { useEffect, useMemo, useState } from "react";

import {
  createEmptyCharacterDraft,
  creatorSteps,
  getNextCreatorStep,
  getPreviousCreatorStep,
  type CharacterCreatorDraft,
  type CharacterCreatorState,
  type CreatorStepDefinition,
  type CreatorStepId,
} from "./types";

interface UseCharacterCreatorOptions {
  fileNumber: string;
  initialDraft?: CharacterCreatorDraft;
}

export function useCharacterCreator({
  fileNumber,
  initialDraft,
}: UseCharacterCreatorOptions) {
  const key = "grimforge.creator.v1." + (initialDraft ? initialDraft.id + "." + initialDraft.updatedAt : "neu." + fileNumber);
  function clearDraft() { try { sessionStorage.removeItem(key); } catch { /* Storage may be disabled. */ } }
  const [state, setState] =
    useState<CharacterCreatorState>(() => {
      try {
        const cached = JSON.parse(sessionStorage.getItem(key) ?? "null");
        if (cached?.draft?.fileNumber === fileNumber && Array.isArray(cached.completedSteps) && creatorSteps.some(step => step.id === cached.draft.currentStep)) return cached;
      } catch { /* Start fresh if this tab has no usable draft. */ }
      return {
      draft:
        initialDraft ??
        createEmptyCharacterDraft(fileNumber),

      completedSteps: [],
    }; });
  useEffect(() => { try { sessionStorage.setItem(key, JSON.stringify(state)); } catch { /* Continue in memory. */ } }, [key,state]);

  const currentStep = useMemo<
    CreatorStepDefinition
  >(
    () =>
      creatorSteps.find(
        (step: CreatorStepDefinition) =>
          step.id ===
          state.draft.currentStep,
      ) ?? creatorSteps[0],
    [state.draft.currentStep],
  );

  function updateDraft(
    updater:
      | Partial<CharacterCreatorDraft>
      | ((
          currentDraft: CharacterCreatorDraft,
        ) => CharacterCreatorDraft),
  ) {
    setState(
      (
        currentState: CharacterCreatorState,
      ): CharacterCreatorState => {
        const updatedDraft =
          typeof updater === "function"
            ? updater(currentState.draft)
            : {
                ...currentState.draft,
                ...updater,
              };

        return {
          ...currentState,

          draft: {
            ...updatedDraft,
            updatedAt:
              new Date().toISOString(),
          },
        };
      },
    );
  }

  function setCurrentStep(
    stepId: CreatorStepId,
  ) {
    updateDraft({
      currentStep: stepId,
    });
  }

  function markStepCompleted(
    stepId: CreatorStepId,
  ) {
    setState(
      (
        currentState: CharacterCreatorState,
      ): CharacterCreatorState => {
        if (
          currentState.completedSteps.includes(
            stepId,
          )
        ) {
          return currentState;
        }

        return {
          ...currentState,

          completedSteps: [
            ...currentState.completedSteps,
            stepId,
          ],
        };
      },
    );
  }

  function markStepIncomplete(
    stepId: CreatorStepId,
  ) {
    setState(
      (
        currentState: CharacterCreatorState,
      ): CharacterCreatorState => ({
        ...currentState,

        completedSteps:
          currentState.completedSteps.filter(
            (entry: CreatorStepId) =>
              entry !== stepId,
          ),
      }),
    );
  }

  function goToNextStep() {
    const nextStep = getNextCreatorStep(
      state.draft.currentStep,
    );

    if (!nextStep) {
      return;
    }

    markStepCompleted(
      state.draft.currentStep,
    );

    setCurrentStep(nextStep);
  }

  function goToPreviousStep() {
    const previousStep =
      getPreviousCreatorStep(
        state.draft.currentStep,
      );

    if (!previousStep) {
      return;
    }

    setCurrentStep(previousStep);
  }

  function resetCreator() {
    setState({
      draft:
        createEmptyCharacterDraft(
          fileNumber,
        ),

      completedSteps: [],
    });
  }

  function replaceDraft(
    nextDraft: CharacterCreatorDraft,
  ) {
    setState({
      draft: {
        ...nextDraft,
        updatedAt:
          new Date().toISOString(),
      },

      completedSteps: [],
    });
  }

  return {
    state,

    draft: state.draft,

    currentStep,

    completedSteps:
      state.completedSteps,

    updateDraft,

    setCurrentStep,

    markStepCompleted,

    markStepIncomplete,

    goToNextStep,

    goToPreviousStep,

    resetCreator,

    replaceDraft,
    clearDraft,
  };
}
