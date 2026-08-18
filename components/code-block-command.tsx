"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

import type { NpmCommands } from "@/types/unist";
import type { PackageManager } from "@/hooks/use-package-manager";
import { usePackageManager } from "@/hooks/use-package-manager";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { IconSwap, IconSwapItem } from "@/components/icon-swap";

import { CopyButton } from "@/components/copy-button";
import { getIconForPackageManager } from "@/components/icons";

export function CodeBlockCommand({
  __pnpm__,
  __yarn__,
  __npm__,
  __bun__,
}: NpmCommands) {
  const [packageManager, setPackageManager] = usePackageManager();
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  const tabs = useMemo(() => {
    return {
      pnpm: __pnpm__,
      yarn: __yarn__,
      npm: __npm__,
      bun: __bun__,
    };
  }, [__pnpm__, __yarn__, __npm__, __bun__]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const active = list.querySelector<HTMLElement>(
      `[data-slot="tabs-trigger"][data-state="active"]`,
    );
    if (active) {
      setIndicator({
        width: active.offsetWidth,
        left: active.offsetLeft,
      });
    }
  }, [packageManager]);

  return (
    <div data-slot="code-block-command" className="relative">
      <Tabs
        className="gap-0"
        value={packageManager}
        onValueChange={(value) => {
          setPackageManager(value as PackageManager);
        }}
      >
        <div className="px-3">
          <TabsList
            ref={listRef}
            className="relative h-10 rounded-none bg-transparent p-0 inset-ring-0 dark:bg-transparent [&_svg]:size-4 [&_svg]:text-muted-foreground"
          >
            <IconSwap>
              <IconSwapItem className="mr-2" key={packageManager}>
                {getIconForPackageManager(packageManager)}
              </IconSwapItem>
            </IconSwap>

            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  className="h-7 rounded-lg p-0 px-2 font-mono data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground"
                  value={key}
                >
                  {key}
                </TabsTrigger>
              );
            })}

            <span
              aria-hidden
              data-slot="tabs-indicator"
              className="absolute bottom-0 left-0 h-0.5 translate-y-px rounded-none bg-foreground transition-[width,translate] duration-200 ease-in-out dark:bg-foreground"
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.left}px) translateY(1px)`,
              }}
            />
          </TabsList>
        </div>

        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="rounded-[9px] border bg-background">
                <pre className="overflow-x-auto overscroll-x-contain leading-5">
                  <code
                    data-slot="code-block"
                    data-language="bash"
                    data-line=""
                    className="font-mono text-sm/none text-muted-foreground"
                  >
                    {value}
                  </code>
                </pre>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <CopyButton
        className="absolute top-1.5 right-0.5 z-10 size-7 rounded-md border-none text-muted-foreground [&_svg:not([class*='size-'])]:size-4"
        variant="ghost"
        size="icon-xs"
        text={tabs[packageManager] || ""}
      />
    </div>
  );
}