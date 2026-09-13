import {
  PDFCard,
  PDFCardAction,
  PDFCardContent,
  PDFCardDescription,
  PDFCardFooter,
  PDFCardHeader,
  PDFCardTitle,
} from "@/components/pdf/card";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFProvider, PDFText, PDFDocument, PDFPage, PDFContainer } from "@/components/pdf";

export function CardDemo() {
  return (
    <PDFProvider>
      <PDFDocument title="Card Demo" author="shadcn-pdf">
        <PDFPage>
          <PDFCard>
            <PDFCardHeader>
              <PDFCardTitle>Monthly billing</PDFCardTitle>
              <PDFCardDescription>Pro plan · Renews 01 Sep 2026</PDFCardDescription>
              <PDFCardAction>
                <PDFBadge variant="success">Active</PDFBadge>
              </PDFCardAction>
            </PDFCardHeader>
            <PDFCardContent>
              <PDFContainer className="flex-col gap-2">
                <PDFContainer className="flex-row justify-between">
                  <PDFText variant="small" color="#a1a1aa">Plan</PDFText>
                  <PDFText variant="small">Pro</PDFText>
                </PDFContainer>
                <PDFContainer className="flex-row justify-between">
                  <PDFText variant="small" color="#a1a1aa">Seats</PDFText>
                  <PDFText variant="small">5</PDFText>
                </PDFContainer>
              </PDFContainer>
            </PDFCardContent>
            <PDFCardFooter>
              <PDFContainer className="flex-row justify-between w-full">
                <PDFText variant="small" color="#737373">Total due</PDFText>
                <PDFText className="font-bold">$29.00</PDFText>
              </PDFContainer>
            </PDFCardFooter>
          </PDFCard>
        </PDFPage>
      </PDFDocument>
    </PDFProvider>
  );
}

export default CardDemo;
