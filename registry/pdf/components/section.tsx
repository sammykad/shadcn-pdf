import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/tw";
import { colors, spacing, radius, typography as themeTypography } from "@/components/pdf/theme";

export type SectionProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  as?: "card" | "plain";
  className?: string;
  style?: Style;
  /** Allow section to split across pages. */
  wrap?: boolean;
};

export function PDFSection({ title, description, children, as = "card", className, style, wrap }: SectionProps) {
  const base: Style =
    as === "card"
      ? {
          borderWidth: 1,
          borderColor: colors.border,
          borderStyle: "solid" as const,
          borderRadius: radius.lg,
          padding: spacing[4],
        }
      : {};

  return (
    <View style={[base, { marginBottom: spacing[4], width: "100%" }, tw(className), style]} wrap={wrap}>
      {(title || description) && (
        <View style={{ marginBottom: spacing[3] }}>
          {title && (
            <Text style={{ fontSize: themeTypography.h4.fontSize, fontWeight: 600, color: colors.foreground }}>
              {title}
            </Text>
          )}
          {description && (
            <Text style={{ fontSize: themeTypography.small.fontSize, color: colors.mutedForeground, marginTop: 2 }}>
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
  /** When true, flex is not applied (use inside flex columns). */
  noFlex?: boolean;
  className?: string;
  style?: Style;
};

export function PDFField({ label, value, width = "1/2", noFlex, className, style }: FieldProps) {
  const flexStyle = noFlex ? {} : { flex: width === "1/2" ? 2 : width === "1/3" ? 1.5 : 1 };
  return (
    <View style={[flexStyle, { minWidth: 120 }, tw("py-1 pr-3"), tw(className), style]}>
      <Text style={tw("text-xs text-muted")}>
        {label}
      </Text>
      <Text style={tw("text-sm font-medium text-foreground mt-0.5")}>
        {value}
      </Text>
    </View>
  );
}
