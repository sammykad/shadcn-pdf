import { PDFStack } from "../components/layout";
import { PDFTextBlock } from "../components/typography";
import { PDFDivider } from "../components/divider";

export default function PDFDividerDemo() {
  return (
    <PDFStack gap={3}>
      <PDFTextBlock>Above the divider</PDFTextBlock>
      <PDFDivider />
      <PDFTextBlock>Below the divider</PDFTextBlock>
    </PDFStack>
  );
}