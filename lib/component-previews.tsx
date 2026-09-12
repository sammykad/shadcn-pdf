import * as React from "react";
import type { DocumentProps } from "@react-pdf/types";

import { PDFDocument, PDFPage } from "@/registry/pdf/components/document";
import PDFDividerDemo from "@/registry/pdf/examples/divider-demo";
import PDFDocumentDemo from "@/registry/pdf/examples/document-demo";
import PDFFontsDemo from "@/registry/pdf/examples/fonts-demo";
import PDFLayoutDemo from "@/registry/pdf/examples/layout-demo";
import PDFSectionDemo from "@/registry/pdf/examples/section-demo";
import PDFTableDemo from "@/registry/pdf/examples/table-demo";
import PDFThemeDemo from "@/registry/pdf/examples/theme-demo";
import PDFTypographyDemo from "@/registry/pdf/examples/typography-demo";

/**
 * Component previews. Each entry is a single demo component wrapped in a
 * themed PDF document. The demo file is the single source of truth for both
 * the rendered preview and the docs code block.
 */
function page(children: React.ReactNode): React.ReactElement<DocumentProps> {
  return (
    <PDFDocument title="Preview" author="shadcn-pdf">
      <PDFPage>{children}</PDFPage>
    </PDFDocument>
  );
}

export const componentPreviews: Record<string, React.ReactElement<DocumentProps>> = {
  theme: page(<PDFThemeDemo />),
  fonts: page(<PDFFontsDemo />),
  layout: page(<PDFLayoutDemo />),
  section: page(<PDFSectionDemo />),
  typography: page(<PDFTypographyDemo />),
  table: page(<PDFTableDemo />),
  divider: page(<PDFDividerDemo />),
  document: <PDFDocumentDemo />,
};