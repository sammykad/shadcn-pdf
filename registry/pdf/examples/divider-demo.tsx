import { View } from "@react-pdf/renderer";
import { PDFTextBlock } from "@/components/pdf/typography";
import { PDFDivider } from "@/components/pdf/divider";

export default function PDFDividerDemo() {
  return (
    <View style={{ flexDirection: "column", gap: 12 }}>
      <PDFTextBlock>Above the divider</PDFTextBlock>
      <PDFDivider />
      <PDFTextBlock>Below the divider</PDFTextBlock>
    </View>
  );
}
