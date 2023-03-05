<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { Button } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form?.notification && form.status === 201 && toast.success(form.notification);
	$: form?.notification && form.status === 400 && toast.error(form.notification);
</script>

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
	<FormInput name="confirmPassword" type="password" messages={form?.messages?.confirmPassword} />
	<Button type="submit" class="w-full1">Register</Button>
</form>
