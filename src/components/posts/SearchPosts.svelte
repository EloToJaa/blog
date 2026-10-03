<script lang="ts">
  import { Badge } from "@components/ui/badge";
  import { Button } from "@components/ui/button";
  import { Input } from "@components/ui/input";
  import Card from "@components/posts/Card.svelte";
  import CardSkeleton from "@components/posts/CardSkeleton.svelte";
  import type { PostSearch } from "@schema/blog";
  import {
    loadSearchIndex,
    parseSearchParams,
    searchPosts,
  } from "@utils/search";
  import { normalizeTag } from "@utils/posts";
  import { Effect } from "effect";
  import { SvelteURLSearchParams } from "svelte/reactivity";
  import { onMount } from "svelte";
  let { limit }: { limit: number } = $props();
  let isReady = $state(false);
  let searchQuery = $state("");
  let tags = $state<string[]>([]);
  let posts = $state<PostSearch[]>([]);
  let results = $state<PostSearch[]>([]);
  let total = $state(0);
  let isLoading = $state(true);
  let error = $state("");
  let tagInput = $state("");
  let timer: ReturnType<typeof setTimeout>;
  let controller: AbortController;
  function updateURL() {
    const params = new SvelteURLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (tags.length) params.set("tags", JSON.stringify(tags));
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + (params.size ? "?" + params : "")
    );
    const found = Effect.runSync(searchPosts(posts, searchQuery, tags, limit));
    results = found.results;
    total = found.total;
  }
  function handleInputChange() {
    clearTimeout(timer);
    timer = setTimeout(updateURL, 200);
  }
  function addTag() {
    const tag = normalizeTag(tagInput).slice(0, 100);
    if (!tag || tags.includes(tag) || tags.length >= 20) return;
    tags = [...tags, tag];
    tagInput = "";
    updateURL();
  }
  function removeTag(tag: string) {
    tags = tags.filter(t => t !== tag);
    updateURL();
  }
  function handleTagInputKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addTag();
  }
  async function load() {
    controller?.abort();
    const current = new AbortController();
    controller = current;
    isLoading = true;
    error = "";
    await Effect.runPromise(
      loadSearchIndex(current.signal).pipe(
        Effect.match({
          onFailure: failure => {
            if (controller === current && !current.signal.aborted)
              error = failure.message;
          },
          onSuccess: data => {
            if (controller === current && !current.signal.aborted) {
              posts = data;
              updateURL();
            }
          },
        })
      )
    );
    if (controller === current && !current.signal.aborted) isLoading = false;
  }
  onMount(() => {
    isReady = true;
    const initial = parseSearchParams(
      new URLSearchParams(window.location.search)
    );
    searchQuery = initial.query;
    tags = initial.tags;
    void load();
    return () => {
      clearTimeout(timer);
      controller?.abort();
    };
  });
</script>

<div class="search-panel">
  <label for="post-query" class="block font-semibold mb-2">Search posts</label>
  <div class="relative">
    <Input
      disabled={!isReady}
      id="post-query"
      type="search"
      bind:value={searchQuery}
      maxlength={200}
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
          disabled={!isReady}
          id="tag-filter"
          type="text"
          bind:value={tagInput}
          maxlength={100}
          onkeydown={handleTagInputKeydown}
          placeholder="Add tag..."
          class="min-h-11 bg-background"
          aria-label="Add tag filter"
        />
        <Button
          variant="outline"
          disabled={!isReady}
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
  <h2
    class="text-xl font-semibold mb-5"
    aria-live="polite"
    role="status"
    aria-atomic="true"
  >
    {#if isLoading}
      Searching...
    {:else if error}
      Search unavailable
    {:else}
      Found {total} post{total === 1 ? "" : "s"}
    {/if}
  </h2>

  {#if total > limit}<p>
      Showing the first {limit} matches. Refine your search to see more.
    </p>{/if}
  <div class="post-grid" aria-busy={isLoading}>
    {#if error}
      <div class="empty-state">
        <p role="alert">{error}</p>
        <Button variant="outline" class="mt-4" onclick={load}
          >Retry search</Button
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
