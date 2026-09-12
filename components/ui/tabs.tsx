"use client";

import * as React from "react";
import { Tabs as RadixTabs } from "radix-ui";

import { cn } from "@/lib/utils";

const Tabs = RadixTabs.Root;

function TabsIndicator({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tabs-indicator"
      aria-hidden
      className={cn(
        "absolute bottom-0 left-0 -z-1 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) rounded-md bg-white transition-[width,translate] duration-200 ease-in-out dark:bg-muted",
        "inset-ring-1 inset-ring-foreground/10 dark:inset-ring-foreground/6",
        className,
      )}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof RadixTabs.List>) {
  return (
    <RadixTabs.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof RadixTabs.Trigger>) {
  return (
    <RadixTabs.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  keepMounted,
  ...props
}: React.ComponentProps<typeof RadixTabs.Content> & { keepMounted?: boolean }) {
  return (
    <RadixTabs.Content
      data-slot="tabs-content"
      className={cn("mt-2 focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsIndicator, TabsTrigger, TabsContent };