import fs from "node:fs";
import { renderToBuffer } from "@react-pdf/renderer";
import { registerPDFFonts } from "../registry/pdf/lib/fonts";
import { Invoice } from "../registry/pdf/blocks/invoice/invoice";
import { data } from "./data";

async function main() {
  const fontFamily = registerPDFFonts();
  console.log("Using font family:", fontFamily);

  const buffer = await renderToBuffer(Invoice({ data }));
  fs.writeFileSync("public/invoice.pdf", buffer);
  console.log("Generated invoice.pdf", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});