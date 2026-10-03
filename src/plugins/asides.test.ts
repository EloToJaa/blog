import type { Root } from "mdast";
import { expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { starlightAsides } from "./asides";
it.each([
  [":::note\nBody\n:::", "Note"],
  [":::tip[Read **this**]\nBody\n:::", "Read this"],
  [":::danger[]\nBody\n:::", "Danger"],
])("handles callout labels", async (markdown, title) => {
  const parser = unified().use(remarkParse).use(starlightAsides());
  const tree = (await parser.run(parser.parse(markdown))) as Root;
  expect(tree.children[0].data?.hProperties).toMatchObject({ ariaLabel: title });
});
