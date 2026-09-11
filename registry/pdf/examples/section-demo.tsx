import { View } from "@react-pdf/renderer";
import { PDFSection, PDFField } from "@/components/pdf/section";

export default function PDFSectionDemo() {
  return (
    <PDFSection title="Key Dates" description="Important term dates">
      <View style={{ flexDirection: "row" }}>
        <PDFField label="Results" value="3 April 2026" />
        <PDFField label="Next Term" value="10 June 2026" />
      </View>
    </PDFSection>
  );
}
