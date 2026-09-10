import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "@/registry/pdf/components/document";
import { PDFSection, PDFField } from "@/registry/pdf/components/section";
import { PDFStack, PDFRow } from "@/registry/pdf/components/layout";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/registry/pdf/components/table";
import { PDFBadge } from "@/registry/pdf/components/badge";
import { PDFDivider } from "@/registry/pdf/components/divider";
import { PDFHeading, PDFTextBlock } from "@/registry/pdf/components/typography";

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
    <PDFDocument title={`PDFInvoice ${data.number}`} author={data.from.name} subject={`PDFInvoice ${data.number}`}>
      <PDFPage>
        {/* Header */}
        <PDFHeader>
          <PDFStack gap={1}>
            <PDFHeading level={2}>{data.from.name}</PDFHeading>
            <PDFTextBlock variant="small" color="#737373">PDFInvoice #{data.number}</PDFTextBlock>
          </PDFStack>
          <PDFStack gap={2} align="flex-end">
            {data.status && <PDFBadge variant="success">{data.status}</PDFBadge>}
            <PDFHeading level={3}>{formatMoney(total, currency)}</PDFHeading>
          </PDFStack>
        </PDFHeader>

        {/* Parties */}
        <PDFSection as="plain">
          <PDFRow justify="space-between" align="stretch" gap={8}>
            <PDFStack gap={2}>
              <PDFTextBlock variant="small" color="#a1a1aa">Billed from</PDFTextBlock>
              <PDFTextBlock>{data.from.name}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.from.email}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.from.address}</PDFTextBlock>
            </PDFStack>
            <PDFStack gap={2}>
              <PDFTextBlock variant="small" color="#a1a1aa">Billed to</PDFTextBlock>
              <PDFTextBlock>{data.to.name}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.to.email}</PDFTextBlock>
              <PDFTextBlock variant="small" color="#737373">{data.to.address}</PDFTextBlock>
            </PDFStack>
            <PDFStack gap={2}>
              <PDFField label="Issue date" value={data.issueDate} width="1/2" />
              <PDFField label="Due date" value={data.dueDate} width="1/2" />
            </PDFStack>
          </PDFRow>
        </PDFSection>

        {/* Items */}
        <PDFSection as="plain">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead className="w-[10%]">Item</PDFTableHead>
              <PDFTableHead>Description</PDFTableHead>
              <PDFTableHead className="w-[14%] justify-end text-right">Qty</PDFTableHead>
              <PDFTableHead className="w-[18%] justify-end text-right">Rate</PDFTableHead>
              <PDFTableHead className="w-[20%] justify-end text-right">Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {data.items.map((item, idx) => (
                <PDFTableRow key={item.id} className={idx === data.items.length - 1 ? "border-b-0" : undefined}>
                  <PDFTableCell className="w-[10%]">{item.id}</PDFTableCell>
                  <PDFTableCell>{item.description}</PDFTableCell>
                  <PDFTableCell className="w-[14%] justify-end text-right">{item.qty}</PDFTableCell>
                  <PDFTableCell className="w-[18%] justify-end text-right">{formatMoney(item.rate, currency)}</PDFTableCell>
                  <PDFTableCell className="w-[20%] justify-end text-right">
                    {formatMoney(item.qty * item.rate, currency)}
                  </PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
        </PDFSection>

        {/* Totals + notes */}
        <PDFRow justify="space-between" align="stretch" gap={8}>
          <PDFSection as="plain" title="Notes">
            <PDFTextBlock variant="small" color="#737373">{data.notes}</PDFTextBlock>
          </PDFSection>
          <PDFStack gap={2} style={{ width: "38%" }}>
            <PDFRow justify="space-between">
              <PDFTextBlock color="#737373">Subtotal</PDFTextBlock>
              <PDFTextBlock>{formatMoney(subtotal, currency)}</PDFTextBlock>
            </PDFRow>
            <PDFRow justify="space-between">
              <PDFTextBlock color="#737373">Tax ({taxRate}%)</PDFTextBlock>
              <PDFTextBlock>{formatMoney(tax, currency)}</PDFTextBlock>
            </PDFRow>
            <PDFDivider />
            <PDFRow justify="space-between">
              <PDFTextBlock>Total</PDFTextBlock>
              <PDFHeading level={3}>{formatMoney(total, currency)}</PDFHeading>
            </PDFRow>
          </PDFStack>
        </PDFRow>

        <PDFFooter page={1} right={data.from.name} />
      </PDFPage>
    </PDFDocument>
  );
}