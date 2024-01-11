<script lang="ts">
  import type { RepositoryTopic } from "@octokit/graphql-schema";

  export let topic: RepositoryTopic;
</script>

<a
  role="button"
  class="btn btn-sm btn-outline btn-primary mb-2 mr-2"
  href={topic.url}
>
  {topic.topic.name}
</a>
