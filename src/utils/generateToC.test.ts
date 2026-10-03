import { generateToC } from "./generateToC";
import { describe, expect, it } from "vitest";

describe("generateToC", () => {
  it("nests and numbers headings while excluding levels outside the range", () => {
    const headings = [
      { depth: 1, slug: "title", text: "Title" },
      { depth: 2, slug: "first", text: "First" },
      { depth: 3, slug: "child", text: "Child" },
      { depth: 4, slug: "excluded", text: "Excluded" },
      { depth: 2, slug: "second", text: "Second" },
    ];

    const toc = generateToC(headings, {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    });

    expect(toc).toEqual([
      {
        ...headings[1],
        numbers: [1],
        children: [{ ...headings[2], numbers: [1, 1], children: [] }],
      },
      { ...headings[4], numbers: [2], children: [] },
    ]);
    expect(headings).toHaveLength(5);
    expect(headings[1]).not.toHaveProperty("children");
  });

  it("handles skipped levels and an empty collection", () => {
    const options = { minHeadingLevel: 2, maxHeadingLevel: 4 };
    expect(generateToC([], options)).toEqual([]);
    const toc = generateToC(
      [
        { depth: 2, slug: "parent", text: "Parent" },
        { depth: 4, slug: "child", text: "Child" },
      ],
      options
    );
    expect(toc[0].children[0].numbers).toEqual([1, 1]);
  });
});
