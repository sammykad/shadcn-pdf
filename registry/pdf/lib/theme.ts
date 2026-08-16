export const colors = {
  background: "#ffffff",
  foreground: "#0a0a0a",
  muted: "#737373",
  mutedForeground: "#a1a1aa",
  border: "#e4e4e7",
  primary: "#18181b",
  primaryForeground: "#fafafa",
  accent: "#f4f4f5",
  destructive: "#dc2626",
  success: "#16a34a",
  mutedBackground: "#fafafa",
} as const;

export const typography = {
  h1: { fontSize: 28, lineHeight: 1.2, fontWeight: 700, letterSpacing: -0.02 },
  h2: { fontSize: 20, lineHeight: 1.25, fontWeight: 700, letterSpacing: -0.01 },
  h3: { fontSize: 16, lineHeight: 1.3, fontWeight: 600 },
  h4: { fontSize: 13, lineHeight: 1.4, fontWeight: 600, letterSpacing: 0.02 },
  body: { fontSize: 11, lineHeight: 1.5, fontWeight: 400 },
  small: { fontSize: 9, lineHeight: 1.5, fontWeight: 400 },
  mono: { fontSize: 10, lineHeight: 1.5, fontWeight: 400 },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 6,
  full: 999,
} as const;

export const fonts = {
  sans: "Geist Sans",
  fallback: "Helvetica",
} as const;

export const page = {
  size: "A4",
  padding: spacing[10],
  margin: 0,
} as const;

export type PDFTheme = typeof theme;

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  fonts,
  page,
} as const;