import fs from "node:fs";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/types";
import { pdfToPng } from "pdf-to-png-converter";

import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFInvoice } from "../registry/pdf/blocks/invoice";
import { PDFStudentReport } from "../registry/pdf/blocks/student-report";
import { PDFAcademicReport } from "../registry/pdf/blocks/academic-report";
import { PDFSalarySlip } from "../registry/pdf/blocks/salary-slip";
import { PDFAuditLogReport } from "../registry/pdf/blocks/audit-log-report";
import { PDFContractAgreement } from "../registry/pdf/blocks/contract-agreement";
import { componentPreviews } from "../lib/component-previews";
import { PDFDocument, PDFPage } from "../registry/pdf/index";
import TwDemo from "../registry/pdf/examples/tw-demo";
import { data } from "./data";
import { reportData } from "./report-data";
import { academicData } from "./academic-data";
import { salarySlipData } from "./payroll-data";
import { auditLogData } from "./audit-log-report-data";
import { contractAgreementData } from "./contract-agreement-data";

const BLOCKS: Record<string, React.ReactElement> = {
  invoice: PDFInvoice({ data }),
  "student-report": PDFStudentReport({ data: reportData }),
  "academic-report": PDFAcademicReport({ data: academicData }),
  "salary-slip": PDFSalarySlip({ data: salarySlipData }),
  "audit-log-report": PDFAuditLogReport({ data: auditLogData }),
  "contract-agreement": PDFContractAgreement({ data: contractAgreementData }),
};

const EXAMPLES: Record<string, React.ReactElement> = {
  "tw-demo": (
    <PDFDocument title="tw() Demo" author="shadcn-pdf">
      <PDFPage>
        <TwDemo />
      </PDFPage>
    </PDFDocument>
  ),
};

const PREVIEWS = {
  ...BLOCKS,
  ...componentPreviews,
  ...EXAMPLES,
} as Record<string, React.ReactElement>;

async function main() {
  const out = path.resolve(process.cwd(), "public", "preview");
  fs.mkdirSync(out, { recursive: true });

  const fontFamily = registerPDFFonts();
  console.log("Using font family:", fontFamily);

  for (const [name, element] of Object.entries(PREVIEWS)) {
    const buffer = await renderToBuffer(
      element as React.ReactElement<DocumentProps>,
    );
    const pdfFile = path.join(out, `${name}.pdf`);
    fs.writeFileSync(pdfFile, buffer);
    console.log(`Generated ${pdfFile} (${buffer.length} bytes)`);

    const pages = await pdfToPng(buffer as unknown as Uint8Array, {
      viewportScale: 3,
      returnPageContent: true,
    });

    const file = path.join(out, `${name}.png`);
    if (pages[0]?.content) {
      fs.writeFileSync(file, pages[0].content);
      console.log(
        `Generated ${file} (${pages[0].content.length} bytes, ${pages[0].width}x${pages[0].height})`,
      );
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});