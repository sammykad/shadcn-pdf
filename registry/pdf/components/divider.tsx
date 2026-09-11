import * as React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/lib/tw";

const borderColor = "#e4e4e7";

export type DividerProps = {
  className?: string;
  style?: Style;
};

export function PDFDivider({ className, style }: DividerProps) {
  const styles = StyleSheet.create({
    root: {
      height: 1,
      backgroundColor: borderColor,
      width: "100%",
    },
  });
  return <View style={[styles.root, tw(className), style]} />;
}
