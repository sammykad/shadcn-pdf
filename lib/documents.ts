import { loadRegistry, loadRegistryItem } from "shadcn/registry";

export type RegistryItemSummary = {
  name: string;
  type: string;
  title?: string;
  description?: string;
};

export async function getComponents(): Promise<RegistryItemSummary[]> {
  const registry = await loadRegistry({
    cwd: process.cwd(),
    registryFile: "registry.json",
  });
  return (registry.items ?? []).filter(
    (item) => item.type === "registry:component"
  );
}

export async function getBlocks(): Promise<RegistryItemSummary[]> {
  const registry = await loadRegistry({
    cwd: process.cwd(),
    registryFile: "registry.json",
  });
  return (registry.items ?? []).filter((item) => item.type === "registry:block");
}

export async function getRegistryItem(name: string) {
  return loadRegistryItem(name, {
    cwd: process.cwd(),
    registryFile: "registry.json",
  });
}

export async function getItemNames(): Promise<string[]> {
  const registry = await loadRegistry({
    cwd: process.cwd(),
    registryFile: "registry.json",
  });
  return (registry.items ?? []).map((item) => item.name);
}