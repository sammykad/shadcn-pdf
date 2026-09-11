import fs from "node:fs";
import path from "node:path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import type { UnistNode, UnistTree } from "@/types/unist";
import { registryIndex } from "./registry";
import { formatCode } from "./format-code";

type NodeToProcess = {
  node: UnistNode;
  type: "ComponentSource" | "ComponentPreview";
  name: string;
  fileName?: string;
  srcPath?: string;
};

export function rehypeComponent() {
  // Thanks @shadcn/ui
  return async (tree: UnistTree) => {
    const nodesToProcess: NodeToProcess[] = [];

    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      const srcPath = getNodeAttributeByName(node, "src")?.value;

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        if (name || srcPath) {
          nodesToProcess.push({
            node,
            type: "ComponentSource",
            name,
            fileName,
            srcPath,
          });
        }
      }

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (name) {
          nodesToProcess.push({
            node,
            type: "ComponentPreview",
            name,
          });
        }
      }
    });

    await Promise.all(
      nodesToProcess.map(async (item) => {
        if (item.type === "ComponentSource") {
          try {
            let src: string;

            if (item.srcPath) {
              src = path.join(process.cwd(), item.srcPath);
            } else {
              const component = registryIndex[item.name];
              src = item.fileName
                ? component.files.find((file: any) => {
                    return (
                      file.path.endsWith(`${item.fileName}.tsx`) ||
                      file.path.endsWith(`${item.fileName}.ts`)
                    );
                  })?.path ?? component.files[0]?.path
                : component.files[0]?.path;
            }

            const raw = fs.readFileSync(path.join(process.cwd(), src), "utf8");
            const source = await formatCode(raw);

            const title = getNodeAttributeByName(item.node, "title");
            const showLineNumbers = getNodeAttributeByName(
              item.node,
              "showLineNumbers"
            );
            const codeMeta = getNodeAttributeByName(
              item.node,
              "data-code-meta"
            );

            item.node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {},
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: [`language-${path.extname(src).slice(1)}`],
                    },
                    data: {
                      meta: [
                        title ? `title="${title.value}"` : "",
                        showLineNumbers ? "showLineNumbers" : "",
                      ]
                        .concat(codeMeta ? [codeMeta.value as string] : [])
                        .join(" "),
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            );
          } catch (error) {
            console.error(error);
          }
        }

        if (item.type === "ComponentPreview") {
          // If the MDX already provides a code example as children, use it
          // instead of dumping the full component source.
          if (item.node.children && item.node.children.length > 0) {
            return;
          }
          try {
            const component = registryIndex[item.name];
            const src = component.files[0]?.path;

            const raw = fs.readFileSync(path.join(process.cwd(), src), "utf8");
            const source = await formatCode(raw);
            const codeMeta = getNodeAttributeByName(item.node, "data-code-meta");

            item.node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {},
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"],
                    },
                    data: {
                      meta: codeMeta?.value ?? "",
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            );
          } catch (error) {
            console.error(error);
          }
        }
      })
    );
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}