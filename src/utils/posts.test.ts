import { describe, expect, it } from "vitest";
import { publishedPosts, getPage, lastPage, tagUrl, pageUrl } from "./posts";
describe("publication and pagination", () => {
  it("excludes drafts and scheduled posts without mutating input", () => {
    const posts = [
      { data: { draft: false, pubDatetime: new Date("2024-01-01") } },
      { data: { draft: true, pubDatetime: new Date("2023-01-01") } },
      { data: { pubDatetime: new Date("2026-01-01") } },
    ];
    expect(publishedPosts(posts, new Date("2025-01-01"))).toEqual([posts[0]]);
    expect(posts).toHaveLength(3);
  });
  it("handles empty pages and boundaries", () => {
    expect(lastPage(0, 5)).toBe(1);
    expect(lastPage(6, 5)).toBe(2);
    expect(getPage([1, 2, 3], 2, 2)).toEqual([3]);
    expect(getPage([1], 0, 5)).toEqual([]);
    expect(pageUrl(1)).toBe("/posts/");
  });
  it("encodes tags with URL delimiters", () => {
    const url = new URL(tagUrl(" C++ & Rust "), "https://example.com");
    expect(JSON.parse(url.searchParams.get("tags")!)).toEqual(["c++ & rust"]);
  });
});
