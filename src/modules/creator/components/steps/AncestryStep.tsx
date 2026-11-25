import "./compact-choices.css";
import {
  ancestries,
  ancestryTraits,
} from "../../../../compendium/ancestries";

import {
  getAncestryAbilityBonuses,
} from "../../../../compendium/ancestries";

import type {
  CharacterAncestry,
  CharacterSize,
} from "../../../../compendium/ancestries";

import {
  abilityIds,
  abilityShortLabels,
  type AbilityId,
} from "../../../../compendium/core";

import { ArtworkHero } from "../../../../components/artwork";

interface AncestryStepProps {
  selectedId: string;
  selectedSize: CharacterSize;
  selectedVariantId: string;
  selectedBonusChoices: AbilityId[];
  selectedTraitIds: string[];
  usesReducedSpeed: boolean;
  onSelect: (
    ancestryId: string,
    defaultSize: CharacterSize,
    traditionalTraitIds: string[],
    defaultVariantId: string,
  ) => void;
  onSizeChange: (size: CharacterSize) => void;
  onVariantChange: (variantId: string) => void;
  onBonusChoicesChange: (choices: AbilityId[]) => void;
  onTraitIdsChange: (traitIds: string[]) => void;
  onReducedSpeedChange: (value: boolean) => void;
}

const flexibleSizeAncestryIds = new Set([
  "cursed",
  "awakened",
  "dhampir",
  "disembodied",
  "wulven",
]);

