import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFRow } from "@/components/pdf/layout";

export default function PDFSectionDemo() {
  return (
    <PDFSection title="Key Dates" description="Important term dates">
      <PDFRow>
        <PDFField label="Results" value="3 April 2026" />
        <PDFField label="Next Term" value="10 June 2026" />
      </PDFRow>
    </PDFSection>
  );
}