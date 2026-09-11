import { View } from "@react-pdf/renderer";
import { PDFCard, PDFCardAction, PDFCardContent, PDFCardDescription, PDFCardFooter, PDFCardHeader, PDFCardTitle } from "@/components/pdf/card";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFTextBlock } from "@/components/pdf/typography";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8, paddingVertical: 1 }}>
      <PDFTextBlock variant="small" color="#a1a1aa">{label}</PDFTextBlock>
      <PDFTextBlock variant="small">{value}</PDFTextBlock>
    </View>
  );
}

export default function PDFCardDemo() {
  return (
    <PDFCard>
      <PDFCardHeader>
        <PDFCardTitle>Monthly billing</PDFCardTitle>
        <PDFCardDescription>Pro plan · Renews 01 Sep 2026</PDFCardDescription>
        <PDFCardAction>
          <PDFBadge variant="success">Active</PDFBadge>
        </PDFCardAction>
      </PDFCardHeader>

      <PDFCardContent>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <Detail label="Plan" value="Pro" />
          <Detail label="Seats" value="5" />
          <Detail label="Storage" value="100 GB" />
        </View>
      </PDFCardContent>

      <PDFCardFooter>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <PDFTextBlock variant="small" color="#737373">Total due</PDFTextBlock>
          <PDFTextBlock variant="body" style={{ fontWeight: 700 }}>$29.00</PDFTextBlock>
        </View>
      </PDFCardFooter>
    </PDFCard>
  );
}
