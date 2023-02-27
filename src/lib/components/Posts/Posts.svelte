<script lang="ts">
	import Post from '$lib/components/Posts/Post.svelte';
	import { createSearchObject, searchHandler, searchStore } from '$lib/stores/search';
	import type { PostType } from '$lib/types/Post';

	export let posts: PostType[];

	const searchPosts: PostType[] = posts.map((post: PostType) => ({
		...post,
		searchTerms: `${post.title} ${post.author} ${post.content}`
	}));

	searchStore.set(createSearchObject(searchPosts));

	$: searchHandler($searchStore);
</script>

<div
	class="pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-items-center"
>
	{#each $searchStore.filtered as post}
		<Post {post} />
	{/each}
</div>
