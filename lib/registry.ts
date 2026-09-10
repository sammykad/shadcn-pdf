import fs from "node:fs";
import path from "node:path";
import { registryConfig } from "@/config/registry";

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

/** Resolves the served URL for a registry item, e.g. https://shadcn-pdf.vercel.app/r/badge.json */
export function getRegistryItemUrl(name: string): string {
  const base = registryConfig.url.replace(/\/[^/]*$/, "");
  return `${base}/${name}.json`;
}

const KNOWN_ITEMS = new Set(Object.keys(registryIndex));

/**
 * Rewrites bare registryDependencies (e.g. "card", "theme") to full item URLs
 * (e.g. "https://shadcn-pdf.vercel.app/r/card.json") so the shadcn CLI resolves them
 * against this registry instead of ui.shadcn.com.
 *
 * Per the shadcn spec, bare names mean the built-in registry — so for a custom
 * URL-served registry, dependencies must be absolute item addresses. We keep
 * registry.json human-readable (bare names) and expand them at serve time.
 */
export function expandRegistryDependencies<T extends { registryDependencies?: string[] }>(
  item: T,
  baseUrl: string,
): T {
  if (!item.registryDependencies?.length) return item;

  const base = baseUrl.replace(/\/[^/]*$/, "");

  const expanded = item.registryDependencies.map((dep) => {
    // Already an address (URL, namespace, github ref, or file path): leave as-is.
    if (
      dep.includes("://") ||
      dep.startsWith("@") ||
      dep.includes("/") ||
      dep.startsWith(".")
    ) {
      return dep;
    }
    // Bare name that matches a local registry item -> absolute URL.
    if (KNOWN_ITEMS.has(dep)) {
      return `${base}/${dep}.json`;
    }
    // Unknown bare name: keep as-is (likely a built-in shadcn item).
    return dep;
  });

  return { ...item, registryDependencies: expanded };
}