<script lang="ts">
  import Card from "@components/posts/Card.svelte";
  import CardSkeleton from "@components/posts/CardSkeleton.svelte";
  import { Badge } from "@components/ui/badge";
  import { Button } from "@components/ui/button";
  import { Input } from "@components/ui/input";
  import { X, LoaderCircle } from "@lucide/svelte";
  import type { PostSearch } from "@schema/blog";
  import { parseSearchTags } from "@utils/search";
  import { actions } from "astro:actions";
  import { onMount } from "svelte";
  import { SvelteURLSearchParams } from "svelte/reactivity";

  let { limit }: { limit: number } = $props();
  let searchQuery = $state<string>("");
  let tags = $state<string[]>([]);
  let results = $state<PostSearch[]>([]);
  let isLoading = $state<boolean>(true);
  let tagInput = $state<string>("");

  const handleInputChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    await updateURL();
  };

  const addTag = async () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      tags = [...tags, trimmedTag];
      tagInput = "";
      await updateURL();
    }
  };

  const removeTag = async (tagToRemove: string) => {
    tags = tags.filter(tag => tag !== tagToRemove);
    await updateURL();
  };

  const handleTagInputKeydown = async (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await addTag();
    }
  };

  let requestId = 0;

  const updateURL = async () => {
    const currentRequest = ++requestId;
    isLoading = true;
    const urlParams = new SvelteURLSearchParams(window.location.search);
    urlParams.set("q", searchQuery);
    urlParams.set("tags", JSON.stringify(tags));

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}?${urlParams}`
    );

    try {
      const data = await actions.search({
        searchPhrase: searchQuery,
        limit,
        tags,
      });
      if (currentRequest !== requestId) return;
      results = data.data?.results || [];
    } catch (error) {
      console.error("Search error:", error);
      if (currentRequest === requestId) results = [];
    } finally {
      if (currentRequest === requestId) isLoading = false;
    }
  };

  onMount(async () => {
    const urlParams = new SvelteURLSearchParams(window.location.search);
    searchQuery = urlParams.get("q") || "";
    tags = parseSearchTags(urlParams.get("tags"));

    await updateURL();
  });
</script>

<div class="space-y-4">
  <div class="relative">
    <Input
      type="text"
      bind:value={searchQuery}
      oninput={handleInputChange}
      placeholder="Search posts..."
      class="h-12 pr-12 text-lg"
      aria-label="Search posts"
    />
    {#if isLoading}
      <div class="absolute right-4 top-1/2 -translate-y-1/2">
        <LoaderCircle
          class="size-5 animate-spin text-muted-foreground"
          aria-label="Searching"
        />
      </div>
    {/if}
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <div class="flex">
      <Input
        type="text"
        bind:value={tagInput}
        onkeydown={handleTagInputKeydown}
        placeholder="Add tag..."
        class="rounded-r-none"
        aria-label="Add tag filter"
      />
      <Button onclick={addTag} class="rounded-l-none" aria-label="Add tag">
        Add
      </Button>
    </div>

    {#if tags.length > 0}
      <div class="flex flex-wrap gap-2">
        {#each tags as tag (tag)}
          <Badge variant="secondary" class="h-8 gap-1">
            {tag}
            <Button
              onclick={() => removeTag(tag)}
              variant="ghost"
              size="icon-xs"
              class="-mr-1"
              aria-label={`Remove tag ${tag}`}
            >
              <X class="size-3" />
            </Button>
          </Badge>
        {/each}
      </div>
    {/if}
  </div>
</div>

<section id="search" class="mt-8">
  <h2 class="text-2xl font-bold mb-4" aria-live="polite">
    {#if isLoading}
      Searching...
    {:else}
      Found {results.length} post{results.length === 1 ? "" : "s"}
    {/if}
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#if isLoading}
      <CardSkeleton count={limit} />
    {:else if results.length > 0}
      {#each results as result (result.href)}
        <Card href={result.href} frontmatter={result.frontmatter}>
          <span></span>
        </Card>
      {/each}
    {:else}
      <div class="col-span-full text-center py-12 text-muted-foreground">
        <p class="text-xl">No posts found matching your search.</p>
        <p class="mt-2">Try different keywords or browse all posts.</p>
      </div>
    {/if}
  </div>
</section>
