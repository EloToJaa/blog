<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;
</script>

<h1>{post.title}</h1>
<h2>by {post.author} on {post.date}</h2>
<p>{post.content}</p>
