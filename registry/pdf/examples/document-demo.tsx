import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "../components/document";
import { PDFStack } from "../components/layout";
import { PDFHeading, PDFTextBlock } from "../components/typography";

export default function PDFDocumentDemo() {
  return (
    <PDFDocument title="Document Demo" author="shadcn-pdf">
      <PDFPage>
        <PDFHeader>
          <PDFStack gap={1}>
            <PDFHeading level={2}>Header</PDFHeading>
            <PDFTextBlock variant="small" color="#737373">
              Auto-applies theme and fonts.
            </PDFTextBlock>
          </PDFStack>
        </PDFHeader>
        <PDFTextBlock>Body content on a themed page.</PDFTextBlock>
        <PDFFooter page={1} right="shadcn-pdf" />
      </PDFPage>
    </PDFDocument>
  );
}