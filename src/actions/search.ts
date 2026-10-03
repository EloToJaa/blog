import BlogCollection from "@utils/blog";
import { createPostSearch } from "@utils/search";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const blogCollection = new BlogCollection();
await blogCollection.getCollection();

const searchPosts = createPostSearch(blogCollection.getPosts());

export default defineAction({
  accept: "json",
  input: z.object({
    searchPhrase: z.string(),
    limit: z.number().int().min(1).max(50).default(5),
    tags: z.array(z.string()).default([]),
  }),
  handler: async ({ searchPhrase, limit, tags }) => {
    return { results: searchPosts(searchPhrase, limit, tags) };
  },
});
