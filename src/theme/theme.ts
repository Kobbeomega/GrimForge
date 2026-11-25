/**
 * GrimForge theme v1: synchronized with src/styles/theme.css.
 * Styles used by print/PDF live separately in src/modules/print.
 */
export const theme = {
  colors: {
    background: "#120e11",
    surface: "#191a1e",
    surfaceLight: "#242329",
    paper: "#eee4d5",
    paperDark: "#cabbab",
    primary: "#9d4054",
    primaryDark: "#491c29",
    primaryLight: "#f1abb5",
    blood: "#a65b58",
    border: "#50353e",
    text: "#f0eae1",
    textMuted: "#c6bdb3",
    success: "#7ca48a",
    warning: "#caa66c",
    danger: "#a65b58",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  radius: { none: 0 },
  border: { thin: "1px solid #50353e", thick: "2px solid #9d4054" },
  shadow: {
    paper: "0 0 18px rgba(0, 0, 0, .35)",
    glow: "0 0 14px rgba(143, 52, 73, .20)",
  },
  typography: {
    title: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "0.12em" },
    heading: { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "0.08em" },
    body: { fontFamily: "Georgia, serif", fontWeight: 400 },
    label: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const },
  },
  animation: { fast: "160ms ease", normal: "240ms ease", slow: "420ms ease" },
};
export type GrimforgeTheme = typeof theme;
