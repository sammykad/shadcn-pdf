import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/core/tw";

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

const colors = {
  background: "#ffffff",
  foreground: "#09090b",
  primary: "#09090b",
  primaryForeground: "#fafafa",
  accent: "#f4f4f5",
  destructive: "#dc2626",
  mutedForeground: "#a1a1aa",
  border: "#e4e4e7",
  success: "#22c55e",
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
  default: { bg: colors.primary, fg: colors.primaryForeground },
  secondary: { bg: colors.accent, fg: colors.foreground },
  destructive: { bg: hexToRgba(colors.destructive, 0.1), fg: colors.destructive },
  outline: { bg: colors.background, fg: colors.foreground, border: colors.border },
  ghost: { bg: "transparent", fg: colors.mutedForeground },
  link: { bg: "transparent", fg: colors.primary },
  success: { bg: hexToRgba(colors.success, 0.1), fg: colors.success },
};

export function PDFBadge({ children, variant = "default", className, style }: BadgeProps) {
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
    <View style={[styles.root, tw(className), style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
