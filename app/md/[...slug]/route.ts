import { NextResponse } from "next/server";

const pages: Record<string, string> = {
  "index": `---
title: shadcn-pdf
description: PDF components for React and Next.js using @react-pdf/renderer. Copy-paste components, Tailwind-style tw() resolver, and pre-built document templates.
canonical: https://shadcn-pdf.vercel.app
---

# shadcn-pdf

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
  "": `---
title: shadcn-pdf
description: PDF components for React and Next.js using @react-pdf/renderer. Copy-paste components, Tailwind-style tw() resolver, and pre-built document templates.
canonical: https://shadcn-pdf.vercel.app
---

# shadcn-pdf

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
  "get-started": `---
title: Get Started with shadcn-pdf
description: Install shadcn-pdf and build your first PDF document in React with Tailwind-style styling.
canonical: https://shadcn-pdf.vercel.app/get-started
---

# Get Started with shadcn-pdf

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
  "components": `---
title: shadcn-pdf Components
description: PDF component library for React — document, table, card, badge, divider, section, typography, and more.
canonical: https://shadcn-pdf.vercel.app/components
---

# Components

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
  "blocks": `---
title: shadcn-pdf Blocks
description: Pre-built PDF document templates — invoices, salary slips, student reports, and audit logs.
canonical: https://shadcn-pdf.vercel.app/blocks
---

# Blocks

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
  "about": `---
title: About shadcn-pdf
description: shadcn-pdf is an open-source PDF component library for React, built on @react-pdf/renderer following the shadcn/ui registry pattern.
canonical: https://shadcn-pdf.vercel.app/about
---

# About shadcn-pdf

shadcn-pdf is an open-source component library for generating PDF documents in React. It follows the shadcn/ui registry pattern: copy paste components into your project, own the code, no black box.

Built on @react-pdf/renderer, shadcn-pdf provides composable PDF components (tables, cards, badges, sections, typography) with a Tailwind-style tw() utility for styling. Pre-built block templates cover common document types like invoices, salary slips, and academic reports.

## Why shadcn-pdf?

Existing PDF libraries either lock you into a proprietary API or require you to learn a new templating language. shadcn-pdf lets you build PDFs with the same React components and Tailwind CSS knowledge you already have.

## Open source

MIT licensed. Source: https://github.com/sammykad/shadcn-pdf

Author: https://github.com/sammykad
`,
  "privacy": `---
title: Privacy Policy
description: Privacy policy for shadcn-pdf. shadcn-pdf does not collect personal data.
canonical: https://shadcn-pdf.vercel.app/privacy
---

# Privacy Policy

Last updated: September 15, 2026

## Data collection

shadcn-pdf is an open-source software library. It does not collect, store, or process any personal data. There is no user account system, no analytics tracking, and no cookies beyond what Vercel hosting provides.

## Third-party services

The website is hosted on Vercel. Vercel infrastructure may collect anonymous request logs for delivery and security purposes. This data is managed by Vercel under their own privacy policy.

## AI crawlers

shadcn-pdf allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot) to access public documentation via robots.txt. This does not involve sharing personal data.

## Contact

For privacy questions, open an issue on https://github.com/sammykad/shadcn-pdf
`,
};

const notFoundMd = `# 404 — Page Not Found

The page you are looking for does not exist.

## Where to go next

- [Home](/) — shadcn-pdf homepage
- [Get Started](/get-started) — Installation and quickstart
- [Components](/components) — PDF component library
- [Blocks](/blocks) — Document templates
- [llms.txt](/llms.txt) — Machine-readable index
- [llms-full.txt](/llms-full.txt) — Full documentation
- [Sitemap](/sitemap.xml) — All pages
- [ARD catalog](/.well-known/ard.json) — Agent resource discovery

## Install

\`\`\`bash
npx shadcn@latest add sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/theme
\`\`\`

## Source

GitHub: [sammykad/shadcn-pdf](https://github.com/sammykad/shadcn-pdf)`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const path = slug?.join("/").replace(/\.md$/, "") || "";

  const content = pages[path];

  if (!content) {
    return new NextResponse(notFoundMd, {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        Vary: "Accept",
      },
    });
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      Vary: "Accept",
    },
  });
}
