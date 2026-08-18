import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 items-center gap-1 rounded-md border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Kbd }