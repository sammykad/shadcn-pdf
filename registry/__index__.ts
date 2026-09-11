import React from "react"

export const Index: Record<string, any> = {
  "pdf": {
    name: "pdf",
    description: "The complete PDF design system.",
    type: "registry:item",
    files: [{
      path: "registry/pdf/index.ts",
      type: "registry:file",
      target: "~/components/pdf/index.ts",
    }],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "theme": {
    name: "theme",
    description: "Shared design system for PDFs.",
    type: "registry:item",
    files: [{
      path: "registry/pdf/core/theme.ts",
      type: "registry:file",
      target: "~/components/pdf/core/theme.ts",
    },{
      path: "registry/pdf/core/provider.tsx",
      type: "registry:file",
      target: "~/components/pdf/core/provider.tsx",
    }],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "fonts": {
    name: "fonts",
    description: "Geist Sans font registration.",
    type: "registry:item",
    files: [{
      path: "registry/pdf/core/fonts.ts",
      type: "registry:file",
      target: "~/components/pdf/core/fonts.ts",
    }],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "palette": {
    name: "palette",
    description: "Full Tailwind v4 color palette for react-pdf.",
    type: "registry:item",
    files: [{
      path: "registry/pdf/core/palette.ts",
      type: "registry:file",
      target: "~/components/pdf/core/palette.ts",
    }],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "tw": {
    name: "tw",
    description: "Resolves Tailwind-style class names to react-pdf styles.",
    type: "registry:item",
    files: [{
      path: "registry/pdf/core/tw.ts",
      type: "registry:file",
      target: "~/components/pdf/core/tw.ts",
    }],
    component: undefined,
    categories: undefined,
    meta: undefined,
  },
  "primitives": {
    name: "primitives",
    description: "Box, Text, FlexRow, and FlexCol primitives.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/primitives.tsx",
      type: "registry:file",
      target: "~/components/pdf/primitives.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/primitives") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "primitives"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "document": {
    name: "document",
    description: "Root Document, Page, Header, and Footer primitives.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/document.tsx",
      type: "registry:file",
      target: "~/components/pdf/document.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/document") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "document"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "section": {
    name: "section",
    description: "Titled content sections and label/value fields.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/section.tsx",
      type: "registry:file",
      target: "~/components/pdf/section.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/section") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "section"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "card": {
    name: "card",
    description: "A bordered, rounded container for PDF layouts.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/card.tsx",
      type: "registry:file",
      target: "~/components/pdf/card.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/card") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "card"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "typography": {
    name: "typography",
    description: "Heading and text primitives with a shared type scale.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/typography.tsx",
      type: "registry:file",
      target: "~/components/pdf/typography.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/typography") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "typography"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "table": {
    name: "table",
    description: "Layout-primitive table, row, and cell components.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/table.tsx",
      type: "registry:file",
      target: "~/components/pdf/table.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/table") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "table"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "badge": {
    name: "badge",
    description: "Status badge with semantic variants.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/badge.tsx",
      type: "registry:file",
      target: "~/components/pdf/badge.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/badge") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "badge"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "divider": {
    name: "divider",
    description: "A simple horizontal rule.",
    type: "registry:component",
    files: [{
      path: "registry/pdf/components/divider.tsx",
      type: "registry:file",
      target: "~/components/pdf/divider.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/components/divider") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "divider"
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "badge-demo": {
    name: "badge-demo",
    description: "A demo showing every Badge variant.",
    type: "registry:block",
    files: [{
      path: "registry/pdf/examples/badge-demo.tsx",
      type: "registry:file",
      target: "~/components/pdf/badge-demo.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/examples/badge-demo") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "badge-demo"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["examples"],
    meta: undefined,
  },
  "card-demo": {
    name: "card-demo",
    description: "A demo showing the full Card structure.",
    type: "registry:block",
    files: [{
      path: "registry/pdf/examples/card-demo.tsx",
      type: "registry:file",
      target: "~/components/pdf/card-demo.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/examples/card-demo") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "card-demo"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["examples"],
    meta: undefined,
  },
  "invoice": {
    name: "invoice",
    description: "A polished invoice document.",
    type: "registry:block",
    files: [{
      path: "registry/pdf/blocks/invoice/invoice.tsx",
      type: "registry:file",
      target: "~/components/pdf/invoice.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/blocks/invoice/invoice") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "invoice"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["business"],
    meta: undefined,
  },
  "student-report": {
    name: "student-report",
    description: "A two-page academic report card.",
    type: "registry:block",
    files: [{
      path: "registry/pdf/blocks/report/student-report.tsx",
      type: "registry:file",
      target: "~/components/pdf/student-report.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/blocks/report/student-report") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "student-report"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["education"],
    meta: undefined,
  },
  "academic-report": {
    name: "academic-report",
    description: "A comprehensive multi-page academic report.",
    type: "registry:block",
    files: [{
      path: "registry/pdf/blocks/report/academic-report.tsx",
      type: "registry:file",
      target: "~/components/pdf/academic-report.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/blocks/report/academic-report") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "academic-report"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["education"],
    meta: undefined,
  },
  "indian-report-card": {
    name: "indian-report-card",
    description: "A CBSE-style Indian report card.",
    type: "registry:block",
    files: [{
      path: "registry/pdf/blocks/report/indian-report-card.tsx",
      type: "registry:file",
      target: "~/components/pdf/indian-report-card.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/blocks/report/indian-report-card") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "indian-report-card"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["education"],
    meta: undefined,
  },
  "progress-report": {
    name: "progress-report",
    description: "A clean single-page progress report.",
    type: "registry:block",
    files: [{
      path: "registry/pdf/blocks/report/progress-report.tsx",
      type: "registry:file",
      target: "~/components/pdf/progress-report.tsx",
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/pdf/blocks/report/progress-report") as any
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || "progress-report"
      return { default: mod.default || mod[exportName] }
    }),
    categories: ["education"],
    meta: undefined,
  },
}
