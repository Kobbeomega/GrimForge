import {
  abilityIds,
  abilityShortLabels,
  formatAbilityModifier,
} from "../../../compendium/core";

import {
  getClassById,
} from "../../../compendium/classes";

import {
  ancestryTraits,
} from "../../../compendium/ancestries";

import {
  calculateCharacterRules,
  calculateWeaponAttack,
  resolveCharacterEquipment,
} from "../../../rules";

import {
  createCharacterRuleInput,
} from "../../sheet/rules/createCharacterRuleInput";

import type {
  CharacterArchiveEntry,
} from "../../archives/types";

interface CharacterRecordPreviewProps {
  character: CharacterArchiveEntry;
  title: string;
  pronouns: string;
  alignment: string;
  status?: string;
}

const damageTypeLabels = {
  slashing: "Hieb",
  piercing: "Stich",
  bludgeoning: "Wucht",
} as const;

export function CharacterRecordPreview({
  character,
  title,
  pronouns,
  alignment,
  status = "Entwurf",
}: CharacterRecordPreviewProps) {
  const rules = calculateCharacterRules(
    createCharacterRuleInput(character),
  );

  const equipment = resolveCharacterEquipment(
    character.inventory ?? {
      items: [],
      currency: { copper: 0, silver: 0, gold: 0 },
    },
  );

  const classDefinition = getClassById(character.classId ?? "");
  const abilityScores = character.abilityScores ?? {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  };

  const attacks = equipment.weapons.slice(0, 3).map((weapon) => {
    const proficient = classDefinition?.weaponProficiencies.some(
      (entry) =>
        entry.toLowerCase().includes("waffen") ||
        entry.toLowerCase().includes(weapon.weaponCategory),
    ) ?? false;

    return {
      weapon,
      calculation: calculateWeaponAttack({
        weapon,
        abilityScores,
        proficiencyBonus: rules.proficiencyBonus,
        proficient,
      }),
    };
  });

  const traitNames = (character.ancestryTraitIds ?? [])
    .map((traitId) => ancestryTraits.find((trait) => trait.id === traitId)?.name)
    .filter((name): name is string => Boolean(name))
    .slice(0, 4);

  return (
    <article className="record-preview record-preview--live">
      <div className="record-preview__corner" aria-hidden="true" />

      <header className="record-preview__header">
        <div className="record-preview__status-row">
          <p className="record-preview__file-number">{character.fileNumber}</p>
          <span className="record-preview__status">{status}</span>
        </div>

        <div className="record-preview__portrait" aria-hidden="true">
          <span>GF</span>
        </div>

        <h2 className="record-preview__name">
          {character.name.trim() || "Unbenannte Akte"}
        </h2>

        <p className="record-preview__title">
          {title.trim() || "Noch ohne Titel"}
        </p>

        <p className="record-preview__identity-line">
          {character.ancestry} · {character.className} {character.level}
        </p>
      </header>

      <section className="record-preview__combat-grid" aria-label="Kernwerte">
        <PreviewStat label="RK" value={String(rules.armorClass.armorClass)} />
        <PreviewStat label="TP" value={String(rules.maximumHitPoints)} />
        <PreviewStat label="INIT" value={formatAbilityModifier(rules.initiativeModifier)} />
        <PreviewStat label="BEW" value={`${rules.speed} m`} />
        <PreviewStat label="ÜB" value={formatAbilityModifier(rules.proficiencyBonus)} />
        <PreviewStat label="PASSIV" value={String(rules.passivePerception)} />
      </section>

      <section className="record-preview__section">
        <PreviewSectionTitle title="Attribute" />
        <div className="record-preview__abilities">
          {abilityIds.map((abilityId) => (
            <div key={abilityId} className="record-preview__ability">
              <small>{abilityShortLabels[abilityId]}</small>
              <strong>{abilityScores[abilityId]}</strong>
              <span>{formatAbilityModifier(rules.abilityModifiers[abilityId])}</span>
            </div>
          ))}
        </div>
      </section>

      {attacks.length > 0 && (
        <section className="record-preview__section">
          <PreviewSectionTitle title="Bewaffnung" />
          <div className="record-preview__attack-list">
            {attacks.map(({ weapon, calculation }) => (
              <div key={weapon.id} className="record-preview__attack">
                <div>
                  <strong>{weapon.name}</strong>
                  <small>
                    {calculation.damage} {damageTypeLabels[weapon.damage.type]}
                  </small>
                </div>
                <span>{calculation.attackBonusLabel}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="record-preview__section record-preview__section--split">
        <div>
          <PreviewSectionTitle title="Merkmale" />
          <PreviewTagList
            items={[
              ...traitNames,
              ...rules.classFeatures.slice(0, 3).map((feature) => feature.name),
            ]}
            empty="Noch keine Merkmale"
          />
        </div>

        <div>
          <PreviewSectionTitle title="Ressourcen" />
          <PreviewTagList
            items={rules.classResources.slice(0, 3).map(
              (resource) => `${resource.name} ${resource.remaining}/${resource.maximum}`,
            )}
            empty="Keine Ressourcen"
          />
        </div>
      </section>

      <div className="record-preview__fields">
        <RecordField label="Pronomen" value={pronouns} />
        <RecordField label="Gesinnung" value={alignment} />
        <RecordField label="Hintergrund" value={character.backgroundName} />
        <RecordField label="Transformation" value={character.transformation} />
      </div>

      <section className="record-preview__summary">
        <small>Aktenvermerk</small>
        <p>
          {character.summary.trim() ||
            "Noch wurde kein Vermerk über dieses Schicksal niedergeschrieben."}
        </p>
      </section>

      <footer className="record-preview__footer">
        <span aria-hidden="true">◆</span>
        <strong>GrimForge Live-Akte</strong>
        <span aria-hidden="true">◆</span>
      </footer>
    </article>
  );
}

function PreviewStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="record-preview__stat">
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

function PreviewSectionTitle({ title }: { title: string }) {
  return (
    <h3 className="record-preview__section-title">
      <span aria-hidden="true">◆</span>
      {title}
      <span aria-hidden="true">◆</span>
    </h3>
  );
}

function PreviewTagList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) {
    return <p className="record-preview__empty">{empty}</p>;
  }

  return (
    <ul className="record-preview__tags">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

interface RecordFieldProps {
  label: string;
  value?: string;
}

function RecordField({ label, value }: RecordFieldProps) {
  return (
    <section className="record-preview__field">
      <small>{label}</small>
      <strong>{value?.trim() || "Nicht festgelegt"}</strong>
    </section>
  );
}
