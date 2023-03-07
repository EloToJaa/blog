<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data.user;
	const posts = data.posts;
</script>

<Posts {posts} author={user.username} />
