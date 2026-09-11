import React from "react"

export const Index: Record<string, any> = {
  "pdf": {
    name: "pdf",
    description: "The complete PDF design system: document, layout, primitives, typography, card, table, badge, section, divider, theme, fonts, and tw(). One install for everything.",
    type: "registry:item",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/fonts","sammykad/shadcn-pdf/palette","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/primitives","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section","sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/typography","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider"],
    files: [
    { path: "registry/pdf/index.ts", type: "registry:file", target: "~/components/pdf/index.ts" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "theme": {
    name: "theme",
    description: "Shared design system for PDFs: colors, typography, spacing, and a provider.",
    type: "registry:item",
    dependencies: ["@react-pdf/renderer","react"],
    files: [
    { path: "registry/pdf/core/theme.ts", type: "registry:file", target: "~/components/pdf/core/theme.ts" },
    { path: "registry/pdf/core/provider.tsx", type: "registry:file", target: "~/components/pdf/core/provider.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "fonts": {
    name: "fonts",
    description: "Geist Sans font registration with a Helvetica fallback.",
    type: "registry:item",
    dependencies: ["@react-pdf/renderer","react"],
    files: [
    { path: "registry/pdf/core/fonts.ts", type: "registry:file", target: "~/components/pdf/core/fonts.ts" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "palette": {
    name: "palette",
    description: "Full Tailwind v4 default color palette for react-pdf.",
    type: "registry:item",
    files: [
    { path: "registry/pdf/core/palette.ts", type: "registry:file", target: "~/components/pdf/core/palette.ts" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "tw": {
    name: "tw",
    description: "Resolves Tailwind-style class names to react-pdf styles.",
    type: "registry:item",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/palette"],
    files: [
    { path: "registry/pdf/core/tw.ts", type: "registry:file", target: "~/components/pdf/core/tw.ts" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "primitives": {
    name: "primitives",
    description: "Box, Text, FlexRow, and FlexCol primitives that accept Tailwind-style className props.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/primitives.tsx", type: "registry:file", target: "~/components/pdf/primitives.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "document": {
    name: "document",
    description: "Root Document, Page, Header, and Footer primitives that auto-apply fonts.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/fonts"],
    files: [
    { path: "registry/pdf/components/document.tsx", type: "registry:file", target: "~/components/pdf/document.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "section": {
    name: "section",
    description: "Titled content sections and label/value fields for easy document composition.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/section.tsx", type: "registry:file", target: "~/components/pdf/section.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "card": {
    name: "card",
    description: "A bordered, rounded container for PDF layouts.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/card.tsx", type: "registry:file", target: "~/components/pdf/card.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "typography": {
    name: "typography",
    description: "Heading and text primitives with a shared type scale.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/typography.tsx", type: "registry:file", target: "~/components/pdf/typography.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "table": {
    name: "table",
    description: "Layout-primitive table, row, and cell components for tabular PDF data.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/table.tsx", type: "registry:file", target: "~/components/pdf/table.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "badge": {
    name: "badge",
    description: "Status badge with semantic variants.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/badge.tsx", type: "registry:file", target: "~/components/pdf/badge.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "badge-demo": {
    name: "badge-demo",
    description: "A demo showing every Badge variant.",
    type: "registry:block",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/badge"],
    files: [
    { path: "registry/pdf/examples/badge-demo.tsx", type: "registry:file", target: "~/components/pdf/badge-demo.tsx" }
    ],
    component: undefined,
    categories: ["examples"],
    meta: { createdAt: "2026-09-11" },
  },
  "card-demo": {
    name: "card-demo",
    description: "A demo showing the full Card structure.",
    type: "registry:block",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/badge"],
    files: [
    { path: "registry/pdf/examples/card-demo.tsx", type: "registry:file", target: "~/components/pdf/card-demo.tsx" }
    ],
    component: undefined,
    categories: ["examples"],
    meta: { createdAt: "2026-09-11" },
  },
  "divider": {
    name: "divider",
    description: "A simple horizontal rule.",
    type: "registry:component",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/divider.tsx", type: "registry:file", target: "~/components/pdf/divider.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "invoice": {
    name: "invoice",
    description: "A polished invoice document with items, taxes, and totals.",
    type: "registry:block",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/typography","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/invoice/invoice.tsx", type: "registry:file", target: "~/components/pdf/invoice.tsx" }
    ],
    component: undefined,
    categories: ["business"],
    meta: { createdAt: "2026-09-11" },
  },
  "student-report": {
    name: "student-report",
    description: "A two-page academic report card with student info, summary stats, subject grades, attendance bars, and signatures.",
    type: "registry:block",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/typography","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/report/student-report.tsx", type: "registry:file", target: "~/components/pdf/student-report.tsx" }
    ],
    component: undefined,
    categories: ["education"],
    meta: { createdAt: "2026-09-11" },
  },
  "academic-report": {
    name: "academic-report",
    description: "A comprehensive multi-page academic report with student profile, GPA, subject performance, and attendance.",
    type: "registry:block",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/typography","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/report/academic-report.tsx", type: "registry:file", target: "~/components/pdf/academic-report.tsx" }
    ],
    component: undefined,
    categories: ["education"],
    meta: { createdAt: "2026-09-11" },
  },
  "indian-report-card": {
    name: "indian-report-card",
    description: "A CBSE-style Indian report card with marks, grade points, CGPA, and co-curricular activities.",
    type: "registry:block",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/typography","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/report/indian-report-card.tsx", type: "registry:file", target: "~/components/pdf/indian-report-card.tsx" }
    ],
    component: undefined,
    categories: ["education"],
    meta: { createdAt: "2026-09-11" },
  },
  "progress-report": {
    name: "progress-report",
    description: "A clean single-page progress report with CA/Exam scores, grades, and teacher comments.",
    type: "registry:block",
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/typography","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document"],
    files: [
    { path: "registry/pdf/blocks/report/progress-report.tsx", type: "registry:file", target: "~/components/pdf/progress-report.tsx" }
    ],
    component: undefined,
    categories: ["education"],
    meta: { createdAt: "2026-09-11" },
  },
};
