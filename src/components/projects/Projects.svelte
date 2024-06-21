<script lang="ts">
  import type { Repository } from "@octokit/graphql-schema";
  import { actions } from "astro:actions";
  import { onMount } from "svelte";
  import Project from "./Project.svelte";

  export let pageSize = 5;
  let repositories: Repository[] = [];
  let after: string | null = null;
  let hasNextPage: boolean = true;

  const loadMoreRepositories = async () => {
    if (!hasNextPage) return;

    const data = await actions.github({
      after,
      pageSize,
    });

    if (data) {
      repositories = [...repositories, ...data.repositories];

      after = data.endCursor;
      hasNextPage = data.hasNextPage;

      if (window.innerHeight >= document.body.offsetHeight)
        loadMoreRepositories();
    }
  };

  onMount(() => {
    loadMoreRepositories();

    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreRepositories();
      }
    });
  });
</script>

<h1>Projects</h1>

{#each repositories as repository (repository.nameWithOwner)}
  <Project {repository} />
{/each}

<div class="mt-4"></div>

{#if hasNextPage}
  <button
    class="btn btn-circle btn-primary sticky bottom-4 left-1/2"
    on:click={loadMoreRepositories}
    aria-label="Load more projects"
    ><svg
      class="hover:"
      style="font-size: 2em"
      viewBox="0 0 24 24"
      width="1.2em"
      height="1.2em"
      data-astro-source-file="~icons/material-symbols/fitbit-arrow-downward.astro"
      data-astro-source-loc="5:117"
      ><path
        fill="currentColor"
        d="m12 18l-6-6l1.4-1.4l3.6 3.575V6h2v8.175l3.6-3.575L18 12l-6 6Z"
        data-astro-source-file="~icons/material-symbols/fitbit-arrow-downward.astro"
        data-astro-source-loc="5:117"
      ></path></svg
    ></button
  >
{/if}
