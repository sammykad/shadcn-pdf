import { NextResponse } from "next/server";

export const runtime = "nodejs";

const COMPONENTS = [
  {
    name: "document",
    displayName: "PDFDocument / PDFPage",
    description: "Root document wrapper with page sizing, headers, and footers.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/document",
    tags: ["layout", "document", "page"],
  },
  {
    name: "table",
    displayName: "PDFTable",
    description: "Flex-based table with header, body, row, cell, and footer primitives.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/table",
    tags: ["table", "data", "grid"],
  },
  {
    name: "card",
    displayName: "PDFCard",
    description: "Bordered container for grouping content in PDFs.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/card",
    tags: ["container", "card", "group"],
  },
  {
    name: "badge",
    displayName: "PDFBadge",
    description: "Compact pill-shaped labels with semantic color variants (default, secondary, success, destructive, outline, ghost, link).",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/badge",
    tags: ["badge", "label", "status"],
  },
  {
    name: "divider",
    displayName: "PDFDivider",
    description: "Horizontal rule for visual separation.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/divider",
    tags: ["divider", "separator", "hr"],
  },
  {
    name: "section",
    displayName: "PDFSection / PDFField",
    description: "Labeled field pairs and section groupings.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/section",
    tags: ["section", "field", "label", "group"],
  },
  {
    name: "primitives",
    displayName: "PDFText / PDFContainer",
    description: "Text primitives with variant presets (h1, h2, body, small) and flex layout wrapper with Tailwind classes.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/primitives",
    tags: ["text", "typography", "container", "layout"],
  },
  {
    name: "layout",
    displayName: "PDF Layout",
    description: "Layout primitives for multi-page documents.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/layout",
    tags: ["layout", "page", "multi-page"],
  },
];

const BLOCKS = [
  {
    name: "invoice",
    displayName: "Invoice",
    description: "Professional tax invoice with line items, totals, and company details.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/invoice",
    category: "finance",
  },
  {
    name: "salary-slip",
    displayName: "Salary Slip",
    description: "Employee salary slip with earnings, deductions, and net pay.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/salary-slip",
    category: "finance",
  },
  {
    name: "student-report",
    displayName: "Student Report",
    description: "Academic report card with grades and comments.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/student-report",
    category: "education",
  },
  {
    name: "academic-report",
    displayName: "Academic Report",
    description: "Comprehensive academic report with subject scores.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/academic-report",
    category: "education",
  },
  {
    name: "progress-report",
    displayName: "Progress Report",
    description: "Student progress report with term summary.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/progress-report",
    category: "education",
  },
  {
    name: "audit-log-report",
    displayName: "Audit Log Report",
    description: "Audit trail report with timestamped entries.",
    install: "npx shadcn@latest add sammykad/shadcn-pdf/audit-log-report",
    category: "reports",
  },
];

const TOOL_DEFINITIONS = [
  {
    name: "search_components",
    description:
      "Search shadcn-pdf components and blocks by keyword. Returns matching items with descriptions and install commands.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description:
            "Search query (e.g. 'table', 'badge', 'invoice', 'report')",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_install_command",
    description:
      "Get the npm install command for a specific shadcn-pdf component or block.",
    inputSchema: {
      type: "object" as const,
      properties: {
        component: {
          type: "string",
          description:
            "Component or block name (e.g. 'table', 'invoice'). Use list_all_components to see available names.",
        },
      },
      required: ["component"],
    },
  },
  {
    name: "list_all_components",
    description:
      "List all available shadcn-pdf components and blocks with their descriptions.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "get_component_docs",
    description:
      "Get detailed documentation for a specific shadcn-pdf component or block, including usage examples and props.",
    inputSchema: {
      type: "object" as const,
      properties: {
        component: {
          type: "string",
          description:
            "Component or block name (e.g. 'table', 'invoice').",
        },
      },
      required: ["component"],
    },
  },
];

function searchComponents(query: string) {
  const q = query.toLowerCase();
  const all = [...COMPONENTS, ...BLOCKS];
  return all.filter(
    (item) =>
      item.name.includes(q) ||
      item.displayName.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      ("tags" in item && item.tags?.some((t: string) => t.includes(q))) ||
      ("category" in item && item.category?.includes(q))
  );
}

function getComponent(name: string) {
  return (
    COMPONENTS.find((c) => c.name === name) ||
    BLOCKS.find((b) => b.name === name)
  );
}

