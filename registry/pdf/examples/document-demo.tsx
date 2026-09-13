import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFHeading, PDFText, PDFContainer } from "@/components/pdf";

export default function PDFDocumentDemo() {
  return (
    <PDFDocument title="Document Demo" author="shadcn-pdf">
      <PDFPage>
        <PDFHeader>
          <PDFContainer className="flex-col gap-1">
            <PDFHeading level={2}>Header</PDFHeading>
            <PDFText variant="small" color="#737373">
              Auto-applies theme and fonts.
            </PDFText>
          </PDFContainer>
        </PDFHeader>
        <PDFText>Body content on a themed page.</PDFText>
        <PDFFooter page={1} right="shadcn-pdf" />
      </PDFPage>
    </PDFDocument>
  );
}
