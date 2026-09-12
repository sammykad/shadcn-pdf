import type { LucideIcon } from "lucide-react"
import type { RegistryItem } from "shadcn/schema"

export type Block = Pick<RegistryItem, "name" | "title" | "description" | "type" | "categories" | "meta"> & {
  category?: string
  icon?: LucideIcon
}

export function blockFromRegistry(item: RegistryItem): Block {
  return {
    name: item.name,
    title: item.title,
    description: item.description,
    type: item.type,
    categories: item.categories,
    meta: item.meta,
    category: item.categories?.[0],
    icon: (item as RegistryItem & { icon?: LucideIcon }).icon,
  }
}
