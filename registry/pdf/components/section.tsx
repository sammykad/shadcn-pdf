import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "../lib/provider";
export type SectionProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Wrap contents in a bordered Card. */
  as?: "card" | "plain";
  style?: Style;
};

/** A titled content section — shadcn's CardHeader + CardContent in one. */
export function Section({ title, description, children, as = "card", style }: SectionProps) {
  const t = usePDFTheme();
  const base: Style =
    as === "card"
      ? {
          borderWidth: 1,
          borderColor: t.colors.border,
          borderStyle: "solid" as const,
          borderRadius: t.radius.lg,
          padding: t.spacing[5],
        }
      : {};

  return (
    <View style={[base, { marginBottom: t.spacing[4], width: "100%" }, style]}>
      {(title || description) && (
        <View style={{ marginBottom: t.spacing[3] }}>
          {title && (
            <Text style={{ fontSize: t.typography.h4.fontSize, fontWeight: 600, color: t.colors.foreground }}>
              {title}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: t.typography.small.fontSize, color: t.colors.mutedForeground, marginTop: 2 }}>
              {description}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}

export type FieldProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Column width (1–4 of the row). */
  width?: "1/2" | "1/3" | "1/4";
  style?: Style;
};

/** A label-over-value field for info grids. */
export function Field({ label, value, width = "1/2", style }: FieldProps) {
  const t = usePDFTheme();
  const w = width === "1/2" ? "50%" : width === "1/3" ? "33.33%" : "25%";
  return (
    <View style={[{ width: w, paddingVertical: t.spacing[1], paddingRight: t.spacing[3] }, style]}>
      <Text style={{ fontSize: t.typography.small.fontSize, color: t.colors.mutedForeground, marginBottom: 2 }}>
        {label}
      </Text>
      <Text style={{ fontSize: t.typography.body.fontSize, fontWeight: 600, color: t.colors.foreground }}>
        {value}
      </Text>
    </View>
  );
}