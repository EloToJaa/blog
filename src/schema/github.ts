import { z } from "astro:content";

export const githubGetReposSchema = z.object({
  after: z.string().default(""),
  pageSize: z
    .string()
    .transform(l => z.number().min(1).max(50).default(5).safeParse(l))
    .transform(l => (l.success ? l.data : 5)),
});
