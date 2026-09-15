---
name: shadcn-pdf
description: Generate PDFs in React using shadcn-style components. Use this skill when the user wants to create PDF documents, invoices, reports, receipts, or any styled document output from a React/Next.js application. Covers component installation, theming, Tailwind-style tw() utility, and pre-built block templates.
---

# shadcn-pdf

Generate pixel-perfect PDFs in React using shadcn/ui-style components powered by `@react-pdf/renderer`.

## What is shadcn-pdf?

shadcn-pdf is a registry of copy-paste PDF components for React + Next.js. Install with the shadcn CLI, own the code in your project. No runtime black box.

## Installation

```bash
# Install core utilities (theme, tw resolver, primitives)
npx shadcn@latest add sammykad/shadcn-pdf/theme sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/primitives

# Add components as needed
npx shadcn@latest add sammykad/shadcn-pdf/document sammykad/shadcn-pdf/table sammykad/shadcn-pdf/card sammykad/shadcn-pdf/badge sammykad/shadcn-pdf/divider sammykad/shadcn-pdf/section
```

Installed files land in `~/components/pdf/`.

## Quick Example

```tsx
import { PDFDocument, PDFPage, PDFText, PDFContainer } from "@/components/pdf";

export function MyDocument() {
  return (
    <PDFDocument>
      <PDFPage className="p-10">
        <PDFContainer className="gap-4">
          <PDFText variant="h1">Invoice #001</PDFText>
          <PDFText variant="body" className="text-muted-foreground">
            Built with shadcn-pdf.
          </PDFText>
        </PDFContainer>
      </PDFPage>
    </PDFDocument>
  );
}
```

Render to buffer:

```tsx
import { renderToBuffer } from "@react-pdf/renderer";
const buffer = await renderToBuffer(<MyDocument />);
```

## Components

| Component | Purpose |
|-----------|---------|
| `PDFDocument` / `PDFPage` | Root document wrapper with page sizing, headers, footers |
| `PDFTable` / `PDFTableHeader` / `PDFTableBody` / `PDFTableRow` / `PDFTableHead` / `PDFTableCell` | Flex-based table with column widths via `flex` prop |
| `PDFCard` / `PDFCardHeader` / `PDFCardContent` / `PDFCardFooter` | Bordered container for grouping content |
| `PDFBadge` | Compact pill-shaped labels (default, secondary, success, destructive, outline, ghost, link) |
| `PDFDivider` | 1px horizontal rule |
| `PDFSection` / `PDFField` | Titled blocks and label-value pairs |
| `PDFText` | Typography with variants: h1, h2, h3, h4, default, muted, lead, small, large |
| `PDFContainer` | Flex layout wrapper (use Tailwind classes: `flex-col`, `flex-row`, `gap-2`, etc.) |

## Styling with tw()

The `tw()` utility resolves Tailwind CSS class names to react-pdf styles at render time:

```tsx
<PDFContainer className="flex flex-col gap-4 p-6 bg-muted/10 rounded-lg border">
  <PDFText className="text-2xl font-bold text-primary">Themed heading</PDFText>
  <PDFText className="text-muted-foreground">Supports theme tokens and full Tailwind v4 palette.</PDFText>
</PDFContainer>
```

Supported: theme tokens (`bg-primary`, `text-muted-foreground`), palette colors (`bg-sky-500`), opacity (`bg-destructive/10`), spacing, radius, typography, layout.

## Blocks (Ready-Made Templates)

Complete multi-page PDF documents with sample data:

```bash
npx shadcn@latest add sammykad/shadcn-pdf/invoice
npx shadcn@latest add sammykad/shadcn-pdf/salary-slip
npx shadcn@latest add sammykad/shadcn-pdf/student-report
```

Available blocks: invoice, salary-slip, student-report, academic-report, progress-report, audit-log-report.

## Theme Customization

Customize colors in `~/components/pdf/core/theme.ts`. All components read from the theme automatically.

```tsx
import { PDFProvider } from "@/components/pdf/core/provider";

<PDFProvider theme={{ colors: { primary: "#3b82f6" } }}>
  <MyDocument />
</PDFProvider>
```

## Documentation

- Full docs: https://shadcn-pdf.vercel.app
- GitHub: https://github.com/sammykad/shadcn-pdf
- npm: https://www.npmjs.com/package/@shadcn/pdf
