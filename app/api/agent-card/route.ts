import { NextResponse } from "next/server";

export const dynamic = "force-static";

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
