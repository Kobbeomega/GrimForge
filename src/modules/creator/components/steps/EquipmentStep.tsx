import {
  equipment,
  equipmentPacks,
  startingEquipment,
} from "../../../../compendium/equipment";

import { CodexCard } from "../../../../components/ui/CodexCard";

import type {
  ArmorItem,
  DamageType,
  EquipmentDefinition,
  WeaponItem,
  WeaponProperty,
} from "../../../../compendium/equipment";

import type {
  CharacterCreatorDraft,
  StartingEquipmentSelection,
} from "../../types";

interface EquipmentStepProps {
  draft: CharacterCreatorDraft;

  onSelectionsChange: (
    selections: StartingEquipmentSelection[],
  ) => void;
}

const damageTypeLabels: Record<
  DamageType,
  string
> = {
  slashing: "Hieb",
  piercing: "Stich",
  bludgeoning: "Wucht",
};

const weaponPropertyLabels: Record<
  WeaponProperty,
  string
> = {
  light: "Leicht",
  heavy: "Schwer",
  finesse: "Finesse",
  "two-handed": "Zweihändig",
  versatile: "Vielseitig",
  reach: "Reichweite",
  thrown: "Geworfen",
  loading: "Laden",
  ammunition: "Munition",
};

export function EquipmentStep({
  draft,
  onSelectionsChange,
}: EquipmentStepProps) {
  const configuration =
    startingEquipment.find(
      (entry) =>
        entry.classId === draft.classId,
    );

  if (!draft.classId) {
    return (
      <EquipmentNotice
        title="Keine Klasse gewählt"
        description="Wähle zuerst in Kapitel III eine Klasse. Danach erscheint hier die passende Startausrüstung."
      />
    );
  }

  if (!configuration) {
    return (
      <EquipmentNotice
        title="Keine Startausrüstung hinterlegt"
        description="Für die gewählte Klasse wurde noch keine Startausrüstung definiert. Du kannst die Akte trotzdem fortsetzen und das Inventar später manuell befüllen."
      />
    );
  }

  function selectEquipment(
    choiceId: string,
    equipmentId: string,
  ) {
    const remainingSelections =
      draft.startingEquipmentSelections.filter(
        (selection) =>
          selection.choiceId !== choiceId,
      );

    onSelectionsChange([
      ...remainingSelections,
      {
        choiceId,
        equipmentId,
      },
    ]);
  }

  function isEquipmentSelected(
    choiceId: string,
    equipmentId: string,
  ): boolean {
    return draft.startingEquipmentSelections.some(
      (selection) =>
        selection.choiceId === choiceId &&
        selection.equipmentId === equipmentId,
    );
  }

  const completedChoiceCount =
    configuration.choices.filter(
      (choice) =>
        draft.startingEquipmentSelections.some(
          (selection) =>
            selection.choiceId === choice.id,
        ),
    ).length;

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel V
        </p>

        <h2>Startausrüstung</h2>

        <p>
          Wähle die Ausrüstung, mit der dein
          Charakter seine Reise beginnt.
          Garantierte Gegenstände und Pakete werden
          beim Versiegeln automatisch in das
          Inventar übernommen.
        </p>
      </header>

      <section className="creator-equipment-progress">
        <span>Auswahlfortschritt</span>

        <strong>
          {completedChoiceCount} von{" "}
          {configuration.choices.length}
        </strong>
      </section>

      {configuration.choices.map((choice) => (
        <section
          key={choice.id}
          className="creator-equipment-group"
        >
          <header className="creator-equipment-group__header">
            <p className="creator-section__chapter">
              Wähle einen Eintrag
            </p>

            <h3>{choice.title}</h3>
          </header>

          <div className="creator-card-grid">
            {choice.options.map((equipmentId) => {
              const item = equipment.find(
                (entry) =>
                  entry.id === equipmentId,
              );

              if (!item) {
                return (
                  <MissingEquipmentCard
                    key={equipmentId}
                    equipmentId={equipmentId}
                  />
                );
              }

              const selected =
                isEquipmentSelected(
                  choice.id,
                  equipmentId,
                );

              return (
                <EquipmentChoiceCard
                  key={item.id}
                  item={item}
                  selected={selected}
                  onSelect={() =>
                    selectEquipment(
                      choice.id,
                      item.id,
                    )
                  }
                />
              );
            })}
          </div>
        </section>
      ))}

      {configuration.guaranteedEquipment.length >
        0 && (
        <section className="creator-equipment-group">
          <header className="creator-equipment-group__header">
            <p className="creator-section__chapter">
              Festgelegte Ausrüstung
            </p>

            <h3>Automatisch enthalten</h3>

            <p>
              Diese Gegenstände gehören unabhängig
              von deiner Auswahl zur
              Startausrüstung.
            </p>
          </header>

          <div className="creator-card-grid">
            {configuration.guaranteedEquipment.map(
              (equipmentId) => {
                const item = equipment.find(
                  (entry) =>
                    entry.id === equipmentId,
                );

                if (!item) {
                  return (
                    <MissingEquipmentCard
                      key={equipmentId}
                      equipmentId={equipmentId}
                    />
                  );
                }

                return (
                  <CodexCard
                    key={item.id}
                    eyebrow="Automatisch enthalten"
                    title={item.name}
                    description={
                      item.description ??
                      getEquipmentDescription(item)
                    }
                    metadata={
                      getEquipmentMetadata(item)
                    }
                    className="creator-equipment-card creator-equipment-card--guaranteed"
                  >
                    <EquipmentDetails
                      item={item}
                    />
                  </CodexCard>
                );
              },
            )}
          </div>
        </section>
      )}

      {configuration.guaranteedPacks.length >
        0 && (
        <section className="creator-equipment-group">
          <header className="creator-equipment-group__header">
            <p className="creator-section__chapter">
              Reiseausrüstung
            </p>

            <h3>Ausrüstungspakete</h3>

            <p>
              Der vollständige Inhalt dieser Pakete
              wird beim Versiegeln einzeln in das
              Inventar übertragen.
            </p>
          </header>

          <div className="creator-card-grid">
            {configuration.guaranteedPacks.map(
              (packId) => {
                const pack =
                  equipmentPacks.find(
                    (entry) =>
                      entry.id === packId,
                  );

                if (!pack) {
                  return (
                    <MissingEquipmentCard
                      key={packId}
                      equipmentId={packId}
                    />
                  );
                }

                const totalItemCount =
                  pack.items.reduce(
                    (sum, entry) =>
                      sum + entry.quantity,
                    0,
                  );

                return (
                  <CodexCard
                    key={pack.id}
                    eyebrow="Automatisch enthalten"
                    title={pack.name}
                    description="Ein vollständiges Paket für die ersten Schritte in der Wildnis."
                    metadata={[
                      `${pack.items.length} verschiedene Gegenstände`,
                      `${totalItemCount} Teile insgesamt`,
                    ]}
                    className="creator-equipment-card creator-equipment-card--pack"
                  >
                    <ul className="creator-equipment-pack-list">
                      {pack.items.map(
                        (packItem) => {
                          const item =
                            equipment.find(
                              (entry) =>
                                entry.id ===
                                packItem.equipmentId,
                            );

                          return (
                            <li
                              key={
                                packItem.equipmentId
                              }
                            >
                              <span>
                                {item?.name ??
                                  packItem.equipmentId}
                              </span>

                              <strong>
                                ×
                                {
                                  packItem.quantity
                                }
                              </strong>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </CodexCard>
                );
              },
            )}
          </div>
        </section>
      )}
    </section>
  );
}

interface EquipmentChoiceCardProps {
  item: EquipmentDefinition;
  selected: boolean;
  onSelect: () => void;
}

function EquipmentChoiceCard({
  item,
  selected,
  onSelect,
}: EquipmentChoiceCardProps) {
  return (
    <CodexCard
      eyebrow={
        selected
          ? "Ausgewählt"
          : getEquipmentCategoryLabel(item)
      }
      title={item.name}
      description={
        item.description ??
        getEquipmentDescription(item)
      }
      metadata={getEquipmentMetadata(item)}
      selected={selected}
      className="creator-equipment-card"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <EquipmentDetails item={item} />

      <span className="creator-equipment-card__selection">
        {selected
          ? "Für die Akte gewählt"
          : "Antippen zum Auswählen"}
      </span>
    </CodexCard>
  );
}

function EquipmentDetails({
  item,
}: {
  item: EquipmentDefinition;
}) {
  if (item.category === "weapon") {
    return (
      <dl className="creator-equipment-facts">
        <div>
          <dt>Schaden</dt>

          <dd>
            {formatDamage(item)}
          </dd>
        </div>

        {item.versatile && (
          <div>
            <dt>Vielseitig</dt>

            <dd>
              {item.versatile.dice}W
              {item.versatile.die}{" "}
              {
                damageTypeLabels[
                  item.versatile.type
                ]
              }
            </dd>
          </div>
        )}

        {item.range && (
          <div>
            <dt>Reichweite</dt>

            <dd>
              {item.range.normal}
              {item.range.long
                ? ` / ${item.range.long}`
                : ""}
            </dd>
          </div>
        )}

        <div>
          <dt>Eigenschaften</dt>

          <dd>
            {item.properties.length > 0
              ? item.properties
                  .map(
                    (property) =>
                      weaponPropertyLabels[
                        property
                      ],
                  )
                  .join(" · ")
              : "Keine"}
          </dd>
        </div>
      </dl>
    );
  }

  if (
    item.category === "armor" ||
    item.category === "shield"
  ) {
    return (
      <dl className="creator-equipment-facts">
        <div>
          <dt>Rüstungsklasse</dt>

          <dd>
            {item.category === "shield"
              ? `+${item.armorClass}`
              : item.armorClass}
          </dd>
        </div>

        <div>
          <dt>Geschicklichkeit</dt>

          <dd>
            {getDexterityDescription(item)}
          </dd>
        </div>

        {item.strengthRequirement && (
          <div>
            <dt>Mindeststärke</dt>

            <dd>
              {item.strengthRequirement}
            </dd>
          </div>
        )}

        <div>
          <dt>Heimlichkeit</dt>

          <dd>
            {item.stealthDisadvantage
              ? "Nachteil"
              : "Kein Nachteil"}
          </dd>
        </div>
      </dl>
    );
  }

  return (
    <dl className="creator-equipment-facts">
      <div>
        <dt>Kategorie</dt>

        <dd>
          {getEquipmentCategoryLabel(item)}
        </dd>
      </div>

      <div>
        <dt>Verwendung</dt>

        <dd>
          {item.category === "consumable"
            ? "Verbrauchsgut"
            : "Allgemeine Ausrüstung"}
        </dd>
      </div>
    </dl>
  );
}

function EquipmentNotice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel V
        </p>

        <h2>Startausrüstung</h2>

        <p>{description}</p>
      </header>

      <div className="creator-equipment-notice">
        <strong>{title}</strong>

        <span>
          Kehre bei Bedarf zum vorherigen Kapitel
          zurück.
        </span>
      </div>
    </section>
  );
}

function MissingEquipmentCard({
  equipmentId,
}: {
  equipmentId: string;
}) {
  return (
    <CodexCard
      eyebrow="Fehlender Eintrag"
      title={equipmentId}
      description="Diese Equipment-ID wurde in der Startausrüstung hinterlegt, existiert aber nicht im Compendium."
      metadata={[
        "Compendium prüfen",
      ]}
      className="creator-equipment-card creator-equipment-card--missing"
    />
  );
}

function getEquipmentMetadata(
  item: EquipmentDefinition,
): string[] {
  const metadata = [
    `Gewicht: ${formatWeight(item.weight)}`,
    `Preis: ${formatPrice(item.price)}`,
  ];

  if (item.category === "weapon") {
    metadata.unshift(formatDamage(item));

    if (item.versatile) {
      metadata.push(
        `Vielseitig: ${item.versatile.dice}W${item.versatile.die}`,
      );
    }
  }

  if (
    item.category === "armor" ||
    item.category === "shield"
  ) {
    metadata.unshift(
      item.category === "shield"
        ? `RK +${item.armorClass}`
        : `RK ${item.armorClass}`,
    );
  }

  return metadata;
}

function getEquipmentDescription(
  item: EquipmentDefinition,
): string {
  switch (item.category) {
    case "weapon":
      return `${getWeaponCategoryLabel(
        item,
      )} mit ${formatDamage(item)}.`;

    case "armor":
      return "Schützende Rüstung für den bevorstehenden Weg.";

    case "shield":
      return "Ein Schild, der die Rüstungsklasse erhöht.";

    case "consumable":
      return "Ein Verbrauchsgut für Reise und Abenteuer.";

    case "tool":
      return "Ein Werkzeug für besondere Aufgaben.";

    case "gear":
    default:
      return "Allgemeine Reise- und Abenteuerausrüstung.";
  }
}

function getEquipmentCategoryLabel(
  item: EquipmentDefinition,
): string {
  switch (item.category) {
    case "weapon":
      return getWeaponCategoryLabel(item);

    case "armor":
      return "Rüstung";

    case "shield":
      return "Schild";

    case "consumable":
      return "Verbrauchsgut";

    case "tool":
      return "Werkzeug";

    case "gear":
    default:
      return "Ausrüstung";
  }
}

function getWeaponCategoryLabel(
  item: WeaponItem,
): string {
  return item.weaponCategory === "martial"
    ? "Kriegswaffe"
    : "Einfache Waffe";
}

function formatDamage(
  item: WeaponItem,
): string {
  return `${item.damage.dice}W${item.damage.die} ${
    damageTypeLabels[item.damage.type]
  }`;
}

function getDexterityDescription(
  item: ArmorItem,
): string {
  if (!item.dexterityModifier) {
    return "Kein GE-Bonus";
  }

  if (
    typeof item.maximumDexterityBonus ===
    "number"
  ) {
    return `GE-Bonus bis +${item.maximumDexterityBonus}`;
  }

  return "Voller GE-Bonus";
}

function formatWeight(
  weight: number,
): string {
  return `${new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 2,
  }).format(weight)} lb`;
}

function formatPrice(
  price: number,
): string {
  if (price >= 1) {
    return `${new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: 2,
    }).format(price)} GM`;
  }

  const silver = price * 10;

  if (silver >= 1) {
    return `${new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: 2,
    }).format(silver)} SM`;
  }

  const copper = price * 100;

  return `${new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 0,
  }).format(copper)} KM`;
}