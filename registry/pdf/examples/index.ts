import type { Registry } from "shadcn/schema";
import { getRegistryItemUrl } from "@/lib/registry";

function example(name: string, deps: string[]): Registry["items"][number] {
  return {
    name,
    type: "registry:example",
    registryDependencies: deps.map((d) => getRegistryItemUrl(d)),
    files: [
      {
        path: `registry/pdf/examples/${name}.tsx`,
        type: "registry:example",
      },
    ],
  };
}

export const examples: Registry["items"] = [
  example("badge-demo", ["badge"]),
  example("card-demo", ["card", "badge", "primitives"]),
  example("divider-demo", ["divider"]),
  example("document-demo", ["document", "layout", "primitives"]),
  example("layout-demo", ["layout", "primitives"]),
  example("pdf-viewer-demo", []),
  example("section-demo", ["section", "layout"]),
  example("table-demo", ["table"]),
  example("theme-demo", ["theme", "card", "layout", "primitives"]),
  example("typography-demo", ["primitives", "layout"]),
];
