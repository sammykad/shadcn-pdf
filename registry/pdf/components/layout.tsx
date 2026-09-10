import * as React from "react";
import { View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "@/registry/pdf/lib/provider";

type AlignItems = "flex-start" | "center" | "flex-end" | "stretch";
type Justify = "flex-start" | "center" | "flex-end" | "space-between";
type Align = AlignItems | Justify;

export type StackProps = {
  children: React.ReactNode;
  /** Spacing scale token (1 = 4pt). */
  gap?: keyof ReturnType<typeof usePDFTheme>["spacing"] | number;
  align?: AlignItems;
  style?: Style;
};

/** Vertical column with consistent gap. */
export function PDFStack({ children, gap = 3, align = "stretch", style }: StackProps) {
  const t = usePDFTheme();
  const g = typeof gap === "number" ? gap : t.spacing[gap];
  return (
    <View style={[{ flexDirection: "column", gap: g, alignItems: align }, style]}>
      {children}
    </View>
  );
}

export type RowProps = {
  children: React.ReactNode;
  gap?: keyof ReturnType<typeof usePDFTheme>["spacing"] | number;
  justify?: Justify;
  align?: AlignItems;
  wrap?: boolean;
  style?: Style;
};

/** Horizontal row with consistent gap. */
export function PDFRow({ children, gap = 3, justify = "flex-start", align = "center", wrap = false, style }: RowProps) {
  const t = usePDFTheme();
  const g = typeof gap === "number" ? gap : t.spacing[gap];
  return (
    <View
      style={[
        { flexDirection: "row", gap: g, justifyContent: justify, alignItems: align, flexWrap: wrap ? "wrap" : "nowrap" },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export type GridProps = {
  children: React.ReactNode;
  /** Number of equal columns (1–4). */
  cols?: 1 | 2 | 3 | 4;
  gap?: keyof ReturnType<typeof usePDFTheme>["spacing"] | number;
  style?: Style;
};

/** Equal-width grid. */
export function PDFGrid({ children, cols = 2, gap = 3, style }: GridProps) {
  const t = usePDFTheme();
  const g = typeof gap === "number" ? gap : t.spacing[gap];
  const width = `${100 / cols}%`;
  const items = React.Children.toArray(children);
  return (
    <View style={[{ flexDirection: "row", flexWrap: "wrap", gap: g }, style]}>
      {items.map((child, i) => (
        <View key={i} style={{ width, paddingRight: g }}>
          {child}
        </View>
      ))}
    </View>
  );
}

export { View };