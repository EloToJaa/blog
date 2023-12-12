import type { BlogFrontmatter } from "@content/_schemas";

export type PostSearch = {
  href: string;
  frontmatter: BlogFrontmatter;
};
