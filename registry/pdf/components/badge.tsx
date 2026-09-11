import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | "success";

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: Style;
};

const defaultTheme = {
  colors: {
    // From globals.css :root
    background: "#ffffff",
    foreground: "#09090b",
    primary: "#09090b",
    primaryForeground: "#fafafa",
    accent: "#f4f4f5",
    destructive: "#dc2626",
    mutedForeground: "#a1a1aa",
    border: "#e4e4e7",
    success: "#22c55e",
  },
};

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const palette: Record<BadgeVariant, { bg: string; fg: string; border?: string }> = {
  default: { bg: defaultTheme.colors.primary, fg: defaultTheme.colors.primaryForeground },
  secondary: { bg: defaultTheme.colors.accent, fg: defaultTheme.colors.foreground },
  destructive: {
    bg: hexToRgba(defaultTheme.colors.destructive, 0.1),
    fg: defaultTheme.colors.destructive,
  },
  outline: { bg: defaultTheme.colors.background, fg: defaultTheme.colors.foreground, border: defaultTheme.colors.border },
  ghost: { bg: "transparent", fg: defaultTheme.colors.mutedForeground },
  link: { bg: "transparent", fg: defaultTheme.colors.primary },
  success: { bg: hexToRgba(defaultTheme.colors.success, 0.1), fg: defaultTheme.colors.success },
};

export function PDFBadge({ children, variant = "default", style }: BadgeProps) {
  const v = palette[variant];

  const styles = StyleSheet.create({
    root: {
      backgroundColor: v.bg,
      borderWidth: v.border ? 1 : 0,
      borderColor: v.border,
      borderStyle: v.border ? "solid" : undefined,
      height: 20,
      borderRadius: 999,
      paddingHorizontal: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
    },
    text: {
      color: v.fg,
      fontSize: 9,
      fontWeight: 500,
      textDecoration: variant === "link" ? "underline" : undefined,
    },
  });

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
