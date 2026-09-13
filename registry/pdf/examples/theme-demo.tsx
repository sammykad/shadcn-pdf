import { PDFHeading, PDFText, PDFContainer } from "@/components/pdf";
import { PDFCard, PDFCardContent, PDFCardDescription, PDFCardHeader, PDFCardTitle } from "@/components/pdf/card";

export default function PDFThemeDemo() {
  return (
    <PDFContainer>
      <PDFHeading>Branded heading</PDFHeading>
      <PDFCard>
        <PDFCardHeader>
          <PDFCardTitle>Themed card</PDFCardTitle>
          <PDFCardDescription>Customize colors via globals.css CSS variables.</PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFText variant="small" color="#737373">
            Colors, typography, and spacing are built into each component.
          </PDFText>
        </PDFCardContent>
      </PDFCard>
    </PDFContainer>
  );
}