function getComponentDocs(name: string) {
  const item = getComponent(name);
  if (!item) return null;

  const isBlock = "category" in item;
  const type = isBlock ? "Block" : "Component";

  const docs: Record<string, string> = {
    document: `# PDFDocument / PDFPage

Root document wrapper with page sizing, headers, and footers.

## Usage
\`\`\`tsx
import { PDFDocument, PDFPage } from "@/components/pdf";

<PDFDocument>
  <PDFPage className="p-10">
    {/* Your content here */}
  </PDFPage>
</PDFDocument>
\`\`\`

## Props
- \`className\` — Tailwind classes for page styling
- Page size, margins, and orientation configured via theme`,

    table: `# PDFTable

Flex-based table with header, body, row, cell, and footer primitives.

## Usage
\`\`\`tsx
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableCell } from "@/components/pdf";

<PDFTable>
  <PDFTableHeader>
    <PDFTableRow>
      <PDFTableCell>Name</PDFTableCell>
      <PDFTableCell>Amount</PDFTableCell>
    </PDFTableRow>
  </PDFTableHeader>
  <PDFTableBody>
    <PDFTableRow>
      <PDFTableCell>Item 1</PDFTableCell>
      <PDFTableCell>$100</PDFTableCell>
    </PDFTableRow>
  </PDFTableBody>
</PDFTable>
\`\`\``,

    card: `# PDFCard

Bordered container for grouping content.

## Usage
\`\`\`tsx
import { PDFCard } from "@/components/pdf";

<PDFCard className="p-4">
  {/* Content */}
</PDFCard>
\`\`\``,

    badge: `# PDFBadge

Pill-shaped labels with semantic color variants.

## Variants
\`default\`, \`secondary\`, \`success\`, \`destructive\`, \`outline\`, \`ghost\`, \`link\`

## Usage
\`\`\`tsx
import { PDFBadge } from "@/components/pdf";

<PDFBadge variant="success">Paid</PDFBadge>
<PDFBadge variant="destructive">Overdue</PDFBadge>
\`\`\``,

    divider: `# PDFDivider

1px horizontal rule for visual separation.

## Usage
\`\`\`tsx
import { PDFDivider } from "@/components/pdf";

<PDFDivider />
\`\`\``,

    section: `# PDFSection / PDFField

Labeled field pairs and section groupings.

## Usage
\`\`\`tsx
import { PDFSection, PDFField } from "@/components/pdf";

<PDFSection title="Invoice Details">
  <PDFField label="Invoice Number" value="INV-001" />
  <PDFField label="Date" value="2024-01-15" />
</PDFSection>
\`\`\``,

    primitives: `# PDFText / PDFContainer

Text primitives with variant presets and flex layout wrapper.

## PDFText Usage
\`\`\`tsx
import { PDFText } from "@/components/pdf";

<PDFText variant="h1">Heading</PDFText>
<PDFText variant="body">Body text</PDFText>
<PDFText variant="small">Small text</PDFText>
\`\`\`

## PDFContainer Usage
\`\`\`tsx
import { PDFContainer } from "@/components/pdf";

<PDFContainer className="flex flex-col gap-4 p-6">
  {/* Content */}
</PDFContainer>
\`\`\``,

    layout: `# PDF Layout

Layout primitives for multi-page documents.

## Usage
\`\`\`tsx
import { PDFDocument, PDFPage } from "@/components/pdf";

<PDFDocument>
  <PDFPage className="p-10">
    <PDFContainer className="gap-4">
      <PDFText variant="h1">Page 1</PDFText>
    </PDFContainer>
  </PDFPage>
  <PDFPage className="p-10">
    <PDFContainer className="gap-4">
      <PDFText variant="h1">Page 2</PDFText>
    </PDFContainer>
  </PDFPage>
</PDFDocument>
\`\`\``,
  };

  if (isBlock) {
    return `# ${item.displayName}

${item.description}

Category: ${item.category}

## Install
\`\`\`bash
${item.install}
\`\`\`

## Usage
\`\`\`tsx
import { ${item.displayName.replace(/\s+/g, "")} } from "@/components/pdf/blocks/${item.name}";

<${item.displayName.replace(/\s+/g, "")} data={sampleData} />
\`\`\`

## Preview
View the rendered PDF: https://shadcn-pdf.vercel.app/preview/${item.name}`;
  }

  return docs[name] || `# ${item.displayName}\n\n${item.description}\n\n## Install\n\`\`\`bash\n${item.install}\n\`\`\``;
}

