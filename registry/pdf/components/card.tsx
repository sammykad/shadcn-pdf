import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "../lib/provider";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export type CardProps = {
  children: React.ReactNode;
  /** Controls the internal spacing scale (like shadcn's `--card-spacing`). */
  size?: "default" | "sm";
  style?: Style;
};

const CARD_SPACING = { default: 4, sm: 3 } as const;

export function Card({ children, size = "default", style }: CardProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING[size]];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      gap: sp,
      borderRadius: t.radius.lg,
      borderWidth: 1,
      borderColor: hexToRgba(t.colors.foreground, 0.1),
      borderStyle: "solid",
      paddingVertical: sp,
      width: "100%",
      overflow: "hidden",
    },
  });
  return <View style={[styles.root, style]}>{children}</View>;
}

export type CardHeaderProps = { children: React.ReactNode; style?: Style };

export function CardHeader({ children, style }: CardHeaderProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      gap: t.spacing[1],
      paddingHorizontal: sp,
      borderTopLeftRadius: t.radius.lg,
      borderTopRightRadius: t.radius.lg,
    },
  });
  return <View style={[styles.root, style]}>{children}</View>;
}

export type CardTitleProps = { children: React.ReactNode; style?: Style };

export function CardTitle({ children, style }: CardTitleProps) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    root: {
      fontSize: t.typography.body.fontSize + 1,
      fontWeight: 500,
      color: t.colors.foreground,
    },
  });
  return <Text style={[styles.root, style]}>{children}</Text>;
}

export type CardDescriptionProps = { children: React.ReactNode; style?: Style };

export function CardDescription({ children, style }: CardDescriptionProps) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    root: {
      fontSize: t.typography.small.fontSize,
      color: t.colors.mutedForeground,
    },
  });
  return <Text style={[styles.root, style]}>{children}</Text>;
}

export type CardActionProps = { children: React.ReactNode; style?: Style };

export function CardAction({ children, style }: CardActionProps) {
  return <View style={[{ alignSelf: "flex-end" }, style]}>{children}</View>;
}

export type CardContentProps = { children: React.ReactNode; style?: Style };

export function CardContent({ children, style }: CardContentProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      paddingHorizontal: sp,
    },
  });
  return <View style={[styles.root, style]}>{children}</View>;
}

export type CardFooterProps = { children: React.ReactNode; style?: Style };

export function CardFooter({ children, style }: CardFooterProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: t.colors.border,
      borderTopStyle: "solid",
      backgroundColor: hexToRgba(t.colors.accent, 0.5),
      padding: sp,
    },
  });
  return <View style={[styles.root, style]}>{children}</View>;
}