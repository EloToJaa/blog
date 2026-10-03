<script lang="ts">
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

<div class="space-y-4">
  <div class="relative">
    <input
      type="text"
      bind:value={searchQuery}
      maxlength="200"
      oninput={handleInputChange}
      placeholder="Search posts..."
      class="input input-bordered input-primary input-lg w-full border-2 font-semibold text-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
      aria-label="Search posts"
    />
    {#if isLoading}
      <div class="absolute right-4 top-1/2 -translate-y-1/2">
        <span class="loading loading-spinner loading-md text-primary"></span>
      </div>
    {/if}
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <div class="join">
      <input
        type="text"
        bind:value={tagInput}
        maxlength="100"
        onkeydown={handleTagInputKeydown}
        placeholder="Add tag..."
        class="input input-bordered input-sm join-item rounded-l-lg"
        aria-label="Add tag filter"
      />
      <button
        onclick={addTag}
        class="btn btn-primary btn-sm join-item rounded-r-lg"
        aria-label="Add tag"
      >
        Add
      </button>
    </div>

    {#if tags.length > 0}
      <div class="flex flex-wrap gap-2">
        {#each tags as tag (tag)}
          <span class="badge badge-primary badge-lg gap-1">
            {tag}
            <button
              onclick={() => removeTag(tag)}
              class="btn btn-ghost btn-xs btn-circle -mr-1"
              aria-label={`Remove tag ${tag}`}
            >
              <span aria-hidden="true">×</span>
            </button>
          </span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<section id="search" class="mt-8" aria-busy={isLoading}>
  <h2 class="text-2xl font-bold mb-4" aria-live="polite" aria-atomic="true">
    {#if isLoading}
      Searching...
    {:else}
      Found {total} post{total === 1 ? "" : "s"}
    {/if}
  </h2>

  {#if total > limit}<p>
      Showing the first {limit} matches. Refine your search to see more.
    </p>{/if}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#if isLoading}
      <CardSkeleton count={limit} />
    {:else if error}
      <div role="alert">
        <p>{error}</p>
        <button class="btn btn-primary" onclick={load}>Retry search</button>
      </div>
    {:else if results.length > 0}
      {#each results as result (result.href)}
        <Card href={result.href} frontmatter={result.frontmatter}>
          <span></span>
        </Card>
      {/each}
    {:else}
      <div class="col-span-full text-center py-12 text-base-content/60">
        <p class="text-xl">No posts found matching your search.</p>
        <p class="mt-2">Try different keywords or browse all posts.</p>
      </div>
    {/if}
  </div>
</section>
