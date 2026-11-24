import { getTransformationById, getTransformationStageAutomaticFeatures, getTransformationStageBoons, getTransformationStageFlaws, transformations, type TransformationFeature } from "./transformations";
import { getTransformationSelectionSummary } from "./selection";

type SavedTransformation = {transformation?: string; transformationId?: string; transformationStage?: number; transformationFeatureIds?: readonly string[]};
export type ActiveTransformationFeature = TransformationFeature & {
  stage:number;
  group:"automatic"|"boon"|"flaw";
  application:"conditional"|"manual";
};
const knownConditions=new Set(["vampire-sanguine-curse","vampire-greater-sanguine-curse","lycanthrope-lust-for-the-hunt"]);
const normalize=(s:string)=>s.trim().toLocaleLowerCase("de");
export const transformationGroupLabels={automatic:"Automatisch erhalten",boon:"Gewählte Gabe",flaw:"Makel"} as const;
export const transformationApplicationLabels={conditional:"Situativ · am Tisch anwenden",manual:"Am Tisch anwenden"} as const;

export function resolveCharacterTransformation(saved:SavedTransformation) {
  const legacy=saved.transformation?.trim();
  const id=saved.transformationId?.trim();
  // A stale ID may still carry the exact old display name. Never infer by partial match.
  const definition=(id?getTransformationById(id):undefined) ??
    (legacy?transformations.find(t=>normalize(t.name)===normalize(legacy)||t.id===normalize(legacy)):undefined);
  const raw=saved.transformationStage;
  const stage=typeof raw==="number" && Number.isInteger(raw) && raw>=1 && raw<=4?raw:0;
  const activeStages=definition?.stages.filter(s=>s.stage<=stage)??[];
  const selected=new Set(saved.transformationFeatureIds??[]);
  const seen=new Set<string>();
  const features:ActiveTransformationFeature[]=[];
  for(const current of activeStages){
    for(const [group,entries] of [
      ["automatic",getTransformationStageAutomaticFeatures(current)],
      ["boon",getTransformationStageBoons(current)],
      ["flaw",getTransformationStageFlaws(current)],
    ] as const){
      for(const feature of entries){
        if(seen.has(feature.id)||group!=="automatic"&&!selected.has(feature.id))continue;
        seen.add(feature.id);
        features.push({...feature,stage:current.stage,group,application:feature.kind==="action" || feature.kind==="reaction" || knownConditions.has(feature.id)?"conditional":"manual"});
      }
    }
  }
  const name=definition?.name||legacy||id;
  const selection=definition && stage ? getTransformationSelectionSummary(definition,stage,[...selected]) : undefined;
  const warning=!name ? undefined : !definition ? "Katalogeintrag fehlt. Gespeicherte Wandlung bitte in der Akte prüfen."
    : !stage ? "Keine aktive Stufe gespeichert. Bitte die Wandlungsstufe in der Akte prüfen."
    : !selection?.isComplete || [...selected].some(id=>!seen.has(id)) ? "Die Auswahl ist unvollständig oder enthält ungültige Merkmale. Bitte Gaben und Makel in der Akte prüfen." : undefined;
  return {name,definition,stage,activeStages,features,warning};
}
