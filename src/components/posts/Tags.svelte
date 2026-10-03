<script lang="ts">
  import { Badge } from "@components/ui/badge";
  import type { Snippet } from "svelte";

  const { tags, children }: { tags: string[]; children?: Snippet } = $props();
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap items-center gap-1">
    {@render children?.()}
    {#each tags as tag}
      <Badge
        variant="secondary"
        href={`/search?tags=${encodeURIComponent(JSON.stringify([tag]))}`}
        >{tag}</Badge
      >
    {/each}
  </div>
{/if}
