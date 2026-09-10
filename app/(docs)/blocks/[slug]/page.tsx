import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { registryConfig } from "@/config/registry";
import { X_HANDLE } from "@/config/site";
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld";
import { blocks } from "@/lib/block-preview";
import { formatCode } from "@/lib/format-code";
import { highlightCode } from "@/lib/highlight-code";
import { CopyButton } from "@/components/copy-button";
import { PdfPreview } from "@/components/pdf-preview";

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(blocks).map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const block = blocks[name];
  if (!block) return {};
  return {
    title: `${block.title} — Blocks`,
    description: `Complete, production-ready ${block.title.toLowerCase()} PDF document.`,
    alternates: { canonical: `/blocks/${name}` },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      images: [block.imagePath],
    },
  };
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const block = blocks[name];

  if (!block) {
    return notFound();
  }

  const source = await block
    .source()
    .then((src) => formatCode(src))
    .then((src) => highlightCode(src));

  const installCommand = `npx shadcn@latest add ${registryConfig.url} ${name}`;

  return (
    <div className="mx-auto w-full border-x border-line">
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Blocks", href: "/blocks" },
          { name: block.title, href: `/blocks/${name}` },
        ])}
      />

      {/* Top bar */}
      <section className="screen-line-bottom overflow-x-clip px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/blocks"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Blocks
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="screen-line-bottom overflow-x-clip px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            /blocks/{name}
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-medium tracking-tight sm:text-5xl">
            {block.title}
          </h1>

          <div className="mt-6 flex items-center gap-3 overflow-x-auto rounded-lg border border-line bg-muted/30 p-1.5 font-mono text-sm">
            <span className="shrink-0 pl-2 text-muted-foreground select-none">$</span>
            <code className="min-w-0 flex-1 truncate">{installCommand}</code>
            <CopyButton
              size="icon-sm"
              variant="ghost"
              text={installCommand}
              className="shrink-0"
            />
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-line bg-surface inset-ring-1 inset-ring-border/64">
          <PdfPreview
            src={block.imagePath.replace(".png", ".pdf")}
            name={name}
          />
        </div>
      </section>

      {/* Source */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="flex items-center gap-1.5 pb-3">
          <h2 className="flex-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Source
          </h2>
        </div>
        <div className="mb-2 h-px bg-line" />
        <div className="overflow-hidden rounded-xl border border-line bg-code">
          <pre
            className="no-scrollbar overflow-x-auto overscroll-x-contain py-4 outline-none"
            dangerouslySetInnerHTML={{ __html: source }}
          />
        </div>
      </section>
    </div>
  );
}