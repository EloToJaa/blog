import { Effect } from "effect";
import Fuse from "fuse.js";
import type { PostSearch } from "../schema/blog";
import { normalizeTag } from "./posts";
export function parseSearchParams(params: URLSearchParams) {
  const tags = Effect.try({
    try: () => {
      const value: unknown = JSON.parse(params.get("tags") ?? "[]");
      if (
        !Array.isArray(value) ||
        value.length > 20 ||
        !value.every(t => typeof t === "string" && t.length <= 100)
      )
        return [];
      return [...new Set(value.map(normalizeTag).filter(Boolean))];
    },
    catch: () => new Error("Invalid tags"),
  }).pipe(Effect.catch(() => Effect.succeed([] as string[])));
  return { query: (params.get("q") ?? "").slice(0, 200), tags: Effect.runSync(tags) };
}
export function searchPosts(posts: PostSearch[], query: string, tags: string[], limit: number) {
  return Effect.sync(() => {
    const normalized = tags.map(normalizeTag);
    const candidates = posts.filter(p =>
      normalized.every(tag => p.frontmatter.tags.map(normalizeTag).includes(tag))
    );
    const matches = query.trim()
      ? new Fuse(candidates, {
          keys: [
            "frontmatter.title",
            "frontmatter.description",
            "frontmatter.tags",
            "frontmatter.author.id",
          ],
          threshold: 0.6,
        })
          .search(query)
          .map(r => r.item)
      : candidates;
    return { results: matches.slice(0, limit), total: matches.length };
  });
}
export function loadSearchIndex(signal: AbortSignal) {
  return Effect.tryPromise({
    try: async () => {
      const response = await fetch("/search-index.json", { signal });
      if (!response.ok) throw new Error("Unable to download search index");
      const value: unknown = await response.json();
      if (!Array.isArray(value)) throw new Error("Invalid search index");
      return value.map((post: PostSearch) => {
        if (
          typeof post.href !== "string" ||
          !post.href.startsWith("/blog/") ||
          typeof post.frontmatter?.title !== "string" ||
          typeof post.frontmatter.description !== "string" ||
          !Array.isArray(post.frontmatter.tags) ||
          !post.frontmatter.tags.every(t => typeof t === "string") ||
          typeof post.frontmatter.author?.id !== "string"
        )
          throw new Error("Invalid search entry");
        const date = new Date(post.frontmatter.pubDatetime);
        if (!Number.isFinite(date.getTime())) throw new Error("Invalid publication date");
        return { ...post, frontmatter: { ...post.frontmatter, pubDatetime: date } };
      });
    },
    catch: cause => new Error("Search is unavailable. Please try again.", { cause }),
  });
}
