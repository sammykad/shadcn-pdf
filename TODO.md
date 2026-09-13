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

Should we make in single component ? Developer Fraildy ?

View/Text How to Get Rid of this ?

Table Cutting issues in 2 pages 
