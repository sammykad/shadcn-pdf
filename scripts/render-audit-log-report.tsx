import fs from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFAuditLogReport } from "../registry/pdf/blocks/audit-log-report";
import { auditLogData } from "./audit-log-report-data";

async function main() {
  registerPDFFonts();

  const buffer = await renderToBuffer(PDFAuditLogReport({ data: auditLogData }));
  fs.writeFileSync("public/audit-log-report.pdf", buffer);
  console.log("Generated audit-log-report.pdf", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});