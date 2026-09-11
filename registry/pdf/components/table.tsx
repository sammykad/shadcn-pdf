import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

const colors = {
  foreground: "#09090b",
  mutedForeground: "#a1a1aa",
  border: "#e4e4e7",
  muted: "#f4f4f5",
};

const typography = {
  body: { fontSize: 11, lineHeight: 1.6, fontWeight: 400 },
  small: { fontSize: 9, lineHeight: 1.5, fontWeight: 400 },
};

export type TableProps = {
  children: React.ReactNode;
  className?: string;
  style?: Style;
};

export function PDFTable({ children, className, style }: TableProps) {
  return (
    <View style={[{ width: "100%", flexDirection: "column" }, style]}>
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
  return <View style={[{ flexDirection: "column" }, style]}>{children}</View>;
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
          backgroundColor: colors.muted,
        },
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
          height: 40,
          paddingHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Text style={[{ fontSize: typography.body.fontSize, fontWeight: 500, color: colors.foreground }]}>
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
  return (
    <View
      style={[
        {
          flex,
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Text style={[{ fontSize: typography.body.fontSize, color: colors.foreground }]}>
        {children}
      </Text>
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
    <View style={[{ marginTop: 16, flexDirection: "row" }, style]}>
      <Text style={[{ fontSize: typography.small.fontSize, color: colors.mutedForeground }]}>
        {children}
      </Text>
    </View>
  );
}

PDFTableCaption.displayName = "PDFTableCaption";
