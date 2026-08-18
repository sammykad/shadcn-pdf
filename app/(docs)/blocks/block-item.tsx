import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function BlockItem({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col gap-4 p-5 transition-colors focus-visible:outline-none",
        "hover:bg-accent focus-visible:inset-ring-2 focus-visible:inset-ring-ring",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function BlockItemTitle({
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
        "text-base font-medium leading-tight text-foreground transition-colors group-hover:text-accent-foreground",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function BlockItemMeta({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col gap-2",
        className,
      )}
      {...props}
    />
  );
}
