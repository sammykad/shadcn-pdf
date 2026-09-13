import Link from "next/link";
import { PdfViewer } from "@/components/pdf-viewer";
import registry from "../../registry.json";
import { RegistryCommandAnimated } from "@/components/registry-command-animated";

const workerUrl = "/pdf.worker.min.mjs";

const PDFS = [
  { file: "/invoice.pdf", label: "Professional Tax Invoice", run: "npm run dev:invoice" },
  { file: "/salary-slip.pdf", label: "Employee Salary Slip", run: "npm run dev:salary" },
  { file: "/student-report.pdf", label: "Academic Report Card", run: "npm run dev:report" },
  { file: "/academic-report.pdf", label: "Comprehensive Academic Report", run: "npm run dev:academic" },
  { file: "/indian-report-card.pdf", label: "CBSE Academic Report Card", run: "npm run dev:indian" },
  { file: "/quick-doc.pdf", label: "Quick Doc (primitives demo)", run: "npm run dev:quick" },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  let items: { name: string; title?: string; type?: string; description?: string }[] = [];
  items = registry.items ?? [];

  const components = items.filter((i) => i.type === "registry:component");
  const blocks = items.filter((i) => i.type === "registry:block");

  return (
    <main className="mx-auto max-w-[1100px] px-6 pt-10 pb-20">

      <RegistryCommandAnimated filter="all" />
      <header className="mb-2 flex items-center justify-between">
        <h1 className="m-0 text-[26px] font-bold tracking-[-0.02em]">
          shadcn-pdf
        </h1>
        <span className="font-mono text-muted-foreground">registry UI</span>
      </header>
      <p className="mb-8 text-muted-foreground">
        Shadcn-style component library for PDFs built on @react-pdf/renderer.
      </p>
      <PdfViewer source="/salary-slip.pdf" workerSrc={workerUrl} />




    </main>
  );
}

function RegistryList({
  items,
}: {
  items: { name: string; title?: string; description?: string }[];
}) {
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5 p-0">
      {items.map((i) => (
        <li
          key={i.name}
          className="rounded-[10px] border bg-card px-3.5 py-3"
        >
          <Link
            href={`/r/${i.name}.json`}
            target="_blank"
            className="text-base font-semibold text-foreground no-underline"
          >
            {i.title || i.name}
          </Link>
          <code className="mt-1.5 block rounded-md bg-muted px-2 py-1.5 text-[11px] text-muted-foreground">
            npx shadcn@latest add sammykad/shadcn-pdf/{i.name}
          </code>
          {i.description && (
            <p className="mt-2 text-sm leading-[1.4] text-muted-foreground">
              {i.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}