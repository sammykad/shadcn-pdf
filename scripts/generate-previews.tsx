import fs from "node:fs";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/types";
import { pdfToPng } from "pdf-to-png-converter";

import { registerPDFFonts } from "../registry/pdf/lib/fonts";
import { Invoice } from "../registry/pdf/blocks/invoice/invoice";
import { StudentReport } from "../registry/pdf/blocks/report/student-report";
import { AcademicReport } from "../registry/pdf/blocks/report/academic-report";
import { IndianReportCard } from "../registry/pdf/blocks/report/indian-report-card";
import { componentPreviews } from "../lib/component-previews";
import { PDFDocument, PDFPage } from "../registry/pdf/components/document";
import BadgeDemo from "../registry/pdf/examples/badge-demo";
import CardDemo from "../registry/pdf/examples/card-demo";
import { data } from "./data";
import { reportData } from "./report-data";
import { academicData } from "./academic-data";
import { indianReportData } from "./indian-data";

const BLOCKS: Record<string, React.ReactElement> = {
  invoice: Invoice({ data }),
  "student-report": StudentReport({ data: reportData }),
  "academic-report": AcademicReport({ data: academicData }),
  "indian-report-card": IndianReportCard({ data: indianReportData }),
};

const EXAMPLES: Record<string, React.ReactElement> = {
  "badge-demo": (
    <PDFDocument title="Badge Demo" author="shadcn-pdf">
      <PDFPage>
        <BadgeDemo />
      </PDFPage>
    </PDFDocument>
  ),
  "card-demo": (
    <PDFDocument title="Card Demo" author="shadcn-pdf">
      <PDFPage>
        <CardDemo />
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