import fs from "node:fs";
import path from "node:path";

const registryPath = path.resolve(process.cwd(), "registry.json");
const outputPath = path.resolve(process.cwd(), "registry", "__index__.ts");

const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

// Icon mapping for registry items
const iconMap: Record<string, string> = {
  pdf: "FileStack",
  theme: "Palette",
  palette: "Pipette",
  tw: "Wind",
  primitives: "Box",
  document: "FileText",
  section: "LayoutList",
  card: "Square",
  table: "Table",
  badge: "Tag",
  divider: "Minus",
  "pdf-viewer": "Eye",
  invoice: "Receipt",
  "student-report": "GraduationCap",
  "academic-report": "BookOpen",
  "salary-slip": "DollarSign",
  "audit-log-report": "Shield",
  "contract-agreement": "FileSignature",
};

const lines = [
  'import React from "react"',
  'import type { LucideIcon } from "lucide-react"',
  'import {',
  '  FileStack,',
  '  Palette,',
  '  Pipette,',
  '  Wind,',
  '  Box,',
  '  FileText,',
  '  LayoutList,',
  '  Square,',
  '  Table,',
  '  Tag,',
  '  Minus,',
  '  Eye,',
  '  Receipt,',
  '  GraduationCap,',
  '  BookOpen,',
  '  DollarSign,',
  '  Shield,',
  '  FileSignature,',
  '} from "lucide-react"',
  "",
  "export const Index: Record<string, any> = {",
];

for (const item of registry.items) {
  const files = (item.files || []).map((f: any) => {
    const parts = [`path: "${f.path}"`, `type: "${f.type}"`];
    if (f.target) parts.push(`target: "${f.target}"`);
    return `    { ${parts.join(", ")} }`;
  });

  const icon = iconMap[item.name];

  lines.push(`  "${item.name}": {`);
  lines.push(`    name: "${item.name}",`);
  if (item.title) lines.push(`    title: "${item.title}",`);
  if (item.description) lines.push(`    description: "${item.description}",`);
  lines.push(`    type: "${item.type}",`);
  if (icon) lines.push(`    icon: ${icon} satisfies LucideIcon,`);
  if (item.dependencies?.length) lines.push(`    dependencies: ${JSON.stringify(item.dependencies)},`);
  if (item.registryDependencies?.length) lines.push(`    registryDependencies: ${JSON.stringify(item.registryDependencies)},`);
  lines.push(`    files: [`);
  lines.push(files.join(",\n"));
  lines.push(`    ],`);
  lines.push(`    component: undefined,`);
  if (item.categories?.length) {
    lines.push(`    categories: ${JSON.stringify(item.categories)},`);
  } else {
    lines.push(`    categories: undefined,`);
  }
  if (item.meta) {
    lines.push(`    meta: ${JSON.stringify(item.meta)},`);
  } else {
    lines.push(`    meta: undefined,`);
  }
  lines.push(`  },`);
}

lines.push("};");
lines.push("");
lines.push("export const components = Object.values(Index).filter(");
lines.push("  (item) => item.type === \"registry:component\"");
lines.push(");");
lines.push("");
lines.push("export const blocks = Object.values(Index).filter(");
lines.push("  (item) => item.type === \"registry:block\"");
lines.push(");");
lines.push("");
lines.push("export const items = Object.values(Index).filter(");
lines.push("  (item) => item.type === \"registry:item\"");
lines.push(");");
lines.push("");

fs.writeFileSync(outputPath, lines.join("\n"));
console.log("Generated registry/__index__.ts");
