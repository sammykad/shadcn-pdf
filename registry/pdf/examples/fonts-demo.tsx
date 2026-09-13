import { PDFHeading, PDFText, PDFContainer } from "@/components/pdf";

export default function PDFFontsDemo() {
  return (
    <PDFContainer className="flex-col gap-2">
      <PDFHeading level={2}>Geist Sans</PDFHeading>
      <PDFText variant="default">
        Font registration with a Helvetica fallback. Weights map to upright
        glyphs and never throw at render time.
      </PDFText>
    </PDFContainer>
  );
}
