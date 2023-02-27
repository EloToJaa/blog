<script lang="ts">
	import type { PostType } from '$lib/types/Post';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { Button, Card } from 'flowbite-svelte';
	import Fa from 'svelte-fa';
	export let post: PostType;
</script>

<Card img="logo.png" size="md">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{post.title}
	</h5>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
		{post.content}
	</p>
	<Button href={`/blog/${post.slug}`}>
		Read more
		<Fa icon={faArrowRight} class="pl-2" />
	</Button>
</Card>
