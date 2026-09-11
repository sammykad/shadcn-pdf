import { PDFStack } from "@/components/pdf/layout";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";

export default function PDFTypographyDemo() {
  return (
    <PDFStack gap={2}>
      <PDFHeading level={1}>PDFHeading 1</PDFHeading>
      <PDFHeading level={2}>PDFHeading 2</PDFHeading>
      <PDFHeading level={3}>PDFHeading 3</PDFHeading>
      <PDFTextBlock variant="body">Body text with the shared type scale.</PDFTextBlock>
      <PDFTextBlock variant="small" color="#737373">Small muted text.</PDFTextBlock>
    </PDFStack>
  );
}