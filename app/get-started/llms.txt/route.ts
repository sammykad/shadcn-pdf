import { NextResponse } from "next/server";

export const dynamic = "force-static";

const llmsTxt = `# shadcn-pdf Get Started
> Installation guide and quickstart for shadcn-pdf.

## Install
\`\`\`bash
npx shadcn@latest init
npx shadcn@latest add sammykad/shadcn-pdf/theme sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/primitives
\`\`\`

## Your first PDF
\`\`\`tsx
import { PDFDocument, PDFPage, PDFText, PDFContainer } from "@/components/pdf";

export function Greeting() {
  return (
    <PDFDocument>
      <PDFPage className="p-10">
        <PDFContainer className="gap-4">
          <PDFText variant="h1">Hello, world!</PDFText>
          <PDFText variant="body">Built with shadcn-pdf.</PDFText>
        </PDFContainer>
      </PDFPage>
    </PDFDocument>
  );
}
\`\`\`

## Styling with tw()
\`\`\`tsx
<PDFContainer className="flex flex-col gap-4 p-6 bg-muted/10 rounded-lg border">
  <PDFText className="text-2xl font-bold text-primary">Themed heading</PDFText>
</PDFContainer>
\`\`\`

## Links
- Documentation: https://shadcn-pdf.vercel.app/get-started
- Components: https://shadcn-pdf.vercel.app/components
- GitHub: https://github.com/sammykad/shadcn-pdf
`;

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
