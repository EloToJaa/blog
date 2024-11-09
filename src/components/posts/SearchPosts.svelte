<script lang="ts">
  import Card from "@components/posts/Card.svelte";
  import type { PostSearch } from "@schema/blog";
  import { actions } from "astro:actions";
  import { onMount } from "svelte";

  type Tag = {
    label: string;
    value: string;
  };

  let { limit }: { limit: number } = $props();
  let searchQuery = $state<string>("");
  let tags = $state<string[]>([]);
  let value = $state<Tag[]>([]);
  let results = $state<PostSearch[]>([]);

  const handleInputChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    await updateURL();
  };

  const updateURL = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("q", searchQuery);
    urlParams.set("tags", JSON.stringify(tags));
    value = tags.map(tag => ({ label: tag, value: tag }));

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );

    const data = await actions.search({
      searchPhrase: searchQuery,
      limit,
      tags,
    });
    results = data.data?.results || [];
  };

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    searchQuery = urlParams.get("q") || "";
    tags = urlParams.get("tags") ? JSON.parse(urlParams.get("tags")!) : tags;

    await updateURL();
  });
</script>

<input
  type="text"
  bind:value={searchQuery}
  oninput={handleInputChange}
  placeholder="Search..."
  class="input input-bordered input-primary input-lg w-full border-4 font-semibold text-2xl"
/>

<section id="search" class="mt-8">
  <h2>Found {results.length} post{results.length == 1 ? "" : "s"}</h2>
  <ul>
    {#each results as result (result.href)}
      <Card href={result.href} frontmatter={result.frontmatter} />
    {/each}
  </ul>
</section>
