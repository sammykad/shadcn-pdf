"use client";

import { Download, ExternalLink, FileText, Maximize2, Minimize2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Code as CodeInline } from "@/components/ui/typography";

type PdfPreviewProps = {
  /** URL to the PDF. */
  src: string;
  /** URL to a pre-rendered PNG thumbnail shown as the fast default view. */
  imageSrc?: string;
  name: string;
  title?: string;
  height?: number;
  className?: string;
  /** Show a toolbar with actions. Defaults to true. */
  toolbar?: boolean;
};

export function PdfPreview({
  src,
  imageSrc,
  name,
  title,
  height = 480,
  className,
  toolbar = true,
}: PdfPreviewProps) {
  const hasImage = !!imageSrc;

  return (
    <div className={cn("overflow-hidden", className)}>
      {toolbar && (
        <div className="flex items-center gap-1 border-b border-line bg-muted/40 px-2 py-1.5">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <FileText className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-[11px] text-muted-foreground">
              {name}.pdf
            </span>
          </div>

          <div className="flex shrink-0 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-7 text-muted-foreground"
                  aria-label="Download PDF"
                  asChild
                >
                  <a href={src} download>
                    <Download />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-7 text-muted-foreground"
                  aria-label="Open in new tab"
                  asChild
                >
                  <a href={src} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open in new tab</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      <div
        className="relative overflow-hidden bg-white"
        style={{ height }}
      >
        {hasImage ? (
          <img
            src={imageSrc}
            alt={`${name} preview`}
            className="mx-auto h-full w-full object-contain"
          />
        ) : (
          <iframe
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
            title={title ?? `${name} preview`}
            className="h-full w-full border-0 bg-white"
          />
        )}
      </div>
    </div>
  );
}

export function PdfPreviewFallback({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
      <FileText className="size-5 opacity-60" />
      <p>
        No preview available for <CodeInline>{name}</CodeInline>.
      </p>
    </div>
  );
}