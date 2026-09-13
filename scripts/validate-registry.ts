import fs from "node:fs";
import path from "node:path";

const r = JSON.parse(fs.readFileSync("registry.json", "utf-8"));

console.log("=== Registry Validation ===\n");

// Basic shape validation
const validShape =
  typeof r.$schema === "string" &&
  r.name === "shadcn-pdf" &&
  typeof r.homepage === "string" &&
  Array.isArray(r.items);

console.log("✓ Valid object shape:", validShape);
console.log("  Name:", r.name);
console.log("  Items:", r.items.length);

// Check required fields
const missing = r.items.filter(
  (i: any) => !i.name || !i.type || !i.files || !Array.isArray(i.files)
);
console.log("\n✓ Items missing required fields:", missing.length === 0 ? "none" : missing.map((i: any) => i.name).join(", "));

// Check item types
const types = new Set(r.items.map((i: any) => i.type));
console.log("✓ Item types:", [...types].join(", "));

// Check duplicate names
const dupNames = r.items.map((i: any) => i.name).filter((n: string, i: number, a: string[]) => a.indexOf(n) !== i);
console.log("✓ Duplicate names:", dupNames.length === 0 ? "none" : dupNames.join(", "));

// Check phantom dependencies
const itemNames = new Set(r.items.map((i: any) => i.name));
const phantomDeps: { item: string; dep: string }[] = [];

for (const item of r.items) {
  if (item.registryDependencies) {
    for (const dep of item.registryDependencies) {
      // Extract the item name from the namespace (e.g., "sammykad/shadcn-pdf/theme" -> "theme")
      const depName = dep.split("/").pop();
      if (depName && !itemNames.has(depName)) {
        phantomDeps.push({ item: item.name, dep: depName });
      }
    }
  }
}

console.log("\n✓ Phantom dependencies:", phantomDeps.length === 0 ? "none" : "");
if (phantomDeps.length > 0) {
  for (const { item, dep } of phantomDeps) {
    console.log(`  - "${item}" depends on non-existent "${dep}"`);
  }
}

// Check file paths exist
const missingFiles: { item: string; file: string }[] = [];

for (const item of r.items) {
  if (item.files) {
    for (const file of item.files) {
      const filePath = path.resolve(process.cwd(), file.path);
      if (!fs.existsSync(filePath)) {
        missingFiles.push({ item: item.name, file: file.path });
      }
    }
  }
}

console.log("\n✓ Missing files:", missingFiles.length === 0 ? "none" : "");
if (missingFiles.length > 0) {
  for (const { item, file } of missingFiles) {
    console.log(`  - "${item}": ${file}`);
  }
}

// Check target paths use ~/ prefix
const invalidTargets: { item: string; target: string }[] = [];

for (const item of r.items) {
  if (item.files) {
    for (const file of item.files) {
      if (file.target && !file.target.startsWith("~/")) {
        invalidTargets.push({ item: item.name, target: file.target });
      }
    }
  }
}

console.log("\n✓ Invalid target paths (missing ~/):", invalidTargets.length === 0 ? "none" : "");
if (invalidTargets.length > 0) {
  for (const { item, target } of invalidTargets) {
    console.log(`  - "${item}": ${target}`);
  }
}

// Summary
const totalIssues = phantomDeps.length + missingFiles.length + invalidTargets.length;
console.log("\n=== Summary ===");
console.log(totalIssues === 0 ? "✓ All checks passed!" : `✗ Found ${totalIssues} issue(s)`);