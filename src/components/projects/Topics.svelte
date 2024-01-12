<script lang="ts">
  import type { RepositoryTopicConnection } from "@octokit/graphql-schema";
  import { getRepositoryTopics } from "@utils/repository";
  import Topic from "./Topic.svelte";

  export let topics: RepositoryTopicConnection;
</script>

<div class="flex flex-row flex-wrap">
  {#each getRepositoryTopics(topics) as topic (topic.id)}
    <Topic {topic} />
  {/each}
</div>
