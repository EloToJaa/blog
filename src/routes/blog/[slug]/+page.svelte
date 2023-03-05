<script lang="ts">
	import getDate from '$lib/utils/getDate';
	import Prism from 'prismjs';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;
	const date = getDate(data.post.date || '');

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<div class="mb-2 mx-auto dark:bg-gray-900 bg-blue-50 p-5 border-0 rounded-2xl pb-7">
	<h1>{post.title}</h1>
	<h5>{date} | {post.author}</h5>
	<p>{@html post.content}</p>
</div>
