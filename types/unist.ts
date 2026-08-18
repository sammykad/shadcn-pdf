import type { Node, Parent } from "unist";

export interface UnistNode extends Node {
  type: string;
  tagName?: string;
  properties?: Record<string, any>;
  attributes?: {
    type?: string;
    name: string;
    value?: string;
  }[];
  children?: UnistNode[];
  name?: string;
  value?: string;
  data?: Record<string, any>;
  __rawString__?: string;
  __withMeta__?: boolean;
}

export interface UnistTree extends Parent {
  children: UnistNode[];
}

export interface NpmCommands {
  __pnpm__?: string;
  __yarn__?: string;
  __npm__?: string;
  __bun__?: string;
}