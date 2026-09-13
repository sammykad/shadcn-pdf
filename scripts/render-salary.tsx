import { renderToBuffer } from "@react-pdf/renderer";
import fs from "node:fs";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFSalarySlip } from "../registry/pdf/blocks/salary-slip";
import { salarySlipData } from "./payroll-data";

async function main() {
  registerPDFFonts();
  const element = PDFSalarySlip({ data: salarySlipData });
  const buffer = await renderToBuffer(element);
  fs.writeFileSync("public/salary-slip.pdf", buffer);
  console.log("Generated salary-slip.pdf", buffer.length, "bytes");
  console.log("Open: http://localhost:3000/salary-slip.pdf");
}

main().catch(console.error);
