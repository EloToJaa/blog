<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Posts posts={data.posts} />
