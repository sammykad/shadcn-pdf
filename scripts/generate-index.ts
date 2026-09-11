import fs from "node:fs";
import path from "node:path";

const registryPath = path.resolve(process.cwd(), "registry.json");
const outputPath = path.resolve(process.cwd(), "registry", "__index__.ts");

const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

const lines = [
  'import React from "react"',
  "",
  "export const Index: Record<string, any> = {",
];

for (const item of registry.items) {
  const files = (item.files || []).map((f: any) => {
    const parts = [`path: "${f.path}"`, `type: "${f.type}"`];
    if (f.target) parts.push(`target: "${f.target}"`);
    return `    { ${parts.join(", ")} }`;
  });

  lines.push(`  "${item.name}": {`);
  lines.push(`    name: "${item.name}",`);
  if (item.description) lines.push(`    description: "${item.description}",`);
  lines.push(`    type: "${item.type}",`);
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
  lines.push(`    meta: undefined,`);
  lines.push(`  },`);
}

lines.push("};");
lines.push("");

fs.writeFileSync(outputPath, lines.join("\n"));
console.log("Generated registry/__index__.ts");
