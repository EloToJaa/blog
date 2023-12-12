<script lang="ts">
  import type { BlogFrontmatter } from "@content/_schemas";
  import Datetime from "../datetime/Datetime.svelte";

  export let href: string;
  export let frontmatter: BlogFrontmatter;

  const { title, description, pubDatetime } = frontmatter;
</script>

<li class="my-4">
  <a
    {href}
    class="inline-block text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
  >
    <h3 class="decoration-dashed hover:underline">
      {title}
    </h3>
  </a>
  <Datetime datetime={pubDatetime}>
    <slot />
  </Datetime>
  <p>{description}</p>
</li>
