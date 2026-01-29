<script lang="ts">
  import Datetime from "../datetime/Datetime.svelte";
  import Tags from "./Tags.svelte";
  import type { BlogFrontmatter } from "@schema/blog";
  import type { Snippet } from "svelte";

  const {
    href,
    frontmatter,
    children,
  }: {
    href: string;
    frontmatter: BlogFrontmatter;
    children: Snippet;
  } = $props();

  const { title, description, pubDatetime, tags } = frontmatter;
</script>

<a
  {href}
  class="group block relative my-4 p-5 rounded-xl border border-base-300 bg-base-100 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
>
  <h2
    class="my-0.5 text-2xl font-semibold decoration-dashed group-hover:underline group-hover:text-primary transition-colors duration-200"
  >
    {title}
  </h2>
  <p class="text-base-content/80 mt-2 line-clamp-2">{description}</p>
  <div
    class="flex flex-wrap justify-between items-center mt-4 pt-3 border-t border-base-200"
  >
    <div class="mr-4 text-sm text-base-content/60">
      <Datetime datetime={pubDatetime.toISOString()} showTime={false} />
    </div>

    <Tags {tags}>
      {@render children?.()}
    </Tags>
  </div>
</a>
