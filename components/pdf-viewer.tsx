"use client"

import * as React from "react"
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Maximize,
    StretchHorizontal,
    TriangleAlert,
    ZoomIn,
    ZoomOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type PdfPageHandle = {
    width: number
    height: number
    render: (
        canvas: HTMLCanvasElement,
        scale: number,
        signal?: AbortSignal
    ) => Promise<void>
    /**
     * Optional: overlays real, selectable/copyable text on top of the
     * rendered canvas. Safe to omit from a custom `loader` — the viewer
     * still works, just without text selection.
     */
    renderTextLayer?: (
        container: HTMLElement,
        scale: number,
        signal?: AbortSignal
    ) => Promise<void>
}

export type PdfDocumentHandle = {
    pageCount: number
    getPage: (pageNumber: number) => Promise<PdfPageHandle>
    destroy?: () => void
}

export type PdfLoader = (
    source: string | ArrayBuffer
) => Promise<PdfDocumentHandle>

export type FitMode = "none" | "width" | "page"

export type PdfViewerProps = Omit<
    React.HTMLAttributes<HTMLElement>,
    "children"
> & {
    source?: string | ArrayBuffer
    document?: PdfDocumentHandle
    loader?: PdfLoader
    page?: number
    defaultPage?: number
    onPageChange?: (page: number) => void
    defaultScale?: number
    minScale?: number
    maxScale?: number
    defaultFitMode?: FitMode
    label?: string
    loadingLabel?: React.ReactNode
    workerSrc?: string
    maxHeight?: string | number
    downloadFileName?: string
    showDownload?: boolean
    onLoaded?: () => void
    /** Hide the page-nav/zoom/download toolbar — useful for dense preview
     *  grids where the full chrome is more clutter than it's worth. */
    hideToolbar?: boolean
}

/** Hold the loading state back so a fast result never flashes it. */
const LOADING_DELAY_MS = 120
/** Debounce rapid zoom clicks so we don't queue a render per click. */
const SCALE_COMMIT_DELAY_MS = 120

const MISSING_PDFJS =
    'PdfViewer needs the "pdfjs-dist" package, or a `loader` prop that returns a document handle.'

const TEXT_LAYER_STYLE_ID = "pdf-viewer-text-layer-styles"

/**
 * Injects the CSS the text layer needs, once per page — regardless of how
 * many PdfViewer instances are mounted (e.g. a preview grid rendering many
 * at once). Safe to call repeatedly; it's a no-op after the first call.
 */
function ensureTextLayerStyles() {
    if (typeof document === "undefined") return
    if (document.getElementById(TEXT_LAYER_STYLE_ID)) return

    const style = document.createElement("style")
    style.id = TEXT_LAYER_STYLE_ID
    style.textContent = `
        [data-slot="pdf-viewer-text-layer"] {
            line-height: 1;
            text-size-adjust: none;
            forced-color-adjust: none;
            transform-origin: 0 0;
            z-index: 2;
        }
        [data-slot="pdf-viewer-text-layer"] span,
        [data-slot="pdf-viewer-text-layer"] br {
            color: transparent;
            position: absolute;
            white-space: pre;
            cursor: text;
            transform-origin: 0% 0%;
        }
        [data-slot="pdf-viewer-text-layer"] ::selection {
            background: rgba(37, 99, 235, 0.35);
        }
        [data-slot="pdf-viewer-text-layer"] br::selection {
            background: transparent;
        }
    `
    document.head.appendChild(style)
}

function isCancelledRender(e: unknown): boolean {
    return (
        typeof e === "object" &&
        e !== null &&
        "name" in e &&
        (e as { name?: string }).name === "RenderingCancelledException"
    )
}

