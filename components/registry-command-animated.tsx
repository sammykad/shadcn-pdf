"use client"

import { useRef, useMemo } from "react"
import { motion } from "motion/react"

import { registryConfig } from "@/config/registry"
import type { PackageManager } from "@/hooks/use-package-manager"
import { usePackageManager } from "@/hooks/use-package-manager"
import {
  Index,
  components as allComponents,
  blocks as allBlocks,
  items as allItems,
} from "@/registry/__index__"
import { IconSwap, IconSwapItem } from "@/components/icon-swap"
import { TextFlip } from "@/components/ui/text-flip"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"
import { CopyButton } from "./copy-button"
import { getIconForPackageManager } from "./icons"

const pmCommands = {
  pnpm: "pnpm dlx",
  yarn: "yarn",
  npm: "npx",
  bun: "bunx --bun",
}

type RegistryType = "blocks" | "components" | "items" | "all"

type RegistryCommandAnimatedProps = {
  /** Filter by registry type, or pass custom names directly. */
  filter?: RegistryType
  /** Override: specific item names to show (bypasses filter). */
  names?: string[]
}

function getNamesByFilter(filter: RegistryType): string[] {
  switch (filter) {
    case "blocks":
      return allBlocks.map((b) => b.name)
    case "components":
      return allComponents.map((c) => c.name)
    case "items":
      return allItems.map((i) => i.name)
    case "all":
      return Object.keys(Index)
  }
}

export function RegistryCommandAnimated({
  filter = "all",
  names,
}: RegistryCommandAnimatedProps = {}) {
  const [packageManager, setPackageManager] = usePackageManager()

  const registryItemNames = useMemo(() => {
    const source = names ?? getNamesByFilter(filter)
    return source.sort((a, b) =>
      a.localeCompare(b, "en", { sensitivity: "base" })
    )
  }, [filter, names])

  const currentItemRef = useRef(registryItemNames[0])

  return (
    <div className="relative overflow-hidden">
      <Tabs
        className="gap-0"
        value={packageManager}
        onValueChange={(value) => {
          setPackageManager(value as PackageManager)
        }}
      >
        <div className="px-4 shadow-[inset_0_-1px_0_0] shadow-line">
          <TabsList className="h-10 rounded-none bg-transparent p-0 inset-ring-0 dark:bg-transparent [&_svg]:size-4 [&_svg]:text-muted-foreground">
            <IconSwap>
              <IconSwapItem className="mr-2" key={packageManager}>
                {getIconForPackageManager(packageManager)}
              </IconSwapItem>
            </IconSwap>

            {Object.entries(pmCommands).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  className="h-7 rounded-lg p-0 px-2 font-mono"
                  value={key}
                >
                  {key}
                </TabsTrigger>
              )
            })}

            <TabsIndicator className="h-0.5 translate-y-0 rounded-none bg-foreground ring-0 dark:bg-foreground" />
          </TabsList>
        </div>

        <pre className="-translate-y-px p-4">
          <code
            data-language="bash"
            className="block font-mono text-sm text-muted-foreground max-sm:leading-6"
          >
            {Object.entries(pmCommands).map(([key, command]) => {
              return (
                <TabsContent
                  key={key}
                  value={key}
                  asChild
                >
                  <span className="block sm:inline-block">
                    {command} shadcn add{" "}
                    <span className="select-none sm:hidden" aria-hidden="true">
                      \
                    </span>
                  </span>
                </TabsContent>
              )
            })}

            <span>{registryConfig.namespace}/</span>

            <TextFlip
              className="text-foreground"
              as={motion.span}
              onIndexChange={(index: number) => {
                currentItemRef.current = registryItemNames[index]
              }}
            >
              {registryItemNames}
            </TextFlip>
          </code>
        </pre>
      </Tabs>

      <CopyButton
        className="absolute top-1.5 right-1.5 z-10 size-7 border-none text-muted-foreground"
        variant="ghost"
        size="icon-sm"
        text={() => {
          const baseCommand = pmCommands[packageManager] || pmCommands["pnpm"]
          return `${baseCommand} shadcn@latest add ${registryConfig.namespace}/${currentItemRef.current}`
        }}
      />
    </div>
  )
}
