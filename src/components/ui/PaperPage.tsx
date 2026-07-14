import type { ReactNode } from "react";

interface PaperPageProps {
  children: ReactNode;
}

export function PaperPage({
  children,
}: PaperPageProps) {
  return (
    <section className="paper-page">

      <div className="paper-page__inner">

        {children}

      </div>

    </section>
  );
}