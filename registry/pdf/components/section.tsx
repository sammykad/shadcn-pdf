import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/core/tw";

const colors = {
  foreground: "#09090b",
  mutedForeground: "#a1a1aa",
  border: "#e4e4e7",
};

const spacing = { 1: 4, 3: 12, 4: 16, 5: 20 };
const radius = { lg: 8 };

const typography = {
  h4: { fontSize: 14, lineHeight: 1.5, fontWeight: 600 },
  body: { fontSize: 11, lineHeight: 1.6, fontWeight: 400 },
  small: { fontSize: 9, lineHeight: 1.5, fontWeight: 400 },
};

export type SectionProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  as?: "card" | "plain";
  className?: string;
  style?: Style;
};

export function PDFSection({ title, description, children, as = "card", className, style }: SectionProps) {
  const base: Style =
    as === "card"
      ? {
          borderWidth: 1,
          borderColor: colors.border,
          borderStyle: "solid" as const,
          borderRadius: radius.lg,
          padding: spacing[5],
        }
      : {};

  return (
    <View style={[base, { marginBottom: spacing[4], width: "100%" }, tw(className), style]}>
      {(title || description) && (
        <View style={{ marginBottom: spacing[3] }}>
          {title && (
            <Text style={{ fontSize: typography.h4.fontSize, fontWeight: 600, color: colors.foreground }}>
              {title}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: typography.small.fontSize, color: colors.mutedForeground, marginTop: 2 }}>
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
  width?: "1/2" | "1/3" | "1/4";
  className?: string;
  style?: Style;
};

export function PDFField({ label, value, width = "1/2", className, style }: FieldProps) {
  const flex = width === "1/2" ? 1 : width === "1/3" ? 1 : 1;
  return (
    <View style={[{ flex, minWidth: 120, paddingVertical: spacing[1], paddingRight: spacing[3] }, tw(className), style]}>
      <Text style={{ fontSize: typography.small.fontSize, color: colors.mutedForeground, marginBottom: 2 }}>
        {label}
      </Text>
      <Text style={{ fontSize: typography.body.fontSize, fontWeight: 600, color: colors.foreground }}>
        {value}
      </Text>
    </View>
  );
}
