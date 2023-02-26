<script lang="ts">
	import type { PostType } from '$lib/types/Post';

	export let post: PostType;
</script>

<h1>{post.title}</h1>
<p>{post.author}</p>
<p>{post.content}</p>
