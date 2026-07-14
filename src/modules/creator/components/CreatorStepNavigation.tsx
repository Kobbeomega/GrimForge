import {
  creatorSteps,
  type CreatorStepId,
} from "../types";

interface CreatorStepNavigationProps {
  activeStepId: CreatorStepId;
  completedStepIds: CreatorStepId[];
  onStepChange: (stepId: CreatorStepId) => void;
}

export function CreatorStepNavigation({
  activeStepId,
  completedStepIds,
  onStepChange,
}: CreatorStepNavigationProps) {
  return (
    <nav
      className="creator-step-nav"
      aria-label="Kapitel der Charaktererstellung"
    >
      <ol className="creator-step-nav__list">
        {creatorSteps.map((step, index) => {
          const isActive = step.id === activeStepId;
          const isCompleted =
            completedStepIds.includes(step.id);

          return (
            <li
              key={step.id}
              className="creator-step-nav__entry"
            >
              <button
                type="button"
                className={[
                  "creator-step-nav__button",
                  isActive
                    ? "creator-step-nav__button--active"
                    : "",
                  isCompleted
                    ? "creator-step-nav__button--completed"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={
                  isActive ? "step" : undefined
                }
                onClick={() => onStepChange(step.id)}
              >
                <span className="creator-step-nav__chapter">
                  {step.chapter}
                </span>

                <span className="creator-step-nav__copy">
                  <strong>{step.shortTitle}</strong>

                  <small>
                    {isCompleted
                      ? "Abgeschlossen"
                      : isActive
                        ? "Aktives Kapitel"
                        : "Noch offen"}
                  </small>
                </span>

                <span
                  className="creator-step-nav__seal"
                  aria-hidden="true"
                >
                  {isCompleted ? "◆" : "◇"}
                </span>
              </button>

              {index < creatorSteps.length - 1 && (
                <span
                  className="creator-step-nav__line"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}