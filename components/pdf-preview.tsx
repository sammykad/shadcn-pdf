"use client";

import { useState } from "react";
import { ExternalLink, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Code as CodeInline } from "@/components/ui/typography";

export function PdfPreview({
  src,
  name,
  title,
  height = 480,
  className,
  toolbar = true,
}: {
  src: string;
  name: string;
  title?: string;
  height?: number;
  className?: string;
  /** Show a toolbar with a "View PDF" action. Defaults to true. */
  toolbar?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("overflow-hidden", className)}>
      {toolbar && (
        <div className="flex items-center gap-1 border-b border-line bg-muted/40 px-2 py-1.5">
          <span className="flex-1 truncate font-mono text-[11px] text-muted-foreground">
            {name}.pdf
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground"
            asChild
            aria-label={`Open ${name} PDF`}
          >
            <a href={src} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
            </a>
          </Button>
        </div>
      )}

      <div className="relative">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <LoaderCircle className="size-5 animate-spin" />
          </div>
        )}
        <iframe
          src={src}
          title={title ?? `${name} preview`}
          className="mx-auto w-full bg-white"
          style={{ height, border: 0, opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

export function PdfPreviewFallback({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center text-sm text-muted-foreground">
      No preview available for <CodeInline>{name}</CodeInline>.
    </div>
  );
}