import type { LucideIcon } from "lucide-react"
import { registryItemSchema } from "shadcn/schema"
import type { RegistryItem } from "shadcn/schema"

import { blockCategories } from "@/config/block-categories"
import type { Block } from "@/features/blocks/data/blocks"

export { blockCategories }
export type { BlockCategory } from "@/config/block-categories"

type RegistryEntry = RegistryItem & { icon?: LucideIcon }

type DatedBlock = {
    meta?: { createdAt?: string } & Record<string, unknown>
}

export function compareBlocksByCreatedAtDesc(a: DatedBlock, b: DatedBlock) {
    const dateA = a.meta?.createdAt ? new Date(a.meta.createdAt).getTime() : 0
    const dateB = b.meta?.createdAt ? new Date(b.meta.createdAt).getTime() : 0
    return dateB - dateA
}

function readIndex(): RegistryEntry[] {
    const { Index } = require("@/registry/__index__")
    const entries: RegistryEntry[] = []
    for (const itemName in Index) {
        entries.push(Index[itemName])
    }
    return entries
}

function validateBlocks(entries: RegistryEntry[]): RegistryItem[] {
    return entries
        .map((entry) => {
            const result = registryItemSchema.safeParse(entry)
            return result.success ? result.data : null
        })
        .filter((block): block is RegistryItem => block !== null)
}

export async function getAllBlockStaticParams(): Promise<
    Array<{ category: string; name: string }>
> {
    const entries = readIndex()

    const params: Array<{ category: string; name: string }> = []

    for (const category of blockCategories) {
        for (const entry of entries) {
            if (
                entry.type === "registry:block" &&
                entry.categories?.includes(category.name)
            ) {
                params.push({ category: category.name, name: entry.name })
            }
        }
    }

    return params
}

export async function getAllBlockIds(
    types: RegistryItem["type"][] = ["registry:block"],
    categories: string[] = []
): Promise<string[]> {
    const blocks = await getAllBlocks(types, categories)
    return blocks.map((block) => block.name)
}

export async function getAllBlocks(
    types: RegistryItem["type"][] = ["registry:block"],
    categories: string[] = []
) {
    const entries = readIndex()
    const validated = validateBlocks(entries)

    return validated
        .filter(
            (block) =>
                types.includes(block.type) &&
                (categories.length === 0 ||
                    block.categories?.some((category) => categories.includes(category)))
        )
        .sort(compareBlocksByCreatedAtDesc)
}

export function getBlocks(category?: string): Block[] {
    const entries = readIndex()
    const validated = validateBlocks(entries)

    return validated
        .filter(
            (block) =>
                block.type === "registry:block" &&
                (!category || block.categories?.includes(category))
        )
        .map((block) => {
            const entry = entries.find((e) => e.name === block.name)
            return {
                name: block.name,
                title: block.title,
                description: block.description,
                type: block.type,
                categories: block.categories,
                meta: block.meta,
                category: block.categories?.[0],
                icon: entry?.icon,
            }
        })
        .sort(compareBlocksByCreatedAtDesc)
}
