import type { Root } from "mdast";
import { expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import removeH1 from "./removeH1";
import { readFileSync } from "node:fs";
it("removes consecutive H1 headings and preserves lower levels", async () => {
  const parser = unified().use(remarkParse).use(removeH1);
  const tree = (await parser.run(parser.parse("# One\n# Two\n## Keep"))) as Root;
  expect(tree.children).toHaveLength(1);
});
it("supports the headings content fixture", async () => {
  const parser = unified().use(remarkParse).use(removeH1);
  const tree = (await parser.run(
    parser.parse(readFileSync("tests/fixtures/headings.md", "utf8"))
  )) as Root;
  expect(tree.children.some(n => n.type === "heading" && n.depth === 1)).toBe(false);
});
