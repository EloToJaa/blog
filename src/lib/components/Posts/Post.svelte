<script lang="ts">
	import type PostType from '$lib/types/Post';
	import getDate from '$lib/utils/getDate';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { Button } from 'flowbite-svelte';
	import Fa from 'svelte-fa';
	export let post: PostType;
</script>

<div class="mb-2 mx-auto dark:bg-gray-900 bg-blue-50 p-5 border-0 rounded-2xl">
	<div class="flex justify-between">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{post.title}
		</h5>
		{getDate(post.posted_at, true)}
	</div>

	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
		{post.description}
	</p>
	<div class="flex justify-between">
		<div class="text-lg font-semibold my-auto">{post.author}</div>
		<Button href={`/blog/${post.slug}`}>
			Read more
			<Fa icon={faArrowRight} class="pl-2" />
		</Button>
	</div>
</div>
