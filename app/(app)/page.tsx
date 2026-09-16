import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PdfViewer } from "@/components/pdf-viewer";
import { RegistryCommandAnimated } from "@/components/registry-command-animated";
import { Compare } from "@/components/ui/compare";
import { Button } from "@/components/ui/button";
import HoroVideoDemo from "@/components/hero-video";
import { FeatureSection } from "@/components/feature-section";

const workerUrl = "/pdf.worker.min.mjs";

export default async function Home() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 pb-24">
      {/* Hero — claim on the left, proof on the right */}
      <section className="grid gap-10 pt-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pt-24">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            PDFs that look like your app.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Shadcn-style components for PDFs, built on @react-pdf/renderer.
            Copy the code, own the document.
          </p>

          <div className="mt-8 max-w-md">
            <RegistryCommandAnimated filter="all" />
          </div>

          <Button asChild variant="default" size="sm" className="mt-5">
            <Link href="/get-started">
              Get Started
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <Compare
            firstImage="/before-compare.png"
            secondImage="/after-compare.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="aspect-[4/5] h-auto w-full sm:aspect-square"
            slideMode="hover"
            autoplay={true}
          />
        </div>
      </section>
      <FeatureSection />

      {/* Beat 1: the render, in motion */}
      <section className="border-t pt-16">
        <h2 className="text-xl font-semibold text-foreground">
          Watch a document render
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Every component is a real react-pdf primitive — no iframe, no
          screenshot.
        </p>
        <div className="mt-8">
          <HoroVideoDemo />
        </div>
      </section>

      {/* Beat 2: the output, inspectable */}
      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">
          A real salary slip, rendered live
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Built from PDFDocument, PDFTable, and PDFSection — the same
          components you'd install.
        </p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
          <PdfViewer source="/salary-slip.pdf" workerSrc={workerUrl} />
        </div>
      </section>


      {/* Links for agents */}
      <section className="mt-20 border-t pt-8 text-sm text-muted-foreground">
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