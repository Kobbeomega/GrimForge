export type AppSectionId =
  | "character"
  | "session"
  | "compendium"
  | "archive";

export interface NavigationItem {
  id: AppSectionId;
  chapter: string;
  title: string;
}
