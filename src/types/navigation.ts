export type AppSectionId =
  | "character"
  | "session"
  | "journal"
  | "archive";

export interface NavigationItem {
  id: AppSectionId;
  chapter: string;
  title: string;
}