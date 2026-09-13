import { PDFHeading, PDFText, PDFContainer } from "@/components/pdf";

export default function PDFTypographyDemo() {
  return (
    <PDFContainer className="flex-col gap-2">
      <PDFHeading level={1}>PDFHeading 1</PDFHeading>
      <PDFHeading level={2}>PDFHeading 2</PDFHeading>
      <PDFHeading level={3}>PDFHeading 3</PDFHeading>
      <PDFText variant="default">Body text with the shared type scale.</PDFText>
      <PDFText variant="small" color="#737373">Small muted text.</PDFText>
    </PDFContainer>
  );
}
