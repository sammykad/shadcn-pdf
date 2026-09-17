import { PDFText, PDFContainer } from "@/components/pdf";
import { PDFCard, PDFCardContent, PDFCardDescription, PDFCardHeader, PDFCardTitle } from "@/components/pdf/card";
import { PDFBadge } from "@/components/pdf/badge";

export default function PDFThemeDemo() {
  return (
    <PDFContainer className="flex-col gap-3 p-4">
      <PDFText variant="h1" className="text-2xl font-bold text-foreground">Branded heading</PDFText>
      <PDFCard className="rounded-lg border border-zinc-200">
        <PDFCardHeader>
          <PDFCardTitle className="text-lg font-semibold">Themed card</PDFCardTitle>
          <PDFCardDescription className="text-sm text-muted-foreground">
            Customize colors via globals.css CSS variables.
          </PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFText variant="small" color="#737373" className="text-xs">
            Colors, typography, and spacing are built into each component.
          </PDFText>
        </PDFCardContent>
      </PDFCard>
    </PDFContainer>
  );
}
