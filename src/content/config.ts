import { authorSchema } from "@schema/author";
import { blogSchema } from "@schema/blog";
import { defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: blogSchema,
});

const authorCollection = defineCollection({
  type: "content",
  schema: authorSchema,
});

export const collections = {
  blog: blogCollection,
  authors: authorCollection,
};
