<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    tags,
    children,
  }: {
    tags: string[];
    children: Snippet;
  } = $props();
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap space-x-1">
    <div class="mt-0.5">{@render children?.()}</div>
    {#each tags as tag, i}
      <a
        href={`/search?&tags=${JSON.stringify([tag])}`}
        class="text-skin-accent text-sm my-auto"
      >
        {tag}{i < tags.length - 1 ? "," : ""}
      </a>
    {/each}
  </div>
{/if}
