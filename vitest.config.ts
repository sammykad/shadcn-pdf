import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },
  resolve: {
    alias: [
      { find: /^@\/components\/pdf\/core\//, replacement: path.resolve(import.meta.dirname, "registry/pdf/core/") },
      { find: /^@\/components\/pdf\/theme$/, replacement: path.resolve(import.meta.dirname, "registry/pdf/core/theme.ts") },
      { find: /^@\/components\/pdf\/palette$/, replacement: path.resolve(import.meta.dirname, "registry/pdf/core/palette.ts") },
      { find: /^@\/components\/pdf\/tw$/, replacement: path.resolve(import.meta.dirname, "registry/pdf/core/tw.ts") },
      { find: /^@\/components\/pdf\/fonts$/, replacement: path.resolve(import.meta.dirname, "registry/pdf/core/fonts.ts") },
      { find: /^@\/components\/pdf\/provider$/, replacement: path.resolve(import.meta.dirname, "registry/pdf/core/provider.tsx") },
      { find: /^@\/components\/pdf$/, replacement: path.resolve(import.meta.dirname, "registry/pdf/index.ts") },
      { find: /^@\/components\/pdf\//, replacement: path.resolve(import.meta.dirname, "registry/pdf/components/") },
      { find: /^@\//, replacement: path.resolve(import.meta.dirname, ".") },
    ],
  },
});