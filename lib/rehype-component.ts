import fs from "node:fs";
import path from "node:path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import type { UnistNode, UnistTree } from "@/types/unist";
import { getRegistryIndex } from "./registry-server";
import { formatCode } from "./format-code";

type NodeToProcess = {
  node: UnistNode;
  type: "ComponentSource" | "ComponentPreview" | "CodeExample";
  name: string;
  fileName?: string;
  srcPath?: string;
};

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    const nodesToProcess: NodeToProcess[] = [];
    const registryIndex = await getRegistryIndex();

    visit(tree, (node: UnistNode) => {
      const srcPath = getNodeAttributeByName(node, "src")?.value;

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        if (name) {
          nodesToProcess.push({
            node,
            type: "ComponentSource",
            name,
            fileName,
            srcPath: srcPath as string | undefined,
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

      if (node.name === "CodeExample") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (name) {
          nodesToProcess.push({
            node,
            type: "CodeExample",
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

            if (title) {
              item.node.properties ??= {};
              item.node.properties.title = title;
            }

            if (showLineNumbers) {
              item.node.properties ??= {};
              item.node.properties.showLineNumbers = showLineNumbers;
            }

            if (codeMeta) {
              item.node.properties ??= {};
              item.node.properties["data-code-meta"] = codeMeta;
            }
          } catch (error) {
            console.error(error);
          }
        }

        if (item.type === "ComponentPreview") {
          try {
            item.node.children?.push(
              u("element", {
                tagName: "component-preview",
                properties: {
                  name: item.name,
                },
                children: [],
              })
            );
          } catch (error) {
            console.error(error);
          }
        }

        if (item.type === "CodeExample") {
          try {
            const src = `registry/pdf/examples/${item.name}.tsx`;
            const raw = fs.readFileSync(path.join(process.cwd(), src), "utf8");
            const source = await formatCode(raw);

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
