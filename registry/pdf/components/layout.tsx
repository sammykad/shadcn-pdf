import * as React from "react";
import { View } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

type AlignItems = "flex-start" | "center" | "flex-end" | "stretch";
type Justify = "flex-start" | "center" | "flex-end" | "space-between";
type Align = AlignItems | Justify;

const defaultSpacing: Record<number, number> = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64,
};

export type StackProps = {
  children: React.ReactNode;
  gap?: number;
  align?: AlignItems;
  style?: Style;
};

export function PDFStack({ children, gap = 3, align = "stretch", style }: StackProps) {
  const g = defaultSpacing[gap] ?? gap * 4;
  return (
    <View style={[{ flexDirection: "column", gap: g, alignItems: align }, style]}>
      {children}
    </View>
  );
}

export type RowProps = {
  children: React.ReactNode;
  gap?: number;
  justify?: Justify;
  align?: AlignItems;
  wrap?: boolean;
  style?: Style;
};

export function PDFRow({ children, gap = 3, justify = "flex-start", align = "center", wrap = false, style }: RowProps) {
  const g = defaultSpacing[gap] ?? gap * 4;
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
  cols?: 1 | 2 | 3 | 4;
  gap?: number;
  style?: Style;
};

export function PDFGrid({ children, cols = 2, gap = 3, style }: GridProps) {
  const g = defaultSpacing[gap] ?? gap * 4;
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
