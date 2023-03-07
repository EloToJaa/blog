<script lang="ts">
	import FormInput from '$lib/components/Utils/FormInput.svelte';
	import { notify } from '$lib/utils/notification';
	import { Button } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: notify(form?.notification, form?.error);
</script>

<svelte:head>
	<title>Verification</title>
</svelte:head>

<form class="flex flex-col space-y-6" method="POST">
	<h3>Resend verification email</h3>
	<FormInput
		name="email"
		value={form?.email}
		messages={form?.messages?.email}
		placeholder="name@gmail.com"
	/>
	<Button type="submit" class="w-full1">Resend</Button>
</form>
