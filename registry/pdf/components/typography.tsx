import * as React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/lib/tw";

const colors = {
  foreground: "#09090b",
  mutedForeground: "#a1a1aa",
};

const typography = {
  h1: { fontSize: 24, lineHeight: 1.2, fontWeight: 700 },
  h2: { fontSize: 20, lineHeight: 1.3, fontWeight: 600 },
  h3: { fontSize: 16, lineHeight: 1.4, fontWeight: 600 },
  h4: { fontSize: 14, lineHeight: 1.5, fontWeight: 600 },
  body: { fontSize: 11, lineHeight: 1.6, fontWeight: 400 },
  small: { fontSize: 9, lineHeight: 1.5, fontWeight: 400 },
  mono: { fontSize: 10, lineHeight: 1.5, fontWeight: 400 },
};

export type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  color?: string;
  align?: "left" | "center" | "right";
  className?: string;
  style?: Style;
};

export function PDFHeading({ children, level = 1, color, align = "left", className, style }: HeadingProps) {
  const variant = typography[`h${level}`];
  const styles = StyleSheet.create({
    root: {
      color: color ?? colors.foreground,
      textAlign: align,
      ...variant,
    },
  });
  return <Text style={[styles.root, tw(className), style]}>{children}</Text>;
}

export type TextProps = {
  children: React.ReactNode;
  variant?: "body" | "small" | "mono";
  color?: string;
  align?: "left" | "center" | "right";
  className?: string;
  style?: Style;
};

export function PDFTextBlock({ children, variant = "body", color, align = "left", className, style }: TextProps) {
  const v = typography[variant];
  const styles = StyleSheet.create({
    root: {
      color: color ?? colors.foreground,
      textAlign: align,
      fontSize: v.fontSize,
      lineHeight: v.lineHeight,
      fontWeight: v.fontWeight,
    },
  });
  return <Text style={[styles.root, tw(className), style]}>{children}</Text>;
}
