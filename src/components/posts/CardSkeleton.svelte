<script lang="ts">
  import { Card } from "@components/ui/card";
  import { Skeleton } from "@components/ui/skeleton";

  const { count = 3 }: { count?: number } = $props();
</script>

{#each Array(count) as _}
  <Card class="my-4 gap-3 p-5" aria-hidden="true">
    <Skeleton class="h-8 w-3/4" />
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-2/3" />
    <div class="flex justify-between border-t pt-3">
      <Skeleton class="h-4 w-24" />
      <Skeleton class="h-4 w-32" />
    </div>
  </Card>
{/each}
