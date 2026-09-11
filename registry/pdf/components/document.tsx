import * as React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { registerPDFFonts } from "@/components/pdf/core/fonts";
import { tw } from "@/components/pdf/core/tw";
import { colors, spacing, page } from "@/components/pdf/core/theme";

// Auto-register fonts on import
const registeredFamily = registerPDFFonts();

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
      style={[{ backgroundColor: colors.background, fontFamily: registeredFamily, padding: page.padding }, tw(className), style]}
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
              borderBottomColor: colors.border,
              borderBottomStyle: "solid",
              paddingBottom: spacing[4],
              marginBottom: spacing[5],
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

export function PDFFooter({ left, right, pageNumber = true, page: pageNum, className, style }: PDFFooterProps) {
  return (
    <View style={[styles.footer, tw(className), style]} fixed>
      <View style={styles.footerSide}>
        {left ? <Text style={styles.footerText}>{left}</Text> : null}
      </View>
      <View style={[styles.footerSide, styles.footerRight]}>
        {pageNumber && pageNum !== undefined ? (
          <Text style={styles.footerText}>Page {pageNum}</Text>
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
    left: page.padding,
    right: page.padding,
    bottom: spacing[5],
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopStyle: "solid",
    paddingTop: spacing[2],
  },
  footerSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  footerRight: {
    justifyContent: "flex-end",
  },
  footerText: {
    fontSize: 9,
    color: colors.mutedForeground,
  },
});
