import * as React from "react";
import { View as PdfView, Text as PdfText } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/tw";
import { colors, typography as themeTypography } from "@/components/pdf/theme";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ClassName = string | undefined | null | false;

type PrimitiveProps<T> = {
  children?: React.ReactNode;
  /** Tailwind-style utility classes. */
  className?: ClassName;
  style?: Style;
};

export type ContainerProps = PrimitiveProps<typeof PdfView> & {
  /** Shortcut for `alignItems`. */
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  /** Shortcut for `justifyContent`. */
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  /** Shortcut for `flexDirection`. */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /** Allow container to split across pages. */
  wrap?: boolean;
};

/**
 * A `View` that accepts Tailwind-style `className` (and convenience props).
 *
 * ```tsx
 * <PDFContainer className="flex flex-col gap-2 rounded-lg border bg-muted/10 p-3" />
 * ```
 */
export function PDFContainer({ children, className, align, justify, direction, style, wrap }: ContainerProps) {
  return (
    <PdfView
      style={[
        tw(className),
        align && { alignItems: align },
        justify && { justifyContent: justify },
        direction && { flexDirection: direction },
        style,
      ]}
      wrap={wrap}
    >
      {children}
    </PdfView>
  );
}

PDFContainer.displayName = "PDFContainer";


const textVariants = cva("", {
  variants: {
    variant: {
      h1: "text-2xl font-bold text-foreground",
      h2: "text-xl font-semibold text-foreground",
      h3: "text-lg font-semibold text-foreground",
      h4: "text-base font-medium text-foreground",
      default: "text-sm text-foreground",
      muted: "text-sm text-muted-foreground",
      lead: "text-lg font-semibold",
      small: "text-xs text-muted",
      large: "text-lg font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PDFTextProps
  extends VariantProps<typeof textVariants> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  align?: "left" | "center" | "right";
  style?: Style;
}

export function PDFText({ children, variant, color, align, className, style }: PDFTextProps) {
  const classes = cn(textVariants({ variant }), className);
  const twStyle = classes ? tw(classes) : {};
  return (
    <PdfText style={[twStyle, color ? { color } : undefined, align ? { textAlign: align } : undefined, style]}>
      {children}
    </PdfText>
  );
}

PDFText.displayName = "PDFText";
// Usage:

// tsx
// <PDFText className="text-sm text-zinc-400">Seats</PDFText>
// <PDFText className="text-lg font-semibold">Hey We are heroes</PDFText>