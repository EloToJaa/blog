<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import getDate from '$lib/utils/getDate';
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data.user;
	const posts = data.posts;
</script>

<svelte:head>
	<title>{user.username}</title>
</svelte:head>

<h1>{user.username}</h1>
<h4>Joined at {getDate(user.created)}</h4>

<Posts {posts} author={user.username} />
