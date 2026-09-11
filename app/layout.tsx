import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { Navbar } from "@/components/navbar";
import "./globals.css";
import { fontVariables } from "@/lib/font";

export const metadata: Metadata = {
  title: "shadcn-pdf",
  description:
    "Shadcn-style component library for PDFs built on @react-pdf/renderer.",
  metadataBase: new URL("https://shadcn-pdf.vercel.app"),
  icons: "/favicon.png",
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
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
