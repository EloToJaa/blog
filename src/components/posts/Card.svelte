<script lang="ts">
  import type { BlogFrontmatter } from "@schema/blog";
  import Datetime from "../datetime/Datetime.svelte";
  import Tags from "./Tags.svelte";

  export let href: string;
  export let frontmatter: BlogFrontmatter;

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
  <div class="flex justify-between">
    <Datetime datetime={pubDatetime} showTime={false} />
    <Tags {tags}>
      <slot />
    </Tags>
  </div>
</div>
