import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: [
    "@react-pdf/renderer",
    "pdf-to-png-converter",
    "@napi-rs/canvas",
    "pdfjs-dist",
  ],
};

export default nextConfig;