import { NextResponse } from "next/server";

export const dynamic = "force-static";

function getLlmsFullTxt(): string {
  return `# shadcn-pdf — Full Documentation
> A shadcn/ui-style component library for generating PDFs in React using @react-pdf/renderer. Copy-paste components, own the code, no black box.

## Overview

shadcn-pdf is a registry of copy-paste PDF components and blocks for React + Next.js, built on @react-pdf/renderer. It follows the shadcn/ui registry pattern: you install components with the CLI, and the code lives in your project — no runtime black box.

Key features:
- **Component library** — document, table, card, badge, divider, section, typography, and a PDF viewer.
- **Tailwind-style tw() resolver** — translates Tailwind CSS class names (including the full Tailwind v4 color palette) into react-pdf styles at render time.
- **Theme system** — shared colors, typography, spacing, and border radius tokens. All components read from a single theme.
- **Blocks** — complete multi-page PDF templates (invoices, salary slips, reports) ready to customize.
- **Registry pattern** — install only what you need; each component is a separate registry item.

## Installation

### Prerequisites
- Node.js 18+
- React 18+ project (Next.js App Router recommended)
- A components.json at the project root (run npx shadcn@latest init if you don't have one)

### Install the CLI
The shadcn CLI is fetched on demand by npx:
\`\`\`bash
npx shadcn@latest init
\`\`\`

### Add core utilities
\`\`\`bash
npx shadcn@latest add sammykad/shadcn-pdf/theme sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/primitives
\`\`\`

### Add components
Each component pulls its own dependencies automatically:
\`\`\`bash
npx shadcn@latest add \\
  sammykad/shadcn-pdf/document \\
  sammykad/shadcn-pdf/section \\
  sammykad/shadcn-pdf/card \\
  sammykad/shadcn-pdf/table \\
  sammykad/shadcn-pdf/badge \\
  sammykad/shadcn-pdf/divider
\`\`\`

Installed files land in ~/components/pdf/ and are yours to edit.

## Quick Example

\`\`\`tsx
import { PDFDocument, PDFPage, PDFText, PDFContainer } from "@/components/pdf";

export function Greeting() {
  return (
    <PDFDocument>
      <PDFPage className="p-10">
        <PDFContainer className="gap-4">
          <PDFText variant="h1">Hello, world!</PDFText>
          <PDFText variant="body" className="text-muted-foreground">
            Built with shadcn-pdf and @react-pdf/renderer.
          </PDFText>
        </PDFContainer>
      </PDFPage>
    </PDFDocument>
  );
}
\`\`\`

Render with:
\`\`\`tsx
import { renderToBuffer } from "@react-pdf/renderer";
const buffer = await renderToBuffer(<Greeting />);
\`\`\`

## tw() — Tailwind-style Resolver

The tw() utility resolves Tailwind CSS class names to react-pdf styles at render time. No global CSS file required.

Supported:
- **Theme tokens** — bg-primary, text-primary-foreground, bg-secondary, text-muted-foreground, border-border
- **Palette** — every Tailwind v4 color family and step, e.g. bg-sky-500, text-zinc-400, border-pink-300
- **Opacity** — bg-destructive/10, text-muted/50
- **Spacing, radius, typography, layout** — gap-2, rounded-lg, text-3xl, flex-row

Customize colors, spacing, and typography in components/pdf/theme.ts.

---

## Components

### PDFDocument / PDFPage
The root wrapper for every PDF you generate.

- **PDFDocument** — registers Geist fonts automatically; use instead of a raw <Document>.
- **PDFPage** — applies font family, background, and padding from the theme.
- **PDFHeader / PDFFooter** — with optional automatic page numbering.
- Supports size and orientation props for A4, Letter, A3, or custom dimensions.

Install: npx shadcn@latest add sammykad/shadcn-pdf/document

API — PDFPage props:
- children: ReactNode
- size?: "A4" | "LETTER" | "A3" | [number, number]
- orientation?: "portrait" | "landscape"
- className?: string
- style?: Style

API — PDFHeader props:
- children: ReactNode
- bordered?: boolean
- className?: string
- style?: Style

API — PDFFooter props:
- left?: ReactNode
- right?: ReactNode
- pageNumber?: boolean
- page?: number
- className?: string
- style?: Style

---

### PDFTable
Flex-based table with header, body, row, cell, and footer primitives for displaying structured data.

- Column widths controlled via flex prop (similar to CSS flexbox).
- Auto-wraps strings in <Text>, React nodes pass through.
- Header, body, and footer sections with built-in borders.

Install: npx shadcn@latest add sammykad/shadcn-pdf/table

API — PDFTableHead / PDFTableCell props:
- children?: ReactNode
- flex?: number
- className?: string
- style?: Style

---

### PDFCard
A bordered, rounded container that groups related content. Composable pattern: PDFCardHeader, PDFCardContent, PDFCardFooter, PDFCardAction.

- Auto-layout: header auto-positions the action slot to the right.
- Zero-config — no provider needed.

Install: npx shadcn@latest add sammykad/shadcn-pdf/card

API — PDFCard props:
- children: ReactNode
- size?: "default" | "sm"
- className?: string
- style?: Style

---

### PDFBadge
Compact pill-shaped labels with semantic color variants for status or category tags.

- 7 semantic variants: default, secondary, success, destructive, outline, ghost, link.
- Pill-shaped with auto-sizing based on content.

Install: npx shadcn@latest add sammykad/shadcn-pdf/badge

API — PDFBadge props:
- children: ReactNode
- variant?: "default" | "secondary" | "success" | "destructive" | "outline" | "ghost" | "link"
- className?: string
- style?: Style

---

### PDFDivider
A simple 1px horizontal line that visually separates content sections. Full-width by default, uses theme border color.

Install: npx shadcn@latest add sammykad/shadcn-pdf/divider

API — PDFDivider props:
- className?: string
- style?: Style

---

### PDFSection / PDFField
Structured content building blocks:

- **PDFSection** — a titled block with optional description, wrapped in a bordered card (or plain mode).
- **PDFField** — a label-over-value pair for displaying key-value data.

Install: npx shadcn@latest add sammykad/shadcn-pdf/section

API — PDFSection props:
- title?: ReactNode
- description?: ReactNode
- children: ReactNode
- as?: "card" | "plain"
- className?: string
- style?: Style

API — PDFField props:
- label: ReactNode
- value: ReactNode
- width?: "1/2" | "1/3" | "1/4"
- className?: string
- style?: Style

---

### PDFText / Typography
Single component for all text: headings, body, captions, labels. Variants powered by class-variance-authority.

Variants: h1, h2, h3, h4, default, muted, lead, small, large.

Install: npx shadcn@latest add sammykad/shadcn-pdf/primitives

API — PDFText props:
- children: ReactNode
- variant?: "h1" | "h2" | "h3" | "h4" | "default" | "muted" | "lead" | "small" | "large"
- color?: string
- align?: "left" | "center" | "right"
- className?: string
- style?: Style

---

### PDFContainer (Layout)
Single layout component wrapping react-pdf's View with Tailwind className support. Use Tailwind classes for all flex layouts.

- Vertical stacking: className="flex-col gap-2"
- Horizontal rows: className="flex-row gap-2"
- Space between: className="flex-row justify-between"
- Grids: className="flex-row flex-wrap gap-2" with child widths

No separate PDFStack, PDFRow, or PDFGrid needed.

---

### PdfViewer
Client-side PDF renderer using pdfjs-dist for displaying PDFs in the browser.

Features:
- Page navigation with keyboard shortcuts (← →)
- Zoom in/out with debounce
- Fit to width / fit to page modes
- Download button
- Text selection layer
- Loading states and error handling

Install: npx shadcn@latest add sammykad/shadcn-pdf/pdf-viewer

API — PdfViewer props:
- source: string | ArrayBuffer (URL or binary data of the PDF)
- document?: PdfDocumentHandle
- loader?: PdfLoader
- page?: number
- defaultPage?: number (default: 1)
- onPageChange?: (page: number) => void
- defaultScale?: number (default: 1)
- minScale?: number (default: 0.5)
- maxScale?: number (default: 3)
- defaultFitMode?: "none" | "width" | "page" (default: "none")
- maxHeight?: string | number (default: "30rem")
- showDownload?: boolean (default: true)
- hideToolbar?: boolean (default: false)
- className?: string

---

### PDFTheme
Shared design system for PDFs: colors, typography, spacing, and a provider.

- Single source of truth for all design tokens.
- PDFProvider + usePDFTheme for reading and overriding.
- Deep-merges partial overrides — only customize what you need.
- Every component reads from the theme automatically.

Install: npx shadcn@latest add sammykad/shadcn-pdf/theme

---

## Blocks (Ready-Made Templates)

Complete multi-page PDF documents with sample data, ready to customize.

### Finance
- **Invoice** — Professional tax invoice with line items, totals, company details, and payment terms.
  Install: npx shadcn@latest add sammykad/shadcn-pdf/invoice
- **Salary Slip** — Employee salary slip with earnings, deductions, net pay, and company branding.
  Install: npx shadcn@latest add sammykad/shadcn-pdf/salary-slip

### Education
- **Student Report** — Academic report card with grades, attendance, and teacher comments.
  Install: npx shadcn@latest add sammykad/shadcn-pdf/student-report
- **Academic Report** — Comprehensive academic report with subject scores and term summary.
  Install: npx shadcn@latest add sammykad/shadcn-pdf/academic-report

### Reports
- **Audit Log Report** — Audit trail report with timestamped entries and severity levels.
  Install: npx shadcn@latest add sammykad/shadcn-pdf/audit-log-report

---

## Links

- GitHub: https://github.com/sammykad/shadcn-pdf
- Documentation: https://shadcn-pdf.vercel.app
- npm: https://www.npmjs.com/package/@shadcn/pdf
- Author: https://github.com/sammykad
`;
}

export async function GET() {
  return new NextResponse(getLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
