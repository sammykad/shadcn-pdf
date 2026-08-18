import type { Registry } from "shadcn/schema";
import { getRegistryItemUrl } from "@/utils/registry";

export const examples: Registry["items"] = [
  {
    name: "badge-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("badge")],
    files: [
      {
        path: "registry/pdf/examples/badge-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "card-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("card")],
    files: [
      {
        path: "registry/pdf/examples/card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
