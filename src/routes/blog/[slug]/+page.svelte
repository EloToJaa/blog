<script lang="ts">
	import getDate from '$lib/utils/getDate';
	import { Card } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;
	const date = getDate(data.post.date || '');
</script>

<Card size="xl" class="mb-2 mx-auto dark:bg-gray-900 ">
	<h1>{post.title}</h1>
	<h5>{date} | {post.author}</h5>
	<p>{post.content}</p>
</Card>
