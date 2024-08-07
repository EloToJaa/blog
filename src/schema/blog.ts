import { reference, z } from "astro:content";

export const blogSchema = z
  .object({
    author: reference("authors"),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
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
