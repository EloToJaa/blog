<script lang="ts">
	import type UserType from '$lib/types/User';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
	import Fa from 'svelte-fa';
	export let user: UserType | null;
</script>

{#if user}
	<Button pill color="light" id="avatar_with_name" class="!p-3">
		<Fa icon={faUser} class="mr-2" />
		<span class="text-lg font-semibold">{user.username}</span>
	</Button>
	<Dropdown inline triggeredBy="#avatar_with_name">
		<div slot="header" class="px-4 py-2">
			<span class="block text-sm text-gray-900 dark:text-white"> {user.username} </span>
			<span class="block truncate text-sm font-medium"> {user.email} </span>
		</div>
		<DropdownItem>Settings</DropdownItem>
		<DropdownDivider />
		<form method="post" action="/api/logout">
			<DropdownItem type="submit">Sign out</DropdownItem>
		</form>
	</Dropdown>
{:else}
	<Button
		class="mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
		color="light"
		pill={true}
		href="/login"
	>
		Sign In
	</Button>
{/if}
