<script lang="ts">
  import type { Repository, RepositoryTopic } from "@octokit/graphql-schema";
  import Topic from "./Topic.svelte";

  export let repository: Repository;

  let topics: RepositoryTopic[] = (repository.repositoryTopics.nodes ?? [])
    .filter(t => !!t)
    .map(t => t as RepositoryTopic);
</script>

<div class="mt-4">
  <h2>{repository.nameWithOwner}</h2>

  <div class="flex flex-row">
    {#each topics as topic (topic.id)}
      <Topic {topic} />
    {/each}
  </div>

  <p class="text-justify mt-2">{repository.description ?? ""}</p>
</div>
