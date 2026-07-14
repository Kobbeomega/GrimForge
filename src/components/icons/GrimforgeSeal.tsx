interface GrimforgeSealProps {
  size?: number;
  className?: string;
  title?: string;
}

export function GrimforgeSeal({
  size = 48,
  className = "",
  title = "Grimforge-Siegel",
}: GrimforgeSealProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <circle
        cx="32"
        cy="32"
        r="25"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="32"
        cy="32"
        r="19"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.7"
      />

      <path
        d="M32 8L36 24L52 20L40 32L52 44L36 40L32 56L28 40L12 44L24 32L12 20L28 24L32 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M32 20V44M20 32H44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />

      <path
        d="M25 25L39 39M39 25L25 39"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
      />

      <circle
        cx="32"
        cy="32"
        r="4"
        fill="currentColor"
      />
    </svg>
  );
}