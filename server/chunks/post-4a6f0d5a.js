import { z } from './index-f38045c6.js';

const validation = z.object({
  title: z.string({ required_error: "Title is required" }).min(3, {
    message: "Title must be at least 3 characters long"
  }).max(50, {
    message: "Title must be at most 50 characters long"
  }).trim(),
  description: z.string({ required_error: "Description is required" }).min(3, {
    message: "Description must be at least 3 characters long"
  }).max(200, {
    message: "Description must be at most 200 characters long"
  }).trim(),
  content: z.string({ required_error: "Content is required" }).min(3, {
    message: "Content must be at least 3 characters long"
  }).max(1e4, {
    message: "Content must be at most 10000 characters long"
  }).trim(),
  postedAt: z.string().datetime({ message: "Date must be a valid date" }).default(new Date().toDateString())
}).superRefine(({ postedAt }, ctx) => {
  if (new Date(postedAt) < new Date()) {
    ctx.addIssue({
      code: "custom",
      message: "Post cannot be created in the past",
      path: ["postedAt"]
    });
  }
});

export { validation as v };
//# sourceMappingURL=post-4a6f0d5a.js.map
