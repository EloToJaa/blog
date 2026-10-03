<script lang="ts">
  import { tagUrl } from "@utils/posts";
  import { Badge } from "@components/ui/badge";
  import type { Snippet } from "svelte";

  const { tags, children }: { tags: string[]; children?: Snippet } = $props();
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap items-center gap-1">
    {@render children?.()}
    {#each tags as tag, i (`${tag}-${i}`)}
      <Badge variant="secondary" href={tagUrl(tag)}>{tag}</Badge>
    {/each}
  </div>
{/if}
