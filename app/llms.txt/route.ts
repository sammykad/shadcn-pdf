import { NextResponse } from "next/server";

export const dynamic = "force-static";

function getLlmsTxt(): string {
  const base = "https://shadcn-pdf.vercel.app";

  return `# shadcn-pdf
> A shadcn/ui-style component library for generating PDFs in React using @react-pdf/renderer. Copy-paste components, own the code, no black box.

## What is shadcn-pdf?
shadcn-pdf is a registry of copy-paste PDF components and blocks for React + Next.js, built on @react-pdf/renderer. It follows the shadcn/ui registry pattern: install with the CLI, own the code in your project. Components include document layout, tables, cards, badges, dividers, sections, and a Tailwind-style tw() resolver.

## Quick install
\`\`\`bash
npx shadcn@latest add sammykad/shadcn-pdf/theme sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/primitives
\`\`\`

## Core concepts
- **tw() utility** — resolves Tailwind CSS class names (including the full Tailwind v4 color palette) to react-pdf styles at render time.
- **Theme system** — shared colors, typography, spacing in a single provider; all components read from it.
- **Registry pattern** — each component is a separate registry item; install only what you need.

## Components
- [PDFDocument / PDFPage](/components/document): Top-level document wrapper with page sizing, headers, and footers.
- [PDFTable](/components/table): Flex-based table with header, body, row, cell, and footer primitives.
- [PDFCard](/components/card): Bordered container for grouping content in PDFs.
- [PDFBadge](/components/badge): Compact pill-shaped labels with semantic color variants.
- [PDFDivider](/components/divider): Horizontal rule for visual separation.
- [PDFSection / PDFField](/components/section): Labeled field pairs and section groupings.
- [PDFText / PDFTypography](/components/typography): Text primitives with variant presets (h1, h2, body, small, etc.).
- [PDFViewer](/components/pdf-viewer): Client-side PDF viewer for rendering PDFs in the browser.
- [PDF Theme](/components/theme): Theme configuration and provider for PDF styles.
- [PDF Layout](/components/layout): Layout primitives for multi-page documents.

## Blocks (ready-made templates)
- [Invoice](/blocks/finance/invoice): Professional tax invoice with line items, totals, and company details.
- [Salary Slip](/blocks/finance/salary-slip): Employee salary slip with earnings, deductions, and net pay.
- [Student Report](/blocks/education/student-report): Academic report card with grades and comments.
- [Academic Report](/blocks/education/academic-report): Comprehensive academic report with subject scores.
- [Audit Log Report](/blocks/reports/audit-log-report): Audit trail report with timestamped entries.

## Developer Resources
- [Registry JSON](/r/registry.json): Full shadcn-compatible registry manifest (used by the shadcn CLI).
- [Component Registry](/r/[name].json): Individual component registry endpoint (e.g. /r/table.json).
- [Get Started](/get-started): Installation guide, first PDF, tw() styling, and blocks overview.
- [Blog](/blog): Tutorials and walkthroughs.
- [Sitemap](/sitemap.xml): Full page index for crawlers.
- [ARD Catalog](/.well-known/ard.json): Agentic Resource Discovery manifest for AI agents.

## API & SDK
- **npm package**: @shadcn/pdf (install via shadcn CLI: npx shadcn@latest add sammykad/shadcn-pdf/<item>)
- **Registry format**: shadcn/ui-compatible registry.json with items of type registry:item, registry:component, registry:block, registry:example
- **PDF rendering**: Built on @react-pdf/renderer — renders React components to PDF buffers, blobs, or files via renderToBuffer(), renderToFile(), or <PDFViewer>.

## Links
- GitHub: https://github.com/sammykad/shadcn-pdf
- npm registry: https://www.npmjs.com/package/@shadcn/pdf
- Documentation: https://shadcn-pdf.vercel.app
- Author: https://github.com/sammykad
`;
}

export async function GET() {
  return new NextResponse(getLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
