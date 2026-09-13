import {
  PDFTable,
  PDFTableHeader,
  PDFTableBody,
  PDFTableRow,
  PDFTableHead,
  PDFTableCell,
  PDFTableFooter,
} from "@/components/pdf/table";
import { PDFText } from "@/components/pdf";

const invoices = [
  { id: "INV-001", client: "Acme Corp", amount: "$1,200.00", status: "Paid" },
  { id: "INV-002", client: "Globex Inc", amount: "$3,450.00", status: "Pending" },
  { id: "INV-003", client: "Initech", amount: "$2,990.00", status: "Paid" },
];

export default function PDFTableDemo() {
  return (
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
        <PDFTableCell flex={7}>
          <PDFText variant="small">Total (3 invoices)</PDFText>
        </PDFTableCell>
        <PDFTableCell flex={2}>
          <PDFText variant="small" className="font-bold">$7,640.00</PDFText>
        </PDFTableCell>
      </PDFTableFooter>
    </PDFTable>
  );
}
