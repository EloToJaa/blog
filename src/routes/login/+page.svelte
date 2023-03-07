<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { notify } from '$lib/utils/notification';
	import { Button } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: notify(form?.notification, form?.error);
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST">
	<h3>Sign in</h3>
	<FormInput
		name="usernameOrEmail"
		value={form?.usernameOrEmail}
		messages={form?.messages?.usernameOrEmail}
		label="Username or email"
		placeholder="name@gmail.com"
	/>
	<FormInput name="password" type="password" messages={form?.messages?.password} />
	<Button type="submit" class="w-full1">Login to your account</Button>
	<div class="text-md font-medium text-gray-500 dark:text-gray-300">
		Not registered? <a href="/register" class="text-blue-700 hover:underline dark:text-blue-500"
			>Create account</a
		>
	</div>
	<div class="text-md font-medium text-gray-500 dark:text-gray-300">
		Not verified? <a href="/verification" class="text-blue-700 hover:underline dark:text-blue-500"
			>Resend email</a
		>
	</div>
</form>
