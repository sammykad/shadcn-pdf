import { PDFStack, PDFRow, PDFGrid } from "@/components/pdf/layout";
import { PDFTextBlock } from "@/components/pdf/typography";

export default function PDFLayoutDemo() {
  return (
    <PDFStack gap={3}>
      <PDFRow justify="space-between">
        <PDFTextBlock>Left</PDFTextBlock>
        <PDFTextBlock>Right</PDFTextBlock>
      </PDFRow>
      <PDFGrid cols={3} gap={3}>
        <PDFTextBlock>Cell 1</PDFTextBlock>
        <PDFTextBlock>Cell 2</PDFTextBlock>
        <PDFTextBlock>Cell 3</PDFTextBlock>
      </PDFGrid>
    </PDFStack>
  );
}