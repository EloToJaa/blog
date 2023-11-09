import { defineCollection } from "astro:content";
import { authorSchema, blogSchema } from "./_schemas";

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
