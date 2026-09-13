import { PDFText, PDFContainer } from "@/components/pdf";
import { PDFDivider } from "@/components/pdf/divider";

export default function PDFDividerDemo() {
  return (
    <PDFContainer className="flex-col gap-3">
      <PDFText>Above the divider</PDFText>
      <PDFDivider />
      <PDFText>Below the divider</PDFText>
    </PDFContainer>
  );
}
