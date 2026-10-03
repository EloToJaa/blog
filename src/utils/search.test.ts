import { describe, expect, it } from "vitest";
import { Effect } from "effect";
import { parseSearchParams, searchPosts } from "./search";
import type { PostSearch } from "../schema/blog";
describe("search", () => {
  it.each(["invalid", "null", "{}", "[1]", JSON.stringify(Array(21).fill("tag"))])(
    "recovers from invalid tags %s",
    value => {
      expect(parseSearchParams(new URLSearchParams({ tags: value })).tags).toEqual([]);
    }
  );
  it("normalizes and deduplicates tags", () => {
    expect(
      parseSearchParams(new URLSearchParams({ tags: JSON.stringify([" CTF ", "ctf"]) })).tags
    ).toEqual(["ctf"]);
  });
  it("filters all selected tags before limiting and returns the total", () => {
    const posts = Array.from({ length: 8 }, (_, i) => ({
      href: "/blog/" + i + "/",
      frontmatter: {
        title: "Post " + i,
        description: "description",
        pubDatetime: new Date(),
        author: { id: "author", collection: "authors" },
        tags: i >= 5 ? ["CTF", "Web"] : ["Other"],
      },
    })) as PostSearch[];
    const result = Effect.runSync(searchPosts(posts, "", ["ctf", "web"], 2));
    expect(result.total).toBe(3);
    expect(result.results.map(p => p.href)).toEqual(["/blog/5/", "/blog/6/"]);
  });
});
