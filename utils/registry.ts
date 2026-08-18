import { registryConfig } from "@/config/registry";

/** Resolves the served URL for a registry item, e.g. https://shadcn-pdf.dev/r/badge.json */
export function getRegistryItemUrl(name: string): string {
  const base = registryConfig.url.replace(/\/[^/]*$/, "");
  return `${base}/${name}.json`;
}
