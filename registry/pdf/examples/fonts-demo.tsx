import { View } from "@react-pdf/renderer";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";

export default function PDFFontsDemo() {
  return (
    <View style={{ flexDirection: "column", gap: 8 }}>
      <PDFHeading level={2}>Geist Sans</PDFHeading>
      <PDFTextBlock variant="body">
        Font registration with a Helvetica fallback. Weights map to upright
        glyphs and never throw at render time.
      </PDFTextBlock>
    </View>
  );
}
