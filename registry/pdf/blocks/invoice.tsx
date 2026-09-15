import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";

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
          <PDFContainer className="flex flex-col gap-1">
            <PDFText variant="h2">{data.from.name}</PDFText>
            <PDFText variant="small" className="text-zinc-500">Invoice #{data.number}</PDFText>
          </PDFContainer>
          <PDFContainer className="flex flex-col items-end gap-2">
            {data.status && <PDFBadge variant="success">{data.status}</PDFBadge>}
            <PDFText variant="h3">{formatMoney(total, currency)}</PDFText>
          </PDFContainer>
        </PDFHeader>

        {/* Parties */}
        <PDFSection as="plain">
          <PDFContainer className="flex flex-row gap-8">
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide">Billed from</PDFText>
              <PDFText>{data.from.name}</PDFText>
              <PDFText variant="small" className="text-zinc-500">{data.from.email}</PDFText>
              <PDFText variant="small" className="text-zinc-500">{data.from.address}</PDFText>
            </PDFContainer>
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide">Billed to</PDFText>
              <PDFText>{data.to.name}</PDFText>
              <PDFText variant="small" className="text-zinc-500">{data.to.email}</PDFText>
              <PDFText variant="small" className="text-zinc-500">{data.to.address}</PDFText>
            </PDFContainer>
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFField label="Issue date" value={data.issueDate} />
              <PDFField label="Due date" value={data.dueDate} />
            </PDFContainer>
          </PDFContainer>
        </PDFSection>

        {/* Items */}
        <PDFSection as="plain">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={1}>Item</PDFTableHead>
              <PDFTableHead flex={4}>Description</PDFTableHead>
              <PDFTableHead flex={1} className="items-end justify-end">Qty</PDFTableHead>
              <PDFTableHead flex={1} className="items-end justify-end">Rate</PDFTableHead>
              <PDFTableHead flex={1} className="items-end justify-end">Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {data.items.map((item) => (
                <PDFTableRow key={item.id}>
                  <PDFTableCell flex={1}>{item.id}</PDFTableCell>
                  <PDFTableCell flex={4}>{item.description}</PDFTableCell>
                  <PDFTableCell flex={1} className="justify-end">{item.qty}</PDFTableCell>
                  <PDFTableCell flex={1} className="justify-end">{formatMoney(item.rate, currency)}</PDFTableCell>
                  <PDFTableCell flex={1} className="justify-end">{formatMoney(item.qty * item.rate, currency)}</PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
        </PDFSection>

        {/* Totals + notes */}
        <PDFContainer className="flex flex-row gap-8">
          <PDFContainer className="flex flex-col gap-2 flex-1">
            <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide">Notes</PDFText>
            <PDFText variant="small" className="text-zinc-500">{data.notes ?? ""}</PDFText>
          </PDFContainer>
          <PDFContainer className="flex flex-col gap-1 w-[38%]">
            <PDFContainer className="flex flex-row justify-between">
              <PDFText className="text-zinc-500">Subtotal</PDFText>
              <PDFText>{formatMoney(subtotal, currency)}</PDFText>
            </PDFContainer>
            <PDFContainer className="flex flex-row justify-between">
              <PDFText className="text-zinc-500">Tax ({taxRate}%)</PDFText>
              <PDFText>{formatMoney(tax, currency)}</PDFText>
            </PDFContainer>
            <PDFDivider className="my-2" />
            <PDFContainer className="flex flex-row justify-between items-center">
              <PDFText>Total</PDFText>
              <PDFText variant="h3">{formatMoney(total, currency)}</PDFText>
            </PDFContainer>
          </PDFContainer>
        </PDFContainer>

        <PDFFooter page={1} left={`Invoice #${data.number}`} right={data.from.name} />
      </PDFPage>
    </PDFDocument>
  );
}