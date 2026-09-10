import React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "../registry/pdf/components/document";
import { PDFSection, PDFField } from "../registry/pdf/components/section";
import { PDFStack, PDFRow } from "../registry/pdf/components/layout";
import { PDFHeading, PDFTextBlock } from "../registry/pdf/components/typography";

/**
 * A "normal person" API: describe the content in plain data,
 * get a complete, styled PDF — no font setup, no page sizing.
 */
export function QuickDoc() {
  return (
    <PDFDocument title="School Notice" author="Sunrise Academy">
      <PDFPage>
        <PDFHeader>
          <PDFStack gap={1}>
            <PDFHeading level={2}>Sunrise Academy</PDFHeading>
            <PDFTextBlock variant="small" color="#737373">
              Term End Notice · Academic Year 2025-26
            </PDFTextBlock>
          </PDFStack>
        </PDFHeader>

        <PDFSection title="Key Dates" description="Important dates for the coming term.">
          <PDFStack gap={3}>
            <PDFField label="Last Working Day" value="28 March 2026" />
            <PDFField label="Results Announced" value="3 April 2026" />
            <PDFField label="Next Term Begins" value="10 June 2026" />
          </PDFStack>
        </PDFSection>

        <PDFSection title="Guidelines">
          <PDFRow gap={4}>
            <PDFTextBlock>Attendance is mandatory for all assessments.</PDFTextBlock>
            <PDFTextBlock>Report cards are issued online.</PDFTextBlock>
          </PDFRow>
        </PDFSection>

        <PDFFooter page={1} right="Sunrise Academy" />
      </PDFPage>
    </PDFDocument>
  );
}