<script lang="ts">
  import Card from "@components/posts/Card.svelte";
  import CardSkeleton from "@components/posts/CardSkeleton.svelte";
  import { Badge } from "@components/ui/badge";
  import { Button } from "@components/ui/button";
  import { Input } from "@components/ui/input";
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
  let errorMessage = $state("");
  let requestId = 0;

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

  const updateURL = async () => {
    const id = ++requestId;
    isLoading = true;
    errorMessage = "";
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
      if (id !== requestId) return;
      if (data.error) throw data.error;
      results = data.data?.results || [];
    } catch {
      if (id !== requestId) return;
      errorMessage = "Search is unavailable. Please try again.";
      results = [];
    } finally {
      if (id === requestId) isLoading = false;
    }
  };

  onMount(async () => {
    const urlParams = new SvelteURLSearchParams(window.location.search);
    searchQuery = urlParams.get("q") || "";
    tags = parseSearchTags(urlParams.get("tags"));

    await updateURL();
  });
</script>

<div class="search-panel">
  <label for="post-query" class="block font-semibold mb-2">Search posts</label>
  <div class="relative">
    <Input
      id="post-query"
      type="search"
      bind:value={searchQuery}
      oninput={handleInputChange}
      placeholder="Try a title, tool, or challenge…"
      class="h-14 pr-12 bg-background"
      aria-label="Search posts"
    />
    {#if isLoading}
      <div class="absolute right-4 top-1/2 -translate-y-1/2">
        <span class="text-sm muted" aria-hidden="true">…</span>
      </div>
    {/if}
  </div>

  <div class="mt-5">
    <label for="tag-filter" class="block text-sm font-semibold mb-2"
      >Filter by topic</label
    >
    <div class="flex flex-wrap items-center gap-2">
      <div class="flex gap-2 min-w-0">
        <Input
          id="tag-filter"
          type="text"
          bind:value={tagInput}
          onkeydown={handleTagInputKeydown}
          placeholder="Add tag..."
          class="min-h-11 bg-background"
          aria-label="Add tag filter"
        />
        <Button
          variant="outline"
          onclick={addTag}
          class="min-h-11"
          aria-label="Add tag"
        >
          Add
        </Button>
      </div>

      {#if tags.length > 0}
        <div class="flex flex-wrap gap-2">
          {#each tags as tag (tag)}
            <Badge variant="secondary" class="tag h-auto gap-1">
              {tag}
              <Button
                variant="ghost"
                size="icon"
                onclick={() => removeTag(tag)}
                class="icon-link"
                aria-label={`Remove tag ${tag}`}
              >
                <span aria-hidden="true">×</span>
              </Button>
            </Badge>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<section id="search" class="mt-8">
  <h2 class="text-xl font-semibold mb-5" aria-live="polite" role="status">
    {#if isLoading}
      Searching...
    {:else if errorMessage}
      Search unavailable
    {:else}
      Found {results.length} post{results.length === 1 ? "" : "s"}
    {/if}
  </h2>

  <div class="post-grid" aria-busy={isLoading}>
    {#if errorMessage}
      <div class="empty-state">
        <p role="alert">{errorMessage}</p>
        <Button variant="outline" class="mt-4" onclick={updateURL}
          >Try again</Button
        >
      </div>
    {:else if isLoading}
      <CardSkeleton count={limit} />
    {:else if results.length > 0}
      {#each results as result (result.href)}
        <Card href={result.href} frontmatter={result.frontmatter} />
      {/each}
    {:else}
      <div class="empty-state">
        <p class="text-xl">No posts found matching your search.</p>
        <p class="mt-2 muted">
          Try a different keyword or remove a topic filter.
        </p>
        <a href="/posts" class="text-link inline-block mt-4"
          >Browse all posts →</a
        >
      </div>
    {/if}
  </div>
</section>

<style>
  .search-panel {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }
  .empty-state {
    grid-column: 1 / -1;
    padding: 3rem 1.5rem;
    text-align: center;
    border: 1px dashed var(--border);
    border-radius: 0.75rem;
  }
</style>
