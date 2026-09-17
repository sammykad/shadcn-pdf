import { NextResponse } from "next/server";

export const dynamic = "force-static";

const markdown = `# 404 — Page Not Found

The page you are looking for does not exist.

## Where to go next

- [Home](/) — shadcn-pdf homepage
- [Get Started](/get-started) — Installation and quickstart
- [Components](/components) — PDF component library
- [Blocks](/blocks) — Document templates
- [llms.txt](/llms.txt) — Machine-readable index
- [llms-full.txt](/llms-full.txt) — Full documentation
- [Sitemap](/sitemap.xml) — All pages
- [ARD catalog](/.well-known/ard.json) — Agent resource discovery

## Install

\`\`\`bash
npx shadcn@latest add sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/theme
\`\`\`

## Source

GitHub: [sammykad/shadcn-pdf](https://github.com/sammykad/shadcn-pdf)`;

export function GET() {
  return new NextResponse(markdown, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}

export function POST() {
  return GET();
}
