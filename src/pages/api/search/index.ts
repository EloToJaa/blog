import BlogCollection from "@utils/blog";
import type { APIRoute } from "astro";
import Fuse from "fuse.js";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const blogCollection = new BlogCollection();
  await blogCollection.getCollection();

  const fuse = new Fuse(blogCollection.getPosts(), {
    keys: [
      "data.title",
      "slug",
      "data.author.slug",
      "data.pubDatetime",
      "data.tags",
      "data.description",
    ],
    threshold: 0.6,
  });

  const searchPhrase = url.searchParams.get("q") || "";
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "5", 10),
    50
  );

  const results = fuse
    .search(searchPhrase, {
      limit,
    })
    .map(result => ({
      frontmatter: result.item.data,
      href: `/blog/${result.item.slug}`,
    }));

  return new Response(JSON.stringify({ results }), {
    headers: {
      "content-type": "application/json",
    },
  });
};
