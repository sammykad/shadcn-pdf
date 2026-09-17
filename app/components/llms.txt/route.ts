import { NextResponse } from "next/server";

export const dynamic = "force-static";

const llmsTxt = `# shadcn-pdf Components
> PDF component library for React. Copy-paste components styled with Tailwind CSS.

## Components
- **PDFDocument / PDFPage** — Root document wrapper with page sizing, headers, footers
- **PDFTable** — Flex-based table with header, body, row, cell, footer primitives
- **PDFCard** — Bordered container for grouping content
- **PDFBadge** — Pill-shaped labels (default, secondary, success, destructive, outline, ghost, link)
- **PDFDivider** — 1px horizontal rule
- **PDFSection / PDFField** — Titled blocks and label-value pairs
- **PDFText** — Typography with variants: h1, h2, h3, h4, default, muted, lead, small, large
- **PDFContainer** — Flex layout wrapper with Tailwind classes
- **PDFViewer** — Client-side PDF viewer using pdfjs-dist

## Install
\`\`\`bash
npx shadcn@latest add sammykad/shadcn-pdf/<component-name>
\`\`\`

## Links
- Documentation: https://shadcn-pdf.vercel.app/components
- GitHub: https://github.com/sammykad/shadcn-pdf
- llms.txt: https://shadcn-pdf.vercel.app/llms.txt
`;

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
