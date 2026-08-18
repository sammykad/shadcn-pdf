"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn(
        "group/collapsible not-prose relative my-5",
        className
      )}
      {...props}
    >
      <div className="overflow-hidden data-closed:max-h-80">
        {children}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 items-end justify-center data-open:hidden">
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent backdrop-blur-[1px]" />

        <CollapsibleTrigger asChild className="pointer-events-auto">
          <Button variant="outline" size="sm">
            Expand
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
}