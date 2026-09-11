import fs from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFIndianReportCard } from "../registry/pdf/blocks/report/indian-report-card";
import { indianReportData } from "./indian-data";

async function main() {
  const fontFamily = registerPDFFonts();
  console.log("Using font family:", fontFamily);

  const buffer = await renderToBuffer(PDFIndianReportCard({ data: indianReportData, fontFamily }));
  fs.writeFileSync("public/indian-report-card.pdf", buffer);
  console.log("Generated indian-report-card.pdf", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});