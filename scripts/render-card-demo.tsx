import { renderToBuffer } from "@react-pdf/renderer";
import fs from "node:fs";
import { registerPDFFonts } from "../registry/pdf/core/fonts";
import { CardDemo } from "../registry/pdf/examples/card-demo";

async function main() {
  registerPDFFonts();
  const element = CardDemo();
  const buffer = await renderToBuffer(element);
  fs.writeFileSync("public/card-demo.pdf", buffer);
  console.log("Generated card-demo.pdf", buffer.length, "bytes");
  console.log("Open: http://localhost:3000/card-demo.pdf");
}

main().catch(console.error);
