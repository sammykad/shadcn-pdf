import { View } from "@react-pdf/renderer";
import { PDFCard, PDFCardContent, PDFCardDescription, PDFCardHeader, PDFCardTitle } from "@/components/pdf/card";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";

export default function PDFThemeDemo() {
  return (
    <View>
      <PDFHeading>Branded heading</PDFHeading>
      <PDFCard>
        <PDFCardHeader>
          <PDFCardTitle>Themed card</PDFCardTitle>
          <PDFCardDescription>Customize colors via globals.css CSS variables.</PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFTextBlock variant="small" color="#737373">
            Colors, typography, and spacing are built into each component.
          </PDFTextBlock>
        </PDFCardContent>
      </PDFCard>
    </View>
  );
}
