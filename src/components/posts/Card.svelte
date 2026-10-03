<script lang="ts">
  import Datetime from "../datetime/Datetime.svelte";
  import Tags from "./Tags.svelte";
  import { Card as CardRoot } from "@components/ui/card";
  import type { BlogFrontmatter } from "@schema/blog";

  const { href, frontmatter }: { href: string; frontmatter: BlogFrontmatter } =
    $props();
</script>

<article class="h-full">
  <CardRoot class="post-card h-full shadow-none ring-0">
    <div class="post-meta">
      <Datetime
        datetime={frontmatter.pubDatetime.toISOString()}
        showTime={false}
      />
    </div>
    <h2><a {href} class="post-title">{frontmatter.title}</a></h2>
    <p>{frontmatter.description}</p>
    <div class="post-bottom"><Tags tags={frontmatter.tags} /></div>
  </CardRoot>
</article>
