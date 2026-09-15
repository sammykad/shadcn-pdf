import React from "react"
import type { LucideIcon } from "lucide-react"
import {
  FileStack,
  Palette,
  Pipette,
  Wind,
  Box,
  FileText,
  LayoutList,
  Square,
  Table,
  Tag,
  Minus,
  Eye,
  Receipt,
  GraduationCap,
  BookOpen,
  TrendingUp,
  DollarSign,
  Shield,
} from "lucide-react"

export const Index: Record<string, any> = {
  "pdf": {
    name: "pdf",
    title: "shadcn-pdf (everything)",
    description: "The complete PDF design system: document, layout, primitives, typography, card, table, badge, section, divider, theme, and tw(). One install for everything.",
    type: "registry:item",
    icon: FileStack satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/primitives","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section","sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider"],
    files: [
    { path: "registry/pdf/index.ts", type: "registry:file", target: "~/components/pdf/index.ts" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "theme": {
    name: "theme",
    title: "PDF Theme",
    description: "Shared design system for PDFs: colors, typography, spacing, and a provider.",
    type: "registry:item",
    icon: Palette satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    files: [
    { path: "registry/pdf/core/theme.ts", type: "registry:file", target: "~/components/pdf/core/theme.ts" },
    { path: "registry/pdf/core/provider.tsx", type: "registry:file", target: "~/components/pdf/core/provider.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "palette": {
    name: "palette",
    title: "PDF Color Palette",
    description: "Full Tailwind v4 default color palette for react-pdf.",
    type: "registry:item",
    icon: Pipette satisfies LucideIcon,
    files: [
    { path: "registry/pdf/core/palette.ts", type: "registry:file", target: "~/components/pdf/core/palette.ts" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "tw": {
    name: "tw",
    title: "PDF Tailwind-style utilities",
    description: "Resolves Tailwind-style class names to react-pdf styles.",
    type: "registry:item",
    icon: Wind satisfies LucideIcon,
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
    title: "PDF Primitives",
    description: "Box, Text, FlexRow, and FlexCol primitives that accept Tailwind-style className props.",
    type: "registry:component",
    icon: Box satisfies LucideIcon,
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
    title: "PDF Document & Page",
    description: "Root Document, Page, Header, and Footer primitives that auto-apply fonts.",
    type: "registry:component",
    icon: FileText satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/document.tsx", type: "registry:file", target: "~/components/pdf/document.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "section": {
    name: "section",
    title: "PDF Section & Field",
    description: "Titled content sections and label/value fields for easy document composition.",
    type: "registry:component",
    icon: LayoutList satisfies LucideIcon,
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
    title: "PDF Card",
    description: "A bordered, rounded container for PDF layouts.",
    type: "registry:component",
    icon: Square satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/card.tsx", type: "registry:file", target: "~/components/pdf/card.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "table": {
    name: "table",
    title: "PDF Table",
    description: "Layout-primitive table, row, and cell components for tabular PDF data.",
    type: "registry:component",
    icon: Table satisfies LucideIcon,
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
    title: "PDF Badge",
    description: "Status badge with semantic variants.",
    type: "registry:component",
    icon: Tag satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/badge.tsx", type: "registry:file", target: "~/components/pdf/badge.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "divider": {
    name: "divider",
    title: "PDF Divider",
    description: "A simple horizontal rule.",
    type: "registry:component",
    icon: Minus satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/tw"],
    files: [
    { path: "registry/pdf/components/divider.tsx", type: "registry:file", target: "~/components/pdf/divider.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "pdf-viewer": {
    name: "pdf-viewer",
    title: "PDF Viewer",
    description: "A client-side PDF viewer with page navigation, zoom, and download support.",
    type: "registry:component",
    icon: Eye satisfies LucideIcon,
    dependencies: ["pdfjs-dist","react","lucide-react"],
    files: [
    { path: "components/pdf-viewer.tsx", type: "registry:file", target: "~/components/pdf-viewer.tsx" }
    ],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "invoice": {
    name: "invoice",
    title: "Professional Tax Invoice",
    description: "Professional Tax Invoice with line items, tax calculations, and payment terms.",
    type: "registry:block",
    icon: Receipt satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/invoice.tsx", type: "registry:file", target: "~/components/pdf/invoice.tsx" }
    ],
    component: undefined,
    categories: ["finance"],
    meta: undefined,
  },
  "student-report": {
    name: "student-report",
    title: "Academic Report Card",
    description: "Academic Report Card with student info, grades, attendance, and teacher signatures.",
    type: "registry:block",
    icon: GraduationCap satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/student-report.tsx", type: "registry:file", target: "~/components/pdf/student-report.tsx" }
    ],
    component: undefined,
    categories: ["education","reports"],
    meta: undefined,
  },
  "academic-report": {
    name: "academic-report",
    title: "Comprehensive Academic Report",
    description: "Comprehensive Academic Report with student profile, GPA, subjects, and attendance.",
    type: "registry:block",
    icon: BookOpen satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/academic-report.tsx", type: "registry:file", target: "~/components/pdf/academic-report.tsx" }
    ],
    component: undefined,
    categories: ["education","reports"],
    meta: undefined,
  },
  "progress-report": {
    name: "progress-report",
    title: "Student Progress Report",
    description: "Student Progress Report with CA/Exam scores, grades, and teacher comments.",
    type: "registry:block",
    icon: TrendingUp satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document"],
    files: [
    { path: "registry/pdf/blocks/progress-report.tsx", type: "registry:file", target: "~/components/pdf/progress-report.tsx" }
    ],
    component: undefined,
    categories: ["education","reports"],
    meta: undefined,
  },
  "audit-log-report": {
    name: "audit-log-report",
    title: "Audit Log Report",
    description: "Admin audit log report with KPIs, applied filters, activity breakdown, a multi-page event table, and detailed critical-event change diffs.",
    type: "registry:block",
    icon: Shield satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/audit-log-report.tsx", type: "registry:file", target: "~/components/pdf/audit-log-report.tsx" }
    ],
    component: undefined,
    categories: ["reports"],
    meta: undefined,
  },
  "salary-slip": {
    name: "salary-slip",
    title: "Employee Salary Slip",
    description: "Employee Salary Slip with earnings, deductions, and net pay summary.",
    type: "registry:block",
    icon: DollarSign satisfies LucideIcon,
    dependencies: ["@react-pdf/renderer","react"],
    registryDependencies: ["sammykad/shadcn-pdf/theme","sammykad/shadcn-pdf/tw","sammykad/shadcn-pdf/card","sammykad/shadcn-pdf/table","sammykad/shadcn-pdf/badge","sammykad/shadcn-pdf/divider","sammykad/shadcn-pdf/document","sammykad/shadcn-pdf/section"],
    files: [
    { path: "registry/pdf/blocks/salary-slip.tsx", type: "registry:file", target: "~/components/pdf/salary-slip.tsx" }
    ],
    component: undefined,
    categories: ["finance"],
    meta: undefined,
  },
};

export const components = Object.values(Index).filter(
  (item) => item.type === "registry:component"
);

export const blocks = Object.values(Index).filter(
  (item) => item.type === "registry:block"
);

export const items = Object.values(Index).filter(
  (item) => item.type === "registry:item"
);
