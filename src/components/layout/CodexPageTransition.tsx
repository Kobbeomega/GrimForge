import type { ReactNode } from "react";

interface CodexPageTransitionProps {
  pageKey: string;
  children: ReactNode;
}

export function CodexPageTransition({
  pageKey,
  children,
}: CodexPageTransitionProps) {
  return (
    <div
      key={pageKey}
      className="codex-page-transition"
    >
      {children}
    </div>
  );
}