import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const VARIANTS = {
  default: "border-l-4 border-foreground bg-muted/40",
  info: "border-l-4 border-sky-500 bg-sky-50",
  warning: "border-l-4 border-amber-500 bg-amber-50",
  error: "border-l-4 border-red-500 bg-red-50",
} as const;

export function Callout({
  type = "default",
  title,
  children,
  className,
}: {
  type?: keyof typeof VARIANTS;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("my-4 rounded-r-md p-4 text-sm", VARIANTS[type], className)}
    >
      {title && <strong className="mb-1 block font-medium">{title}</strong>}
      <div>{children}</div>
    </div>
  );
}