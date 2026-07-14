import type { CharacterStatus } from "../types";

interface CharacterArchiveToolbarProps {
  searchTerm: string;
  statusFilter: CharacterStatus | "all";
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (
    value: CharacterStatus | "all",
  ) => void;
}

const statusOptions: Array<{
  value: CharacterStatus | "all";
  label: string;
}> = [
  {
    value: "all",
    label: "Alle Akten",
  },
  {
    value: "active",
    label: "Aktiv",
  },
  {
    value: "draft",
    label: "Entwurf",
  },
  {
    value: "retired",
    label: "Im Ruhestand",
  },
  {
    value: "deceased",
    label: "Verstorben",
  },
];

export function CharacterArchiveToolbar({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: CharacterArchiveToolbarProps) {
  return (
    <section
      className="character-archive-toolbar"
      aria-label="Akten durchsuchen und filtern"
    >
      <label className="character-archive-toolbar__field">
        <span className="character-archive-toolbar__label">
          Archiv durchsuchen
        </span>

        <input
          className="character-archive-toolbar__input"
          type="search"
          value={searchTerm}
          placeholder="Name, Klasse oder Abstammung ..."
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </label>

      <label className="character-archive-toolbar__field">
        <span className="character-archive-toolbar__label">
          Aktenstatus
        </span>

        <select
          className="character-archive-toolbar__select"
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(
              event.target.value as
                | CharacterStatus
                | "all",
            )
          }
        >
          {statusOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}