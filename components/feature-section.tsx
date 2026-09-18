import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { CopyIcon, PaletteIcon, PuzzleIcon, FileStackIcon } from "lucide-react";


const DecorIconVariants = cva(
    "pointer-events-none absolute z-1 size-5 shrink-0 stroke-1 stroke-muted-foreground",
    {
        variants: {
            position: {
                "top-left":
                    "top-0 left-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)]",
                "top-right":
                    "top-0 right-0 translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)]",
                "bottom-right":
                    "right-0 bottom-0 translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)]",
                "bottom-left":
                    "bottom-0 left-0 -translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)]",
            },
        },
        defaultVariants: {
            position: "top-left",
        },
    }
);

type DecorIconProps = React.ComponentProps<"svg"> &
    VariantProps<typeof DecorIconVariants>;

export function DecorIcon({ position, className, ...props }: DecorIconProps) {
    return (
        <svg
            aria-hidden="true"
            className={cn(DecorIconVariants({ position, className }))}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}



type FeatureType = {
    title: string;
    icon: React.ReactNode;
    description: string;
};

export function FeatureSection() {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-12 py-12 px-4 md:px-2">
            <div className="mx-auto max-w-xl space-y-2 text-center">
                <h2 className="font-medium text-3xl tracking-tight md:text-5xl">
                    Why shadcn-pdf
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    Copy-paste React components, style with Tailwind, and ship
                    production-ready PDFs. No black box, no vendor lock-in.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <FeatureCard feature={feature} key={feature.title} />
                ))}
            </div>
        </div>
    );
}

function FeatureCard({
    feature,
    className,
    ...props
}: React.ComponentProps<"div"> & {
    feature: FeatureType;
}) {
    return (
        <div
            className={cn(
                "relative flex flex-col justify-between gap-6 bg-background px-6 pt-8 pb-6 shadow-xs",
                // Gradient inspired by testimonials
                "dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
                className
            )}
            {...props}
        >
            {/* Extended Borders */}
            <div className="absolute -inset-y-4 -left-px w-px bg-border" />
            <div className="absolute -inset-y-4 -right-px w-px bg-border" />
            <div className="absolute -inset-x-4 -top-px h-px bg-border" />
            <div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />

            {/* Corner Decor */}
            <DecorIcon className="size-3.5" position="top-left" />

            <div
                className={cn(
                    "relative z-10 flex w-fit items-center justify-center rounded-lg border bg-muted/20 p-3",
                    "[&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-foreground"
                )}
            >
                {feature.icon}
            </div>

            <div className="relative z-10 space-y-2">
                <h3 className="line-clamp-1 font-medium text-base text-foreground">
                    {feature.title}
                </h3>
                <p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </div>
    );
}

const features: FeatureType[] = [
    {
        title: "Copy-Paste Components",
        icon: (
            <CopyIcon
            />
        ),
        description: "Install what you need with the shadcn CLI. Own the code in your project.",
    },
    {
        title: "Tailwind-Style tw()",
        icon: (
            <PaletteIcon
            />
        ),
        description: "Resolve Tailwind CSS classes to react-pdf styles at render time.",
    },
    {
        title: "Composable Primitives",
        icon: (
            <PuzzleIcon
            />
        ),
        description: "Build with Card, Table, Badge, Section, and more — all composable.",
    },
    {
        title: "Ready-Made Blocks",
        icon: (
            <FileStackIcon
            />
        ),
        description: "Multi-page templates for invoices, reports, salary slips, and more.",
    },
];
