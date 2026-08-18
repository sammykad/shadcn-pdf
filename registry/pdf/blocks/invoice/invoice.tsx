import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "../../components/document";
import { Section, Field } from "../../components/section";
import { Stack, Row } from "../../components/layout";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/table";
import { Badge } from "../../components/badge";
import { Divider } from "../../components/divider";
import { Heading, TextBlock } from "../../components/typography";

export type InvoiceItem = {
  id: string;
  description: string;
  qty: number;
  rate: number;
};

export type InvoiceData = {
  number: string;
  issueDate: string;
  dueDate: string;
  from: { name: string; email: string; address: string };
  to: { name: string; email: string; address: string };
  items: InvoiceItem[];
  taxRate?: number;
  notes?: string;
  currency?: string;
  status?: string;
};

const formatMoney = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export function Invoice({ data }: { data: InvoiceData }) {
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
          <Stack gap={1}>
            <Heading level={2}>{data.from.name}</Heading>
            <TextBlock variant="small" color="#737373">Invoice #{data.number}</TextBlock>
          </Stack>
          <Stack gap={2} align="flex-end">
            {data.status && <Badge variant="success">{data.status}</Badge>}
            <Heading level={3}>{formatMoney(total, currency)}</Heading>
          </Stack>
        </PDFHeader>

        {/* Parties */}
        <Section as="plain">
          <Row justify="space-between" align="stretch" gap={8}>
            <Stack gap={2}>
              <TextBlock variant="small" color="#a1a1aa">Billed from</TextBlock>
              <TextBlock>{data.from.name}</TextBlock>
              <TextBlock variant="small" color="#737373">{data.from.email}</TextBlock>
              <TextBlock variant="small" color="#737373">{data.from.address}</TextBlock>
            </Stack>
            <Stack gap={2}>
              <TextBlock variant="small" color="#a1a1aa">Billed to</TextBlock>
              <TextBlock>{data.to.name}</TextBlock>
              <TextBlock variant="small" color="#737373">{data.to.email}</TextBlock>
              <TextBlock variant="small" color="#737373">{data.to.address}</TextBlock>
            </Stack>
            <Stack gap={2}>
              <Field label="Issue date" value={data.issueDate} width="1/2" />
              <Field label="Due date" value={data.dueDate} width="1/2" />
            </Stack>
          </Row>
        </Section>

        {/* Items */}
        <Section as="plain">
          <Table>
            <TableHeader>
              <TableHead width="10%">Item</TableHead>
              <TableHead>Description</TableHead>
              <TableHead align="right" width="14%">Qty</TableHead>
              <TableHead align="right" width="18%">Rate</TableHead>
              <TableHead align="right" width="20%">Amount</TableHead>
            </TableHeader>
            <TableBody>
              {data.items.map((item, idx) => (
                <TableRow key={item.id} isLast={idx === data.items.length - 1}>
                  <TableCell width="10%">{item.id}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right" width="14%">{item.qty}</TableCell>
                  <TableCell align="right" width="18%">{formatMoney(item.rate, currency)}</TableCell>
                  <TableCell align="right" width="20%">
                    {formatMoney(item.qty * item.rate, currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        {/* Totals + notes */}
        <Row justify="space-between" align="stretch" gap={8}>
          <Section as="plain" title="Notes">
            <TextBlock variant="small" color="#737373">{data.notes}</TextBlock>
          </Section>
          <Stack gap={2} style={{ width: "38%" }}>
            <Row justify="space-between">
              <TextBlock color="#737373">Subtotal</TextBlock>
              <TextBlock>{formatMoney(subtotal, currency)}</TextBlock>
            </Row>
            <Row justify="space-between">
              <TextBlock color="#737373">Tax ({taxRate}%)</TextBlock>
              <TextBlock>{formatMoney(tax, currency)}</TextBlock>
            </Row>
            <Divider />
            <Row justify="space-between">
              <TextBlock>Total</TextBlock>
              <Heading level={3}>{formatMoney(total, currency)}</Heading>
            </Row>
          </Stack>
        </Row>

        <PDFFooter page={1} right={data.from.name} />
      </PDFPage>
    </PDFDocument>
  );
}