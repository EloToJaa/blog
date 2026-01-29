<script lang="ts">
  const { count = 3 }: { count?: number } = $props();
</script>

{#each Array(count) as _, i}
  <div class="my-4 p-5 rounded-xl border border-base-300 bg-base-100">
    <div class="skeleton h-8 w-3/4 mb-3 rounded"></div>
    <div class="skeleton h-4 w-full mb-2 rounded"></div>
    <div class="skeleton h-4 w-2/3 mb-4 rounded"></div>
    <div class="flex flex-wrap justify-between items-center mt-4 pt-3 border-t border-base-200">
      <div class="skeleton h-4 w-24 rounded"></div>
      <div class="skeleton h-4 w-32 rounded"></div>
    </div>
  </div>
{/each}
