import type { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";

export function createPostSearch(posts: CollectionEntry<"blog">[]) {
  const fuse = new Fuse(posts, {
    keys: [
      "data.title",
      "id",
      "data.author.id",
      "data.tags",
      "data.description",
    ],
    threshold: 0.6,
  });

  return (searchPhrase: string, limit: number, tags: string[]) => {
    const matches = searchPhrase.trim()
      ? fuse.search(searchPhrase.trim()).map(result => result.item)
      : posts;

    const normalizedTags = tags.map(tag => tag.toLowerCase());
    return matches
      .filter(
        post =>
          normalizedTags.length === 0 ||
          normalizedTags.some(tag =>
            post.data.tags.some(postTag => postTag.toLowerCase() === tag)
          )
      )
      .slice(0, limit)
      .map(post => ({ frontmatter: post.data, href: `/blog/${post.id}` }));
  };
}

export function parseSearchTags(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Set(
        parsed.filter((tag): tag is string => typeof tag === "string")
      ),
    ];
  } catch {
    return [];
  }
}