async function loadWithPdfjs(
    source: string | ArrayBuffer,
    workerSrc?: string
): Promise<PdfDocumentHandle> {
    let pdfjs: typeof import("pdfjs-dist")

    try {
        pdfjs = await import("pdfjs-dist")
    } catch {
        throw new Error(MISSING_PDFJS)
    }

    // Without a worker, pdf.js hangs silently instead of erroring, so we
    // always set one. An explicit prop wins; otherwise fall back to a CDN
    // build matched to the installed pdfjs-dist version. This avoids
    // bundler-specific asset-import syntax (e.g. Vite's `?url`), which
    // TypeScript can't resolve and webpack/Next.js don't support at all.
    // To self-host instead, pass `workerSrc` — e.g. copy
    // `pdfjs-dist/build/pdf.worker.min.mjs` into your `public/` folder and
    // pass `workerSrc="/pdf.worker.min.mjs"`.
    pdfjs.GlobalWorkerOptions.workerSrc =
        workerSrc ??
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

    const task = pdfjs.getDocument(
        typeof source === "string"
            ? { url: source }
            : { data: new Uint8Array(source) }
    )
    const pdf = await task.promise

    return {
        pageCount: pdf.numPages,
        destroy: () => void task.destroy(),
        async getPage(pageNumber) {
            const page = await pdf.getPage(pageNumber)
            const viewport = page.getViewport({ scale: 1 })

            return {
                width: viewport.width,
                height: viewport.height,
                async render(canvas, scale, signal) {
                    // Render at devicePixelRatio so text/lines stay crisp on
                    // retina/high-DPI screens — without this the canvas is
                    // rasterized at half (or less) the display's real pixel
                    // density and looks soft/blurry no matter the zoom level.
                    const outputScale =
                        typeof window !== "undefined"
                            ? window.devicePixelRatio || 1
                            : 1

                    const scaled = page.getViewport({ scale })
                    const context = canvas.getContext("2d")
                    if (!context) return

                    canvas.width = Math.floor(scaled.width * outputScale)
                    canvas.height = Math.floor(scaled.height * outputScale)
                    canvas.style.width = `${scaled.width}px`
                    canvas.style.height = `${scaled.height}px`

                    const transform =
                        outputScale !== 1
                            ? [outputScale, 0, 0, outputScale, 0, 0]
                            : undefined

                    const renderTask = page.render({
                        canvas,
                        canvasContext: context,
                        viewport: scaled,
                        transform,
                    })

                    const onAbort = () => renderTask.cancel()
                    signal?.addEventListener("abort", onAbort)

                    try {
                        await renderTask.promise
                    } catch (e) {
                        if (isCancelledRender(e)) return
                        throw e
                    } finally {
                        signal?.removeEventListener("abort", onAbort)
                    }
                },
                async renderTextLayer(container, scale, signal) {
                    // Overlays invisible, precisely-positioned <span>s over
                    // the canvas so users can select/copy text. Requires
                    // pdfjs-dist v4+ (exports the `TextLayer` class); older
                    // versions no-op silently rather than throwing.
                    const TextLayerCtor = (
                        pdfjs as unknown as {
                            TextLayer?: new (opts: {
                                textContentSource: ReturnType<
                                    typeof page.streamTextContent
                                >
                                container: HTMLElement
                                viewport: ReturnType<typeof page.getViewport>
                            }) => { render: () => Promise<void>; cancel: () => void }
                        }
                    ).TextLayer

                    if (!TextLayerCtor) return

                    const scaled = page.getViewport({ scale })
                    container.style.width = `${scaled.width}px`
                    container.style.height = `${scaled.height}px`
                    container.replaceChildren()

                    const textLayer = new TextLayerCtor({
                        textContentSource: page.streamTextContent(),
                        container,
                        viewport: scaled,
                    })

                    const onAbort = () => textLayer.cancel()
                    signal?.addEventListener("abort", onAbort)

                    try {
                        await textLayer.render()
                    } catch (e) {
                        if (signal?.aborted) return
                        throw e
                    } finally {
                        signal?.removeEventListener("abort", onAbort)
                    }
                },
            }
        },
    }
}

