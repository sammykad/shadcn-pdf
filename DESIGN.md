# Design Guidelines

## Color Tokens

Use theme tokens instead of hardcoded Tailwind colors.

| Token | Value | Use Case |
|-------|-------|----------|
| `text-foreground` | `#0a0a0a` | Primary text |
| `text-muted` | `#737373` | Secondary text, labels |
| `text-muted-foreground` | `#a1a1aa` | Subtle text, captions |
| `text-destructive` | `#dc2626` | Errors, negative values |
| `text-success` | `#16a34a` | Success states |
| `bg-muted-background` | `#fafafa` | Subtle backgrounds |
| `border` | `#e4e4e7` | Borders, dividers |

### ❌ Don't
```tsx
<PDFText className="text-zinc-500">Label</PDFText>
<PDFText className="text-zinc-400">Value</PDFText>
```

### ✅ Do
```tsx
<PDFText className="text-muted">Label</PDFText>
<PDFText className="text-muted-foreground">Value</PDFText>
```

---

## Typography

### Text Variants
| Variant | Size | Weight | Use Case |
|---------|------|--------|----------|
| `h1` | 28px | 700 | Page title |
| `h2` | 20px | 700 | Section title |
| `h3` | 16px | 600 | Subsection |
| `h4` | 13px | 600 | Card title, table section |
| `default` | 11px | 400 | Body text |
| `small` | 9px | 400 | Labels, captions |
| `muted` | 11px | 400 | Secondary text |

---

## Spacing

Use theme spacing tokens via tw().

| Token | Value |
|-------|-------|
| `p-1` | 4px |
| `p-2` | 8px |
| `p-3` | 12px |
| `p-4` | 16px |
| `p-5` | 20px |
| `p-6` | 24px |
| `p-8` | 32px |

---

## Components

### Tables
- Use `PDFTable`, `PDFTableHeader`, `PDFTableBody`, `PDFTableFooter`, `PDFTableRow`, `PDFTableHead`, `PDFTableCell`
- Header: uppercase, 9px, `text-muted`, semibold
- Cells: 10px, `text-foreground`
- Rows: 1px bottom border
- Footer: top border, `bg-muted-background`
- Padding: 10px vertical, 12px horizontal

### Cards
- Use `PDFCard`, `PDFCardContent`, `PDFCardFooter`
- Border: 1px `border`
- Border radius: `radius.lg` (6px)
- Padding: 16px

### Sections
- Use `PDFSection` with `as="card"` or `as="plain"`
- Card: bordered with padding
- Plain: no border, no padding

### Badges
- Use `PDFBadge` with variants: `default`, `success`, `destructive`, `secondary`

---

## Layout Patterns

### Employee Details (Key-Value)
```tsx
<PDFSection as="plain">
  <PDFText variant="small" className="text-muted uppercase tracking-wide mb-3">Title</PDFText>
  <PDFContainer className="flex flex-row gap-8">
    <PDFContainer className="flex flex-col gap-2 flex-1">
      <PDFContainer className="flex flex-row justify-between">
        <PDFText variant="small" className="text-muted">Label</PDFText>
        <PDFText variant="small">Value</PDFText>
      </PDFContainer>
    </PDFContainer>
  </PDFContainer>
</PDFSection>
```

### Table with Title
```tsx
<PDFSection title="Section Title" as="card">
  <PDFTable>
    <PDFTableHeader>
      <PDFTableHead flex={3}>Column 1</PDFTableHead>
      <PDFTableHead flex={1}>Column 2</PDFTableHead>
    </PDFTableHeader>
    <PDFTableBody>
      <PDFTableRow>
        <PDFTableCell flex={3}>Data</PDFTableCell>
        <PDFTableCell flex={1}>Data</PDFTableCell>
      </PDFTableRow>
    </PDFTableBody>
    <PDFTableFooter>
      <PDFTableCell flex={3}><PDFText className="font-semibold">Total</PDFText></PDFTableCell>
      <PDFTableCell flex={1}><PDFText className="font-semibold">$1,000</PDFText></PDFTableCell>
    </PDFTableFooter>
  </PDFTable>
</PDFSection>
```

---

## File Checklist (Components)

When adding a new component:
1. `registry/pdf/components/{name}.tsx`
2. `registry/pdf/examples/{name}-demo.tsx`
3. `registry.json`
4. `scripts/generate-index.ts` (add icon + run)
5. `features/doc/content/components/{name}.mdx`
6. `lib/component-previews.tsx`
7. `lib/component-preview-paths.ts`
8. `npm run preview:gen`

## File Checklist (Blocks)

When adding a new block:
1. `registry/pdf/blocks/{name}.tsx`
2. `registry.json`
3. `scripts/generate-index.ts` (add icon + run)
4. `scripts/{name}-data.ts`
5. `scripts/render-{name}.tsx`
6. `lib/block-components.ts`
7. `scripts/generate-previews.tsx`
8. `npm run preview:gen`
