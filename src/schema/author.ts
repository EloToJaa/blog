import { z } from "zod";

export const authorSchema = z
  .object({
    name: z.string(),
    avatar: z.url().optional(),
    github: z.url().optional(),
    twitter: z.url().optional(),
    reddit: z.url().optional(),
    discord: z.url().optional(),
    linkedin: z.url().optional(),
    hackthebox: z.url().optional(),
  })
  .strict();

export type AuthorFrontmatter = z.infer<typeof authorSchema>;
