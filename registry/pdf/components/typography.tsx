import * as React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/core/tw";
import { colors, typography as themeTypography } from "@/components/pdf/core/theme";

export type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  color?: string;
  align?: "left" | "center" | "right";
  className?: string;
  style?: Style;
};

export function PDFHeading({ children, level = 1, color, align = "left", className, style }: HeadingProps) {
  const variant = themeTypography[`h${level}`];
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
  const v = themeTypography[variant];
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
