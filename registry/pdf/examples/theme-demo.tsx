import { PDFProvider } from "../lib/provider";
import { PDFCard, PDFCardContent, PDFCardDescription, PDFCardHeader, PDFCardTitle } from "../components/card";
import { PDFStack } from "../components/layout";
import { PDFHeading, PDFTextBlock } from "../components/typography";

export default function PDFThemeDemo() {
  return (
    <PDFProvider value={{ colors: { primary: "#111827" } }}>
      <PDFStack>
        <PDFHeading>Branded heading</PDFHeading>
        <PDFCard>
          <PDFCardHeader>
            <PDFCardTitle>Themed card</PDFCardTitle>
            <PDFCardDescription>Primary is overridden to #111827.</PDFCardDescription>
          </PDFCardHeader>
          <PDFCardContent>
            <PDFTextBlock variant="small" color="#737373">
              Colors, typography, spacing, radius, fonts, and page are shared
              across every PDF component through PDFProvider.
            </PDFTextBlock>
          </PDFCardContent>
        </PDFCard>
      </PDFStack>
    </PDFProvider>
  );
}