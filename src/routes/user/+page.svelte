<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import getDate from '$lib/utils/getDate';
	import { Button, Input, Label, TabItem, Tabs } from 'flowbite-svelte';
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
			<div class="flex">
				<Input value={user.email} disabled />
				<Button class="ml-2">Change</Button>
			</div>
		</Label>

		<Label class="space-y-2 mt-2">
			<span>Created at</span>
			<Input value={getDate(user.created) ?? ''} disabled />
		</Label>

		<Button class="mt-3">Password reset</Button>
		<Button class="mt-3" color="red">Delete user</Button>
	</TabItem>
	<TabItem title="Posts">
		<Posts {posts} author={user.username} />
	</TabItem>
</Tabs>
