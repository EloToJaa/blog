<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { notify } from '$lib/utils/notification';
	import { Button } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: notify(form?.notification, form?.error);
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST">
	<h3>Create a new account</h3>
	<FormInput
		name="username"
		value={form?.username}
		messages={form?.messages?.username}
		placeholder="name"
	/>
	<FormInput
		name="email"
		value={form?.email}
		messages={form?.messages?.email}
		placeholder="name@gmail.com"
	/>
	<FormInput name="password" type="password" messages={form?.messages?.password} />
	<FormInput name="passwordConfirm" type="password" messages={form?.messages?.passwordConfirm} />
	<Button type="submit" class="w-full1">Register</Button>
</form>
