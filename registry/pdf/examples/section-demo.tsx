import { PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";

export default function PDFSectionDemo() {
  return (
    <PDFSection title="Key Dates" description="Important term dates">
      <PDFContainer className="flex-row">
        <PDFField label="Results" value="3 April 2026" />
        <PDFField label="Next Term" value="10 June 2026" />
      </PDFContainer>
    </PDFSection>
  );
}
