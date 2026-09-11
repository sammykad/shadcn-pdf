import fs from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFStudentReport } from "../registry/pdf/blocks/report/student-report";
import { reportData } from "./report-data";

async function main() {
  const fontFamily = registerPDFFonts();
  console.log("Using font family:", fontFamily);

  const buffer = await renderToBuffer(PDFStudentReport({ data: reportData, fontFamily }));
  fs.writeFileSync("public/student-report.pdf", buffer);
  console.log("Generated student-report.pdf", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});