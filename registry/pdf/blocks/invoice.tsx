import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "@/components/pdf/document";
import { View } from "@react-pdf/renderer";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";

export type PDFInvoiceItem = {
  id: string;
  description: string;
  qty: number;
  rate: number;
};

export type PDFInvoiceData = {
  number: string;
  issueDate: string;
  dueDate: string;
  from: { name: string; email: string; address: string };
  to: { name: string; email: string; address: string };
  items: PDFInvoiceItem[];
  taxRate?: number;
  notes?: string;
  currency?: string;
  status?: string;
};

const formatMoney = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export function PDFInvoice({ data }: { data: PDFInvoiceData }) {
  const taxRate = data.taxRate ?? 0;
  const subtotal = data.items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  const currency = data.currency ?? "USD";

  return (
    <PDFDocument title={`Invoice ${data.number}`} author={data.from.name} subject={`Invoice ${data.number}`}>
      <PDFPage>
        {/* Header */}
        <PDFHeader>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <PDFHeading level={2}>{data.from.name}</PDFHeading>
            <PDFTextBlock variant="small" color="#737373">Invoice #{data.number}</PDFTextBlock>
          </View>
          <View style={{ flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            {data.status && <PDFBadge variant="success">{data.status}</PDFBadge>}
            <PDFHeading level={3}>{formatMoney(total, currency)}</PDFHeading>
          </View>
        </PDFHeader>

        {/* Parties */}
        <PDFSection as="plain">
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch", gap: 32 }}>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <PDFTextBlock variant="small" color="#a1a1aa">Billed from</PDFTextBlock>
              <PDFTextBlock>{data.from.name}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.from.email}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.from.address}</PDFTextBlock>
            </View>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <PDFTextBlock variant="small" color="#a1a1aa">Billed to</PDFTextBlock>
              <PDFTextBlock>{data.to.name}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.to.email}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.to.address}</PDFTextBlock>
            </View>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <PDFField label="Issue date" value={data.issueDate} width="1/2" />
              <PDFField label="Due date" value={data.dueDate} width="1/2" />
            </View>
          </View>
        </PDFSection>

        {/* Items */}
        <PDFSection as="plain">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={1}>Item</PDFTableHead>
              <PDFTableHead flex={4}>Description</PDFTableHead>
              <PDFTableHead flex={1}>Qty</PDFTableHead>
              <PDFTableHead flex={1}>Rate</PDFTableHead>
              <PDFTableHead flex={1}>Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {data.items.map((item, idx) => (
                <PDFTableRow key={item.id}>
                  <PDFTableCell flex={1}>{item.id}</PDFTableCell>
                  <PDFTableCell flex={4}>{item.description}</PDFTableCell>
                  <PDFTableCell flex={1}>{item.qty}</PDFTableCell>
                  <PDFTableCell flex={1}>{formatMoney(item.rate, currency)}</PDFTableCell>
                  <PDFTableCell flex={1}>{formatMoney(item.qty * item.rate, currency)}</PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
        </PDFSection>

        {/* Totals + notes */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch", gap: 32 }}>
          <PDFSection as="plain" title="Notes">
            <PDFTextBlock variant="small" color="#737373">{data.notes}</PDFTextBlock>
          </PDFSection>
          <View style={{ flexDirection: "column", gap: 8, width: "38%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <PDFTextBlock color="#737373">Subtotal</PDFTextBlock>
              <PDFTextBlock>{formatMoney(subtotal, currency)}</PDFTextBlock>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <PDFTextBlock color="#737373">Tax ({taxRate}%)</PDFTextBlock>
              <PDFTextBlock>{formatMoney(tax, currency)}</PDFTextBlock>
            </View>
            <PDFDivider />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <PDFTextBlock>Total</PDFTextBlock>
              <PDFHeading level={3}>{formatMoney(total, currency)}</PDFHeading>
            </View>
          </View>
        </View>

        <PDFFooter page={1} right={data.from.name} />
      </PDFPage>
    </PDFDocument>
  );
}
