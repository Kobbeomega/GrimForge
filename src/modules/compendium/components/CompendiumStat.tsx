interface CompendiumStatProps {
  label: string;
  value: string | number;
}

export function CompendiumStat({
  label,
  value,
}: CompendiumStatProps) {
  return (
    <div className="compendium-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
