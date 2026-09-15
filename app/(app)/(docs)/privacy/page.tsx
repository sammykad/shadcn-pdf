import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for shadcn-pdf. shadcn-pdf does not collect personal data.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <div className="prose mt-6 space-y-4 text-muted-foreground">
        <p>
          <strong>Last updated:</strong> September 15, 2026
        </p>

        <h2 className="text-xl font-semibold text-foreground">Data collection</h2>

        <p>
          shadcn-pdf is an open-source software library. It does not collect,
          store, or process any personal data. There is no user account system,
          no analytics tracking, and no cookies beyond what Vercel&apos;s hosting
          platform provides for serving the website.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Third-party services</h2>

        <p>
          The shadcn-pdf website is hosted on Vercel. Vercel&apos;s standard
          infrastructure may collect anonymous request logs (IP addresses, user
          agents, request timestamps) for delivery and security purposes. This
          data is managed by Vercel under their own privacy policy.
        </p>

        <h2 className="text-xl font-semibold text-foreground">AI crawlers</h2>

        <p>
          shadcn-pdf allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, and
          others) to access public documentation. This is opt-in via{" "}
          <code>robots.txt</code> and does not involve sharing any personal
          data, as none is collected.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Contact</h2>

        <p>
          For privacy-related questions, open an issue on{" "}
          <a
            href="https://github.com/sammykad/shadcn-pdf"
            className="text-foreground underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  )
}
