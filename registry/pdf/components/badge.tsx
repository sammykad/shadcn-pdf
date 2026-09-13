// @/components/pdf/badge.tsx
import * as React from "react";
import { View, Text } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { tw } from "@/components/pdf";

const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2 py-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border-border text-foreground",
        ghost: "bg-transparent text-muted-foreground",
        success: "bg-green-50 text-green-500",
        link: "bg-transparent text-primary underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface PDFBadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  style?: Style;
}

export function PDFBadge({ children, variant = "default", className, style }: PDFBadgeProps) {
  return (
    <View style={[tw(cn(badgeVariants({ variant }), className)), style]}>
      <Text style={tw("text-xs font-medium")}>{children}</Text>
    </View>
  );
}

PDFBadge.displayName = "PDFBadge";

export { badgeVariants };