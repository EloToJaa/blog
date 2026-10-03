import type { Root } from "mdast";
import { SKIP, visit } from "unist-util-visit";

function transformer(tree: Root) {
  visit(tree, "heading", (node, index, parent) => {
    if (node.depth === 1 && parent && parent.children) {
      if (index === undefined) return;
      parent.children.splice(index, 1);
      return [SKIP, index];
    }
  });
}

export default function removeH1() {
  return transformer;
}
