<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import { searchStore } from '$lib/stores/search';
	import { Search } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let innerWidth = 0;
	let size: string = 'md';
	$: size = innerWidth < 768 ? 'md' : 'lg';
</script>

<svelte:head>
	<title>Search</title>
</svelte:head>

<svelte:window bind:innerWidth />
<Search {size} bind:value={$searchStore.search} />
<Posts posts={data.posts} />
