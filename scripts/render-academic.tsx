import fs from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFAcademicReport } from "../registry/pdf/blocks/academic-report";
import { academicData } from "./academic-data";

async function main() {
  const fontFamily = registerPDFFonts();
  console.log("Using font family:", fontFamily);

  const buffer = await renderToBuffer(PDFAcademicReport({ data: academicData, fontFamily }));
  fs.writeFileSync("public/academic-report.pdf", buffer);
  console.log("Generated academic-report.pdf", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});