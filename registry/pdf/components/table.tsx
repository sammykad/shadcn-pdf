import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/tw";
import { colors, typography as themeTypography } from "@/components/pdf/theme";

export type TableProps = {
  children: React.ReactNode;
  className?: string;
  style?: Style;
};

export function PDFTable({ children, className, style }: TableProps) {
  return (
    <View style={[{ width: "100%", flexDirection: "column" }, tw(className), style]}>
      {children}
    </View>
  );
}

PDFTable.displayName = "PDFTable";

export type TableHeaderProps = {
  children: React.ReactNode;
  className?: string;
  style?: Style;
};

export function PDFTableHeader({ children, className, style }: TableHeaderProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          borderBottomStyle: "solid",
        },
        tw(className),
        style,
      ]}
    >
      {children}
    </View>
  );
}

PDFTableHeader.displayName = "PDFTableHeader";

export type TableBodyProps = {
  children: React.ReactNode;
  className?: string;
  style?: Style;
};

export function PDFTableBody({ children, className, style }: TableBodyProps) {
  return <View style={[{ flexDirection: "column" }, tw(className), style]}>{children}</View>;
}

PDFTableBody.displayName = "PDFTableBody";

export type TableFooterProps = {
  children: React.ReactNode;
  className?: string;
  style?: Style;
};

export function PDFTableFooter({ children, className, style }: TableFooterProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderTopWidth: 1,
          borderTopColor: colors.border,
          borderTopStyle: "solid",
          backgroundColor: colors.mutedBackground,
        },
        tw(className),
        style,
      ]}
    >
      {children}
    </View>
  );
}

PDFTableFooter.displayName = "PDFTableFooter";

export type TableRowProps = {
  children: React.ReactNode;
  className?: string;
  style?: Style;
};

export function PDFTableRow({ children, className, style }: TableRowProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          borderBottomStyle: "solid",
        },
        tw(className),
        style,
      ]}
    >
      {children}
    </View>
  );
}

PDFTableRow.displayName = "PDFTableRow";

export type TableHeadProps = {
  children?: React.ReactNode;
  className?: string;
  flex?: number;
  style?: Style;
};

export function PDFTableHead({ children, className, flex = 1, style }: TableHeadProps) {
  return (
    <View
      style={[
        {
          flex,
          height: 36,
          paddingHorizontal: 12,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          borderBottomStyle: "solid",
        },
        tw(className),
        style,
      ]}
    >
      <Text style={[{ fontSize: 10, fontWeight: 600, color: colors.mutedForeground, textTransform: "uppercase", letterSpacing: 0.5 }]}>
        {children}
      </Text>
    </View>
  );
}

PDFTableHead.displayName = "PDFTableHead";

export type TableCellProps = {
  children?: React.ReactNode;
  className?: string;
  flex?: number;
  style?: Style;
};

export function PDFTableCell({ children, className, flex = 1, style }: TableCellProps) {
  const isText = typeof children === "string" || typeof children === "number";
  return (
    <View
      style={[
        {
          flex,
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
        },
        tw(className),
        style,
      ]}
    >
      {isText ? <Text style={{ fontSize: themeTypography.body.fontSize, color: colors.foreground }}>{children}</Text> : children}
    </View>
  );
}

PDFTableCell.displayName = "PDFTableCell";

export type TableCaptionProps = {
  children?: React.ReactNode;
  className?: string;
  style?: Style;
};

export function PDFTableCaption({ children, className, style }: TableCaptionProps) {
  return (
    <View style={[{ marginTop: 16, flexDirection: "row" }, tw(className), style]}>
      <Text style={[{ fontSize: themeTypography.small.fontSize, color: colors.mutedForeground }]}>
        {children}
      </Text>
    </View>
  );
}

PDFTableCaption.displayName = "PDFTableCaption";
