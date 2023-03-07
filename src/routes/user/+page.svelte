<script lang="ts">
	import Posts from '$lib/components/Posts/Posts.svelte';
	import getDate from '$lib/utils/getDate';
	import { Button, Input, Label, Modal, TabItem, Tabs } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const user = data.user;
	const posts = data.posts;

	let open = false;
</script>

<svelte:head>
	<title>User dashboard</title>
</svelte:head>

<Modal title="Are you sure?" bind:open autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		You are about to delete your account. This action is irreversible. If you are sure, click the
		Delete button below. Otherwise, click the Cancel button.
	</p>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		When you delete your account, all your posts will be deleted as well.
	</p>
	<svelte:fragment slot="footer">
		<form method="post">
			<Button type="submit" color="red">Delete</Button>
			<Button>Cancel</Button>
		</form>
	</svelte:fragment>
</Modal>

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
			<span>Joined at</span>
			<Input value={getDate(user.created) ?? ''} disabled />
		</Label>

		<div class="mt-4">
			<Button href="/password-reset">Reset password</Button>
			<Button on:click={() => (open = true)} color="red">Delete account</Button>
		</div>

		<form method="post" class="mt-3" />
	</TabItem>
	<TabItem title="Posts">
		<Posts {posts} author={user.username} />
	</TabItem>
</Tabs>
