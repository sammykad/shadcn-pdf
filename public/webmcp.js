/**
 * WebMCP registration script — runs in <head> before React hydration.
 * Registers tools via document.modelContext.registerTool() with
 * navigator.modelContext as a trailing fallback.
 */
(function () {
  if (typeof document === "undefined") return;

  const COMPONENTS = [
    { name: "table", description: "PDF table with rows, columns, and cell styling" },
    { name: "card", description: "PDF card container with header, content, and footer" },
    { name: "badge", description: "PDF badge for status labels and tags" },
    { name: "section", description: "PDF section wrapper with title and content area" },
    { name: "document", description: "Root PDF document container with page setup" },
    { name: "page", description: "Single PDF page within a document" },
    { name: "text", description: "PDF text paragraph with styling support" },
    { name: "divider", description: "PDF horizontal divider line" },
    { name: "theme", description: "PDF theme configuration for colors and spacing" },
    { name: "tw", description: "Tailwind-style utility for react-pdf styles" },
  ];

  const BLOCKS = [
    { name: "invoice", description: "Multi-page invoice template with line items" },
    { name: "salary-slip", description: "Employee salary slip with deductions" },
    { name: "student-report", description: "Academic student report card" },
    { name: "academic-report", description: "University academic transcript" },
    { name: "progress-report", description: "Project progress report" },
    { name: "audit-log-report", description: "Audit log document" },
  ];

  function waitForCtx(cb: (ctx: any) => void) {
    const ctx =
      (document as any).modelContext ||
      (navigator as any).modelContext;
    if (ctx?.registerTool) return cb(ctx);
    const iv = setInterval(() => {
      const c =
        (document as any).modelContext ||
        (navigator as any).modelContext;
      if (c?.registerTool) {
        clearInterval(iv);
        cb(c);
      }
    }, 100);
    setTimeout(() => clearInterval(iv), 5000);
  }

  waitForCtx((ctx) => {
    ctx.registerTool({
      name: "search_components",
      description:
        "Search available shadcn-pdf components by name or capability.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search term to filter components (e.g. 'table', 'invoice')",
          },
        },
        required: ["query"],
      },
      handler: async (params: { query: string }) => {
        const q = params.query.toLowerCase();
        const comps = COMPONENTS.filter(
          (c) => c.name.includes(q) || c.description.toLowerCase().includes(q)
        );
        const blocks = BLOCKS.filter(
          (b) => b.name.includes(q) || b.description.toLowerCase().includes(q)
        );
        return { components: comps, blocks, total: comps.length + blocks.length };
      },
    });

    ctx.registerTool({
      name: "get_install_command",
      description:
        "Get the shadcn CLI command to install a shadcn-pdf component or block.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Component or block name (e.g. 'table', 'invoice')",
          },
        },
        required: ["name"],
      },
      handler: async (params: { name: string }) => {
        const all = [...COMPONENTS, ...BLOCKS];
        const item = all.find((c) => c.name === params.name);
        if (!item) return { error: `Unknown: ${params.name}`, available: all.map((c) => c.name) };
        const type = BLOCKS.some((b) => b.name === item.name) ? "blocks" : "components";
        return {
          command: `npx shadcn@latest add sammykad/shadcn-pdf/${type}/${item.name}`,
          name: item.name,
          description: item.description,
        };
      },
    });

    ctx.registerTool({
      name: "list_all_components",
      description: "List all available shadcn-pdf components and blocks.",
      parameters: { type: "object", properties: {} },
      handler: async () => ({
        components: COMPONENTS,
        blocks: BLOCKS,
        total: COMPONENTS.length + BLOCKS.length,
      }),
    });

    ctx.registerTool({
      name: "get_component_docs",
      description: "Get documentation URL and usage for a shadcn-pdf component.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Component name (e.g. 'table')" },
        },
        required: ["name"],
      },
      handler: async (params: { name: string }) => {
        const comp = COMPONENTS.find((c) => c.name === params.name);
        if (!comp) return { error: `Unknown: ${params.name}`, available: COMPONENTS.map((c) => c.name) };
        const cap = comp.name.charAt(0).toUpperCase() + comp.name.slice(1);
        return {
          name: comp.name,
          description: comp.description,
          docsUrl: `https://shadcn-pdf.vercel.app/components/${comp.name}`,
          sourceUrl: `https://github.com/sammykad/shadcn-pdf/blob/main/registry/pdf/components/${comp.name}.tsx`,
          installCommand: `npx shadcn@latest add sammykad/shadcn-pdf/components/${comp.name}`,
          usage: `import { PDF${cap} } from "@/registry/pdf/components/${comp.name}"`,
        };
      },
    });
  });

  // Inject tool-attribute forms for server-rendered evidence
  var tools = [
    { name: "search_components", desc: "Search shadcn-pdf components", input: "query" },
    { name: "get_install_command", desc: "Get shadcn CLI install command", input: "name" },
    { name: "list_all_components", desc: "List all shadcn-pdf components", input: null },
    { name: "get_component_docs", desc: "Get component documentation URL", input: "name" },
  ];
  var container = document.createElement("div");
  container.hidden = true;
  container.setAttribute("aria-hidden", "true");
  tools.forEach(function (t) {
    var f = document.createElement("form");
    f.setAttribute("toolname", t.name);
    f.setAttribute("tooldescription", t.desc);
    if (t.input) {
      var i = document.createElement("input");
      i.name = t.input;
      i.type = "text";
      f.appendChild(i);
    }
    container.appendChild(f);
  });
  document.body.appendChild(container);
})();
