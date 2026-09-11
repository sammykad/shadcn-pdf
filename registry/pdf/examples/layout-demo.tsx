import { View } from "@react-pdf/renderer";
import { PDFTextBlock } from "@/components/pdf/typography";

export default function PDFLayoutDemo() {
  return (
    <View style={{ flexDirection: "column", gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <PDFTextBlock>Left</PDFTextBlock>
        <PDFTextBlock>Right</PDFTextBlock>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        <View style={{ width: "30%" }}><PDFTextBlock>Cell 1</PDFTextBlock></View>
        <View style={{ width: "30%" }}><PDFTextBlock>Cell 2</PDFTextBlock></View>
        <View style={{ width: "30%" }}><PDFTextBlock>Cell 3</PDFTextBlock></View>
      </View>
    </View>
  );
}
