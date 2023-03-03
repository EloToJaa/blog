<script lang="ts">
	import Post from '$lib/components/Posts/Post.svelte';
	import { createSearchObject, searchHandler, searchStore } from '$lib/stores/search';
	import type PostType from '$lib/types/Post';

	export let posts: PostType[];

	const searchPosts: PostType[] = posts.map((post: PostType) => ({
		...post,
		searchTerms: `${post.title} ${post.author} ${post.content}`
	}));

	searchStore.set(createSearchObject(searchPosts));

	$: searchHandler($searchStore);
</script>

<div class="pt-3">
	{#each $searchStore.filtered as post}
		<Post {post} />
	{/each}
</div>
