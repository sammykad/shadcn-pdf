import React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "../registry/pdf/components/document";
import { Section, Field } from "../registry/pdf/components/section";
import { Stack, Row } from "../registry/pdf/components/layout";
import { Heading, TextBlock } from "../registry/pdf/components/typography";

/**
 * A "normal person" API: describe the content in plain data,
 * get a complete, styled PDF — no font setup, no page sizing.
 */
export function QuickDoc() {
  return (
    <PDFDocument title="School Notice" author="Sunrise Academy">
      <PDFPage>
        <PDFHeader>
          <Stack gap={1}>
            <Heading level={2}>Sunrise Academy</Heading>
            <TextBlock variant="small" color="#737373">
              Term End Notice · Academic Year 2025-26
            </TextBlock>
          </Stack>
        </PDFHeader>

        <Section title="Key Dates" description="Important dates for the coming term.">
          <Stack gap={3}>
            <Field label="Last Working Day" value="28 March 2026" />
            <Field label="Results Announced" value="3 April 2026" />
            <Field label="Next Term Begins" value="10 June 2026" />
          </Stack>
        </Section>

        <Section title="Guidelines">
          <Row gap={4}>
            <TextBlock>Attendance is mandatory for all assessments.</TextBlock>
            <TextBlock>Report cards are issued online.</TextBlock>
          </Row>
        </Section>

        <PDFFooter page={1} right="Sunrise Academy" />
      </PDFPage>
    </PDFDocument>
  );
}