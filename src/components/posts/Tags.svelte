<script lang="ts">
  export let tags: string[];
</script>

{#if tags.length > 0}
  <div class="flex space-x-1">
    <slot />
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
