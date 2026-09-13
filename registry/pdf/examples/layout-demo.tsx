import { PDFText, PDFContainer } from "@/components/pdf";

export default function PDFLayoutDemo() {
  return (
    <PDFContainer className="flex-col gap-3">
      <PDFContainer className="flex-row justify-between">
        <PDFText>Left</PDFText>
        <PDFText>Right</PDFText>
      </PDFContainer>
      <PDFContainer className="flex-row flex-wrap gap-3">
        <PDFContainer className="w-[30%]"><PDFText>Cell 1</PDFText></PDFContainer>
        <PDFContainer className="w-[30%]"><PDFText>Cell 2</PDFText></PDFContainer>
        <PDFContainer className="w-[30%]"><PDFText>Cell 3</PDFText></PDFContainer>
      </PDFContainer>
    </PDFContainer>
  );
}
