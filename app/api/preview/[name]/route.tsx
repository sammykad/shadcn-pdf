import { NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"

import { blockComponents } from "@/lib/block-components"

export const runtime = "nodejs"

const errorLinks = {
  home: "/",
  get_started: "/get-started",
  components: "/components",
  blocks: "/blocks",
  llms_txt: "/llms.txt",
  install: "npx shadcn@latest add sammykad/shadcn-pdf/tw sammykad/shadcn-pdf/theme",
  source: "https://github.com/sammykad/shadcn-pdf",
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const entry = blockComponents[name]

  if (!entry) {
    return NextResponse.json(
      {
        error: "not_found",
        message: `Block "${name}" not found. Available blocks: ${Object.keys(blockComponents).join(", ")}`,
        links: errorLinks,
      },
      { status: 404 }
    )
  }

  try {
    const mod = await entry.component()
    const Component = mod[entry.componentName]

    if (!Component) {
      return NextResponse.json(
        {
          error: "internal_error",
          message: `Component "${entry.componentName}" not exported from block "${name}".`,
          links: errorLinks,
        },
        { status: 500 }
      )
    }

    const buffer = await renderToBuffer(<Component data={entry.data} />)

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Encoding": "identity",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error: any) {
    console.error("PDF render error:", error)
    return NextResponse.json(
      {
        error: "render_failed",
        message: error?.message || "Failed to render PDF",
        links: errorLinks,
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  return GET(request, { params })
}
