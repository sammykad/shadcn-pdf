import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  clean: true,
  sourcemap: true,
  external: [
    "@react-pdf/renderer",
    "@react-pdf/types",
    "react",
    "node:path",
    "node:fs",
  ],
  noExternal: [],
  treeshake: true,
  splitting: false,
});
