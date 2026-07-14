import type { CharacterIdentityDraft } from "../../types";

interface IdentityStepProps {
  value: CharacterIdentityDraft;
  onChange: (
    value: CharacterIdentityDraft,
  ) => void;
}

export function IdentityStep({
  value,
  onChange,
}: IdentityStepProps) {
  function updateField<
    K extends keyof CharacterIdentityDraft,
  >(key: K, fieldValue: CharacterIdentityDraft[K]) {
    onChange({
      ...value,
      [key]: fieldValue,
    });
  }

  return (
    <section className="creator-section">

      <header className="creator-section__header">
        <p className="creator-section__chapter">
          Kapitel I
        </p>

        <h2>Identität</h2>

        <p>
          Jede Geschichte beginnt mit einem Namen.
        </p>
      </header>

      <div className="grim-form">

        <label className="grim-field">

          <span>Name</span>

          <input
            type="text"
            placeholder="z.B. Aldric von Dornheim"
            value={value.name}
            onChange={(event) =>
              updateField(
                "name",
                event.target.value,
              )
            }
          />

        </label>

        <label className="grim-field">

          <span>Titel</span>

          <input
            type="text"
            placeholder="Der Gefallene Ritter"
            value={value.title}
            onChange={(event) =>
              updateField(
                "title",
                event.target.value,
              )
            }
          />

        </label>

        <label className="grim-field">

          <span>Pronomen</span>

          <input
            type="text"
            placeholder="er / sie / divers"
            value={value.pronouns}
            onChange={(event) =>
              updateField(
                "pronouns",
                event.target.value,
              )
            }
          />

        </label>

        <label className="grim-field">

          <span>Gesinnung</span>

          <input
            type="text"
            placeholder="frei wählbar"
            value={value.alignment}
            onChange={(event) =>
              updateField(
                "alignment",
                event.target.value,
              )
            }
          />

        </label>

        <label className="grim-field">

          <span>Beschreibung</span>

          <textarea
            rows={6}
            placeholder="Ein kurzer Eintrag über den Charakter..."
            value={value.summary}
            onChange={(event) =>
              updateField(
                "summary",
                event.target.value,
              )
            }
          />

        </label>

      </div>

    </section>
  );
}