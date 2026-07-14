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
    title: "Akte",
  },
  {
    id: "session",
    chapter: "II",
    title: "Session",
  },
  {
    id: "journal",
    chapter: "III",
    title: "Journal",
  },
  {
    id: "archive",
    chapter: "IV",
    title: "Archiv",
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
      </div>

      <nav className="book-nav__chapters">
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