import { reference, z } from "astro:content";

export const blogSchema = z
  .object({
    author: reference("authors"),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    description: z.string(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;

export const authorSchema = z
  .object({
    name: z.string(),
    avatar: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
  })
  .strict();

export type AuthorFrontmatter = z.infer<typeof authorSchema>;
