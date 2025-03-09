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

<div class="my-4">
  <a
    {href}
    class="inline-block text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
  >
    <h2 class="my-0.5 text-2xl font-medium decoration-dashed hover:underline">
      {title}
    </h2>
  </a>
  <p>{description}</p>
  <div class="flex flex-wrap justify-between">
    <div class="mr-4">
      <Datetime datetime={pubDatetime} showTime={false} />
    </div>

    <Tags {tags}>
      {@render children?.()}
    </Tags>
  </div>
</div>
