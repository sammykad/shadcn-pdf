import { NextResponse } from "next/server";

export const dynamic = "force-static";

const llmsTxt = `# shadcn-pdf Blocks
> Pre-built PDF document templates. Complete multi-page layouts with sample data.

## Finance
- **Invoice** — Professional tax invoice with line items, totals, company details
- **Salary Slip** — Employee salary slip with earnings, deductions, net pay

## Education
- **Student Report** — Academic report card with grades and comments
- **Academic Report** — Comprehensive academic report with subject scores
- **Progress Report** — Student progress report with term summary

## Reports
- **Audit Log Report** — Audit trail report with timestamped entries

## Install
\`\`\`bash
npx shadcn@latest add sammykad/shadcn-pdf/<block-name>
\`\`\`

## Links
- Documentation: https://shadcn-pdf.vercel.app/blocks
- GitHub: https://github.com/sammykad/shadcn-pdf
- llms.txt: https://shadcn-pdf.vercel.app/llms.txt
`;

export async function GET() {
  return new NextResponse(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
