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
  example("card-demo", ["card", "badge", "typography"]),
  example("divider-demo", ["divider"]),
  example("document-demo", ["document", "layout", "typography"]),
  example("fonts-demo", ["typography"]),
  example("layout-demo", ["layout", "typography"]),
  example("section-demo", ["section", "layout"]),
  example("table-demo", ["table"]),
  example("theme-demo", ["theme", "card", "layout", "typography"]),
  example("typography-demo", ["typography", "layout"]),
];