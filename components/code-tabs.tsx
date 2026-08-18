"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CodeTabs({
  className,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs
      defaultValue="cli"
      className={cn("my-4", className)}
      {...props}
    />
  );
}

export function TabsListInstallType() {
  return (
    <TabsList>
      <TabsTrigger value="cli">Command</TabsTrigger>
      <TabsTrigger value="manual">Manual</TabsTrigger>
    </TabsList>
  );
}

export { TabsContent, TabsTrigger };