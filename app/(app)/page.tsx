import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PdfViewer } from "@/components/pdf-viewer";
import { RegistryCommandAnimated } from "@/components/registry-command-animated";
import { Compare } from "@/components/ui/compare";
import { Button } from "@/components/ui/button";

const workerUrl = "/pdf.worker.min.mjs";
export default async function Home() {

  return (
    <main className="mx-auto max-w-[1100px] px-6 pt-10 pb-20">
      {/* hero */}
      <section className="pt-16 pb-14 text-center">
        <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          PDFs that look like your app.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Shadcn-style components for PDFs, built on @react-pdf/renderer. Copy the
          code, own the document.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="max-w-lg w-full">
            <RegistryCommandAnimated filter="all" />
          </div>
          <Button asChild variant="default" size="sm">
            <Link href="/get-started">
              Get Started
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>


      <div className="mx-auto max-w-2xl p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800">
        <Compare
          firstImage="/before-compare.png"
          secondImage="/after-compare.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[350px] w-full aspect-auto"
          slideMode="hover"
          autoplay={true}
        />
      </div>
      <PdfViewer source="/salary-slip.pdf" workerSrc={workerUrl} />

      {/* Features section for SSR content */}
      <section className="mt-20 grid gap-8 sm:grid-cols-3">
        <div>
          <h2 className="font-semibold text-foreground">Copy-paste components</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Install only what you need with the shadcn CLI. Components include
            PDFDocument, PDFTable, PDFCard, PDFBadge, PDFDivider, PDFSection,
            and PDFText. Each component owns its code in your project.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Tailwind-style tw()</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The tw() utility resolves Tailwind CSS class names to react-pdf
            styles at render time. Supports the full Tailwind v4 color palette,
            theme tokens, opacity, spacing, radius, and typography.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Ready-made blocks</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete multi-page PDF templates: invoices, salary slips, student
            reports, academic reports, progress reports, and audit log reports.
            Each block includes sample data and is ready to customize.
          </p>
        </div>
      </section>

      {/* Links for agents */}
      <section className="mt-16 border-t pt-8 text-sm text-muted-foreground">
        <h2 className="font-semibold text-foreground">For developers and agents</h2>
        <p className="mt-2">
          Documentation:{" "}
          <Link href="/get-started" className="underline underline-offset-4 hover:text-foreground">
            Get Started
          </Link>{" "}
          ·{" "}
          <Link href="/components" className="underline underline-offset-4 hover:text-foreground">
            Components
          </Link>{" "}
          ·{" "}
          <Link href="/blocks" className="underline underline-offset-4 hover:text-foreground">
            Blocks
          </Link>
        </p>
        <p className="mt-1">
          Machine-readable:{" "}
          <a href="/llms.txt" className="underline underline-offset-4 hover:text-foreground">
            llms.txt
          </a>{" "}
          ·{" "}
          <a href="/llms-full.txt" className="underline underline-offset-4 hover:text-foreground">
            llms-full.txt
          </a>{" "}
          ·{" "}
          <a href="/sitemap.xml" className="underline underline-offset-4 hover:text-foreground">
            sitemap.xml
          </a>{" "}
          ·{" "}
          <a href="/.well-known/ard.json" className="underline underline-offset-4 hover:text-foreground">
            ARD catalog
          </a>{" "}
          ·{" "}
          <a href="/.well-known/agent-card.json" className="underline underline-offset-4 hover:text-foreground">
            Agent card
          </a>
        </p>
        <p className="mt-1">
          Install:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            npx shadcn@latest add sammykad/shadcn-pdf/theme sammykad/shadcn-pdf/tw
          </code>
        </p>
      </section>
    </main>
  );
}
