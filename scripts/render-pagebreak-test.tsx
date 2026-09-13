/**
 * Test: page-breaking across 2+ pages
 * Run: npx tsx scripts/render-pagebreak-test.tsx
 */
import React from "react";
import { renderToFile } from "@react-pdf/renderer";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "../registry/pdf/components/document";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "../registry/pdf/components/table";
import { PDFSection } from "../registry/pdf/components/section";
import { PDFCard, PDFCardContent } from "../registry/pdf/components/card";
import { PDFContainer, PDFText } from "../registry/pdf/components/primitives";
import { PDFDivider } from "../registry/pdf/components/divider";
import "../registry/pdf/core/fonts";

const ROWS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${String(i + 1).padStart(2, "0")}`,
  department: ["Engineering", "Design", "Marketing", "Sales", "Finance"][i % 5],
  role: ["Senior", "Junior", "Lead", "Manager", "Intern"][i % 5],
  salary: `$${(50000 + i * 2500).toLocaleString()}`,
  status: ["Active", "On Leave", "Active", "Active", "Probation"][i % 5],
}));

function TestDoc() {
  return (
    <PDFDocument title="Page Break Test" author="shadcn-pdf">
      <PDFPage>
        <PDFHeader>
          <PDFContainer direction="column">
            <PDFText variant="h2">Page Break Test</PDFText>
            <PDFText variant="small" color="#737373">
              Table with 40 rows — should span 2+ pages with repeating header
            </PDFText>
          </PDFContainer>
        </PDFHeader>

        <PDFTable>
          <PDFTableHeader fixed>
            <PDFTableHead flex={0.5}>#</PDFTableHead>
            <PDFTableHead flex={2}>Name</PDFTableHead>
            <PDFTableHead flex={1.5}>Department</PDFTableHead>
            <PDFTableHead flex={1}>Role</PDFTableHead>
            <PDFTableHead flex={1.5}>Salary</PDFTableHead>
            <PDFTableHead flex={1}>Status</PDFTableHead>
          </PDFTableHeader>
          <PDFTableBody wrap>
            {ROWS.map((row) => (
              <PDFTableRow key={row.id}>
                <PDFTableCell flex={0.5}>{row.id}</PDFTableCell>
                <PDFTableCell flex={2}>{row.name}</PDFTableCell>
                <PDFTableCell flex={1.5}>{row.department}</PDFTableCell>
                <PDFTableCell flex={1}>{row.role}</PDFTableCell>
                <PDFTableCell flex={1.5}>{row.salary}</PDFTableCell>
                <PDFTableCell flex={1}>{row.status}</PDFTableCell>
              </PDFTableRow>
            ))}
          </PDFTableBody>
        </PDFTable>

        <PDFDivider style={{ marginTop: 16, marginBottom: 16 }} />

        <PDFSection title="Wrapped Section Test" wrap>
          <PDFContainer direction="column" style={{ gap: 8 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <PDFText key={i}>
                This is paragraph {i + 1} in a wrapped section. The section should
                split across pages if it doesn't fit on the current page. Each paragraph
                adds enough content to push the layout and test the wrap behavior.
              </PDFText>
            ))}
          </PDFContainer>
        </PDFSection>

        <PDFCard wrap>
          <PDFCardContent wrap>
            <PDFContainer direction="column" style={{ gap: 8 }}>
              {Array.from({ length: 15 }, (_, i) => (
                <PDFText key={i}>
                  Card paragraph {i + 1}: This card content should also split across
                  pages when wrap is enabled on PDFCard and PDFCardContent.
                </PDFText>
              ))}
            </PDFContainer>
          </PDFCardContent>
        </PDFCard>

        <PDFFooter left="shadcn-pdf" pageNumber />
      </PDFPage>
    </PDFDocument>
  );
}

async function main() {
  const out = "public/preview/pagebreak-test.pdf";
  await renderToFile(<TestDoc />, out);
  console.log(`Generated ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
