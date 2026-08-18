"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { GITHUB_URL } from "@/config/site";
import { GitHubIcon, ShadcnIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { title: "Blocks", href: "/blocks" as Route },
  { title: "Components", href: "/components" as Route },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="screen-line-bottom sticky top-0 z-40 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-(--header-height) max-w-3xl items-center justify-between border-x border-line px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-medium tracking-tight"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-foreground/5">
            <ShadcnIcon className="size-4 text-foreground" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-medium">shadcn-pdf</span>
            <span className="mt-1 hidden font-mono text-[10px] tracking-wide text-muted-foreground sm:block">
              PDF components for React + NextJs
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-8 items-center rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "bg-muted/40 text-foreground",
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-0.5">
          <ThemeToggle />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
