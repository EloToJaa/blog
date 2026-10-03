import type { Plugin } from "unified";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";

function transformer(tree: Root) {
  visit(tree, "heading", (node, index, parent) => {
    if (node.depth === 1 && parent && parent.children) {
      if (index !== undefined) {
        parent.children.splice(index, 1);
        return index;
      }
    }
  });
}

const removeH1: Plugin<[], Root> = () => transformer;
export default removeH1;
