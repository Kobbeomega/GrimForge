import {
  getCharacterClassFeatures,
  getCharacterPathChoices,
  getSubclassFeatures,
  type CharacterPathChoices,
} from "../compendium/classes";

import type {
  ClassFeature,
  ClassFeatureKind,
} from "../compendium/classes";

export interface ResolvedClassFeature {
  id: string;
  name: string;
  description: string;
  level: number;
  kind: ClassFeatureKind;
  source: "class" | "subclass";
  resourceId?: string;
}

export function resolveCharacterClassFeatures({
  classId,
  subclassId,
  level,
  pathChoices,
}: {
  classId: string;
  subclassId?: string;
  level: number;
  pathChoices?: CharacterPathChoices;
}): ResolvedClassFeature[] {
  const subclassFeatureIds = new Set(getSubclassFeatures(classId, subclassId ?? "", level).map(({ id }) => id));
  const baseFeatures = getCharacterClassFeatures({
    classId,
    subclassId,
    level,
  }).map((feature) =>
    resolveFeature(
      feature,
      subclassFeatureIds.has(feature.id)
        ? "subclass"
        : "class",
    ),
  );

  const choiceFeatures = getCharacterPathChoices(classId, subclassId, level, pathChoices)
    .flatMap((definition) => {
      const raw = pathChoices?.[definition.id];
      const selectedIds = Array.isArray(raw) ? raw : raw ? [raw] : [];

      return selectedIds.flatMap((optionId) => {
        const option = definition.options.find((entry) => entry.id === optionId);
        if (!option) return [];

        return [{
          id: `path-choice:${definition.id}:${option.id}`,
          name: `${definition.name}: ${option.name}`,
          description: option.description,
          level: definition.level,
          kind: "passive" as const,
          source: definition.subclassId ? "subclass" as const : "class" as const,
        }];
      });
    });

  return [...baseFeatures, ...choiceFeatures];
}

function resolveFeature(
  feature: ClassFeature,
  source: "class" | "subclass",
): ResolvedClassFeature {
  return {
    id: feature.id,
    name: feature.name,
    description: feature.description,
    level: feature.level,
    kind: feature.kind,
    source,
    resourceId: feature.resource?.id,
  };
}
