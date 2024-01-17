import type { Root } from "mdast";
import { visit } from "unist-util-visit";

function transformer(tree: Root) {
  visit(tree, "heading", (node, index, parent) => {
    if (node.depth === 1 && parent && parent.children) {
      if (index) parent.children.splice(index, 1);
    }
  });
}

export default function removeH1() {
  return transformer;
}
