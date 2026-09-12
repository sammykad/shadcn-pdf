import { renderToBuffer } from "@react-pdf/renderer";
import fs from "fs";
import { PDFSalarySlip } from "../registry/pdf/blocks/payroll/salary-slip";
import { salarySlipData } from "./payroll-data";

async function main() {
  const element = PDFSalarySlip({ data: salarySlipData });
  const buffer = await renderToBuffer(element);
  fs.writeFileSync("public/salary-slip.pdf", buffer);
  console.log("Generated salary-slip.pdf", buffer.length, "bytes");
}

main().catch(console.error);
