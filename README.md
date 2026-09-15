# shadcn-pdf

Shadcn-style **design system for PDFs**. A copy-paste registry of beautiful, themeable PDF components built on [@react-pdf/renderer](https://react-pdf.org).

## Quick Start

### Prerequisites

```bash
npm install @react-pdf/renderer react
```

### Step 1: Install components

```bash
# Install a complete block (recommended for beginners)
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json invoice

# Or install the salary slip
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json salary-slip

# Or install just the core components
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json theme
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json table
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json card
```

> **Important:** Always use the full URL `https://shadcn-pdf.vercel.app/registry.json` — not the shorthand.

### Step 2: Use in your code

```tsx
import { PDFInvoice } from "@/components/pdf/invoice";
import { renderToBuffer } from "@react-pdf/renderer";

// Define your data
const data = {
  number: "INV-001",
  issueDate: "2026-09-12",
  dueDate: "2026-10-12",
  from: { name: "My Company", email: "me@company.com", address: "123 Main St" },
  to: { name: "Client Inc", email: "client@example.com", address: "456 Oak Ave" },
  items: [
    { id: "1", description: "Web Design", qty: 1, rate: 2500 },
  ],
  currency: "USD",
};

// Generate PDF
const doc = PDFInvoice({ data });
const buffer = await renderToBuffer(doc);

// Save to file
fs.writeFileSync("invoice.pdf", buffer);
```

## Available Blocks

| Block | Category | Description |
|-------|----------|-------------|
| `invoice` | Finance | Professional Tax Invoice |
| `salary-slip` | Finance | Employee Salary Slip |
| `student-report` | Education | Academic Report Card |
| `academic-report` | Education | Comprehensive Academic Report |
| `progress-report` | Education | Student Progress Report |

## Install Commands

```bash
# Billing
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json invoice

# Finance
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json salary-slip

# Education
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json student-report
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json academic-report
npx shadcn@latest add https://shadcn-pdf.vercel.app/registry.json progress-report
```

## Build Your Own PDF

```tsx
import {
  PDFDocument, PDFPage, PDFHeader, PDFFooter,
} from "@/components/pdf/document";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFText } from "@/components/pdf";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";

export function MyInvoice() {
  return (
    <PDFDocument title="Invoice" author="My Company">
      <PDFPage>
        <PDFHeader>
          <PDFText variant="h2">My Company</PDFText>
          <PDFText variant="small" color="#737373">Invoice #001</PDFText>
        </PDFHeader>

        <PDFSection title="Customer">
          <PDFField label="Name" value="John Doe" />
          <PDFField label="Email" value="john@example.com" />
        </PDFSection>

        <PDFSection title="Items">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={3}>Description</PDFTableHead>
              <PDFTableHead flex={1}>Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              <PDFTableRow>
                <PDFTableCell flex={3}>Web Design</PDFTableCell>
                <PDFTableCell flex={1}>$2,500</PDFTableCell>
              </PDFTableRow>
            </PDFTableBody>
          </PDFTable>
        </PDFSection>

        <PDFFooter page={1} right="My Company" />
      </PDFPage>
    </PDFDocument>
  );
}
```

## Components

| Component | Import |
|-----------|--------|
| Document | `@/components/pdf/document` |
| Section | `@/components/pdf/section` |
| Table | `@/components/pdf/table` |
| Primitives | `@/components/pdf/primitives` |
| Card | `@/components/pdf/card` |
| Badge | `@/components/pdf/badge` |
| Divider | `@/components/pdf/divider` |

## Troubleshooting

**"Block not found" error?**
- Use the full URL: `https://shadcn-pdf.vercel.app/registry.json`
- Do NOT use: `shadcn-pdf/invoice`

**Components not found after install?**
- Check `@/components/pdf/` folder exists
- Verify imports match the component names

## License

ISC
