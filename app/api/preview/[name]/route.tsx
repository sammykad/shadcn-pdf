import { NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"

import { blockComponents } from "@/lib/block-components"

export const runtime = "nodejs"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const entry = blockComponents[name]

  if (!entry) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 })
  }

  try {
    const mod = await entry.component()
    const Component = mod[entry.componentName]

    if (!Component) {
      return NextResponse.json({ error: "Component not found" }, { status: 404 })
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
      { error: error?.message || "Failed to render PDF" },
      { status: 500 }
    )
  }
}
