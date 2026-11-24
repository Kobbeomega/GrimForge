import { GrimforgeSeal } from "../icons/GrimforgeSeal";

import type {
  AppSectionId,
  NavigationItem,
} from "../../types/navigation";

interface BookNavigationProps {
  activeItemId: AppSectionId;
  onNavigate: (sectionId: AppSectionId) => void;
}

const navigationItems: NavigationItem[] = [
  {
    id: "character",
    chapter: "I",
    title: "Charaktere",
  },
  {
    id: "session",
    chapter: "II",
    title: "Spieltisch",
  },
  {
    id: "compendium",
    chapter: "III",
    title: "Kodex",
  },
  {
    id: "archive",
    chapter: "IV",
    title: "Datensicherung",
  },
];

export function BookNavigation({
  activeItemId,
  onNavigate,
}: BookNavigationProps) {
  return (
    <aside
      className="book-nav"
      aria-label="Hauptnavigation"
    >
      <div className="book-nav__logo">
        <GrimforgeSeal
          size={48}
          className="book-nav__seal"
          title="Grimforge"
        />
        <strong>GrimForge</strong>
      </div>

      <nav aria-label="Kapitel" className="book-nav__chapters">
        {navigationItems.map((item) => {
          const isActive = item.id === activeItemId;

          return (
            <button
              key={item.id}
              type="button"
              className={[
                "book-nav__item",
                isActive
                  ? "book-nav__item--active"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(item.id)}
            >
              <span className="book-nav__chapter">
                {item.chapter}
              </span>

              <span className="book-nav__title">
                {item.title}
              </span>

              <span
                className="book-nav__marker"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
