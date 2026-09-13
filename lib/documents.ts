import registry from "../registry.json";

export type RegistryItemSummary = {
  name: string;
  type: string;
  title?: string;
  description?: string;
};

export function getComponents(): RegistryItemSummary[] {
  return (registry.items ?? []).filter(
    (item) => item.type === "registry:component"
  );
}

export function getBlocks(): RegistryItemSummary[] {
  return (registry.items ?? []).filter((item) => item.type === "registry:block");
}

export function getRegistryItem(name: string) {
  return (registry.items ?? []).find((item) => item.name === name) ?? null;
}

export function getItemNames(): string[] {
  return (registry.items ?? []).map((item) => item.name);
}
