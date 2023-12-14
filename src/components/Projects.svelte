<script lang="ts">
  import type { Repository } from "@octokit/graphql-schema";
  import { onMount } from "svelte";

  export let pageSize = 5;
  let repositories: Repository[] = [];
  let after: string | null = null;
  let hasNextPage: boolean = true;

  const loadMoreRepositories = async () => {
    if (!hasNextPage) return;

    const response = await fetch(
      `/api/github?after=${after}&pageSize=${pageSize}`
    );
    const data = (await response.json()) as {
      repositories: Repository[];
      endCursor: string;
      hasNextPage: boolean;
    };

    if (response) {
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

{#each repositories as repository (repository.name)}
  <div>
    <h2>{repository.name}</h2>
    <p>{repository.description}</p>
  </div>
{/each}
