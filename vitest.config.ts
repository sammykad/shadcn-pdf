import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts", "**/*.test.tsx"],
  },
  resolve: {
    alias: [
      { find: /^@\/components\/pdf\/core/, replacement: path.resolve(import.meta.dirname, "registry/pdf/core") },
      { find: /^@\/components\/pdf/, replacement: path.resolve(import.meta.dirname, "registry/pdf/components") },
      { find: /^@\//, replacement: path.resolve(import.meta.dirname, ".") },
    ],
  },
});