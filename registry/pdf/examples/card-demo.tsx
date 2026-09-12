import * as React from "react";
import { View } from "@react-pdf/renderer";
import { PDFDocument, PDFPage } from "@/components/pdf/document";
import { PDFProvider } from "@/components/pdf/core/provider";
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
import { PDFTextBlock } from "@/components/pdf/typography";

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
              <View style={{ flexDirection: "column", gap: 8 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <PDFTextBlock variant="small" color="#a1a1aa">Plan</PDFTextBlock>
                  <PDFTextBlock variant="small">Pro</PDFTextBlock>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <PDFTextBlock variant="small" color="#a1a1aa">Seats</PDFTextBlock>
                  <PDFTextBlock variant="small">5</PDFTextBlock>
                </View>
              </View>
            </PDFCardContent>
            <PDFCardFooter>
              <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <PDFTextBlock variant="small" color="#737373">Total due</PDFTextBlock>
                <PDFTextBlock variant="body" style={{ fontWeight: 700 }}>$29.00</PDFTextBlock>
              </View>
            </PDFCardFooter>
          </PDFCard>
        </PDFPage>
      </PDFDocument>
    </PDFProvider>
  );
}

export default CardDemo;