export function PdfViewer({
    source,
    document: controlledDocument,
    loader,
    page,
    defaultPage = 1,
    onPageChange,
    defaultScale = 1,
    minScale = 0.5,
    maxScale = 3,
    defaultFitMode = "none",
    label = "PDF document",
    loadingLabel = "Opening the document…",
    workerSrc,
    maxHeight = "30rem",
    downloadFileName,
    showDownload = true,
    onLoaded,
    hideToolbar = false,
    className,
    ...rootProps
}: PdfViewerProps) {
    const sectionRef = React.useRef<HTMLElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const textLayerRef = React.useRef<HTMLDivElement>(null)

    const [loaded, setLoaded] = React.useState<PdfDocumentHandle | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(false)
    const [uncontrolledPage, setUncontrolledPage] = React.useState(defaultPage)
    const [pageInput, setPageInput] = React.useState(String(defaultPage))

    const [scale, setScale] = React.useState(defaultScale)
    const [pendingScale, setPendingScale] = React.useState(defaultScale)
    const [fitMode, setFitMode] = React.useState<FitMode>(defaultFitMode)
    const [pageDims, setPageDims] = React.useState<{
        width: number
        height: number
    } | null>(null)
    // CSS-pixel size of the rendered page (unscaled by devicePixelRatio) —
    // used to size the wrapper so the canvas and text layer line up exactly.
    const [renderedSize, setRenderedSize] = React.useState<{
        width: number
        height: number
    } | null>(null)

    React.useEffect(() => {
        ensureTextLayerStyles()
    }, [])

    const current = page ?? uncontrolledPage
    const handle = controlledDocument ?? loaded
    const pageCount = handle?.pageCount ?? 0

    const load = React.useRef(loader)
    React.useEffect(() => {
        load.current = loader
    })

    // --- load document -----------------------------------------------------
    React.useEffect(() => {
        if (controlledDocument || source == null) return

        const controller = new AbortController()
        const spinner = window.setTimeout(() => setLoading(true), LOADING_DELAY_MS)
        let opened: PdfDocumentHandle | null = null

        void (async () => {
            try {
                const open =
                    load.current ??
                    ((input: string | ArrayBuffer) => loadWithPdfjs(input, workerSrc))
                opened = await open(source)
                if (controller.signal.aborted) return
                setLoaded(opened)
                setError(null)
                onLoaded?.()
            } catch (cause) {
                if (controller.signal.aborted) return
                setError(cause instanceof Error ? cause.message : String(cause))
            } finally {
                window.clearTimeout(spinner)
                if (!controller.signal.aborted) setLoading(false)
            }
        })()

        return () => {
            controller.abort()
            window.clearTimeout(spinner)
            opened?.destroy?.()
        }
    }, [source, controlledDocument, workerSrc, onLoaded])

    // --- debounce zoom-button clicks into a single committed scale --------
    React.useEffect(() => {
        const id = window.setTimeout(
            () => setScale(pendingScale),
            SCALE_COMMIT_DELAY_MS
        )
        return () => window.clearTimeout(id)
    }, [pendingScale])

    // --- recompute scale when a fit mode is active -------------------------
    React.useLayoutEffect(() => {
        if (fitMode === "none" || !pageDims || !contentRef.current) return

        const PADDING = 32 // matches the p-4 content padding, ×2
        const el = contentRef.current
        const compute = () => {
            const availW = el.clientWidth - PADDING
            const availH = el.clientHeight - PADDING
            const next =
                fitMode === "width"
                    ? availW / pageDims.width
                    : Math.min(availW / pageDims.width, availH / pageDims.height)
            const clamped = Math.min(Math.max(next, minScale), maxScale)
            setScale(clamped)
            setPendingScale(clamped)
        }

        compute()
        const observer = new ResizeObserver(compute)
        observer.observe(el)
        return () => observer.disconnect()
    }, [fitMode, pageDims, minScale, maxScale])

    // --- render current page, cancelling any in-flight render --------------
    React.useEffect(() => {
        if (!handle || !canvasRef.current) return

        const controller = new AbortController()
        const canvas = canvasRef.current

        void (async () => {
            try {
                const target = await handle.getPage(current)
                if (controller.signal.aborted) return
                setPageDims({ width: target.width, height: target.height })

                await target.render(canvas, scale, controller.signal)
                if (controller.signal.aborted) return

                setRenderedSize({
                    width: target.width * scale,
                    height: target.height * scale,
                })

                if (textLayerRef.current) {
                    await target.renderTextLayer?.(
                        textLayerRef.current,
                        scale,
                        controller.signal
                    )
                }
            } catch (cause) {
                if (controller.signal.aborted) return
                setError(cause instanceof Error ? cause.message : String(cause))
            }
        })()

        return () => controller.abort()
    }, [handle, current, scale])

    React.useEffect(() => {
        setPageInput(String(current))
    }, [current])

    // --- download href (Blob URL for in-memory sources) --------------------
    const [blobUrl, setBlobUrl] = React.useState<string | null>(null)
    React.useEffect(() => {
        if (!(source instanceof ArrayBuffer)) {
            setBlobUrl(null)
            return
        }
        const url = URL.createObjectURL(
            new Blob([source], { type: "application/pdf" })
        )
        setBlobUrl(url)
        return () => URL.revokeObjectURL(url)
    }, [source])

    const downloadHref = typeof source === "string" ? source : blobUrl ?? undefined

    // --- navigation helpers --------------------------------------------------
    const goTo = React.useCallback(
        (next: number) => {
            const clamped = Math.min(Math.max(next, 1), Math.max(pageCount, 1))
            if (page === undefined) setUncontrolledPage(clamped)
            onPageChange?.(clamped)
        },
        [page, pageCount, onPageChange]
    )

    const zoomBy = (delta: number) => {
        setFitMode("none")
        setPendingScale((value) =>
            Math.min(Math.max(value + delta, minScale), maxScale)
        )
    }

    const toggleFit = (mode: FitMode) => {
        setFitMode((current) => (current === mode ? "none" : mode))
    }

    const commitPageInput = () => {
        const parsed = Number(pageInput)
        if (Number.isFinite(parsed)) goTo(Math.trunc(parsed))
        else setPageInput(String(current))
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        const target = e.target as HTMLElement
        if (target.tagName === "INPUT") return // let the page-input handle its own keys

        if (e.key === "ArrowLeft") goTo(current - 1)
        else if (e.key === "ArrowRight") goTo(current + 1)
        else if (e.key === "+" || e.key === "=") zoomBy(0.25)
        else if (e.key === "-") zoomBy(-0.25)
        else return
        e.preventDefault()
    }

    if (error) {
        return (
            <section
                data-slot="pdf-viewer"
                data-state="error"
                className={cn(
                    "border-border bg-card text-destructive flex items-center gap-2 rounded-[var(--radius)] border px-4 py-3 text-sm",
                    className
                )}
                {...rootProps}
            >
                <TriangleAlert aria-hidden="true" size={15} className="shrink-0" />
                <p role="alert">{error}</p>
            </section>
        )
    }

    return (
        <section
            ref={sectionRef}
            data-slot="pdf-viewer"
            data-state={loading ? "loading" : "ready"}
            aria-label={label}
            aria-busy={loading || undefined}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className={cn(
                "border-border bg-card text-card-foreground overflow-hidden rounded-[var(--radius)] border focus-visible:outline-none",
                className
            )}
            {...rootProps}
        >
            {!hideToolbar && (
                <div
                    data-slot="pdf-viewer-toolbar"
                    className="border-border flex flex-wrap items-center gap-2 border-b px-3 py-2"
                >
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            aria-label="Previous page"
                            disabled={current <= 1}
                            className="hover:bg-muted focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-40 motion-reduce:transition-none"
                            onClick={() => goTo(current - 1)}
                        >
                            <ChevronLeft aria-hidden="true" size={15} />
                        </button>

                        <div
                            aria-live="polite"
                            className="flex items-center gap-1 font-[family-name:var(--font-mono),monospace] text-xs tabular-nums"
                        >
                            <input
                                value={pageInput}
                                onChange={(e) => setPageInput(e.target.value)}
                                onBlur={commitPageInput}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        commitPageInput()
                                        e.currentTarget.blur()
                                    }
                                }}
                                inputMode="numeric"
                                aria-label="Page number"
                                className="border-border bg-background focus-visible:ring-ring w-9 rounded border px-1 py-0.5 text-center outline-none focus-visible:ring-2"
                            />
                            <span className="text-muted-foreground">
                                / {pageCount > 0 ? pageCount : "—"}
                            </span>
                        </div>

                        <button
                            type="button"
                            aria-label="Next page"
                            disabled={pageCount === 0 || current >= pageCount}
                            className="hover:bg-muted focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-40 motion-reduce:transition-none"
                            onClick={() => goTo(current + 1)}
                        >
                            <ChevronRight aria-hidden="true" size={15} />
                        </button>
                    </div>

                    <div className="ml-auto flex items-center gap-1">
                        <button
                            type="button"
                            aria-label="Fit to width"
                            aria-pressed={fitMode === "width"}
                            className={cn(
                                "hover:bg-muted focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none",
                                fitMode === "width" && "bg-muted"
                            )}
                            onClick={() => toggleFit("width")}
                        >
                            <StretchHorizontal aria-hidden="true" size={15} />
                        </button>

                        <button
                            type="button"
                            aria-label="Fit to page"
                            aria-pressed={fitMode === "page"}
                            className={cn(
                                "hover:bg-muted focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none",
                                fitMode === "page" && "bg-muted"
                            )}
                            onClick={() => toggleFit("page")}
                        >
                            <Maximize aria-hidden="true" size={15} />
                        </button>

                        <button
                            type="button"
                            aria-label="Zoom out"
                            disabled={pendingScale <= minScale}
                            className="hover:bg-muted focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-40 motion-reduce:transition-none"
                            onClick={() => zoomBy(-0.25)}
                        >
                            <ZoomOut aria-hidden="true" size={15} />
                        </button>

                        <p className="text-muted-foreground w-12 text-center font-[family-name:var(--font-mono),monospace] text-xs tabular-nums">
                            {Math.round(pendingScale * 100)}%
                        </p>

                        <button
                            type="button"
                            aria-label="Zoom in"
                            disabled={pendingScale >= maxScale}
                            className="hover:bg-muted focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-40 motion-reduce:transition-none"
                            onClick={() => zoomBy(0.25)}
                        >
                            <ZoomIn aria-hidden="true" size={15} />
                        </button>

                        {showDownload && downloadHref ? (
                            <a
                                href={downloadHref}
                                download={downloadFileName ?? true}
                                aria-label="Download PDF"
                                className="hover:bg-muted focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none"
                            >
                                <Download aria-hidden="true" size={15} />
                            </a>
                        ) : null}
                    </div>
                </div>
            )}

            <div
                ref={contentRef}
                className="bg-muted overflow-auto p-4"
                style={{ maxHeight }}
            >
                {loading && !handle ? (
                    <div
                        aria-hidden="true"
                        className="bg-muted-foreground/10 mx-auto animate-pulse rounded"
                        style={{
                            width: pageDims?.width ?? 400,
                            height: pageDims?.height ?? 560,
                        }}
                    />
                ) : null}
                {loading && !handle ? (
                    <p className="text-muted-foreground py-2 text-center text-sm">
                        {loadingLabel}
                    </p>
                ) : null}

                <div
                    className={cn(
                        "relative mx-auto shadow-sm",
                        loading && !handle && "hidden"
                    )}
                    style={
                        renderedSize
                            ? { width: renderedSize.width, height: renderedSize.height }
                            : undefined
                    }
                >
                    <canvas
                        ref={canvasRef}
                        data-slot="pdf-viewer-canvas"
                        role="img"
                        aria-label={`${label}, page ${current}`}
                        className="block max-w-full"
                    />
                    <div
                        ref={textLayerRef}
                        data-slot="pdf-viewer-text-layer"
                        className="absolute inset-0 overflow-hidden"
                    />
                </div>
            </div>
        </section>
    )
}