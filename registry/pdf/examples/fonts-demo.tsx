import { PDFText, PDFContainer } from "@/components/pdf";

export default function PDFFontsDemo() {
  return (
    <PDFContainer className="flex-col gap-2 p-4">
      <PDFText variant="h2" className="font-bold text-xl text-foreground">Geist Sans</PDFText>
      <PDFText variant="default" className="text-sm text-zinc-500">
        Font registration with a Helvetica fallback. Weights map to upright
        glyphs and never throw at render time.
      </PDFText>
    </PDFContainer>
  );
}
