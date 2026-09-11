import { promises as fs } from "fs"
import path from "path"
import LRUCache from "lru-cache"
import { registryItemSchema } from "shadcn/schema"

import { Index } from "@/registry/__index__"
import { registryConfig } from "@/config/registry"

export const registryIndex = Index

export function getRegistryItemUrl(item: string) {
  return registryConfig.namespaceUrl.replace("{name}", item)
}

export function getRegistryItemUrls(...items: string[]) {
  return items.map(getRegistryItemUrl)
}

export function getRegistryItemNamespace(item: string) {
  return `${registryConfig.namespace}/${item}`
}

const registryCache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5,
})

type RegistryFile = {
  path: string
  type: string
  target?: string
  content?: string
}

type RegistryItem = {
  name: string
  type: string
  description?: string
  files?: RegistryFile[]
  registryDependencies?: string[]
  dependencies?: string[]
  cssVars?: { theme?: Record<string, string>; light?: Record<string, string>; dark?: Record<string, string> }
  meta?: Record<string, any>
}

export function expandRegistryDependencies(
  item: RegistryItem,
  baseUrl: string
): RegistryItem {
  const namespace = registryConfig.namespace
  const expandedDeps = (item.registryDependencies ?? []).map(
    (dep: string) => {
      if (dep.startsWith(namespace + "/")) {
        return dep
      }
      return `${namespace}/${dep}`
    }
  )
  return {
    ...item,
    registryDependencies: expandedDeps,
  }
}

export async function getRegistryItem(name: string) {
  const cacheKey = name

  if (registryCache.has(cacheKey)) {
    return registryCache.get(cacheKey)
  }

  const item = Index[name]

  if (!item) {
    registryCache.set(cacheKey, null)
    return null
  }

  const result = registryItemSchema.safeParse(item)

  if (!result.success) {
    registryCache.set(cacheKey, null)
    return null
  }

  let files: typeof result.data.files = await Promise.all(
    item.files.map(async (file: any) => {
      const content = await getFileContent(file)
      const relativePath = path.relative(process.cwd(), file.path)

      return {
        ...file,
        path: relativePath,
        content,
      }
    })
  )

  files = fixFilePaths(files)

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files,
  })

  if (!parsed.success) {
    console.error(parsed.error.message)
    registryCache.set(cacheKey, null)
    return null
  }

  registryCache.set(cacheKey, parsed.data)

  return parsed.data
}

async function getFileContent(file: any) {
  let code = await fs.readFile(file.path, "utf-8")

  if (file.type !== "registry:page") {
    code = code.replaceAll("export default", "export")
  }

  code = fixImport(code)

  return code
}

export function fixImport(content: string) {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

  const replacement = (
    match: string,
    _path: string,
    type: string,
    component: string
  ) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`
    } else if (type.endsWith("ui")) {
      return `@/components/ui/${component}`
    } else if (type.endsWith("hooks")) {
      return `@/hooks/${component}`
    } else if (type.endsWith("lib")) {
      return `@/lib/${component}`
    }

    return match
  }

  return content.replace(regex, replacement)
}

export function fixFilePaths(files: any[]) {
  if (!files) {
    return []
  }

  const firstFilePath = files[0].path
  const firstFilePathDir = path.dirname(firstFilePath)

  return files.map((file: any) => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file),
    }
  })
}

export function getFileTarget(file: any) {
  let target = file.target

  if (!target || target === "") {
    const fileName = file.path.split("/").pop()
    if (
      file.type === "registry:block" ||
      file.type === "registry:component" ||
      file.type === "registry:example"
    ) {
      target = `components/${fileName}`
    }

    if (file.type === "registry:ui") {
      target = `components/ui/${fileName}`
    }

    if (file.type === "registry:hook") {
      target = `hooks/${fileName}`
    }

    if (file.type === "registry:lib") {
      target = `lib/${fileName}`
    }

    return target ?? ""
  }

  return normalizeAliasTarget(target)
}

export function normalizeAliasTarget(target: string) {
  const regex = /^@(components|ui|hooks|lib)\/(.+)$/

  return target.replace(regex, (_, type, rest) => {
    if (type === "components") {
      return `components/${rest}`
    }

    if (type === "ui") {
      return `components/ui/${rest}`
    }

    if (type === "hooks") {
      return `hooks/${rest}`
    }

    if (type === "lib") {
      return `lib/${rest}`
    }

    return target
  })
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target ?? file.path
    const parts = path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          existingNode.path = path
        } else {
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
}