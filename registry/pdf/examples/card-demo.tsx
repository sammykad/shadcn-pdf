import { PDFCard, PDFCardAction, PDFCardContent, PDFCardDescription, PDFCardFooter, PDFCardHeader, PDFCardTitle } from "../components/card";
import { PDFBadge } from "../components/badge";
import { PDFStack, PDFRow } from "../components/layout";
import { PDFTextBlock } from "../components/typography";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <PDFRow justify="space-between" gap={2} style={{ paddingVertical: 1 }}>
      <PDFTextBlock variant="small" color="#a1a1aa">{label}</PDFTextBlock>
      <PDFTextBlock variant="small">{value}</PDFTextBlock>
    </PDFRow>
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
        <PDFStack gap={2}>
          <Detail label="Plan" value="Pro" />
          <Detail label="Seats" value="5" />
          <Detail label="Storage" value="100 GB" />
        </PDFStack>
      </PDFCardContent>

      <PDFCardFooter>
        <PDFRow justify="space-between" align="center" style={{ width: "100%" }}>
          <PDFTextBlock variant="small" color="#737373">Total due</PDFTextBlock>
          <PDFTextBlock variant="body" style={{ fontWeight: 700 }}>$29.00</PDFTextBlock>
        </PDFRow>
      </PDFCardFooter>
    </PDFCard>
  );
}