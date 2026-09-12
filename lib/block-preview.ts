export type BlockMap = {
  title: string;
  imagePath: string;
  pdfPath: string;
  source: () => Promise<string>;
};

function loadSource(path: string): Promise<string> {
  return import("node:fs").then((fs) => fs.promises.readFile(path, "utf-8"));
}

function block(title: string, slug: string, sourcePath: string): BlockMap {
  return {
    title,
    imagePath: `/preview/${slug}.png`,
    pdfPath: `/preview/${slug}.pdf`,
    source: () => loadSource(`registry/pdf/${sourcePath}.tsx`),
  };
}

export const blocks: Record<string, BlockMap> = {
  invoice: block("PDFInvoice", "invoice", "blocks/invoice/invoice"),
  "student-report": block("Student Report", "student-report", "blocks/report/student-report"),
  "academic-report": block("Academic Report", "academic-report", "blocks/report/academic-report"),
  "indian-report-card": block("Indian Report Card", "indian-report-card", "blocks/report/indian-report-card"),
  "progress-report": block("Progress Report", "progress-report", "blocks/report/progress-report"),
  "tw-demo": block("tw() Styles", "tw-demo", "examples/tw-demo"),
};