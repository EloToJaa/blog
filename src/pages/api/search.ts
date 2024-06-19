import { postSearchSchema } from "@schema/blog";
import { apiJson } from "@utils/api";
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

export const GET: APIRoute = async ({ url }) => {
  const data = Object.fromEntries(url.searchParams.entries());
  const result = await postSearchSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    return new Response(
      JSON.stringify({ error: result.error.issues }),
      apiJson
    );
  }
  const { q: searchPhrase, limit, tags } = result.data;

  const results = fuse
    .search(searchPhrase, {
      limit,
    })
    .map(result => ({
      frontmatter: result.item.data,
      href: `/blog/${result.item.slug}`,
    }));

  if (tags.length === 0)
    return new Response(JSON.stringify({ results }), apiJson);

  const filteredResults = results.filter(result =>
    tags.some(tag => result.frontmatter.tags.includes(tag))
  );

  return new Response(JSON.stringify({ results: filteredResults }), apiJson);
};
