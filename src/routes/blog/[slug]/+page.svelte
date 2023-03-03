<script lang="ts">
	import getDate from '$lib/utils/getDate';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;
	const date = getDate(data.post.date || '');
</script>

<h1>{post.title}</h1>
<h5>{date} | {post.author}</h5>
<p>{post.content}</p>
