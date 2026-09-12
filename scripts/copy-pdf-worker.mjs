import { copyFile } from "node:fs/promises"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const worker = require.resolve("pdfjs-dist/build/pdf.worker.min.mjs")

await copyFile(worker, "public/pdf.worker.min.mjs")
