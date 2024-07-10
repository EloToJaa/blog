<script lang="ts">
  import type { BlogFrontmatter } from "@schema/blog";
  import Datetime from "../datetime/Datetime.svelte";

  export let href: string;
  export let frontmatter: BlogFrontmatter;

  const { title, description, pubDatetime } = frontmatter;
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
  <Datetime datetime={pubDatetime} showTime={false}>
    <slot />
  </Datetime>
  <p>{description}</p>
</div>
