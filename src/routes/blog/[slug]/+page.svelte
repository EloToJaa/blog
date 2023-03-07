<script lang="ts">
	import getDate from '$lib/utils/getDate';
	import { Button } from 'flowbite-svelte';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data.post;
	const user = data.user;
	const date = getDate(data.post.postedAt || '');

	onMount(() => {
		hljs.highlightAll();
	});
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="mb-2 mx-auto dark:bg-gray-900 bg-blue-50 p-5 border-0 rounded-2xl pb-7">
	<div class="flex justify-between">
		<h1>{post.title}</h1>
		{#if user && user.id && user.id === post.authorId}
			<form action={`/article/delete/${post.slug}`} method="POST">
				<Button href={`/article/edit/${post.slug}`} class="mb-2">Edit</Button>
				<Button type="submit" class="mb-2" color="red">Delete</Button>
			</form>
		{/if}
	</div>

	<h5>{date} | {post.author}</h5>
	<p>{@html post.content}</p>
</div>
