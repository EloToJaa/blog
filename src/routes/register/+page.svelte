<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form?.notification && form.status === 201 && toast.success(form.notification);
	$: form?.notification && form.status === 400 && toast.error(form.notification);
</script>

<form class="flex flex-col space-y-6" method="POST">
	<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create a new account</h3>
	<Label class="space-y-2">
		<span>Username</span>
		<Input
			type="text"
			name="username"
			placeholder="name"
			color={form?.messages?.username ? 'red' : 'base'}
			value={form?.username || ''}
		/>

		{#if form?.messages?.username}
			<div class="text-red-500 text-sm">{form.messages.username[0]}</div>
		{/if}
	</Label>
	<Label class="space-y-2">
		<span>Email</span>
		<Input
			type="text"
			name="email"
			placeholder="name@gmail.com"
			color={form?.messages?.email ? 'red' : 'base'}
			value={form?.email || ''}
		/>

		{#if form?.messages?.email}
			<div class="text-red-500 text-sm">{form.messages.email[0]}</div>
		{/if}
	</Label>
	<Label class="space-y-2">
		<span>Password</span>
		<Input type="password" name="password" color={form?.messages?.password ? 'red' : 'base'} />
		{#if form?.messages?.password}
			<div class="text-red-500 text-sm">{form.messages.password[0]}</div>
		{/if}
	</Label>
	<Label class="space-y-2">
		<span>Confirm password</span>
		<Input
			type="password"
			name="confirmPassword"
			color={form?.messages?.confirmPassword ? 'red' : 'base'}
		/>
		{#if form?.messages?.confirmPassword}
			<div class="text-red-500 text-sm">{form.messages.confirmPassword[0]}</div>
		{/if}
	</Label>
	<Button type="submit" class="w-full1">Register</Button>
</form>
