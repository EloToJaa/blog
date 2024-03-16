import { apiJson } from "@utils/api";
import BlogCollection from "@utils/blog";
import type { APIRoute } from "astro";

export const prerender = false;

const blogCollection = new BlogCollection();
await blogCollection.getCollection();

export const GET: APIRoute = ({ url }) => {
  const data = Object.fromEntries(url.searchParams.entries());
  const tags = blogCollection.getTags();
  const filteredTags = tags.filter(tag => tag.includes(data.q));
  return new Response(JSON.stringify({ tags: filteredTags }), apiJson);
};
