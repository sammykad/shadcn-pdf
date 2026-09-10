import { PDFStack } from "../components/layout";
import { PDFHeading, PDFTextBlock } from "../components/typography";

export default function PDFFontsDemo() {
  return (
    <PDFStack gap={2}>
      <PDFHeading level={2}>Geist Sans</PDFHeading>
      <PDFTextBlock variant="body">
        Font registration with a Helvetica fallback. Weights map to upright
        glyphs and never throw at render time.
      </PDFTextBlock>
    </PDFStack>
  );
}