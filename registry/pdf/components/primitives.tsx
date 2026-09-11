import * as React from "react";
import { View as PdfView, Text as PdfText } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/core/tw";

type ClassName = string | undefined | null | false;

type PrimitiveProps<T> = {
  children?: React.ReactNode;
  /** Tailwind-style utility classes. */
  className?: ClassName;
  style?: Style;
};

export type BoxProps = PrimitiveProps<typeof PdfView> & {
  /** Shortcut for `alignItems`. */
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  /** Shortcut for `justifyContent`. */
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  /** Shortcut for `flexDirection`. */
  flex?: "row" | "column" | "row-reverse" | "column-reverse";
};

/**
 * A `View` that accepts Tailwind-style `className` (and convenience props).
 *
 * ```tsx
 * <PDFBox className="flex flex-col gap-2 rounded-lg border bg-muted/10 p-3" />
 * ```
 */
export function PDFBox({ children, className, align, justify, flex, style }: BoxProps) {
  return (
    <PdfView
      style={[
        tw(className),
        align && { alignItems: align },
        justify && { justifyContent: justify },
        flex && { flexDirection: flex },
        style,
      ]}
    >
      {children}
    </PdfView>
  );
}

PDFBox.displayName = "PDFBox";

export type PDFTextProps = PrimitiveProps<typeof PdfText>;

/**
 * A `Text` that accepts Tailwind-style `className`.
 *
 * ```tsx
 * <PDFText className="text-sm font-medium text-muted-foreground">Hello</PDFText>
 * ```
 */
export function PDFText({ children, className, style }: PDFTextProps) {
  return <PdfText style={[tw(className), style]}>{children}</PdfText>;
}

PDFText.displayName = "PDFText";

/** `PDFBox` with `flexDirection: row`. */
export function PDFFlexRow({ children, ...props }: BoxProps) {
  return (
    <PDFBox {...props} flex="row">
      {children}
    </PDFBox>
  );
}

PDFFlexRow.displayName = "PDFFlexRow";

/** `PDFBox` with `flexDirection: column`. */
export function PDFFlexCol({ children, ...props }: BoxProps) {
  return (
    <PDFBox {...props} flex="column">
      {children}
    </PDFBox>
  );
}

PDFFlexCol.displayName = "PDFFlexCol";