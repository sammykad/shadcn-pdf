import { PDFStack } from "@/components/pdf/layout";
import { PDFTextBlock } from "@/components/pdf/typography";
import { PDFDivider } from "@/components/pdf/divider";

export default function PDFDividerDemo() {
  return (
    <PDFStack gap={3}>
      <PDFTextBlock>Above the divider</PDFTextBlock>
      <PDFDivider />
      <PDFTextBlock>Below the divider</PDFTextBlock>
    </PDFStack>
  );
}