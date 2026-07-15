import {
  getTransformationStageAutomaticFeatures,
  getTransformationStageBoons,
  getTransformationStageFlaws,
} from "./transformations";

import type {
  TransformationDefinition,
  TransformationFeature,
  TransformationStage,
} from "./transformations";

export interface TransformationStageSelectionState {
  stage: TransformationStage["stage"];

  requiredBoons: number;
  requiredFlaws: number;

  selectedBoons: number;
  selectedFlaws: number;

  remainingBoons: number;
  remainingFlaws: number;

  isComplete: boolean;
}

export interface TransformationSelectionSummary {
  requiredBoons: number;
  requiredFlaws: number;

  selectedBoons: number;
  selectedFlaws: number;

  remainingBoons: number;
  remainingFlaws: number;

  hasInvalidPrerequisites: boolean;

  isComplete: boolean;

  stages:
    TransformationStageSelectionState[];
}

export type TransformationFeatureGroup =
  | "boon"
  | "flaw";

export function getActiveTransformationStagesFromDefinition(
  transformation: TransformationDefinition,
  currentStage: number,
): TransformationStage[] {
  const safeStage =
    Math.max(
      0,
      Math.min(
        4,
        currentStage,
      ),
    );

  return transformation.stages.filter(
    (stage) =>
      stage.stage <= safeStage,
  );
}

export function getTransformationFeatureGroup(
  stage: TransformationStage,
  featureId: string,
): TransformationFeatureGroup | undefined {
  const boonExists =
    getTransformationStageBoons(
      stage,
    ).some(
      (feature) =>
        feature.id === featureId,
    );

  if (boonExists) {
    return "boon";
  }

  const flawExists =
    getTransformationStageFlaws(
      stage,
    ).some(
      (feature) =>
        feature.id === featureId,
    );

  if (flawExists) {
    return "flaw";
  }

  return undefined;
}

export function getTransformationFeatureById(
  transformation: TransformationDefinition,
  featureId: string,
): TransformationFeature | undefined {
  for (
    const stage of transformation.stages
  ) {
    const feature = [
      ...getTransformationStageAutomaticFeatures(
        stage,
      ),
      ...getTransformationStageBoons(
        stage,
      ),
      ...getTransformationStageFlaws(
        stage,
      ),
    ].find(
      (entry) =>
        entry.id === featureId,
    );

    if (feature) {
      return feature;
    }
  }

  return undefined;
}

export function areTransformationFeaturePrerequisitesMet({
  feature,
  transformation,
  selectedFeatureIds,
  currentStage,
}: {
  feature: TransformationFeature;

  transformation:
    TransformationDefinition;

  selectedFeatureIds:
    readonly string[];

  currentStage: number;
}): boolean {
  const prerequisites =
    feature.prerequisites ?? [];

  if (prerequisites.length === 0) {
    return true;
  }

  const activeStages =
    getActiveTransformationStagesFromDefinition(
      transformation,
      currentStage,
    );

  const automaticFeatureIds =
    new Set(
      activeStages.flatMap(
        (stage) =>
          getTransformationStageAutomaticFeatures(
            stage,
          ).map(
            (entry) =>
              entry.id,
          ),
      ),
    );

  const selectedIds =
    new Set(selectedFeatureIds);

  return prerequisites.every(
    (prerequisiteId) =>
      selectedIds.has(
        prerequisiteId,
      ) ||
      automaticFeatureIds.has(
        prerequisiteId,
      ),
  );
}

export function getTransformationStageSelectionState(
  stage: TransformationStage,
  selectedFeatureIds: readonly string[],
): TransformationStageSelectionState {
  const selectedIds =
    new Set(selectedFeatureIds);

  const selectedBoons =
    getTransformationStageBoons(
      stage,
    ).filter(
      (feature) =>
        selectedIds.has(
          feature.id,
        ),
    ).length;

  const selectedFlaws =
    getTransformationStageFlaws(
      stage,
    ).filter(
      (feature) =>
        selectedIds.has(
          feature.id,
        ),
    ).length;

  const requiredBoons =
    stage.featureSelection?.boons ??
    0;

  const requiredFlaws =
    stage.featureSelection?.flaws ??
    0;

  const remainingBoons =
    Math.max(
      0,
      requiredBoons -
        selectedBoons,
    );

  const remainingFlaws =
    Math.max(
      0,
      requiredFlaws -
        selectedFlaws,
    );

  return {
    stage: stage.stage,

    requiredBoons,
    requiredFlaws,

    selectedBoons,
    selectedFlaws,

    remainingBoons,
    remainingFlaws,

    isComplete:
      selectedBoons ===
        requiredBoons &&
      selectedFlaws ===
        requiredFlaws,
  };
}

export function getTransformationSelectionSummary(
  transformation: TransformationDefinition,
  currentStage: number,
  selectedFeatureIds: readonly string[],
): TransformationSelectionSummary {
  const stages =
    getActiveTransformationStagesFromDefinition(
      transformation,
      currentStage,
    );

  const states =
    stages.map(
      (stage) =>
        getTransformationStageSelectionState(
          stage,
          selectedFeatureIds,
        ),
    );

  const requiredBoons =
    sumStageValues(
      states,
      "requiredBoons",
    );

  const requiredFlaws =
    sumStageValues(
      states,
      "requiredFlaws",
    );

  const selectedBoons =
    sumStageValues(
      states,
      "selectedBoons",
    );

  const selectedFlaws =
    sumStageValues(
      states,
      "selectedFlaws",
    );

  const remainingBoons =
    sumStageValues(
      states,
      "remainingBoons",
    );

  const remainingFlaws =
    sumStageValues(
      states,
      "remainingFlaws",
    );

  const hasInvalidPrerequisites =
    selectedFeatureIds.some(
      (featureId) => {
        const feature =
          getTransformationFeatureById(
            transformation,
            featureId,
          );

        if (!feature) {
          return true;
        }

        return !areTransformationFeaturePrerequisitesMet({
          feature,
          transformation,
          selectedFeatureIds,
          currentStage,
        });
      },
    );

  return {
    requiredBoons,
    requiredFlaws,

    selectedBoons,
    selectedFlaws,

    remainingBoons,
    remainingFlaws,

    hasInvalidPrerequisites,

    isComplete:
      !hasInvalidPrerequisites &&
      states.every(
        (state) =>
          state.isComplete,
      ),

    stages: states,
  };
}

