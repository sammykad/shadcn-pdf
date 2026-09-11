import { registryConfig } from "@/config/registry"

type RegistryFile = {
  path: string
  type: string
  target?: string
  content?: string
}

export function getRegistryItemUrl(item: string) {
  return registryConfig.namespaceUrl.replace("{name}", item)
}

export function getRegistryItemUrls(...items: string[]) {
  return items.map(getRegistryItemUrl)
}

export function getRegistryItemNamespace(item: string) {
  return `${registryConfig.namespace}/${item}`
}

export async function expandRegistryDependencies(
  item: { registryDependencies?: string[]; [key: string]: any },
  baseUrl: string
) {
  const { Index } = await import("@/registry/__index__")
  const namespace = registryConfig.namespace
  const expandedDeps = (item.registryDependencies ?? []).map((dep: string) => {
    if (dep.startsWith(namespace + "/")) return dep
    return `${namespace}/${dep}`
  })
  return { ...item, registryDependencies: expandedDeps }
}

export function fixImport(content: string) {
  return content.replace(
    /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g,
    (_, _path, type, component) => {
      if (type.endsWith("components")) return `@/components/${component}`
      if (type.endsWith("ui")) return `@/components/ui/${component}`
      if (type.endsWith("hooks")) return `@/hooks/${component}`
      if (type.endsWith("lib")) return `@/lib/${component}`
      return `@/${_path}/${type}/${component}`
    }
  )
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
    const filePath = file.target ?? file.path
    const parts = filePath.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          existingNode.path = filePath
        } else {
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile
          ? { name: part, path: filePath }
          : { name: part, children: [] }
        currentLevel.push(newNode)
        if (!isFile) currentLevel = newNode.children!
      }
    }
  }

  return root
}
