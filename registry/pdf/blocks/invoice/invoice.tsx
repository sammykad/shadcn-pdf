import React from "react";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import { PDFProvider, usePDFTheme } from "../../lib/provider";
import { theme } from "../../lib/theme";
import { FALLBACK_FAMILY } from "../../lib/fonts";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/table";
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

function InvoiceContent({ data, fontFamily }: { data: InvoiceData; fontFamily: string }) {
  const t = usePDFTheme();
  const family = fontFamily || t.fonts.sans || FALLBACK_FAMILY;
  const taxRate = data.taxRate ?? 0;
  const subtotal = data.items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  const currency = data.currency ?? "USD";

  return (
    <Page size="A4" style={[styles.page, { fontFamily: family }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Heading level={2}>{data.from.name}</Heading>
            <TextBlock variant="small" color={t.colors.muted} style={styles.mt}>
              Invoice #{data.number}
            </TextBlock>
          </View>
          <View style={styles.headerRight}>
            {data.status && <Badge variant="success">{data.status}</Badge>}
            <Heading level={3} color={t.colors.foreground}>
              {formatMoney(total, currency)}
            </Heading>
          </View>
        </View>

        <Divider style={styles.headerDivider} />

        {/* Parties */}
        <View style={styles.metaGrid}>
          <View style={styles.metaCol}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>
              Billed from
            </TextBlock>
            <TextBlock style={styles.mt}>{data.from.name}</TextBlock>
            <TextBlock variant="small" color={t.colors.muted}>
              {data.from.email}
            </TextBlock>
            <TextBlock variant="small" color={t.colors.muted}>
              {data.from.address}
            </TextBlock>
          </View>
          <View style={styles.metaCol}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>
              Billed to
            </TextBlock>
            <TextBlock style={styles.mt}>{data.to.name}</TextBlock>
            <TextBlock variant="small" color={t.colors.muted}>
              {data.to.email}
            </TextBlock>
            <TextBlock variant="small" color={t.colors.muted}>
              {data.to.address}
            </TextBlock>
          </View>
          <View style={styles.metaCol}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>
              Issue date
            </TextBlock>
            <TextBlock style={styles.mt}>{data.issueDate}</TextBlock>
            <TextBlock variant="small" color={t.colors.mutedForeground} style={styles.mt}>
              Due date
            </TextBlock>
            <TextBlock style={styles.mt}>{data.dueDate}</TextBlock>
          </View>
        </View>

        {/* Items */}
        <Table style={styles.table}>
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

        {/* Totals + notes */}
        <View style={styles.totalsRow}>
          <View style={styles.notes}>
            {data.notes && (
              <>
                <TextBlock variant="small" color={t.colors.mutedForeground}>
                  Notes
                </TextBlock>
                <TextBlock variant="small" color={t.colors.muted} style={styles.mt}>
                  {data.notes}
                </TextBlock>
              </>
            )}
          </View>
          <View style={styles.totals}>
            <View style={styles.totalLine}>
              <TextBlock color={t.colors.muted}>Subtotal</TextBlock>
              <TextBlock>{formatMoney(subtotal, currency)}</TextBlock>
            </View>
            <View style={styles.totalLine}>
              <TextBlock color={t.colors.muted}>Tax ({taxRate}%)</TextBlock>
              <TextBlock>{formatMoney(tax, currency)}</TextBlock>
            </View>
            <Divider style={styles.totalDivider} />
            <View style={styles.totalLine}>
              <TextBlock color={t.colors.foreground} style={styles.grandLabel}>
                Total
              </TextBlock>
              <Heading level={3} style={styles.grandValue}>
                {formatMoney(total, currency)}
              </Heading>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TextBlock variant="small">Thank you for your business.</TextBlock>
          <TextBlock variant="small" color={t.colors.muted} style={styles.mt}>
            {data.from.name}
          </TextBlock>
        </View>
      </View>
    </Page>
  );
}

export function Invoice({
  data,
  theme: customTheme,
  fontFamily,
}: {
  data: InvoiceData;
  theme?: Partial<typeof theme>;
  fontFamily?: string;
}) {
  return (
    <PDFProvider value={customTheme}>
      <Document
        title={`Invoice ${data.number}`}
        author={data.from.name}
        subject={`Invoice ${data.number}`}
      >
        <InvoiceContent data={data} fontFamily={fontFamily ?? ""} />
      </Document>
    </PDFProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing[10],
  },
  content: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerRight: {
    alignItems: "flex-end",
    gap: theme.spacing[2],
  },
  mt: { marginTop: 4 },
  headerDivider: {
    marginVertical: theme.spacing[6],
  },
  metaGrid: {
    flexDirection: "row",
    gap: theme.spacing[8],
    marginBottom: theme.spacing[8],
  },
  metaCol: { flex: 1 },
  table: {
    marginBottom: theme.spacing[6],
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  notes: {
    flex: 1,
    paddingRight: theme.spacing[8],
  },
  totals: {
    width: "38%",
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing[2],
  },
  totalDivider: {
    marginVertical: theme.spacing[3],
  },
  grandLabel: {
    fontWeight: 500,
  },
  grandValue: {
    color: theme.colors.foreground,
  },
  footer: {
    marginTop: theme.spacing[12],
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    borderTopStyle: "solid",
    paddingTop: theme.spacing[4],
  },
});