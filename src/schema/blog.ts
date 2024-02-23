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

export type PostSearch = {
  href: string;
  frontmatter: BlogFrontmatter;
};

export const postSearchSchema = z.object({
  q: z.string().max(200).default(""),
  limit: z
    .string()
    .transform(Number)
    .refine(n => n >= 1 && n <= 50, {
      message: "limit must be between 1 and 50",
    })
    .default("5"),
  tags: z
    .string()
    .transform((s): string[] => {
      try {
        return JSON.parse(s);
      } catch (e) {
        return [];
      }
    })
    .refine(a => Array.isArray(a), {
      message: "tags must be an array",
    })
    .default("[]"),
});
