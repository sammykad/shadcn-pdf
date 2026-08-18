import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Grip, LayoutDashboard } from "lucide-react";
import type { CollectionPage, WithContext } from "schema-dts";

import { JSON_LD_ID } from "@/config/json-ld";
import { registryConfig } from "@/config/registry";
import { UTM_PARAMS, X_HANDLE } from "@/config/site";
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld";
import { absoluteUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyButton } from "@/components/copy-button";
import { getComponentDocs } from "@/features/doc/data/documents";
import type { Doc } from "@/features/doc/types/document";

import {
  ComponentItem,
  ComponentItemDot,
  ComponentItemIcon,
  ComponentItemSlug,
  ComponentItemTitle,
} from "./component-item";

const title = "Components";
const description = "Pixel-perfect PDF components, uniquely crafted.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/components" },
  openGraph: {
    url: "/components",
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
};

function getCollectionPageJsonLd(
  docs: { name: string; slug: string }[],
): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/components"),
    name: title,
    description,
    url: absoluteUrl("/components"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: docs.length,
      itemListElement: docs.map((doc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/components/${doc.slug}`),
      })),
    },
    isPartOf: { "@id": JSON_LD_ID.website },
  };
}

export default function Page() {
  const allComponents = getComponentDocs().sort((a, b) =>
    a.metadata.title.localeCompare(b.metadata.title, "en", {
      sensitivity: "base",
    }),
  );

  const newComponents = allComponents.filter((c) => c.metadata.new);

  return (
    <>
      <JsonLdScript
        data={getCollectionPageJsonLd(
          allComponents.map((doc) => ({
            name: doc.metadata.title,
            slug: doc.slug,
          })),
        )}
      />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Components", href: "/components" },
        ])}
      />

      <div className="mx-auto w-full border-x border-line">
        {/* Hero */}
        <section className="screen-line-bottom overflow-x-clip px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              /components
            </p>
            <h1 className="mt-3 max-w-2xl text-balance text-4xl font-medium tracking-tight sm:text-5xl">
              Pixel-perfect PDF components.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
              {description}
            </p>
          </div>
        </section>

        {/* Install */}
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="flex items-center gap-3 overflow-x-auto rounded-lg border border-line bg-muted/30 p-1.5 font-mono text-sm">
            <span className="shrink-0 pl-2 text-muted-foreground select-none">
              $
            </span>
            <code className="min-w-0 flex-1 truncate">
              npx shadcn@latest add {registryConfig.url}
            </code>
            <CopyButton
              size="icon-sm"
              variant="ghost"
              text={`npx shadcn@latest add ${registryConfig.url}`}
              className="shrink-0"
            />
          </div>
        </section>

        {/* New */}
        {newComponents.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 pb-2 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-destructive" />
              <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                New
              </h2>
            </div>
            <div className="mt-4">
              <ComponentList items={newComponents} showNew={false} />
            </div>
            <div className="my-8 h-px bg-line" />
          </section>
        )}

        {/* All */}
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <div className="flex items-center gap-1.5 pb-3">
            <h2 className="flex-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {allComponents.length} components
            </h2>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="size-7"
                  variant="outline"
                  size="icon-sm"
                  aria-label="List"
                >
                  <Grip />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>List</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  className="size-7 border-none text-muted-foreground"
                  variant="ghost"
                  size="icon-sm"
                >
                  <Link href="/components/showcase" aria-label="Showcase">
                    <LayoutDashboard />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Showcase</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="mb-2 h-px bg-line" />

          <ComponentList items={allComponents} />
        </section>
      </div>
    </>
  );
}

function ComponentList({
  items,
  showNew = true,
}: {
  items: Doc[];
  showNew?: boolean;
}) {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 md:grid-cols-3">
      {items.map((c) => (
        <li
          key={c.slug}
          className="bg-background transition-colors hover:bg-background"
        >
          <ComponentItem href={`/components/${c.slug}`}>
            <ComponentItemIcon>
              <span className="font-mono capitalize text-sm text-foreground/80 transition-transform duration-200 group-hover:scale-110">
                {c.slug[0]}
              </span>
              {showNew && (c.metadata.new || c.metadata.updated) && (
                <ComponentItemDot
                  aria-label={c.metadata.new ? "New" : "Updated"}
                />
              )}
            </ComponentItemIcon>
            <div className="mt-auto flex flex-col gap-1">
              <ComponentItemTitle as="h3">
                {c.metadata.title}
                <ArrowRight className="ml-1.5 inline size-3 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </ComponentItemTitle>
              <ComponentItemSlug slug={c.slug} />
            </div>
          </ComponentItem>
        </li>
      ))}
    </ul>
  );
}
