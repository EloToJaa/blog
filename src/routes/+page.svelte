<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Posts posts={data.posts} />
