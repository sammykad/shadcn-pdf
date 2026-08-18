export type BlockMap = {
  title: string;
  imagePath: string;
  source: () => Promise<string>;
};

function loadSource(path: string): Promise<string> {
  return import("node:fs").then((fs) => fs.promises.readFile(path, "utf-8"));
}

export const blocks: Record<string, BlockMap> = {
  invoice: {
    title: "Invoice",
    imagePath: "/preview/invoice.png",
    source: () => loadSource("registry/pdf/blocks/invoice/invoice.tsx"),
  },
  "student-report": {
    title: "Student Report",
    imagePath: "/preview/student-report.png",
    source: () => loadSource("registry/pdf/blocks/report/student-report.tsx"),
  },
  "academic-report": {
    title: "Academic Report",
    imagePath: "/preview/academic-report.png",
    source: () => loadSource("registry/pdf/blocks/report/academic-report.tsx"),
  },
  "indian-report-card": {
    title: "Indian Report Card",
    imagePath: "/preview/indian-report-card.png",
    source: () => loadSource("registry/pdf/blocks/report/indian-report-card.tsx"),
  },
};