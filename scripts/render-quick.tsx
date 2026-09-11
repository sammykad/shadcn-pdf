import fs from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { QuickDoc } from "./quick-doc";

async function main() {
  registerPDFFonts();
  const buffer = await renderToBuffer(QuickDoc());
  fs.writeFileSync("public/quick-doc.pdf", buffer);
  console.log("Generated quick-doc.pdf", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});