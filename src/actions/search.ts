import BlogCollection from "@utils/blog";
import { defineAction, z } from "astro:actions";
import Fuse from "fuse.js";

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

export default defineAction({
  accept: "json",
  input: z.object({
    searchPhrase: z.string(),
    limit: z.number().int().min(1).max(50).default(5),
    tags: z.array(z.string()).default([]),
  }),
  handler: async ({ searchPhrase, limit, tags }) => {
    const results = fuse
      .search(searchPhrase, {
        limit,
      })
      .map(result => ({
        frontmatter: result.item.data,
        href: `/blog/${result.item.slug}`,
      }));

    if (tags.length === 0) return { results };

    const filteredResults = results.filter(result =>
      tags.some(tag => result.frontmatter.tags.includes(tag))
    );

    return { results: filteredResults };
  },
});
