import * as React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

const borderColor = "#e4e4e7";

export type DividerProps = {
  style?: Style;
};

export function PDFDivider({ style }: DividerProps) {
  const styles = StyleSheet.create({
    root: {
      height: 1,
      backgroundColor: borderColor,
      width: "100%",
    },
  });
  return <View style={[styles.root, style]} />;
}
