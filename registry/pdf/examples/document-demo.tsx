import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";

export default function PDFDocumentDemo() {
  return (
    <PDFDocument title="Document Demo" author="shadcn-pdf">
      <PDFPage>
        <PDFHeader>
          <PDFContainer className="flex-col gap-1">
            <PDFText variant="h2" className="font-bold text-lg">Header</PDFText>
            <PDFText variant="small" color="#737373" className="text-xs">
              Auto-applies theme and fonts.
            </PDFText>
          </PDFContainer>
        </PDFHeader>
        <PDFContainer className="p-4">
          <PDFText className="text-sm text-foreground">Body content on a themed page.</PDFText>
        </PDFContainer>
        <PDFFooter page={1} right="shadcn-pdf" />
      </PDFPage>
    </PDFDocument>
  );
}
