import { z } from "astro:content";

export const authorSchema = z
  .object({
    name: z.string(),
    avatar: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
    reddit: z.string().url().optional(),
    discord: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    hackthebox: z.string().url().optional(),
  })
  .strict();

export type AuthorFrontmatter = z.infer<typeof authorSchema>;
