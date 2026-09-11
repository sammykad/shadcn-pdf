import * as React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { registerPDFFonts } from "@/components/pdf/core/fonts";
import { tw } from "@/components/pdf/core/tw";

// Auto-register fonts on import
const registeredFamily = registerPDFFonts();

const defaultTheme = {
  colors: {
    background: "#ffffff",
    foreground: "#09090b",
    border: "#e4e4e7",
    mutedForeground: "#a1a1aa",
  },
  spacing: { 2: 8, 4: 16, 5: 20 },
  page: { padding: 40 },
};

export type PDFDocumentProps = {
  children: React.ReactNode;
  title?: string;
  author?: string;
  subject?: string;
};

export function PDFDocument({ children, title, author, subject }: PDFDocumentProps) {
  return (
    <Document title={title} author={author} subject={subject}>
      {children}
    </Document>
  );
}

export type PDFPageProps = {
  children: React.ReactNode;
  size?: "A4" | "LETTER" | "A3" | [number, number];
  orientation?: "portrait" | "landscape";
  className?: string;
  style?: Style;
};

export function PDFPage({ children, size = "A4", orientation = "portrait", className, style }: PDFPageProps) {
  return (
    <Page
      size={size}
      orientation={orientation}
      style={[{ backgroundColor: defaultTheme.colors.background, fontFamily: registeredFamily, padding: defaultTheme.page.padding }, tw(className), style]}
    >
      {children}
    </Page>
  );
}

export type PDFHeaderProps = {
  children: React.ReactNode;
  bordered?: boolean;
  className?: string;
  style?: Style;
};

export function PDFHeader({ children, bordered = true, className, style }: PDFHeaderProps) {
  return (
    <View
      style={[
        styles.header,
        bordered
          ? {
              borderBottomWidth: 1,
              borderBottomColor: defaultTheme.colors.border,
              borderBottomStyle: "solid",
              paddingBottom: defaultTheme.spacing[4],
              marginBottom: defaultTheme.spacing[5],
            }
          : {},
        tw(className),
        style,
      ]}
    >
      {children}
    </View>
  );
}

export type PDFFooterProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  pageNumber?: boolean;
  page?: number;
  className?: string;
  style?: Style;
};

export function PDFFooter({ left, right, pageNumber = true, page, className, style }: PDFFooterProps) {
  return (
    <View style={[styles.footer, tw(className), style]} fixed>
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
    left: defaultTheme.page.padding,
    right: defaultTheme.page.padding,
    bottom: defaultTheme.spacing[5],
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: defaultTheme.colors.border,
    borderTopStyle: "solid",
    paddingTop: defaultTheme.spacing[2],
  },
  footerSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: defaultTheme.spacing[2],
  },
  footerRight: {
    justifyContent: "flex-end",
  },
  footerText: {
    fontSize: 9,
    color: defaultTheme.colors.mutedForeground,
  },
});
