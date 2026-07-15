import {
  classes,
} from "../../../../compendium/classes";

import {
  abilityLabels,
} from "../../../../compendium/core";

interface ClassStepProps {
  selectedClassId: string;
  selectedSubclassId: string;

  onSelectClass: (
    classId: string,
  ) => void;

  onSelectSubclass: (
    subclassId: string,
  ) => void;
}

export function ClassStep({
  selectedClassId,
  selectedSubclassId,
  onSelectClass,
  onSelectSubclass,
}: ClassStepProps) {
  const selectedClass =
    classes.find(
      (entry) =>
        entry.id ===
        selectedClassId,
    );

  return (
    <section className="creator-section">
      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel IV
        </p>

        <h2>Klasse</h2>

        <p>
          Wähle den Pfad, auf dem dein
          Charakter die Dunkelheit
          durchschreiten wird.
        </p>
      </header>

      <div className="compact-class-grid">
        {classes.map((entry) => {
          const selected =
            entry.id ===
            selectedClassId;

          const primaryAbilities =
            entry.primaryAbilities
              .map(
                (abilityId) =>
                  abilityLabels[
                    abilityId
                  ],
              )
              .join(" · ");

          const savingThrows =
            entry.savingThrows
              .map(
                (abilityId) =>
                  abilityLabels[
                    abilityId
                  ],
              )
              .join(" · ");

          const armor =
            entry
              .armorProficiencies
              .length > 0
              ? entry
                  .armorProficiencies
                  .join(" · ")
              : "Keine Rüstung";

          const weapons =
            entry
              .weaponProficiencies
              .length > 0
              ? entry
                  .weaponProficiencies
                  .join(" · ")
              : "Keine Waffenübung";

          return (
            <button
              key={entry.id}
              type="button"
              className={[
                "compact-class-card",

                selected
                  ? "compact-class-card--selected"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={selected}
              onClick={() =>
                onSelectClass(
                  entry.id,
                )
              }
            >
              <header className="compact-class-card__header">
                <div>
                  <span>
                    Trefferwürfel W
                    {entry.hitDie}
                  </span>

                  <h3>
                    {entry.name}
                  </h3>
                </div>

                <strong>
                  {selected
                    ? "Gewählt"
                    : "Wählen"}
                </strong>
              </header>

              <p className="compact-class-card__description">
                {entry.description}
              </p>

              <div className="compact-class-card__tags">
                <span>
                  {entry.spellcasting
                    ? "Zauberwirker"
                    : "Nichtmagisch"}
                </span>

                <span>
                  Primär:{" "}
                  {primaryAbilities}
                </span>

                <span>
                  Rettung:{" "}
                  {savingThrows}
                </span>
              </div>

              <dl className="compact-class-card__facts">
                <div>
                  <dt>Rüstung</dt>

                  <dd>{armor}</dd>
                </div>

                <div>
                  <dt>Waffen</dt>

                  <dd>{weapons}</dd>
                </div>

                <div>
                  <dt>Unterklassen</dt>

                  <dd>
                    {
                      entry
                        .subclasses
                        .length
                    }
                  </dd>
                </div>
              </dl>
            </button>
          );
        })}
      </div>

      {selectedClass && (
        <section className="compact-subclass-section">
          <header className="compact-subclass-section__header">
            <div>
              <p>
                Vertiefung des Pfades
              </p>

              <h3>
                Unterklasse für{" "}
                {selectedClass.name}
              </h3>
            </div>

            <span>
              Wähle die besondere
              Ausprägung deines Pfades.
            </span>
          </header>

          <div className="compact-subclass-grid">
            {selectedClass
              .subclasses
              .map(
                (subclass) => {
                  const selected =
                    selectedSubclassId ===
                    subclass.id;

                  return (
                    <button
                      key={
                        subclass.id
                      }
                      type="button"
                      className={[
                        "compact-subclass-card",

                        selected
                          ? "compact-subclass-card--selected"
                          : "",
                      ]
                        .filter(
                          Boolean,
                        )
                        .join(" ")}
                      aria-pressed={
                        selected
                      }
                      onClick={() =>
                        onSelectSubclass(
                          subclass.id,
                        )
                      }
                    >
                      <span>
                        {selected
                          ? "Gewählt"
                          : "Unterklasse"}
                      </span>

                      <strong>
                        {
                          subclass.name
                        }
                      </strong>

                      <p>
                        {
                          subclass
                            .description
                        }
                      </p>
                    </button>
                  );
                },
              )}
          </div>
        </section>
      )}
    </section>
  );
}