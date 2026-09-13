import React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "../registry/pdf/components/document";
import { View } from "@react-pdf/renderer";
import { PDFSection, PDFField } from "../registry/pdf/components/section";
import { PDFHeading } from "../registry/pdf/components/typography";
import { PDFText } from "../registry/pdf/components/primitives";

export function QuickDoc() {
  return (
    <PDFDocument title="School Notice" author="Sunrise Academy">
      <PDFPage>
        <PDFHeader>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <PDFHeading level={2}>Sunrise Academy</PDFHeading>
            <PDFText variant="small" color="#737373">
              Term End Notice · Academic Year 2025-26
            </PDFText>
          </View>
        </PDFHeader>

        <PDFSection title="Key Dates" description="Important dates for the coming term.">
          <View style={{ flexDirection: "column", gap: 12 }}>
            <PDFField label="Last Working Day" value="28 March 2026" />
            <PDFField label="Results Announced" value="3 April 2026" />
            <PDFField label="Next Term Begins" value="10 June 2026" />
          </View>
        </PDFSection>

        <PDFSection title="Guidelines">
          <View style={{ flexDirection: "row", gap: 16 }}>
            <PDFText>Attendance is mandatory for all assessments.</PDFText>
            <PDFText>Report cards are issued online.</PDFText>
          </View>
        </PDFSection>

        <PDFFooter page={1} right="Sunrise Academy" />
      </PDFPage>
    </PDFDocument>
  );
}
