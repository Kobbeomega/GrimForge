import {
  equipmentPacks,
  getEquipmentById,
  startingEquipment,
} from "../../../../compendium/equipment";

import { CodexCard } from "../../../../components/ui/CodexCard";

import type {
  StartingEquipmentOption,
} from "../../../../compendium/equipment";

import type {
  CharacterCreatorDraft,
  StartingEquipmentSelection,
} from "../../types";

interface EquipmentStepProps {
  draft: CharacterCreatorDraft;

  onSelectionsChange: (
    selections:
      StartingEquipmentSelection[],
  ) => void;
}

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
        description="Wähle zuerst eine Klasse, damit Grimforge die passende Startausrüstung anzeigen kann."
      />
    );
  }

  if (!configuration) {
    return (
      <EquipmentNotice
        title="Keine Startausrüstung hinterlegt"
        description="Für diese Klasse wurde noch keine Startausrüstung definiert."
      />
    );
  }

  function selectOption(
    choiceId: string,
    optionId: string,
  ) {
    const remaining =
      draft.startingEquipmentSelections
        .filter(
          (selection) =>
            selection.choiceId !==
            choiceId,
        );

    onSelectionsChange([
      ...remaining,
      {
        choiceId,
        optionId,
      },
    ]);
  }

  const completedChoices =
    configuration.choices.filter(
      (choice) =>
        draft
          .startingEquipmentSelections
          .some(
            (selection) =>
              selection.choiceId ===
              choice.id,
          ),
    ).length;

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel VII
        </p>

        <h2>Startausrüstung</h2>

        <p>
          Wähle für jede Gruppe eine Option.
          Mehrteilige Optionen werden beim
          Versiegeln vollständig in das Inventar
          übertragen.
        </p>
      </header>

      <section className="creator-equipment-progress">
        <span>Auswahlfortschritt</span>

        <strong>
          {completedChoices} von{" "}
          {configuration.choices.length}
        </strong>
      </section>

      {configuration.choices.map(
        (choice) => (
          <section
            key={choice.id}
            className="creator-equipment-group"
          >
            <header className="creator-equipment-group__header">
              <p className="creator-section__chapter">
                Wähle eine Option
              </p>

              <h3>{choice.title}</h3>
            </header>

            <div className="creator-card-grid">
              {choice.options.map(
                (option) => {
                  const selected =
                    draft
                      .startingEquipmentSelections
                      .some(
                        (selection) =>
                          selection.choiceId ===
                            choice.id &&
                          selection.optionId ===
                            option.id,
                      );

                  return (
                    <EquipmentOptionCard
                      key={option.id}
                      option={option}
                      selected={selected}
                      onSelect={() =>
                        selectOption(
                          choice.id,
                          option.id,
                        )
                      }
                    />
                  );
                },
              )}
            </div>
          </section>
        ),
      )}

      {configuration.guaranteedEquipment
        .length > 0 && (
        <section className="creator-equipment-group">
          <header className="creator-equipment-group__header">
            <p className="creator-section__chapter">
              Fest enthalten
            </p>

            <h3>Garantierte Ausrüstung</h3>
          </header>

          <ul className="creator-equipment-pack-list">
            {configuration
              .guaranteedEquipment
              .map((entry) => {
                const definition =
                  getEquipmentById(
                    entry.equipmentId,
                  );

                return (
                  <li
                    key={entry.equipmentId}
                  >
                    <span>
                      {definition?.name ??
                        entry.equipmentId}
                    </span>

                    <strong>
                      ×{entry.quantity}
                    </strong>
                  </li>
                );
              })}
          </ul>
        </section>
      )}

      {configuration.guaranteedPacks
        .length > 0 && (
        <section className="creator-equipment-group">
          <header className="creator-equipment-group__header">
            <p className="creator-section__chapter">
              Fest enthalten
            </p>

            <h3>Ausrüstungspakete</h3>
          </header>

          <ul className="creator-equipment-pack-list">
            {configuration.guaranteedPacks.map(
              (packId) => {
                const pack =
                  equipmentPacks.find(
                    (entry) =>
                      entry.id === packId,
                  );

                return (
                  <li key={packId}>
                    <span>
                      {pack?.name ?? packId}
                    </span>
                  </li>
                );
              },
            )}
          </ul>
        </section>
      )}
    </section>
  );
}

interface EquipmentOptionCardProps {
  option: StartingEquipmentOption;
  selected: boolean;
  onSelect: () => void;
}

function EquipmentOptionCard({
  option,
  selected,
  onSelect,
}: EquipmentOptionCardProps) {
  const equipmentLabels =
    option.equipment?.map((entry) => {
      const definition =
        getEquipmentById(
          entry.equipmentId,
        );

      return `${entry.quantity}× ${
        definition?.name ??
        entry.equipmentId
      }`;
    }) ?? [];

  const packLabels =
    option.packIds?.map((packId) => {
      const pack =
        equipmentPacks.find(
          (entry) =>
            entry.id === packId,
        );

      return pack?.name ?? packId;
    }) ?? [];

  const labels = [
    ...equipmentLabels,
    ...packLabels,
  ];

  return (
    <CodexCard
      eyebrow={
        selected
          ? "Ausgewählt"
          : "Startausrüstung"
      }
      title={option.title}
      description={
        option.description ??
        "Diese Option wird vollständig in das Inventar übertragen."
      }
      metadata={labels}
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
    />
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
          Kapitel VII
        </p>

        <h2>Startausrüstung</h2>

        <p>{description}</p>
      </header>

      <div className="creator-equipment-notice">
        <strong>{title}</strong>

        <span>
          Kehre bei Bedarf zum Klassenkapitel
          zurück.
        </span>
      </div>
    </section>
  );
}