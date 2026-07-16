import { classes } from "../../../../compendium/classes";
import { abilityLabels } from "../../../../compendium/core";
import { ArtworkHero } from "../../../../components/artwork";

interface ClassStepProps {
  selectedClassId: string;
  selectedSubclassId: string;
  onSelectClass: (classId: string) => void;
  onSelectSubclass: (subclassId: string) => void;
}

const featureKindLabels = {
  passive: "Passiv",
  action: "Aktion",
  "bonus-action": "Bonusaktion",
  reaction: "Reaktion",
  resource: "Ressource",
} as const;

const rechargeLabels = {
  turn: "pro Zug",
  "short-rest": "kurze Rast",
  "long-rest": "lange Rast",
} as const;

export function ClassStep({
  selectedClassId,
  selectedSubclassId,
  onSelectClass,
  onSelectSubclass,
}: ClassStepProps) {
  const selectedClass = classes.find((entry) => entry.id === selectedClassId);

  return (
    <section className="creator-section creator-dossier-step">
      <header className="creator-section__header creator-dossier-step__header">
        <div>
          <p className="creator-section__chapter">Kapitel IV</p>
          <h2>Klasse</h2>
          <p>
            Deine Klasse beschreibt nicht nur deine Kampftechnik. Sie ist der
            Pfad, auf dem du Macht gewinnst, Verbündete schützt und den Schrecken
            der Welt begegnest.
          </p>
        </div>

        <div className="creator-dossier-step__counter">
          <strong>{classes.length}</strong>
          <span>Pfade</span>
        </div>
      </header>

      <div className="creator-class-dossier-grid">
        {classes.map((entry, index) => {
          const selected = entry.id === selectedClassId;
          const primaryAbilities = entry.primaryAbilities
            .map((abilityId) => abilityLabels[abilityId])
            .join(" · ");
          const savingThrows = entry.savingThrows
            .map((abilityId) => abilityLabels[abilityId])
            .join(" · ");
          const levelOneFeatures = (entry.features ?? []).filter(
            (feature) => feature.level === 1,
          );

          return (
            <button
              key={entry.id}
              type="button"
              className={[
                "creator-class-dossier",
                selected ? "creator-class-dossier--selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={selected}
              onClick={() => onSelectClass(entry.id)}
            >
              <span className="creator-class-dossier__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <ArtworkHero
                category="class"
                entryId={entry.id}
                eyebrow={entry.spellcasting ? "Arkaner Pfad" : "Kampfpfad"}
                title={entry.name}
                description={entry.description}
                compact
                className="creator-class-dossier__artwork"
                badge={
                  <span className="creator-class-dossier__artwork-badge">
                    <small>Trefferwürfel</small>
                    <strong>W{entry.hitDie}</strong>
                  </span>
                }
              />

              <strong className="creator-class-dossier__choice">
                {selected ? "Gewählt" : "Wählen"}
              </strong>

              <dl className="creator-class-dossier__facts">
                <div>
                  <dt>Primärattribute</dt>
                  <dd>{primaryAbilities}</dd>
                </div>
                <div>
                  <dt>Rettungswürfe</dt>
                  <dd>{savingThrows}</dd>
                </div>
                <div>
                  <dt>Rüstung</dt>
                  <dd>
                    {entry.armorProficiencies.length > 0
                      ? entry.armorProficiencies.join(" · ")
                      : "Keine"}
                  </dd>
                </div>
                <div>
                  <dt>Waffen</dt>
                  <dd>
                    {entry.weaponProficiencies.length > 0
                      ? entry.weaponProficiencies.join(" · ")
                      : "Keine"}
                  </dd>
                </div>
              </dl>

              <section className="creator-class-dossier__features">
                <span>Du erhältst auf Stufe 1</span>
                {levelOneFeatures.length > 0 ? (
                  <ul>
                    {levelOneFeatures.map((feature) => (
                      <li key={feature.id}>
                        <div>
                          <strong>{feature.name}</strong>
                          <small>
                            {featureKindLabels[feature.kind]}
                            {feature.resource
                              ? ` · ${formatResourceAmount(feature.resource.amount)} / ${rechargeLabels[feature.resource.recharge]}`
                              : ""}
                          </small>
                        </div>
                        <p>{feature.description}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Die ersten Merkmale werden im Klassenkompendium ergänzt.</p>
                )}
              </section>

              <footer className="creator-class-dossier__footer">
                <span>{entry.subclasses.length} Unterklassen</span>
                <span>{entry.spellcasting ? "Zauberwirken" : "Ohne Zauberwirken"}</span>
              </footer>
            </button>
          );
        })}
      </div>

      {selectedClass && (
        <section className="creator-subclass-dossier">
          <header className="creator-subclass-dossier__header">
            <div>
              <span>Vertiefung des Pfades</span>
              <h3>Unterklasse für {selectedClass.name}</h3>
            </div>
            <p>Wähle die besondere Ausprägung, die deinen Weg prägen wird.</p>
          </header>

          <div className="creator-subclass-dossier__grid">
            {selectedClass.subclasses.map((subclass) => {
              const selected = selectedSubclassId === subclass.id;

              return (
                <button
                  key={subclass.id}
                  type="button"
                  className={[
                    "creator-subclass-card",
                    selected ? "creator-subclass-card--selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={selected}
                  onClick={() => onSelectSubclass(subclass.id)}
                >
                  <span>{selected ? "Gewählt" : "Unterklasse"}</span>
                  <strong>{subclass.name}</strong>
                  <p>{subclass.description}</p>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}

function formatResourceAmount(amount: number | string): string {
  if (typeof amount === "number") {
    return `${amount} Nutzung${amount === 1 ? "" : "en"}`;
  }

  const labels: Record<string, string> = {
    "proficiency-bonus": "Übungsbonus",
    "class-level": "Klassenstufe",
    "ability-modifier": "Attributsmodifikator",
  };

  return labels[amount] ?? amount;
}
