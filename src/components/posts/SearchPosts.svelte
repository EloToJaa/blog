<script lang="ts">
  import Card from "@components/posts/Card.svelte";
  import CardSkeleton from "@components/posts/CardSkeleton.svelte";
  import type { PostSearch } from "@schema/blog";
  import { actions } from "astro:actions";
  import { onMount } from "svelte";
  import CloseIcon from "~icons/ic/baseline-close";

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

  const updateURL = async () => {
    isLoading = true;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("q", searchQuery);
    urlParams.set("tags", JSON.stringify(tags));

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );

    try {
      const data = await actions.search({
        searchPhrase: searchQuery,
        limit,
        tags,
      });
      results = data.data?.results || [];
    } catch (error) {
      console.error("Search error:", error);
      results = [];
    } finally {
      isLoading = false;
    }
  };

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    searchQuery = urlParams.get("q") || "";
    tags = urlParams.get("tags") ? JSON.parse(urlParams.get("tags")!) : tags;

    await updateURL();
  });
</script>

<div class="space-y-4">
  <div class="relative">
    <input
      type="text"
      bind:value={searchQuery}
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
        {#each tags as tag}
          <span class="badge badge-primary badge-lg gap-1">
            {tag}
            <button
              onclick={() => removeTag(tag)}
              class="btn btn-ghost btn-xs btn-circle -mr-1"
              aria-label={`Remove tag ${tag}`}
            >
              <CloseIcon class="w-3 h-3" />
            </button>
          </span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<section id="search" class="mt-8">
  <h2 class="text-2xl font-bold mb-4">
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
      <div class="col-span-full text-center py-12 text-base-content/60">
        <p class="text-xl">No posts found matching your search.</p>
        <p class="mt-2">Try different keywords or browse all posts.</p>
      </div>
    {/if}
  </div>
</section>
