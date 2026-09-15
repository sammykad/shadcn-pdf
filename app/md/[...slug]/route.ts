import { NextResponse } from "next/server";

const pages: Record<string, string> = {
  "": `# shadcn-pdf

> PDFs that look like your app.

Shadcn-style components for PDFs, built on @react-pdf/renderer. Copy the code, own the document.

## Quick install

\`\`\`bash
npx shadcn@latest add sammykad/shadcn-pdf/theme sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/primitives
\`\`\`

## Components

- PDFDocument / PDFPage — document wrapper with page sizing, headers, footers
- PDFTable — flex-based table with header, body, row, cell, footer
- PDFCard — bordered container for grouping content
- PDFBadge — pill-shaped labels with semantic color variants
- PDFDivider — horizontal rule
- PDFSection / PDFField — titled blocks and label-value pairs
- PDFText — typography with h1-h4, body, small, muted variants
- PDFContainer — flex layout wrapper with Tailwind classes

## Blocks

- Invoice — professional tax invoice
- Salary Slip — employee salary slip
- Student Report — academic report card
- Academic Report — comprehensive academic report
- Progress Report — student progress report
- Audit Log Report — audit trail report

## Links

- [Get Started](/get-started)
- [Components](/components)
- [Blocks](/blocks)
- [llms.txt](/llms.txt)
- [GitHub](https://github.com/sammykad/shadcn-pdf)
- [npm](https://www.npmjs.com/package/@shadcn/pdf)
`,
  "get-started": `# Get Started with shadcn-pdf

## Install

\`\`\`bash
npx shadcn@latest init
npx shadcn@latest add sammykad/shadcn-pdf/theme sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/primitives
\`\`\`

## Your first PDF

\`\`\`tsx
import { PDFDocument, PDFPage, PDFText, PDFContainer } from "@/components/pdf";

export function Greeting() {
  return (
    <PDFDocument>
      <PDFPage className="p-10">
        <PDFContainer className="gap-4">
          <PDFText variant="h1">Hello, world!</PDFText>
          <PDFText variant="body">Built with shadcn-pdf.</PDFText>
        </PDFContainer>
      </PDFPage>
    </PDFDocument>
  );
}
\`\`\`

## Styling with tw()

\`\`\`tsx
<PDFContainer className="flex flex-col gap-4 p-6 bg-muted/10 rounded-lg border">
  <PDFText className="text-2xl font-bold text-primary">Themed heading</PDFText>
</PDFContainer>
\`\`\`
`,
  "components": `# Components

shadcn-pdf provides these PDF components:

- **PDFDocument / PDFPage** — Root document wrapper with page sizing, headers, footers
- **PDFTable** — Flex-based table with header, body, row, cell, footer primitives
- **PDFCard** — Bordered container for grouping content
- **PDFBadge** — Pill-shaped labels (default, secondary, success, destructive, outline, ghost, link)
- **PDFDivider** — 1px horizontal rule
- **PDFSection / PDFField** — Titled blocks and label-value pairs
- **PDFText** — Typography with variants: h1, h2, h3, h4, default, muted, lead, small, large
- **PDFContainer** — Flex layout wrapper with Tailwind classes
- **PDFViewer** — Client-side PDF viewer using pdfjs-dist

Install any component: \`npx shadcn@latest add sammykad/shadcn-pdf/<name>\`
`,
  "blocks": `# Blocks

Complete multi-page PDF templates with sample data:

## Finance
- **Invoice** — Professional tax invoice with line items, totals, company details
- **Salary Slip** — Employee salary slip with earnings, deductions, net pay

## Education
- **Student Report** — Academic report card with grades and comments
- **Academic Report** — Comprehensive academic report with subject scores
- **Progress Report** — Student progress report with term summary

## Reports
- **Audit Log Report** — Audit trail report with timestamped entries

Install: \`npx shadcn@latest add sammykad/shadcn-pdf/<block-name>\`
`,
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const path = slug?.join("/").replace(/\.md$/, "") || "";

  const content = pages[path] || pages[""];

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
