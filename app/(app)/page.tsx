import { loadRegistry } from "shadcn/registry";
import Link from "next/link";

const PDFS = [
  { file: "/invoice.pdf", label: "Professional Tax Invoice", run: "npm run dev:invoice" },
  { file: "/student-report.pdf", label: "Academic Report Card", run: "npm run dev:report" },
  { file: "/academic-report.pdf", label: "Comprehensive Academic Report", run: "npm run dev:academic" },
  { file: "/indian-report-card.pdf", label: "CBSE Academic Report Card", run: "npm run dev:indian" },
  { file: "/quick-doc.pdf", label: "Quick Doc (primitives demo)", run: "npm run dev:quick" },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  let items: { name: string; title?: string; type?: string; description?: string }[] = [];
  let registryError: string | null = null;
  try {
    const registry = await loadRegistry({
      cwd: process.cwd(),
      registryFile: "registry.json",
    });
    items = registry.items ?? [];
  } catch (error: any) {
    registryError = error?.message ?? "Failed to load registry";
  }

  const components = items.filter((i) => i.type === "registry:component");
  const blocks = items.filter((i) => i.type === "registry:block");

  return (
    <main className="mx-auto max-w-[1100px] px-6 pt-10 pb-20">
      <header className="mb-2 flex items-center justify-between">
        <h1 className="m-0 text-[26px] font-bold tracking-[-0.02em]">
          shadcn-pdf
        </h1>
        <span className="font-mono text-muted-foreground">registry UI</span>
      </header>
      <p className="mb-8 text-muted-foreground">
        Shadcn-style component library for PDFs built on @react-pdf/renderer.
      </p>

     

      {registryError && (
        <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-[13px] text-destructive">
          Registry error: {registryError}
        </div>
      )}

      <h2 className="mt-10 mb-4 text-[13px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        Rendered Documents
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-5">
        {PDFS.map((p) => (
          <div
            key={p.file}
            className="flex flex-col overflow-hidden rounded-xl border bg-card"
          >
            <div className="flex items-center justify-between border-b px-4 py-3.5">
              <strong className="text-[15px]">{p.label}</strong>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                PDF
              </span>
            </div>
            <div className="p-3">
              <iframe
                src={p.file}
                title={p.label}
                className="h-[420px] w-full rounded-lg border bg-muted"
              />
            </div>
            <div className="flex items-center justify-between gap-2 border-t px-4 py-3">
              <code className="truncate rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                {p.run}
              </code>
              <a
                href={p.file}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-background no-underline"
              >
                Open
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 mb-4 text-[13px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        Components ({components.length})
      </h2>
      <RegistryList items={components} />

      <h2 className="mt-10 mb-4 text-[13px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        Blocks ({blocks.length})
      </h2>
      <RegistryList items={blocks} />
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