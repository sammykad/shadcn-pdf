# shadcn-pdf TODO

im building a shadcn/ui-style component library for React PDF — reusable, composable primitives (Card, Badge, Provider, etc.) that mirror shadcn's API but render PDFs via @react-pdf/renderer instead of the DOM.

## 1. Fix Component Previews
- [ ] Badge preview
- [ ] Card preview
- [ ] Divider preview
- [ ] Document preview
- [ ] Section preview
- [x] Table preview ✅
- [ ] Typography preview
- [ ] Layout preview

## 2. Fix MDX Files
- [ ] Remove unwanted content
- [ ] Add complete, runnable examples
- [ ] Match actual rendered previews
- [ ] Remove `AutoTypeTable` for string unions (manual tables)
- [ ] Verify CLI install commands work

## 3. Improve Homepage
- [ ] Interactive hero section
- [ ] Add blocks showcase
- [ ] Better component showcase

## 4. Fix CLI Installation
- [ ] Test `npx shadcn@latest add sammykad/shadcn-pdf/*`
- [ ] Ensure imports work in new projects
- [ ] Fix path issues

## 5. Enhance Package
- [ ] Review `packages/shadcn-pdf/`
- [ ] Add proper exports
- [ ] Test publish flow
- Add the PDFViewer For components

import { PDFTextBlock } from "@/components/pdf/typography"; 
import { PDFDocument, PDFPage } from "@/components/pdf/document";
import { View } from "@react-pdf/renderer"; 

can we create font  each  component like <card font="giest"> <Cardtitle  font="another font ">
Should we make in single component ? Developer Fraildy ?

View/Text How to Get Rid of this ?

Table Cutting issues in 2 pages

## 6. Table "PDF feel" redesign (booktabs)
Tables currently read as web UI (all-row borders, pill badges, rounded containers, background fills).
Goal: make them feel like printed PDF docs — clean horizontal rules, open rows.
- [ ] `PDFTableHeader`: top rule + bottom rule only (no per-cell borders)
- [ ] `PDFTableHead`: remove its own `borderBottom` (doubles with header row today → heavy 2px line)
- [ ] `PDFTableRow`: drop default bottom border → borderless rows
- [ ] `PDFTableBody`: add closing rule at table end (booktabs bottom line)
- [ ] Keep badges, alignment, wrapping; props stay class-bypassable via `className`
- Verify: render invoice, salary-slip, student-report + `tsc --noEmit` 
