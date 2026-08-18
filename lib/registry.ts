import fs from "node:fs";
import path from "node:path";

export type RegistryFile = {
  path: string;
  type: string;
};

export type RegistryItem = {
  name: string;
  type: string;
  files: RegistryFile[];
};

export const registryIndex: Record<string, RegistryItem> = {};

function load() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "registry.json"),
    "utf-8"
  );
  const parsed = JSON.parse(raw) as { items: RegistryItem[] };
  for (const item of parsed.items ?? []) {
    registryIndex[item.name] = item;
  }
}

load();

/** Rewrite registry-relative imports so snippets resolve inside docs. */
export function fixImport(source: string): string {
  return source
    .replace(/from "\.\.\/lib\/provider"/g, 'from "@/components/pdf/provider"')
    .replace(/from "\.\.\/lib\/theme"/g, 'from "@/components/pdf/theme"')
    .replace(/from "\.\.\/lib\/fonts"/g, 'from "@/components/pdf/fonts"');
}