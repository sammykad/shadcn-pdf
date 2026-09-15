import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "About",
  description:
    "shadcn-pdf is an open-source PDF component library for React, built on @react-pdf/renderer following the shadcn/ui registry pattern.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">About shadcn-pdf</h1>

      <div className="prose mt-6 space-y-4 text-muted-foreground">
        <p>
          shadcn-pdf is an open-source component library for generating PDF
          documents in React. It follows the shadcn/ui registry pattern: copy
          paste components into your project, own the code, no black box.
        </p>

        <p>
          Built on <code>@react-pdf/renderer</code>, shadcn-pdf provides
          composable PDF components (tables, cards, badges, sections,
          typography) with a Tailwind-style <code>tw()</code> utility for
          styling. Pre-built block templates cover common document types like
          invoices, salary slips, and academic reports.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Why shadcn-pdf?</h2>

        <p>
          Existing PDF libraries either lock you into a proprietary API or
          require you to learn a new templating language. shadcn-pdf lets you
          build PDFs with the same React components and Tailwind CSS knowledge
          you already have. Install what you need, modify freely, deploy
          without vendor lock-in.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Open source</h2>

        <p>
          shadcn-pdf is MIT licensed. The source code is available on GitHub at{" "}
          <a
            href="https://github.com/sammykad/shadcn-pdf"
            className="text-foreground underline"
          >
            github.com/sammykad/shadcn-pdf
          </a>
          . Contributions, issues, and feature requests are welcome.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Author</h2>

        <p>
          Created by{" "}
          <a
            href="https://github.com/sammykad"
            className="text-foreground underline"
          >
            Sammykad
          </a>
          .
        </p>
      </div>
    </main>
  )
}
