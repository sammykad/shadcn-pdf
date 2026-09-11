import { View } from "@react-pdf/renderer";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "@/components/pdf/document";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";

export default function PDFDocumentDemo() {
  return (
    <PDFDocument title="Document Demo" author="shadcn-pdf">
      <PDFPage>
        <PDFHeader>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <PDFHeading level={2}>Header</PDFHeading>
            <PDFTextBlock variant="small" color="#737373">
              Auto-applies theme and fonts.
            </PDFTextBlock>
          </View>
        </PDFHeader>
        <PDFTextBlock>Body content on a themed page.</PDFTextBlock>
        <PDFFooter page={1} right="shadcn-pdf" />
      </PDFPage>
    </PDFDocument>
  );
}
