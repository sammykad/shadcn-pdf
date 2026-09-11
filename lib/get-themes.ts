import "server-only"

import { cache } from "react"
import { unstable_cache } from "next/cache"
import type { RegistryItem } from "shadcn/schema"

import { getShadcnThemes } from "./themes/shadcn"
import { getTweakcnThemes } from "./themes/tweakcn"

const getCachedTweakcnThemes = unstable_cache(
  getTweakcnThemes,
  ["tweakcn-themes"],
  {
    revalidate: 60 * 60 * 24, // 24 hours
  }
)

export const getCachedThemes = cache(
  async (): Promise<Map<string, RegistryItem>> => {
    const shadcnThemes = getShadcnThemes()
    const tweakcnThemes = await getCachedTweakcnThemes()
    const themes = [...shadcnThemes, ...tweakcnThemes]
    return new Map(themes.map((theme) => [theme.name, theme]))
  }
)
