<script lang="ts">
  import { tagUrl } from "@utils/posts";
  import type { Snippet } from "svelte";

  const {
    tags,
    children,
  }: {
    tags: string[];
    children?: Snippet;
  } = $props();
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap space-x-1">
    <div class="mt-0.5">{@render children?.()}</div>
    {#each tags as tag, i (tag)}
      <a
        href={tagUrl(tag)}
        class="text-skin-accent text-sm my-auto hover:underline cursor-pointer bg-transparent border-0 p-0"
      >
        {tag}{i < tags.length - 1 ? "," : ""}
      </a>
    {/each}
  </div>
{/if}
