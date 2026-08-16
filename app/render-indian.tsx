import fs from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { registerPDFFonts } from "../registry/pdf/lib/fonts";
import { IndianReportCard } from "../registry/pdf/blocks/report/indian-report-card";
import { indianReportData } from "./indian-data";

async function main() {
  const fontFamily = registerPDFFonts();
  console.log("Using font family:", fontFamily);

  const buffer = await renderToBuffer(IndianReportCard({ data: indianReportData, fontFamily }));
  fs.writeFileSync("indian-report-card.pdf", buffer);
  console.log("Generated indian-report-card.pdf", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});