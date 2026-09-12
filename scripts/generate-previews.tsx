import fs from "node:fs";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/types";
import { pdfToPng } from "pdf-to-png-converter";

import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { PDFInvoice } from "../registry/pdf/blocks/invoice/invoice";
import { PDFStudentReport } from "../registry/pdf/blocks/report/student-report";
import { PDFAcademicReport } from "../registry/pdf/blocks/report/academic-report";
import { PDFIndianReportCard } from "../registry/pdf/blocks/report/indian-report-card";
import { PDFProgressReport } from "../registry/pdf/blocks/report/progress-report";
import { PDFSalarySlip } from "../registry/pdf/blocks/payroll/salary-slip";
import { componentPreviews } from "../lib/component-previews";
import { PDFDocument, PDFPage } from "../registry/pdf/components/document";
import TwDemo from "../registry/pdf/examples/tw-demo";
import { data } from "./data";
import { reportData } from "./report-data";
import { academicData } from "./academic-data";
import { indianReportData } from "./indian-data";
import { progressReportData } from "./progress-report-data";
import { salarySlipData } from "./payroll-data";

const BLOCKS: Record<string, React.ReactElement> = {
  invoice: PDFInvoice({ data }),
  "student-report": PDFStudentReport({ data: reportData }),
  "academic-report": PDFAcademicReport({ data: academicData }),
  "indian-report-card": PDFIndianReportCard({ data: indianReportData }),
  "progress-report": PDFProgressReport({ data: progressReportData }),
  "salary-slip": PDFSalarySlip({ data: salarySlipData }),
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
      viewportScale: 1.5,
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