import { promises as fs } from "node:fs"
import path from "node:path"

const REPO_ROOT = path.resolve(process.cwd())

type RegistryFile = {
  path: string
  type: string
  target?: string
  content?: string
}

/**
 * Reads each file listed in `item.files` from disk and attaches its contents.
 * The shadcn CLI cannot resolve file paths served from a registry URL, so items
 * must ship inline `content` to be installable via `shadcn add <url>` / `@ns/item`.
 * Server-only: imports Node `fs`, keep out of client bundles.
 */
export async function inlineRegistryContent<
  T extends { files?: RegistryFile[] }
>(item: T): Promise<T> {
  const files = item.files ?? []
  const withContent = await Promise.all(
    files.map(async (file) => {
      if (file.content) return file
      try {
        const content = await fs.readFile(
          path.join(REPO_ROOT, file.path),
          "utf-8"
        )
        return { ...file, content }
      } catch {
        return file
      }
    })
  )
  return { ...item, files: withContent }
}