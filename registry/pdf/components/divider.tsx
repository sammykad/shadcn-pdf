import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "../lib/provider";

export type DividerProps = {
  style?: Style;
};

export function Divider({ style }: DividerProps) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    root: {
      height: 1,
      backgroundColor: t.colors.border,
      width: "100%",
    },
  });
  return <View style={[styles.root, style]} />;
}