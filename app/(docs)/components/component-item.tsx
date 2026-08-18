import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function ComponentItem({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col gap-3 p-4 transition-colors hover:bg-accent"
    >
      {children}
    </Link>
  );
}

export function ComponentItemIcon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative flex size-12 items-center justify-center rounded-lg border bg-muted/40",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ComponentItemDot({
  className,
  "aria-label": ariaLabel,
}: {
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <span
      aria-label={ariaLabel}
      className={cn(
        "absolute -top-1 -right-1 size-3 rounded-full border-2 border-background bg-destructive",
        className,
      )}
    />
  );
}

export function ComponentItemTitle({
  as: Tag = "span",
  children,
  className,
}: {
  as?: "h2" | "h3" | "span";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "text-sm font-medium leading-tight group-hover:underline",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function ComponentItemSlug({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <code
      className={cn("font-mono text-[11px] text-muted-foreground", className)}
    >
      {slug}
    </code>
  );
}
