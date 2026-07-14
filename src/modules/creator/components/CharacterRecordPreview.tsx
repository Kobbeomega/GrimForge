interface CharacterRecordPreviewProps {
  fileNumber: string;
  name: string;
  title: string;
  pronouns: string;
  alignment: string;
  ancestry: string;
  ancestryVariant?: string;
  className: string;
  subclass?: string;
  level: number;
  summary: string;
  status?: string;
}

export function CharacterRecordPreview({
  fileNumber,
  name,
  title,
  pronouns,
  alignment,
  ancestry,
  ancestryVariant,
  className,
  subclass,
  level,
  summary,
  status = "Entwurf",
}: CharacterRecordPreviewProps) {
  const ancestryLabel = [ancestry, ancestryVariant]
    .filter(Boolean)
    .join(" · ");

  const classLabel = [className, subclass]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="record-preview">
      <div
        className="record-preview__corner"
        aria-hidden="true"
      />

      <header className="record-preview__header">
        <p className="record-preview__file-number">
          {fileNumber}
        </p>

        <h2 className="record-preview__name">
          {name.trim() || "Unbenannte Akte"}
        </h2>

        <p className="record-preview__title">
          {title.trim() || "Noch ohne Titel"}
        </p>
      </header>

      <div className="record-preview__fields">
        <RecordField
          label="Pronomen"
          value={pronouns}
        />

        <RecordField
          label="Gesinnung"
          value={alignment}
        />

        <RecordField
          label="Abstammung"
          value={ancestryLabel}
        />

        <RecordField
          label="Klasse"
          value={classLabel}
        />

        <RecordField
          label="Stufe"
          value={String(level)}
        />

        <RecordField
          label="Status"
          value={status}
        />
      </div>

      <section className="record-preview__summary">
        <small>Aktenvermerk</small>

        <p>
          {summary.trim() ||
            "Noch wurde kein Vermerk über dieses Schicksal niedergeschrieben."}
        </p>
      </section>

      <footer className="record-preview__footer">
        <span aria-hidden="true">◆</span>
        <strong>Grimforge-Archiv</strong>
        <span aria-hidden="true">◆</span>
      </footer>
    </article>
  );
}

interface RecordFieldProps {
  label: string;
  value?: string;
}

function RecordField({
  label,
  value,
}: RecordFieldProps) {
  return (
    <section className="record-preview__field">
      <small>{label}</small>

      <strong>
        {value?.trim() || "Nicht festgelegt"}
      </strong>
    </section>
  );
}