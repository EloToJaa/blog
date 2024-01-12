<script lang="ts">
  import type { Repository } from "@octokit/graphql-schema";
  import OpenOnGithub from "./OpenOnGithub.svelte";
  import Topics from "./Topics.svelte";

  export let repository: Repository;
</script>

<div class="mt-4">
  <div class="flex">
    <OpenOnGithub url={repository.url} />
    <h2>
      <a href={`/projects/${repository.nameWithOwner.toLowerCase()}`}
        >{repository.nameWithOwner}</a
      >
    </h2>
  </div>

  <Topics topics={repository.repositoryTopics} />
  <p>{repository.description ?? ""}</p>
</div>
