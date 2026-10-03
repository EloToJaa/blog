/// <reference types="mdast-util-directive" />
import "mdast-util-to-hast";
import type { Root, Paragraph } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkDirective from "remark-directive";
import type { Plugin, PluggableList } from "unified";
import { visit } from "unist-util-visit";

const titles: Record<string, string> = {
  note: "Note",
  tip: "Tip",
  caution: "Caution",
  danger: "Danger",
};
export const remarkAsides: Plugin<[], Root> = () => tree => {
  visit(tree, "containerDirective", node => {
    const fallback = titles[node.name];
    if (!fallback) return;
    const label = node.children.find(
      child => child.type === "paragraph" && child.data?.directiveLabel
    );
    const title = (label ? toString(label).trim() : "") || fallback;
    node.children = node.children.filter(
      child => !(child.type === "paragraph" && child.data?.directiveLabel)
    );
    const heading: Paragraph = {
      type: "paragraph",
      data: { hProperties: { className: ["starlight-aside__title"], ariaHidden: "true" } },
      children: [{ type: "text", value: title }],
    };
    node.children.unshift(heading);
    node.data = {
      ...node.data,
      hName: "aside",
      hProperties: {
        className: ["starlight-aside", "starlight-aside--" + node.name],
        ariaLabel: title,
      },
    };
  });
};
export const starlightAsides = (): PluggableList => [remarkDirective, remarkAsides];
