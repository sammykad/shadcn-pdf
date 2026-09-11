import path from "path"
import { promises as fs } from "fs"
import { registryItemSchema } from "shadcn/schema"

import { registryConfig } from "@/config/registry"

export async function getRegistryItem(name: string) {
  const { Index } = await import("@/registry/__index__")
  const item = Index[name]

  if (!item) return null

  const result = registryItemSchema.safeParse(item)
  if (!result.success) return null

  const files = await Promise.all(
    item.files.map(async (file: any) => {
      const content = await fs.readFile(file.path, "utf-8")
      const relativePath = path.relative(process.cwd(), file.path)
      return { ...file, path: relativePath, content }
    })
  )

  const parsed = registryItemSchema.safeParse({ ...result.data, files })
  return parsed.success ? parsed.data : null
}

export async function getRegistryIndex() {
  const { Index } = await import("@/registry/__index__")
  return Index
}
