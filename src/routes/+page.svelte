<script lang="ts">
	import { createSearchObject, searchHandler, searchStore, type Post } from '$lib/stores/search';
	import type { PageData } from './$types';

	export let data: PageData;

	const searchPosts: Post[] = data.posts.map((post: Post) => ({
		...post,
		searchTerms: `${post.title} ${post.author} ${post.content}`
	}));

	searchStore.set(createSearchObject(searchPosts));

	$: searchHandler($searchStore);
</script>

{#each $searchStore.filtered as post}
	<h1>{post.title}</h1>
	<h2>by {post.author}</h2>
	{post.content}<br /><br />
{/each}
<br />
