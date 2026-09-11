import { cache } from "react"

import { formatCode } from "@/lib/format-code"
import { highlightCode } from "@/lib/highlight-code"
import {
  createFileTreeForRegistryItemFiles,
} from "@/lib/registry"
import { getRegistryItem } from "@/lib/registry-server"
import { BlockViewer } from "@/components/block-viewer"
import { getCachedThemes } from "@/lib/get-themes"

export async function BlockDisplay({ name }: { name: string }) {
  const item = await getCachedRegistryItem(name)

  if (!item?.files) {
    return null
  }

  const [tree, highlightedFiles, themes] = await Promise.all([
    getCachedFileTree(item.files),
    getCachedHighlightedFiles(item.files),
    getCachedThemes(),
  ])

  return (
    <BlockViewer
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      themes={themes}
    />
  )
}

const getCachedRegistryItem = cache(async (name: string) => {
  return await getRegistryItem(name)
})

const getCachedFileTree = cache(
  async (files: Array<{ path: string; target?: string }>) => {
    if (!files) {
      return null
    }
    return createFileTreeForRegistryItemFiles(files)
  }
)

const getCachedHighlightedFiles = cache(
  async (files: { path: string; type: string; target?: string; content?: string }[]) => {
    return await Promise.all(
      files.map(async (file) => ({
        ...file,
        highlightedContent: await highlightCode(
          await formatCode(file.content ?? "", "radix-vega")
        ),
      }))
    )
  }
)