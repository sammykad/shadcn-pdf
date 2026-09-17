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
  alternates: {
    canonical: "/",
  },
  icons: "/favicon.svg",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadcn-pdf.vercel.app",
    siteName: "shadcn-pdf",
    title: "shadcn-pdf — PDF Components for React & Next.js",
    description:
      "shadcn-pdf is a shadcn/ui-style component library for generating PDFs in React using @react-pdf/renderer. Copy-paste components, Tailwind-style tw() resolver, and pre-built document templates.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "shadcn-pdf — PDF Components for React & Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "shadcn-pdf — PDF Components for React & Next.js",
    description:
      "shadcn-pdf is a shadcn/ui-style component library for generating PDFs in React using @react-pdf/renderer.",
    images: ["/og.png"],
  },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "shadcn-pdf",
  description:
    "A shadcn/ui-style component library for generating PDFs in React using @react-pdf/renderer. Copy-paste components, Tailwind-style tw() resolver, and pre-built document templates.",
  url: "https://shadcn-pdf.vercel.app",
  codeRepository: "https://github.com/sammykad/shadcn-pdf",
  programmingLanguage: "TypeScript",
  runtimePlatform: "Node.js",
  license: "https://opensource.org/licenses/MIT",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Sammykad",
    url: "https://github.com/sammykad",
    jobTitle: "Developer",
    sameAs: [
      "https://github.com/sammykad",
      "https://www.npmjs.com/package/@shadcn/pdf",
    ],
  },
  isPartOf: {
    "@type": "WebSite",
    name: "shadcn-pdf",
    url: "https://shadcn-pdf.vercel.app",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
