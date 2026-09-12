"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

type LivePdfPreviewProps = {
  name: string
  className?: string
  height?: number
}

export function LivePdfPreview({ name, className, height = 768 }: LivePdfPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const prevUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPdf() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/preview/${name}`, { cache: "no-store" })

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body.error || `HTTP ${res.status}`)
        }

        const blob = await res.blob()

        if (!cancelled) {
          if (prevUrlRef.current) {
            URL.revokeObjectURL(prevUrlRef.current)
          }
          const url = URL.createObjectURL(blob)
          prevUrlRef.current = url
          setPdfUrl(url)
          setLoading(false)
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Failed to load PDF")
          setLoading(false)
        }
      }
    }

    fetchPdf()

    return () => {
      cancelled = true
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current)
      }
    }
  }, [name])

  if (error) {
    return (
      <div className={cn("flex items-center justify-center text-sm text-muted-foreground", className)} style={{ height }}>
        {error}
      </div>
    )
  }

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center text-sm text-muted-foreground", className)} style={{ height }}>
        Rendering PDF...
      </div>
    )
  }

  return (
    <iframe
      src={pdfUrl || undefined}
      className={cn("no-scrollbar w-full bg-background", className)}
      style={{ height }}
    />
  )
}
