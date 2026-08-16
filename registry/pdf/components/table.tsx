import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "../lib/provider";

type DividerStyle = {
  borderBottomWidth: number;
  borderBottomColor: string;
  borderBottomStyle: "solid";
};

function useDivider(t: ReturnType<typeof usePDFTheme>): DividerStyle {
  return {
    borderBottomWidth: 1,
    borderBottomColor: t.colors.border,
    borderBottomStyle: "solid",
  };
}

export type TableProps = { children: React.ReactNode; style?: Style };

export function Table({ children, style }: TableProps) {
  return <View style={[{ width: "100%" }, style]}>{children}</View>;
}

export type TableHeaderProps = { children: React.ReactNode; style?: Style };

export function TableHeader({ children, style }: TableHeaderProps) {
  const t = usePDFTheme();
  const divider = useDivider(t);
  return (
    <View style={[{ flexDirection: "row" }, divider, style]}>{children}</View>
  );
}

export type TableBodyProps = { children: React.ReactNode; style?: Style };

export function TableBody({ children, style }: TableBodyProps) {
  return <View style={style}>{children}</View>;
}

export type TableRowProps = {
  children: React.ReactNode;
  style?: Style;
  isLast?: boolean;
};

export function TableRow({ children, style, isLast }: TableRowProps) {
  const t = usePDFTheme();
  const divider = useDivider(t);
  return (
    <View
      style={[
        { flexDirection: "row" },
        isLast ? { borderBottomWidth: 0 } : divider,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export type TableHeadProps = {
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  style?: Style;
};

export function TableHead({ children, align = "left", width, style }: TableHeadProps) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    root: {
      flex: width ? 0 : 1,
      flexGrow: width ? 0 : 1,
      flexBasis: width ? width : 0,
      width,
      height: 40,
      paddingHorizontal: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
    },
    text: {
      fontSize: t.typography.body.fontSize,
      fontWeight: 500,
      color: t.colors.foreground,
    },
  });
  return (
    <View style={styles.root}>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
}

export type TableCellProps = {
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  style?: Style;
};

export function TableCell({ children, align = "left", width, style }: TableCellProps) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    root: {
      flex: width ? 0 : 1,
      flexGrow: width ? 0 : 1,
      flexBasis: width ? width : 0,
      width,
      padding: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
    },
    text: {
      fontSize: t.typography.body.fontSize,
      color: t.colors.foreground,
    },
  });
  return (
    <View style={styles.root}>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
}