import React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "../registry/pdf/index";
import { View } from "@react-pdf/renderer";
import { PDFSection, PDFField } from "../registry/pdf/components/section";
import { PDFText } from "../registry/pdf/index";

export function QuickDoc() {
  return (
    <PDFDocument title="School Notice" author="Sunrise Academy">
      <PDFPage>
        <PDFHeader>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <PDFText variant="h2">Sunrise Academy</PDFText>
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
