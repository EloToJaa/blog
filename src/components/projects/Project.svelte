<script lang="ts">
  import type { Repository } from "@octokit/graphql-schema";

  export let repository: Repository;
</script>

<div>
  <h2>{repository.name}</h2>
  <h3>{repository.nameWithOwner}</h3>
  <p>{repository.description}</p>
</div>
