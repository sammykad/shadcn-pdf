import * as React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "@/components/pdf/lib/provider";
import { theme } from "@/components/pdf/lib/theme";

export type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  color?: string;
  align?: "left" | "center" | "right";
  style?: Style;
};

export function PDFHeading({ children, level = 1, color, align = "left", style }: HeadingProps) {
  const t = usePDFTheme();
  const variant = t.typography[`h${level}` as keyof typeof t.typography] as any;
  const styles = StyleSheet.create({
    root: {
      color: color ?? t.colors.foreground,
      textAlign: align,
      ...variant,
    },
  });
  return <Text style={[styles.root, style]}>{children}</Text>;
}

export type TextProps = {
  children: React.ReactNode;
  variant?: "body" | "small" | "mono";
  color?: string;
  align?: "left" | "center" | "right";
  style?: Style;
};

export function PDFTextBlock({ children, variant = "body", color, align = "left", style }: TextProps) {
  const t = usePDFTheme();
  const v = t.typography[variant];
  const styles = StyleSheet.create({
    root: {
      color: color ?? t.colors.foreground,
      textAlign: align,
      fontSize: v.fontSize,
      lineHeight: v.lineHeight,
      fontWeight: v.fontWeight,
    },
  });
  return <Text style={[styles.root, style]}>{children}</Text>;
}