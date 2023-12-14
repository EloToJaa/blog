import { z } from "astro:content";

export const githubGetReposSchema = z.object({
  after: z.string().default(""),
  pageSize: z
    .string()
    .transform(Number)
    .refine(n => n >= 1 && n <= 50, {
      message: "pageSize must be between 1 and 50",
    })
    .default("5"),
});
