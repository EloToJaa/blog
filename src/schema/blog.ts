import { reference } from "astro:content";
import { z } from "zod";

export const blogSchema = z
  .object({
    author: reference("authors"),
    pubDatetime: z.date(),
    title: z.string(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    description: z.string(),
  })
  .strict();

export type BlogFrontmatter = z.infer<typeof blogSchema>;

export type PostSearch = {
  href: string;
  frontmatter: BlogFrontmatter;
};
