import { postSearchSchema } from "@schema/blog";
import BlogCollection from "@utils/blog";
import type { APIRoute } from "astro";
import Fuse from "fuse.js";

export const prerender = false;

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

const responseOptions = {
  headers: {
    "content-type": "application/json",
  },
};

export const GET: APIRoute = async ({ url }) => {
  const result = postSearchSchema.safeParse(
    Object.fromEntries(url.searchParams.entries())
  );
  console.log(result);
  if (!result.success) {
    return new Response(
      JSON.stringify({ error: result.error.issues }),
      responseOptions
    );
  }
  const { q: searchPhrase, limit } = result.data;

  const results = fuse
    .search(searchPhrase, {
      limit,
    })
    .map(result => ({
      frontmatter: result.item.data,
      href: `/blog/${result.item.slug}`,
    }));

  return new Response(JSON.stringify({ results }), responseOptions);
};
