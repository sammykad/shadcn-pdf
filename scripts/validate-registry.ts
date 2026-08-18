import fs from "node:fs";

const r = JSON.parse(fs.readFileSync("registry.json", "utf-8"));

const validShape =
  typeof r.$schema === "string" &&
  r.name === "shadcn-pdf" &&
  typeof r.homepage === "string" &&
  Array.isArray(r.items);

console.log("valid object shape:", validShape);
console.log("name:", r.name);
console.log("items:", r.items.length);

const missing = r.items.filter(
  (i: any) => !i.name || !i.type || !i.files || !Array.isArray(i.files)
);
console.log("items missing required fields:", missing.length);

const types = new Set(r.items.map((i: any) => i.type));
console.log("item types:", [...types].join(", "));

const dupNames = r.items.map((i: any) => i.name).filter((n: string, i: number, a: string[]) => a.indexOf(n) !== i);
console.log("duplicate names:", dupNames.length ? dupNames.join(", ") : "none");