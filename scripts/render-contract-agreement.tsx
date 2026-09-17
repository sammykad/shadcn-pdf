import { renderToBuffer } from "@react-pdf/renderer";
import fs from "node:fs";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFContractAgreement } from "../registry/pdf/blocks/contract-agreement";
import { contractAgreementData } from "./contract-agreement-data";

async function main() {
  registerPDFFonts();
  const element = PDFContractAgreement({ data: contractAgreementData });
  const buffer = await renderToBuffer(element);
  fs.writeFileSync("public/contract-agreement.pdf", buffer);
  console.log("Generated contract-agreement.pdf", buffer.length, "bytes");
  console.log("Open: http://localhost:3000/contract-agreement.pdf");
}

main().catch(console.error);
