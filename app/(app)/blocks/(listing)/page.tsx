import type { Metadata } from "next"
import type { CollectionPage, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { BlockList } from "@/components/block-list"
import { RegistryCommandAnimated } from "@/components/registry-command-animated"
import type { Block } from "@/features/blocks/data/blocks"

const title = "Blocks"
const description = "Complete, production-ready PDF documents, uniquely crafted."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blocks" },
  openGraph: {
    url: "/blocks",
    type: "website",
    images: {
      url: `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [
      `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    ],
  },
}

function getCollectionPageJsonLd(
  docs: { name: string; slug: string }[]
): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/blocks"),
    name: title,
    description,
    url: absoluteUrl("/blocks"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: docs.length,
      itemListElement: docs.map((doc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blocks/${doc.slug}`),
      })),
    },
    isPartOf: { "@id": JSON_LD_ID.website },
  }
}

export default async function Page() {
  const { Index } = await import("@/registry/__index__")

  const blocks: Block[] = []

  for (const itemName in Index) {
    const item = Index[itemName]
    if (item.type === "registry:block") {
      blocks.push({
        name: item.name,
        title: item.title,
        description: item.description,
        type: item.type,
        categories: item.categories,
        meta: item.meta,
        category: item.categories?.[0],
        icon: item.icon,
      })
    }
  }

  return (
    <>
      <JsonLdScript
        data={getCollectionPageJsonLd(
          blocks.map((b) => ({
            name: b.name,
            slug: `${b.category ?? "blocks"}/${b.name}`,
          }))
        )}
      />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Blocks", href: "/blocks" },
        ])}
      />

      <div className="mx-auto w-full border-x border-line">
        {/* Hero */}
        <section className="screen-line-bottom overflow-x-clip px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              /blocks
            </p>
            <h1 className="mt-3 max-w-2xl text-balance text-4xl font-medium tracking-tight sm:text-5xl">
              Complete PDF documents.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
              {description}
            </p>
          </div>
        </section>

        {/* Install */}
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <RegistryCommandAnimated filter="blocks" />
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <BlockList blocks={blocks} />
        </div>
      </div>
    </>
  )
}
