import { PDFDocument, PDFPage, PDFText } from "@/components/pdf";
import { View } from "@react-pdf/renderer";
import { PDFDivider } from "@/components/pdf/divider";
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
  { id: "INV-001", client: "Acme Corp", amount: "$1,200.00", status: "Paid" },
  { id: "INV-002", client: "Globex Inc", amount: "$3,450.00", status: "Pending" },
  { id: "INV-003", client: "Soylent Corp", amount: "$890.00", status: "Paid" },
  { id: "INV-004", client: "Initech", amount: "$2,100.00", status: "Overdue" },
];

const doc = (
  <PDFDocument title="Table Test" author="Test">
    <PDFPage>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <PDFText variant="h2">Invoice List</PDFText>
        <PDFDivider />

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
                <PDFTableCell flex={2}>{inv.status}</PDFTableCell>
              </PDFTableRow>
            ))}
          </PDFTableBody>

          <PDFTableFooter>
            <PDFTableCell flex={5}>
              <PDFText variant="small">Total (4 invoices)</PDFText>
            </PDFTableCell>
            <PDFTableCell flex={2}>
              <PDFText variant="small" style={{ fontWeight: 700 }}>$7,640.00</PDFText>
            </PDFTableCell>
            <PDFTableCell flex={2} />
          </PDFTableFooter>
        </PDFTable>
      </View>
    </PDFPage>
  </PDFDocument>
);

const buffer = await renderToBuffer(doc);
fs.writeFileSync("table-test.pdf", buffer);
console.log("Generated table-test.pdf");
