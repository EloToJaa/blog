<script lang="ts">
  import Card from "@components/posts/Card.svelte";
  import type { PostSearch } from "@schema/blog";
  import { actions } from "astro:actions";
  import { onMount } from "svelte";

  type Tag = {
    label: string;
    value: string;
  };

  export let limit = 5;
  let searchQuery = "";
  let tags = [] as string[];
  let value: Tag[] | undefined | null;
  $: results = [] as PostSearch[];

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
    results = data.results;
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
  on:input={handleInputChange}
  placeholder="Search..."
  class="input input-bordered input-primary input-lg w-full border-4 font-semibold text-2xl"
/>

<section id="search" class="mt-8">
  <h2>Found {results.length} post{results.length == 1 ? "" : "s"}</h2>
  <ul>
    {#each results as result (result.href)}
      <Card href={result.href} frontmatter={result.frontmatter}>
        <svg
          style="font-size: 1em"
          class="hover:text-accent"
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
          data-astro-source-file="~icons/material-symbols/calendar-month-outline-rounded.astro"
          data-astro-source-loc="5:121"
          ><path
            fill="currentColor"
            d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2q.425 0 .713.288T8 3v1h8V3q0-.425.288-.712T17 2q.425 0 .713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m8 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17q0-.425.288-.712T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17q0-.425.288-.712T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18m8 0q-.425 0-.712-.288T15 17q0-.425.288-.712T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18"
            data-astro-source-file="~icons/material-symbols/calendar-month-outline-rounded.astro"
            data-astro-source-loc="5:121"
          ></path></svg
        >
      </Card>
    {/each}
  </ul>
</section>
