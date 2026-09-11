import {
  PDFTable,
  PDFTableHeader,
  PDFTableBody,
  PDFTableRow,
  PDFTableHead,
  PDFTableCell,
} from "@/components/pdf/table";

export default function PDFTableDemo() {
  return (
    <PDFTable>
      <PDFTableHeader>
        <PDFTableRow>
          <PDFTableHead>Item</PDFTableHead>
          <PDFTableHead className="justify-end text-right">Qty</PDFTableHead>
          <PDFTableHead className="justify-end text-right">Price</PDFTableHead>
        </PDFTableRow>
      </PDFTableHeader>
      <PDFTableBody>
        <PDFTableRow>
          <PDFTableCell>Widget</PDFTableCell>
          <PDFTableCell className="justify-end text-right">2</PDFTableCell>
          <PDFTableCell className="justify-end text-right">$19.00</PDFTableCell>
        </PDFTableRow>
        <PDFTableRow className="border-b-0">
          <PDFTableCell>Gadget</PDFTableCell>
          <PDFTableCell className="justify-end text-right">1</PDFTableCell>
          <PDFTableCell className="justify-end text-right">$9.50</PDFTableCell>
        </PDFTableRow>
      </PDFTableBody>
    </PDFTable>
  );
}