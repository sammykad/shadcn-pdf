import { pdfToPng } from "pdf-to-png-converter";
import fs from "node:fs";

async function main() {
  const out = "public/preview";
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(out)) fs.rmSync(`${out}/${f}`, { force: true });
  const pngs = await pdfToPng("invoice.pdf", {
    viewportScale: 2,
    outputFolder: out,
  });
  console.log("Rendered", pngs.map((p) => p.name).join(", "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});