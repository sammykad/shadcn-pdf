"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch when reading the theme on first render.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <SunIcon
            className={cn(
              "absolute size-4 transition-all",
              isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
            )}
          />
          <MoonIcon
            className={cn(
              "absolute size-4 transition-all",
              isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0",
            )}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="pr-2 pl-3">
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
