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
npx shadcn@latest add https://shadcn-pdf.dev/registry.json block-invoice
```

Or add individual pieces:

```bash
npx shadcn@latest add https://shadcn-pdf.dev/registry.json pdf-theme
npx shadcn@latest add https://shadcn-pdf.dev/registry.json pdf-table
```

## Usage

```tsx
import { Invoice } from "@/components/blocks/invoice";

const data = {
  number: "INV-2024-0042",
  issueDate: "Aug 12, 2024",
  dueDate: "Sep 12, 2024",
  status: "Paid",
  from: { name: "Acme Studio", email: "billing@acme.studio", address: "100 Market St, SF" },
  to: { name: "Globex Corp", email: "accounts@globex.com", address: "200 W 5th Ave, NY" },
  taxRate: 8.5,
  currency: "USD",
  items: [
    { id: "01", description: "Product design", qty: 1, rate: 3500 },
    { id: "02", description: "UI/UX design — 3 screens", qty: 3, rate: 900 },
  ],
};

const doc = <Invoice data={data} />;
const buffer = await renderToBuffer(doc); // -> Buffer you can save/serve
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
    components/      # card, table, typography, badge, divider
    blocks/
      invoice/       # polished invoice document
registry.json        # shadcn registry manifest
components.json      # shadcn config
app/                 # local render demo
```

## Roadmap

- [x] Theme + core primitives
- [x] Invoice block
- [ ] Reports, forms, quotes, statements
- [ ] Charts (bar / line / donut)
- [ ] Docs site with live previews

## License

ISC
