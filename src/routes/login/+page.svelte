<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { Button } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form?.notification && form.status === 200 && toast.success(form.notification);
	$: form?.notification && form.status === 400 && toast.error(form.notification);
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST">
	<h3>Sign in</h3>
	<FormInput
		name="username"
		value={form?.username}
		messages={form?.messages?.username}
		placeholder="name"
	/>
	<FormInput name="password" type="password" messages={form?.messages?.password} />
	<!-- TODO: implement -->
	<!-- <div class="flex items-start">
		<Checkbox>Remember me</Checkbox>
		<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
			>Lost password?</a
		>
	</div> -->
	<Button type="submit" class="w-full1">Login to your account</Button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
		Not registered? <a href="/register" class="text-blue-700 hover:underline dark:text-blue-500"
			>Create account</a
		>
	</div>
</form>
