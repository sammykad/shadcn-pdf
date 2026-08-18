# shadcn-pdf

Shadcn-style **design system for PDFs**. A copy-paste registry of beautiful, themeable PDF components built on [@react-pdf/renderer](https://react-pdf.org). Every component shares one design language (typography, colors, spacing) so generated PDFs look polished — not ugly — out of the box.

## Features

- 🎨 **Shared theme** — one design token set (colors, type scale, spacing, radius) across all components
- 🧩 **Composable primitives** — Card, Table, Typography, Badge, Divider
- 📄 **Ready blocks** — polished, production-grade documents (Invoice, and more coming)
- 🎯 **Zero config** — sensible defaults, fully themeable
- 📦 **shadcn CLI registry** — `components.json` + `registry.json`, install into your project

## Install (registry)

Components live in `registry/` and are published via `registry.json`. To add the Invoice block to your project:

```bash
npx shadcn@latest add https://shadcn-pdf.dev/registry.json invoice
```

Or add individual pieces:

```bash
npx shadcn@latest add https://shadcn-pdf.dev/registry.json theme
npx shadcn@latest add https://shadcn-pdf.dev/registry.json table
```

## Usage

Two ways to consume — pick whichever fits.

### 1. Import a ready-made block (zero setup)

```tsx
import { Invoice } from "@/components/blocks/invoice";

const doc = <Invoice data={data} />;
const buffer = await renderToBuffer(doc); // -> Buffer you can save/serve
```

### 2. Compose your own document from primitives

Theme, fonts, and page sizing are handled for you — just add a header, some sections, and a footer:

```tsx
import {
  PDFDocument, PDFPage, PDFHeader, PDFFooter,
} from "@/components/ui/pdf/document";
import { Section, Field } from "@/components/ui/pdf/section";
import { Stack } from "@/components/ui/pdf/layout";
import { Heading, TextBlock } from "@/components/ui/pdf/typography";

export function Notice() {
  return (
    <PDFDocument title="School Notice" author="Sunrise Academy">
      <PDFPage>
        <PDFHeader>
          <Stack gap={1}>
            <Heading level={2}>Sunrise Academy</Heading>
            <TextBlock variant="small" color="#737373">Term End Notice</TextBlock>
          </Stack>
        </PDFHeader>

        <Section title="Key Dates">
          <Field label="Results" value="3 April 2026" />
          <Field label="Next Term" value="10 June 2026" />
        </Section>

        <PDFFooter page={1} right="Sunrise Academy" />
      </PDFPage>
    </PDFDocument>
  );
}
```

## Local dev

```bash
npm install
npm run dev:invoice   # renders invoice.pdf in the repo root
npm run typecheck
```

## Registry structure

```
registry/
  pdf/
    lib/
      theme.ts       # design tokens
      provider.tsx   # PDFProvider + usePDFTheme
      fonts.ts       # Geist registration + fallback
    components/      # card, table, typography, badge, divider, layout, document, section
    blocks/
      invoice/       # polished invoice document
      report/        # student, academic, and Indian report card blocks
registry.json        # shadcn registry manifest
components.json      # shadcn config
app/                 # local render demos
```

## Roadmap

- [x] Theme + core primitives
- [x] Invoice block
- [ ] Reports, forms, quotes, statements
- [ ] Charts (bar / line / donut)
- [ ] Docs site with live previews

## License

ISC
