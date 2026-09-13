import * as React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/tw";
import { colors } from "@/components/pdf/theme";

export type DividerProps = {
  className?: string;
  style?: Style;
  /** Allow divider to break across pages. */
  wrap?: boolean;
};

export function PDFDivider({ className, style, wrap }: DividerProps) {
  const styles = StyleSheet.create({
    root: {
      height: 1,
      backgroundColor: colors.border,
      width: "100%",
    },
  });
  return <View style={[styles.root, tw(className), style]} wrap={wrap} />;
}
