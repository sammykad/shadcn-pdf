import { NextResponse } from "next/server";

export const dynamic = "force-static";

const errorLinks = {
  home: "/",
  get_started: "/get-started",
  components: "/components",
  blocks: "/blocks",
  llms_txt: "/llms.txt",
  install: "npx shadcn@latest add sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/theme",
  source: "https://github.com/sammykad/shadcn-pdf",
};

export function GET() {
  return NextResponse.json(
    {
      name: "shadcn-pdf",
      description:
        "Generate PDF documents in React using shadcn-style components. Provides copy-paste PDF components (table, card, badge, document, section, divider, typography), a Tailwind-style tw() resolver, and pre-built block templates (invoices, salary slips, reports).",
      url: "https://shadcn-pdf.vercel.app",
      version: "1.0.0",
      provider: {
        organization: "shadcn-pdf",
        url: "https://github.com/sammykad/shadcn-pdf",
      },
      documentationUrl: "https://shadcn-pdf.vercel.app/get-started",
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: false,
      },
      skills: [
        {
          name: "generate-pdf",
          description:
            "Generate a PDF document from React components using shadcn-pdf and @react-pdf/renderer",
          id: "generate-pdf",
          tags: ["pdf", "react", "document-generation"],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  );
}

export function POST() {
  return NextResponse.json(
    {
      error: "method_not_allowed",
      message: "Only GET requests are supported for the agent card.",
      allowedMethods: ["GET"],
      links: errorLinks,
    },
    { status: 405 }
  );
}

export function PUT() {
  return POST();
}

export function DELETE() {
  return POST();
}

export function PATCH() {
  return POST();
}
