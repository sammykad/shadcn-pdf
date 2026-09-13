import { PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";

export default function PDFSectionDemo() {
  return (
    <PDFSection title="Key Dates" description="Important term dates">
      <PDFContainer className="flex-row gap-4 p-4">
        <PDFField label="Results" value="3 April 2026" className="flex-1" />
        <PDFField label="Next Term" value="10 June 2026" className="flex-1" />
      </PDFContainer>
    </PDFSection>
  );
}