export function canSelectTransformationFeature({
  transformation,
  currentStage,
  stage,
  feature,
  selectedFeatureIds,
}: {
  transformation:
    TransformationDefinition;

  currentStage: number;

  stage: TransformationStage;

  feature: TransformationFeature;

  selectedFeatureIds:
    readonly string[];
}): boolean {
  if (
    selectedFeatureIds.includes(
      feature.id,
    )
  ) {
    return true;
  }

  const prerequisitesMet =
    areTransformationFeaturePrerequisitesMet({
      feature,
      transformation,
      selectedFeatureIds,
      currentStage,
    });

  if (!prerequisitesMet) {
    return false;
  }

  const group =
    getTransformationFeatureGroup(
      stage,
      feature.id,
    );

  if (!group) {
    return false;
  }

  const state =
    getTransformationStageSelectionState(
      stage,
      selectedFeatureIds,
    );

  if (group === "flaw") {
    return (
      state.selectedFlaws <
      state.requiredFlaws
    );
  }

  return (
    state.selectedBoons <
    state.requiredBoons
  );
}

export function sanitizeTransformationFeatureIds({
  transformation,
  currentStage,
  selectedFeatureIds,
}: {
  transformation:
    TransformationDefinition;

  currentStage: number;

  selectedFeatureIds:
    readonly string[];
}): string[] {
  const activeStages =
    getActiveTransformationStagesFromDefinition(
      transformation,
      currentStage,
    );

  const validSelectableFeatureIds =
    new Set(
      activeStages.flatMap(
        (stage) => [
          ...getTransformationStageBoons(
            stage,
          ),
          ...getTransformationStageFlaws(
            stage,
          ),
        ].map(
          (feature) =>
            feature.id,
        ),
      ),
    );

  let remainingIds =
    Array.from(
      new Set(
        selectedFeatureIds.filter(
          (featureId) =>
            validSelectableFeatureIds.has(
              featureId,
            ),
        ),
      ),
    );

  /*
   * Mehrfach durchlaufen, damit ganze
   * Abhängigkeitsketten bereinigt werden.
   *
   * Beispiel:
   * Blutlinie → verbesserte Blutlinie →
   * vollendete Blutlinie.
   */
  let changed = true;

  while (changed) {
    changed = false;

    const filteredIds =
      remainingIds.filter(
        (featureId) => {
          const feature =
            getTransformationFeatureById(
              transformation,
              featureId,
            );

          if (!feature) {
            changed = true;

            return false;
          }

          const valid =
            areTransformationFeaturePrerequisitesMet({
              feature,
              transformation,
              selectedFeatureIds:
                remainingIds,
              currentStage,
            });

          if (!valid) {
            changed = true;
          }

          return valid;
        },
      );

    remainingIds =
      filteredIds;
  }

  const selectedIds =
    new Set(remainingIds);

  const sanitizedIds: string[] =
    [];

  for (const stage of activeStages) {
    const maximumBoons =
      stage.featureSelection?.boons ??
      0;

    const maximumFlaws =
      stage.featureSelection?.flaws ??
      0;

    const selectedBoons =
      getTransformationStageBoons(
        stage,
      )
        .filter(
          (feature) =>
            selectedIds.has(
              feature.id,
            ),
        )
        .slice(
          0,
          maximumBoons,
        );

    const selectedFlaws =
      getTransformationStageFlaws(
        stage,
      )
        .filter(
          (feature) =>
            selectedIds.has(
              feature.id,
            ),
        )
        .slice(
          0,
          maximumFlaws,
        );

    sanitizedIds.push(
      ...selectedBoons.map(
        (feature) =>
          feature.id,
      ),

      ...selectedFlaws.map(
        (feature) =>
          feature.id,
      ),
    );
  }

  return sanitizedIds;
}

export function isTransformationSelectionComplete({
  transformation,
  currentStage,
  selectedFeatureIds,
}: {
  transformation:
    TransformationDefinition;

  currentStage: number;

  selectedFeatureIds:
    readonly string[];
}): boolean {
  const sanitizedFeatureIds =
    sanitizeTransformationFeatureIds({
      transformation,
      currentStage,
      selectedFeatureIds,
    });

  if (
    sanitizedFeatureIds.length !==
    selectedFeatureIds.length
  ) {
    return false;
  }

  return getTransformationSelectionSummary(
    transformation,
    currentStage,
    sanitizedFeatureIds,
  ).isComplete;
}

function sumStageValues(
  stages:
    TransformationStageSelectionState[],

  key:
    | "requiredBoons"
    | "requiredFlaws"
    | "selectedBoons"
    | "selectedFlaws"
    | "remainingBoons"
    | "remainingFlaws",
): number {
  return stages.reduce(
    (total, stage) =>
      total + stage[key],
    0,
  );
}