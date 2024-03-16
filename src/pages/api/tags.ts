import { apiJson } from "@utils/api";
import BlogCollection from "@utils/blog";
import type { APIRoute } from "astro";

export const prerender = false;

const blogCollection = new BlogCollection();
await blogCollection.getCollection();

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({ tags: blogCollection.getTags() }),
    apiJson
  );
};
