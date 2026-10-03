import type { CollectionEntry } from "astro:content";
export const postUrl = (id: string) =>
  "/blog/" + id.split("/").map(encodeURIComponent).join("/") + "/";
export const pageUrl = (page: number) => (page === 1 ? "/posts/" : "/posts/" + page + "/");
export const normalizeTag = (tag: string) => tag.trim().toLowerCase();
export const tagUrl = (tag: string) =>
  "/search/?" + new URLSearchParams({ tags: JSON.stringify([normalizeTag(tag)]) });
export function publishedPosts<
  T extends { data: Pick<CollectionEntry<"blog">["data"], "draft" | "pubDatetime"> },
>(posts: T[], now = new Date()) {
  return posts
    .filter(({ data }) => !data.draft && data.pubDatetime <= now)
    .sort((a, b) => b.data.pubDatetime.getTime() - a.data.pubDatetime.getTime());
}
export const lastPage = (count: number, size: number) => Math.max(1, Math.ceil(count / size));
export function getPage<T>(posts: T[], page: number, size: number) {
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(size) || size < 1) return [];
  return posts.slice((page - 1) * size, page * size);
}
