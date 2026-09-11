import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "@/components/pdf/document";
import { View } from "@react-pdf/renderer";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardDescription, PDFCardContent, PDFCardFooter } from "@/components/pdf/card";
import { PDFSection, PDFField } from "@/components/pdf/section";
import {
  PDFTable,
  PDFTableHeader,
  PDFTableBody,
  PDFTableRow,
  PDFTableHead,
  PDFTableCell,
  PDFTableFooter,
} from "@/components/pdf/table";
import { renderToBuffer } from "@react-pdf/renderer";
import fs from "node:fs";

const invoices = [
  { id: "INV-001", client: "Acme Corp", amount: "$1,200", status: "Paid" },
  { id: "INV-002", client: "Globex Inc", amount: "$3,450", status: "Pending" },
  { id: "INV-003", client: "Soylent Corp", amount: "$890", status: "Paid" },
];

const doc = (
  <PDFDocument title="shadcn-pdf Components" author="shadcn-pdf">
    <PDFPage>
      <View style={{ flexDirection: "column", gap: 20 }}>
        {/* Header */}
        <PDFHeader bordered>
          <View style={{ flexDirection: "column", gap: 4 }}>
            <PDFHeading level={1}>shadcn-pdf</PDFHeading>
            <PDFTextBlock variant="small" color="#a1a1aa">
              Component Showcase — Zero-config, provider-free
            </PDFTextBlock>
          </View>
        </PDFHeader>

        {/* Badges */}
        <PDFSection title="Badges" as="plain">
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            <PDFBadge variant="default">Default</PDFBadge>
            <PDFBadge variant="secondary">Secondary</PDFBadge>
            <PDFBadge variant="destructive">Overdue</PDFBadge>
            <PDFBadge variant="outline">Pending</PDFBadge>
            <PDFBadge variant="success">Paid</PDFBadge>
            <PDFBadge variant="ghost">Ghost</PDFBadge>
            <PDFBadge variant="link">Link</PDFBadge>
          </View>
        </PDFSection>

        <PDFDivider />

        {/* Card */}
        <PDFSection title="Card" as="plain">
          <PDFCard>
            <PDFCardHeader>
              <PDFCardTitle>Invoice #INV-001</PDFCardTitle>
              <PDFCardDescription>Acme Corp — Due Jan 15, 2025</PDFCardDescription>
            </PDFCardHeader>
            <PDFCardContent>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                <PDFField label="Amount" value="$1,200.00" />
                <PDFField label="Status" value="Paid" />
                <PDFField label="Date" value="Jan 10, 2025" />
                <PDFField label="Method" value="Bank Transfer" />
              </View>
            </PDFCardContent>
            <PDFCardFooter>
              <PDFBadge variant="success">Payment Complete</PDFBadge>
            </PDFCardFooter>
          </PDFCard>
        </PDFSection>

        <PDFDivider />

        {/* Table */}
        <PDFSection title="Table" as="plain">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={2}>Invoice</PDFTableHead>
              <PDFTableHead flex={3}>Client</PDFTableHead>
              <PDFTableHead flex={2}>Amount</PDFTableHead>
              <PDFTableHead flex={2}>Status</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {invoices.map((inv) => (
                <PDFTableRow key={inv.id}>
                  <PDFTableCell flex={2}>{inv.id}</PDFTableCell>
                  <PDFTableCell flex={3}>{inv.client}</PDFTableCell>
                  <PDFTableCell flex={2}>{inv.amount}</PDFTableCell>
                  <PDFTableCell flex={2}>
                    <PDFBadge variant={inv.status === "Paid" ? "success" : "outline"}>
                      {inv.status}
                    </PDFBadge>
                  </PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
            <PDFTableFooter>
              <PDFTableCell flex={5}>
                <PDFTextBlock variant="small" style={{ fontWeight: 600 }}>Total</PDFTextBlock>
              </PDFTableCell>
              <PDFTableCell flex={2}>
                <PDFTextBlock variant="small" style={{ fontWeight: 700 }}>$5,540</PDFTextBlock>
              </PDFTableCell>
              <PDFTableCell flex={2} />
            </PDFTableFooter>
          </PDFTable>
        </PDFSection>

        <PDFDivider />

        {/* Typography */}
        <PDFSection title="Typography" as="plain">
          <View style={{ flexDirection: "column", gap: 8 }}>
            <PDFHeading level={1}>Heading 1</PDFHeading>
            <PDFHeading level={2}>Heading 2</PDFHeading>
            <PDFHeading level={3}>Heading 3</PDFHeading>
            <PDFHeading level={4}>Heading 4</PDFHeading>
            <PDFTextBlock>Body text — The quick brown fox jumps over the lazy dog.</PDFTextBlock>
            <PDFTextBlock variant="small">Small text — Used for captions and labels.</PDFTextBlock>
          </View>
        </PDFSection>

        <PDFDivider />

        {/* Fields Grid */}
        <PDFSection title="Fields Grid" as="plain">
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <PDFField label="Company" value="Acme Corp" />
            <PDFField label="Invoice #" value="INV-001" />
            <PDFField label="Amount" value="$1,200.00" />
            <PDFField label="Due Date" value="Jan 15, 2025" />
            <PDFField label="Tax" value="$96.00" />
            <PDFField label="Total" value="$1,296.00" />
          </View>
        </PDFSection>

        {/* Footer */}
        <PDFFooter left="shadcn-pdf" right="Component Showcase" />
      </View>
    </PDFPage>
  </PDFDocument>
);

const buffer = await renderToBuffer(doc);
fs.writeFileSync("showcase.pdf", buffer);
console.log("Generated showcase.pdf");
