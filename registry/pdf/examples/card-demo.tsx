import { PDFText, PDFContainer } from "@/components/pdf";
import { PDFCard, PDFCardAction, PDFCardContent, PDFCardDescription, PDFCardFooter, PDFCardHeader, PDFCardTitle } from "@/components/pdf/card";
import { PDFBadge } from "@/components/pdf/badge";

export function CardDemo() {
  return (
    <PDFCard className="rounded-lg border border-zinc-200">
      <PDFCardHeader className="flex-row justify-between items-center p-4">
        <PDFContainer className="flex-col gap-1">
          <PDFCardTitle className="text-lg font-semibold">Monthly billing</PDFCardTitle>
          <PDFCardDescription className="text-sm text-muted-foreground">Pro plan · Renews 01 Sep 2026</PDFCardDescription>
        </PDFContainer>
        <PDFCardAction>
          <PDFBadge variant="success" className="px-3 py-1 text-xs font-medium">Active</PDFBadge>
        </PDFCardAction>
      </PDFCardHeader>
      <PDFCardContent className="px-4 pb-4">
        <PDFContainer className="flex-col gap-2">
          <PDFContainer className="flex-row justify-between">
            <PDFText variant="small" color="#a1a1aa" className="text-xs">Plan</PDFText>
            <PDFText variant="small" className="text-xs font-medium">Pro</PDFText>
          </PDFContainer>
          <PDFContainer className="flex-row justify-between">
            <PDFText variant="small" color="#a1a1aa" className="text-xs">Seats</PDFText>
            <PDFText variant="small" className="text-xs font-medium">5</PDFText>
          </PDFContainer>
        </PDFContainer>
      </PDFCardContent>
      <PDFCardFooter className="px-4 pb-4">
        <PDFContainer className="flex-row justify-between w-full">
          <PDFText variant="small" color="#737373" className="text-xs">Total due</PDFText>
          <PDFText className="font-bold text-sm">$29.00</PDFText>
        </PDFContainer>
      </PDFCardFooter>
    </PDFCard>
  );
}

export default CardDemo;
