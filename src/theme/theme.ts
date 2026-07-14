/**
 * Grimforge Companion
 * Theme Engine
 *
 * Alle globalen Farben, Schriften, Abstände und Animationen
 * werden ausschließlich hier definiert.
 */

export const theme = {
  colors: {
    background: "#09090B",
    surface: "#141317",
    surfaceLight: "#1C1A21",

    paper: "#DCCFBE",
    paperDark: "#B5A999",

    primary: "#6A3C92",
    primaryDark: "#36204F",
    primaryLight: "#9C69D3",

    blood: "#8E223F",

    border: "#2E2B33",

    text: "#ECE8E1",
    textMuted: "#AAA29A",

    success: "#4D7A5A",
    warning: "#B98A2D",
    danger: "#A3384B",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  radius: {
    none: 0,
  },

  border: {
    thin: "1px solid #2E2B33",
    thick: "2px solid #6A3C92",
  },

  shadow: {
    paper:
      "0 0 18px rgba(0,0,0,.35)",

    glow:
      "0 0 14px rgba(106,60,146,.25)",
  },

  typography: {
    title: {
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      letterSpacing: "0.12em",
    },

    heading: {
      fontFamily: "Georgia, serif",
      fontWeight: 600,
      letterSpacing: "0.08em",
    },

    body: {
      fontFamily: "Georgia, serif",
      fontWeight: 400,
    },

    label: {
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
    },
  },

  animation: {
    fast: "160ms ease",
    normal: "240ms ease",
    slow: "420ms ease",
  },
};

export type GrimforgeTheme = typeof theme;