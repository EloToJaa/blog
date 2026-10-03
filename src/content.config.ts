import { authorSchema } from "@schema/author";
import { blogSchema } from "@schema/blog";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: blogSchema,
});

const authorCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/authors" }),
  schema: authorSchema,
});

export const collections = {
  blog: blogCollection,
  authors: authorCollection,
};
