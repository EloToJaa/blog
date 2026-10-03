<script lang="ts">
  import Datetime from "../datetime/Datetime.svelte";
  import Tags from "./Tags.svelte";
  import { Card as CardRoot } from "@components/ui/card";
  import type { BlogFrontmatter } from "@schema/blog";
  import type { Snippet } from "svelte";

  const {
    href,
    frontmatter,
    children,
  }: {
    href: string;
    frontmatter: BlogFrontmatter;
    children?: Snippet;
  } = $props();

  const { title, description, pubDatetime, tags } = $derived(frontmatter);
</script>

<CardRoot class="my-4 gap-0 p-5 hover:shadow-lg transition-shadow">
  <h2 class="my-0.5 text-2xl font-semibold">
    <a {href} class="decoration-dashed underline-offset-4 hover:underline"
      >{title}</a
    >
  </h2>
  <p class="text-muted-foreground mt-2 line-clamp-2">{description}</p>
  <div
    class="flex flex-wrap justify-between items-center gap-2 mt-4 pt-3 border-t"
  >
    <div class="mr-4 text-sm text-muted-foreground">
      <Datetime datetime={pubDatetime.toISOString()} showTime={false} />
    </div>
    <Tags {tags}>
      {@render children?.()}
    </Tags>
  </div>
</CardRoot>
