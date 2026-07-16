import {
  getCharacterClassFeatures,
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
}: {
  classId: string;
  subclassId?: string;
  level: number;
}): ResolvedClassFeature[] {
  return getCharacterClassFeatures({
    classId,
    subclassId,
    level,
  }).map((feature) =>
    resolveFeature(
      feature,
      subclassId && feature.id.startsWith(`${subclassId}-`)
        ? "subclass"
        : "class",
    ),
  );
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
