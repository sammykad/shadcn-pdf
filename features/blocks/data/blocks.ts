import type { RegistryItem } from "shadcn/schema"

export type Block = Pick<RegistryItem, "name" | "description" | "type" | "categories" | "meta"> & {
  category?: string
}

export function blockFromRegistry(item: RegistryItem): Block {
  return {
    name: item.name,
    description: item.description,
    type: item.type,
    categories: item.categories,
    meta: item.meta,
    category: item.categories?.[0],
  }
}
