import { PDFText, PDFContainer } from "@/components/pdf";
import { PDFDivider } from "@/components/pdf/divider";

export default function PDFDividerDemo() {
  return (
    <PDFContainer className="flex-col gap-3 p-4">
      <PDFText className="text-sm text-muted">Above the divider</PDFText>
      <PDFDivider className="bg-zinc-200" />
      <PDFText className="text-sm text-muted">Below the divider</PDFText>
    </PDFContainer>
  );
}
