import type { Metadata } from "next";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { WebMCPProvider } from "@/components/webmcp";
import "./globals.css";
import { fontVariables } from "@/lib/font";

export const metadata: Metadata = {
  title: {
    default: "shadcn-pdf — PDF Components for React & Next.js",
    template: "%s | shadcn-pdf",
  },
  description:
    "shadcn-pdf is a shadcn/ui-style component library for generating PDFs in React using @react-pdf/renderer. Copy-paste components, Tailwind-style tw() resolver, and pre-built document templates.",
  metadataBase: new URL("https://shadcn-pdf.vercel.app"),
  icons: "/favicon.svg",
  keywords: [
    "shadcn-pdf",
    "shadcn",
    "PDF",
    "React",
    "Next.js",
    "react-pdf",
    "component library",
    "Tailwind CSS",
    "document generation",
    "invoices",
    "reports",
  ],
  authors: [{ name: "Sammykad", url: "https://github.com/sammykad" }],
  creator: "Sammykad",
  other: {
    "llms-txt": "/llms.txt",
    "webmcp-tools": "search_components, get_install_command, list_all_components, get_component_docs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <Script src="/webmcp.js" strategy="beforeInteractive" />
      </head>
      <body>
        <ThemeProvider>
          <WebMCPProvider />
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
