import { createPostSearch, parseSearchTags } from "./search";
import type { CollectionEntry } from "astro:content";
import { describe, expect, it } from "vitest";

function post(id: string, tags = ["other"]): CollectionEntry<"blog"> {
  return {
    id,
    collection: "blog",
    data: {
      title: "Astro migration",
      description: "Upgrading the blog",
      author: { collection: "authors", id: "elotoja" },
      pubDatetime: new Date("2024-01-01"),
      tags,
    },
  };
}

describe("post search", () => {
  it("matches topic filters regardless of capitalization", () => {
    const search = createPostSearch([
      post("writeup", ["Writeup", "HackTheBox"]),
    ]);
    expect(search("", 5, ["writeup"])[0].href).toBe("/blog/writeup");
    expect(search("", 5, ["HACKTHEBOX"])[0].href).toBe("/blog/writeup");
  });
  it("filters tags before limiting matches", () => {
    const search = createPostSearch([post("first"), post("second", ["astro"])]);
    expect(
      search("Astro migration", 1, ["astro"]).map(result => result.href)
    ).toEqual(["/blog/second"]);
  });

  it("supports blank queries and tag-only searches in publication order", () => {
    const search = createPostSearch([post("newest"), post("older", ["astro"])]);
    expect(search("  ", 1, [])[0].href).toBe("/blog/newest");
    expect(search("", 5, ["astro"])[0].href).toBe("/blog/older");
    expect(search("", 5, ["missing"])).toEqual([]);
  });

  it("searches the migrated entry and author IDs", () => {
    const search = createPostSearch([post("unique-entry")]);
    expect(search("unique-entry", 5, [])[0].href).toBe("/blog/unique-entry");
    expect(search("elotoja", 5, [])[0].frontmatter.author.id).toBe("elotoja");
    expect(search("zzzzzzzzzz", 5, [])).toEqual([]);
  });
});

describe("search URL tags", () => {
  it.each([null, "", "{", '"astro"', "null", "42", "{}"])(
    "ignores invalid tag lists: %s",
    value => {
      expect(parseSearchTags(value)).toEqual([]);
    }
  );

  it("keeps unique string tags only", () => {
    expect(parseSearchTags('["astro", 1, null, "astro", "nix"]')).toEqual([
      "astro",
      "nix",
    ]);
  });
});
