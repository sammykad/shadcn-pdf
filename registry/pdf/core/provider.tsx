import * as React from "react";
import { View, Text } from "@react-pdf/renderer";
import { theme, PDFTheme } from "@/components/pdf/theme";

let currentTheme: PDFTheme = theme;

export function PDFProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: Partial<PDFTheme>;
}) {
  currentTheme = deepMerge(theme, value ?? {});
  return <>{children}</>;
}

export function usePDFTheme(): PDFTheme {
  return currentTheme;
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (Array.isArray(base)) return base;
  if (base && typeof base === "object") {
    const out: any = { ...base };
    for (const key of Object.keys(override ?? {})) {
      const b = (base as any)[key];
      const o = (override as any)[key];
      out[key] =
        o && typeof o === "object" && !Array.isArray(o)
          ? deepMerge(b, o)
          : o;
    }
    return out;
  }
  return (override ?? base) as T;
}