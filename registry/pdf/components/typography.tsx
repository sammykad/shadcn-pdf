import * as React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/tw";
import { colors, typography as themeTypography } from "@/components/pdf/theme";

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