export function AncestryStep({
  selectedId,
  usesReducedSpeed,
  selectedSize,
  selectedVariantId,
  selectedBonusChoices,
  onSelect,
  onSizeChange,
  onVariantChange,
  onBonusChoicesChange,
}: AncestryStepProps) {
  const selectedAncestry = ancestries.find(
    (entry) => entry.id === selectedId,
  );

  const resolvedBonuses = getAncestryAbilityBonuses({
    ancestryId: selectedId,
    variantId: selectedVariantId,
    choices: selectedBonusChoices,
  });

  function selectAncestry(ancestry: CharacterAncestry) {
    onSelect(
      ancestry.id,
      ancestry.size,
      getTraditionalTraitIds(ancestry),
      ancestry.variants[0]?.id ?? "",
    );
  }

  return (
    <section className="creator-section ancestry-reforged">
      <header className="creator-section__header ancestry-reforged__intro">
        <p className="creator-section__chapter">Kapitel II</p>
        <h2>Wähle deine Abstammung</h2>
        <p>
          Jede Abstammung besitzt nun ein festes, sorgfältig abgestimmtes
          Standardpaket. Du triffst eine klare Wahl – GrimForge übernimmt
          Merkmale, Bewegung, Größe und Sicht automatisch.
        </p>
      </header>

      <div className="ancestry-reforged__selector">
        {ancestries.map((ancestry) => {
          const isSelected = ancestry.id === selectedId;
          const traits = resolveTraits(ancestry);

          return (
            <button
              key={ancestry.id}
              type="button"
              className={[
                "ancestry-choice-card",
                isSelected ? "ancestry-choice-card--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={isSelected}
              onClick={() => selectAncestry(ancestry)}
            >
              <span className="ancestry-choice-card__sigil" aria-hidden="true">
                {getAncestrySigil(ancestry.id)}
              </span>
              <span className="ancestry-choice-card__copy">
                <small>{getAncestryEyebrow(ancestry)}</small>
                <strong>{ancestry.name}</strong>
              </span>
              <span className="ancestry-choice-card__facts">
                <span>{formatSpeed(ancestry.speed)} Bewegung</span>
                <span>{ancestry.darkvision ? `${formatSpeed(ancestry.darkvision)} Dunkelsicht` : "Normale Sicht"}</span>
                <span>{traits.length} feste Merkmale</span>
              </span>
            </button>
          );
        })}
      </div>

      {selectedAncestry ? (
        <article className="ancestry-dossier">
          <ArtworkHero
            category="ancestry"
            entryId={selectedAncestry.id}
            eyebrow="Gewählte Blutlinie"
            title={selectedAncestry.name}
            subtitle={getAncestryEyebrow(selectedAncestry)}
            description={selectedAncestry.description}
            className="ancestry-dossier__hero"
          />

          <section className="ancestry-dossier__facts" aria-label="Grundwerte">
            <AncestryFact label="Größe" value={getSizeLabel(selectedSize)} />
            <AncestryFact label="Bewegung" value={formatSpeed(usesReducedSpeed ? 7.5 : selectedAncestry.speed + (selectedAncestry.variants.find(v=>v.id===selectedVariantId)?.speedBonus ?? 0))} />
            <AncestryFact
              label="Sicht"
              value={selectedAncestry.darkvision ? `Dunkelsicht ${formatSpeed(selectedAncestry.darkvision)}` : "Normale Sicht"}
            />
            <AncestryFact
              label="Sprachen"
              value={selectedAncestry.languages.length > 0 ? selectedAncestry.languages.join(", ") : "Durch Hintergrund und Spielwelt"}
            />
          </section>

          <section className="ancestry-dossier__bonuses" aria-label="Attributsboni">
            <div>
              <small>Traditionelle Attributsboni</small>
              <strong>{formatAbilityBonuses(resolvedBonuses.total)}</strong>
            </div>
            <p>{Object.keys(resolvedBonuses.total).length ? "Diese Boni sind im Endwert bereits enthalten. Addiere sie am Spieltisch nicht noch einmal." :
              selectedAncestry.abilityBonusChoice ? "Wähle unten deine freien Boni. Erst dann erscheinen sie in den Endwerten." :
              "Für diese Abstammung sind keine automatischen Attributsboni hinterlegt. Gleiche die Werte vor dem Spiel mit eurer Regelversion ab."}</p>
          </section>

          {selectedAncestry.variants.length > 0 && (
            <section className="ancestry-dossier__size">
              <div>
                <small>Variante</small>
                <strong>Wähle deine Unterart</strong>
              </div>
              <div>
                {selectedAncestry.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    className={selectedVariantId === variant.id ? "ancestry-size-pill ancestry-size-pill--active" : "ancestry-size-pill"}
                    aria-pressed={selectedVariantId === variant.id}
                    onClick={() => onVariantChange(variant.id)}
                  >
                    {variant.name} · {formatAbilityBonuses(variant.abilityBonuses ?? {})}
                  </button>
                ))}
              </div>
              {selectedVariantId && <p>{selectedAncestry.variants.find(v => v.id === selectedVariantId)?.description}</p>}
            </section>
          )}

          {selectedAncestry.abilityBonusChoice && (
            <section className="ancestry-dossier__size">
              <div>
                <small>Freie Boni</small>
                <strong>Wähle {selectedAncestry.abilityBonusChoice.choose} verschiedene Attribute</strong>
              </div>
              <div>
                {abilityIds
                  .filter((abilityId) => !(selectedAncestry.abilityBonusChoice?.exclude ?? []).includes(abilityId))
                  .map((abilityId) => {
                    const active = selectedBonusChoices.includes(abilityId);
                    const limitReached = selectedBonusChoices.length >= selectedAncestry.abilityBonusChoice!.choose;
                    return (
                      <button
                        key={abilityId}
                        type="button"
                        disabled={!active && limitReached}
                        aria-pressed={active}
                        className={active ? "ancestry-size-pill ancestry-size-pill--active" : "ancestry-size-pill"}
                        onClick={() => onBonusChoicesChange(
                          active
                            ? selectedBonusChoices.filter((entry) => entry !== abilityId)
                            : [...selectedBonusChoices, abilityId],
                        )}
                      >
                        {abilityShortLabels[abilityId]} +{selectedAncestry.abilityBonusChoice!.bonus}
                      </button>
                    );
                  })}
              </div>
            </section>
          )}

          {getAvailableSizes(selectedAncestry).length > 1 && (
            <section className="ancestry-dossier__size">
              <div>
                <small>Optionale Körpergröße</small>
                <strong>Wähle klein oder mittel</strong>
              </div>
              <div>
                {getAvailableSizes(selectedAncestry).map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={selectedSize === size ? "ancestry-size-pill ancestry-size-pill--active" : "ancestry-size-pill"}
                    aria-pressed={selectedSize === size}
                    onClick={() => onSizeChange(size)}
                  >
                    {getSizeLabel(size)}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="ancestry-dossier__traits">
            <header>
              <p>Automatische Herkunftsmerkmale</p>
              <h3>Was diese Abstammung auszeichnet</h3>
              <span>Diese Merkmale werden ohne weitere Auswahl in die Charakterakte übernommen.</span>
            </header>

            <div className="ancestry-feature-grid">
              {resolveTraits(selectedAncestry).map((trait, index) => (
                <article key={`${trait.id}-${index}`} className="ancestry-feature-card">
                  <span className="ancestry-feature-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{trait.name}</h4>
                    <p>{trait.description || getFallbackTraitDescription(trait.name)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </article>
      ) : (
        <div className="ancestry-reforged__empty">
          <span aria-hidden="true">◇</span>
          <strong>Wähle eine Abstammung</strong>
          <p>Danach erscheinen hier ihre festen Merkmale und Grundwerte.</p>
        </div>
      )}
    </section>
  );
}

function AncestryFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function resolveTraits(ancestry: CharacterAncestry) {
  return getTraditionalTraitIds(ancestry).map((traitId) => {
    const trait = ancestryTraits.find((entry) => entry.id === traitId);
    return trait ?? {
      id: traitId,
      name: traitId,
      description: "Ein festes Merkmal dieser Abstammung.",
    };
  });
}

function getTraditionalTraitIds(ancestry: CharacterAncestry): string[] {
  return ancestry.traits
    .map((name) => ancestryTraits.find((trait) => trait.name === name)?.id)
    .filter((id): id is string => Boolean(id));
}

function getAvailableSizes(ancestry: CharacterAncestry): CharacterSize[] {
  if (flexibleSizeAncestryIds.has(ancestry.id)) {
    return ["small", "medium"];
  }
  return [ancestry.size];
}

function getSizeLabel(size: CharacterSize) {
  return size === "small" ? "Klein" : "Mittel";
}

function formatSpeed(speed: number) {
  return `${String(speed).replace(".", ",")} m`;
}

function getAncestryEyebrow(ancestry: CharacterAncestry) {
  if (ancestry.source === "grim-hollow" || ancestry.source === "grim-hollow-2025") {
    return "Grim-Hollow-Abstammung";
  }
  return "Klassische Abstammung";
}

function getAncestrySigil(id: string) {
  const sigils: Record<string, string> = {
    dragonborn: "✦",
    dwarf: "◆",
    elf: "☾",
    gnome: "✧",
    halfling: "❦",
    human: "◇",
    halfelf: "◐",
    halforc: "⚔",
    tiefling: "♜",
    cursed: "☠",
    awakened: "✺",
    dhampir: "♢",
    disembodied: "◌",
    changeling: "◈",
    wulven: "♠",
  };
  return sigils[id] ?? "◇";
}

function getFallbackTraitDescription(name: string) {
  return `${name} gehört zum festen Herkunftspaket und wird automatisch in deinen Charakterbogen übernommen.`;
}

function formatAbilityBonuses(bonuses: Partial<Record<AbilityId, number>>) {
  const entries = abilityIds
    .filter((abilityId) => (bonuses[abilityId] ?? 0) !== 0)
    .map((abilityId) => `${abilityShortLabels[abilityId]} +${bonuses[abilityId]}`);

  return entries.length > 0 ? entries.join(", ") : "Keine festen Boni";
}
