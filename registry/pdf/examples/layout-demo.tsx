import { PDFText, PDFContainer } from "@/components/pdf";

export default function PDFLayoutDemo() {
  return (
    <PDFContainer className="flex-col gap-3 p-4">
      <PDFContainer className="flex-row justify-between items-center bg-zinc-50 rounded-lg p-3">
        <PDFText className="text-sm font-medium text-foreground">Left</PDFText>
        <PDFText className="text-sm font-medium text-foreground">Right</PDFText>
      </PDFContainer>
      <PDFContainer className="flex-row flex-wrap gap-3">
        <PDFContainer className="w-[30%] bg-zinc-50 rounded-lg p-3">
          <PDFText className="text-xs text-center text-muted">Cell 1</PDFText>
        </PDFContainer>
        <PDFContainer className="w-[30%] bg-zinc-50 rounded-lg p-3">
          <PDFText className="text-xs text-center text-muted">Cell 2</PDFText>
        </PDFContainer>
        <PDFContainer className="w-[30%] bg-zinc-50 rounded-lg p-3">
          <PDFText className="text-xs text-center text-muted">Cell 3</PDFText>
        </PDFContainer>
      </PDFContainer>
    </PDFContainer>
  );
}
