import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "@/registry/pdf/lib/provider";
import type { PDFTheme } from "@/registry/pdf/lib/theme";

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
  style?: Style;
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

/**
 * Style factory for a badge variant, mirroring shadcn's `badgeVariants`.
 * Reusable outside <PDFBadge>: apply the returned styles to any react-pdf View/Text.
 */
export function badgeVariants(
  variant: BadgeVariant = "default",
  theme: PDFTheme,
) {
  const t = theme;
  const palette: Record<BadgeVariant, { bg: string; fg: string; border?: string }> = {
    // Solid, high-contrast pill.
    default: { bg: t.colors.primary, fg: t.colors.primaryForeground },
    // Muted secondary.
    secondary: { bg: t.colors.accent, fg: t.colors.foreground },
    // Subtle destructive, mirroring shadcn's `bg-destructive/10 text-destructive`.
    destructive: {
      bg: hexToRgba(t.colors.destructive, 0.1),
      fg: t.colors.destructive,
    },
    // Bordered, transparent fill.
    outline: { bg: t.colors.background, fg: t.colors.foreground, border: t.colors.border },
    // Bare; relies on surrounding context.
    ghost: { bg: "transparent", fg: t.colors.mutedForeground },
    // Text-only, underlined.
    link: { bg: "transparent", fg: t.colors.primary },
    // Subtle success (extra, styled like destructive).
    success: { bg: hexToRgba(t.colors.success, 0.1), fg: t.colors.success },
  };

  const v = palette[variant];

  return StyleSheet.create({
    root: {
      backgroundColor: v.bg,
      borderWidth: v.border ? 1 : 0,
      borderColor: v.border,
      borderStyle: v.border ? "solid" : undefined,
      height: 20,
      borderRadius: t.radius.full,
      paddingHorizontal: t.spacing[2],
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
    },
    text: {
      color: v.fg,
      fontSize: t.typography.small.fontSize,
      fontWeight: 500,
      textDecoration: variant === "link" ? "underline" : undefined,
    },
  });
}

export function PDFBadge({ children, variant = "default", style }: BadgeProps) {
  const t = usePDFTheme();
  const styles = badgeVariants(variant, t);
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}