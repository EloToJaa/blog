<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import { searchStore } from '$lib/stores/search';
	import { Search } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Search size="md" bind:value={$searchStore.search} />
<Posts posts={data.posts} />
