import * as React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { PDFProvider, usePDFTheme } from "@/registry/pdf/lib/provider";
import { theme } from "@/registry/pdf/lib/theme";
import { FALLBACK_FAMILY, registerPDFFonts, useFontFamily } from "@/registry/pdf/lib/fonts";

/**
 * Root document. Registers fonts (Geist by default, Helvetica fallback),
 * applies the theme, and sets PDF metadata. Use this INSTEAD of a raw
 * <Document> so fonts + theming are handled for you.
 */
export function PDFDocument({
  children,
  title,
  author,
  subject,
  fontFamily,
  theme: customTheme,
}: {
  children: React.ReactNode;
  title?: string;
  author?: string;
  subject?: string;
  fontFamily?: string;
  theme?: Partial<typeof theme>;
}) {
  const family = useFontFamily(fontFamily ?? theme.fonts.sans, FALLBACK_FAMILY);
  return (
    <PDFProvider value={{ ...customTheme, fonts: { sans: family as "Geist Sans", fallback: FALLBACK_FAMILY } }}>
      <Document title={title} author={author} subject={subject}>
        {children}
      </Document>
    </PDFProvider>
  );
}

export type PDFPageProps = {
  children: React.ReactNode;
  size?: "A4" | "LETTER" | "A3" | [number, number];
  orientation?: "portrait" | "landscape";
  style?: Style;
};

/** A themed page with default padding + the active font family applied. */
export function PDFPage({ children, size = "A4", orientation = "portrait", style }: PDFPageProps) {
  const t = usePDFTheme();
  return (
    <Page
      size={size}
      orientation={orientation}
      style={[{ backgroundColor: t.colors.background, fontFamily: t.fonts.sans, padding: t.page.padding }, style]}
    >
      {children}
    </Page>
  );
}

export type PDFHeaderProps = {
  children: React.ReactNode;
  /** Optional bottom border (defaults to true). */
  bordered?: boolean;
  style?: Style;
};

/** Reusable document header: brand/title on the left, actions on the right. */
export function PDFHeader({ children, bordered = true, style }: PDFHeaderProps) {
  const t = usePDFTheme();
  return (
    <View
      style={[
        styles.header,
        bordered
          ? {
              borderBottomWidth: 1,
              borderBottomColor: t.colors.border,
              borderBottomStyle: "solid",
              paddingBottom: t.spacing[4],
              marginBottom: t.spacing[5],
            }
          : {},
        style,
      ]}
    >
      {children}
    </View>
  );
}

export type PDFFooterProps = {
  /** Left-side text (e.g. student name). */
  left?: React.ReactNode;
  /** Right-side text (e.g. page number / school). */
  right?: React.ReactNode;
  /** Renders "Page {n}" automatically. */
  pageNumber?: boolean;
  page?: number;
  style?: Style;
};

/** Reusable page footer with an automatic page number. */
export function PDFFooter({ left, right, pageNumber = true, page, style }: PDFFooterProps) {
  const t = usePDFTheme();
  return (
    <View style={[styles.footer, style]} fixed>
      <View style={styles.footerSide}>
        {left ? <Text style={styles.footerText}>{left}</Text> : null}
      </View>
      <View style={[styles.footerSide, styles.footerRight]}>
        {pageNumber && page !== undefined ? (
          <Text style={styles.footerText}>Page {page}</Text>
        ) : null}
        {right ? <Text style={styles.footerText}>{right}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footer: {
    position: "absolute",
    left: theme.page.padding,
    right: theme.page.padding,
    bottom: theme.spacing[5],
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    borderTopStyle: "solid",
    paddingTop: theme.spacing[2],
  },
  footerSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
  },
  footerRight: {
    justifyContent: "flex-end",
  },
  footerText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.muted,
  },
});