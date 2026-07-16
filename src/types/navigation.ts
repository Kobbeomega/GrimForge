export type AppSectionId =
  | "character"
  | "session"
  | "journal"
  | "compendium"
  | "archive";

export interface NavigationItem {
  id: AppSectionId;
  chapter: string;
  title: string;
}