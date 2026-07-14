import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GrimButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: ReactNode;

  fullWidth?: boolean;
}

export function GrimButton({
  children,
  fullWidth = false,
  className = "",
  ...props
}: GrimButtonProps) {

  return (
    <button
      className={[
        "grim-button",
        fullWidth ? "grim-button--full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="grim-button__inner">

        {children}

      </span>
    </button>
  );
}