function handleJsonRpc(body: unknown) {
  const msg = body as {
    jsonrpc: string;
    id?: number | string;
    method: string;
    params?: Record<string, unknown>;
  };

  if (msg.jsonrpc !== "2.0") {
    return {
      jsonrpc: "2.0",
      id: msg.id ?? null,
      error: { code: -32600, message: "Invalid Request" },
    };
  }

  switch (msg.method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        id: msg.id ?? null,
        result: {
          protocolVersion: "2025-03-26",
          capabilities: { tools: {} },
          serverInfo: {
            name: "shadcn-pdf",
            version: "0.1.0",
          },
        },
      };

    case "notifications/initialized":
      return null;

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id: msg.id ?? null,
        result: { tools: TOOL_DEFINITIONS },
      };

    case "tools/call": {
      const params = msg.params as {
        name: string;
        arguments?: Record<string, unknown>;
      };
      const args = params.arguments || {};

      switch (params.name) {
        case "search_components": {
          const results = searchComponents(args.query as string);
          return {
            jsonrpc: "2.0",
            id: msg.id ?? null,
            result: {
              content: [
                {
                  type: "text",
                  text:
                    results.length > 0
                      ? results
                          .map(
                            (r) =>
                              `- **${r.displayName}** (${r.name}): ${r.description}\n  Install: \`${r.install}\``
                          )
                          .join("\n")
                      : `No components found matching "${args.query}". Try: table, card, badge, document, invoice, report.`,
                },
              ],
            },
          };
        }

        case "get_install_command": {
          const item = getComponent(args.component as string);
          if (!item) {
            return {
              jsonrpc: "2.0",
              id: msg.id ?? null,
              result: {
                content: [
                  {
                    type: "text",
                    text: `Component "${args.component}" not found. Use list_all_components to see available options.`,
                  },
                ],
                isError: true,
              },
            };
          }
          return {
            jsonrpc: "2.0",
            id: msg.id ?? null,
            result: {
              content: [
                {
                  type: "text",
                  text: `Install ${item.displayName}:\n\n\`\`\`bash\n${item.install}\n\`\`\``,
                },
              ],
            },
          };
        }

        case "list_all_components": {
          const lines = [
            "## Components",
            ...COMPONENTS.map(
              (c) => `- **${c.displayName}**: ${c.description}`
            ),
            "",
            "## Blocks (Templates)",
            ...BLOCKS.map(
              (b) =>
                `- **${b.displayName}** (${b.category}): ${b.description}`
            ),
          ];
          return {
            jsonrpc: "2.0",
            id: msg.id ?? null,
            result: {
              content: [{ type: "text", text: lines.join("\n") }],
            },
          };
        }

        case "get_component_docs": {
          const docs = getComponentDocs(args.component as string);
          if (!docs) {
            return {
              jsonrpc: "2.0",
              id: msg.id ?? null,
              result: {
                content: [
                  {
                    type: "text",
                    text: `Component "${args.component}" not found. Use list_all_components to see available options.`,
                  },
                ],
                isError: true,
              },
            };
          }
          return {
            jsonrpc: "2.0",
            id: msg.id ?? null,
            result: { content: [{ type: "text", text: docs }] },
          };
        }

        default:
          return {
            jsonrpc: "2.0",
            id: msg.id ?? null,
            error: {
              code: -32601,
              message: `Unknown tool: ${params.name}`,
            },
          };
      }
    }

    default:
      return {
        jsonrpc: "2.0",
        id: msg.id ?? null,
        error: {
          code: -32601,
          message: `Method not found: ${msg.method}`,
        },
      };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = handleJsonRpc(body);

    if (result === null) {
      return new NextResponse(null, { status: 202 });
    }

    return NextResponse.json(result, {
      headers: {
        "Content-Type": "application/json",
        "Mcp-Session-Id": crypto.randomUUID(),
      },
    });
  } catch {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" },
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    name: "shadcn-pdf",
    description: "PDF component library for React",
    version: "0.1.0",
    protocol: "mcp",
    transport: "streamable-http",
    endpoint: "/api/mcp",
  });
}
