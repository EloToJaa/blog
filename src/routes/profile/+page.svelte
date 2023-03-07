<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import getDate from '$lib/utils/getDate';
	import { Input, Label, TabItem, Tabs } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data.user;
	const posts = data.posts;
</script>

<Tabs>
	<TabItem open title="Profile">
		<Label class="space-y-2">
			<span>Username</span>
			<Input value={user.username} disabled />
		</Label>

		<Label class="space-y-2 mt-2">
			<span>Email</span>
			<Input value={user.email} disabled />
		</Label>

		<Label class="space-y-2 mt-2">
			<span>Created at</span>
			<Input value={getDate(user.created) ?? ''} disabled />
		</Label>
	</TabItem>
	<TabItem title="Posts">
		<Posts {posts} author={user.username} />
	</TabItem>
	<TabItem title="Users">
		<p class="text-sm text-gray-500 dark:text-gray-400">
			<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
			ut labore et dolore magna aliqua.
		</p>
	</TabItem>
	<TabItem title="Dashboard">
		<p class="text-sm text-gray-500 dark:text-gray-400">
			<b>Dashboard:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua.
		</p>
	</TabItem>
</Tabs>
