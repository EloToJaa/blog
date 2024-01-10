<script lang="ts">
  import type { Repository, RepositoryTopic } from "@octokit/graphql-schema";
  import Topic from "./Topic.svelte";

  export let repository: Repository;

  $: console.log(repository);

  let topics: RepositoryTopic[] = (repository.repositoryTopics.nodes ?? [])
    .filter(t => !!t)
    .map(t => t as RepositoryTopic);
</script>

<div>
  <h2>{repository.nameWithOwner}</h2>
  <p>{repository.description ?? ""}</p>

  <div class="flex flex-row">
    {#each topics as topic (topic.id)}
      <Topic {topic} />
    {/each}
  </div>
</div>
