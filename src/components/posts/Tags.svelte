<script lang="ts">
  import { Badge } from "@components/ui/badge";
  import { tagUrl } from "@utils/posts";

  let { tags }: { tags: string[] } = $props();
</script>

{#if tags.length > 0}
  <div class="tags" aria-label="Topics">
    {#each tags as tag (tag)}
      <Badge
        variant="secondary"
        class="tag h-auto whitespace-normal shrink"
        href={tagUrl(tag)}>{tag}</Badge
      >
    {/each}
  </div>
{/if}
