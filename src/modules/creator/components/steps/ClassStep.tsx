import { classes } from "../../../../compendium/classes";
import {
  abilityLabels,
} from "../../../../compendium/core";

import { CodexCard } from "../../../../components/ui/CodexCard";

interface ClassStepProps {
  selectedClassId: string;
  selectedSubclassId: string;
  onSelectClass: (classId: string) => void;
  onSelectSubclass: (subclassId: string) => void;
}

export function ClassStep({
  selectedClassId,
  selectedSubclassId,
  onSelectClass,
  onSelectSubclass,
}: ClassStepProps) {
  const selectedClass = classes.find(
    (entry) => entry.id === selectedClassId,
  );

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel III
        </p>

        <h2>Klasse</h2>

        <p>
          Wähle den Pfad, auf dem dein Charakter
          die Dunkelheit durchschreiten wird.
        </p>
      </header>

      <div className="creator-card-grid">
        {classes.map((entry) => {
          const selected =
            entry.id === selectedClassId;

          const primaryAbilities =
            entry.primaryAbilities
              .map(
                (abilityId) =>
                  abilityLabels[abilityId],
              )
              .join(", ");

          const savingThrows =
            entry.savingThrows
              .map(
                (abilityId) =>
                  abilityLabels[abilityId],
              )
              .join(", ");

          return (
            <CodexCard
              key={entry.id}
              eyebrow={`Trefferwürfel W${entry.hitDie}`}
              title={entry.name}
              description={entry.description}
              selected={selected}
              onClick={() =>
                onSelectClass(entry.id)
              }
              metadata={[
                entry.spellcasting
                  ? "Zauberwirker"
                  : "Nichtmagisch",
                `Primär: ${primaryAbilities}`,
                `Rettung: ${savingThrows}`,
              ]}
            >
              <dl className="creator-class-facts">
                <div>
                  <dt>Rüstung</dt>
                  <dd>
                    {entry.armorProficiencies.length > 0
                      ? entry.armorProficiencies.join(", ")
                      : "Keine"}
                  </dd>
                </div>

                <div>
                  <dt>Waffen</dt>
                  <dd>
                    {entry.weaponProficiencies.join(", ")}
                  </dd>
                </div>

                <div>
                  <dt>Unterklassen</dt>
                  <dd>{entry.subclasses.length}</dd>
                </div>
              </dl>
            </CodexCard>
          );
        })}
      </div>

      {selectedClass && (
        <section className="creator-subclass-section">
          <div className="creator-subclass-section__header">
            <p className="creator-section__chapter">
              Vertiefung des Pfades
            </p>

            <h3>
              Unterklasse für {selectedClass.name}
            </h3>

            <p>
              Die Auswahl wird bereits gespeichert.
              Stufenbeschränkungen ergänzen wir später.
            </p>
          </div>

          <div className="creator-subclass-grid">
            {selectedClass.subclasses.map(
              (subclass) => (
                <button
                  key={subclass.id}
                  type="button"
                  className={[
                    "creator-subclass-card",
                    selectedSubclassId === subclass.id
                      ? "creator-subclass-card--selected"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() =>
                    onSelectSubclass(subclass.id)
                  }
                >
                  <strong>{subclass.name}</strong>

                  <span>
                    {subclass.description}
                  </span>
                </button>
              ),
            )}
          </div>
        </section>
      )}
    </section>
  );
}